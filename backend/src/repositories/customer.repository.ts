import { prisma } from '../config/database.js';
import type { Prisma } from '@prisma/client';

type CustomerStatus =
  | 'ACTIVE'
  | 'INACTIVE';

interface CreateCustomerData {
  name: string;
  email: string;
  passwordHash?: string | undefined;
  company?: string | undefined;
  status?: CustomerStatus | undefined;
}

interface UpdateCustomerData {
  name?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
  status?: CustomerStatus | undefined;
}

/**
 * Find a customer by email.
 *
 * Used by:
 * - Customer login
 * - Customer registration
 * - Customer account validation
 */
export async function findCustomerByEmail(
  email: string,
) {
  return prisma.customer.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Find a customer by ID.
 */
export async function findCustomerById(
  id: string,
) {
  return prisma.customer.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Get all customers.
 *
 * Optional search:
 * - name
 * - email
 * - company
 */
export async function findAllCustomers(
  search?: string,
) {
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

    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Create a customer.
 *
 * passwordHash is optional because customers
 * created from the admin dashboard may not
 * have portal authentication enabled yet.
 */
export async function createCustomer(
  data: CreateCustomerData,
) {
  return prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,

      passwordHash:
        data.passwordHash ?? null,

      company:
        data.company ?? null,

      status:
        data.status ?? 'ACTIVE',
    },
  });
}

/**
 * Update a customer.
 */
export async function updateCustomer(
  id: string,
  data: UpdateCustomerData,
) {
  return prisma.customer.update({
    where: {
      id,
    },

    data: {
      ...(data.name !== undefined
        ? {
            name: data.name,
          }
        : {}),

      ...(data.email !== undefined
        ? {
            email: data.email,
          }
        : {}),

      ...(data.company !== undefined
        ? {
            company: data.company,
          }
        : {}),

      ...(data.status !== undefined
        ? {
            status: data.status,
          }
        : {}),
    },
  });
}