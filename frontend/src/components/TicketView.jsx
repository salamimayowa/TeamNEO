import { CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ticket = {
  id: 'TKT-84920',
  route: 'Lagos to Abuja',
  date: 'March 26, 2026',
  time: '8:00 AM',
  seat: '12A',
};

function TicketView() {
  const qrPayload = JSON.stringify({
    ticketId: ticket.id,
    route: ticket.route,
    date: ticket.date,
    time: ticket.time,
    seat: ticket.seat,
  });

  return (
    <section className="mx-auto max-w-md space-y-6" aria-label="Purchased ticket view">
      <header className="space-y-3 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" strokeWidth={2.5} aria-hidden="true" />
        <h2 className="text-3xl font-extrabold text-slate-900">Payment Successful</h2>
        <p className="text-lg font-medium text-slate-700">Your bus ticket is ready for verification.</p>
      </header>

      <article className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200" aria-label="Ticket card">
        <h3 className="text-2xl font-bold text-slate-900">Ticket Card</h3>

        <div className="mt-4 space-y-2 text-lg text-slate-900">
          <p className="font-bold">Route: {ticket.route}</p>
          <p className="font-semibold">Date: {ticket.date}</p>
          <p className="font-semibold">Time: {ticket.time}</p>
          <p className="font-semibold">Seat: {ticket.seat}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <QRCodeSVG
              value={qrPayload}
              size={220}
              level="H"
              includeMargin
              title={`QR code for ticket ${ticket.id}`}
            />
          </div>
        </div>

        <p className="mt-5 text-center text-3xl font-extrabold tracking-wide text-slate-900">{ticket.id}</p>
      </article>
    </section>
  );
}

export default TicketView;
