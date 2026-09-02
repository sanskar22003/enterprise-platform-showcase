import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedThemeTogglerProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export function AnimatedThemeToggler({ isDark, onToggle, className }: AnimatedThemeTogglerProps) {
  const handleToggle = async () => {
    const supportsVT = !!(document as any).startViewTransition;

    if (!supportsVT) {
      onToggle();
      return;
    }

    const html = document.documentElement;
    html.dataset['magicuiThemeVt'] = 'active';

    const root = document.documentElement;
    const clipFrom = isDark
      ? 'circle(0% at 100% 0%)'
      : 'circle(150% at 100% 0%)';
    const clipTo = isDark
      ? 'circle(150% at 100% 0%)'
      : 'circle(0% at 100% 0%)';

    root.style.setProperty('--magicui-theme-vt-clip-from', clipFrom);
    root.style.setProperty('--magicui-theme-toggle-vt-duration', '600ms');

    const transition = (document as any).startViewTransition(() => {
      onToggle();
    });

    transition.ready.then(() => {
      root.animate(
        { clipPath: [clipFrom, clipTo] },
        { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });

    transition.finished.finally(() => {
      delete html.dataset['magicuiThemeVt'];
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label='Toggle theme'
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300',
        'border',
        isDark
          ? 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          : 'border-black/10 bg-black/5 text-black/60 hover:text-black hover:bg-black/10',
        className,
      )}
    >
      <span className='relative w-4 h-4'>
        <Sun
          className={cn(
            'absolute inset-0 w-4 h-4 transition-all duration-300',
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50',
          )}
        />
        <Moon
          className={cn(
            'absolute inset-0 w-4 h-4 transition-all duration-300',
            isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100',
          )}
        />
      </span>
    </button>
  );
}

export default AnimatedThemeToggler;