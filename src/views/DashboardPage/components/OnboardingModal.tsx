import React, { useState } from 'react';
import { Globe, Cpu, Monitor, Image as ImageIcon, ArrowRight, Zap, AlertCircle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Card } from '../../../components/ui/Card';
import { InfoBox } from '../../../components/ui/InfoBox';
import { StatusPill } from '../../../components/ui/StatusPill';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { NumberedListItem } from '../../../components/ui/NumberedListItem';
import { BackButton } from '../../../components/ui/BackButton';

type OnboardingStep = 'discovery' | 'selection' | 'self' | 'managed' | 'migration';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (handshakeData: any) => void;
    isDemo?: boolean;
}

export function OnboardingModal({ isOpen, onClose, onComplete, isDemo = false }: OnboardingModalProps) {
    const isLocal = import.meta.env.VITE_APP_MODE === 'self_hosted';
    const [step, setStep] = useState<OnboardingStep>(isLocal ? 'selection' : 'discovery');
    const [pairingCode, setPairingCode] = useState('');
    const [isLinking, setIsLinking] = useState(false);

    const resetFlow = () => {
        setStep('discovery');
        setPairingCode('');
        setIsLinking(false);
    };

    const handleLink = () => {
        setIsLinking(true);
        // Simulate link
        setTimeout(() => {
            onComplete({ status: 'live', type: step });
        }, 12000);
    };

    const renderDiscovery = () => (
        <div className="space-y-12 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                <div className="aspect-square max-h-[400px] bg-[color:var(--bg-canvas)] relative overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                        <g className="animate-draw schematic-line">
                            <circle cx="200" cy="200" r="20" fill="var(--ink-primary)" stroke="none" />
                            <circle cx="200" cy="200" r="75" strokeDasharray="2 4" strokeWidth="1.5" />
                            <circle cx="200" cy="200" r="130" strokeWidth="2" />
                            <circle cx="200" cy="200" r="180" strokeDasharray="10 10" strokeWidth="1.5" />
                        </g>
                        <path d="M200 200 L260 140" stroke="var(--orange)" strokeWidth="3" className="rotate-dial" />
                    </svg>
                    <div className="halftone-dark absolute inset-0"></div>
                </div>
                <div className="flex flex-col h-full">
                    <div>
                        <p className="mono-font text-sm leading-relaxed text-ink dark:text-white">
                            {isLocal ? (
                                <>
                                    Hardware detected. You are running <span className="font-bold text-ink dark:text-white uppercase underline decoration-[var(--blue)] underline-offset-4">Frame.<span className="serif-italic text-[color:var(--blue)] lowercase tracking-tight font-bold">lab</span></span> directly on your device.
                                </>
                            ) : (
                                <>
                                    This is beta, that is why <span className="font-bold text-ink dark:text-white uppercase underline decoration-[var(--pink)] underline-offset-4">Frame.<span className="serif-italic text-[color:var(--pink)] lowercase tracking-tight font-bold">lab</span></span> is built exclusively for the <span className="font-bold text-ink dark:text-white underline decoration-[var(--blue)] underline-offset-4">Inky Impression (7.3&quot;)</span>.
                                </>
                            )}
                        </p>
                    </div>

                    <div className="flex-grow flex items-center justify-center w-full">
                        <div className="w-full">
                            <InfoBox variant="blue" icon={<Cpu className="w-4 h-4" />}>
                                <div className="space-y-3 text-ink dark:text-white">
                                    <p>
                                        Status: <span className="highlight-marker">{isLocal ? "Local_Access_Active" : "Ready_for_Setup"}</span>
                                    </p>
                                    {!isLocal && (
                                        <>
                                            <p>
                                                Required: <a href="https://shop.pimoroni.com/products/raspberry-pi-zero-2-w" target="_blank" rel="noopener noreferrer" className="highlight-marker underline decoration-[var(--blue)] underline-offset-2 hover:opacity-80 transition-opacity">Pi Zero</a> / 2 / 3 / 4
                                            </p>
                                            <p>
                                                Required: <a href="https://shop.pimoroni.com/products/inky-impression" target="_blank" rel="noopener noreferrer" className="highlight-marker underline decoration-[var(--blue)] underline-offset-2 hover:opacity-80 transition-opacity">Inky Impression frame</a>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </InfoBox>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button onClick={() => setStep('selection')} className="btn btn-primary-special w-full h-16 flex items-center justify-center gap-3">
                            <span className="mono-font text-sm font-black">{isLocal ? "Continue to Dashboard" : "I have the frame ready to go"}</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSelection = () => (
        <div className="space-y-12 animate-scale-in">
            <div className={`grid grid-cols-1 ${isLocal ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'} gap-8`}>
                {isLocal ? (
                    <>
                        {/* 01: Local Standalone */}
                        <Card variant="flat" className="p-8 flex flex-col group border-2 border-ink dark:border-white" interactive onClick={() => onComplete({ status: 'live', type: 'local' })}>
                            <div className="mb-6 flex justify-between items-start">
                                <span className="mono-font text-[10px] opacity-40">01</span>
                                <Cpu className="w-6 h-6 text-ink dark:text-white" />
                            </div>
                            <h3 className="brand-font text-2xl mb-4 leading-none">Local_Standalone</h3>
                            <p className="mono-font text-[10px] leading-relaxed opacity-60 flex-grow mb-8 font-black">Continue using FrameLab entirely from your local network. No cloud required.</p>
                            <button className="btn btn-primary btn-md w-full uppercase">START_UPLOADING</button>
                        </Card>

                        {/* 02: Link to Cloud */}
                        <Card variant="recommended" className="p-8 flex flex-col group" interactive onClick={() => setStep('managed')}>
                            <div className="mb-6 flex justify-between items-start">
                                <div className="tag-marker tag-marker-recommended">ENHANCED</div>
                                <Globe className="w-6 h-6 text-[var(--blue)]" />
                            </div>
                            <h3 className="brand-font text-2xl mb-4 leading-none text-ink dark:text-white lowercase italic">Link to <span className="brand-font not-italic">FrameLab Cloud</span></h3>
                            <p className="mono-font text-[10px] leading-relaxed opacity-60 flex-grow mb-8 text-[var(--blue)]/80 font-black">Sync with your FrameLab account to update art from anywhere in the world.</p>
                            <button className="btn btn-secondary btn-md w-full uppercase">CONNECT_ACCOUNT</button>
                        </Card>
                    </>
                ) : (
                    <>
                        {/* 01: Starting Fresh */}
                        <Card variant="flat" className="p-8 flex flex-col group border-2 border-ink dark:border-white" interactive onClick={() => setStep('self')}>
                            <div className="mb-6 flex justify-between items-start">
                                <span className="mono-font text-[10px] opacity-40">01</span>
                            </div>
                            <h3 className="brand-font text-2xl mb-4 leading-none">Starting Fresh</h3>
                            <p className="mono-font text-[10px] leading-relaxed opacity-60 flex-grow mb-8 font-black">Flash a fresh Pi OS Lite and run the self-hosted installation script.</p>
                            <button className="btn btn-secondary btn-md w-full uppercase">Select_Path</button>
                        </Card>

                        {/* 02: Managed (Wireless) */}
                        <Card variant="recommended" className="p-8 flex flex-col group" interactive onClick={() => setStep('managed')}>
                            <div className="mb-6 flex justify-between items-start">
                                <div className="tag-marker tag-marker-recommended">RECOMMENDED</div>
                                <Globe className="w-6 h-6 text-[var(--blue)]" />
                            </div>
                            <h3 className="brand-font text-2xl mb-4 leading-none lowercase italic text-ink dark:text-white">Connect FrameLab <span className="brand-font not-italic">to your frame</span></h3>
                            <p className="mono-font text-[10px] leading-relaxed opacity-60 flex-grow mb-8 text-[var(--blue)]/80 font-black">Link wirelessly. No terminal required. Update art and display images from anywhere.</p>
                            <button className="btn btn-primary btn-md w-full uppercase">INITIALIZE</button>
                        </Card>

                        {/* 03: Migration */}
                        <Card variant="warning" className="p-8 flex flex-col group" interactive onClick={() => setStep('migration')}>
                            <div className="mb-6 flex justify-between items-start">
                                <span className="mono-font text-[10px] opacity-40">03</span>
                            </div>
                            <h3 className="brand-font text-2xl mb-4 leading-none">Frame already setup</h3>
                            <p className="mono-font text-[10px] leading-relaxed opacity-60 flex-grow mb-8 px-1">
                                Already running InkyPi? FrameLab can co-exist alongside your existing system.
                            </p>
                            <button className="btn btn-secondary btn-md w-full uppercase">Add_Frame.ink</button>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );

    const renderDetail = () => {
        if (isLinking) {
            return (
                <div className="h-[500px] flex flex-col items-center justify-center p-12 animate-scale-in">
                    <div className="aspect-square w-72 bg-[color:var(--bg-canvas)] border border-void/10 relative overflow-hidden flex items-center justify-center rounded-full mb-12 shadow-[0_0_40px_rgba(0,0,0,0.05)]">
                        <svg viewBox="0 0 400 400" className="w-full h-full p-8 relative z-10">
                            <g className="animate-draw schematic-line stroke-ink">
                                <circle cx="200" cy="200" r="180" opacity="0.2" fill="none" strokeWidth="2.5" />
                                <circle cx="200" cy="200" r="120" fill="none" strokeWidth="2" />
                                <circle cx="200" cy="200" r="70" strokeDasharray="8 8" opacity="0.4" fill="none" strokeWidth="1.5" />
                                <rect x="157" y="157" width="86" height="86" transform="rotate(45 200 200)" fill="none" />
                                <circle cx="200" cy="20" r="6" className="fill-[color:var(--blue)] stroke-none" />
                                <path d="M200 65 L200 26" className="stroke-[color:var(--blue)] stroke-[2] opacity-80" />
                            </g>
                            <text x="215" y="25" className="fill-[color:var(--blue)] font-mono text-[11px] font-black opacity-80">[ SYS_UP ]</text>
                        </svg>
                        <div className="halftone-dark absolute inset-0" />
                    </div>
                    <h3 className="brand-font text-3xl uppercase animate-pulse text-center mb-2">Establishing_Link...</h3>
                    <p className="mono-font text-xs opacity-60 text-center tracking-widest uppercase">Handshake in progress (12s)</p>
                </div>
            );
        }

        let content;
        if (step === 'self') {
            content = (
                <div className="space-y-8">
                    <h3 className="brand-font text-3xl uppercase tracking-tighter">System_Installation</h3>
                    <div className="space-y-8">
                        <NumberedListItem
                            number="01"
                            title="Flash Pi OS Lite"
                            description={
                                <>
                                    Use <a href="https://www.raspberrypi.com/documentation/computers/getting-started.html#raspberry-pi-imager" target="_blank" className="underline decoration-2 underline-offset-2 hover:text-void font-bold">Raspberry Pi Imager</a> to flash standard Lite OS (32 or 64-bit).
                                </>
                            }
                        />
                        <NumberedListItem
                            number="02"
                            title="Install Frame.ink"
                            description={
                                <>
                                    Clone the repo and run the installer on your Pi. For detailed steps, see <a href="https://github.com/senor/framelab-oss/blob/main/README_SELF_HOSTED.md" target="_blank" className="underline font-bold">README_SELF_HOSTED.md</a>.
                                </>
                            }
                        />
                        <CodeBlock
                            code="git clone https://github.com/senor/framelab-oss.git ~/framelab && cd ~/framelab && sudo bash pi/install.sh"
                            accentColor="blue"
                        />
                    </div>
                    <button onClick={handleLink} className="btn btn-primary-special w-full h-14 uppercase mono-font text-xs mt-4">
                        {isLinking ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'FINALIZE_LINK'}
                    </button>
                </div>
            );
        } else if (step === 'migration') {
            content = (
                <div className="space-y-8">
                    <h3 className="brand-font text-3xl text-[var(--orange)] uppercase tracking-tighter">Existing_System_Sync</h3>
                    <InfoBox variant="orange" icon={<AlertCircle className="w-4 h-4" />}>
                        <p>Parallel Mode: FrameLab can run alongside existing projects. We won't disable your current services.</p>
                    </InfoBox>
                    <div className="space-y-6">
                        <NumberedListItem
                            number="01"
                            title="Run the co-existence script"
                            description="Use this specific script to add Frame.ink without conflicts."
                        />
                        <CodeBlock
                            code="curl -sSL https://get.framelab.ink/add | bash"
                            accentColor="orange"
                        />
                    </div>
                    <button onClick={handleLink} className="btn btn-primary-special w-full h-14 uppercase mono-font text-xs mt-4">
                        {isLinking ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'VERIFY_LINK'}
                    </button>
                </div>
            );
        } else if (step === 'managed') {
            content = (
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h3 className="brand-font text-3xl text-[var(--blue)] uppercase tracking-tighter">Wireless_Setup</h3>
                        <p className="mono-font text-[11px] opacity-60">Sync your frame wirelessly. No terminal required.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border-2 border-ink dark:border-white p-6 space-y-4">
                            <p className="mono-font text-[10px] font-black uppercase tracking-widest">01_CONFIG_FILE</p>
                            <p className="mono-font text-[10px] leading-relaxed opacity-70">
                                Download this file and place it in the <span className="highlight-marker">/boot/</span> folder of your SD card.
                            </p>
                            <button className="btn btn-primary btn-md w-full flex items-center justify-center gap-2">
                                <Download className="w-3 h-3" />
                                <span className="text-[9px]">Download_Config_File</span>
                            </button>
                        </div>

                        <div className="border-2 border-ink dark:border-white p-6 space-y-4 bg-[var(--blue)]/[0.02]">
                            <p className="mono-font text-[10px] font-black uppercase tracking-widest">02_CONNECTION</p>
                            <p className="mono-font text-[10px] leading-relaxed opacity-70">
                                Power on your Pi. Enter the <span className="text-[var(--blue)] font-bold">Pairing Code</span> shown on the e-ink screen.
                            </p>
                            <div className="space-y-2 pt-2">
                                <label className="mono-font text-[8px] opacity-40 uppercase">Enter_Pairing_Code</label>
                                <input
                                    type="text"
                                    value={pairingCode}
                                    onChange={(e) => setPairingCode(e.target.value.toUpperCase())}
                                    className="input-ritual w-full mono-font text-sm uppercase tracking-[0.4em] text-center"
                                    placeholder="XXXXXX"
                                    maxLength={6}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleLink}
                            disabled={pairingCode.length < 6 || isLinking}
                            className="btn btn-primary-special w-full h-14 uppercase mono-font text-xs"
                        >
                            {isLinking ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'ESTABLISH_LINK'}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-8 animate-scale-in">
                <div className="card p-10 border-2 border-ink dark:border-white">
                    {content}
                </div>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Hardware_Setup"
            label={isDemo ? "DEMO_MODE" : undefined}
            maxWidth="max-w-6xl"
            verticalAlign="top"
            footer={
                <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-8">
                        {step !== 'discovery' ? (
                            <BackButton
                                label={step === 'self' || step === 'managed' || step === 'migration' ? "BACK_TO_OPTIONS" : "BACK_TO_INTRO"}
                                onClick={() => {
                                    if (step === 'selection') setStep('discovery');
                                    else setStep('selection');
                                }}
                            />
                        ) : (
                            <div className="w-[120px]" /> /* Placeholder to keep layout balance */
                        )}
                    </div>
                    <button onClick={onClose} className="mono-font text-[10px] opacity-60 hover:opacity-100 transition-opacity underline underline-offset-8 uppercase text-ink dark:text-white">I'll configure my hardware later</button>
                </div>
            }
        >
            <div className="p-8 md:p-12 overflow-x-hidden relative">
                {step === 'discovery' && renderDiscovery()}
                {step === 'selection' && renderSelection()}
                {(step === 'self' || step === 'managed' || step === 'migration') && renderDetail()}
            </div>
        </Modal>
    );
}

// Sub-component imports for lucide
import { Loader2 } from 'lucide-react';
