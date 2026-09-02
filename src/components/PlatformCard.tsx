import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Platform } from '@/data/platforms';
import * as LucideIcons from 'lucide-react';

interface PlatformCardProps {
  platform: Platform;
  index: number;
}

const CARD_ICONS: Record<string, string> = {
  'platform-1': 'Box',
  'platform-2': 'Leaf',
  'platform-3': 'Glasses',
  'platform-4': 'Radio',
  'platform-5': 'Brain',
  'platform-6': 'Map',
};

export default function PlatformCard({ platform, index }: PlatformCardProps) {
  const renderIcon = (iconName: string, cls = 'w-4 h-4') => {
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[iconName];
    if (!Icon) return null;
    return <Icon className={cls} strokeWidth={1.5} />;
  };

  const cardIconName = CARD_ICONS[platform.id] ?? 'Box';

  return (
    <motion.article
      id={platform.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] transition-all duration-500"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 48px -12px ' + platform.colors.glow + ', 0 0 0 1px ' + platform.colors.accent + '20';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-[2px] w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, ' + platform.colors.accent + ', ' + platform.colors.accent + '30)' }}
      />

      {/* Card visual header */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '160px',
          background: platform.colors.bgGradient,
          backgroundColor: platform.colors.bg,
        }}
      >
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div
          className="absolute rounded-full blur-[60px] pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            background: platform.colors.glow,
            opacity: 0.5,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute right-4 bottom-2 text-[80px] font-black leading-none pointer-events-none select-none"
          style={{ color: platform.colors.accent + '10' }}
        >
          {platform.number}
        </div>
        <div
          className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10"
          style={{
            background: 'radial-gradient(circle at 40% 30%, ' + platform.colors.accent + '20, transparent 70%)',
            boxShadow: '0 0 32px ' + platform.colors.glow,
          }}
        >
          <span style={{ color: platform.colors.accent }}>
            {renderIcon(cardIconName, 'w-7 h-7')}
          </span>
        </div>
        <span
          className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.2em] uppercase"
          style={{ color: platform.colors.eyebrow }}
        >
          {platform.number}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-bold text-white leading-snug tracking-tight">{platform.name}</h3>
          <p className="text-xs font-medium leading-snug" style={{ color: platform.colors.accent }}>{platform.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {platform.capabilities.map((cap) => (
            <div
              key={cap.label}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02]"
            >
              <span style={{ color: platform.colors.accent }}>{renderIcon(cap.icon, 'w-3 h-3')}</span>
              <span className="text-[10px] text-white/50 font-medium leading-tight truncate">{cap.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-mono text-white/25 tracking-wide leading-snug border-t border-white/[0.05] pt-3 mt-auto">
          {platform.integrationCredit}
        </p>

        <a
          href={platform.url}
          className="group/btn inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white transition-all duration-300 border border-white/[0.08] hover:border-white/20 animated-border focus-ring"
          style={{ '--accent-color': platform.colors.accent } as React.CSSProperties}
        >
          <span>Explore Platform</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            style={{ color: platform.colors.accent }}
          />
        </a>
      </div>
    </motion.article>
  );
}