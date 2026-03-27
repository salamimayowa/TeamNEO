import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../api.js';

const demoPassengers = ['Amina Bello', 'Chinedu Okafor', 'Fatima Musa'];

function DriverScanner() {
  const scannerId = useId().replace(/:/g, '');
  const qrScannerRef = useRef(null);
  const scanLockedRef = useRef(false);
  const toggleResultRef = useRef(false);

  const [manualTicketId, setManualTicketId] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [result, setResult] = useState(null);

  const tryBackendVerification = useCallback(async (ticketId) => {
    try {
      const response = await api.post('/api/driver/verify-ticket', { ticketId });
      const payload = response?.data;

      if (payload?.valid) {
        return {
          status: 'valid',
          message: `VALID - ${payload?.passengerName || 'Passenger'}`,
        };
      }

      if (payload?.valid === false) {
        return {
          status: 'invalid',
          message: 'INVALID / FRAUD',
        };
      }

      return null;
    } catch {
      return null;
    }
  }, []);

  const showMockResult = useCallback((ticketValue) => {
    toggleResultRef.current = !toggleResultRef.current;

    if (toggleResultRef.current) {
      const passengerIndex = ticketValue.length % demoPassengers.length;
      const passengerName = demoPassengers[passengerIndex];
      setResult({
        status: 'valid',
        message: `VALID - ${passengerName}`,
      });
      return;
    }

    setResult({
      status: 'invalid',
      message: 'INVALID / FRAUD',
    });
  }, []);

  const runVerification = useCallback(async (ticketId) => {
    const backendResult = await tryBackendVerification(ticketId);

    if (backendResult) {
      setResult(backendResult);
      return;
    }

    showMockResult(ticketId);
  }, [showMockResult, tryBackendVerification]);

  useEffect(() => {
    const scanner = new Html5Qrcode(`driver-scanner-${scannerId}`);
    qrScannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
          aspectRatio: 1,
        },
        async (decodedText) => {
          if (scanLockedRef.current) {
            return;
          }

          scanLockedRef.current = true;
          setManualTicketId(decodedText);
          await runVerification(decodedText);
        },
        () => {
          // Ignore frame-level scan failures while camera is active.
        },
      )
      .catch(() => {
        setCameraError('Camera could not start. You can still verify ticket IDs manually.');
      });

    return () => {
      const activeScanner = qrScannerRef.current;
      if (!activeScanner) {
        return;
      }

      activeScanner
        .stop()
        .catch(() => {
          // Scanner might already be stopped.
        })
        .finally(() => {
          activeScanner.clear().catch(() => {
            // Container cleanup best-effort.
          });
        });
    };
  }, [runVerification, scannerId]);

  const handleVerifyManual = async () => {
    if (!manualTicketId.trim()) {
      return;
    }

    scanLockedRef.current = true;
    await runVerification(manualTicketId.trim());
  };

  const closeResult = () => {
    setResult(null);
    scanLockedRef.current = false;
  };

  return (
    <section className="space-y-5" aria-label="Driver ticket scanner">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Driver Scanner</h2>
        <p className="text-lg font-semibold text-slate-700">Scan passenger QR tickets or verify with manual ID entry.</p>
      </header>

      <div className="overflow-hidden rounded-3xl border-2 border-slate-300 bg-slate-900">
        <div className="h-[42vh] min-h-[280px] w-full bg-black" id={`driver-scanner-${scannerId}`} aria-label="Camera viewfinder" />
      </div>

      {cameraError && (
        <p className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-lg font-semibold text-amber-900">
          {cameraError}
        </p>
      )}

      <div className="space-y-3 rounded-3xl border-2 border-slate-300 bg-white p-4">
        <label htmlFor="manual-ticket-id" className="block text-lg font-bold text-slate-900">
          Enter Ticket ID manually
        </label>
        <input
          id="manual-ticket-id"
          type="text"
          value={manualTicketId}
          onChange={(event) => setManualTicketId(event.target.value)}
          placeholder="TKT-84920"
          className="w-full rounded-2xl border-2 border-slate-300 px-4 py-4 text-lg font-semibold text-slate-900 placeholder:text-slate-500 focus:border-slate-900 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleVerifyManual}
          className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-xl font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          Verify
        </button>
      </div>

      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
          <div
            className={`w-full max-w-sm rounded-3xl border-4 p-6 text-center shadow-2xl ${
              result.status === 'valid'
                ? 'border-emerald-700 bg-emerald-100 text-emerald-900'
                : 'border-red-700 bg-red-100 text-red-900'
            }`}
          >
            <p className="text-4xl font-black leading-tight">{result.message}</p>
            <button
              type="button"
              onClick={closeResult}
              className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-xl font-bold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DriverScanner;
