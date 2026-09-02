import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { platforms } from './data/platforms';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const platform = platforms[activeIndex];

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#050a14]">
      {/* Grain overlay */}
      <div className="noise-overlay" />

      {/* Ambient platform glow — transitions with platform */}
      <AnimatePresence mode="wait">
        <motion.div
          key={platform.id + '-bg'}
          className="fixed inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 72% 48%, ' +
              platform.colors.glow +
              ' 0%, transparent 70%)',
          }}
        />
      </AnimatePresence>

      {/* Top Navigation */}
      <Navigation activeIndex={activeIndex} onNavigate={setActiveIndex} />

      {/* Body — sidebar + content + right panel */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <Sidebar activeIndex={activeIndex} onNavigate={setActiveIndex} />

        <div className="flex flex-1 overflow-hidden divide-x divide-white/[0.05]">
          <MainContent platform={platform} />
          <RightPanel platform={platform} />
        </div>
      </div>

      {/* Status bar */}
      <StatusBar platform={platform} />
    </div>
  );
}

export default App;
