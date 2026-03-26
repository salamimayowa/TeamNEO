import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handlePayment = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      navigate('/ticket');
    }, 2000);
  };

  return (
    <section className="mx-auto max-w-md space-y-6" aria-label="Checkout summary">
      <header className="space-y-2 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Checkout</h2>
        <p className="text-lg font-medium text-slate-700">Review your trip before secure payment.</p>
      </header>

      <article className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-sm" aria-label="Trip summary">
        <h3 className="text-2xl font-bold text-slate-900">Trip Summary</h3>
        <dl className="mt-4 space-y-3 text-lg">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-bold text-slate-700">Route</dt>
            <dd className="text-right font-extrabold text-slate-900">Lagos to Abuja</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-bold text-slate-700">Date</dt>
            <dd className="text-right font-extrabold text-slate-900">March 26, 2026</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-bold text-slate-700">Time</dt>
            <dd className="text-right font-extrabold text-slate-900">8:00 AM</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="font-bold text-slate-700">Seat Number</dt>
            <dd className="text-right font-extrabold text-slate-900">12A</dd>
          </div>
          <div className="mt-2 border-t-2 border-slate-200 pt-3">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-xl font-bold text-slate-900">Total Amount</dt>
              <dd className="text-2xl font-extrabold text-slate-900">₦15,000</dd>
            </div>
          </div>
        </dl>
      </article>

      <section className="space-y-3" aria-label="Payment method section">
        <h3 className="text-2xl font-bold text-slate-900">Select Payment Method</h3>
        <p className="text-lg font-medium text-slate-700">Pay with your card through Interswitch.</p>
        <button
          type="button"
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full rounded-2xl bg-slate-900 px-5 py-5 text-xl font-extrabold text-white shadow-md transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
          aria-busy={isLoading}
        >
          {isLoading ? 'Securing payment...' : 'Pay securely with Interswitch'}
        </button>
      </section>
    </section>
  );
}

export default Checkout;
