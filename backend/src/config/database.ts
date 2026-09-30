import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export async function connectDatabase(): Promise<void> {
  await prisma.$connect();

  console.log('✅ PostgreSQL database connected');
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();

  console.log('🔌 PostgreSQL database disconnected');
}