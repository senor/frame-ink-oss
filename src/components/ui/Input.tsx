import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="text-[9px] font-black uppercase tracking-widest mb-2 block opacity-70 mono-font">
                    {label}
                </label>
            )}
            <input
                className={`w-full bg-paper border-2 border-border p-4 mono-font font-bold text-ink outline-none focus:bg-white transition-colors placeholder:text-ink-secondary ${className}`}
                {...props}
            />
        </div>
    );
}
