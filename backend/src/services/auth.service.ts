import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  createUser,
  findUserByEmail,
} from '../repositories/auth.repository.js';

import type {
  LoginInput,
  RegisterInput,
} from '../schemas/auth.schema.js';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export async function registerUser(data: RegisterInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await createUser({
    name: data.name,
    email: data.email,
    passwordHash,
    role: 'SUPPORT_AGENT',
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

export async function loginUser(data: LoginInput) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('User account is inactive');
  }

  const passwordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!passwordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    getJwtSecret(),
    {
      expiresIn: '1d',
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
}