import React, { useRef, useEffect } from 'react';
import { Plus, Cpu, Loader2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

interface NoiseFieldProps {
    accentColor?: string;
}

function NoiseFieldCard({ accentColor = 'var(--blue)' }: NoiseFieldProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();

            // Mouse position relative to the card container
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const circles = container.querySelectorAll('.noise-dot');
            const colors = ['var(--cyan)', 'var(--orange)', 'var(--purple)', 'var(--green)', 'var(--gold)', accentColor];

            circles.forEach((circle) => {
                const cx = parseFloat(circle.getAttribute('data-cx') || '0');
                const cy = parseFloat(circle.getAttribute('data-cy') || '0');

                // Calculate distance and angle from cursor
                const dx = cx - mouseX;
                const dy = cy - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Repulsion radius and strength (adjusted for card size)
                const repulsionRadius = 120; // Reduced from 250

                if (distance < repulsionRadius && distance > 0) {
                    // Calculate displacement (stronger when closer)
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const displacement = force * 20; // Max 20px displacement (Reduced from 60)

                    // Normalize direction vector
                    const pushX = (dx / distance) * displacement;
                    const pushY = (dy / distance) * displacement;

                    circle.setAttribute('transform', `translate(${pushX}, ${pushY})`);

                    // chance to show color when near cursor
                    if (Math.random() < 0.2 && !circle.getAttribute('data-colored')) {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        circle.setAttribute('fill', randomColor);
                        circle.setAttribute('fill-opacity', '0.8');
                        circle.setAttribute('data-colored', 'true');
                    }
                } else {
                    // Return to original position and color
                    circle.setAttribute('transform', 'translate(0, 0)');
                    if (circle.getAttribute('data-colored')) {
                        circle.setAttribute('fill', 'var(--ink)');
                        circle.setAttribute('fill-opacity', '0.2');
                        circle.removeAttribute('data-colored');
                    }
                }
            });
        };

        const handleMouseLeave = () => {
            const circles = container.querySelectorAll('.noise-dot');
            circles.forEach((circle) => {
                circle.setAttribute('transform', 'translate(0, 0)');
                if (circle.getAttribute('data-colored')) {
                    circle.setAttribute('fill', 'var(--ink)');
                    circle.setAttribute('fill-opacity', '0.2');
                    circle.removeAttribute('data-colored');
                }
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [accentColor]);

    // Grid settings for Card size
    // Assuming card is roughly 300-400px wide. 
    // Density: ~30px spacing
    const rows = 20;
    const cols = 15;

    return (
        <div ref={containerRef} className="absolute inset-0 bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-0 z-0 rounded-[inherit]">
            <svg viewBox="0 0 400 500" className="w-full h-full relative z-10 p-0" preserveAspectRatio="xMidYMid slice">
                <g className="schematic-line">
                    {[...Array(rows)].flatMap((_, row) =>
                        [...Array(cols)].map((_, col) => {
                            // Uniform grid with some padding
                            // 400 width / 15 cols ~= 26px
                            // 500 height / 20 rows ~= 25px
                            const cx = 20 + col * 26;
                            const cy = 20 + row * 25;
                            return (
                                <circle
                                    key={`${row}-${col}`}
                                    cx={cx}
                                    cy={cy}
                                    data-cx={cx}
                                    data-cy={cy}
                                    r="3"
                                    fill="var(--ink)"
                                    fillOpacity="0.2"
                                    stroke="none"
                                    className="noise-dot transition-transform duration-300 ease-out text-ink dark:text-white"
                                />
                            );
                        })
                    )}
                </g>
            </svg>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none z-0" />
        </div>
    );
}

interface PlaceholderModuleProps {
    icon: React.ReactNode;
    label: string;
    description: string;
    tag: string;
    tagColor: string;
    accentColor: string;
    onClick: () => void;
    isLoading?: boolean;
}

function PlaceholderModule({ icon, label, description, tag, tagColor, accentColor, onClick, isLoading, loading }: PlaceholderModuleProps & { loading?: boolean }) {
    return (
        <Card
            className={`group relative flex flex-col p-4 animate-scale-in card-module z-0 ${loading ? 'pointer-events-none' : ''}`}
            interactive={!loading}
            onClick={loading ? undefined : onClick}
        >
            <div className={`tag-ref absolute top-2 left-2 z-10 transition-colors duration-300 ${loading ? 'bg-ink/10 text-transparent animate-pulse' : tagColor}`}>
                {loading ? 'STATUS_SCAN' : tag}
            </div>

            <div className={`aspect-[4/5] relative border border-ink/10 overflow-hidden bg-[#0A0A0A] ${loading ? 'shimmer' : ''} rounded-xs`}>
                {!loading && <NoiseFieldCard accentColor={accentColor} />}

                {/* Floating Icon on top of noise */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className={`transition-all duration-500 ${loading ? 'opacity-0 scale-90' : 'text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 scale-100'}`}>
                        {isLoading ? <Loader2 className="w-12 h-12 animate-spin" /> : icon}
                    </div>
                </div>
            </div>

            <div className="mt-3 py-2 px-1 space-y-1 relative z-20">
                <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] font-black uppercase tracking-widest ${loading ? 'bg-ink/10 text-transparent rounded animate-pulse w-24' : 'text-ink dark:text-white'}`}>
                        {loading ? 'LOADING_SYSTEM' : label}
                    </span>
                    {!loading && <ArrowIcon />}
                </div>
                <p className={`mono-font text-[9px] font-black uppercase tracking-widest opacity-40 truncate leading-none ${loading ? 'bg-ink/5 text-transparent rounded animate-pulse w-32 mt-2' : ''}`}>
                    {loading ? 'WAITING_FOR_SIGNAL' : description}
                </p>
            </div>
        </Card>
    );
}

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-ink dark:text-white font-bold">
            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

interface OnboardingEmptyStateProps {
    onUpload: () => void;
    onConnect: () => void;
    isUploading?: boolean;
    showUpload?: boolean;
    showConnect?: boolean;
}

export function OnboardingEmptyState({
    onUpload,
    onConnect,
    isUploading = false,
    showUpload = true,
    showConnect = true
}: OnboardingEmptyStateProps) {
    return (
        <>
            {showUpload && (
                <PlaceholderModule
                    icon={<Plus size={48} strokeWidth={1.5} />}
                    label="UPLOAD_IMAGE"
                    description="Add an image to your gallery."
                    tag="UPLOADER"
                    tagColor="bg-blue text-white"
                    accentColor="var(--blue)"
                    onClick={onUpload}
                    isLoading={isUploading}
                />
            )}
            {showConnect && (
                <PlaceholderModule
                    icon={<Cpu size={48} strokeWidth={1.5} />}
                    label="CONNECT_DEVICE"
                    description="Setup your physical frame."
                    tag="CONNECTION"
                    tagColor="bg-purple text-white"
                    accentColor="var(--purple)"
                    onClick={onConnect}
                />
            )}
        </>
    );
}
