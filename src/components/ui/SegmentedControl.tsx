import React from 'react';

interface SegmentedControlOption {
    value: string | number;
    label: string;
}

interface SegmentedControlProps {
    options: SegmentedControlOption[];
    value: string | number;
    onChange: (value: any) => void;
    label?: string;
    className?: string;
}

export function SegmentedControl({ options, value, onChange, label, className = '' }: SegmentedControlProps) {
    return (
        <div className={`space-y-4 ${className} mono-font relative`}>
            {label && <label className="text-[10px] block font-black uppercase tracking-widest text-ink opacity-70">{label}</label>}
            <div className="flex border-2 border-ink dark:border-white p-1 bg-paper/30 dark:bg-white/5">
                {options.map((opt, i) => {
                    const isActive = String(opt.value) === String(value);
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            className={`
                                flex-1 font-black text-[11px] uppercase transition-all duration-200 cursor-pointer h-12 relative z-10
                                ${isActive
                                    ? 'bg-[var(--blue)] text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                    : 'bg-transparent text-ink dark:text-white hover:bg-black/5 dark:hover:bg-white/5 opacity-50 hover:opacity-100'}
                            `}
                            onClick={() => onChange(opt.value)}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
