import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { platforms } from '@/data/platforms';
import type { Theme } from '../App';
import { cn } from '@/lib/utils';

interface Props { theme: Theme; }

const SHORT: Record<string, string> = {
  'platform-1': 'O&M Digital Twin',
  'platform-2': 'iSustain O&G',
  'platform-3': 'SmartInspect AR',
  'platform-4': 'ConnectIQ IoT',
  'platform-5': 'Nexus AI Engine',
  'platform-6': 'FieldOps Command',
};

export default function LeftPanel({ theme }: Props) {
  const isDark = theme === 'dark';

  return (
    <div className='flex flex-col gap-8'>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className='flex flex-col gap-3'
      >
        <span className={cn('text-[12px] font-mono tracking-[0.25em] uppercase font-semibold', isDark ? 'text-white/40' : 'text-black/40')}>
          USLTDP 2.0
        </span>
        <h1 className={cn('text-[36px] font-extrabold leading-[1.1] tracking-tight', isDark ? 'text-white' : 'text-gray-900')}>
          O&M Digital Twin
        </h1>
        <p className={cn('text-[16px] leading-relaxed max-w-[400px]', isDark ? 'text-white/60' : 'text-black/60')}>
          Real-time Operations & Maintenance for Offshore Assets
        </p>
        <div
          className='mt-2 h-[2px] w-16 rounded-full'
          style={{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
        />
      </motion.div>

      {/* 6 Platform buttons - 2 Column Grid */}
      <div className='grid grid-cols-2 gap-3 max-w-[600px]'>
        {platforms.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2, scale: 1.01 }}
            className={cn(
              'group relative flex items-center justify-between gap-3 px-4 py-4 rounded-2xl',
              'border transition-all duration-300 cursor-pointer overflow-hidden',
            )}
            style={{
              borderColor: isDark ? p.colors.accent + '25' : p.colors.accent + '40',
              background: isDark ? p.colors.accent + '0a' : p.colors.accent + '15',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = p.colors.accent + '60';
              el.style.boxShadow = '0 8px 32px -12px ' + p.colors.glow + ', inset 0 1px 0 ' + p.colors.accent + '20';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = isDark ? p.colors.accent + '25' : p.colors.accent + '40';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Hover sweep */}
            <div
              className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
              style={{ background: 'linear-gradient(135deg, ' + p.colors.accent + '10 0%, transparent 70%)' }}
            />

            <div className='flex items-center gap-3 relative z-10 min-w-0'>
              <span
                className='text-[10px] font-mono tracking-[0.2em] flex-shrink-0'
                style={{ color: isDark ? p.colors.accent : p.colors.accent }}
              >
                {p.number}
              </span>
              <span
                className={cn('text-[13px] font-bold truncate', isDark ? 'text-white' : 'text-gray-900')}
              >
                {SHORT[p.id] ?? p.name}
              </span>
            </div>

            <ArrowUpRight
              className='w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              style={{ color: p.colors.accent }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}