import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function AuthLayout({ title = 'TicketGuard', showBack = false, backTo = '/login', children }) {
  return (
    <div className="min-h-screen bg-[#dfe4ee] px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[430px] flex-col items-center rounded-[38px] border border-slate-300 bg-[#eef2f7] px-5 pt-6 pb-8 shadow-xl">
        <div className="flex w-full items-center justify-between">
          <div className="w-12">
            {showBack && (
              <Link
                to={backTo}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm"
                aria-label="Go back"
              >
                <ChevronLeft size={22} />
              </Link>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#3b82f6]">
            TicketGuard
          </h1>

          <div className="w-12" />
        </div>

        <div className="mt-4 flex w-full flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;