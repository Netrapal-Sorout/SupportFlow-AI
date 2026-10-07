import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  Zap,
} from 'lucide-react';

import {
  FormEvent,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { login, register } from './auth.api';
import { setAccessToken } from './auth.storage';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState<AuthMode>('login');

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  // Prevent duplicate login/register requests.
  // useRef is used because it updates immediately
  // without waiting for a React re-render.
  const submittingRef =
    useRef(false);

  function switchMode(
    nextMode: AuthMode,
  ) {
    setMode(nextMode);
    setError('');
    setSuccess('');
    setShowPassword(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    // Prevent double-clicks and duplicate
    // submit events from sending two API requests.
    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;

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

        await register({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        setSuccess(
          'Account created successfully. You can now sign in.',
        );

        setMode('login');
        setName('');
        setPassword('');

        return;
      }

      const result = await login({
        email: email.trim(),
        password,
      });

      setAccessToken(
        result.data.token,
      );

      navigate('/admin', {
        replace: true,
      });
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : mode === 'register'
            ? 'Unable to create your account.'
            : 'Unable to sign in.',
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1380px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-[#E4EAF2] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_0.9fr]">

          {/* LEFT — PRODUCT PANEL */}
          <section className="relative hidden min-h-[700px] overflow-hidden bg-[#17233F] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative z-10">

              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                  <Zap className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-lg font-bold text-white">
                    SupportFlow AI
                  </div>

                  <div className="text-xs text-slate-300">
                    AI-powered support operations
                  </div>
                </div>
              </div>

              {/* Product message */}
              <div className="mt-28 max-w-xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Intelligent support
                </div>

                <h1 className="mt-5 text-4xl font-bold leading-[1.12] text-white xl:text-5xl">
                  Resolve customer
                  <br />
                  issues faster with AI.
                </h1>

                <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-300">
                  Bring tickets, customers, knowledge,
                  analytics and AI assistance into one
                  powerful support workspace.
                </p>
              </div>
            </div>

            {/* Product features */}
            <div className="relative z-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />

                <div className="mt-3 text-sm font-semibold text-white">
                  AI Ticket Intelligence
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Understand, categorize and prioritize support requests.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />

                <div className="mt-3 text-sm font-semibold text-white">
                  AI Reply Assistance
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Create faster, context-aware responses for agents.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />

                <div className="mt-3 text-sm font-semibold text-white">
                  Knowledge Hub
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Keep your support knowledge available in one place.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />

                <div className="mt-3 text-sm font-semibold text-white">
                  Support Analytics
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Understand workload, performance and customer trends.
                </p>
              </div>

            </div>
          </section>

          {/* RIGHT — AUTH PANEL */}
          <section className="flex min-h-[700px] items-center justify-center bg-white p-7 sm:p-10 lg:p-12 xl:p-16">
            <div className="w-full max-w-[430px]">

              {/* Mobile brand */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0878D9]">
                  <Zap className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-lg font-bold text-[#17233F]">
                    SupportFlow AI
                  </div>

                  <div className="text-xs text-[#667085]">
                    AI-powered support operations
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#17233F]">
                  {mode === 'login'
                    ? 'Welcome back'
                    : 'Create your account'}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#667085]">
                  {mode === 'login'
                    ? 'Sign in to access your SupportFlow AI workspace and continue managing your support operations.'
                    : 'Create your SupportFlow AI account and bring your support operations into one intelligent workspace.'}
                </p>
              </div>

              {/* Success */}
              {success && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <p className="text-sm text-emerald-700">
                    {success}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Name */}
                {mode === 'register' && (
                  <div>
                    <label
                      htmlFor="auth-name"
                      className="mb-2 block text-sm font-semibold text-[#344054]"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        disabled={loading}
                        className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-10 pr-4 text-sm text-[#17233F] outline-none transition placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="auth-email"
                    className="mb-2 block text-sm font-semibold text-[#344054]"
                  >
                    Work email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@company.com"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-10 pr-4 text-sm text-[#17233F] outline-none transition placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="auth-password"
                      className="block text-sm font-semibold text-[#344054]"
                    >
                      Password
                    </label>

                    {mode === 'login' && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#0878D9] hover:text-[#0669BD]"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      id="auth-password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      autoComplete={
                        mode === 'login'
                          ? 'current-password'
                          : 'new-password'
                      }
                      required
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder={
                        mode === 'login'
                          ? 'Enter your password'
                          : 'Create a password'
                      }
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-10 pr-11 text-sm text-[#17233F] outline-none transition placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#344054]"
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
                      Use at least 8 characters.
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0669BD] focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      {mode === 'login'
                        ? 'Signing in...'
                        : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {mode === 'login'
                        ? 'Sign in'
                        : 'Create account'}

                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* SSO area */}
              <div className="mt-7">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#E4EAF2]" />

                  <span className="text-xs font-medium text-[#98A2B3]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#E4EAF2]" />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] transition hover:bg-[#F8FAFC]"
                  >
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] transition hover:bg-[#F8FAFC]"
                  >
                    Microsoft
                  </button>
                </div>
              </div>

              {/* Switch login/register */}
              <div className="mt-7 text-center text-sm text-[#667085]">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}

                    <button
                      type="button"
                      onClick={() =>
                        switchMode('register')
                      }
                      className="font-semibold text-[#0878D9] hover:text-[#0669BD]"
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
                      className="font-semibold text-[#0878D9] hover:text-[#0669BD]"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#98A2B3]">
                <ShieldCheck className="h-3.5 w-3.5" />

                Secure authentication for your support workspace
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}