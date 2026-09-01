/**
 * DigitalTwinVisual — A rotating 3D-style offshore platform wireframe
 * with orbiting data nodes, sonar pulse rings, and a live KPI readout.
 */
export default function DigitalTwinVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Sonar pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-sky-400/20"
                        style={{
                            width: `${60 + i * 20}%`,
                            height: `${60 + i * 20}%`,
                            animation: `pulseSlow 4s ease-in-out ${i * 0.8}s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Central SVG platform */}
            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(56,189,248,0.15))' }}
            >
                <defs>
                    <linearGradient id="dt-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="dt-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Background glow */}
                <circle cx="250" cy="250" r="200" fill="url(#dt-glow)" />

                {/* Outer rotating ring with tick marks */}
                <g style={{ transformOrigin: '250px 250px', animation: 'spin 40s linear infinite' }}>
                    <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="2 8" />
                    {Array.from({ length: 36 }).map((_, i) => {
                        const angle = (i * 10 * Math.PI) / 180;
                        const x1 = 250 + 215 * Math.cos(angle);
                        const y1 = 250 + 215 * Math.sin(angle);
                        const x2 = 250 + (i % 3 === 0 ? 205 : 212) * Math.cos(angle);
                        const y2 = 250 + (i % 3 === 0 ? 205 : 212) * Math.sin(angle);
                        return (
                            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                        );
                    })}
                </g>

                {/* Middle ring — counter-rotating */}
                <g style={{ transformOrigin: '250px 250px', animation: 'spin-reverse 30s linear infinite' }}>
                    <circle cx="250" cy="250" r="170" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                    <circle cx="250" cy="250" r="170" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" strokeDasharray="40 120" />
                </g>

                {/* Hexagonal platform structure — isometric view */}
                <g transform="translate(250, 250)">
                    {/* Main deck — hexagon */}
                    <polygon
                        points="0,-90 78,-45 78,45 0,90 -78,45 -78,-45"
                        fill="none"
                        stroke="url(#dt-grad)"
                        strokeWidth="2"
                    />
                    <polygon
                        points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35"
                        fill="rgba(56,189,248,0.04)"
                        stroke="rgba(56,189,248,0.3)"
                        strokeWidth="1"
                    />

                    {/* Inner grid */}
                    {[-45, -15, 15, 45].map((y) => (
                        <line key={`h${y}`} x1={-60 * Math.cos((y * Math.PI) / 180)} y1={y} x2={60 * Math.cos((y * Math.PI) / 180)} y2={y} stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
                    ))}

                    {/* Support legs */}
                    <line x1="-78" y1="-45" x2="-78" y2="100" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
                    <line x1="78" y1="-45" x2="78" y2="100" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
                    <line x1="0" y1="90" x2="0" y2="120" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />

                    {/* Cross braces */}
                    <line x1="-78" y1="20" x2="78" y2="20" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="-78" y1="60" x2="78" y2="60" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Central tower */}
                    <rect x="-8" y="-120" width="16" height="40" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.6)" strokeWidth="1.5" />
                    <circle cx="0" cy="-125" r="5" fill="#38bdf8" style={{ animation: 'blink 2s ease-in-out infinite' }} />

                    {/* Corner nodes */}
                    {[
                        { x: -78, y: -45 },
                        { x: 78, y: -45 },
                        { x: 78, y: 45 },
                        { x: -78, y: 45 },
                    ].map((p, i) => (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="6" fill="#050d1f" stroke="#38bdf8" strokeWidth="2" />
                            <circle cx={p.x} cy={p.y} r="3" fill="#38bdf8" style={{ animation: `blink ${1.5 + i * 0.3}s ease-in-out infinite` }} />
                        </g>
                    ))}
                </g>

                {/* Orbiting data nodes */}
                <g style={{ transformOrigin: '250px 250px', animation: 'spin 20s linear infinite' }}>
                    {[0, 120, 240].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = 250 + 195 * Math.cos(rad);
                        const y = 250 + 195 * Math.sin(rad);
                        return (
                            <g key={i}>
                                <line x1="250" y1="250" x2={x} y2={y} stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="2 4" />
                                <circle cx={x} cy={y} r="8" fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth="1.5" />
                                <circle cx={x} cy={y} r="3" fill="#38bdf8" />
                            </g>
                        );
                    })}
                </g>

                {/* Crosshair */}
                <line x1="250" y1="20" x2="250" y2="60" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <line x1="250" y1="440" x2="250" y2="480" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <line x1="20" y1="250" x2="60" y2="250" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <line x1="440" y1="250" x2="480" y2="250" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
            </svg>

            {/* Floating KPI labels */}
            <div className="absolute top-[12%] left-[8%] flex flex-col gap-1">
                <div className="text-[10px] font-mono text-sky-400/60 uppercase tracking-wider">Pressure</div>
                <div className="text-lg font-mono font-semibold text-sky-300">2,847<span className="text-xs text-sky-500 ml-1">PSI</span></div>
            </div>
            <div className="absolute top-[12%] right-[8%] flex flex-col gap-1 items-end">
                <div className="text-[10px] font-mono text-sky-400/60 uppercase tracking-wider">Flow Rate</div>
                <div className="text-lg font-mono font-semibold text-sky-300">12,450<span className="text-xs text-sky-500 ml-1">BBL/D</span></div>
            </div>
            <div className="absolute bottom-[14%] left-[8%] flex flex-col gap-1">
                <div className="text-[10px] font-mono text-sky-400/60 uppercase tracking-wider">Temp</div>
                <div className="text-lg font-mono font-semibold text-sky-300">78.3<span className="text-xs text-sky-500 ml-1">°C</span></div>
            </div>
            <div className="absolute bottom-[14%] right-[8%] flex flex-col gap-1 items-end">
                <div className="text-[10px] font-mono text-sky-400/60 uppercase tracking-wider">Status</div>
                <div className="text-sm font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    OPERATIONAL
                </div>
            </div>
        </div>
    );
}
