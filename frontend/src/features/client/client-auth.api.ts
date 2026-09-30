const API_BASE_URL = 'http://localhost:5000/api';

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

interface ClientAuthResponse {
  success: boolean;
  data: {
    token: string;
    customer: ClientUser;
  };
}

interface ClientMeResponse {
  success: boolean;
  data: ClientUser;
}

interface ClientRegisterResponse {
  success: boolean;
  data: ClientUser;
}

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  const data = (await response.json()) as
    | T
    | ApiErrorResponse;

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;

    throw new Error(
      errorData.message ||
        'Something went wrong. Please try again.',
    );
  }

  return data as T;
}

export interface ClientRegisterInput {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export interface ClientLoginInput {
  email: string;
  password: string;
}

export async function registerClient(
  input: ClientRegisterInput,
): Promise<ClientUser> {
  const response = await fetch(
    `${API_BASE_URL}/client-auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );

  const result =
    await parseResponse<ClientRegisterResponse>(
      response,
    );

  return result.data;
}

export async function loginClient(
  input: ClientLoginInput,
): Promise<ClientAuthResponse['data']> {
  const response = await fetch(
    `${API_BASE_URL}/client-auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );

  const result =
    await parseResponse<ClientAuthResponse>(
      response,
    );

  return result.data;
}

export async function getCurrentClient(
  token: string,
): Promise<ClientUser> {
  const response = await fetch(
    `${API_BASE_URL}/client-auth/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result =
    await parseResponse<ClientMeResponse>(
      response,
    );

  return result.data;
}