const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// =========================================================
// TYPES
// =========================================================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role:
    | 'ADMIN'
    | 'SUPPORT_AGENT';
  status?:
    | 'ACTIVE'
    | 'INACTIVE';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;

  data: {
    token: string;
    user: AuthUser;
  };
}

export interface CurrentUserResult {
  success: boolean;
  message?: string;
  data: AuthUser;
}

// =========================================================
// LOGIN
// =========================================================

export async function login(
  data: LoginInput,
): Promise<AuthResult> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    },
  );

  let result: Partial<AuthResult>;

  try {
    result =
      (await response.json()) as Partial<AuthResult>;
  } catch {
    throw new Error(
      'Unable to read login response.',
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        'Invalid email or password.',
    );
  }

  if (
    !result.data?.token ||
    !result.data?.user
  ) {
    throw new Error(
      'Invalid login response from server.',
    );
  }

  return result as AuthResult;
}

// =========================================================
// REGISTER
// =========================================================

export async function register(
  data: RegisterInput,
): Promise<AuthResult> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    },
  );

  let result: Partial<AuthResult>;

  try {
    result =
      (await response.json()) as Partial<AuthResult>;
  } catch {
    throw new Error(
      'Unable to read registration response.',
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        'Unable to create account.',
    );
  }

  if (
    !result.data?.token ||
    !result.data?.user
  ) {
    throw new Error(
      'Invalid registration response from server.',
    );
  }

  return result as AuthResult;
}

// =========================================================
// CURRENT USER
// =========================================================

export async function getCurrentUser(
  token: string,
): Promise<AuthUser> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/me`,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  let result: CurrentUserResult;

  try {
    result =
      (await response.json()) as CurrentUserResult;
  } catch {
    throw new Error(
      'Unable to read current user response.',
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        'Unable to get current user.',
    );
  }

  if (!result.data) {
    throw new Error(
      'Current user data is missing.',
    );
  }

  return result.data;
}