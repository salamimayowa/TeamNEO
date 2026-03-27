import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

function HomeSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadAvailableSchedules = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await api.get('/api/schedules/available');
        const rows = Array.isArray(response.data) ? response.data : [];
        setSchedules(rows);
      } catch {
        setErrorMessage('Unable to fetch available schedules right now. Please try again shortly.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailableSchedules();
  }, []);

  const cards = useMemo(() => {
    return schedules.map((schedule, index) => {
      const departure = schedule?.departureTime ? new Date(schedule.departureTime) : null;
      const departureLabel = departure
        ? departure.toLocaleString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'Time TBD';

      return {
        id: schedule?.id ?? `schedule-${index}`,
        origin: schedule?.route?.origin ?? 'Unknown origin',
        destination: schedule?.route?.destination ?? 'Unknown destination',
        departureLabel,
        baseFare:
          typeof schedule?.route?.baseFare === 'number' ? Number(schedule.route.baseFare) : 0,
        priceLabel:
          typeof schedule?.route?.baseFare === 'number'
            ? `N${schedule.route.baseFare.toLocaleString()}`
            : 'Fare unavailable',
      };
    });
  }, [schedules]);

  return (
    <section className="space-y-5 rounded-3xl bg-slate-100 p-4 sm:p-5" aria-label="Home schedules">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Where to?</h2>
        <p className="text-lg font-semibold text-slate-700">Available inter-state bus schedules.</p>
      </header>

      {isLoading && (
        <div className="space-y-3" aria-label="Loading schedules">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-6 w-2/3 rounded bg-slate-200" />
              <div className="mt-3 h-5 w-1/2 rounded bg-slate-200" />
              <div className="mt-3 h-5 w-1/3 rounded bg-slate-200" />
              <div className="mt-5 h-12 w-full rounded-2xl bg-slate-200" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && errorMessage && (
        <p className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 text-base font-bold text-red-700">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && (
        <div className="space-y-3" aria-label="Available schedules list" role="list">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-md"
              aria-label={`${card.origin} to ${card.destination}`}
              role="listitem"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-slate-600">Route</p>
              <p className="text-2xl font-black text-slate-900">
                {card.origin} to {card.destination}
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-slate-600">Departure Time</p>
              <p className="text-lg font-extrabold text-slate-800">{card.departureLabel}</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-slate-600">Base Fare</p>
              <p className="text-xl font-black text-slate-900">{card.priceLabel}</p>
              <Link
                to={`/seat-map/${card.id}`}
                state={{ baseFare: card.baseFare }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-4 text-xl font-extrabold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                Select Seat
              </Link>
            </article>
          ))}

          {!cards.length && (
            <p className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-4 text-lg font-bold text-slate-700">
              No available schedules at the moment.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default HomeSearch;
