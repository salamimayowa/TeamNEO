import { Mail, Phone } from 'lucide-react';

function SocialLoginButtons() {
  const buttons = [
    {
      label: 'Phone',
      icon: <Phone size={20} />,
    },
    {
      label: 'Gmail',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <div className="mt-6">
      <p className="mb-4 text-center text-sm text-slate-400">Or Sign in with</p>

      <div className="flex items-center justify-center gap-4">
        {buttons.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-[#f5f7fb] px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-[#e9eef8]"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SocialLoginButtons;