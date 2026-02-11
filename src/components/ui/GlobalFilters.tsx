
import React from 'react';

export function GlobalFilters() {
    return (
        <svg className="fixed w-0 h-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <defs>
                {/* 
                    DISSOLVE MASK 
                    - Fractal noise to create the organic "eaten" edge
                    - ColorMatrix to clamp opacity and create sharp edges
                */}
                <filter id="dissolve-mask-filter" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise" />
                    <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -4" result="clampedNoise" />
                </filter>

                {/* GRAIN STIPPLE (Hi-Fi) */}
                <filter id="grain-stipple">
                    <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 20 -10" />
                    <feComposite operator="in" in2="SourceGraphic" />
                </filter>

                {/* HI-FI STIPPLE GLOBAL (Gritty Dither) */}
                <filter id="hi-fi-stipple-global">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -4" />
                </filter>

                {/* MATRIX GRID PATTERN */}
                <pattern id="matrixGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--ink-primary)" strokeWidth="0.5" opacity="0.2" />
                </pattern>

                {/* GLOBAL GRADIENTS */}
                <radialGradient id="core-glow-hi">
                    <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--const-void)" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="portal-grad-hi" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#3B38B6" />
                    <stop offset="100%" stopColor="#121212" />
                </linearGradient>

                <mask id="edge-dissolve" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                    <rect x="0" y="0" width="1" height="1" fill="white" filter="url(#dissolve-mask-filter)" />
                </mask>
            </defs>
        </svg>
    );
}
