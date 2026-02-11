import { X } from 'lucide-react';

interface ModalCloseButtonProps {
    onClick: () => void;
    className?: string;
}

export function ModalCloseButton({ onClick, className = '' }: ModalCloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                group relative w-12 h-12 flex items-center justify-center 
                transition-transform active:scale-95 focus:outline-none
                ${className}
            `}
            aria-label="Close"
        >
            {/* Hover Background - Subtle tactile feel */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />

            {/* The 'X' Icon - Thick and heavy */}
            <X
                strokeWidth={3}
                className="w-6 h-6 relative z-10 transition-colors"
            />
        </button>
    );
}
