import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import AuthCard from '../components/AuthCard.jsx';
import SocialLoginButtons from '../components/SocialLoginButtons.jsx';
import api from '../api.js';

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Phone and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const trimmedIdentifier = identifier.trim();
      const response = await api.post('/api/auth/login', {
        phone: trimmedIdentifier,
        password,
      });

      const token = response?.data?.token;
      const fullName = response?.data?.fullName;

      if (!token) {
        setErrorMessage('Login succeeded but no token was returned by the server.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('phone', trimmedIdentifier);
      if (fullName) {
        localStorage.setItem('fullName', fullName);
      }

      navigate('/home');
    } catch (error) {
      console.error('Login error details:', {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        data: error?.response?.data,
        fullError: error,
      });
      const fallbackMessage = 'Unable to login. Please check your details and try again.';
      const serverMessage = error?.response?.data?.message || 
                           (typeof error?.response?.data === 'string' ? error?.response?.data : null);
      setErrorMessage(serverMessage || error?.message || fallbackMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard title="Welcome back" subtitle="Login to your TicketGuard account">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-md font-medium text-slate-800">
              Phone Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="08022334455"
              className="h-12 w-full rounded-full border-none bg-[#f5f7fb] px-6 text-base text-slate-700 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
              Password
            </label>
            <div className="flex h-12 items-center rounded-full bg-[#f5f7fb] px-6 ring-1 ring-transparent focus-within:ring-2 focus-within:ring-[#3b82f6]">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button type="button" className="text-slate-400">
                <EyeOff size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" className="accent-[#3b82f6]" />
              Remember me
            </label>

            <button type="button" className="font-medium text-[#3b82f6]">
              Forgot password?
            </button>
          </div>

          {errorMessage && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-[#3b82f6] text-lg font-semibold text-white transition hover:bg-[#2563eb] disabled:bg-slate-400"
          >
            {isSubmitting ? 'Logging in... (may take up to 30s)' : 'Login'}
          </button>
        </form>

        <SocialLoginButtons />

        <p className="mt-5 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-[#3b82f6]">
            Create one
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;