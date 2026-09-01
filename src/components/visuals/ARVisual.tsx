/**
 * ARVisual — An AR inspection viewport with a holographic overlay,
 * scan line, corner brackets, annotation pins, and a floating data panel.
 */
export default function ARVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(167,139,250,0.15))' }}
            >
                <defs>
                    <linearGradient id="ar-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="ar-scan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
                        <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="ar-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="250" cy="250" r="220" fill="url(#ar-glow)" />

                {/* AR Viewport frame */}
                <rect x="80" y="80" width="340" height="340" rx="16" fill="rgba(167,139,250,0.03)" stroke="rgba(167,139,250,0.3)" strokeWidth="2" />

                {/* Corner brackets */}
                {[
                    { x: 80, y: 80, r: 0 },
                    { x: 420, y: 80, r: 90 },
                    { x: 420, y: 420, r: 180 },
                    { x: 80, y: 420, r: 270 },
                ].map((c, i) => (
                    <path
                        key={i}
                        d={`M ${c.x + (c.r === 90 || c.r === 180 ? -30 : 0)} ${c.y + (c.r === 180 || c.r === 270 ? -0 : 0)} L ${c.x + (c.r === 90 || c.r === 180 ? 0 : 30)} ${c.y} L ${c.x} ${c.y + (c.r === 180 || c.r === 270 ? -30 : 30)}`}
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${c.r}, ${c.x}, ${c.y})`}
                    />
                ))}

                {/* Scan line */}
                <rect x="82" y="80" width="336" height="60" fill="url(#ar-scan)" opacity="0.5" style={{ animation: 'scan 4s ease-in-out infinite' }} />

                {/* Wireframe pipe / valve assembly */}
                <g transform="translate(250, 250)">
                    {/* Main pipe */}
                    <rect x="-120" y="-15" width="100" height="30" rx="4" fill="none" stroke="url(#ar-grad)" strokeWidth="2" />
                    <rect x="20" y="-15" width="100" height="30" rx="4" fill="none" stroke="url(#ar-grad)" strokeWidth="2" />

                    {/* Central valve — hexagonal */}
                    <polygon
                        points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                        fill="rgba(167,139,250,0.08)"
                        stroke="#a78bfa"
                        strokeWidth="2"
                    />
                    <polygon
                        points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12"
                        fill="none"
                        stroke="rgba(167,139,250,0.4)"
                        strokeWidth="1"
                    />
                    {/* Valve wheel */}
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#a78bfa" style={{ animation: 'blink 2s ease-in-out infinite' }} />
                    {[0, 60, 120, 180, 240, 300].map((a) => {
                        const rad = (a * Math.PI) / 180;
                        return (
                            <line key={a} x1={12 * Math.cos(rad)} y1={12 * Math.sin(rad)} x2={18 * Math.cos(rad)} y2={18 * Math.sin(rad)} stroke="rgba(167,139,250,0.4)" strokeWidth="1" />
                        );
                    })}

                    {/* Flange bolts */}
                    {[-120, 120].map((x) => (
                        <g key={x}>
                            <circle cx={x} cy="-15" r="4" fill="#130820" stroke="#a78bfa" strokeWidth="1.5" />
                            <circle cx={x} cy="15" r="4" fill="#130820" stroke="#a78bfa" strokeWidth="1.5" />
                        </g>
                    ))}
                </g>

                {/* Annotation pins */}
                {/* Pin 1 — top left */}
                <g transform="translate(170, 160)">
                    <circle cx="0" cy="0" r="14" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#a78bfa" />
                    <line x1="14" y1="0" x2="60" y2="-30" stroke="rgba(167,139,250,0.4)" strokeWidth="1" strokeDasharray="2 3" />
                    <rect x="60" y="-48" width="80" height="30" rx="4" fill="rgba(19,8,32,0.9)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
                    <text x="100" y="-33" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="JetBrains Mono">PRESSURE</text>
                    <text x="100" y="-23" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="600" fontFamily="Inter">4.2 MPa</text>
                </g>

                {/* Pin 2 — right */}
                <g transform="translate(330, 290)">
                    <circle cx="0" cy="0" r="14" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#a78bfa" />
                    <line x1="14" y1="0" x2="50" y2="30" stroke="rgba(167,139,250,0.4)" strokeWidth="1" strokeDasharray="2 3" />
                    <rect x="50" y="14" width="80" height="30" rx="4" fill="rgba(19,8,32,0.9)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
                    <text x="90" y="29" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="JetBrains Mono">TEMP</text>
                    <text x="90" y="39" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="600" fontFamily="Inter">82°C</text>
                </g>

                {/* Pin 3 — bottom left */}
                <g transform="translate(190, 330)">
                    <circle cx="0" cy="0" r="14" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#a78bfa" />
                    <line x1="-14" y1="0" x2="-50" y2="30" stroke="rgba(167,139,250,0.4)" strokeWidth="1" strokeDasharray="2 3" />
                    <rect x="-130" y="14" width="80" height="30" rx="4" fill="rgba(19,8,32,0.9)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
                    <text x="-90" y="29" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="JetBrains Mono">WEAR</text>
                    <text x="-90" y="39" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600" fontFamily="Inter">12%</text>
                </g>

                {/* HUD top bar */}
                <g transform="translate(250, 60)">
                    <rect x="-100" y="-16" width="200" height="24" rx="4" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
                    <circle cx="-86" cy="-4" r="3" fill="#a78bfa" style={{ animation: 'blink 1.5s ease-in-out infinite' }} />
                    <text x="-74" y="0" fill="#a78bfa" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1">AR INSPECTION — LIVE</text>
                </g>

                {/* HUD bottom bar */}
                <g transform="translate(250, 440)">
                    <text x="0" y="0" textAnchor="middle" fill="rgba(167,139,250,0.4)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">ASSET ID: VLV-2847-Alpha</text>
                </g>
            </svg>
        </div>
    );
}
