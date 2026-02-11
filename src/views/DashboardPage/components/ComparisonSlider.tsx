import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MoveHorizontal, Loader2 } from 'lucide-react';
import { processImage } from '../../../lib/dithering';

interface ComparisonSliderProps {
    originalSrc: string;
    rotation?: number;
}

export function ComparisonSlider({ originalSrc, rotation = 90 }: ComparisonSliderProps) {
    const [pos, setPos] = useState(50);
    const [sim, setSim] = useState<string | null>(null);
    const [processing, setProcessing] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [pulse, setPulse] = useState(false);

    // Pulse Effect for "Developing" state
    useEffect(() => {
        if (!processing) {
            setPulse(false);
            return;
        }
        const interval = setInterval(() => setPulse(p => !p), 1200);
        return () => clearInterval(interval);
    }, [processing]);

    // E-Ink Simulation Effect
    useEffect(() => {
        let active = true;
        setProcessing(true);

        async function generateSimulation() {
            try {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                await new Promise((resolve) => {
                    const timer = setTimeout(() => {
                        if (active) {
                            console.warn("ComparisonSlider: Simulation timed out");
                            setProcessing(false);
                            resolve(null);
                        }
                    }, 3000);

                    img.onload = () => { clearTimeout(timer); resolve(null); };
                    img.onerror = (e) => {
                        clearTimeout(timer);
                        console.error("ComparisonSlider: Image load failed", e);
                        resolve(null);
                    };

                    // Add timestamp to foil cache for remote images
                    if (originalSrc.startsWith('http')) {
                        const separator = originalSrc.includes('?') ? '&' : '?';
                        img.src = `${originalSrc}${separator}t=${Date.now()}`;
                    } else {
                        img.src = originalSrc;
                    }
                });

                if (!active) return;

                const canvas = document.createElement('canvas');
                // Resize to 800px width config (maintain aspect)
                const targetWidth = 800;
                const aspect = img.height / img.width;
                const targetHeight = Math.round(targetWidth * aspect);

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error("No context");

                // Draw original resized
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Process
                const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
                const processed = processImage(imageData, 1.05, 0.5); // Gamma 1.05, Dither 0.5 (Very Soft)
                ctx.putImageData(processed, 0, 0);

                const dataUrl = canvas.toDataURL('image/png');
                if (active) {
                    setSim(dataUrl);
                    setProcessing(false);
                }
            } catch (e) {
                console.error("Simulation failed", e);
                setProcessing(false);
            }
        }

        if (originalSrc) {
            generateSimulation();
        } else {
            setProcessing(false);
        }

        return () => { active = false; };
    }, [originalSrc]);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const p = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPos(p);
    }, []);

    const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
    const onMouseMove = (e: React.MouseEvent) => {
        if (e.buttons > 0) handleMove(e.clientX);
    };

    const isPortrait = rotation % 180 !== 0;

    return (
        <div
            ref={containerRef}
            className="comparison-slider group select-none relative shadow-[0_0_0_1px_var(--border-color)] touch-none cursor-crosshair active:cursor-grabbing mx-auto"
            style={{
                aspectRatio: isPortrait ? '480/800' : '800/480',
                minHeight: '700px',
                maxHeight: '100%',
                maxWidth: '100%',
                width: 'auto'
            }}
            onTouchMove={onTouchMove}
            onTouchStart={onTouchMove} // Enable jump-to-tap on mobile
            onMouseMove={onMouseMove}
            onClick={(e) => handleMove(e.clientX)}
            role="slider"
            aria-valuenow={pos}
        >
            {/* E-Ink Simulation (Right Side - Fully Visible Layer) - using bg-black to prevent white bleed */}
            <div className="absolute inset-0 bg-black overflow-hidden">
                {sim ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${sim})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            imageRendering: 'pixelated' // Crucial for dither sharpness
                        }}
                    />
                ) : (
                    <div className="relative w-full h-full">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${originalSrc})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                filter: pulse ? 'grayscale(0%) contrast(1)' : 'grayscale(100%) contrast(1.2)',
                                transition: 'filter 1.2s ease-in-out',
                                opacity: 0.8
                            }}
                        />
                        <div
                            className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none transition-[left] duration-75"
                            style={{ left: `${pos}%`, right: 0 }}
                        >
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/50 animate-pulse bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                                Developing...
                            </span>
                        </div>
                    </div>
                )}
            </div>
            {/* Label Right */}
            <div className="absolute top-4 right-4 bg-ink/80 backdrop-blur text-paper text-[10px] font-mono font-bold px-2 py-1 rounded z-10 pointer-events-none border border-paper/20">
                E-INK PREVIEW
            </div>

            {/* Original Image (Left Side - Masked Layer) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${originalSrc})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    maskImage: `linear-gradient(to right, black ${pos}%, transparent ${pos}%)`,
                    WebkitMaskImage: `linear-gradient(to right, black ${pos}%, transparent ${pos}%)`
                }}
            />
            {/* Label Left */}
            <div
                className="absolute top-4 left-4 bg-ink/80 backdrop-blur text-paper text-[10px] font-mono font-bold px-2 py-1 rounded z-20 pointer-events-none border border-paper/20"
                style={{
                    opacity: pos > 10 ? 1 : 0,
                    transition: 'opacity 0.2s'
                }}
            >
                ORIGINAL
            </div>

            {/* Handle - Centered with 2px width for symmetry */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-black cursor-ew-resize z-40 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{
                    left: `${pos}%`,
                    transform: 'translateX(-50%)'
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border-2 border-paper flex items-center justify-center shadow-lg cursor-ew-resize transition-transform hover:scale-110">
                    <MoveHorizontal size={16} className="text-white" strokeWidth={3} />
                </div>
            </div>
        </div>
    );
}
