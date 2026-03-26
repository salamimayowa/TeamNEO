function MyTicketsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">My Tickets</h2>
      <p className="text-lg font-medium leading-relaxed text-slate-800">
        Your active and upcoming tickets appear here.
      </p>

      <div className="rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-4 text-slate-900">
        <p className="text-lg font-semibold">No active ticket yet.</p>
        <p className="mt-2 text-lg">When you buy a ticket, it will show here with seat and time.</p>
      </div>
    </section>
  );
}

export default MyTicketsPage;
