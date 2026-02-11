import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

export type IconName = keyof typeof Icons;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconName;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'; // ghost for unstyled/custom
    tooltip?: string;
    iconSize?: number;
    isLoading?: boolean;
}

export function IconButton({
    icon,
    variant = 'secondary',
    tooltip,
    className = '',
    iconSize = 20,
    isLoading = false,
    ...props
}: IconButtonProps) {
    const IconComponent = Icons[icon] as React.ComponentType<LucideProps>;

    const baseStyles = "btn btn-icon relative tooltip-trigger";

    const variants = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        tertiary: "btn-tertiary",
        ghost: "bg-transparent border-transparent shadow-none hover:bg-ink hover:text-white"
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <button type="button" className={combinedClassName} {...props}>
            {isLoading ? (
                <Icons.Loader2 size={iconSize} className="animate-spin" />
            ) : (
                IconComponent && <IconComponent size={iconSize} />
            )}

            {tooltip && (
                <span className="tooltip-content">{tooltip}</span>
            )}
        </button>
    );
}
