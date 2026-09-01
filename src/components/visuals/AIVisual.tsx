/**
 * AIVisual — A neural network visualization with layered nodes,
 * animated signal paths, and a central reasoning core.
 */
export default function AIVisual() {
    const layers = [
        { x: 100, nodes: 4 },
        { x: 200, nodes: 6 },
        { x: 300, nodes: 6 },
        { x: 400, nodes: 3 },
    ];

    const nodePositions = layers.map((l) => {
        const spacing = 300 / (l.nodes + 1);
        return Array.from({ length: l.nodes }, (_, i) => ({
            x: l.x,
            y: 100 + spacing * (i + 1),
        }));
    });

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(251,191,36,0.15))' }}
            >
                <defs>
                    <linearGradient id="ai-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                    </linearGradient>
                    <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="ai-core" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="250" cy="250" r="220" fill="url(#ai-glow)" />

                {/* Neural network connections */}
                {nodePositions.slice(0, -1).map((layer, li) =>
                    layer.map((node, ni) =>
                        nodePositions[li + 1].map((nextNode, nni) => (
                            <line
                                key={`${li}-${ni}-${nni}`}
                                x1={node.x} y1={node.y} x2={nextNode.x} y2={nextNode.y}
                                stroke="rgba(251,191,36,0.08)"
                                strokeWidth="0.5"
                            />
                        ))
                    )
                )}

                {/* Animated signal paths — a few highlighted */}
                {[
                    { from: { x: 100, y: 175 }, to: { x: 200, y: 143 } },
                    { from: { x: 200, y: 229 }, to: { x: 300, y: 186 } },
                    { from: { x: 300, y: 271 }, to: { x: 400, y: 200 } },
                    { from: { x: 100, y: 325 }, to: { x: 200, y: 314 } },
                    { from: { x: 200, y: 143 }, to: { x: 300, y: 143 } },
                ].map((p, i) => (
                    <line
                        key={`sig-${i}`}
                        x1={p.from.x} y1={p.from.y} x2={p.to.x} y2={p.to.y}
                        stroke="url(#ai-grad)" strokeWidth="1.5" strokeDasharray="3 3"
                        opacity="0.5"
                    >
                        <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                ))}

                {/* Neural network nodes */}
                {nodePositions.map((layer, li) =>
                    layer.map((node, ni) => (
                        <g key={`node-${li}-${ni}`}>
                            <circle cx={node.x} cy={node.y} r="8" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
                            <circle cx={node.x} cy={node.y} r="4" fill="#fbbf24" opacity="0.7" style={{ animation: `pulseSlow ${2 + (ni % 3) * 0.5}s ease-in-out infinite` }} />
                        </g>
                    ))
                )}

                {/* Central reasoning core */}
                <g transform="translate(250, 250)">
                    <circle cx="0" cy="0" r="55" fill="url(#ai-core)" />
                    <circle cx="0" cy="0" r="35" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="2 4" style={{ transformOrigin: 'center', animation: 'spin 20s linear infinite' }} />
                    <circle cx="0" cy="0" r="25" fill="rgba(251,191,36,0.06)" stroke="url(#ai-grad)" strokeWidth="2" />
                    {/* Brain icon */}
                    <g fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M -8 -8 C -12 -8, -12 -2, -8 0 C -12 2, -12 8, -8 8 C -4 10, 0 8, 0 4 L 0 -4 C 0 -8, -4 -10, -8 -8 Z" />
                        <path d="M 8 -8 C 12 -8, 12 -2, 8 0 C 12 2, 12 8, 8 8 C 4 10, 0 8, 0 4 L 0 -4 C 0 -8, 4 -10, 8 -8 Z" />
                    </g>
                </g>

                {/* Layer labels */}
                {['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'].map((label, i) => (
                    <text key={label} x={layers[i].x} y="420" textAnchor="middle" fill="rgba(251,191,36,0.3)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">{label}</text>
                ))}

                {/* Top label */}
                <g transform="translate(250, 60)">
                    <rect x="-80" y="-16" width="160" height="24" rx="4" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
                    <text x="0" y="0" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">REASONING ENGINE</text>
                </g>

                {/* Bottom stats */}
                <g transform="translate(250, 460)">
                    <text x="-60" y="0" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="600" fontFamily="Inter">47B params</text>
                    <text x="-60" y="14" textAnchor="middle" fill="rgba(251,191,36,0.4)" fontSize="8" fontFamily="JetBrains Mono">MODEL SIZE</text>
                    <text x="60" y="0" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="600" fontFamily="Inter">98.2%</text>
                    <text x="60" y="14" textAnchor="middle" fill="rgba(251,191,36,0.4)" fontSize="8" fontFamily="JetBrains Mono">ACCURACY</text>
                </g>
            </svg>
        </div>
    );
}
