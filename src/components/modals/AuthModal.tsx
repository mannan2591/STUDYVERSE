import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyVerseLogo } from '../common/StudyVerseLogo';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    authPrompt,
    login, 
    signup, 
    loginWithGoogle,
    resetPassword,
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('Class 10');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (authModalMode === 'login') {
        if (!email || !password) {
          setError('Please enter both email and password.');
          setIsSubmitting(false);
          return;
        }
        await login(email, password);
      } else if (authModalMode === 'signup') {
        if (!name || !email || !password) {
          setError('Please fill in all required fields.');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        await signup(name, email, password, grade);
      } else if (authModalMode === 'forgot') {
        if (!email) {
          setError('Please enter your registered email.');
          setIsSubmitting(false);
          return;
        }
        await resetPassword(email);
        setForgotSubmitted(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An authentication error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      const success = await loginWithGoogle();
      if (!success) {
        // User closed or dismissed the popup window without completing sign-in
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign in was unsuccessful.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl glass-dropdown p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700 shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Logo & Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <StudyVerseLogo size="md" variant="icon" />
          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {authPrompt?.title ? authPrompt.title : (
              <>
                {authModalMode === 'login' && 'Sign in to StudyVerse'}
                {authModalMode === 'signup' && 'Create Student Account'}
                {authModalMode === 'forgot' && 'Reset Password'}
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">
            {authPrompt?.message ? authPrompt.message : (
              <>
                {authModalMode === 'login' && 'Cloud-synced study tasks, progress, and streaks.'}
                {authModalMode === 'signup' && 'Organize your homework, syllabus, and achievements.'}
                {authModalMode === 'forgot' && 'Enter your email to receive recovery instructions.'}
              </>
            )}
          </p>
        </div>

        {/* Visitor Feature Prompt Alert Box */}
        {authPrompt && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-2.5 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-800 dark:text-amber-300">
                Sign in or login to continue
              </span>
              <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                All daily streaks, homework tasks, and XP start at 0. Sign in or create your free account to unlock full access and save your progress!
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center gap-2.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password Success State */}
        {authModalMode === 'forgot' && forgotSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-[#0F8B6D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              A password reset link has been dispatched to <strong className="text-[#0F8B6D]">{email}</strong>.
            </p>
            <button
              onClick={() => {
                setForgotSubmitted(false);
                setAuthModalMode('login');
              }}
              className="w-full py-2.5 rounded-xl bg-[#0F8B6D] text-white font-semibold text-xs sm:text-sm hover:bg-[#0A6650] transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google Sign In Quick Button */}
            {authModalMode !== 'forgot' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
                  <span className="text-[11px] uppercase font-semibold text-neutral-400">or with email</span>
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authModalMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Student Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Raghuveer"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Class / Grade Level
                    </label>
                    <select
                      value={grade}
                      onChange={e => setGrade(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                    >
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10 (SSC / Board)</option>
                      <option value="Class 11 / Inter 1st">Class 11 / Inter 1st Year</option>
                      <option value="Class 12 / Inter 2nd">Class 12 / Inter 2nd Year</option>
                      <option value="College / Degree">College / Degree Student</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@studyverse.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                  />
                </div>
              </div>

              {authModalMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Password
                    </label>
                    {authModalMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthModalMode('forgot')}
                        className="text-[11px] text-[#0F8B6D] hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#0F8B6D]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-[#0F8B6D] hover:bg-[#0A6650] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>
                      {authModalMode === 'login' && 'Sign In'}
                      {authModalMode === 'signup' && 'Create Account'}
                      {authModalMode === 'forgot' && 'Send Reset Instructions'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer Mode Switcher */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-600 dark:text-neutral-400">
          {authModalMode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => {
                  setError('');
                  setAuthModalMode('signup');
                }}
                className="font-semibold text-[#0F8B6D] hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setError('');
                  setAuthModalMode('login');
                }}
                className="font-semibold text-[#0F8B6D] hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
