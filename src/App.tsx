import { useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'framer-motion';
import { platforms } from './data/platforms';
import Navigation from './components/Navigation';
import PlatformSection from './components/PlatformSection';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Standard window scroll driver
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * platforms.length), platforms.length - 1);
    setActiveIndex(Math.max(0, idx));
  });

  // Darken overlay as user scrolls down
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.25]);

  const handleTabClick = useCallback((index: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / platforms.length) * totalScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Fixed dark background wall */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: '#050d1f', zIndex: 0 }} />

      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
          mixBlendMode: 'overlay',
          opacity: 0.55,
          zIndex: 1,
        }}
      />

      {/* Darkening depth overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ background: '#000', opacity: overlayOpacity, zIndex: 2 }}
      />

      {/* Navigation */}
      <Navigation
        activeIndex={activeIndex}
        onNavigate={handleTabClick}
      />

      {/* Viewport sections fixed in place, driven by window scroll */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {platforms.map((platform, i) => (
          <PlatformSection
            key={platform.id}
            platform={platform}
            index={i}
            totalSections={platforms.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Window scroll spacer */}
      <div
        className="relative w-full pointer-events-none"
        style={{ height: `${platforms.length * 100}vh` }}
        aria-hidden="true"
      />
    </>
  );
}

export default App;
