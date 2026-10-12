
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setClientAccessToken } from './client-auth.storage';

const COGNITO_DOMAIN = (
  import.meta.env.VITE_COGNITO_DOMAIN ||
  'https://eu-north-1zfujdpqbl.auth.eu-north-1.amazoncognito.com'
).replace(/\/+$/, '');

const COGNITO_CLIENT_ID =
  import.meta.env.VITE_COGNITO_CLIENT_ID ||
  '7h17a1tprm8kt21bsolgoej9p5';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

const STATE_KEY = 'supportflow_cognito_oauth_state';
const VERIFIER_KEY = 'supportflow_cognito_pkce_verifier';

// Capture the callback URL when this page module loads.
// This survives React Strict Mode's effect setup/cleanup cycle.
const CALLBACK_URL_AT_LOAD = window.location.href;

// Reuse an in-flight exchange for the same authorization code.
const pendingExchanges = new Map<string, Promise<string>>();

async function exchangeForSupportFlowToken(
  code: string,
  verifier: string,
): Promise<string> {
  const redirectUri = `${window.location.origin}/auth/callback`;

  // 1. Exchange the Cognito authorization code using PKCE.
  const tokenResponse = await fetch(
    `${COGNITO_DOMAIN}/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: COGNITO_CLIENT_ID,
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    },
  );

  const tokenData = await tokenResponse.json().catch(() => ({}));

  if (
    !tokenResponse.ok ||
    typeof tokenData.id_token !== 'string' ||
    !tokenData.id_token
  ) {
    throw new Error(
      tokenData.error_description ||
        tokenData.error ||
        `Cognito token exchange failed (HTTP ${tokenResponse.status}).`,
    );
  }

  // 2. Exchange the Cognito ID token for the SupportFlow API JWT.
  const backendResponse = await fetch(
    `${API_BASE_URL}/api/client-auth/sso/cognito`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: tokenData.id_token,
      }),
    },
  );

  const backendData = await backendResponse.json().catch(() => ({}));

  if (!backendResponse.ok) {
    throw new Error(
      backendData.message ||
        backendData.error ||
        `SupportFlow authentication failed (HTTP ${backendResponse.status}).`,
    );
  }

  if (
    typeof backendData.token !== 'string' ||
    !backendData.token
  ) {
    throw new Error(
      'The backend did not return a SupportFlow token. Check the SSO controller response.',
    );
  }

  return backendData.token;
}

export default function ClientSsoCallbackPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(
    'Completing Google sign-in...',
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function completeSignIn() {
      try {
        const callbackUrl = new URL(CALLBACK_URL_AT_LOAD);
        const params = callbackUrl.searchParams;

        const code = params.get('code');
        const oauthError =
          params.get('error_description') ||
          params.get('error');
        const returnedState = params.get('state');

        // Remove query parameters from the visible URL.
        // CALLBACK_URL_AT_LOAD retains the original values for Strict Mode.
        window.history.replaceState(
          {},
          document.title,
          `${callbackUrl.pathname}${callbackUrl.hash}`,
        );

        if (oauthError) {
          throw new Error(
            oauthError.replace(/\+/g, ' '),
          );
        }

        if (!code) {
          throw new Error(
            'No authorization code was returned. Check the Cognito callback URL and try Google sign-in again.',
          );
        }

        const expectedState =
          sessionStorage.getItem(STATE_KEY);
        const verifier =
          sessionStorage.getItem(VERIFIER_KEY);

        if (
          !returnedState ||
          !expectedState ||
          returnedState !== expectedState
        ) {
          throw new Error(
            'The sign-in security check failed. Return to sign-in and start a new Google sign-in attempt.',
          );
        }

        if (!verifier) {
          throw new Error(
            'The PKCE verifier is missing. Return to sign-in and try again.',
          );
        }

        if (!COGNITO_DOMAIN || !COGNITO_CLIENT_ID) {
          throw new Error(
            'Cognito configuration is missing. Check frontend/.env.local.',
          );
        }

        if (!API_BASE_URL) {
          throw new Error(
            'VITE_API_URL is missing. Set it in frontend/.env.local and restart Vite.',
          );
        }

        // Do not remove state/verifier until the exchange finishes.
        // The second Strict Mode effect needs to read the same values.
        let exchange = pendingExchanges.get(code);

        if (!exchange) {
          exchange = exchangeForSupportFlowToken(
            code,
            verifier,
          );

          pendingExchanges.set(code, exchange);

          void exchange.then(
            () => {
              if (pendingExchanges.get(code) === exchange) {
                pendingExchanges.delete(code);
              }
            },
            () => {
              if (pendingExchanges.get(code) === exchange) {
                pendingExchanges.delete(code);
              }
            },
          );
        }

        const supportFlowToken = await exchange;

        if (cancelled) return;

        // Store the backend JWT, not the Cognito ID token.
        setClientAccessToken(supportFlowToken);

        sessionStorage.removeItem(STATE_KEY);
        sessionStorage.removeItem(VERIFIER_KEY);

        navigate('/portal', { replace: true });
      } catch (error: unknown) {
        if (cancelled) return;

        sessionStorage.removeItem(STATE_KEY);
        sessionStorage.removeItem(VERIFIER_KEY);

        setMessage(
          error instanceof Error
            ? error.message
            : 'Google sign-in failed. Please try again.',
        );
        setFailed(true);
      }
    }

    void completeSignIn();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-6">
      <section className="w-full max-w-lg rounded-2xl border border-[#E4EAF2] bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold text-[#17233F]">
          SupportFlow AI
        </h1>

        <p
          className="mt-4 text-sm leading-6 text-[#475467]"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>

        {!failed && (
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500" />
          </div>
        )}

        {failed && (
          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="mt-6 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Return to sign in
          </button>
        )}
      </section>
    </main>
  );
}
