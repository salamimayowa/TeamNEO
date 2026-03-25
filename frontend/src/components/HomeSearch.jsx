const mockTrips = [
  'Lagos to Abuja - 8:00 AM - ₦15,000',
  'Abuja to Port Harcourt - 10:30 AM - ₦18,500',
  'Lagos to Enugu - 1:15 PM - ₦13,000',
];

function HomeSearch() {
  return (
    <section className="space-y-6" aria-label="Bus search">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Where to?</h2>
        <p className="mt-2 text-lg font-medium text-slate-700">Search inter-state buses for today.</p>
      </div>

      <form className="space-y-4" aria-label="Find buses form">
        <div className="space-y-2">
          <label htmlFor="leaving-from" className="block text-lg font-bold text-slate-900">
            Leaving from
          </label>
          <input
            id="leaving-from"
            name="leavingFrom"
            type="text"
            placeholder="Lagos"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-4 text-lg font-semibold text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="going-to" className="block text-lg font-bold text-slate-900">
            Going to
          </label>
          <input
            id="going-to"
            name="goingTo"
            type="text"
            placeholder="Abuja"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-4 text-lg font-semibold text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="trip-date" className="block text-lg font-bold text-slate-900">
            Travel date
          </label>
          <input
            id="trip-date"
            name="tripDate"
            type="date"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-4 text-lg font-semibold text-slate-900 focus:border-slate-900 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-slate-900 px-5 py-5 text-xl font-extrabold text-white shadow-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          Find Buses
        </button>
      </form>

      <div className="space-y-3" aria-label="Available trips today">
        <h3 className="text-2xl font-bold text-slate-900">Available trips today</h3>
        {mockTrips.map((trip) => (
          <article
            key={trip}
            className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm"
            aria-label={trip}
          >
            <p className="text-lg font-bold leading-relaxed text-slate-900">{trip}</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-lg font-extrabold text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Select
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomeSearch;
