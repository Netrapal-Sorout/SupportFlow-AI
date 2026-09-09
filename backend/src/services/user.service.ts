import bcrypt from 'bcryptjs';

import {
  createUser,
  findAllUsers,
  findUserByEmail,
} from '../repositories/auth.repository.js';

import type { CreateUserInput } from '../schemas/user.schema.js';

export async function getUsers() {
  return findAllUsers();
}

export async function createNewUser(data: CreateUserInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await createUser({
    name: data.name,
    email: data.email,
    passwordHash,
    role: data.role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}