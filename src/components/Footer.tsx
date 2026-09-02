import type { Theme } from '../App';
import { siteConfig } from '../config/platforms';
import { cn } from '@/lib/utils';

interface Props { theme: Theme; }

export default function Footer({ theme }: Props) {
  const isDark = theme === 'dark';
  return (
    <footer
      className={cn(
        'absolute bottom-0 left-0 right-0 z-50 h-[50px] flex items-center justify-between px-8',
        'transition-all duration-700',
        isDark
          ? 'border-t border-white/[0.05] bg-[#07101e]/30 backdrop-blur-xl'
          : 'border-t border-black/[0.05] bg-white/30 backdrop-blur-xl',
      )}
    >
      {/* Subtle edge glow */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-[1px]',
        isDark ? 'bg-gradient-to-r from-transparent via-sky-500/20 to-transparent' : 'bg-gradient-to-r from-transparent via-sky-500/10 to-transparent'
      )} />

      <div className={cn('text-xs font-semibold tracking-widest uppercase', isDark ? 'text-white/50' : 'text-black/50')}>
        {siteConfig.footerText}
      </div>

      <div className='flex gap-6'>
        {siteConfig.footerItems?.map((text, i) => (
          <div
            key={i}
            className={cn(
              'text-[11px] font-medium tracking-wide uppercase',
              isDark ? 'text-white/40' : 'text-black/40'
            )}
          >
            {text}
          </div>
        ))}
      </div>
    </footer>
  );
}