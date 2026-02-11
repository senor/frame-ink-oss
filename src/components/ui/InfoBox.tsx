import React from 'react';

interface InfoBoxProps {
    variant?: 'blue' | 'orange';
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export function InfoBox({ variant = 'blue', children, icon, className = '' }: InfoBoxProps) {
    const variantStyles = variant === 'blue'
        ? "bg-[var(--blue)]/5 border-[var(--blue)] text-[var(--blue)]"
        : "bg-[var(--orange)]/5 border-[var(--orange)] text-[var(--orange)]";

    return (
        <div className={`border-l-4 p-4 md:p-6 space-y-4 ${variantStyles} ${className}`}>
            <div className="flex items-center gap-3">
                {icon && <div className="shrink-0">{icon}</div>}
                <div className="mono-font text-[10px] uppercase font-black leading-relaxed space-y-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
