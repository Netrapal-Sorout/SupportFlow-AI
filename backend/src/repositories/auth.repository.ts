import { prisma } from '../config/database.js';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function findActiveUserById(id: string) {
  return prisma.user.findFirst({
    where: {
      id,
      status: 'ACTIVE',
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'SUPPORT_AGENT';
}) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
    },
  });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}