
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
  import.meta.env.VITE_API_URL ||
  'https://d2ndzl99hg0dno.cloudfront.net'
).replace(/\/+$/, '');

const STATE_KEY = 'supportflow_cognito_oauth_state';
const VERIFIER_KEY = 'supportflow_cognito_pkce_verifier';

const CALLBACK_URL_AT_LOAD = window.location.href;

// Reuse the same exchange when React Strict Mode runs an effect twice.
const pendingExchanges = new Map<string, Promise<string>>();

interface CognitoTokenResponse {
  id_token?: string;
  error?: string;
  error_description?: string;
}

interface SupportFlowAuthResponse {
  token?: string;
  message?: string;
  error?: string;
}

async function exchangeForSupportFlowToken(
  code: string,
  verifier: string,
): Promise<string> {
  const redirectUri = `${window.location.origin}/auth/callback`;

  // Exchange the authorization code for Cognito tokens using PKCE.
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

  const tokenData: CognitoTokenResponse =
    await tokenResponse.json().catch(() => ({}));

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

  // Exchange the Cognito ID token for the SupportFlow API JWT.
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

  const backendData: SupportFlowAuthResponse =
    await backendResponse.json().catch(() => ({}));

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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Sign-in failed. Please return to the sign-in page and try again.';
}

export default function ClientSsoCallbackPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(
    'Completing sign-in...',
  );

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function completeSignIn() {
      let stateValidated = false;

      try {
        const callbackUrl = new URL(CALLBACK_URL_AT_LOAD);
        const params = callbackUrl.searchParams;

        const code = params.get('code');
        const returnedState = params.get('state');
        const oauthError =
          params.get('error_description') ||
          params.get('error');

        // Remove authorization parameters from the visible URL.
        window.history.replaceState(
          {},
          document.title,
          `${callbackUrl.pathname}${callbackUrl.hash}`,
        );

        if (oauthError) {
          throw new Error(oauthError);
        }

        if (!code) {
          throw new Error(
            'No authorization code was returned. Start a new sign-in attempt.',
          );
        }

        // Validate OAuth state before exchanging the code.
        const expectedState =
          sessionStorage.getItem(STATE_KEY);

        if (
          !returnedState ||
          !expectedState ||
          returnedState !== expectedState
        ) {
          throw new Error(
            'The sign-in security check failed. Please return to sign-in and start a new authentication attempt.',
          );
        }

        stateValidated = true;

        const verifier =
          sessionStorage.getItem(VERIFIER_KEY);

        if (!verifier) {
          throw new Error(
            'The PKCE verifier is missing. Please start a new sign-in attempt.',
          );
        }

        if (!COGNITO_DOMAIN || !COGNITO_CLIENT_ID) {
          throw new Error(
            'Cognito configuration is missing. Check your frontend environment variables.',
          );
        }

        if (!API_BASE_URL) {
          throw new Error(
            'The API URL is missing. Check VITE_API_URL.',
          );
        }

        setMessage('Verifying your account...');

        // Reuse an exchange already started for this code.
        let exchange = pendingExchanges.get(code);

        if (!exchange) {
          exchange = exchangeForSupportFlowToken(
            code,
            verifier,
          );

          pendingExchanges.set(code, exchange);

          const currentExchange = exchange;

          void exchange.then(
            () => {
              if (
                pendingExchanges.get(code) === currentExchange
              ) {
                pendingExchanges.delete(code);
              }
            },
            () => {
              if (
                pendingExchanges.get(code) === currentExchange
              ) {
                pendingExchanges.delete(code);
              }
            },
          );
        }

        const supportFlowToken = await exchange;

        if (cancelled) {
          return;
        }

        // Store the backend JWT, not the Cognito ID token.
        setClientAccessToken(supportFlowToken);

        sessionStorage.removeItem(STATE_KEY);
        sessionStorage.removeItem(VERIFIER_KEY);

        setMessage('Sign-in successful. Opening your portal...');

        navigate('/portal', { replace: true });
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        // Only clear credentials after a state-validated attempt.
        // An invalid state must not destroy another pending attempt.
        if (stateValidated) {
          sessionStorage.removeItem(STATE_KEY);
          sessionStorage.removeItem(VERIFIER_KEY);
        }

        setMessage(getErrorMessage(error));
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
