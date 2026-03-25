function TicketSuccessPage() {
  return (
    <section className="mx-auto max-w-md space-y-5 text-center" aria-label="Ticket confirmation">
      <h2 className="text-3xl font-extrabold text-slate-900">Payment Successful</h2>
      <p className="text-lg font-medium text-slate-700">Your ticket has been issued and is ready for boarding.</p>

      <article className="rounded-3xl border-2 border-emerald-700 bg-emerald-50 p-5">
        <h3 className="text-2xl font-bold text-slate-900">Ticket Confirmed</h3>
        <p className="mt-2 text-lg font-bold text-slate-900">Lagos to Abuja</p>
        <p className="mt-1 text-lg font-semibold text-slate-800">March 26, 2026 at 8:00 AM</p>
        <p className="mt-1 text-lg font-semibold text-slate-800">Seat 12A</p>
      </article>
    </section>
  );
}

export default TicketSuccessPage;
