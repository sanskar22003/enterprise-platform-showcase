import type { Theme } from '../App';
import { AnimatedThemeToggler } from './ui/AnimatedThemeToggler';
import { cn } from '@/lib/utils';
import logoDark from '../assets/Company_one_logo_dark.png';
import logoLight from '../assets/Company_one_logo_light.jpg';
import logoTwo from '../assets/Company_two_logo_both.png';
import logoThree from '../assets/Company_three_logo_both.jpeg';

interface Props { theme: Theme; onToggleTheme: () => void; }

export default function Header({ theme, onToggleTheme }: Props) {
  const isDark = theme === 'dark';
  return (
    <header
      className={cn(
        'relative z-50 flex-shrink-0 h-[60px] flex items-center justify-between px-8',
        'transition-all duration-700',
        isDark
          ? 'border-b border-white/[0.06] bg-[#07101e]/80 backdrop-blur-xl'
          : 'border-b border-black/[0.07] bg-[#f2f5f9]/80 backdrop-blur-xl',
      )}
    >
      {/* Logos */}
      <div className='flex items-center gap-5'>
        <img src={isDark ? logoDark : logoLight} alt='Company One' className='h-7 w-auto object-contain' />
        <div className={cn('w-px h-5', isDark ? 'bg-white/10' : 'bg-black/10')} />
        <img src={logoTwo} alt='Company Two' className='h-6 w-auto object-contain' />
        <div className={cn('w-px h-5', isDark ? 'bg-white/10' : 'bg-black/10')} />
        <img src={logoThree} alt='Company Three' className='h-6 w-auto object-contain rounded-sm' />
      </div>

      {/* Theme toggle — MagicUI animated */}
      <AnimatedThemeToggler isDark={isDark} onToggle={onToggleTheme} />
    </header>
  );
}