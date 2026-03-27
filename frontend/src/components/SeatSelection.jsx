import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../api.js';

function normalizeSeatRows(payload) {
  const seats = Array.isArray(payload?.seats) ? payload.seats : [];

  return seats.map((seat, index) => {
    const seatNumber = seat?.seatNumber || `Seat ${index + 1}`;
    const status = String(seat?.status || '').toUpperCase();
    const isAvailable = seat?.available === true && status === 'AVAILABLE';

    return {
      id: seatNumber,
      seatNumber,
      status: isAvailable ? 'AVAILABLE' : status || 'LOCKED',
      available: isAvailable,
    };
  });
}

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scheduleId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState('');

  const baseFare = Number(location?.state?.baseFare ?? 0);

  useEffect(() => {
    const fetchSeatMap = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await api.get(`/api/seats/map/${scheduleId}`);
        const payload = response?.data ?? {};
        const normalizedSeats = normalizeSeatRows(payload);

        if (!normalizedSeats.length) {
          setErrorMessage('No seats found for this schedule.');
        }

        setAvailableSeats(Number(payload?.availableSeats) || 0);
        setTotalSeats(Number(payload?.totalSeats) || normalizedSeats.length);
        setSeats(normalizedSeats);
      } catch {
        setErrorMessage('Failed to load seat map. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeatMap();
  }, [scheduleId]);

  const handleSeatClick = (seatNumber) => {
    const targetSeat = seats.find((seat) => seat.seatNumber === seatNumber);
    if (!targetSeat || !targetSeat.available) {
      return;
    }

    setSelectedSeat(seatNumber);
    setErrorMessage('');
  };

  const handleProceedToCheckout = async () => {
    if (!selectedSeat || isSubmitting) {
      return;
    }

    const phone = localStorage.getItem('phone');
    if (!phone) {
      setErrorMessage('Phone number missing. Please login again.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        scheduleId: Number(scheduleId),
        seatNumber: selectedSeat,
        phone,
        price: baseFare,
      };

      const response = await api.post('/api/seats/lock', payload);

      if (response.status === 200) {
        navigate('/checkout', {
          state: {
            scheduleId: Number(scheduleId),
            seatNumber: selectedSeat,
            price: baseFare,
          },
        });
      }
    } catch {
      setErrorMessage('Could not lock seat. Please try another seat.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-4 rounded-3xl bg-slate-100 p-4" aria-label="Seat selection">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Select Your Seat</h2>
        <p className="text-lg font-semibold text-slate-700">Schedule ID: {scheduleId}</p>
        <p className="text-lg font-semibold text-slate-700">
          Available Seats: {availableSeats} of {totalSeats}
        </p>
      </header>

      {errorMessage && (
        <p className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 text-lg font-bold text-red-700">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-4 gap-3" aria-label="Loading seat map">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={`seat-skeleton-${index}`} className="h-16 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3" aria-label="Seat map grid">
          {seats.map((seat) => {
            const isUnavailable = !seat.available || seat.status === 'LOCKED' || seat.status === 'USED';
            const isSelected = selectedSeat === seat.seatNumber;

            return (
              <button
                key={seat.id}
                type="button"
                onClick={() => handleSeatClick(seat.seatNumber)}
                disabled={isUnavailable}
                className={`h-16 rounded-2xl border-2 text-lg font-extrabold transition focus:outline-none focus:ring-4 ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-600 text-white focus:ring-emerald-200'
                    : isUnavailable
                      ? 'cursor-not-allowed border-slate-300 bg-slate-300 text-slate-500'
                      : 'border-slate-400 bg-white text-slate-900 hover:border-slate-700 focus:ring-slate-300'
                }`}
                aria-label={`Seat ${seat.seatNumber}`}
              >
                {seat.seatNumber}
              </button>
            );
          })}
        </div>
      )}

      <footer className="sticky bottom-0 z-10 rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-lg">
        <button
          type="button"
          onClick={handleProceedToCheckout}
          disabled={!selectedSeat || isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-xl font-extrabold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Locking seat...' : 'Proceed to Checkout'}
        </button>
      </footer>
    </section>
  );
}

export default SeatSelection;
