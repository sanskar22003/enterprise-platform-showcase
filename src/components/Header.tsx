import type { Theme } from '../App';
import { AnimatedThemeToggler } from './ui/AnimatedThemeToggler';
import { cn } from '@/lib/utils';
import logoDark from '../assets/Company_one_logo_dark.png';
import logoLight from '../assets/Company_one_logo_dark.png';
import logoTwo from '../assets/Company_two_logo_both.png';
import logoThree from '../assets/Company_three_logo_both.jpeg';

interface Props { theme: Theme; onToggleTheme: () => void; }

export default function Header({ theme, onToggleTheme }: Props) {
  const isDark = theme === 'dark';
  return (
    <header
      className={cn(
        'absolute top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-8',
        'transition-all duration-700',
        // Premium glowing translucent glassmorphism effect
        isDark
          ? 'border-b border-white/[0.05] bg-[#07101e]/30 backdrop-blur-xl'
          : 'border-b border-black/[0.05] bg-white/30 backdrop-blur-xl',
      )}
    >
      {/* Subtle edge glow */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-[1px]',
        isDark ? 'bg-gradient-to-r from-transparent via-sky-500/20 to-transparent' : 'bg-gradient-to-r from-transparent via-sky-500/10 to-transparent'
      )} />

      {/* Logos */}
      <div className='flex items-center gap-6'>
        <img src={isDark ? logoDark : logoLight} alt='Company One' className='h-8 w-auto object-contain drop-shadow-sm' />
        <div className={cn('w-[1px] h-6', isDark ? 'bg-white/15' : 'bg-black/10')} />
        <img src={logoTwo} alt='Company Two' className='h-7 w-auto object-contain drop-shadow-sm' />
        <div className={cn('w-[1px] h-6', isDark ? 'bg-white/15' : 'bg-black/10')} />
        <img src={logoThree} alt='Company Three' className='h-7 w-auto object-contain rounded-md shadow-sm' />
      </div>

      <AnimatedThemeToggler isDark={isDark} onToggle={onToggleTheme} />
    </header>
  );
}