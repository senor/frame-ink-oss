import { useEffect } from 'react';

export function useGoogleFont(href: string) {
    useEffect(() => {
        const existing = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);
        if (existing) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }, [href]);
}
