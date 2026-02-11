import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
    value: string | number;
    label: string;
}

interface DropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: DropdownOption[];
    label?: React.ReactNode;
    value: string | number;
    onChange: (value: string) => void;
}

export function Dropdown({ options, label, value, onChange, className = '', ...props }: DropdownProps) {
    return (
        <div className={`space-y-4 ${className} mono-font`}>
            {label && <label className="text-[10px] block font-black uppercase tracking-widest text-ink opacity-70">{label}</label>}
            <div className="relative">
                <select
                    className="w-full h-14 border-2 border-ink bg-paper/20 px-4 font-black text-ink appearance-none focus:outline-none focus:ring-0 rounded-none cursor-pointer uppercase mono-font"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink">
                    <ChevronDown size={20} strokeWidth={3} />
                </div>
            </div>
        </div>
    );
}
