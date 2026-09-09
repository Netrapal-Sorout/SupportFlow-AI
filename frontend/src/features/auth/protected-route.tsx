import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getCurrentUser } from './auth.api';
import {
  getAccessToken,
  removeAccessToken,
} from './auth.storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuthentication() {
      const token = getAccessToken();

      if (!token) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        }

        return;
      }

      try {
        await getCurrentUser(token);

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        removeAccessToken();

        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    void verifyAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-sm text-slate-400">
          Checking authentication...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}