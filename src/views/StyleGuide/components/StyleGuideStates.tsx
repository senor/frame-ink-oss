import React from 'react';
import { AlertBanner } from '../../../components/ui/AlertBanner';
import { InfoBox } from '../../../components/ui/InfoBox';
import { OnboardingEmptyState } from '../../DashboardPage/components/OnboardingEmptyState';
import { AccessDenied } from '../../DashboardPage/components/AccessDenied';
import { Zap, AlertCircle } from 'lucide-react';

interface StyleGuideBannersProps {
    setShowOnboarding: (show: boolean) => void;
}

export const StyleGuideBanners = ({ setShowOnboarding }: StyleGuideBannersProps) => {
    return (
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
    );
};

interface StyleGuideAppStatesProps {
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
}

export const StyleGuideAppStates = ({ notify }: StyleGuideAppStatesProps) => {
    return (
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
    );
};
