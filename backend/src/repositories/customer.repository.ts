
import { prisma } from '../config/database.js';
import type { Prisma } from '@prisma/client';

type CustomerStatus = 'ACTIVE' | 'INACTIVE';

interface CreateCustomerData {
  name: string;
  email: string;
  passwordHash?: string | undefined;
  company?: string | undefined;
  status?: CustomerStatus | undefined;
  cognitoSub?: string | undefined;
  emailVerifiedAt?: Date | undefined;
}

interface UpdateCustomerData {
  name?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
  status?: CustomerStatus | undefined;
}

export async function findCustomerByEmail(email: string) {
  return prisma.customer.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
}

export async function findCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
  });
}

/**
 * Find a customer by the stable Cognito subject.
 * This is used only after the Cognito ID token is verified.
 */
export async function findCustomerByCognitoSub(
  cognitoSub: string,
) {
  return prisma.customer.findUnique({
    where: { cognitoSub },
  });
}

export async function findAllCustomers(search?: string) {
  const trimmedSearch = search?.trim();
  const where: Prisma.CustomerWhereInput = {};

  if (trimmedSearch) {
    where.OR = [
      {
        name: {
          contains: trimmedSearch,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: trimmedSearch,
          mode: 'insensitive',
        },
      },
      {
        company: {
          contains: trimmedSearch,
          mode: 'insensitive',
        },
      },
    ];
  }

  return prisma.customer.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function createCustomer(data: CreateCustomerData) {
  return prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash ?? null,
      company: data.company ?? null,
      status: data.status ?? 'ACTIVE',
      cognitoSub: data.cognitoSub ?? null,
      emailVerifiedAt: data.emailVerifiedAt ?? null,
    },
  });
}

export async function updateCustomer(
  id: string,
  data: UpdateCustomerData,
) {
  return prisma.customer.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.company !== undefined && { company: data.company }),
      ...(data.status !== undefined && { status: data.status }),
    },
  });
}
