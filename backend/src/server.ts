import 'dotenv/config';

import app from './app.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './config/database.js';

import type { Server } from 'node:http';

const PORT = Number(process.env.PORT) || 5000;

let server: Server | null = null;

async function startServer(): Promise<void> {
  try {
    
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 SupportFlow AI API running on port ${PORT}`);
      console.log(`📡 Server listening on 0.0.0.0:${PORT}`);
    });

  
    try {
      await connectDatabase();

      console.log('✅ PostgreSQL database connected successfully');
    } catch (error) {
      console.error('❌ PostgreSQL database connection failed:', error);
      console.error(
        '⚠️ Server is running, but database-dependent APIs may fail.'
      );
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);

    await disconnectDatabase();

    process.exit(1);
  }
}

const shutdown = async (signal: string): Promise<void> => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  if (!server) {
    await disconnectDatabase();
    process.exit(0);
  }

  server.close(async () => {
    try {
      await disconnectDatabase();

      console.log('✅ Server shut down successfully');
    } catch (error) {
      console.error('❌ Error while disconnecting database:', error);
    }

    process.exit(0);
  });
};

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

void startServer();