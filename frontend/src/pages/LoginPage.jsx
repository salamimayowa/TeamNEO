import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import AuthCard from '../components/AuthCard.jsx';
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
      setErrorMessage('Email or phone and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const trimmedIdentifier = identifier.trim();
      const response = await api.post('/api/auth/login', {
        email: trimmedIdentifier,
        password,
      });

      const token = response?.data?.token;
      const fullName = response?.data?.fullName;
      const phone = response?.data?.phone;
      const role = response?.data?.role;

      if (!token) {
        setErrorMessage('Login succeeded but no token was returned by the server.');
        return;
      }

      localStorage.setItem('token', token);
      if (phone) {
        localStorage.setItem('phone', phone);
      }
      if (fullName) {
        localStorage.setItem('fullName', fullName);
      }
      if (role) {
        localStorage.setItem('role', role);
      }

      navigate('/home');
    } catch (error) {
      console.error('Login error details:', {
        status: error?.response?.status,
        baseURL: error?.config?.baseURL,
        url: error?.config?.url,
        message: error?.response?.data?.message,
        data: error?.response?.data,
        fullError: error,
      });
      const status = error?.response?.status;
      const fallbackMessage = 'Unable to login. Please check your details and try again.';
      const serverMessage = error?.response?.data?.message ||
        (typeof error?.response?.data === 'string' ? error?.response?.data : null);

      if (error?.code === 'ECONNABORTED') {
        setErrorMessage('Server took too long to respond. Please try again in a few seconds.');
      } else if (status === 403) {
        setErrorMessage('Invalid email/phone or password. Please check your details and try again.');
      } else {
        setErrorMessage(serverMessage || error?.message || fallbackMessage);
      }
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
              Email or Phone Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="johndoe@gmail.com or 08022334455"
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