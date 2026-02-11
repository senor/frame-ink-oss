import React from 'react';

interface StatusTooltipProps {
    online: boolean;
    totalImages?: number;
    refreshesWeekly?: number;
    lastSync?: string;
    className?: string;
    onConnectHardware?: () => void;
}

export function StatusTooltip({
    online,
    totalImages = 0,
    refreshesWeekly = 0,
    lastSync = "12 mins ago",
    className = "",
    onConnectHardware
}: StatusTooltipProps) {

    return (
        <div className={`
            relative w-[280px] bg-[color:var(--bg-surface)] border-2 border-ink
            shadow-[8px_8px_0px_0px_var(--shadow-color)]
            flex flex-col
            z-[100]
            ${className}
        `}>
            {/* Tab Label */}
            <div className="absolute -top-[24px] -left-[2px] bg-[color:var(--bg-surface)] border-2 border-b-0 border-ink px-3 py-1.5 z-10 h-[26px] flex items-center">
                <span className="font-mono font-black text-[10px] tracking-widest uppercase text-ink">STATUS</span>
            </div>

            {/* Main Content */}
            <div className="p-5 flex flex-col gap-5 relative bg-[color:var(--bg-surface)]">

                {/* Device Status */}
                <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-ink/60 uppercase tracking-wider">Device Status</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'} ${online ? 'animate-pulse' : ''}`} />
                        <span className={`brand-font text-sm ${online ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} uppercase`}>
                            {online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>

                {/* Total Images */}
                <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">TOTAL_IMAGES</span>
                    <span className="font-mono text-sm font-bold text-ink">{totalImages}</span>
                </div>

                {/* Refresh Rate */}
                <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest text-ink">REFRESHES (WK)</span>
                    <span className="font-mono text-sm font-bold text-ink">{refreshesWeekly}</span>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-dashed border-ink/20" />

                {/* Last Sync */}
                <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-ink/60 uppercase tracking-wider">LAST_SYNC:</span>
                    <span className="font-mono text-xs font-bold uppercase tracking-tight text-ink">{lastSync}</span>
                </div>

                {/* Offline CTA */}
                {!online && (
                    <div className="mt-2 pt-4 border-t border-ink/10">
                        <p className="mono-font text-[9px] uppercase tracking-wider opacity-60 mb-3 leading-tight">
                            Connect your hardware<br />to get started.
                        </p>
                        <button
                            onClick={onConnectHardware}
                            className="w-full py-2 px-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-between group"
                        >
                            <span className="mono-font text-[10px] font-black text-red-500 uppercase tracking-widest">Connect_Hardware</span>
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:animate-ping" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
