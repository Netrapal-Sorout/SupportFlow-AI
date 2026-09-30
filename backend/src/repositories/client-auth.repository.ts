import { prisma } from '../config/database.js';

export async function findCustomerByEmail(email: string) {
  return prisma.customer.findUnique({
    where: {
      email,
    },
  });
}

export async function findCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: {
      id,
    },
  });
}

export async function createCustomer(data: {
  name: string;
  email: string;
  passwordHash: string;
  company?: string;
}) {
  return prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      company: data.company || null,
      status: 'ACTIVE',
    },
  });
}