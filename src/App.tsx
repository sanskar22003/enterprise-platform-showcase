import { useState } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import OilGlobe from './components/OilGlobe';
import { DotPattern } from './components/ui/DotPattern';
import { cn } from './lib/utils';

export type Theme = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'fixed inset-0 flex flex-col overflow-hidden transition-colors duration-700',
        isDark ? 'bg-[#07101e]' : 'bg-[#f8fafc]',
      )}
    >
      {/* MagicUI Dot Pattern background */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          'transition-colors duration-700',
          isDark ? 'fill-white/[0.04]' : 'fill-black/[0.06]',
        )}
      />

      {/* Header */}
      <Header theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />

      {/* Body: left panel + globe */}
      <div className='relative flex-1 flex overflow-hidden'>

        {/* Left panel — title + 6 buttons, always on top */}
        <div className='relative z-20 flex-shrink-0 w-1/2 flex flex-col justify-center pl-16 pr-8 pointer-events-none'>
          {/* We make wrapper pointer-events-none so globe can be interacted through it if it overflows */}
          <div className='pointer-events-auto'>
            <LeftPanel theme={theme} />
          </div>
        </div>

        {/* Globe — absolute, fills entire screen, positioned to right (via pl-[20%] inside OilGlobe) */}
        <div className='absolute inset-0 z-10 overflow-hidden'>
          <OilGlobe theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default App;