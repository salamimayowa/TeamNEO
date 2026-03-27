import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import AuthCard from '../components/AuthCard.jsx';
import api from '../api.js';

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('PASSENGER');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Full name, phone, email, and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      };

      console.log('Sending signup payload:', payload);
      const response = await api.post('/api/auth/register', payload);
      console.log('Signup response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup error details:', {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        data: error?.response?.data,
        fullError: error,
      });
      const status = error?.response?.status;
      const fallbackMessage = 'Unable to create account. Please try again.';
      const serverMessage = error?.response?.data?.message ||
        (typeof error?.response?.data === 'string' ? error?.response?.data : null);

      if (error?.code === 'ECONNABORTED') {
        setErrorMessage('Server took too long to respond. Please try again in a few seconds.');
      } else if (status === 403) {
        setErrorMessage('This email or phone may already be registered. Try logging in or use different details.');
      } else {
        setErrorMessage(serverMessage || error?.message || fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout showBack backTo="/login">
      <AuthCard title="Create an account" subtitle="Join TicketGuard and book smarter">
        <form className="space-y-1" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="John Doe"
              className="h-12 w-full rounded-full border-none bg-[#f5f7fb] px-6 text-base text-slate-700 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="08012345678"
              className="h-12 w-full rounded-full border-none bg-[#f5f7fb] px-6 text-base text-slate-700 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="johndoe@gmail.com"
              className="h-12 w-full rounded-full border-none bg-[#f5f7fb] px-6 text-base text-slate-700 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('PASSENGER')}
                className={`h-11 rounded-full border-2 text-sm font-semibold transition ${
                  role === 'PASSENGER'
                    ? 'border-[#3b82f6] bg-[#3b82f6] text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-[#3b82f6]'
                }`}
              >
                Passenger
              </button>
              <button
                type="button"
                onClick={() => setRole('DRIVER')}
                className={`h-11 rounded-full border-2 text-sm font-semibold transition ${
                  role === 'DRIVER'
                    ? 'border-[#3b82f6] bg-[#3b82f6] text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-[#3b82f6]'
                }`}
              >
                Driver
              </button>
            </div>
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
            {isSubmitting ? 'Creating account... (may take up to 30s)' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#3b82f6]">
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default SignupPage;