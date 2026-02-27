import React from 'react';
import { Card } from '../../../components/ui/Card';
import { IconButton } from '../../../components/ui/IconButton';
import { OnboardingEmptyState } from '../../DashboardPage/components/OnboardingEmptyState';

interface StyleGuideCardsProps {
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
}

export const StyleGuideCards = ({ notify }: StyleGuideCardsProps) => {
    return (
        <>
            {/* 06_Card_Variants */}
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
    );
};
