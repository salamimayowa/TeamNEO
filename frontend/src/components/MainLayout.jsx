import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, QrCode, Ticket } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/tickets', label: 'My Tickets', icon: Ticket },
  { to: '/scanner', label: 'Driver Scanner', icon: QrCode },
];

function MainLayout() {
  const { pathname } = useLocation();
  const hideBottomNav = pathname === '/checkout' || pathname === '/ticket';

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-4 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border-2 border-slate-300 bg-white shadow-xl sm:min-h-[760px]">
        <header className="border-b-2 border-slate-200 px-5 py-4">
          <h1 className="text-xl font-bold text-slate-900">TicketGuard Transit</h1>
          <p className="mt-1 text-lg font-medium text-slate-700">Inter-state travel made simple</p>
        </header>

        <main className="flex-1 overflow-y-auto p-5 pb-28" aria-live="polite">
          <Outlet />
        </main>

        {!hideBottomNav && (
          <nav
            className="fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-lg"
            aria-label="Primary"
          >
            <ul className="grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;

                return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex min-h-[72px] flex-col items-center justify-center rounded-xl border-2 px-2 py-2 text-lg font-semibold transition ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100'
                      }`
                    }
                    aria-label={item.label}
                  >
                    <IconComponent size={28} strokeWidth={2.25} aria-hidden="true" />
                    <span className="mt-1 text-center leading-tight">{item.label}</span>
                  </NavLink>
                </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
