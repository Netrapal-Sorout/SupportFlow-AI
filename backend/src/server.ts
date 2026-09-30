import 'dotenv/config';

import app from './app.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './config/database.js';

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    const server = app.listen(PORT, () => {
      console.log(
        `🚀 SupportFlow AI API running on http://localhost:${PORT}`,
      );
    });

    const shutdown = async (signal: string): Promise<void> => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        await disconnectDatabase();

        console.log('✅ Server shut down successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => {
      void shutdown('SIGTERM');
    });

    process.on('SIGINT', () => {
      void shutdown('SIGINT');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);

    await disconnectDatabase();

    process.exit(1);
  }
}

void startServer();