import { doc, updateDoc } from 'firebase/firestore';
import { Modal } from '../../../components/ui/Modal';
import { Dropdown } from '../../../components/ui/Dropdown';
import { SegmentedControl } from '../../../components/ui/SegmentedControl';
import { FrameButton } from '../../../components/ui/FrameButton';
import { Tooltip } from '../../../components/ui/Tooltip';
import { Cpu, Sun, Moon, Info } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDemo } from '../../../context/DemoContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: { interval: number; rotation: number; current_image: string };
    setConfig: React.Dispatch<React.SetStateAction<{ interval: number; rotation: number; current_image: string }>>;
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
    onSignOut: () => void;
    user: any;
    isDemo: boolean;
}

export function SettingsModal({ isOpen, onClose, config, setConfig, notify, onSignOut, user, isDemo }: SettingsModalProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>(() =>
        typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-2xl"
            title="SYSTEM_SETTINGS"
            className="overflow-hidden"
        >
            <div className="p-8 md:p-12 pt-10 space-y-10">
                <div className="space-y-4">
                    {/* Header/Info section removed as requested */}
                </div>

                <div className="space-y-8">
                    <Dropdown
                        label={
                            <div className="flex items-center gap-2">
                                <span>REFRESH_INTERVAL</span>
                                <Tooltip
                                    content="Manually sending an image or shuffling will not interrupt your scheduled cycle."
                                    position="top"
                                >
                                    <Info className="w-3 h-3 text-ink/40 hover:text-ink cursor-help transition-colors" />
                                </Tooltip>
                            </div>
                        }
                        value={config.interval}
                        onChange={(val) => {
                            const interval = Number.parseInt(val, 10);
                            setConfig((c) => ({ ...c, interval }));
                            notify(`INTERVAL SET: ${interval === 0 ? 'MANUAL' : `${interval} MIN`}`, 'success');
                        }}
                        options={[
                            { value: 60, label: 'EVERY HOUR' },
                            { value: 30, label: 'EVERY 30 MINUTES' },
                            { value: 0, label: 'NEVER (MANUAL)' },
                        ]}
                    />

                    <SegmentedControl
                        label="ORIENTATION"
                        value={config.rotation}
                        onChange={(val) => {
                            setConfig((c) => ({ ...c, rotation: val }));
                            notify('ORIENTATION SET', 'success');
                        }}
                        options={[
                            { value: 0, label: 'Landscape' },
                            { value: 90, label: 'Portrait' },
                        ]}
                    />

                    <SegmentedControl
                        label="UI_THEME"
                        value={theme}
                        onChange={(val) => setTheme(val)}
                        options={[
                            { value: 'light', label: 'Light' },
                            { value: 'dark', label: 'Dark' },
                        ]}
                    />
                </div>

                <footer className="pt-8 border-t border-ink/10 space-y-6">
                    <button
                        onClick={onSignOut}
                        className="btn btn-tertiary w-full h-14 gap-3 text-[10px] tracking-[0.3em]"
                    >
                        <Icons.LogOut size={14} />
                        LOG_OUT
                    </button>

                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-3 opacity-30 text-ink dark:text-white mono-font">
                            <Cpu size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">FIRMWARE_V2.5.0 // ACTIVE</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="mono-font text-[9px] font-black uppercase opacity-40">{isDemo ? 'GUEST_DEMO' : 'IDENTITY_VERIFIED'}</span>
                            <span className="mono-font text-[10px] font-black uppercase truncate max-w-full text-black dark:text-white">
                                {isDemo ? 'DEMO_USER' : user?.email || 'ANONYMOUS'}
                            </span>
                        </div>

                    </div>
                </footer>
            </div>
        </Modal>
    );
}
