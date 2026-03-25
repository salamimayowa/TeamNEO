function DriverScannerPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Driver Scanner</h2>
      <p className="text-lg font-medium leading-relaxed text-slate-800">
        Use this page to scan and verify passenger boarding tickets.
      </p>

      <div className="rounded-2xl border-2 border-blue-800 bg-blue-50 p-4 text-slate-900">
        <p className="text-lg font-semibold">Scanner is ready for integration.</p>
        <p className="mt-2 text-lg">Camera permission and QR validation flow will be connected next.</p>
      </div>
    </section>
  );
}

export default DriverScannerPage;
