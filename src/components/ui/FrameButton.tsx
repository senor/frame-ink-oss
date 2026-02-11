import React from 'react';

interface FrameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export function FrameButton({
    children,
    size = 'md',
    icon,
    fullWidth = false,
    className = '',
    ...props
}: FrameButtonProps) {
    const sizeClass = `btn-${size}`;

    return (
        <button
            className={`btn-frame ${sizeClass} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            <div className="btn-frame-corner corner-tl" />
            <div className="btn-frame-corner corner-tr" />
            <div className="btn-frame-corner corner-bl" />
            <div className="btn-frame-corner corner-br" />

            <div className="btn-frame-content">
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span className="whitespace-nowrap">{children}</span>
            </div>
        </button>
    );
}
