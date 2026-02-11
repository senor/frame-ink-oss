import React from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

interface AlertBannerProps {
    icon?: React.ReactNode;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
}

export function AlertBanner({ icon, message, actionLabel, onAction, onDismiss }: AlertBannerProps) {
    return (
        <div className="bg-zinc-950 text-[#EBE6D7] px-6 py-3 border-b-2 border-zinc-950 flex justify-between items-center sticky top-0 z-[100] animate-toast-up">
            <div className="flex items-center gap-4">
                {icon}
                <span className="mono-font text-[10px] tracking-[0.2em]">{message}</span>
            </div>
            <div className="flex items-center gap-6">
                {actionLabel && (
                    <button
                        onClick={onAction}
                        className="mono-font text-[10px] underline decoration-[var(--orange)] decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                        {actionLabel}
                    </button>
                )}
                {onDismiss && (
                    <IconButton
                        icon="X"
                        variant="tertiary"
                        onClick={onDismiss}
                        iconSize={14}
                        className="!w-6 !h-6 !p-0 !border-none !text-[#EBE6D7]/40 hover:!text-[#EBE6D7]"
                    />
                )}
            </div>
        </div>
    );
}
