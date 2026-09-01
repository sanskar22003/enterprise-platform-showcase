/**
 * CommandVisual — A command center dashboard with a radar sweep,
 * site map pins, alert indicators, and a live operations timeline.
 */
export default function CommandVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(96,165,250,0.15))' }}
            >
                <defs>
                    <linearGradient id="cmd-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="cmd-radar" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="cmd-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="250" cy="250" r="220" fill="url(#cmd-glow)" />

                {/* Radar / situational awareness map */}
                <g transform="translate(250, 220)">
                    {/* Concentric rings */}
                    {[40, 80, 120, 160].map((r, i) => (
                        <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="1" />
                    ))}
                    {/* Cross lines */}
                    <line x1="-160" y1="0" x2="160" y2="0" stroke="rgba(96,165,250,0.1)" strokeWidth="1" />
                    <line x1="0" y1="-160" x2="0" y2="160" stroke="rgba(96,165,250,0.1)" strokeWidth="1" />

                    {/* Radar sweep */}
                    <g style={{ transformOrigin: 'center', animation: 'spin 4s linear infinite' }}>
                        <path d="M 0 0 L 160 0 A 160 160 0 0 0 113 -113 Z" fill="url(#cmd-radar)" opacity="0.5" />
                        <line x1="0" y1="0" x2="160" y2="0" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
                    </g>

                    {/* Site pins */}
                    {[
                        { x: 60, y: -50, label: 'Site A', status: 'ok' },
                        { x: -80, y: 30, label: 'Site B', status: 'warn' },
                        { x: 40, y: 80, label: 'Site C', status: 'ok' },
                        { x: -50, y: -90, label: 'Site D', status: 'ok' },
                        { x: 110, y: 40, label: 'Site E', status: 'alert' },
                    ].map((s, i) => (
                        <g key={i} transform={`translate(${s.x}, ${s.y})`}>
                            <circle cx="0" cy="0" r="10" fill={s.status === 'alert' ? 'rgba(239,68,68,0.1)' : s.status === 'warn' ? 'rgba(251,191,36,0.1)' : 'rgba(96,165,250,0.1)'} stroke={s.status === 'alert' ? '#ef4444' : s.status === 'warn' ? '#fbbf24' : '#60a5fa'} strokeWidth="1.5" />
                            <circle cx="0" cy="0" r="3" fill={s.status === 'alert' ? '#ef4444' : s.status === 'warn' ? '#fbbf24' : '#60a5fa'} style={{ animation: `blink ${1.5 + i * 0.3}s ease-in-out infinite` }} />
                            <text x="0" y="-16" textAnchor="middle" fill="rgba(96,165,250,0.5)" fontSize="7" fontFamily="JetBrains Mono">{s.label}</text>
                        </g>
                    ))}
                </g>

                {/* Top status bar */}
                <g transform="translate(250, 50)">
                    <rect x="-110" y="-14" width="220" height="22" rx="4" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
                    <circle cx="-96" cy="-3" r="3" fill="#60a5fa" style={{ animation: 'blink 1s ease-in-out infinite' }} />
                    <text x="-84" y="1" fill="#60a5fa" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">COMMAND CENTER — ACTIVE</text>
                </g>

                {/* Bottom timeline */}
                <g transform="translate(80, 420)">
                    <line x1="0" y1="0" x2="340" y2="0" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
                    {[
                        { x: 20, color: '#60a5fa', label: '08:00' },
                        { x: 80, color: '#34d399', label: '09:30' },
                        { x: 140, color: '#fbbf24', label: '11:00' },
                        { x: 200, color: '#60a5fa', label: '12:30' },
                        { x: 260, color: '#ef4444', label: '14:00' },
                        { x: 320, color: '#60a5fa', label: '15:30' },
                    ].map((e, i) => (
                        <g key={i}>
                            <circle cx={e.x} cy="0" r="5" fill="#0a0f18" stroke={e.color} strokeWidth="1.5" />
                            <circle cx={e.x} cy="0" r="2" fill={e.color} />
                            <text x={e.x} y="18" textAnchor="middle" fill="rgba(96,165,250,0.4)" fontSize="7" fontFamily="JetBrains Mono">{e.label}</text>
                        </g>
                    ))}
                </g>

                {/* Left stat panel */}
                <g transform="translate(60, 160)">
                    <rect x="-30" y="-30" width="60" height="60" rx="6" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.15)" strokeWidth="1" />
                    <text x="0" y="-8" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="700" fontFamily="Inter">247</text>
                    <text x="0" y="6" textAnchor="middle" fill="rgba(96,165,250,0.4)" fontSize="7" fontFamily="JetBrains Mono">PERSONNEL</text>
                    <text x="0" y="20" textAnchor="middle" fill="rgba(52,211,153,0.6)" fontSize="7" fontFamily="JetBrains Mono">ALL SAFE</text>
                </g>

                {/* Right alert panel */}
                <g transform="translate(440, 160)">
                    <rect x="-30" y="-30" width="60" height="60" rx="6" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" />
                    <text x="0" y="-8" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="700" fontFamily="Inter">3</text>
                    <text x="0" y="6" textAnchor="middle" fill="rgba(239,68,68,0.4)" fontSize="7" fontFamily="JetBrains Mono">ACTIVE</text>
                    <text x="0" y="20" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="7" fontFamily="JetBrains Mono">ALERTS</text>
                </g>

                {/* Right permits panel */}
                <g transform="translate(440, 300)">
                    <rect x="-30" y="-30" width="60" height="60" rx="6" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.15)" strokeWidth="1" />
                    <text x="0" y="-8" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="700" fontFamily="Inter">18</text>
                    <text x="0" y="6" textAnchor="middle" fill="rgba(96,165,250,0.4)" fontSize="7" fontFamily="JetBrains Mono">WORK</text>
                    <text x="0" y="20" textAnchor="middle" fill="rgba(96,165,250,0.6)" fontSize="7" fontFamily="JetBrains Mono">PERMITS</text>
                </g>
            </svg>
        </div>
    );
}
