import { AnimatePresence, motion } from 'framer-motion';
import type { Platform } from '@/data/platforms';

interface Props {
  platform: Platform;
}

export default function StatusBar({ platform }: Props) {
  return (
    <div className="relative z-50 flex-shrink-0 h-8 flex items-center justify-between px-5 border-t border-white/[0.05] bg-[#050a14]/80 glass-nav">
      {/* Left — active platform */}
      <div className="flex items-center gap-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: platform.colors.accent }}
            />
            <span className="text-[9px] font-mono tracking-[0.18em] text-white/35 uppercase">
              {platform.number} — {platform.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center — ecosystem */}
      <div className="flex items-center gap-3">
        {['McDermott', 'ADNOC', 'Tech Mahindra', 'Siemens'].map((partner) => (
          <span key={partner} className="text-[9px] font-mono text-white/15 tracking-wide">
            {partner}
          </span>
        ))}
      </div>

      {/* Right — build tag */}
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-mono text-white/15 tracking-wider">v2.5.0</span>
        <span className="text-[9px] font-mono text-white/15">· Enterprise</span>
      </div>
    </div>
  );
}
