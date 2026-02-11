import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'nav';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = "transition-all duration-100 ease-out font-black uppercase tracking-wider flex items-center justify-center select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

    const variants = {
        primary: "bg-blue text-white border-2 border-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--blue)] shadow-[4px_4px_0px_0px_var(--shadow-color)] text-xs py-4 px-8 mono-font font-bold",
        secondary: "bg-paper text-ink border-2 border-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--blue)] shadow-[4px_4px_0px_0px_var(--shadow-color)] text-xs py-4 px-8 hover:bg-ink hover:text-paper mono-font font-bold",
        outline: "bg-transparent text-ink border-2 border-border hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)] text-xs py-4 px-8 hover:bg-paper mono-font",
        gradient: "bg-blue text-white border-[2.5px] border-border shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:bg-gradient-to-l hover:from-blue hover:via-orange hover:to-gold hover:animate-gradient hover:bg-[length:400%_400%] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--shadow-color)] text-xs py-5 px-10 mono-font",
        nav: "bg-ink text-paper text-[11px] py-3 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] text-xs font-black tracking-widest mono-font",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
