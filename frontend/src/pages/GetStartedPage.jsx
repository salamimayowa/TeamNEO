import { Link } from 'react-router-dom';

function GetStartedPage() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="Get started"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.78) 68%), url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col justify-end px-5 pb-10 pt-12">
        <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold leading-tight text-white">
            Book Inter-state Bus Trips with Confidence
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-100">
            Fast booking, secure payments, and seamless boarding for passengers and drivers.
          </p>

          <Link
            to="/auth"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-4 text-xl font-extrabold text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GetStartedPage;
