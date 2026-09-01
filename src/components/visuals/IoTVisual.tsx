/**
 * IoTVisual — A network mesh of edge devices connecting to a central
 * cloud hub, with pulsing data packets traveling along the links.
 */
export default function IoTVisual() {
    const nodes = [
        { x: 100, y: 120, label: 'PLC-01' },
        { x: 400, y: 120, label: 'SENSOR-12' },
        { x: 80, y: 250, label: 'RTU-04' },
        { x: 420, y: 250, label: 'GATEWAY' },
        { x: 120, y: 380, label: 'EDGE-07' },
        { x: 380, y: 380, label: 'PLC-09' },
        { x: 250, y: 100, label: 'IOT-HUB' },
        { x: 250, y: 400, label: 'EDGE-02' },
    ];
    const hub = { x: 250, y: 250 };

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 500 500"
                className="relative w-full max-w-[520px] h-auto"
                style={{ filter: 'drop-shadow(0 0 40px rgba(74,222,128,0.15))' }}
            >
                <defs>
                    <linearGradient id="iot-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
                    </linearGradient>
                    <radialGradient id="iot-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="iot-hub-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="250" cy="250" r="220" fill="url(#iot-glow)" />

                {/* Connection lines from hub to nodes */}
                {nodes.map((n, i) => (
                    <line
                        key={`line-${i}`}
                        x1={hub.x} y1={hub.y} x2={n.x} y2={n.y}
                        stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="3 4"
                    />
                ))}

                {/* Inter-node mesh connections */}
                {[[0, 6], [6, 1], [1, 3], [3, 5], [5, 7], [7, 4], [4, 2], [2, 0], [0, 3], [1, 4]].map(([a, b], i) => (
                    <line key={`mesh-${i}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(74,222,128,0.08)" strokeWidth="0.5" strokeDasharray="2 6" />
                ))}

                {/* Data packets traveling along lines */}
                {nodes.map((n, i) => (
                    <circle key={`packet-${i}`} r="3" fill="#86efac" style={{ filter: 'drop-shadow(0 0 4px #4ade80)' }}>
                        <animateMotion
                            dur={`${2 + (i % 3)}s`}
                            repeatCount="indefinite"
                            path={`M ${hub.x} ${hub.y} L ${n.x} ${n.y}`}
                        />
                    </circle>
                ))}

                {/* Edge nodes */}
                {nodes.map((n, i) => (
                    <g key={`node-${i}`}>
                        <circle cx={n.x} cy={n.y} r="20" fill="rgba(74,222,128,0.05)" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />
                        <circle cx={n.x} cy={n.y} r="12" fill="#0d1a0a" stroke="#4ade80" strokeWidth="1.5" />
                        <circle cx={n.x} cy={n.y} r="4" fill="#4ade80" style={{ animation: `blink ${1 + i * 0.2}s ease-in-out infinite` }} />
                        <text x={n.x} y={n.y + 34} textAnchor="middle" fill="rgba(74,222,128,0.5)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1">{n.label}</text>
                    </g>
                ))}

                {/* Central cloud hub */}
                <g transform={`translate(${hub.x}, ${hub.y})`}>
                    <circle cx="0" cy="0" r="60" fill="url(#iot-hub-glow)" />
                    <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="4 4" style={{ transformOrigin: 'center', animation: 'spin 30s linear infinite' }} />
                    <circle cx="0" cy="0" r="30" fill="rgba(74,222,128,0.08)" stroke="url(#iot-grad)" strokeWidth="2" />
                    {/* Cloud icon */}
                    <path
                        d="M -14 4 C -18 4, -18 -4, -14 -4 C -14 -10, -4 -12, 0 -6 C 4 -12, 14 -10, 14 -4 C 18 -4, 18 4, 14 4 L -14 4 Z"
                        fill="rgba(74,222,128,0.15)"
                        stroke="#4ade80"
                        strokeWidth="1.5"
                    />
                    <circle cx="0" cy="-2" r="3" fill="#4ade80" style={{ animation: 'blink 1.5s ease-in-out infinite' }} />
                </g>

                {/* Top stat */}
                <g transform="translate(250, 40)">
                    <text x="0" y="0" textAnchor="middle" fill="rgba(74,222,128,0.4)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">DEVICES CONNECTED</text>
                    <text x="0" y="18" textAnchor="middle" fill="#4ade80" fontSize="22" fontWeight="700" fontFamily="Inter">12,847</text>
                </g>

                {/* Bottom stats */}
                <g transform="translate(120, 460)">
                    <text x="0" y="0" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="600" fontFamily="Inter">99.97%</text>
                    <text x="0" y="14" textAnchor="middle" fill="rgba(74,222,128,0.4)" fontSize="8" fontFamily="JetBrains Mono">UPTIME</text>
                </g>
                <g transform="translate(380, 460)">
                    <text x="0" y="0" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="600" fontFamily="Inter">2.4 TB/s</text>
                    <text x="0" y="14" textAnchor="middle" fill="rgba(74,222,128,0.4)" fontSize="8" fontFamily="JetBrains Mono">DATA FLOW</text>
                </g>
            </svg>
        </div>
    );
}
