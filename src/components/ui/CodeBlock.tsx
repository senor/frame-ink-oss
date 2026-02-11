import React from 'react';

interface CodeBlockProps {
    code: string;
    accentColor?: 'blue' | 'orange';
    className?: string;
}

export function CodeBlock({ code, accentColor = 'blue', className = '' }: CodeBlockProps) {
    const accentStyles = accentColor === 'blue'
        ? "border-[var(--blue)]"
        : "border-[var(--orange)]";

    return (
        <div className={`bg-zinc-950 p-4 border-l-4 ${accentStyles} ${className}`}>
            <code className="text-[#EBE6D7] mono-font text-[10px] break-all">
                {code}
            </code>
        </div>
    );
}
