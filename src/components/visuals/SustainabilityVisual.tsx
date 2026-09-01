/**
 * SustainabilityVisual — Animated carbon reduction dashboard
 * with falling leaf particles, emission bars declining, and a
 * circular progress ring approaching net-zero.
 */
export default function SustainabilityVisual() {
    const bars = [85, 72, 64, 51, 38, 29, 18];
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Floating leaf particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-emerald-400/30"
                        style={{
                            left: `${10 + i * 11}%`,
                            top: '-20px',
                            fontSize: `${10 + (i % 3) * 4}px`,
                            animation: `float ${4 + (i % 3) * 2}s ease-in-out ${i * 0.5}s infinite`,
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>
                    </div>
                ))}
            </div>

            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(52,211,153,0.15))' }}
            >
                <defs>
                    <linearGradient id="sus-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="sus-bar" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                    </linearGradient>
                    <radialGradient id="sus-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="250" cy="250" r="220" fill="url(#sus-glow)" />

                {/* Circular progress ring — net zero target */}
                <g transform="translate(250, 180)">
                    <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="8" />
                    <circle
                        cx="0" cy="0" r="90" fill="none" stroke="url(#sus-grad)" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${90 * 2 * Math.PI * 0.82} ${90 * 2 * Math.PI}`}
                        transform="rotate(-90)"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(52,211,153,0.5))' }}
                    />
                    {/* Tick marks */}
                    {Array.from({ length: 40 }).map((_, i) => {
                        const angle = (i * 9 * Math.PI) / 180;
                        const x1 = 98 * Math.cos(angle);
                        const y1 = 98 * Math.sin(angle);
                        const x2 = 103 * Math.cos(angle);
                        const y2 = 103 * Math.sin(angle);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(52,211,153,0.2)" strokeWidth="1" />;
                    })}
                    <text x="0" y="-8" textAnchor="middle" fill="#34d399" fontSize="36" fontWeight="700" fontFamily="Inter">82%</text>
                    <text x="0" y="14" textAnchor="middle" fill="rgba(52,211,153,0.5)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="2">NET ZERO</text>
                    <text x="0" y="30" textAnchor="middle" fill="rgba(52,211,153,0.3)" fontSize="8" fontFamily="JetBrains Mono">TARGET 2030</text>
                </g>

                {/* Emission bars — declining trend */}
                <g transform="translate(110, 340)">
                    <line x1="0" y1="0" x2="280" y2="0" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
                    <line x1="0" y1="-100" x2="0" y2="0" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
                    {bars.map((h, i) => (
                        <g key={i} transform={`translate(${i * 38 + 8}, ${-h})`}>
                            <rect width="22" height={h} rx="3" fill="url(#sus-bar)" />
                            <rect width="22" height="3" rx="1.5" fill="#34d399" opacity="0.8" />
                        </g>
                    ))}
                    {/* Trend line */}
                    <polyline
                        points={bars.map((h, i) => `${i * 38 + 19},${-h - 4}`).join(' ')}
                        fill="none"
                        stroke="#6ee7b7"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.6"
                    />
                    <text x="140" y="30" textAnchor="middle" fill="rgba(52,211,153,0.4)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1">CO₂ EMISSIONS — 7 YEAR TREND</text>
                </g>

                {/* Top-right stat */}
                <g transform="translate(370, 120)">
                    <rect x="-50" y="-25" width="100" height="50" rx="8" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="#34d399" fontSize="18" fontWeight="700" fontFamily="Inter">-47%</text>
                    <text x="0" y="12" textAnchor="middle" fill="rgba(52,211,153,0.5)" fontSize="8" fontFamily="JetBrains Mono">YOY REDUCTION</text>
                </g>

                {/* Top-left stat */}
                <g transform="translate(130, 120)">
                    <rect x="-50" y="-25" width="100" height="50" rx="8" fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="#34d399" fontSize="18" fontWeight="700" fontFamily="Inter">2.1M</text>
                    <text x="0" y="12" textAnchor="middle" fill="rgba(52,211,153,0.5)" fontSize="8" fontFamily="JetBrains Mono">TONS SAVED</text>
                </g>
            </svg>
        </div>
    );
}
