import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ritual-theme') as 'light' | 'dark';
            if (saved) return saved;
            return document.documentElement.classList.contains('dark') ? 'dark' : 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Only modify DOM if there's a mismatch to prevent flicker
        if (theme === 'dark' && !root.classList.contains('dark')) {
            root.classList.add('dark');
        } else if (theme === 'light' && root.classList.contains('dark')) {
            root.classList.remove('dark');
        }
        localStorage.setItem('ritual-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-[54px] h-[54px] bg-paper dark:bg-ink text-ink dark:text-paper border-2 border-ink dark:border-paper shadow-[4px_4px_0px_0px_var(--ink)] dark:shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transition-all duration-100 ease-out hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_0px_var(--blue)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--ink)] cursor-pointer"
            title="Toggle Light/Dark Ritual"
        >
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
    );
}
