import React from 'react';

interface NumberedListItemProps {
    number: string;
    title: string;
    description: string | React.ReactNode;
    className?: string;
}

export function NumberedListItem({ number, title, description, className = '' }: NumberedListItemProps) {
    return (
        <div className={`flex gap-4 ${className}`}>
            <span className="mono-font opacity-20 text-sm font-black shrink-0">{number}</span>
            <div className="space-y-1">
                <h4 className="mono-font text-sm font-black uppercase text-ink dark:text-white">
                    {title}
                </h4>
                <div className="mono-font text-[10px] opacity-50 leading-relaxed text-ink dark:text-white">
                    {description}
                </div>
            </div>
        </div>
    );
}
