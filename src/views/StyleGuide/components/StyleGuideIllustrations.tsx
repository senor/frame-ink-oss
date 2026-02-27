import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { CodeModal } from './CodeModal';
import { ILLUSTRATION_SNIPPETS } from './StyleGuideIllustrationsSnippets';

export const StyleGuideIllustrations = () => {
    const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
    const [activeCode, setActiveCode] = useState<{ title: string, code: { jsx: string, css?: string } } | null>(null);

    const openCode = (title: string, key: keyof typeof ILLUSTRATION_SNIPPETS) => {
        setActiveCode({
            title,
            code: ILLUSTRATION_SNIPPETS[key]
        });
    };

    return (
        <section className="mb-40">
            <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">08_Technical_Illustrations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* 1. Symmetrical Core */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">System: Symmetrical_Core</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('System: Symmetrical_Core', 'Symmetrical_Core')}><Code size={16} /></button>
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
                    </div>
                </div>

                {/* 2. Matrix Grid / Seed Architect */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Logic: Seed_Architect</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Logic: Seed_Architect', 'Seed_Architect')}><Code size={16} /></button>
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
                    </div>
                </div>

                {/* 3. Orbital Sync */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Sync: Orbital_Pulse</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Sync: Orbital_Pulse', 'Orbital_Pulse')}><Code size={16} /></button>
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
                    </div>
                </div>

                {/* 4. Rectangular Grid */}
                <div
                    className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 400;
                        const y = ((e.clientY - rect.top) / rect.height) * 400;
                        setMousePos({ x, y });
                    }}
                    onMouseLeave={() => setMousePos({ x: 200, y: 200 })}
                >
                    <div className="tag-marker z-20 absolute top-8 left-8">Grid: Nested_Frames</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Grid: Nested_Frames', 'Nested_Frames')}><Code size={16} /></button>
                    <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                        <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                            <g className="schematic-line stroke-ink">
                                <rect x="50" y="50" width="300" height="300" fill="none" className="animate-grid-pulse" style={{ animationDelay: '0s' }} />
                                <rect x="80" y="80" width="240" height="240" fill="none" className="animate-grid-pulse" style={{ animationDelay: '1s' }} />
                                <rect x="110" y="110" width="180" height="180" fill="none" className="animate-grid-pulse" style={{ animationDelay: '2s' }} />
                                <rect x="140" y="140" width="120" height="120" fill="none" className="animate-grid-pulse" style={{ animationDelay: '3s' }} />
                                <rect
                                    x={170 + (mousePos.x - 200) * 0.2}
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
                    </div>
                </div>

                {/* 5. Scan Lines */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Scan: Vertical_Sweep</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Scan: Vertical_Sweep', 'Vertical_Sweep')}><Code size={16} /></button>
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
                    </div>
                </div>

                {/* 6. Dot Matrix */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Matrix: Dot_Field</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Matrix: Dot_Field', 'Dot_Field')}><Code size={16} /></button>
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
                                                key={`${row}-${col}`}
                                                cx={80 + col * 40}
                                                cy={80 + row * 40}
                                                r={isCenter ? "6" : "3"}
                                                className={isCenter ? `fill-[color:var(--purple)] stroke-none ${animationClass}` : `fill-ink stroke-none ${animationClass}`}
                                                style={{ animationDelay: `${delay}s` }}
                                            />
                                        );
                                    })
                                )}
                                <rect x="140" y="140" width="120" height="120" fill="none" strokeWidth="2" className="stroke-[color:var(--purple)]" opacity="0.3" />
                            </g>
                        </svg>
                        <div className="halftone-dark absolute inset-0" />
                    </div>
                </div>

                {/* 7. Terminal Stream */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Terminal: Stream_Flow</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Terminal: Stream_Flow', 'Stream_Flow')}><Code size={16} /></button>
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
                                    <g key={i} className="animate-terminal-cascade" style={{ animationDelay: `${i * 2}s` }}>
                                        <text x="80" y={120 + i * 30} className="fill-[color:var(--green)] font-mono text-[10px] opacity-80">
                                            {`> FRAME_SYNC_${String(i).padStart(3, '0')}`}
                                        </text>
                                    </g>
                                ))}

                                {/* Cursor */}
                                <rect x="80" y="310" width="8" height="12" className="fill-[color:var(--green)] animate-pulse" />
                            </g>
                        </svg>
                        <div className="halftone-dark absolute inset-0" />
                    </div>
                </div>

                {/* 8. E-Ink Refresh */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">E-Ink: Refresh_Cycle</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('E-Ink: Refresh_Cycle', 'Refresh_Cycle')}><Code size={16} /></button>
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
                                        style={{ animationDelay: `${i * 0.5}s` }}
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
                    </div>
                </div>

                {/* 9. Signal Wave */}
                <div
                    className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const mouseY = ((e.clientY - rect.top) / rect.height);
                        const waves = e.currentTarget.querySelectorAll('.wave-path');
                        waves.forEach((wave, i) => {
                            const amplitude = 20 + (mouseY * 30); // 20-50px amplitude based on mouse Y
                            (wave as HTMLElement).style.setProperty('--wave-amp', `${amplitude}px`);
                        });
                    }}
                >
                    <div className="tag-marker z-20 absolute top-8 left-8">Signal: Wave_Form</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Signal: Wave_Form', 'Wave_Form')}><Code size={16} /></button>
                    <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
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
                    </div>
                </div>

                {/* 10. Ink Particle Flicker */}
                <div
                    className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                >
                    <div className="tag-marker z-20 absolute top-8 left-8">Ink: Particle_Flux</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Ink: Particle_Flux', 'Particle_Flux')}><Code size={16} /></button>
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
                                                key={`${ring}-${i}`}
                                                cx={x}
                                                cy={y}
                                                r="8"
                                                fill="var(--ink)"
                                                fillOpacity="0.3"
                                                stroke="none"
                                                className="particle-flux animate-ink-flicker"
                                                style={{ animationDelay: `${delay}s`, animationDuration: '14s' }}
                                            />
                                        );
                                    })
                                )}

                                {/* Center reference */}
                                <circle cx="200" cy="200" r="20" fill="none" strokeWidth="2" stroke="var(--ink)" opacity="0.3" />
                                <circle cx="200" cy="200" r="6" fill="var(--ink)" stroke="none" />
                            </g>
                        </svg>
                        <div className="halftone-dark absolute inset-0" />
                    </div>
                </div>

                {/* 12. Grain Flow - Mouse Reactive Gradient */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Surface: Grain_Flow</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Surface: Grain_Flow', 'Grain_Flow')}><Code size={16} /></button>
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
                                    grad.setAttribute('cx', `${x}%`);
                                    grad.setAttribute('cy', `${y}%`);
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
                    </div>
                </div>

                {/* 13. Noise Field - Repulsion Effect */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Surface: Noise_Field</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Surface: Noise_Field', 'Noise_Field')}><Code size={16} /></button>
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

                                    circle.setAttribute('transform', `translate(${pushX}, ${pushY})`);

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
                                                key={`${row}-${col}`}
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
                    </div>
                </div>

                {/* 14. Dotted Grid - Background Animation */}
                <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                    <div className="tag-marker z-20 absolute top-8 left-8">Surface: Dotted_Grid</div>
                    <button className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-paper border border-ink/10 rounded-lg hover:bg-ink hover:text-paper" onClick={() => openCode('Surface: Dotted_Grid', 'Dotted_Grid')}><Code size={16} /></button>
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
                                                key={`${row}-${col}`}
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
                    </div>
                </div>

            </div>
            {activeCode && (
                <CodeModal
                    isOpen={!!activeCode}
                    onClose={() => setActiveCode(null)}
                    title={activeCode.title}
                    code={activeCode.code}
                />
            )}
        </section>
    );
};
