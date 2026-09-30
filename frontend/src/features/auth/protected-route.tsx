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
  const [isCheckingAuth, setIsCheckingAuth] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuthentication() {
      const token = getAccessToken();

      /*
       * No admin token
       */
      if (!token) {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
        }

        return;
      }

      try {
        /*
         * Verify the admin token with the backend.
         */
        await getCurrentUser(token);

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        /*
         * Token is invalid or expired.
         * Remove it and force admin login.
         */
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

  /*
   * Authentication verification screen
   */
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#DCE5EF] border-t-[#0878D9]" />

          <div className="text-sm font-medium text-[#667085]">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  /*
   * Not authenticated:
   * send the user to the ADMIN login page.
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  /*
   * Authenticated admin/support agent
   */
  return <>{children}</>;
}