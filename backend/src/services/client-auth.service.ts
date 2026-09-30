import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  createCustomer,
  findCustomerByEmail,
  findCustomerById,
} from '../repositories/customer.repository.js';

import type {
  ClientLoginInput,
  ClientRegisterInput,
} from '../schemas/client-auth.schema.js';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export async function registerClient(
  data: ClientRegisterInput,
) {
  const existingCustomer =
    await findCustomerByEmail(data.email);

  if (existingCustomer) {
    throw new Error(
      'A customer account with this email already exists',
    );
  }

  const passwordHash = await bcrypt.hash(
    data.password,
    12,
  );

  const customer = await createCustomer({
    name: data.name,
    email: data.email,
    passwordHash,
    company: data.company,
  });

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    company: customer.company,
    status: customer.status,
    createdAt: customer.createdAt,
  };
}

export async function loginClient(
  data: ClientLoginInput,
) {
  const customer = await findCustomerByEmail(
    data.email,
  );

  if (!customer) {
    throw new Error('Invalid email or password');
  }

  if (customer.status !== 'ACTIVE') {
    throw new Error('Customer account is inactive');
  }

  if (!customer.passwordHash) {
    throw new Error(
      'This customer account does not have password login enabled',
    );
  }

  const passwordValid = await bcrypt.compare(
    data.password,
    customer.passwordHash,
  );

  if (!passwordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      sub: customer.id,
      type: 'CUSTOMER',
    },
    getJwtSecret(),
    {
      expiresIn: '1d',
    },
  );

  return {
    token,
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      company: customer.company,
      status: customer.status,
    },
  };
}

export async function getClientById(
  id: string,
) {
  return findCustomerById(id);
}