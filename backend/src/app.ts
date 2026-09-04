import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import ticketRoutes from './routes/ticket.routes.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SupportFlow AI API',
    version: '1.0.0',
  });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'SupportFlow AI API is running',
  });
});

app.use('/api/tickets', ticketRoutes);

export default app;