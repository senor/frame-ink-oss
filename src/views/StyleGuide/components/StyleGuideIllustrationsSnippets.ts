
export const ILLUSTRATION_SNIPPETS = {
    'Symmetrical_Core': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="animate-draw schematic-line stroke-ink">
            <circle cx="200" cy="200" r="130" opacity="0.1" fill="none" />
            <circle cx="200" cy="200" r="110" fill="none" />
            <circle cx="200" cy="200" r="90" strokeDasharray="8 8" opacity="0.3" fill="none" />
            <rect x="145" y="145" width="110" height="110" transform="rotate(45 200 200)" fill="none" />
            <circle cx="200" cy="40" r="6" className="fill-[color:var(--blue)] stroke-none" />
            <path d="M200 80 L200 46" className="stroke-[color:var(--blue)] stroke-[2] opacity-80" />
        </g>
        <text x="215" y="45" className="fill-[color:var(--blue)] font-mono text-[11px] font-black opacity-80">[ SYS_UP ]</text>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Schematic Line Styles */
.schematic-line {
  stroke: var(--ink-primary);
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
}

/* Draw Animation */
.animate-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 16s ease-in-out infinite;
}

@keyframes draw {
  0% { stroke-dashoffset: 1000; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 1000; }
}`
    },

    'Seed_Architect': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g>
            <rect x="140" y="140" width="120" height="120" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1" className="animate-draw" />
            <path d="M160 140 L160 80" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <path d="M200 140 L200 60" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M240 140 L240 80" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <path d="M160 260 L160 320" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <path d="M200 260 L200 340" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M240 260 L240 320" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <path d="M140 160 L80 160" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <path d="M140 200 L60 200" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M140 240 L80 240" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
            <circle cx="200" cy="200" r="12" fill="var(--blue)" stroke="none" />
        </g>
        <text x="250" y="215" className="fill-[color:var(--blue)] font-mono text-[11px] font-black opacity-80">[ SEED ]</text>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Draw Animation */
.animate-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 16s ease-in-out infinite;
}

@keyframes draw {
  0% { stroke-dashoffset: 1000; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 1000; }
}`
    },

    'Orbital_Pulse': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="animate-draw schematic-line stroke-ink">
            <circle cx="200" cy="200" r="20" className="fill-ink stroke-none" />
            <circle cx="200" cy="200" r="50" strokeDasharray="2 4" fill="none" />
            <circle cx="200" cy="200" r="90" fill="none" />
            <circle cx="200" cy="200" r="140" strokeDasharray="10 10" fill="none" />
        </g>
        <path d="M200 200 L265 135" className="stroke-[color:var(--orange)] stroke-[4] rotate-dial" />
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Rotating Dial Animation */
.rotate-dial {
  transform-origin: 200px 200px;
  animation: rotate-dial 20s linear infinite;
}

@keyframes rotate-dial {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
    },

    'Nested_Frames': {
        jsx: `
<div
    className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 400;
        const y = ((e.clientY - rect.top) / rect.height) * 400;
        // setMousePos({ x, y }); // Requires useState hook in parent component
    }}
>
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line stroke-ink">
            <rect x="50" y="50" width="300" height="300" fill="none" className="animate-grid-pulse" style={{ animationDelay: '0s' }} />
            <rect x="80" y="80" width="240" height="240" fill="none" className="animate-grid-pulse" style={{ animationDelay: '1s' }} />
            <rect x="110" y="110" width="180" height="180" fill="none" className="animate-grid-pulse" style={{ animationDelay: '2s' }} />
            <rect x="140" y="140" width="120" height="120" fill="none" className="animate-grid-pulse" style={{ animationDelay: '3s' }} />
            <rect
                x={170 + (mousePos.x - 200) * 0.2} // Uses mousePos state
                y={170 + (mousePos.y - 200) * 0.2}
                width="60"
                height="60"
                fill="var(--gold)"
                className="animate-grid-pulse transition-all duration-300 ease-out"
                style={{ animationDelay: '4s' }}
            />
            <line x1="50" y1="200" x2="350" y2="200" strokeDasharray="4 4" opacity="0.3" />
            <line x1="200" y1="50" x2="200" y2="350" strokeDasharray="4 4" opacity="0.3" />
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Grid Pulse Animation */
.animate-grid-pulse {
  animation: grid-pulse 10s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}`
    },

    'Vertical_Sweep': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <defs>
            <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
        </defs>
        <g className="schematic-line stroke-ink">
            {/* Square center rectangle */}
            <rect x="130" y="130" width="140" height="140" fill="none" strokeWidth="3" />
            <circle cx="200" cy="200" r="8" fill="var(--cyan)" stroke="none" />
        </g>
        {/* Scan beam constrained to square bounds */}
        <rect x="130" y="70" width="140" height="60" fill="url(#scan-gradient)" className="animate-scan-square" />
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Scanning Animation for Square Container */
.animate-scan-square {
  animation: scan-square 8s linear infinite;
}

@keyframes scan-square {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: translateY(200px);
    opacity: 0;
  }
}`
    },

    'Dot_Field': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line">
            {[...Array(8)].map((_, row) =>
                [...Array(8)].map((_, col) => {
                    const delay = (row + col) * 0.3;
                    const isCenter = (row === 3 || row === 4) && (col === 3 || col === 4);
                    const distanceFromCenter = Math.abs(row - 3.5) + Math.abs(col - 3.5);

                    // Determine animation type based on position
                    let animationClass = '';
                    if (isCenter) {
                        animationClass = 'animate-dot-pulse'; // Center pulses
                    } else if (distanceFromCenter > 4) {
                        animationClass = 'animate-dot-appear'; // Outer ring appears/disappears
                    } else {
                        animationClass = 'animate-dot-fade'; // Middle ring fades
                    }

                    return (
                        <circle
                            key={\`\${row}-\${col}\`}
                            cx={80 + col * 40}
                            cy={80 + row * 40}
                            r={isCenter ? "6" : "3"}
                            className={isCenter ? \`fill-[color:var(--purple)] stroke-none \${animationClass}\` : \`fill-ink stroke-none \${animationClass}\`}
                            style={{ animationDelay: \`\${delay}s\` }}
                        />
                    );
                })
            )}
            <rect x="140" y="140" width="120" height="120" fill="none" strokeWidth="2" className="stroke-[color:var(--purple)]" opacity="0.3" />
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Dot Animations */
.animate-dot-fade { animation: dot-fade 12s ease-in-out infinite; }
.animate-dot-appear { animation: dot-appear 8s ease-in-out infinite; }
.animate-dot-pulse { animation: dot-pulse 6s ease-in-out infinite; }

@keyframes dot-fade {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

@keyframes dot-appear {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}`
    },

    'Stream_Flow': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <defs>
            <linearGradient id="terminal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--green)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
            </linearGradient>
        </defs>
        <g className="schematic-line">
            {/* Static terminal frame */}
            <rect x="60" y="60" width="280" height="280" fill="none" strokeWidth="2" className="stroke-ink" opacity="0.3" />
            <line x1="60" y1="90" x2="340" y2="90" className="stroke-ink" opacity="0.3" />

            {/* Cascading text elements */}
            {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} className="animate-terminal-cascade" style={{ animationDelay: \`\${i * 2}s\` }}>
                    <text x="80" y={120 + i * 30} className="fill-[color:var(--green)] font-mono text-[10px] opacity-80">
                        {\`> FRAME_SYNC_\${String(i).padStart(3, '0')}\`}
                    </text>
                </g>
            ))}

            {/* Cursor */}
            <rect x="80" y="310" width="8" height="12" className="fill-[color:var(--green)] animate-pulse" />
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Terminal Cascade Animation */
.animate-terminal-cascade {
  animation: terminal-cascade 10s linear infinite;
}

@keyframes terminal-cascade {
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}`
    },

    'Refresh_Cycle': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line stroke-ink">
            {/* Horizontal refresh bands */}
            {[...Array(12)].map((_, i) => (
                <rect
                    key={i}
                    x="60"
                    y={60 + i * 24}
                    width="280"
                    height="20"
                    fill="none"
                    strokeWidth="1"
                    className="animate-eink-refresh"
                    style={{ animationDelay: \`\${i * 0.5}s\` }}
                />
            ))}

            {/* Frame border */}
            <rect x="60" y="60" width="280" height="280" fill="none" strokeWidth="3" opacity="0.5" />

            {/* Corner markers */}
            <circle cx="80" cy="80" r="4" className="fill-ink stroke-none" />
            <circle cx="320" cy="80" r="4" className="fill-ink stroke-none" />
            <circle cx="80" cy="320" r="4" className="fill-ink stroke-none" />
            <circle cx="320" cy="320" r="4" className="fill-ink stroke-none" />
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* E-ink Refresh Animation */
.animate-eink-refresh {
  animation: eink-refresh 14s ease-in-out infinite;
}

@keyframes eink-refresh {
  0%, 100% { opacity: 0.1; transform: scaleY(0.95); }
  50% { opacity: 1; transform: scaleY(1); }
}`
    },

    'Wave_Form': {
        jsx: `
<div
    className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = ((e.clientY - rect.top) / rect.height);
        const waves = e.currentTarget.querySelectorAll('.wave-path');
        waves.forEach((wave, i) => {
            const amplitude = 20 + (mouseY * 30); // 20-50px amplitude based on mouse Y
            (wave as HTMLElement).style.setProperty('--wave-amp', \`\${amplitude}px\`);
        });
    }}
>
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line stroke-ink">
            {/* Flowing wave lines */}
            <path
                d="M50 200 Q100 150, 150 200 T250 200 T350 200"
                fill="none"
                strokeWidth="2"
                className="wave-path animate-wave-flow"
                style={{ animationDelay: '0s' }}
            />
            <path
                d="M50 220 Q100 170, 150 220 T250 220 T350 220"
                fill="none"
                strokeWidth="2"
                strokeDasharray="5 5"
                className="wave-path animate-wave-flow"
                style={{ animationDelay: '2s' }}
                opacity="0.6"
            />
            <path
                d="M50 180 Q100 130, 150 180 T250 180 T350 180"
                fill="none"
                strokeWidth="2"
                strokeDasharray="5 5"
                className="wave-path animate-wave-flow"
                style={{ animationDelay: '4s' }}
                opacity="0.6"
            />
            
            {/* Center reference circle */}
            <circle cx="200" cy="200" r="16" fill="none" strokeWidth="2" className="stroke-[color:var(--cyan)]" opacity="0.3" />

            {/* Orbiting signal indicator */}
            <g transform="translate(200, 200)">
                <g className="animate-signal-orbit">
                    <circle cx="0" cy="0" r="8" className="fill-[color:var(--cyan)] stroke-none" />
                    <circle cx="0" cy="0" r="12" fill="none" strokeWidth="1" className="stroke-[color:var(--cyan)] animate-pulse" opacity="0.5" />
                </g>
            </g>
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Wave Flow Animation */
.animate-wave-flow {
  animation: wave-flow 18s ease-in-out infinite;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

@keyframes wave-flow {
  0% { stroke-dashoffset: 1000; opacity: 0.3; }
  50% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: -1000; opacity: 0.3; }
}

/* Signal Orbit Animation */
.animate-signal-orbit {
  animation: signal-orbit 20s linear infinite;
}

@keyframes signal-orbit {
  0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
}`
    },

    'Particle_Flux': {
        jsx: `
<div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line">
            {/* Overlapping circles simulating ink particles */}
            {[...Array(6)].flatMap((_, ring) =>
                [...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const radius = 60 + ring * 20;
                    const x = 200 + Math.cos(angle) * radius;
                    const y = 200 + Math.sin(angle) * radius;
                    const delay = (ring * 0.5 + i * 0.3);

                    return (
                        <circle
                            key={\`\${ring}-\${i}\`}
                            cx={x}
                            cy={y}
                            r="8"
                            fill="var(--ink)"
                            fillOpacity="0.3"
                            stroke="none"
                            className="particle-flux animate-ink-flicker"
                            style={{ animationDelay: \`\${delay}s\`, animationDuration: '14s' }}
                        />
                    );
                })
            )}
            <circle cx="200" cy="200" r="20" fill="none" strokeWidth="2" stroke="var(--ink)" opacity="0.3" />
            <circle cx="200" cy="200" r="6" fill="var(--ink)" stroke="none" />
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0" />
</div>`,
        css: `
/* Ink Flicker Animation */
.animate-ink-flicker {
  animation: ink-flicker 16s ease-in-out infinite;
}

@keyframes ink-flicker {
  0%, 100% { opacity: 0.15; }
  8% { opacity: 0.7; }
  12% { opacity: 0.25; }
  18% { opacity: 0.85; }
  22% { opacity: 0.3; }
  28%, 72% { opacity: 1; }
  76% { opacity: 0.4; }
  82% { opacity: 0.8; }
  88% { opacity: 0.35; }
  94% { opacity: 0.6; }
}`
    },

    'Grain_Flow': {
        jsx: `
<div
    className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const svg = e.currentTarget.querySelector('svg');
        if (svg) {
            const grad = svg.querySelector('#grain-gradient');
            if (grad) {
                grad.setAttribute('cx', \`\${x}%\`);
                grad.setAttribute('cy', \`\${y}%\`);
            }
        }
    }}
>
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <defs>
            <radialGradient id="grain-gradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="var(--paper)" />
                <stop offset="100%" stopColor="var(--void)" />
            </radialGradient>
        </defs>
        <rect x="60" y="60" width="280" height="280" fill="url(#grain-gradient)" className="transition-all duration-500 ease-out" />
    </svg>
    <div className="grain absolute inset-0 pointer-events-none opacity-40" />
</div>`,
        css: `/* No specific CSS keyframes required, uses inline transitions */`
    },

    'Noise_Field': {
        jsx: `
<div
    className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 400;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 400;
        const circles = e.currentTarget.querySelectorAll('.nebula-dot');
        const colors = ['var(--cyan)', 'var(--orange)', 'var(--purple)', 'var(--green)', 'var(--gold)'];

        circles.forEach((circle) => {
            const cx = parseFloat(circle.getAttribute('data-cx') || '0');
            const cy = parseFloat(circle.getAttribute('data-cy') || '0');

            // Calculate distance and angle from cursor
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Repulsion radius and strength
            const repulsionRadius = 120;

            if (distance < repulsionRadius && distance > 0) {
                // Calculate displacement (stronger when closer)
                const force = (repulsionRadius - distance) / repulsionRadius;
                const displacement = force * 30; // Max 30px displacement

                // Normalize direction vector
                const pushX = (dx / distance) * displacement;
                const pushY = (dy / distance) * displacement;

                circle.setAttribute('transform', \`translate(\${pushX}, \${pushY})\`);

                // 30% chance to show color when near cursor
                if (Math.random() < 0.3 && !circle.getAttribute('data-colored')) {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    circle.setAttribute('fill', randomColor);
                    circle.setAttribute('fill-opacity', '0.7');
                    circle.setAttribute('data-colored', 'true');
                }
            } else {
                // Return to original position and color
                circle.setAttribute('transform', 'translate(0, 0)');
                if (circle.getAttribute('data-colored')) {
                    circle.setAttribute('fill', 'var(--ink)');
                    circle.setAttribute('fill-opacity', '0.4');
                    circle.removeAttribute('data-colored');
                }
            }
        });
    }}
    onMouseLeave={(e) => {
        // Reset all dots when mouse leaves
        const circles = e.currentTarget.querySelectorAll('.nebula-dot');
        circles.forEach((circle) => {
            circle.setAttribute('transform', 'translate(0, 0)');
            if (circle.getAttribute('data-colored')) {
                circle.setAttribute('fill', 'var(--ink)');
                circle.setAttribute('fill-opacity', '0.4');
                circle.removeAttribute('data-colored');
            }
        });
    }}
>
    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
        <g className="schematic-line">
            {[...Array(15)].flatMap((_, row) =>
                [...Array(15)].map((_, col) => {
                    const cx = 40 + col * 24;
                    const cy = 40 + row * 24;
                    return (
                        <circle
                            key={\`\${row}-\${col}\`}
                            cx={cx}
                            cy={cy}
                            data-cx={cx}
                            data-cy={cy}
                            r="3"
                            fill="var(--ink)"
                            fillOpacity="0.4"
                            stroke="none"
                            className="nebula-dot transition-all duration-200 ease-out"
                        />
                    );
                })
            )}
        </g>
    </svg>
    <div className="halftone-dark absolute inset-0 pointer-events-none" />
</div>`,
        css: `
/* No specific keyframes. 
   Ensure .nebula-dot has transition properties if using JS manipulations */
.nebula-dot {
    transition: all 0.2s ease-out;
}`
    },

    'Dotted_Grid': {
        jsx: `
<div
    className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 400;
        const y = ((e.clientY - rect.top) / rect.height) * 400;
        const circles = e.currentTarget.querySelectorAll('.dot-bg');
        circles.forEach((circle) => {
            const cx = parseFloat(circle.getAttribute('cx') || '0');
            const cy = parseFloat(circle.getAttribute('cy') || '0');
            const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
            const scale = Math.max(0.5, Math.min(2, 1 + (1 - distance / 150)));
            const opacity = Math.max(0.1, Math.min(0.8, 1 - distance / 200));
            circle.setAttribute('r', (2 * scale).toString());
            circle.setAttribute('opacity', opacity.toString());
        });
    }}
>
    <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
        <g>
            {[...Array(20)].flatMap((_, row) =>
                [...Array(20)].map((_, col) => {
                    const cx = col * 20 + 10;
                    const cy = row * 20 + 10;
                    return (
                        <circle
                            key={\`\${row}-\${col}\`}
                            cx={cx}
                            cy={cy}
                            data-cx={cx}
                            data-cy={cy}
                            r="2"
                            fill="var(--ink)"
                            stroke="none"
                            className="dot-bg transition-all duration-150"
                            opacity="0.2"
                        />
                    );
                })
            )}
        </g>
    </svg>
</div>`,
        css: `
/* No specific keyframes. */
.dot-bg {
    transition: all 150ms;
}`
    }
};
