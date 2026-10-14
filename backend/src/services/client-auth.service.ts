import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

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

/**
 * Lazily create the Cognito ID-token verifier.
 */
let cognitoVerifier:
  | ReturnType<typeof CognitoJwtVerifier.create>
  | null = null;

function getCognitoVerifier() {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new Error(
      'Cognito configuration is missing. Check COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID.',
    );
  }

  if (!cognitoVerifier) {
    cognitoVerifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: 'id',
      clientId,
    });
  }

  return cognitoVerifier;
}

/**
 * Create the SupportFlow application JWT.
 */
function createClientJwt(customerId: string): string {
  return jwt.sign(
    {
      sub: customerId,
      type: 'CUSTOMER',
    },
    getJwtSecret(),
    {
      expiresIn: '1d',
    },
  );
}

/**
 * Return only customer fields exposed to the client.
 */
function toClientResponse(customer: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  status: string;
}) {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    company: customer.company,
    status: customer.status,
  };
}

/**
 * Register a customer with email and password.
 */
export async function registerClient(
  data: ClientRegisterInput,
) {
  const email = data.email.trim().toLowerCase();

  const existingCustomer = await findCustomerByEmail(email);

  if (existingCustomer) {
    throw new Error(
      'A customer account with this email already exists',
    );
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const customer = await createCustomer({
    name: data.name,
    email,
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

/**
 * Log in a customer using SupportFlow email/password credentials.
 */
export async function loginClient(
  data: ClientLoginInput,
) {
  const email = data.email.trim().toLowerCase();
  const customer = await findCustomerByEmail(email);

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

  return {
    token: createClientJwt(customer.id),
    customer: toClientResponse(customer),
  };
}

/**
 * Authenticate a customer through a Cognito identity provider.
 *
 * The Cognito ID token must be verified before any claims are trusted.
 */
export async function loginClientWithCognito(
  idToken: string,
) {
  if (
    typeof idToken !== 'string' ||
    idToken.trim().length === 0
  ) {
    throw new Error('A Cognito ID token is required');
  }

  const verifier = getCognitoVerifier();

  // Validates token signature, issuer, expiry, token use,
  // and configured Cognito app client.
  const payload = await verifier.verify(idToken);

  // Preserve the claim's type until runtime validation succeeds.
  const emailClaim = payload.email;

  const hasEmail =
    typeof emailClaim === 'string' &&
    emailClaim.trim().length > 0;

  // Never log the ID token or the user's email.
  console.info(
    '[Cognito SSO] Email claim present:',
    hasEmail,
  );

  console.info(
    '[Cognito SSO] Email verification claim:',
    payload.email_verified,
  );

  if (!hasEmail) {
    throw new Error(
      'Cognito ID token has no email claim. Check the identity provider scopes and Cognito attribute mapping.',
    );
  }

  if (payload.email_verified !== true) {
    throw new Error(
      'Cognito ID token email is not verified. Check the identity provider configuration.',
    );
  }

  // emailClaim is narrowed to string by the validation above.
  const email = emailClaim.trim().toLowerCase();

  // Find an existing customer by verified email.
  const existingCustomer = await findCustomerByEmail(email);

  if (existingCustomer) {
    if (existingCustomer.status !== 'ACTIVE') {
      throw new Error('Customer account is inactive');
    }

    return {
      token: createClientJwt(existingCustomer.id),
      customer: toClientResponse(existingCustomer),
    };
  }

  // Only create a customer after the email claim has been validated.
  const name =
    typeof payload.name === 'string' &&
    payload.name.trim().length > 0
      ? payload.name.trim()
      : email.split('@')[0] || 'Customer';

  const customer = await createCustomer({
    name,
    email,
  });

  if (customer.status !== 'ACTIVE') {
    throw new Error('Customer account is inactive');
  }

  return {
    token: createClientJwt(customer.id),
    customer: toClientResponse(customer),
  };
}

/**
 * Retrieve a customer by application customer ID.
 */
export async function getClientById(id: string) {
  return findCustomerById(id);
}