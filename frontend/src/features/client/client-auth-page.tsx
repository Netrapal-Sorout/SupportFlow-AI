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
                className="mt-8 space-y-5"
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