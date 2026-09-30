const CLIENT_ACCESS_TOKEN_KEY =
  'supportflow_client_access_token';

export function getClientAccessToken(): string | null {
  return localStorage.getItem(
    CLIENT_ACCESS_TOKEN_KEY,
  );
}

export function setClientAccessToken(
  token: string,
): void {
  localStorage.setItem(
    CLIENT_ACCESS_TOKEN_KEY,
    token,
  );
}

export function removeClientAccessToken(): void {
  localStorage.removeItem(
    CLIENT_ACCESS_TOKEN_KEY,
  );
}