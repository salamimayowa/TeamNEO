import { Link } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout.jsx';
import AuthCard from '../components/AuthCard.jsx';
import SocialLoginButtons from '../components/SocialLoginButtons.jsx';

function SignupPage() {
  return (
    <AuthLayout showBack backTo="/login">
      <AuthCard title="Create an account" subtitle="Join TicketGuard and book smarter">
        <form className="space-y-1">
          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="h-12 w-full rounded-full border-none bg-[#f5f7fb] px-6 text-base text-slate-700 outline-none ring-1 ring-transparent placeholder:text-slate-400 focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-slate-800">
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

          <label className="flex items-start gap-2 text-sm text-slate-400">
            <input type="checkbox" className="mt-1 accent-[#3b82f6]" />
            <span>
              I agree to the{' '}
              <button type="button" className="font-medium text-[#3b82f6]">
                Terms of Service
              </button>
            </span>
          </label>

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-[#3b82f6] text-lg font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Create account
          </button>
        </form>

        <SocialLoginButtons />

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