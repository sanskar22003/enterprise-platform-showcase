import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { platforms } from '@/data/platforms';

interface NavigationProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function Navigation({ activeIndex, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav bg-[#050a14]/70 border-b border-white/5' : 'bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav(0)} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <defs>
                  <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="url(#nav-logo-grad)" strokeWidth="2" />
                <polygon points="16,8 22,12 22,20 16,24 10,20 10,12" fill="url(#nav-logo-grad)" opacity="0.3" />
                <circle cx="16" cy="16" r="3" fill="url(#nav-logo-grad)" />
              </svg>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-sm font-bold text-white tracking-tight">McDermott</span>
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Digital</span>
            </div>
          </button>

          {/* Desktop nav pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {platforms.map((p, i) => (
              <button
                key={p.id}
                onClick={() => handleNav(i)}
                className="group relative px-3 py-1.5 rounded-full transition-all duration-300"
              >
                <span
                  className={`text-xs font-mono tracking-wider transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}
                >
                  {p.number}
                </span>
                {activeIndex === i && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${p.colors.navPill}15`, border: `1px solid ${p.colors.navPill}40` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/70"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass-nav bg-[#050a14]/90 border-b border-white/5 lg:hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {platforms.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => handleNav(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeIndex === i ? 'bg-white/5' : 'hover:bg-white/3'
                    }`}
                >
                  <span className="text-xs font-mono" style={{ color: p.colors.accent }}>{p.number}</span>
                  <span className={`text-sm ${activeIndex === i ? 'text-white' : 'text-white/60'}`}>{p.name}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side progress indicator (desktop) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
        {platforms.map((p, i) => (
          <button
            key={p.id}
            onClick={() => handleNav(i)}
            className="group relative flex items-center"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'scale-150' : 'group-hover:scale-125'
                }`}
              style={{
                background: activeIndex === i ? p.colors.accent : 'rgba(255,255,255,0.2)',
                boxShadow: activeIndex === i ? `0 0 12px ${p.colors.accent}` : 'none',
              }}
            />
            {activeIndex === i && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-6 whitespace-nowrap text-[10px] font-mono text-white/50"
              >
                {p.number} — {p.name}
              </motion.div>
            )}
          </button>
        ))}
        {/* Progress line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
          <motion.div
            className="w-px bg-gradient-to-b from-sky-400 via-purple-400 to-amber-400"
            style={{ height: `${((activeIndex + 1) / platforms.length) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
