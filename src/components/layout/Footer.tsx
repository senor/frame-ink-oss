import React from 'react';

export function Footer() {
    return (
        <footer className="py-3 px-6 border-t border-ink/10 fixed bottom-0 w-full transition-colors duration-300" style={{ backgroundColor: 'var(--bg-canvas)', zIndex: 999999 }}>
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">© 2026 framelab.ink</span>
                </div>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <span>v0.1.0 // Private_Beta</span>
                </div>
            </div>
        </footer>
    );
}
