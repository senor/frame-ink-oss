import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

export function BackButton({ label, onClick, className = '' }: BackButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`mono-font text-[10px] flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest ${className}`}
        >
            <ArrowLeft className="w-3 h-3" />
            {label}
        </button>
    );
}
