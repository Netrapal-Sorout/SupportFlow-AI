import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  CognitoSsoError,
  getClientById,
  loginClient,
  loginClientWithCognito,
  registerClient,
} from '../services/client-auth.service.js';

import {
  clientLoginSchema,
  clientRegisterSchema,
} from '../schemas/client-auth.schema.js';

export async function registerClientController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = clientRegisterSchema.safeParse(
      req.body,
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid registration data',
        errors: result.error.flatten(),
      });
      return;
    }

    const customer = await registerClient(result.data);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginClientController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = clientLoginSchema.safeParse(
      req.body,
    );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid login data',
        errors: result.error.flatten(),
      });
      return;
    }

    const resultData = await loginClient(result.data);

    res.status(200).json({
      success: true,
      data: resultData,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Exchange a verified Cognito ID token for a
 * SupportFlow AI customer session.
 */
export async function clientCognitoSsoController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const idToken = req.body?.idToken;

    if (
      typeof idToken !== 'string' ||
      idToken.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        code: 'COGNITO_TOKEN_REQUIRED',
        message: 'Cognito ID token is required.',
      });
      return;
    }

    const result = await loginClientWithCognito(
      idToken,
    );

    res.status(200).json({
      success: true,
      data: {
        token: result.token,
        customer: result.customer,
      },
    });
  } catch (error) {
    if (error instanceof CognitoSsoError) {
      res.status(error.statusCode).json({
        success: false,
        code: error.code,
        message: error.message,
      });
      return;
    }

    // Invalid signatures, issuer mismatches, expired tokens,
    // database failures, and unexpected errors go to the
    // application's centralized error handler.
    next(error);
  }
}

export async function getClientMeController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.client) {
      res.status(401).json({
        success: false,
        message: 'Customer authentication required',
      });
      return;
    }

    const customer = await getClientById(
      req.client.id,
    );

    if (!customer) {
      res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        company: customer.company,
        status: customer.status,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}