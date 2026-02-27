import React, { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { SettingsModal } from './DashboardPage/components/SettingsModal';
import { EditorModal } from './DashboardPage/components/EditorModal';
import { OnboardingModal } from './DashboardPage/components/OnboardingModal';
import { UrlImportModal } from './DashboardPage/components/UrlImportModal';
import { BetaSignupModal } from './LandingPage/components/BetaSignupModal';
import { getBackend } from '../services/factory';
import { useNavigate } from 'react-router-dom';
import { Zap, Crop, Settings, CheckCircle, AlertCircle, Loader2, Layers, Cpu, Monitor, Layout, Menu, X, ArrowRight } from 'lucide-react';

// New Components
import { StyleGuideTokens } from './StyleGuide/components/StyleGuideTokens';
import { StyleGuideButtons } from './StyleGuide/components/StyleGuideButtons';
import { StyleGuideCards } from './StyleGuide/components/StyleGuideCards';
import { StyleGuideIllustrations } from './StyleGuide/components/StyleGuideIllustrations';
import { StyleGuideModals } from './StyleGuide/components/StyleGuideModals';
import { StyleGuideForms } from './StyleGuide/components/StyleGuideForms';
import { StyleGuideBanners, StyleGuideAppStates } from './StyleGuide/components/StyleGuideStates';
import { StyleGuideIndicators } from './StyleGuide/components/StyleGuideIndicators';

export default function StyleGuide() {
    // Global Modals State
    const [showSettings, setShowSettings] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showUrlImport, setShowUrlImport] = useState(false);
    const [showBetaSignup, setShowBetaSignup] = useState(false);
    const [activeEditorImage, setActiveEditorImage] = useState<any | null>(null);

    // Settings State
    const [interval, setInterval] = useState(60);
    const [orientation, setOrientation] = useState(0);

    // Navigation State
    const [activeCategory, setActiveCategory] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('styleGuideCategory');
        return saved || 'tokens';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-0 m-0 bg-paper text-ink overflow-x-hidden">
            <div className="grainy-overlay" />
            <div className="grainy-bg" />
            <div className="atmosphere-bg" />

            <div className="flex min-h-screen relative z-10">
                {/* Mobile Menu Button */}
                {/* Mobile Menu Button - STRICTLY MOBILE ONLY */}
                <button
                    className="fixed bottom-6 right-6 z-50 btn btn-primary p-4 rounded-full shadow-lg lg:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Sidebar Navigation */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-paper/95 backdrop-blur-md border-r border-ink/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:bg-transparent
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="h-full flex flex-col p-6 overflow-y-auto">
                        <div className="mb-12">
                            <h1 className="brand-font text-xl mb-2">Style_Guide</h1>
                            <p className="mono-font text-[10px] opacity-40 uppercase tracking-widest">v2.0.4 // Design_System</p>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setIsSidebarOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 group ${isActive
                                            ? 'bg-ink text-paper font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] translate-x-1'
                                            : 'hover:bg-ink/5 hover:translate-x-1'
                                            }`}
                                    >
                                        <Icon size={14} className={isActive ? 'text-paper' : 'text-ink opacity-50 group-hover:opacity-100'} />
                                        <span className={isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}>{category.label}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-paper animate-pulse" />}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-12 pt-6 border-t border-ink/10 space-y-4">
                            <button
                                onClick={() => navigate('/app')}
                                className="w-full btn btn-secondary flex items-center justify-center gap-2 text-xs py-3 opacity-60 hover:opacity-100 group"
                            >
                                <span>Go_To_App</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="mono-font text-[9px] text-center opacity-30 mt-4">Frame.ink Design System</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                {/* Main Content Area */}
                <main className="flex-1 min-w-0 transition-all duration-300 relative">
                    {/* Top Right Controls */}
                    <div className="absolute top-6 right-6 z-30 hidden lg:block">
                        <ThemeToggle />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 lg:py-20">

                        {/* Content Rendering based on Category */}
                        {activeCategory === 'tokens' && <StyleGuideTokens />}
                        {activeCategory === 'buttons' && <StyleGuideButtons />}
                        {activeCategory === 'cards' && <StyleGuideCards notify={notify} />}
                        {activeCategory === 'illustrations' && <StyleGuideIllustrations />}
                        {activeCategory === 'modals' && (
                            <StyleGuideModals
                                setShowOnboarding={setShowOnboarding}
                                setShowSettings={setShowSettings}
                                setActiveEditorImage={setActiveEditorImage}
                                setShowUrlImport={setShowUrlImport}
                                setShowBetaSignup={setShowBetaSignup}
                            />
                        )}
                        {activeCategory === 'forms' && <StyleGuideForms />}
                        {activeCategory === 'banners' && <StyleGuideBanners setShowOnboarding={setShowOnboarding} />}
                        {activeCategory === 'states' && <StyleGuideAppStates notify={notify} />}
                        {activeCategory === 'indicators' && <StyleGuideIndicators notify={notify} />}

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
                            notify('IMAGE_SAVED // MOCK_DISPLAY_TRIGGERED', 'success');
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
