import React from 'react';

interface StatusPillProps {
    status: 'pending' | 'live' | 'offline';
    label: string;
    className?: string;
}

export function StatusPill({ status, label, className = '' }: StatusPillProps) {
    const dotColors = {
        pending: 'bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]',
        live: 'bg-[#22c55e] shadow-[0_0_8px_#22c55e]',
        offline: 'bg-zinc-500'
    };

    const isAnimated = status === 'pending';

    return (
        <div className={`bg-zinc-950 dark:bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-3 ${className}`}>
            <div className={`w-2 h-2 rounded-full ${dotColors[status]} ${isAnimated ? 'animate-pulse' : ''}`} />
            <span className="mono-font text-[10px] tracking-tighter uppercase text-white">
                {label}
            </span>
        </div>
    );
}
