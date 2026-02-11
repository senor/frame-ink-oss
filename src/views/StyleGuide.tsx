import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { IconButton } from '../components/ui/IconButton';
import { Modal } from '../components/ui/Modal';
import { Dropdown } from '../components/ui/Dropdown';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Toast } from '../components/ui/Toast';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { SettingsModal } from './DashboardPage/components/SettingsModal';
import { EditorModal } from './DashboardPage/components/EditorModal';
import { StatusPill } from '../components/ui/StatusPill';
import { AccessDenied } from './DashboardPage/components/AccessDenied';
import { OnboardingEmptyState } from './DashboardPage/components/OnboardingEmptyState';
import { OnboardingModal } from './DashboardPage/components/OnboardingModal';
import { UrlImportModal } from './DashboardPage/components/UrlImportModal';
import { BetaSignupModal } from './LandingPage/components/BetaSignupModal';
import { StatusTooltip } from './DashboardPage/components/StatusTooltip';
import { Tooltip } from '../components/ui/Tooltip';
import { AlertBanner } from '../components/ui/AlertBanner';
import { InfoBox } from '../components/ui/InfoBox';
import { CodeBlock } from '../components/ui/CodeBlock';
import { NumberedListItem } from '../components/ui/NumberedListItem';
import { BackButton } from '../components/ui/BackButton';
import { getBackend } from '../services/factory';
import { useNavigate } from 'react-router-dom';
import { Scan, Zap, Crop, Trash2, Settings, Shuffle, CloudUpload, Pencil, CheckCircle, AlertCircle, Loader2, Layers, Globe, Cpu, Monitor, Image as ImageIcon, Plus, ArrowRight, Layout, Type, Palette, Menu, X, Info } from 'lucide-react';



export default function StyleGuide() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showCritical, setShowCritical] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showUrlImport, setShowUrlImport] = useState(false);
    const [showBetaSignup, setShowBetaSignup] = useState(false);
    const [interval, setInterval] = useState(60);
    const [orientation, setOrientation] = useState(0);
    const [demoOrientation, setDemoOrientation] = useState(0);
    const [powerMode, setPowerMode] = useState<string | number>('active');
    const [activeCategory, setActiveCategory] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('styleGuideCategory');
        return saved || 'tokens';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 200, y: 200 });

    const categories = [
        { id: 'tokens', label: 'System_Tokens', icon: Layers },
        { id: 'buttons', label: 'Button_Matrix', icon: Zap },
        { id: 'cards', label: 'Card_Variants', icon: Cpu },
        { id: 'modals', label: 'Modal_Protocols', icon: Monitor },
        { id: 'illustrations', label: 'Technical_Ills', icon: Crop },
        { id: 'indicators', label: 'Indicators', icon: CheckCircle },
        { id: 'banners', label: 'Alert_Banners', icon: AlertCircle },
        { id: 'forms', label: 'Form_Elements', icon: Settings },
        { id: 'states', label: 'App_States', icon: Layout },
    ];

    // Persist active category to localStorage
    useEffect(() => {
        localStorage.setItem('styleGuideCategory', activeCategory);
    }, [activeCategory]);

    const [notification, setNotification] = useState<{ msg: string; type: 'info' | 'loading' | 'success' | 'error' } | null>(null);
    const toastTimeoutRef = useRef<number | null>(null);

    const notify = (msg: string, type: 'info' | 'loading' | 'success' | 'error' = 'info') => {
        if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
        setNotification({ msg, type });
        if (type !== 'loading') {
            toastTimeoutRef.current = window.setTimeout(() => setNotification(null), 4000);
        }
    };

    // Mock Data
    const mockImage = {
        id: 'mock-1',
        name: 'TEST_PATTERN.png',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        isNew: false
    };

    const mockNewImage = {
        ...mockImage,
        id: 'mock-new-1',
        name: 'NEW_UPLOAD.png',
        isNew: true
    };

    const [activeEditorImage, setActiveEditorImage] = useState<any | null>(null);

    return (
        <div className="min-h-screen p-0 m-0 bg-paper text-ink overflow-x-hidden">
            <div className="grainy-overlay" />
            <div className="grainy-bg" />
            <div className="atmosphere-bg" />

            {/* THEME TOGGLE */}
            <div className="fixed top-8 right-8 z-50">
                <ThemeToggle />
            </div>

            <div className="flex h-screen overflow-hidden relative z-10 w-full">
                {/* SIDEBAR - Desktop */}
                <aside className="w-72 border-r border-ink/10 h-full bg-paper flex flex-col hidden lg:flex shrink-0">
                    <div className="p-12 pb-8">
                        <h1 className="brand-font leading-none text-ink flex w-full justify-between items-baseline mb-2">
                            <span className="text-3xl">FRAME</span>
                            <span className="text-2xl serif-italic text-[color:var(--pink)] lowercase tracking-tight font-bold">ink</span>
                        </h1>
                        <p className="mono-font text-[8px] uppercase tracking-[0.3em] opacity-30">Style_Guide // v2.2</p>
                    </div>

                    <nav className="flex-grow overflow-y-auto px-8 py-4 space-y-1">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 font-mono text-[10px] uppercase font-black transition-all group ${isActive
                                        ? 'bg-ink text-paper'
                                        : 'hover:bg-ink/5 text-ink/60 hover:text-ink'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`} />
                                    <span>{cat.label}</span>
                                    {isActive && <div className="ml-auto w-1 h-1 bg-paper rounded-full" />}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-8 pt-6 border-t border-ink/10 flex justify-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mono-font text-[9px] uppercase opacity-40 hover:opacity-100 flex items-center justify-center gap-2 group w-full"
                        >
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            Back_to_App
                        </button>
                    </div>
                </aside>

                {/* SIDEBAR - Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <aside
                            className="w-72 h-full bg-paper flex flex-col p-12 animate-slide-right"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h1 className="brand-font leading-none text-ink flex w-full justify-between items-baseline mb-2">
                                        <span className="text-3xl">FRAME</span>
                                        <span className="text-2xl serif-italic text-[color:var(--pink)] lowercase tracking-tight font-bold">ink</span>
                                    </h1>
                                    <p className="mono-font text-[8px] uppercase tracking-[0.3em] opacity-30">v2.2</p>
                                </div>
                                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-ink opacity-40 hover:opacity-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="flex-grow space-y-1">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setActiveCategory(cat.id);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-4 px-4 py-3 font-mono text-[10px] uppercase font-black transition-all group ${isActive
                                                ? 'bg-ink text-paper'
                                                : 'hover:bg-ink/5 text-ink/60 hover:text-ink'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`} />
                                            <span>{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </aside>
                    </div>
                )}

                <main className="flex-grow h-full overflow-y-auto scroll-smooth">
                    <div className="max-w-5xl mx-auto px-8 lg:px-12 py-12 lg:py-20">
                        <header className="mb-16 lg:mb-24 flex items-center justify-between gap-6">
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-3 bg-ink text-paper rounded hover:bg-ink/90 transition-colors"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-grow">
                                {/* Header Title Removed */}
                            </div>
                        </header>

                        {/* 01_Core_Palette */}
                        {activeCategory === 'tokens' && (
                            <>
                                <section className="mb-32">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">01_Core_Palette</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--const-void)] border-2 border-[color:var(--const-paper)]/25 mb-4 halftone-dark" />
                                            <p className="font-mono text-[10px] font-bold">VOID_BASE</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--const-paper)] border-2 border-[color:var(--const-void)] mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--const-paper)]">PAPER_BASE</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--bg-surface)] border-2 border-[color:var(--const-void)]/10 mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-ink">SURFACE_DEFAULT</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--bg-surface-module)] border-2 border-[color:var(--const-void)]/10 mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-ink">SURFACE_MODULE</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--blue)] mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--blue)]">INK_BLUE</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--gold)] mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--gold)]">CIRCUIT_GOLD</p>
                                        </div>
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--orange)] mb-4" />
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--orange)]">MARKER_ORANGE</p>
                                        </div>
                                    </div>
                                </section>

                                {/* 02_Secondary_Palette */}
                                <section className="mb-32">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">02_Secondary_Palette</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                        {/* Zine Green */}
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--green)] border-2 border-border mb-4 flex items-center justify-center">
                                                <div className="bg-[color:var(--green)] text-white border-white px-2 py-1 font-mono text-[8px] font-black uppercase border transform -rotate-1 shadow-none">STATUS_OK</div>
                                            </div>
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--green)]">ZINE_GREEN</p>
                                        </div>
                                        {/* Tech Cyan */}
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--cyan)] border-2 border-border mb-4 flex items-center justify-center">
                                                <Scan className="w-6 h-6 text-black" />
                                            </div>
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--cyan)]">TECH_CYAN</p>
                                        </div>
                                        {/* Void Purple */}
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--purple)] border-2 border-border mb-4 flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                                            </div>
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--purple)]">VOID_PURPLE</p>
                                        </div>
                                        {/* System Pink */}
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--pink)] border-2 border-border mb-4 flex items-center justify-center">
                                                <div className="w-6 h-6 bg-[color:var(--pink)] rounded-full mix-blend-multiply"></div>
                                            </div>
                                            <p className="font-mono text-[10px] font-bold text-[color:var(--pink)]">SYSTEM_PINK</p>
                                        </div>
                                        {/* Ink Secondary */}
                                        <div>
                                            <div className="w-full aspect-square bg-[color:var(--ink-secondary)] border-2 border-border mb-4 flex items-center justify-center">
                                                <span className="text-white text-[10px] font-mono">60%</span>
                                            </div>
                                            <p className="font-mono text-[10px] font-bold text-ink opacity-60">INK_SECONDARY</p>
                                        </div>
                                    </div>
                                </section>

                                {/* 03_Texture_Lab */}
                                <section className="mb-32">
                                    <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">03_Texture_Lab</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        {/* HIFI_DITHER Sample */}
                                        <Card className="p-8">
                                            <div className="aspect-video texture-sample bg-[color:var(--const-void)] flex items-center justify-center overflow-hidden border border-border relative">
                                                <svg viewBox="0 0 200 100" className="w-full h-full">
                                                    <radialGradient id="lab-grad"><stop offset="0%" stopColor="var(--blue)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
                                                    <circle cx="100" cy="50" r="40" fill="url(#lab-grad)" />
                                                    <rect width="200" height="100" fill="white" filter="url(#hi-fi-stipple-global)" opacity="0.6" style={{ mixBlendMode: 'overlay' }} />
                                                </svg>
                                                <div className="tag-marker absolute bottom-4 right-4">HIFI_DITHER</div>
                                            </div>
                                            <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">Composite stipple over radial gradients for "printed" depth.</p>
                                        </Card>

                                        {/* Atmospheric Stipple */}
                                        <Card className="p-8">
                                            <div className="aspect-video w-full h-full bg-[color:var(--const-void-dark)] flex items-center justify-center relative overflow-hidden border border-border">
                                                <div className="w-32 h-32 rounded-full bg-[color:var(--blue)] blur-3xl opacity-60"></div>
                                                <div className="absolute inset-0 opacity-80 mix-blend-overlay"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
                                                />
                                                <div className="tag-marker z-20 absolute bottom-4 right-4">ATMOSPHERE:DEEP_GLOW</div>
                                            </div>
                                            <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">High-contrast noise over radial blurs.</p>
                                        </Card>

                                        {/* Industrial Grit */}
                                        <Card className="p-8">
                                            <div className="aspect-video w-full h-full bg-[#EBE6D7] flex items-center justify-center relative overflow-hidden border border-border">
                                                <div className="absolute inset-0 opacity-40 mix-blend-multiply"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                                    }}
                                                />
                                                <div className="tag-marker !bg-[color:var(--const-void)] !text-[color:var(--const-paper)] absolute bottom-4 right-4">TEXTURE:VELLUM_GRIT</div>
                                            </div>
                                            <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">Multi-octave noise simulating physical pigment.</p>
                                        </Card>
                                    </div>
                                </section>
                                {/* 04_Typography_Hierarchy */}
                                <section className="mb-32">
                                    <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">04_Typography_Hierarchy</h2>
                                    <div className="space-y-12">
                                        <div className="border-l-4 border-ink pl-8">
                                            <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Syne / 7XL (72px) / Brand</p>
                                            <h3 className="brand-font text-7xl uppercase">A BETTER WAY</h3>
                                        </div>
                                        <div className="border-l-4 border-ink pl-8">
                                            <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Syne / 8XL (96px) / Extended Title Display</p>
                                            <h3 className="title-font text-8xl uppercase">FRAME.ink</h3>
                                        </div>
                                        <div className="border-l-4 border-[color:var(--gold)] pl-8">
                                            <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Space Mono / 4XL (36px)</p>
                                            <h3 className="mono-font text-4xl uppercase font-black">SYS_CONNECTION_OK</h3>
                                        </div>
                                        <div className="border-l-4 border-[color:var(--orange)] pl-8">
                                            <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Instrument Serif / 5XL (48px)</p>
                                            <h3 className="serif-italic text-5xl">the artist atelier</h3>
                                        </div>
                                    </div>
                                </section>

                                {/* Instruction_Payloads - Moved from Banners */}
                                <section className="mb-32">
                                    <h3 className="brand-font text-2xl mb-12">Instruction_Payloads</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        <div className="space-y-8">
                                            <BackButton
                                                label="Back_to_Options"
                                                onClick={() => { }}
                                            />
                                            <NumberedListItem
                                                number="01"
                                                title="Flash Pi OS Lite"
                                                description={
                                                    <>
                                                        Use <a href="#" className="underline decoration-2 underline-offset-2 hover:text-void font-bold">Raspberry Pi Imager</a> to flash standard 64-bit Lite OS.
                                                    </>
                                                }
                                            />
                                            <NumberedListItem
                                                number="02"
                                                title="Run Installation"
                                                description="Execute the command in your terminal to begin the installation."
                                            />
                                        </div>
                                        <div className="space-y-8">
                                            <CodeBlock
                                                code="curl -sSL https://get.frame.ink/install | bash"
                                                accentColor="blue"
                                            />
                                            <CodeBlock
                                                code="curl -sSL https://get.frame.ink/add | bash"
                                                accentColor="orange"
                                            />
                                            <div className="pt-8 space-y-4">
                                                <p className="mono-font text-[10px] opacity-40 uppercase">Text_Utilities</p>
                                                <div className="flex gap-4 items-center">
                                                    <span className="highlight-marker">/boot/</span>
                                                    <span className="highlight-marker">config.json</span>
                                                    <span className="tag-marker tag-marker-recommended">RECOMMENDED</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* 05_Button_Matrix */}
                        {activeCategory === 'buttons' && (
                            <section className="mb-40">
                                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">05_Button_Matrix</h2>

                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-[150px_repeat(6,1fr)] gap-8 items-center min-w-[1000px]">
                                        {/* Headers */}
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-right pr-4">Variant \ Size</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">XS</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">SM</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">MD</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">LG</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">XL</div>
                                        <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">2XL</div>

                                        {/* Special (MD Only) */}
                                        <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Special</div>
                                        <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                                        <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                                        <div className="flex justify-center flex-col gap-2 items-center">
                                            <button className="btn btn-primary-special btn-md w-full">PRIMARY</button>
                                            <button className="btn btn-secondary-special btn-md w-full">SECONDARY</button>
                                        </div>
                                        <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                                        <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                                        <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>

                                        {/* Primary (Standard) - All Sizes */}
                                        <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Primary</div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-xs">BTN</button></div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-sm">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-md">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-lg">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-xl">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-primary btn-2xl">BTN</button></div>

                                        {/* Secondary */}
                                        <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Secondary</div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-xs">BTN</button></div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-sm">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-md">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-lg">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-xl">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-secondary btn-2xl">BTN</button></div>

                                        {/* Tertiary */}
                                        <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Tertiary</div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-xs">BTN</button></div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-sm">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-md">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-lg">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-xl">BUTTON</button></div>
                                        <div className="flex justify-center"><button className="btn btn-tertiary btn-2xl">BTN</button></div>

                                    </div>
                                </div>
                                <div className="mt-16 flex gap-8">
                                    <div className="space-y-4">
                                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Icon Buttons</p>
                                        <div className="flex gap-4">
                                            {/* Using IconButton component for consistency */}
                                            <IconButton icon="Settings" tooltip="SETTINGS" />
                                            {/* Shuffle gets special secondary treatment */}
                                            <IconButton icon="Shuffle" tooltip="RANDOMIZE" className="btn-secondary-special" />

                                            {/* Custom styled IconButton */}
                                            <IconButton icon="CloudUpload" tooltip="ATELIER_SYNC" className="!bg-ink !text-paper" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Tactile Controls</p>
                                        <div className="flex gap-4">
                                            <IconButton icon="X" variant="tertiary" tooltip="CLOSE_MODAL" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Utility Inline</p>
                                        <button className="uppercase font-mono font-black text-[10px] border-2 border-border px-3 py-1 hover:bg-ink hover:text-paper transition-colors bg-transparent text-ink">Edit Name</button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 06_Card_Variants */}
                        {activeCategory === 'cards' && (
                            <>
                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">06_Card_Variants</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {/* Static Card */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Static (Login / Info)</p>
                                            <Card className="p-12 text-center shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                                                <h3 className="brand-font text-3xl mb-4">STATIC_VOID</h3>
                                                <p className="mono-font text-xs opacity-60">No motion on hover. Industrial stability.</p>
                                            </Card>
                                        </div>
                                        {/* Interactive Card */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Interactive (Gallery / Action)</p>
                                            <Card className="p-12 text-center" interactive>
                                                <h3 className="brand-font text-3xl mb-4">REACTIVE_INK</h3>
                                                <p className="mono-font text-xs opacity-60">Transforms on hover. Tactile feedback.</p>
                                            </Card>
                                        </div>
                                        {/* Onboarding Variants */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Recommended (Onboarding)</p>
                                            <Card variant="recommended" className="p-12 text-center">
                                                <h3 className="brand-font text-3xl mb-4 text-[var(--blue)]">THE_CHOSEN_PATH</h3>
                                                <p className="mono-font text-xs opacity-60">Accent border and glow for key paths.</p>
                                            </Card>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Warning / Inert (Onboarding)</p>
                                            <Card variant="warning" className="p-12 text-center">
                                                <h3 className="brand-font text-3xl mb-4">LEGACY_SIGNAL</h3>
                                                <p className="mono-font text-xs opacity-60">Grayscale by default. Restores color on hover.</p>
                                            </Card>
                                        </div>
                                    </div>
                                </section>

                                {/* 07_Gallery_Modules_Framed */}
                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">07_Gallery_Modules_Framed</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                        {/* Master Card */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Active Gallery Module</p>
                                            <Card className="p-4 transition-transform card-module" interactive>
                                                <div className="tag-ref absolute top-2 left-2 z-30">PRF-1000</div>
                                                <div className="aspect-[4/5] bg-surface mb-4 relative overflow-hidden border border-border group">
                                                    <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Space Art" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <IconButton icon="Zap" variant="primary" className="btn-primary-special text-white w-12 h-12 border-2 border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all" />
                                                        <IconButton icon="Pencil" className="btn-secondary w-12 h-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-white text-black" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center px-1">
                                                    <span className="font-mono text-[11px] font-black uppercase tracking-widest text-ink dark:text-white">SPACE.PNG</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e] inline-block"></span>
                                                        <span className="font-mono text-[10px] font-black uppercase tracking-tighter text-ink dark:text-white">LIVE</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                        {/* Secondary Card */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Offline Gallery Module</p>
                                            <Card className="p-4 transition-transform card-module" interactive>
                                                <div className="tag-ref absolute top-2 left-2 z-30">TAD-004</div>
                                                <div className="aspect-[4/5] bg-surface mb-4 relative overflow-hidden border border-border group">
                                                    <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Abstract" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <IconButton icon="Zap" className="btn-primary-special w-12 h-12 border-2 border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all" />
                                                        <IconButton icon="Pencil" className="btn-secondary w-12 h-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-white text-black" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center px-1">
                                                    <span className="font-mono text-[11px] font-black uppercase tracking-widest text-ink dark:text-white">TADANORI_04</span>
                                                    <span className="font-mono text-[10px] font-black uppercase tracking-tighter text-ink dark:text-off-white opacity-20">OFFLINE</span>
                                                </div>
                                            </Card>
                                        </div>

                                        {/* Onboarding Empty Modules (Split for labels) */}
                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Placeholder (Upload)</p>
                                            <OnboardingEmptyState
                                                onUpload={() => notify('ACTION: UPLOAD_TRIGGERED', 'info')}
                                                onConnect={() => notify('ACTION: CONNECT_TRIGGERED', 'info')}
                                                showConnect={false}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Placeholder (Connect)</p>
                                            <OnboardingEmptyState
                                                onUpload={() => notify('ACTION: UPLOAD_TRIGGERED', 'info')}
                                                onConnect={() => notify('ACTION: CONNECT_TRIGGERED', 'info')}
                                                showUpload={false}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* 08_Technical_Illustrations */}
                        {activeCategory === 'illustrations' && (
                            <section className="mb-40">
                                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">08_Technical_Illustrations</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                                    {/* 1. Symmetrical Core */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">System: Symmetrical_Core</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="animate-draw schematic-line stroke-ink">
                                                    <circle cx="200" cy="200" r="130" opacity="0.1" fill="none" />
                                                    <circle cx="200" cy="200" r="110" fill="none" />
                                                    <circle cx="200" cy="200" r="90" strokeDasharray="8 8" opacity="0.3" fill="none" />
                                                    <rect x="145" y="145" width="110" height="110" transform="rotate(45 200 200)" fill="none" />
                                                    <circle cx="200" cy="40" r="6" className="fill-[color:var(--blue)] stroke-none" />
                                                    <path d="M200 80 L200 46" className="stroke-[color:var(--blue)] stroke-[2] opacity-80" />
                                                </g>
                                                <text x="215" y="45" className="fill-[color:var(--blue)] font-mono text-[11px] font-black opacity-80">[ SYS_UP ]</text>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 2. Matrix Grid / Seed Architect */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Logic: Seed_Architect</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g>
                                                    <rect x="140" y="140" width="120" height="120" rx="4" fill="none" stroke="var(--ink)" strokeWidth="1" className="animate-draw" />
                                                    <path d="M160 140 L160 80" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <path d="M200 140 L200 60" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                                    <path d="M240 140 L240 80" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <path d="M160 260 L160 320" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <path d="M200 260 L200 340" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                                    <path d="M240 260 L240 320" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <path d="M140 160 L80 160" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <path d="M140 200 L60 200" className="animate-draw" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                                    <path d="M140 240 L80 240" className="animate-draw" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none" style={{ strokeDasharray: '4 2', strokeDashoffset: 0 }} />
                                                    <circle cx="200" cy="200" r="12" fill="var(--blue)" stroke="none" />
                                                </g>
                                                <text x="250" y="215" className="fill-[color:var(--blue)] font-mono text-[11px] font-black opacity-80">[ SEED ]</text>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 3. Orbital Sync */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Sync: Orbital_Pulse</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="animate-draw schematic-line stroke-ink">
                                                    <circle cx="200" cy="200" r="20" className="fill-ink stroke-none" />
                                                    <circle cx="200" cy="200" r="50" strokeDasharray="2 4" fill="none" />
                                                    <circle cx="200" cy="200" r="90" fill="none" />
                                                    <circle cx="200" cy="200" r="140" strokeDasharray="10 10" fill="none" />
                                                </g>
                                                <path d="M200 200 L265 135" className="stroke-[color:var(--orange)] stroke-[4] rotate-dial" />
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 4. Rectangular Grid */}
                                    <div
                                        className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const x = ((e.clientX - rect.left) / rect.width) * 400;
                                            const y = ((e.clientY - rect.top) / rect.height) * 400;
                                            setMousePos({ x, y });
                                        }}
                                        onMouseLeave={() => setMousePos({ x: 200, y: 200 })}
                                    >
                                        <div className="tag-marker z-20 absolute top-8 left-8">Grid: Nested_Frames</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line stroke-ink">
                                                    <rect x="50" y="50" width="300" height="300" fill="none" className="animate-grid-pulse" style={{ animationDelay: '0s' }} />
                                                    <rect x="80" y="80" width="240" height="240" fill="none" className="animate-grid-pulse" style={{ animationDelay: '1s' }} />
                                                    <rect x="110" y="110" width="180" height="180" fill="none" className="animate-grid-pulse" style={{ animationDelay: '2s' }} />
                                                    <rect x="140" y="140" width="120" height="120" fill="none" className="animate-grid-pulse" style={{ animationDelay: '3s' }} />
                                                    <rect
                                                        x={170 + (mousePos.x - 200) * 0.2}
                                                        y={170 + (mousePos.y - 200) * 0.2}
                                                        width="60"
                                                        height="60"
                                                        fill="var(--gold)"
                                                        className="animate-grid-pulse transition-all duration-300 ease-out"
                                                        style={{ animationDelay: '4s' }}
                                                    />
                                                    <line x1="50" y1="200" x2="350" y2="200" strokeDasharray="4 4" opacity="0.3" />
                                                    <line x1="200" y1="50" x2="200" y2="350" strokeDasharray="4 4" opacity="0.3" />
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 5. Scan Lines */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Scan: Vertical_Sweep</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <defs>
                                                    <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
                                                        <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.8" />
                                                        <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <g className="schematic-line stroke-ink">
                                                    {/* Square center rectangle */}
                                                    <rect x="130" y="130" width="140" height="140" fill="none" strokeWidth="3" />
                                                    <circle cx="200" cy="200" r="8" fill="var(--cyan)" stroke="none" />
                                                </g>
                                                {/* Scan beam constrained to square bounds */}
                                                <rect x="130" y="70" width="140" height="60" fill="url(#scan-gradient)" className="animate-scan-square" />
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 6. Dot Matrix */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Matrix: Dot_Field</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line">
                                                    {[...Array(8)].map((_, row) =>
                                                        [...Array(8)].map((_, col) => {
                                                            const delay = (row + col) * 0.3;
                                                            const isCenter = (row === 3 || row === 4) && (col === 3 || col === 4);
                                                            const distanceFromCenter = Math.abs(row - 3.5) + Math.abs(col - 3.5);

                                                            // Determine animation type based on position
                                                            let animationClass = '';
                                                            if (isCenter) {
                                                                animationClass = 'animate-dot-pulse'; // Center pulses
                                                            } else if (distanceFromCenter > 4) {
                                                                animationClass = 'animate-dot-appear'; // Outer ring appears/disappears
                                                            } else {
                                                                animationClass = 'animate-dot-fade'; // Middle ring fades
                                                            }

                                                            return (
                                                                <circle
                                                                    key={`${row}-${col}`}
                                                                    cx={80 + col * 40}
                                                                    cy={80 + row * 40}
                                                                    r={isCenter ? "6" : "3"}
                                                                    className={isCenter ? `fill-[color:var(--purple)] stroke-none ${animationClass}` : `fill-ink stroke-none ${animationClass}`}
                                                                    style={{ animationDelay: `${delay}s` }}
                                                                />
                                                            );
                                                        })
                                                    )}
                                                    <rect x="140" y="140" width="120" height="120" fill="none" strokeWidth="2" className="stroke-[color:var(--purple)]" opacity="0.3" />
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 7. Terminal Stream */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Terminal: Stream_Flow</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <defs>
                                                    <linearGradient id="terminal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="var(--green)" stopOpacity="0" />
                                                        <stop offset="50%" stopColor="var(--green)" stopOpacity="1" />
                                                        <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <g className="schematic-line">
                                                    {/* Static terminal frame */}
                                                    <rect x="60" y="60" width="280" height="280" fill="none" strokeWidth="2" className="stroke-ink" opacity="0.3" />
                                                    <line x1="60" y1="90" x2="340" y2="90" className="stroke-ink" opacity="0.3" />

                                                    {/* Cascading text elements */}
                                                    {[0, 1, 2, 3, 4].map((i) => (
                                                        <g key={i} className="animate-terminal-cascade" style={{ animationDelay: `${i * 2}s` }}>
                                                            <text x="80" y={120 + i * 30} className="fill-[color:var(--green)] font-mono text-[10px] opacity-80">
                                                                {`> FRAME_SYNC_${String(i).padStart(3, '0')}`}
                                                            </text>
                                                        </g>
                                                    ))}

                                                    {/* Cursor */}
                                                    <rect x="80" y="310" width="8" height="12" className="fill-[color:var(--green)] animate-pulse" />
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 8. E-Ink Refresh */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">E-Ink: Refresh_Cycle</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line stroke-ink">
                                                    {/* Horizontal refresh bands */}
                                                    {[...Array(12)].map((_, i) => (
                                                        <rect
                                                            key={i}
                                                            x="60"
                                                            y={60 + i * 24}
                                                            width="280"
                                                            height="20"
                                                            fill="none"
                                                            strokeWidth="1"
                                                            className="animate-eink-refresh"
                                                            style={{ animationDelay: `${i * 0.5}s` }}
                                                        />
                                                    ))}

                                                    {/* Frame border */}
                                                    <rect x="60" y="60" width="280" height="280" fill="none" strokeWidth="3" opacity="0.5" />

                                                    {/* Corner markers */}
                                                    <circle cx="80" cy="80" r="4" className="fill-ink stroke-none" />
                                                    <circle cx="320" cy="80" r="4" className="fill-ink stroke-none" />
                                                    <circle cx="80" cy="320" r="4" className="fill-ink stroke-none" />
                                                    <circle cx="320" cy="320" r="4" className="fill-ink stroke-none" />
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 9. Signal Wave */}
                                    <div
                                        className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const mouseY = ((e.clientY - rect.top) / rect.height);
                                            const waves = e.currentTarget.querySelectorAll('.wave-path');
                                            waves.forEach((wave, i) => {
                                                const amplitude = 20 + (mouseY * 30); // 20-50px amplitude based on mouse Y
                                                (wave as HTMLElement).style.setProperty('--wave-amp', `${amplitude}px`);
                                            });
                                        }}
                                    >
                                        <div className="tag-marker z-20 absolute top-8 left-8">Signal: Wave_Form</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line stroke-ink">
                                                    {/* Flowing wave lines */}
                                                    <path
                                                        d="M50 200 Q100 150, 150 200 T250 200 T350 200"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        className="wave-path animate-wave-flow"
                                                        style={{ animationDelay: '0s' }}
                                                    />
                                                    <path
                                                        d="M50 220 Q100 170, 150 220 T250 220 T350 220"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        strokeDasharray="5 5"
                                                        className="wave-path animate-wave-flow"
                                                        style={{ animationDelay: '2s' }}
                                                        opacity="0.6"
                                                    />
                                                    <path
                                                        d="M50 180 Q100 130, 150 180 T250 180 T350 180"
                                                        fill="none"
                                                        strokeWidth="2"
                                                        strokeDasharray="5 5"
                                                        className="wave-path animate-wave-flow"
                                                        style={{ animationDelay: '4s' }}
                                                        opacity="0.6"
                                                    />

                                                    {/* Center reference circle */}
                                                    <circle cx="200" cy="200" r="16" fill="none" strokeWidth="2" className="stroke-[color:var(--cyan)]" opacity="0.3" />

                                                    {/* Orbiting signal indicator */}
                                                    <g transform="translate(200, 200)">
                                                        <g className="animate-signal-orbit">
                                                            <circle cx="0" cy="0" r="8" className="fill-[color:var(--cyan)] stroke-none" />
                                                            <circle cx="0" cy="0" r="12" fill="none" strokeWidth="1" className="stroke-[color:var(--cyan)] animate-pulse" opacity="0.5" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 10. Ink Particle Flicker */}
                                    <div
                                        className="module-card p-10 overflow-hidden relative group max-w-[600px]"
                                    >
                                        <div className="tag-marker z-20 absolute top-8 left-8">Ink: Particle_Flux</div>
                                        <div className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center">
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line">
                                                    {/* Overlapping circles simulating ink particles */}
                                                    {[...Array(6)].flatMap((_, ring) =>
                                                        [...Array(8)].map((_, i) => {
                                                            const angle = (i * 45) * (Math.PI / 180);
                                                            const radius = 60 + ring * 20;
                                                            const x = 200 + Math.cos(angle) * radius;
                                                            const y = 200 + Math.sin(angle) * radius;
                                                            const delay = (ring * 0.5 + i * 0.3);

                                                            return (
                                                                <circle
                                                                    key={`${ring}-${i}`}
                                                                    cx={x}
                                                                    cy={y}
                                                                    r="8"
                                                                    fill="var(--ink)"
                                                                    fillOpacity="0.3"
                                                                    stroke="none"
                                                                    className="particle-flux animate-ink-flicker"
                                                                    style={{ animationDelay: `${delay}s`, animationDuration: '14s' }}
                                                                />
                                                            );
                                                        })
                                                    )}

                                                    {/* Center reference */}
                                                    <circle cx="200" cy="200" r="20" fill="none" strokeWidth="2" stroke="var(--ink)" opacity="0.3" />
                                                    <circle cx="200" cy="200" r="6" fill="var(--ink)" stroke="none" />
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0" />
                                        </div>
                                    </div>

                                    {/* 12. Grain Flow - Mouse Reactive Gradient */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Surface: Grain_Flow</div>
                                        <div
                                            className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                                const svg = e.currentTarget.querySelector('svg');
                                                if (svg) {
                                                    const grad = svg.querySelector('#grain-gradient');
                                                    if (grad) {
                                                        grad.setAttribute('cx', `${x}%`);
                                                        grad.setAttribute('cy', `${y}%`);
                                                    }
                                                }
                                            }}
                                        >
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <defs>
                                                    <radialGradient id="grain-gradient" cx="50%" cy="50%" r="70%">
                                                        <stop offset="0%" stopColor="var(--paper)" />
                                                        <stop offset="100%" stopColor="var(--void)" />
                                                    </radialGradient>
                                                </defs>
                                                <rect x="60" y="60" width="280" height="280" fill="url(#grain-gradient)" className="transition-all duration-500 ease-out" />
                                            </svg>
                                            <div className="grain absolute inset-0 pointer-events-none opacity-40" />
                                        </div>
                                    </div>

                                    {/* 13. Noise Field - Repulsion Effect */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Surface: Noise_Field</div>
                                        <div
                                            className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const mouseX = ((e.clientX - rect.left) / rect.width) * 400;
                                                const mouseY = ((e.clientY - rect.top) / rect.height) * 400;
                                                const circles = e.currentTarget.querySelectorAll('.nebula-dot');
                                                const colors = ['var(--cyan)', 'var(--orange)', 'var(--purple)', 'var(--green)', 'var(--gold)'];

                                                circles.forEach((circle) => {
                                                    const cx = parseFloat(circle.getAttribute('data-cx') || '0');
                                                    const cy = parseFloat(circle.getAttribute('data-cy') || '0');

                                                    // Calculate distance and angle from cursor
                                                    const dx = cx - mouseX;
                                                    const dy = cy - mouseY;
                                                    const distance = Math.sqrt(dx * dx + dy * dy);

                                                    // Repulsion radius and strength
                                                    const repulsionRadius = 120;

                                                    if (distance < repulsionRadius && distance > 0) {
                                                        // Calculate displacement (stronger when closer)
                                                        const force = (repulsionRadius - distance) / repulsionRadius;
                                                        const displacement = force * 30; // Max 30px displacement

                                                        // Normalize direction vector
                                                        const pushX = (dx / distance) * displacement;
                                                        const pushY = (dy / distance) * displacement;

                                                        circle.setAttribute('transform', `translate(${pushX}, ${pushY})`);

                                                        // 30% chance to show color when near cursor
                                                        if (Math.random() < 0.3 && !circle.getAttribute('data-colored')) {
                                                            const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                                            circle.setAttribute('fill', randomColor);
                                                            circle.setAttribute('fill-opacity', '0.7');
                                                            circle.setAttribute('data-colored', 'true');
                                                        }
                                                    } else {
                                                        // Return to original position and color
                                                        circle.setAttribute('transform', 'translate(0, 0)');
                                                        if (circle.getAttribute('data-colored')) {
                                                            circle.setAttribute('fill', 'var(--ink)');
                                                            circle.setAttribute('fill-opacity', '0.4');
                                                            circle.removeAttribute('data-colored');
                                                        }
                                                    }
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                // Reset all dots when mouse leaves
                                                const circles = e.currentTarget.querySelectorAll('.nebula-dot');
                                                circles.forEach((circle) => {
                                                    circle.setAttribute('transform', 'translate(0, 0)');
                                                    if (circle.getAttribute('data-colored')) {
                                                        circle.setAttribute('fill', 'var(--ink)');
                                                        circle.setAttribute('fill-opacity', '0.4');
                                                        circle.removeAttribute('data-colored');
                                                    }
                                                });
                                            }}
                                        >
                                            <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                                                <g className="schematic-line">
                                                    {[...Array(15)].flatMap((_, row) =>
                                                        [...Array(15)].map((_, col) => {
                                                            const cx = 40 + col * 24;
                                                            const cy = 40 + row * 24;
                                                            return (
                                                                <circle
                                                                    key={`${row}-${col}`}
                                                                    cx={cx}
                                                                    cy={cy}
                                                                    data-cx={cx}
                                                                    data-cy={cy}
                                                                    r="3"
                                                                    fill="var(--ink)"
                                                                    fillOpacity="0.4"
                                                                    stroke="none"
                                                                    className="nebula-dot transition-all duration-200 ease-out"
                                                                />
                                                            );
                                                        })
                                                    )}
                                                </g>
                                            </svg>
                                            <div className="halftone-dark absolute inset-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* 14. Dotted Grid - Background Animation */}
                                    <div className="module-card p-10 overflow-hidden relative group max-w-[600px]">
                                        <div className="tag-marker z-20 absolute top-8 left-8">Surface: Dotted_Grid</div>
                                        <div
                                            className="aspect-square bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center"
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = ((e.clientX - rect.left) / rect.width) * 400;
                                                const y = ((e.clientY - rect.top) / rect.height) * 400;
                                                const circles = e.currentTarget.querySelectorAll('.dot-bg');
                                                circles.forEach((circle) => {
                                                    const cx = parseFloat(circle.getAttribute('cx') || '0');
                                                    const cy = parseFloat(circle.getAttribute('cy') || '0');
                                                    const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
                                                    const scale = Math.max(0.5, Math.min(2, 1 + (1 - distance / 150)));
                                                    const opacity = Math.max(0.1, Math.min(0.8, 1 - distance / 200));
                                                    circle.setAttribute('r', (2 * scale).toString());
                                                    circle.setAttribute('opacity', opacity.toString());
                                                });
                                            }}
                                        >
                                            <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
                                                <g>
                                                    {[...Array(20)].flatMap((_, row) =>
                                                        [...Array(20)].map((_, col) => {
                                                            const cx = col * 20 + 10;
                                                            const cy = row * 20 + 10;
                                                            return (
                                                                <circle
                                                                    key={`${row}-${col}`}
                                                                    cx={cx}
                                                                    cy={cy}
                                                                    data-cx={cx}
                                                                    data-cy={cy}
                                                                    r="2"
                                                                    fill="var(--ink)"
                                                                    stroke="none"
                                                                    className="dot-bg transition-all duration-150"
                                                                    opacity="0.2"
                                                                />
                                                            );
                                                        })
                                                    )}
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        )}

                        {/* 09_Modals */}
                        {activeCategory === 'modals' && (
                            <section className="mb-40">
                                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">09_Modals</h2>
                                <div className="flex flex-wrap gap-4">
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setIsModalOpen(true)}>1. Generic_Modal</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setShowOnboarding(true)}>2. Onboarding_System</button>
                                    <button className="btn btn-primary px-8 py-4" onClick={() => setShowSettings(true)}>3. System_Settings</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setShowCritical(true)}>4. Critical_Action</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setActiveEditorImage(mockImage)}>5. Simulator_View</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setShowUrlImport(true)}>6. Import_Source</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setShowBetaSignup(true)}>7. Beta_Access</button>
                                    <button className="btn btn-secondary px-8 py-4" onClick={() => setActiveEditorImage(mockNewImage)}>8. Workbench_Tool</button>
                                </div>

                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System_Alert_Module">
                                    <div className="p-12 text-center">
                                        <h2 className="text-4xl brand-font mb-4 text-ink">Attention Required</h2>
                                        <p className="mono-font text-xs mb-8 max-w-sm mx-auto font-black opacity-60 tracking-tight uppercase">Processing interrupted by external signal interference.</p>
                                        <button className="btn btn-primary btn-lg w-full" onClick={() => setIsModalOpen(false)}>Acknowledge Signal</button>
                                    </div>
                                </Modal>

                                <Modal isOpen={showCritical} onClose={() => setShowCritical(false)} variant="critical" maxWidth="max-w-2xl" title="DELETE_PROTOCOL">
                                    <div className="flex flex-col gap-10 text-center pt-4 text-void">
                                        <h3 className="brand-font text-6xl uppercase leading-none">DELETE_PIECE?</h3>

                                        <div className="mb-2">
                                            <p className="mono-font text-xs font-black uppercase tracking-[0.2em] opacity-80">
                                                DELETE_PROTOCOL // <span className="bg-void text-white px-2 py-0.5 whitespace-nowrap">TADANORI_2.PNG</span>
                                            </p>
                                        </div>


                                        <div className="flex gap-4">
                                            <button className="btn-system-primary flex-1 bg-void text-white h-16 border-2 border-void uppercase font-black hover:bg-void/90 transition-all font-black text-sm tracking-[0.2em]" onClick={() => setShowCritical(false)}>
                                                EXECUTE_DELETE
                                            </button>
                                            <button className="btn btn-tertiary flex-1 border-2 border-void text-void h-16 uppercase font-black text-[10px] tracking-widest hover:bg-void hover:text-white transition-all bg-transparent" onClick={() => setShowCritical(false)}>
                                                CANCEL_ACTION
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                            </section>
                        )}

                        {/* 14_Onboarding_System */}
                        {activeCategory === 'banners' && (
                            <section className="mb-40">
                                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">14_Onboarding_System</h2>
                                <div className="max-w-xl">
                                    {/* Info & Alerts */}
                                    <div className="space-y-12">
                                        <h3 className="brand-font text-2xl mb-8">Alert_Banners</h3>
                                        <div className="space-y-4">
                                            <AlertBanner
                                                icon={<AlertCircle className="text-[var(--orange)] w-5 h-5 animate-pulse" />}
                                                message="Warning: Frame_Heartbeat_Lost // Images_Local_Only"
                                                actionLabel="Connect_Hardware"
                                                onAction={() => setShowOnboarding(true)}
                                            />
                                        </div>

                                        <h3 className="brand-font text-2xl mb-8 mt-16">Info_Boxes</h3>
                                        <div className="space-y-6">
                                            <InfoBox variant="blue" icon={<Zap className="w-4 h-4" />}>
                                                <p>Required: <span className="highlight-marker">Pi Zero</span> / 2 / 3 / 4</p>
                                                <p>Required: <span className="highlight-marker">Inky Impression frame</span></p>
                                            </InfoBox>
                                            <InfoBox variant="orange" icon={<AlertCircle className="w-4 h-4" />}>
                                                <p>Parallel Mode: Frame.ink can run alongside existing projects.</p>
                                            </InfoBox>
                                        </div>

                                        <h3 className="brand-font text-2xl mb-8 mt-16">Onboarding_Wizard</h3>
                                        <div>
                                            <button
                                                className="btn btn-primary-special px-8 py-4 uppercase font-black tracking-widest"
                                                onClick={() => setShowOnboarding(true)}
                                            >
                                                Launch_Setup_Flow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 15_App_States */}
                        {activeCategory === 'states' && (
                            <section className="mb-40">
                                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink">15_App_States</h2>

                                <div className="space-y-24">
                                    {/* Day 0 Experience / Onboarding */}
                                    <div>
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink/10">
                                            <div>
                                                <h3 className="brand-font text-3xl">Day_0 // Initial_Onboarding</h3>
                                                <p className="mono-font text-[10px] opacity-40 uppercase tracking-widest mt-1">State shown to new users with no images and no connected hardware.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => window.location.href = '/app?test_state=empty'}
                                                >
                                                    Live_Test
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-12">
                                            <div>
                                                <p className="mono-font text-[10px] opacity-30 uppercase tracking-[0.2em] mb-6">01_Awaiting_Input_State</p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                                    <OnboardingEmptyState
                                                        onUpload={() => { }}
                                                        onConnect={() => { }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Access Denied */}
                                    <div>
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink/10">
                                            <div>
                                                <h3 className="brand-font text-3xl">Access_Denied // Restricted</h3>
                                                <p className="mono-font text-[10px] opacity-40 uppercase tracking-widest mt-1">State shown when a user is not whitelisted for Beta.</p>
                                            </div>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => window.location.href = '/app?test_state=denied'}
                                            >
                                                Live_Test
                                            </button>
                                        </div>
                                        <div className="border border-ink/10 rounded-lg overflow-hidden scale-90 origin-top">
                                            <AccessDenied
                                                email="UNAUTHORIZED_USER@GMAIL.COM"
                                                onSignOut={() => notify('ACTION: SIGN_OUT_TRIGGERED', 'info')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 10_Form_Elements & 12_Form_System */}
                        {activeCategory === 'forms' && (
                            <>
                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">10_Form_Elements</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        {/* Dropdowns */}
                                        <div className="space-y-8">
                                            <h3 className="brand-font text-2xl">Dropdowns</h3>
                                            <Dropdown
                                                label="Update Frequency"
                                                value={60}
                                                onChange={() => { }}
                                                options={[
                                                    { value: 60, label: 'Every Hour' },
                                                    { value: 30, label: 'Every 30 Minutes' },
                                                    { value: 0, label: 'Manual Only' }
                                                ]}
                                            />
                                            <Dropdown
                                                label="Connection Type"
                                                value="wifi"
                                                onChange={() => { }}
                                                options={[
                                                    { value: 'wifi', label: 'Wireless (WiFi)' },
                                                    { value: 'eth', label: 'Ethernet (LAN)' }
                                                ]}
                                            />
                                        </div>

                                        {/* Segmented Controls */}
                                        <div className="space-y-8">
                                            <h3 className="brand-font text-2xl">Segmented Controls</h3>
                                            <SegmentedControl
                                                label="Orientation"
                                                value={demoOrientation}
                                                onChange={setDemoOrientation}
                                                options={[
                                                    { value: 0, label: 'Landscape' },
                                                    { value: 90, label: 'Portrait' }
                                                ]}
                                            />
                                            <SegmentedControl
                                                label="Power Mode"
                                                value={powerMode}
                                                onChange={setPowerMode}
                                                options={[
                                                    { value: 'active', label: 'Active' },
                                                    { value: 'eco', label: 'Eco Save' },
                                                    { value: 'sleep', label: 'Deep Sleep' }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-32">
                                    <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink">12_Form_System</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                        <div className="space-y-8">
                                            <input type="text" className="input-ritual" placeholder="ENTER_PAIRED_UID..." />
                                            <div className="relative">
                                                <select className="input-ritual appearance-none cursor-pointer">
                                                    <option>REFRESH_60M</option>
                                                    <option>REFRESH_30M</option>
                                                </select>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                                            </div>
                                        </div>
                                        <div className="space-y-8 opacity-50">
                                            <input type="text" className="input-ritual" placeholder="DISABLED_INPUT" disabled />
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* 11_Feedback & 13_Status_Indicator */}
                        {activeCategory === 'indicators' && (
                            <>
                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">11_Feedback</h2>
                                    <div className="space-y-12">
                                        <div className="p-8 border-2 border-dashed border-ink/20 rounded bg-paper/50">
                                            <p className="font-mono text-xs text-center opacity-50 mb-6">TOAST NOTIFICATION TRIGGER AREA</p>
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                <button
                                                    onClick={() => notify('System Updated', 'success')}
                                                    className="btn btn-secondary px-6 py-3 text-xs gap-2"
                                                >
                                                    <CheckCircle size={16} className="text-green-600" />
                                                    Trigger Success
                                                </button>
                                                <button
                                                    onClick={() => notify('Connection Lost', 'error')}
                                                    className="btn btn-secondary px-6 py-3 text-xs gap-2"
                                                >
                                                    <AlertCircle size={16} className="text-red-500" />
                                                    Trigger Error
                                                </button>
                                                <button
                                                    onClick={() => notify('Processing...', 'loading')}
                                                    className="btn btn-secondary px-6 py-3 text-xs gap-2"
                                                >
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Trigger Loading
                                                </button>
                                                <button
                                                    onClick={() => notify('System Neutral', 'info')}
                                                    className="btn btn-secondary px-6 py-3 text-xs gap-2"
                                                >
                                                    <Zap size={16} />
                                                    Trigger Info
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">13_Status_Indicator</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        {/* Online State */}
                                        <div className="flex flex-col gap-8 items-center border border-dashed border-ink/20 p-12 rounded">
                                            <h3 className="brand-font text-2xl">Online State</h3>
                                            <div className="relative group cursor-help z-50">
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e] mb-2" />
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full left-0 mt-5">
                                                    <StatusTooltip online={true} totalImages={24} refreshesWeekly={42} />
                                                </div>
                                            </div>
                                            <p className="font-mono text-xs opacity-50 text-center mt-32">Hover for details</p>
                                        </div>

                                        {/* Offline State */}
                                        <div className="flex flex-col gap-8 items-center border border-dashed border-ink/20 p-12 rounded">
                                            <h3 className="brand-font text-2xl">Offline State</h3>
                                            <div className="relative group cursor-help z-50">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] mb-2" />
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full left-0 mt-5">
                                                    <StatusTooltip online={false} totalImages={12} refreshesWeekly={0} lastSync="2 days ago" />
                                                </div>
                                            </div>
                                            <p className="font-mono text-xs opacity-50 text-center mt-32">Hover for details</p>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-40">
                                    <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">14_Content_Tooltips</h2>
                                    <div className="flex flex-wrap gap-12 items-center">

                                        {/* Top Tooltip */}
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Top Position</p>
                                            <Tooltip content="SYSTEM_READY // ALL_SYSTEMS_GO" position="top">
                                                <button className="btn btn-secondary btn-sm gap-2">
                                                    <Info size={14} />
                                                    HOVER_ME
                                                </button>
                                            </Tooltip>
                                        </div>

                                        {/* Bottom Tooltip */}
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Bottom Position</p>
                                            <Tooltip content="DATA_STREAM_ACTIVE" position="bottom">
                                                <button className="btn btn-secondary btn-sm gap-2">
                                                    <Info size={14} />
                                                    HOVER_ME
                                                </button>
                                            </Tooltip>
                                        </div>

                                        {/* Right Tooltip */}
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Right Position</p>
                                            <Tooltip content="SIDE_MODULE_LOADED" position="right">
                                                <button className="btn btn-secondary btn-sm gap-2">
                                                    <Info size={14} />
                                                    HOVER_ME
                                                </button>
                                            </Tooltip>
                                        </div>

                                        {/* Text Trigger */}
                                        <div className="flex flex-col gap-4 items-center">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-black">Text Trigger</p>
                                            <Tooltip content="ADDITIONAL_CONTEXT_PROVIDED" position="top">
                                                <span className="font-mono text-[10px] uppercase font-bold underline decoration-dotted cursor-help">
                                                    Explain_This_Term
                                                </span>
                                            </Tooltip>
                                        </div>

                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                </main>
            </div >

            {/* LIVE MODALS */}
            {
                showSettings && (
                    <SettingsModal
                        isOpen={showSettings}
                        onClose={() => setShowSettings(false)}
                        config={{ interval, rotation: orientation, current_image: '' }}
                        setConfig={() => { }}
                        notify={notify}
                        onSignOut={() => notify("SIGN OUT (DEMO)", "info")}
                        user={{ email: "STYLEGUIDE_PREVIEW" }}
                        isDemo={true}
                    />
                )
            }

            {
                activeEditorImage && (
                    <EditorModal
                        activeImg={activeEditorImage}
                        setActiveImg={setActiveEditorImage}
                        config={{ rotation: orientation }}
                        backend={getBackend()}
                        user={{ uid: 'test' }}
                        notify={notify}
                        sendToFrame={(img) => {
                            notify('PIECE_SAVED // MOCK_DISPLAY_TRIGGERED', 'success');
                            setActiveEditorImage(null);
                        }}
                        isDemo={true}
                    />
                )
            }

            {
                showOnboarding && (
                    <OnboardingModal
                        isOpen={showOnboarding}
                        onClose={() => setShowOnboarding(false)}
                        onComplete={(data: any) => {
                            notify('ONBOARDING_COMPLETE // MOCK_DATA_RECEIVED', 'success');
                            setShowOnboarding(false);
                            console.log('Onboarding Complete:', data);
                        }}
                        isDemo={true}
                    />
                )
            }

            {
                showUrlImport && (
                    <UrlImportModal
                        isOpen={showUrlImport}
                        onClose={() => setShowUrlImport(false)}
                        onImport={async (url) => {
                            return new Promise<void>((resolve) => {
                                setTimeout(() => {
                                    notify(`SOURCE_IMPORTED: ${url}`, 'success');
                                    resolve();
                                }, 1500);
                            });
                        }}
                    />
                )
            }

            {
                showBetaSignup && (
                    <BetaSignupModal
                        isOpen={showBetaSignup}
                        onClose={() => setShowBetaSignup(false)}
                    />
                )
            }

            {/* Toast Overlay */}
            {
                notification && (
                    <div className="fixed bottom-12 left-0 right-0 mx-auto w-fit z-[300] animate-toast-up text-ink mono-font">
                        <div className="bg-[#1D1D1B] text-[#EBE6D7] px-12 py-5 border-[2.5px] border-[#EBE6D7] shadow-[6px_6px_0px_0px_rgba(29,29,27,0.5)] flex items-center gap-5 min-w-[340px] justify-center">
                            {notification.type === 'loading' ? (
                                <Loader2 size={22} className="animate-spin" />
                            ) : notification.type === 'success' ? (
                                <CheckCircle size={22} className="text-green-400" />
                            ) : notification.type === 'error' ? (
                                <AlertCircle size={22} className="text-red-400" />
                            ) : (
                                <Zap size={22} />
                            )}
                            <span className="font-black uppercase tracking-[0.25em] text-[12px] leading-none">{notification.msg}</span>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
