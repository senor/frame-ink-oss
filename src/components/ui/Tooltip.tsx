import React, { useState } from 'react';

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    delay?: number;
}

export function Tooltip({
    content,
    children,
    position = 'top',
    className = '',
    delay = 200
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-ink border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-ink border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-ink border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-ink border-t-transparent border-b-transparent border-l-transparent'
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}

            {/* Tooltip Content */}
            <div
                className={`
                    absolute z-50 w-max max-w-[250px]
                    bg-[#1D1D1B] text-[#EBE6D7]
                    px-3 py-2
                    text-[10px] font-mono leading-tight uppercase
                    border border-[#EBE6D7]/10
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                    pointer-events-none
                    transition-opacity duration-200
                    ${positionClasses[position]}
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
            >
                {content}

                {/* Arrow */}
                <div
                    className={`
                        absolute w-0 h-0 
                        border-[6px]
                        ${arrowClasses[position]}
                    `}
                />
            </div>
        </div>
    );
}
