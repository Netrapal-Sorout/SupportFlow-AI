import { Navigate, Outlet } from 'react-router-dom';

import { getClientAccessToken } from './client-auth.storage';

export function ClientProtectedRoute() {
  const token = getClientAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}