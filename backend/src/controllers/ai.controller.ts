import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import { prisma } from '../config/database.js';
import { aiAnalyzeSchema } from '../schemas/ai.schema.js';

interface AIAnalysisResult {
  category:
    | 'BILLING'
    | 'TECHNICAL'
    | 'ACCOUNT'
    | 'SHIPPING'
    | 'GENERAL';

  priority:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'URGENT';

  sentiment:
    | 'POSITIVE'
    | 'NEUTRAL'
    | 'FRUSTRATED'
    | 'NEGATIVE';

  confidence: number;
  summary: string;
  suggestedReply: string;
}

function fallbackAnalysis(
  text: string,
): AIAnalysisResult {
  const lower = text.toLowerCase();

  const category =
    lower.includes('payment') ||
    lower.includes('invoice') ||
    lower.includes('charge')
      ? 'BILLING'
      : lower.includes('password') ||
        lower.includes('login') ||
        lower.includes('account')
        ? 'ACCOUNT'
        : lower.includes('delivery') ||
          lower.includes('shipping') ||
          lower.includes('order')
          ? 'SHIPPING'
          : lower.includes('error') ||
            lower.includes('not loading') ||
            lower.includes('bug')
            ? 'TECHNICAL'
            : 'GENERAL';

  const priority =
    lower.includes('urgent') ||
    lower.includes('blocked') ||
    lower.includes('failed')
      ? 'HIGH'
      : 'MEDIUM';

  const sentiment =
    lower.includes('angry') ||
    lower.includes('frustrated') ||
    lower.includes('terrible') ||
    lower.includes('unacceptable')
      ? 'FRUSTRATED'
      : 'NEUTRAL';

  return {
    category,
    priority,
    sentiment,
    confidence: 0.78,
    summary:
      'The request was analyzed using the SupportFlow fallback classifier.',
    suggestedReply:
      'Thanks for contacting support. We have reviewed your request and will help you resolve it. Please share any additional details that may help us investigate.',
  };
}

function normalizeAIResult(
  value: unknown,
): AIAnalysisResult | null {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return null;
  }

  const result = value as Record<string, unknown>;

  const categories = [
    'BILLING',
    'TECHNICAL',
    'ACCOUNT',
    'SHIPPING',
    'GENERAL',
  ] as const;

  const priorities = [
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT',
  ] as const;

  const sentiments = [
    'POSITIVE',
    'NEUTRAL',
    'FRUSTRATED',
    'NEGATIVE',
  ] as const;

  if (
    typeof result.category !== 'string' ||
    !categories.includes(
      result.category as (typeof categories)[number],
    )
  ) {
    return null;
  }

  if (
    typeof result.priority !== 'string' ||
    !priorities.includes(
      result.priority as (typeof priorities)[number],
    )
  ) {
    return null;
  }

  if (
    typeof result.sentiment !== 'string' ||
    !sentiments.includes(
      result.sentiment as (typeof sentiments)[number],
    )
  ) {
    return null;
  }

  if (
    typeof result.confidence !== 'number' ||
    typeof result.summary !== 'string' ||
    typeof result.suggestedReply !== 'string'
  ) {
    return null;
  }

  const confidence =
    result.confidence > 1
      ? result.confidence / 100
      : result.confidence;

  return {
    category:
      result.category as AIAnalysisResult['category'],
    priority:
      result.priority as AIAnalysisResult['priority'],
    sentiment:
      result.sentiment as AIAnalysisResult['sentiment'],
    confidence: Math.min(
      Math.max(confidence, 0),
      1,
    ),
    summary: result.summary,
    suggestedReply: result.suggestedReply,
  };
}

async function callGrok(
  prompt: string,
): Promise<AIAnalysisResult | null> {
  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model =
    process.env.XAI_MODEL || 'grok-4.7';

  const response = await fetch(
    'https://api.x.ai/v1/responses',
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        model,

        input: [
          {
            role: 'system',
            content: `
You are SupportFlow AI, an AI customer support copilot.

Analyze the customer's support request and return ONLY valid JSON.

The JSON must contain exactly these fields:

{
  "category": "BILLING | TECHNICAL | ACCOUNT | SHIPPING | GENERAL",
  "priority": "LOW | MEDIUM | HIGH | URGENT",
  "sentiment": "POSITIVE | NEUTRAL | FRUSTRATED | NEGATIVE",
  "confidence": 0.0,
  "summary": "short summary",
  "suggestedReply": "professional customer-facing reply"
}

Rules:

- confidence must be between 0 and 1.
- Do not include markdown.
- Do not include additional fields.
- suggestedReply must be professional and helpful.
- Do not invent facts that are not present in the request.
            `.trim(),
          },

          {
            role: 'user',
            content: prompt,
          },
        ],

        text: {
          format: {
            type: 'json_object',
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      'xAI API request failed:',
      response.status,
      errorText,
    );

    return null;
  }

  const data = (await response.json()) as {
    output_text?: string;
  };

  if (!data.output_text) {
    console.error(
      'xAI response did not contain output_text.',
    );

    return null;
  }

  try {
    const parsed: unknown =
      JSON.parse(data.output_text);

    return normalizeAIResult(parsed);
  } catch (error) {
    console.error(
      'Failed to parse Grok AI response:',
      error,
    );

    return null;
  }
}

export async function analyzeTicketController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed =
      aiAnalyzeSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid AI request',
      });

      return;
    }

    let text =
      parsed.data.message || '';

    const ticketId =
      parsed.data.ticketId;

    if (ticketId) {
      const ticket =
        await prisma.ticket.findUnique({
          where: {
            id: ticketId,
          },

          include: {
            messages: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        });

      if (!ticket) {
        res.status(404).json({
          success: false,
          message: 'Ticket not found',
        });

        return;
      }

      text = [
        `Subject: ${ticket.subject}`,
        ...ticket.messages.map(
          (message) =>
            `${message.senderType}: ${message.content}`,
        ),
      ].join('\n');
    }

    const result =
      (await callGrok(text)) ??
      fallbackAnalysis(text);

    if (
      ticketId &&
      typeof result.confidence === 'number'
    ) {
      await prisma.ticket.update({
        where: {
          id: ticketId,
        },

        data: {
          aiConfidence:
            result.confidence,

          category:
            result.category,

          priority:
            result.priority,
        },
      });
    }

    res.json({
      success: true,

      data: {
        ticketId,

        ...result,

        provider:
          process.env.XAI_API_KEY
            ? 'xai'
            : 'fallback',

        model:
          process.env.XAI_API_KEY
            ? process.env.XAI_MODEL ||
              'grok-4.7'
            : null,
      },
    });
  } catch (error) {
    next(error);
  }
}