import React, { useEffect, useState } from 'react';
import { IconButton } from './IconButton';
import { ModalCloseButton } from './ModalCloseButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    className?: string;
    variant?: 'default' | 'critical';
    title?: string;
    label?: string;
    footer?: React.ReactNode;
    verticalAlign?: 'center' | 'top';
}

export function Modal({ isOpen, onClose, children, maxWidth = 'max-w-4xl', className = '', variant = 'default', title, label, footer, verticalAlign = 'center' }: ModalProps) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            document.body.style.overflow = 'hidden';
        } else if (shouldRender) {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
                document.body.style.overflow = 'unset';
            }, 150); // Match animation duration
            return () => clearTimeout(timer);
        }

        // Safety cleanup: Ensure scroll is restored if component unmounts while open
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!shouldRender) return null;

    const isCritical = variant === 'critical';

    return (
        <div className={`fixed inset-0 z-[50000] flex justify-center p-4 backdrop-blur-[2px] transition-all duration-150 ease-in-out ${isClosing ? 'bg-black/0 backdrop-blur-0' : 'bg-black/60'} ${verticalAlign === 'center' ? 'items-center' : 'items-start pt-[10vh]'}`}>
            <div
                className="absolute inset-0"
                onClick={onClose}
                aria-label="Close modal"
            />

            {/* Modal Container */}
            <div className={`
                relative w-full ${maxWidth} flex flex-col
                ${isCritical
                    ? 'bg-circuit-gold border-[3px] border-void shadow-[20px_20px_0px_0px_#000] p-12 text-void'
                    : 'bg-white dark:bg-[#0A0A0A] border-2 border-ink dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]'}
                ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}
            `}>
                {/* Critical Label - Nested to top border */}
                {isCritical && (
                    <div className="absolute -top-3 left-8">
                        <div className="bg-void text-white border-2 border-void py-1 px-3 font-black text-[10px] tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] uppercase">
                            {title || 'SYSTEM_OVERRIDE'}
                        </div>
                    </div>
                )}

                {/* Industrial Frame Corners (Bottom Only) - Hidden for critical */}
                {!isCritical && (
                    <>
                        <div className="modal-frame-corner modal-corner-bl" />
                        <div className="modal-frame-corner modal-corner-br" />
                    </>
                )}

                {/* Optional Top Label (e.g. DEMO_MODE) */}
                {label && !isCritical && (
                    <div className="absolute -top-3 left-8 z-[70]">
                        <div className="bg-[var(--gold)] text-black border-2 border-black py-1 px-3 font-black text-[10px] tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] uppercase">
                            {label}
                        </div>
                    </div>
                )}

                {/* Header Logic: Standard vs Critical */}
                {isCritical ? (
                    // Critical: Absolute Positioning
                    <div className="absolute top-6 right-8 z-[60]">
                        <ModalCloseButton
                            onClick={onClose}
                            className="text-void hover:text-void/70"
                        />
                    </div>
                ) : (
                    // Standard: Flex Header Bar
                    <div className="flex items-center justify-between px-1 py-1 flex-none bg-black dark:bg-white text-white dark:text-zinc-950">
                        <div className="flex items-center gap-3 pl-3">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue dark:bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                            <span className="mono-font text-[10px] font-black uppercase tracking-[0.2em] text-white dark:text-zinc-950">
                                {title || 'System_Module'}
                            </span>
                        </div>
                        <ModalCloseButton
                            onClick={onClose}
                            className="text-white dark:text-zinc-950 hover:text-white/70 dark:hover:text-zinc-950/70 w-8 h-8"
                        />
                    </div>
                )}

                {/* Content Area */}
                <div className={`overflow-auto max-h-[85vh] flex-1 ${className}`}>
                    {children}
                </div>

                {/* Optional Footer - Hidden for critical as buttons are usually in content */}
                {footer && !isCritical && (
                    <div className="flex-none bg-paper dark:bg-zinc-950 border-t-2 border-ink dark:border-white">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
