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

export type CognitoSsoErrorCode =
  | 'COGNITO_TOKEN_REQUIRED'
  | 'COGNITO_CONFIGURATION_MISSING'
  | 'EMAIL_CLAIM_MISSING'
  | 'EMAIL_NOT_VERIFIED'
  | 'CUSTOMER_INACTIVE';

export class CognitoSsoError extends Error {
  public readonly code: CognitoSsoErrorCode;
  public readonly statusCode: number;

  constructor(
    code: CognitoSsoErrorCode,
    message: string,
    statusCode: number,
  ) {
    super(message);
    this.name = 'CognitoSsoError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

let cognitoVerifier:
  | ReturnType<typeof CognitoJwtVerifier.create>
  | null = null;

function getCognitoVerifier() {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new CognitoSsoError(
      'COGNITO_CONFIGURATION_MISSING',
      'Cognito configuration is missing.',
      500,
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
 * Authenticate a customer through Cognito.
 *
 * Only a verified email claim from a successfully verified
 * Cognito ID token may be used for customer lookup or creation.
 */
export async function loginClientWithCognito(
  idToken: string,
) {
  if (
    typeof idToken !== 'string' ||
    idToken.trim().length === 0
  ) {
    throw new CognitoSsoError(
      'COGNITO_TOKEN_REQUIRED',
      'A Cognito ID token is required.',
      400,
    );
  }

  // Invalid signatures, issuers, expiry, token use, or client IDs
  // must cause authentication to fail. Never bypass this verifier.
  const verifier = getCognitoVerifier();
  const payload = await verifier.verify(idToken);

  const emailClaim = payload.email;

  const hasEmail =
    typeof emailClaim === 'string' &&
    emailClaim.trim().length > 0;

  // Log claim presence only. Never log tokens or personal data.
  console.info('[Cognito SSO] Email claim present:', hasEmail);
  console.info(
    '[Cognito SSO] Email verification claim:',
    payload.email_verified,
  );

  if (!hasEmail) {
    throw new CognitoSsoError(
      'EMAIL_CLAIM_MISSING',
      'Microsoft sign-in did not provide an email address. Use an account that supplies an email or contact support.',
      422,
    );
  }

  if (payload.email_verified !== true) {
    throw new CognitoSsoError(
      'EMAIL_NOT_VERIFIED',
      'Your email address must be verified before you can sign in with Microsoft.',
      403,
    );
  }

  const email = emailClaim.trim().toLowerCase();

  // Do not look up, link, or create an account before the email
  // claim has passed verification.
  const existingCustomer = await findCustomerByEmail(email);

  if (existingCustomer) {
    if (existingCustomer.status !== 'ACTIVE') {
      throw new CognitoSsoError(
        'CUSTOMER_INACTIVE',
        'Your customer account is inactive. Contact support.',
        403,
      );
    }

    return {
      token: createClientJwt(existingCustomer.id),
      customer: toClientResponse(existingCustomer),
    };
  }

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
    throw new CognitoSsoError(
      'CUSTOMER_INACTIVE',
      'Your customer account is inactive. Contact support.',
      403,
    );
  }

  return {
    token: createClientJwt(customer.id),
    customer: toClientResponse(customer),
  };
}

export async function getClientById(id: string) {
  return findCustomerById(id);
}