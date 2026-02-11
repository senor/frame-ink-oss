import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    interactive?: boolean;
    variant?: 'default' | 'flat' | 'recommended' | 'warning';
}

export function Card({
    children,
    className = '',
    interactive = false,
    variant = 'default',
    ...props
}: CardProps) {
    const baseStyles = "card";

    const interactiveStyles = interactive
        ? "card-interactive cursor-pointer"
        : "";

    let variantStyles = "";
    if (variant === 'flat') {
        variantStyles = "shadow-none border-2";
    } else if (variant === 'recommended') {
        variantStyles = "border-[var(--blue)] ring-4 ring-[var(--blue)]/10 bg-[var(--blue)]/[0.02]";
    } else if (variant === 'warning') {
        variantStyles = "border-[var(--orange)] opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300";
    }

    // The legacy .card had no base shadow, only on hover.

    return (
        <div
            className={`${baseStyles} ${interactiveStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>
}

export function CardContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>
}
