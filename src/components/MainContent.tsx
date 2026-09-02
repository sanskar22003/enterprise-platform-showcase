import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Platform } from '@/data/platforms';
import * as LucideIcons from 'lucide-react';

interface Props { platform: Platform; }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVar = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'tween' as const, duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { type: 'tween' as const, duration: 0.22 } },
};

function renderIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[name];
  if (!Icon) return null;
  return <Icon className='w-3.5 h-3.5' strokeWidth={1.5} />;
}

export default function MainContent({ platform }: Props) {
  return (
    <main className='relative flex-1 flex flex-col justify-center overflow-hidden px-10 py-8'>
      <div className='absolute inset-0 grid-pattern opacity-20 pointer-events-none' />
      <AnimatePresence mode='wait'>
        <motion.div key={platform.id} variants={container} initial='hidden' animate='show' exit='exit' className='relative z-10 max-w-[560px] flex flex-col gap-5'>
          <motion.div variants={itemVar} className='flex items-center gap-3'>
            <span className='text-[10px] font-mono tracking-[0.22em] uppercase font-medium' style={{ color: platform.colors.eyebrow }}>Platform {platform.number}</span>
            <div className='h-px flex-1 max-w-[48px]' style={{ background: 'linear-gradient(90deg, ' + '${accent}' + '60, transparent)'.replace('${accent}', platform.colors.accent) }} />
          </motion.div>
          <motion.h1 variants={itemVar} className='text-[36px] font-bold text-white leading-[1.05] tracking-tight'>{platform.name}</motion.h1>
          <motion.p variants={itemVar} className='text-[14px] font-medium leading-snug' style={{ color: platform.colors.accent }}>{platform.tagline}</motion.p>
          <motion.p variants={itemVar} className='text-[13px] text-white/45 leading-relaxed line-clamp-3'>{platform.overview}</motion.p>
          <motion.div variants={itemVar} className='grid grid-cols-3 gap-1.5'>
            {platform.capabilities.map((cap) => (
              <div key={cap.label} className='capability-chip group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-200 cursor-default' style={{ '--chip-accent': platform.colors.accent } as React.CSSProperties}>
                <span style={{ color: platform.colors.accent }}>{renderIcon(cap.icon)}</span>
                <span className='text-[10px] text-white/50 font-medium leading-tight truncate group-hover:text-white/80 transition-colors'>{cap.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.div variants={itemVar} className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <span className='w-1 h-1 rounded-full' style={{ background: platform.colors.accent }} />
              <span className='w-1 h-1 rounded-full opacity-60' style={{ background: platform.colors.accent }} />
              <span className='w-1 h-1 rounded-full opacity-30' style={{ background: platform.colors.accent }} />
            </div>
            <span className='text-[10px] font-mono text-white/30 tracking-wide'>{platform.integrationCredit}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}