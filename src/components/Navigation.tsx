import { motion } from 'framer-motion';
import { platforms } from '@/data/platforms';

interface NavigationProps {
  activeIndex: number;
  onNavigate: (i: number) => void;
}

export default function Navigation({ activeIndex, onNavigate }: NavigationProps) {
  return (
    <header className="relative z-50 flex-shrink-0 h-14 flex items-center justify-between px-5 border-b border-white/[0.06] glass-nav bg-[#050a14]/60">
      {/* Logo */}
      <button onClick={() => onNavigate(0)} className="flex items-center gap-2.5">
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#logo-g)" strokeWidth="2" />
          <polygon points="16,8 22,12 22,20 16,24 10,20 10,12" fill="url(#logo-g)" opacity="0.3" />
          <circle cx="16" cy="16" r="3" fill="url(#logo-g)" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-[13px] font-bold text-white tracking-tight">McDermott</span>
          <span className="text-[9px] font-mono text-white/35 tracking-[0.22em] uppercase">Digital</span>
        </div>
      </button>

      {/* Platform tabs */}
      <nav className="flex items-center gap-0.5">
        {platforms.map((p, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={p.id}
              onClick={() => onNavigate(i)}
              className="relative flex flex-col items-center px-4 py-2 group"
            >
              <span
                className="text-[11px] font-mono tracking-[0.18em] transition-colors duration-200"
                style={{ color: active ? p.colors.accent : 'rgba(255,255,255,0.35)' }}
              >
                {p.number}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: p.colors.accent }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right slot */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">Live</span>
        </div>
        <a
          href="#"
          className="text-[11px] font-medium text-white/40 hover:text-white transition-colors tracking-wide"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
