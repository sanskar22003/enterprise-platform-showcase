import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import OilGlobe from './components/OilGlobe';
import PlatformPage from './pages/PlatformPage';
import { DotPattern } from './components/ui/DotPattern';
import { cn } from './lib/utils';

export type Theme = 'dark' | 'light';

function CommandCenter({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';
  return (
    <div className='relative flex-1 flex overflow-hidden'>
      <div className='relative z-20 flex-shrink-0 w-1/2 flex flex-col justify-center pl-16 pr-8 pointer-events-none'>
        <div className='pointer-events-auto'>
          <LeftPanel theme={theme} />
        </div>
      </div>
      <div className='absolute inset-0 z-10 overflow-hidden pointer-events-auto'>
        <OilGlobe theme={theme} />
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';

  return (
    <BrowserRouter>
      <div
        className={cn(
          'fixed inset-0 flex flex-col overflow-hidden transition-colors duration-700',
          isDark ? 'bg-[#07101e]' : 'bg-[#f8fafc]',
        )}
      >
        <DotPattern
          width={24} height={24} cx={1} cy={1} cr={1}
          className={cn('transition-colors duration-700', isDark ? 'fill-white/[0.04]' : 'fill-black/[0.06]')}
        />
        <Header theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <Routes>
          <Route path='/' element={<CommandCenter theme={theme} />} />
          <Route path='/platform/:id' element={<PlatformPage theme={theme} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;