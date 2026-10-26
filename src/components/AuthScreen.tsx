import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Heart,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Globe,
  UserCheck
} from 'lucide-react';

export const AuthScreen: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({
  isModal = false,
  onClose
}) => {
  const {
    login,
    signUp,
    loginWithGoogle,
    language,
    setLanguage,
    setActiveTab,
    setIsAuthScreenOpen
  } = useApp();

  const isUr = language === 'ur';

  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setErrorMessage(
            isUr ? 'پاس ورڈز ایک دوسرے سے مطابقت نہیں رکھتے۔' : 'Passwords do not match.'
          );
          setLoading(false);
          return;
        }

        const res = await signUp(name, email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Failed to create account.');
        } else {
          if (onClose) onClose();
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid email or password.');
        } else {
          if (onClose) onClose();
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleQuickLogin = async (presetEmail?: string, presetName?: string) => {
    setLoading(true);
    await loginWithGoogle(presetEmail, presetName);
    setLoading(false);
    if (onClose) onClose();
  };

  const handleAhmedDemo = async () => {
    setEmail('ahmed.fitness@gmail.com');
    setPassword('password123');
    setLoading(true);
    await login('ahmed.fitness@gmail.com', 'password123');
    setLoading(false);
    if (onClose) onClose();
  };

  return (
    <div
      className={
        isModal
          ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in'
          : 'min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-slate-100'
      }
    >
      <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Top Accent bar & Language Switch */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-800 px-6 py-4 flex items-center justify-between text-white">
          <Logo size="sm" textColor="text-white" subtextColor="text-sky-300 font-medium" showQuoteOnMobile={true} />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="text-xs font-bold px-2 py-1 rounded bg-white/20 hover:bg-white/30 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-1 rounded-full text-sm font-bold ml-1"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header titles */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'signup'
                ? isUr
                  ? 'نیا اکاؤنٹ بنائیں'
                  : 'Start Your Health Journey'
                : isUr
                ? 'اپنے اکاؤنٹ میں لاگ اِن کریں'
                : 'Welcome Back to FitLife'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {mode === 'signup'
                ? isUr
                  ? 'سائن اپ کے بعد آپ فوراً اپنا ذاتی پلان (Plan Setup) مرتب کریں گے۔'
                  : 'Sign up to immediately customize your workouts, meals, and habit tracker.'
                : isUr
                ? 'کسی بھی جی میل (Gmail) اور پاس ورڈ سے اپنا محفوظ پلان حاصل کریں۔'
                : 'Enter your Gmail ID and password to access your customized plan.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-blue-900 font-extrabold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isUr ? '1. سائن اپ (Sign Up)' : '1. Sign Up (New Plan)'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-blue-900 font-extrabold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isUr ? '2. لاگ اِن (Log In)' : '2. Log In (Existing)'}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {isUr ? 'آپ کا نام' : 'Your Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed, Fatima, Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email / Gmail ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isUr ? 'جی میل یا ای میل آئی ڈی (Gmail / ID)' : 'Gmail or Email ID'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isUr ? 'پاس ورڈ (کم از کم 6 حروف)' : 'Password (min 6 characters)'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {isUr ? 'پاس ورڈ کی تصدیق کریں' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow-md shadow-blue-900/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? (
                <span>{isUr ? 'براہِ کرم انتظار کریں...' : 'Please wait...'}</span>
              ) : mode === 'signup' ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isUr ? 'اکاؤنٹ بنائیں اور پلان شروع کریں' : 'Sign Up & Configure Plan Setup'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>{isUr ? 'لاگ اِن کریں' : 'Log In to My Account'}</span>
                </>
              )}
            </button>

          </form>

          {/* Social / Google Quick Button */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleGoogleQuickLogin(email || 'dr.afia.ahmad@gmail.com', name || 'Afia')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isUr ? 'گوگل (Gmail) کے ذریعے فوری داخلہ' : 'Continue with Google (Gmail)'}</span>
            </button>

            {/* Quick Demo as Ahmed */}
            <button
              type="button"
              onClick={handleAhmedDemo}
              className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{isUr ? 'احمد کے اکاؤنٹ سے ٹیسٹ لاگ اِن (Demo)' : 'Test Login as Ahmed (ahmed.fitness@gmail.com)'}</span>
            </button>
          </div>

          {/* Privacy & Guest Option */}
          <div className="pt-2 text-center space-y-2">
            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>{isUr ? 'پرائیویسی محفوظ: آپ کا پاس ورڈ اور پلان خفیہ ہے' : 'Privacy secured: credentials and plan saved safely'}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onClose) onClose();
                setIsAuthScreenOpen(false);
                setActiveTab('home');
              }}
              className="text-xs text-slate-500 hover:text-blue-800 underline font-medium"
            >
              {isUr ? 'بطور مہمان ویب سائٹ دیکھیں (Guest Preview)' : 'Or explore website as Guest preview'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
