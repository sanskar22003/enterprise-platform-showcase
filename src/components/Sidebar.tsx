import { motion } from 'framer-motion';
import { platforms } from '@/data/platforms';

interface SidebarProps {
  activeIndex: number;
  onNavigate: (i: number) => void;
}

export default function Sidebar({ activeIndex, onNavigate }: SidebarProps) {
  return (
    <aside className="relative z-10 flex-shrink-0 w-[200px] flex flex-col border-r border-white/[0.05] bg-white/[0.01] overflow-hidden">
      {/* Section label */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-[9px] font-mono text-white/25 tracking-[0.25em] uppercase">Platforms</span>
      </div>

      {/* Platform list */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-hidden">
        {platforms.map((p, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={p.id}
              onClick={() => onNavigate(i)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group transition-colors duration-150"
              style={{
                background: active ? p.colors.accent + '0d' : 'transparent',
              }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                animate={{
                  opacity: active ? 1 : 0,
                  scaleY: active ? 1 : 0.3,
                  background: p.colors.accent,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />

              {/* Number */}
              <span
                className="text-[10px] font-mono tracking-wider flex-shrink-0 transition-colors duration-200"
                style={{ color: active ? p.colors.accent : 'rgba(255,255,255,0.25)' }}
              >
                {p.number}
              </span>

              {/* Name */}
              <span
                className="text-[11px] font-medium leading-tight transition-colors duration-200 truncate"
                style={{ color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
              >
                {p.name}
              </span>

              {/* Active dot */}
              {active && (
                <motion.div
                  layoutId="sidebar-dot"
                  className="ml-auto w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: p.colors.accent }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom hint */}
      <div className="px-5 py-4 border-t border-white/[0.05]">
        <span className="text-[9px] font-mono text-white/20 tracking-wider">
          {platforms.length} platforms
        </span>
      </div>
    </aside>
  );
}
