import { Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { Platform } from '@/data/platforms';
import * as LucideIcons from 'lucide-react';
import * as Visuals from '@/visuals';

interface PlatformSectionProps {
  platform: Platform;
  index: number;
  totalSections: number;
  scrollYProgress?: any; // kept for compatibility if passed, but ignored
}

export default function PlatformSection({ platform, index }: PlatformSectionProps) {
  const contentLeft = platform.contentSide === 'left';
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '200px 0px', once: false });

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[iconName];
    if (!Icon) return null;
    return <Icon className="w-4 h-4" strokeWidth={1.5} />;
  };

  const VisualComponent = (Visuals as any)[platform.visual];
  const visual = (VisualComponent && isInView) ? (
    <Suspense fallback={<div className="w-full h-full min-h-[300px]" />}>
      <VisualComponent />
    </Suspense>
  ) : null;

  return (
    <section
      ref={sectionRef}
      id={platform.id}
      className="relative w-full h-full min-h-screen flex items-center overflow-hidden"
      style={{ background: platform.colors.bgGradient, backgroundColor: platform.colors.bg }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Accent glow blobs */}
      <motion.div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: platform.colors.glow,
          top: contentLeft ? '10%' : '40%',
          [contentLeft ? 'right' : 'left']: '5%',
          opacity: 0.5,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Section number watermark */}
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 text-[20vw] lg:text-[280px] font-black text-white/5 pointer-events-none select-none leading-none"
      >
        {platform.number}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-16 lg:py-24 h-full flex flex-col justify-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full ${contentLeft ? '' : 'lg:[direction:rtl]'}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`flex flex-col gap-5 lg:gap-6 lg:[direction:ltr] ${contentLeft ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono tracking-[0.2em] uppercase font-medium"
                style={{ color: platform.colors.eyebrow }}
              >
                Platform {platform.number}
              </span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${platform.colors.accent}40, transparent)` }} />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              {platform.name}
            </h2>

            {/* Tagline */}
            <p
              className="text-base lg:text-lg font-medium"
              style={{ color: platform.colors.accent }}
            >
              {platform.tagline}
            </p>

            {/* Overview */}
            <p className="text-sm lg:text-base text-white/50 leading-relaxed max-w-xl">
              {platform.overview}
            </p>

            {/* Capabilities grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {platform.capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-default"
                >
                  <span style={{ color: platform.colors.accent }}>{renderIcon(cap.icon)}</span>
                  <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors font-medium leading-tight">
                    {cap.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Integration credit */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: platform.colors.accent }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: `${platform.colors.accent}80` }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: `${platform.colors.accent}40` }} />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-wide">{platform.integrationCredit}</span>
            </div>

            {/* CTA */}
            <a
              href={platform.url}
              className="group inline-flex items-center gap-2 mt-2 lg:mt-4 px-5 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 self-start animated-border focus-ring"
              style={{ ['--accent-color' as string]: platform.colors.accent }}
            >
              <span>Explore Platform</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`flex items-center justify-center w-full h-[30vh] min-h-[250px] lg:h-[50vh] lg:min-h-[400px] lg:[direction:ltr] ${contentLeft ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {visual}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — only on first section */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
}
