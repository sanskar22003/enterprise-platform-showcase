import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Platform } from '@/data/platforms';
import PlatformVisual from './PlatformVisual';

interface Props {
  platform: Platform;
}

export default function RightPanel({ platform }: Props) {
  return (
    <aside className="relative flex-shrink-0 w-[340px] flex flex-col overflow-hidden">
      {/* Visual area */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={platform.id + '-visual'}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PlatformVisual platform={platform} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action area */}
      <div className="flex-shrink-0 border-t border-white/[0.05] p-5 flex flex-col gap-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={platform.id + '-cta'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono text-white/30 tracking-wider uppercase">Access</p>
                <p className="text-[13px] font-semibold text-white mt-0.5">{platform.name}</p>
              </div>
              <a
                href={platform.url}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-medium text-white transition-all duration-300 border hover:opacity-90"
                style={{
                  borderColor: platform.colors.accent + '50',
                  background: platform.colors.accent + '12',
                  color: platform.colors.accent,
                  boxShadow: '0 0 20px ' + platform.colors.glow,
                }}
              >
                Explore
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.05] bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors group"
            >
              <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
              <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors tracking-wide">
                Request enterprise demo
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
