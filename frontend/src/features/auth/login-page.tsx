import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  LockKeyhole,
  Mail,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { login } from './auth.api';
import { setAccessToken } from './auth.storage';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(
    values: LoginFormValues,
  ): Promise<void> {
    try {
      setServerError(null);

      const response = await login(values);

      setAccessToken(response.data.token);

      navigate('/dashboard', {
        replace: true,
      });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Unable to login. Please try again.',
      );
    }
  }

  return (
    <main className="login-page relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-10">

      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      {/* Soft animated gradient */}
      <div
        className="login-gradient pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Moving grid */}
      <div
        className="login-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Blue glow */}
      <div
        className="login-orb login-orb-one pointer-events-none absolute"
        aria-hidden="true"
      />

      {/* Cyan glow */}
      <div
        className="login-orb login-orb-two pointer-events-none absolute"
        aria-hidden="true"
      />

      {/* Purple glow */}
      <div
        className="login-orb login-orb-three pointer-events-none absolute"
        aria-hidden="true"
      />

      {/* Center subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/20 blur-[120px]"
        aria-hidden="true"
      />

      {/* =====================================================
          LOGIN CONTENT
      ====================================================== */}

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            SupportFlow AI
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            AI-powered customer support platform
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card rounded-2xl border border-slate-200/90 bg-white/95 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-[25px] font-semibold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your support workspace.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={[
                    'h-11 w-full rounded-lg border bg-white/90',
                    'pl-10 pr-4 text-sm text-slate-900',
                    'outline-none transition',
                    'placeholder:text-slate-400',
                    'focus:ring-4 focus:ring-blue-500/10',
                    errors.email
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-slate-200 focus:border-blue-500',
                  ].join(' ')}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className={[
                    'h-11 w-full rounded-lg border bg-white/90',
                    'pl-10 pr-4 text-sm text-slate-900',
                    'outline-none transition',
                    'placeholder:text-slate-400',
                    'focus:ring-4 focus:ring-blue-500/10',
                    errors.password
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-slate-200 focus:border-blue-500',
                  ].join(' ')}
                />
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
              >
                {serverError}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                'Signing in...'
              ) : (
                <>
                  <span>Sign in</span>

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          {/* Security */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <CheckCircle2
                size={14}
                className="text-green-500"
              />

              <span>
                Secure access to your support workspace
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Headphones size={14} />

          <span>
            SupportFlow AI Support Operations
          </span>
        </div>
      </div>
    </main>
  );
}