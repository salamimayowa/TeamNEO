function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full rounded-[36px] bg-white px-6 pt-10 pb-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <div className="text-center">
        <h2 className="text-[1.75rem] font-extrabold leading-tight text-slate-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-base text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}

export default AuthCard;