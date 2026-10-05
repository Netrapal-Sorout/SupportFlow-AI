import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import userRoutes from './routes/user.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import customerRoutes from './routes/customer.routes.js';
import articleRoutes from './routes/article.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import aiRoutes from './routes/ai.routes.js';
import clientAuthRoutes from './routes/client-auth.routes.js';
import clientTicketRoutes from './routes/client-ticket.routes.js';

const app = express();

/*
 * ---------------------------------------------------------
 * Basic application configuration
 * ---------------------------------------------------------
 */

const isProduction = process.env.NODE_ENV === 'production';

/*
 * ---------------------------------------------------------
 * Security headers
 * ---------------------------------------------------------
 */

app.use(helmet());

/*
 * ---------------------------------------------------------
 * CORS
 * ---------------------------------------------------------
 *
 * FRONTEND_URL can contain one or multiple origins:
 *
 * FRONTEND_URL=https://supportflow.example.com
 *
 * or:
 *
 * FRONTEND_URL=https://supportflow.example.com,http://localhost:5173
 *
 */

const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = isProduction
  ? configuredOrigins
  : configuredOrigins.length > 0
    ? configuredOrigins
    : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      /*
       * Allow requests without an Origin header.
       *
       * This is useful for:
       * - Postman
       * - curl
       * - server-to-server requests
       * - AWS health checks
       */
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS request blocked from origin: ${origin}`);

      return callback(
        new Error('Not allowed by CORS'),
        false,
      );
    },

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],

    credentials: true,

    optionsSuccessStatus: 204,
  }),
);

/*
 * ---------------------------------------------------------
 * Body parsing
 * ---------------------------------------------------------
 */

app.use(
  express.json({
    limit: '2mb',
  }),
);

/*
 * ---------------------------------------------------------
 * Root endpoint
 * ---------------------------------------------------------
 */

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SupportFlow AI API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

/*
 * ---------------------------------------------------------
 * Health check
 * ---------------------------------------------------------
 *
 * Used to confirm that the Node.js application is running.
 *
 * AWS:
 * /api/health
 */

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'SupportFlow AI API is running',
  });
});

/*
 * ---------------------------------------------------------
 * API routes
 * ---------------------------------------------------------
 */

app.use('/api/auth', authRoutes);

app.use('/api/client-auth', clientAuthRoutes);

app.use('/api/tickets', ticketRoutes);

app.use('/api/users', userRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/customers', customerRoutes);

app.use('/api/knowledge-base', articleRoutes);

app.use('/api/settings', settingsRoutes);

app.use('/api/analytics', analyticsRoutes);

app.use('/api/ai', aiRoutes);

app.use('/api/client-tickets', clientTicketRoutes);

/*
 * ---------------------------------------------------------
 * 404 handler
 * ---------------------------------------------------------
 *
 * Any route that doesn't exist will return JSON instead
 * of an HTML response.
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/*
 * ---------------------------------------------------------
 * Global error handler
 * ---------------------------------------------------------
 */

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('❌ API Error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Internal server error';

    /*
     * Never expose detailed internal errors in production.
     */
    if (isProduction) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }

    return res.status(500).json({
      success: false,
      message,
    });
  },
);

export default app;