import React from 'react';
import { motion } from 'framer-motion';
import type { Platform } from '@/data/platforms';

interface Props {
  platform: Platform;
}

// â”€â”€ Digital Twin â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DigitalTwinViz({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="dt-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#dt-glow)" />
      {/* Concentric hexagons */}
      {[90, 65, 40, 18].map((r, i) => (
        <motion.polygon
          key={r}
          points={hexPoints(130, 130, r)}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity={0.2 + i * 0.15}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '130px 130px' }}
        />
      ))}
      {/* Orbital dots */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 130 + 70 * Math.cos(rad);
        const cy = 130 + 70 * Math.sin(rad);
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill={color}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        );
      })}
      {/* Center */}
      <motion.circle
        cx="130" cy="130" r="6"
        fill={color}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '130px 130px' }}
      />
      {/* Data lines */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 130 + 68 * Math.cos(rad);
        const y2 = 130 + 68 * Math.sin(rad);
        return (
          <motion.line
            key={i} x1="130" y1="130" x2={x2} y2={y2}
            stroke={color} strokeWidth="0.5" strokeOpacity="0.25"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
          />
        );
      })}
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1);
  }).join(' ');
}

// â”€â”€ Sustainability â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SustainViz({ color }: { color: string }) {
  const wave = (offset: number, amp: number) => {
    const pts = Array.from({ length: 26 }, (_, i) => {
      const x = i * 10;
      const y = 130 + amp * Math.sin((i + offset) * 0.55);
      return (i === 0 ? 'M' : 'L') + x + ' ' + y;
    }).join(' ');
    return pts;
  };
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="sus-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#sus-glow)" />
      {[0, 2, 4].map((off, i) => (
        <motion.path
          key={i}
          d={wave(off, 28 - i * 6)}
          fill="none"
          stroke={color}
          strokeWidth={1.2 - i * 0.3}
          strokeOpacity={0.5 - i * 0.1}
          animate={{ d: [wave(off, 28 - i * 6), wave(off + 3, 32 - i * 6), wave(off, 28 - i * 6)] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* ESG bar chart */}
      {[60, 80, 95, 70, 88].map((h, i) => (
        <motion.rect
          key={i}
          x={40 + i * 38}
          y={190 - h * 0.7}
          width="18"
          height={h * 0.7}
          rx="2"
          fill={color}
          fillOpacity={0.08 + i * 0.04}
          stroke={color}
          strokeOpacity={0.3}
          strokeWidth="0.8"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
      <motion.circle cx="130" cy="80" r="14" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.4"
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '130px 80px' }} />
      <text x="130" y="85" textAnchor="middle" fill={color} fontSize="11" fontFamily="JetBrains Mono" fillOpacity="0.7">ESG</text>
    </svg>
  );
}

// â”€â”€ AR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ARViz({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="ar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#ar-glow)" />
      {/* AR bracket corners */}
      {[
        [50, 50], [210, 50], [210, 210], [50, 210]
      ].map(([x, y], i) => {
        const sx = i % 2 === 0 ? 1 : -1;
        const sy = i < 2 ? 1 : -1;
        return (
          <g key={i}>
            <motion.path
              d={"M " + (x + sx * 22) + " " + y + " L " + x + " " + y + " L " + x + " " + (y + sy * 22)}
              fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.7"
              animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
            />
          </g>
        );
      })}
      {/* Scan line */}
      <motion.line
        x1="60" x2="200"
        y1="130" y2="130"
        stroke={color} strokeWidth="1" strokeOpacity="0.6"
        strokeDasharray="4 3"
        animate={{ y1: [65, 195, 65], y2: [65, 195, 65] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cross-hairs */}
      <line x1="130" y1="100" x2="130" y2="160" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="100" y1="130" x2="160" y2="130" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      <motion.circle cx="130" cy="130" r="12" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.5"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '130px 130px' }} />
      {/* Data nodes */}
      {[[90, 85], [170, 95], [155, 170]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="4" fill={color} fillOpacity="0.5"
          animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, delay: i * 0.5, repeat: Infinity }} style={{ transformOrigin: cx + 'px ' + cy + 'px' }} />
      ))}
      {/* Grid lines */}
      {[80, 130, 180].map((v, i) => (
        <line key={'h' + i} x1="60" y1={v} x2="200" y2={v} stroke={color} strokeWidth="0.4" strokeOpacity="0.1" />
      ))}
      {[80, 130, 180].map((v, i) => (
        <line key={'v' + i} x1={v} y1="60" x2={v} y2="200" stroke={color} strokeWidth="0.4" strokeOpacity="0.1" />
      ))}
    </svg>
  );
}

// â”€â”€ IoT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function IoTViz({ color }: { color: string }) {
  const nodes = [[130, 130], [70, 90], [190, 85], [75, 175], [185, 170], [130, 60], [60, 135]];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,5],[2,4],[3,6]];
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="iot-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#iot-glow)" />
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={color} strokeWidth="0.8" strokeOpacity="0.25"
          strokeDasharray="3 3"
          animate={{ strokeOpacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.g key={i}>
          <motion.circle cx={cx} cy={cy} r={i === 0 ? 10 : 5}
            fill={color} fillOpacity={i === 0 ? 0.9 : 0.5}
            animate={{ scale: [1, i === 0 ? 1.2 : 1.4, 1] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
            style={{ transformOrigin: cx + 'px ' + cy + 'px' }} />
          <motion.circle cx={cx} cy={cy} r={i === 0 ? 18 : 10}
            fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.2"
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
            style={{ transformOrigin: cx + 'px ' + cy + 'px' }} />
        </motion.g>
      ))}
    </svg>
  );
}

// â”€â”€ AI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AIViz({ color }: { color: string }) {
  const layers = [[130], [95, 130, 165], [80, 110, 150, 180], [95, 130, 165], [130]];
  const yPositions = [50, 95, 140, 185, 225];
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#ai-glow)" />
      {/* Connections */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((x1) =>
          layers[li + 1].map((x2, ni) => (
            <motion.line key={x1 + '-' + x2 + '-' + li}
              x1={x1} y1={yPositions[li]}
              x2={x2} y2={yPositions[li + 1]}
              stroke={color} strokeWidth="0.6" strokeOpacity="0.18"
              animate={{ strokeOpacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2 + ni * 0.2, repeat: Infinity, delay: (li + ni) * 0.15 }}
            />
          ))
        )
      )}
      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.map((cx, ni) => (
          <motion.circle key={li + '-' + ni}
            cx={cx} cy={yPositions[li]} r="5"
            fill={color} fillOpacity={li === 0 || li === 4 ? 0.9 : 0.5}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, delay: (li + ni) * 0.18, repeat: Infinity }}
            style={{ transformOrigin: cx + 'px ' + yPositions[li] + 'px' }}
          />
        ))
      )}
    </svg>
  );
}

// â”€â”€ Command â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CommandViz({ color }: { color: string }) {
  const markers = [[80,90],[160,80],[190,140],[140,180],[75,160],[110,115]];
  return (
    <svg viewBox="0 0 260 260" className="w-full h-full max-w-[260px] max-h-[260px]">
      <defs>
        <radialGradient id="cmd-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="120" fill="url(#cmd-glow)" />
      {/* Map grid */}
      {[60,90,120,150,180,210].map(v => (
        <line key={'h'+v} x1="50" y1={v} x2="210" y2={v} stroke={color} strokeWidth="0.4" strokeOpacity="0.08" />
      ))}
      {[60,90,120,150,180,210].map(v => (
        <line key={'v'+v} x1={v} y1="50" x2={v} y2="210" stroke={color} strokeWidth="0.4" strokeOpacity="0.08" />
      ))}
      {/* Zone polygons */}
      <motion.polygon points="80,90 160,80 190,140 140,180 75,160"
        fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.8" strokeOpacity="0.25"
        animate={{ fillOpacity: [0.04, 0.1, 0.04] }} transition={{ duration: 4, repeat: Infinity }} />
      {/* Location markers */}
      {markers.map(([cx, cy], i) => (
        <motion.g key={i}>
          <motion.circle cx={cx} cy={cy} r="4" fill={color} fillOpacity="0.7"
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
            style={{ transformOrigin: cx + 'px ' + cy + 'px' }} />
          <motion.circle cx={cx} cy={cy} r="10" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.2"
            animate={{ r: [10, 18, 10], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }} />
        </motion.g>
      ))}
      {/* Compass */}
      <motion.circle cx="195" cy="65" r="14" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '195px 65px' }} />
      <text x="195" y="69" textAnchor="middle" fill={color} fontSize="9" fontFamily="JetBrains Mono" fillOpacity="0.5">N</text>
    </svg>
  );
}

// â”€â”€ Router â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const VISUAL_MAP: Record<string, (c: string) => React.ReactElement> = {
  'platform-1': (c) => <DigitalTwinViz color={c} />,
  'platform-2': (c) => <SustainViz color={c} />,
  'platform-3': (c) => <ARViz color={c} />,
  'platform-4': (c) => <IoTViz color={c} />,
  'platform-5': (c) => <AIViz color={c} />,
  'platform-6': (c) => <CommandViz color={c} />,
};

export default function PlatformVisual({ platform }: Props) {
  const render = VISUAL_MAP[platform.id];
  if (!render) return null;
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      {render(platform.colors.accent)}
    </div>
  );
}
