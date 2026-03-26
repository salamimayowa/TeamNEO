import { Link } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import AuthCard from '../components/AuthCard.jsx';
import SocialLoginButtons from '../components/SocialLoginButtons.jsx';

function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard title="Welcome back" subtitle="Login to your TicketGuard account">
        <form className="space-y-3">
          <div>
            <label className="mb-1 block text-md font-medium text-slate-800">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com / 08012345678"
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

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-[#3b82f6] text-lg font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Login
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