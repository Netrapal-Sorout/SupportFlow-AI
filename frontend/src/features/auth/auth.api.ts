const API_BASE_URL = 'http://localhost:5000/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPPORT_AGENT';
  status: 'ACTIVE' | 'INACTIVE';
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface CurrentUserResponse {
  success: boolean;
  data: AuthUser & {
    createdAt: string;
    updatedAt: string;
  };
}

export async function login(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Unable to login',
    );
  }

  return data;
}

export async function getCurrentUser(
  token: string,
): Promise<CurrentUserResponse> {
  const response = await fetch(
    `${API_BASE_URL}/auth/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Unable to get current user',
    );
  }

  return data;
}