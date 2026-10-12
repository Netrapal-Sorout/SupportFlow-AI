import {

  ArrowRight,

  CheckCircle2,

  Eye,

  EyeOff,

  LockKeyhole,

  Mail,

  ShieldCheck,

  User,

  Building2,

  Headphones,

} from 'lucide-react';

import {

  FormEvent,

  useEffect,

  useState,

} from 'react';

import { useNavigate } from 'react-router-dom';

import {

  loginClient,

  registerClient,

} from './client-auth.api';

import {

  getClientAccessToken,

  setClientAccessToken,

} from './client-auth.storage';

const COGNITO_DOMAIN = (import.meta.env.VITE_COGNITO_DOMAIN || 'https://eu-north-1zfujdpqbl.auth.eu-north-1.amazoncognito.com').replace(/\/$/, '');
const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID || '7h17a1tprm8kt21bsolgoej9p5';
const COGNITO_CALLBACK_URL = `${window.location.origin}/auth/callback`;

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function createPkcePair(): Promise<{ verifier: string; challenge: string }> {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const verifier = base64UrlEncode(random);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return { verifier, challenge: base64UrlEncode(new Uint8Array(digest)) };
}

type AuthMode = 'login' | 'register';

export default function ClientAuthPage() {

  const navigate = useNavigate();

  const [mode, setMode] =

    useState<AuthMode>('login');

  const [name, setName] = useState('');

  const [company, setCompany] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =

    useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const token = getClientAccessToken();

    if (token) {

      navigate('/portal', {

        replace: true,

      });

    }

  }, [navigate]);

  async function handleGoogleSso() {
    if (loading) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!window.crypto?.subtle) {
        throw new Error(
          'Secure browser cryptography is unavailable. Use localhost or HTTPS.',
        );
      }

      if (!COGNITO_DOMAIN || !COGNITO_CLIENT_ID) {
        throw new Error('Cognito configuration is missing.');
      }

      // Start a fresh OAuth attempt so stale state/verifier values cannot be reused.
      sessionStorage.removeItem('supportflow_cognito_oauth_state');
      sessionStorage.removeItem('supportflow_cognito_pkce_verifier');

      const { verifier, challenge } = await createPkcePair();
      const state = base64UrlEncode(
        crypto.getRandomValues(new Uint8Array(24)),
      );

      sessionStorage.setItem('supportflow_cognito_pkce_verifier', verifier);
      sessionStorage.setItem('supportflow_cognito_oauth_state', state);

      const params = new URLSearchParams({
        client_id: COGNITO_CLIENT_ID,
        response_type: 'code',
        response_mode: 'query',
        scope: 'openid email profile',
        redirect_uri: COGNITO_CALLBACK_URL,
        identity_provider: 'Google',
        prompt: 'select_account',
        code_challenge_method: 'S256',
        code_challenge: challenge,
        state,
      });

      // Cognito redirects to /auth/callback after successful authentication.
      window.location.assign(
        `${COGNITO_DOMAIN}/oauth2/authorize?${params.toString()}`,
      );
    } catch (ssoError) {
      sessionStorage.removeItem('supportflow_cognito_oauth_state');
      sessionStorage.removeItem('supportflow_cognito_pkce_verifier');
      setLoading(false);
      setError(
        ssoError instanceof Error
          ? ssoError.message
          : 'Unable to start Google sign-in.',
      );
    }
  }

  function handleOrganizationSso() {
    setError('Organization SSO is not configured yet. An approved identity provider must be configured for your organization first.');
  }

  function switchMode(nextMode: AuthMode) {

    setMode(nextMode);

    setError('');

    setSuccess('');

    setShowPassword(false);

  }

  async function handleSubmit(

    event: FormEvent<HTMLFormElement>,

  ) {

    event.preventDefault();

    setError('');

    setSuccess('');

    setLoading(true);

    try {

      if (mode === 'register') {

        if (name.trim().length < 2) {

          setError(

            'Name must be at least 2 characters.',

          );

          return;

        }

        if (password.length < 8) {

          setError(

            'Password must be at least 8 characters.',

          );

          return;

        }

        await registerClient({

          name: name.trim(),

          email: email.trim(),

          password,

          company: company.trim() || undefined,

        });

        setSuccess(

          'Account created successfully. You can now sign in.',

        );

        setMode('login');

        setPassword('');

        setName('');

        setCompany('');

      } else {

        const result = await loginClient({

          email: email.trim(),

          password,

        });

        setClientAccessToken(

          result.token,

        );

        navigate('/portal', {

          replace: true,

        });

      }

    } catch (authError) {

      setError(

        authError instanceof Error

          ? authError.message

          : 'Unable to complete authentication.',

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-[#F7F9FC] px-5 py-8 sm:px-8 lg:px-10">

      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1380px] items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-[#E4EAF2] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_0.9fr]">

          {/* Left */}

          <section className="relative hidden min-h-[700px] overflow-hidden bg-[#17233F] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">

                  <Headphones className="h-5 w-5" />

                </div>

                <div>

                  <div className="text-lg font-bold text-white">

                    SupportFlow AI

                  </div>

                  <div className="text-xs text-slate-300">

                    Customer Support Portal

                  </div>

                </div>

              </div>

              <div className="mt-28 max-w-xl">

                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">

                  Customer support

                </div>

                <h1 className="mt-5 text-4xl font-bold leading-[1.12] text-white xl:text-5xl">

                  Get help when

                  <br />

                  you need it.

                </h1>

                <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-300">

                  Track your support requests, find answers,

                  and connect with the support team from one

                  simple workspace.

                </p>

              </div>

            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2">

              {[

                'Track support tickets',

                'Chat with support',

                'Find instant answers',

                'AI-powered assistance',

              ].map((item) => (

                <div

                  key={item}

                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"

                >

                  <CheckCircle2 className="h-5 w-5 text-blue-300" />

                  <div className="mt-3 text-sm font-semibold text-white">

                    {item}

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* Right */}

          <section className="flex min-h-[700px] items-center justify-center bg-white p-7 sm:p-10 lg:p-12 xl:p-16">

            <div className="w-full max-w-[430px]">

              <div className="lg:hidden mb-8 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0878D9]">

                  <Headphones className="h-5 w-5" />

                </div>

                <div>

                  <div className="text-lg font-bold text-[#17233F]">

                    SupportFlow AI

                  </div>

                  <div className="text-xs text-[#667085]">

                    Customer Portal

                  </div>

                </div>

              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#17233F]">

                {mode === 'login'

                  ? 'Welcome back'

                  : 'Create your account'}

              </h2>

              <p className="mt-3 text-sm leading-6 text-[#667085]">

                {mode === 'login'

                  ? 'Sign in to manage your support requests and conversations.'

                  : 'Create your customer account to start using SupportFlow.'}

              </p>

              {success && (

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

                  <p className="text-sm text-emerald-700">

                    {success}

                  </p>

                </div>

              )}

              {error && (

                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  {error}

                </div>

              )}

              <form

                onSubmit={handleSubmit}

                className={mode === 'login' ? 'space-y-5' : 'mt-8 space-y-5'}

              >

                {mode === 'register' && (

                  <>

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-[#344054]">

                        Full name

                      </label>

                      <div className="relative">

                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                        <input

                          required

                          value={name}

                          onChange={(event) =>

                            setName(event.target.value)

                          }

                          placeholder="John Smith"

                          className="h-12 w-full rounded-xl border border-[#D0D5DD] pl-10 pr-4 text-sm outline-none focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10"

                        />

                      </div>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-semibold text-[#344054]">

                        Company

                      </label>

                      <div className="relative">

                        <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                        <input

                          value={company}

                          onChange={(event) =>

                            setCompany(event.target.value)

                          }

                          placeholder="Company name"

                          className="h-12 w-full rounded-xl border border-[#D0D5DD] pl-10 pr-4 text-sm outline-none focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10"

                        />

                      </div>

                    </div>

                  </>

                )}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#344054]">

                    Email

                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                    <input

                      type="email"

                      required

                      value={email}

                      onChange={(event) =>

                        setEmail(event.target.value)

                      }

                      placeholder="you@company.com"

                      className="h-12 w-full rounded-xl border border-[#D0D5DD] pl-10 pr-4 text-sm outline-none focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10"

                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#344054]">

                    Password

                  </label>

                  <div className="relative">

                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                    <input

                      type={

                        showPassword

                          ? 'text'

                          : 'password'

                      }

                      required

                      value={password}

                      onChange={(event) =>

                        setPassword(event.target.value)

                      }

                      placeholder="Enter your password"

                      className="h-12 w-full rounded-xl border border-[#D0D5DD] pl-10 pr-11 text-sm outline-none focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10"

                    />

                    <button

                      type="button"

                      onClick={() =>

                        setShowPassword(

                          (value) => !value,

                        )

                      }

                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]"

                    >

                      {showPassword ? (

                        <EyeOff className="h-4 w-4" />

                      ) : (

                        <Eye className="h-4 w-4" />

                      )}

                    </button>

                  </div>

                  {mode === 'register' && (

                    <p className="mt-2 text-xs text-[#98A2B3]">

                      Password must contain at least 8 characters.

                    </p>

                  )}

                </div>

                <button

                  type="submit"

                  disabled={loading}

                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0878D9] text-sm font-semibold text-white hover:bg-[#0669BD] disabled:opacity-60"

                >

                  {loading

                    ? 'Please wait...'

                    : mode === 'login'

                      ? 'Sign in'

                      : 'Create account'}

                  {!loading && (

                    <ArrowRight className="h-4 w-4" />

                  )}

                </button>

              </form>

              {mode === 'login' && (

                <div className="mt-7 space-y-3">

                  <button

                    type="button"

                    onClick={handleGoogleSso}

                    disabled={loading}

                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#D9DEE7] bg-white px-4 text-sm font-semibold text-[#253044] shadow-sm transition hover:border-[#E5A15D] hover:bg-[#FFFAF4] focus:outline-none focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60"

                  >

                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E5E7EB] text-sm font-bold text-[#4285F4]" aria-hidden="true">

                      G

                    </span>

                    {loading ? 'Connecting to Google...' : 'Continue with Google'}

                  </button>

                  <button

                    type="button"

                    onClick={handleOrganizationSso}

                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#D9DEE7] bg-white px-4 text-sm font-semibold text-[#253044] shadow-sm transition hover:border-[#E5A15D] hover:bg-[#FFFAF4] focus:outline-none focus:ring-4 focus:ring-orange-100"

                  >

                    <Building2 className="h-4 w-4 text-[#C7782A]" />

                    Continue with your organization

                  </button>

                </div>

              )}

              <div className="mt-7 text-center text-sm text-[#667085]">

                {mode === 'login' ? (

                  <>

                    Don't have an account?{' '}

                    <button

                      type="button"

                      onClick={() =>

                        switchMode('register')

                      }

                      className="font-semibold text-[#0878D9]"

                    >

                      Sign up

                    </button>

                  </>

                ) : (

                  <>

                    Already have an account?{' '}

                    <button

                      type="button"

                      onClick={() =>

                        switchMode('login')

                      }

                      className="font-semibold text-[#0878D9]"

                    >

                      Sign in

                    </button>

                  </>

                )}

              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#98A2B3]">

                <ShieldCheck className="h-3.5 w-3.5" />

                Secure customer authentication

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>

  );

}
