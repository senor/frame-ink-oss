import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
    onSignInClick: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps) {
    return (
        <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center relative z-20">
            <div className="flex flex-col self-start md:self-auto mb-6 md:mb-0 select-none">
                <a href="/" className="group no-underline">
                    <h2 className="brand-font leading-none text-5xl text-ink flex items-baseline gap-1">
                        <span>FRAME</span>
                        <span className="text-4xl serif-italic text-[color:var(--pink)] lowercase tracking-tight font-bold ml-1 transition-colors">lab</span>
                    </h2>
                </a>
            </div>

            <div className="flex items-center gap-5 self-end md:self-auto">
                <button
                    onClick={onSignInClick}
                    className="btn btn-secondary btn-md px-6 mono-font text-[10px] uppercase font-black tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                    Sign In
                </button>
                <div className="h-4 w-[1px] bg-ink/10" />
                <ThemeToggle />
            </div>
        </nav>
    );
}
