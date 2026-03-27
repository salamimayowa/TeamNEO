import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import AuthLayout from '../components/AuthLayout.jsx';

function AuthPage() {
  return (
    <AuthLayout showBack backTo="/">
      <AuthCard title="Welcome" subtitle="Choose how you want to continue">
        <div className="space-y-3">
          <Link
            to="/login"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3b82f6] text-lg font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-[#3b82f6] bg-white text-lg font-semibold text-[#3b82f6] transition hover:bg-[#eff6ff]"
          >
            Create Account
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default AuthPage;
