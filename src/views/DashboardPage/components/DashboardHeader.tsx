import { User } from 'firebase/auth';
import { Upload, Loader2, Link as LinkIcon, Shuffle, Settings, Zap } from 'lucide-react';
import { IconButton } from '../../../components/ui/IconButton';
import { StatusTooltip } from './StatusTooltip';

interface DashboardHeaderProps {
    user: User | null;
    isDemo: boolean;
    testState: string | null;
    imagesCount: number;
    processing: boolean;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenUrlImport: () => void;
    onOpenSettings: () => void;
    onRandomBeam: () => void;
    onOpenOnboarding: () => void;
    isMockEmpty: boolean;
    toggleMockSetup: () => void;
}

export function DashboardHeader({
    user,
    isDemo,
    testState,
    imagesCount,
    processing,
    handleFileUpload,
    onOpenUrlImport,
    onOpenSettings,
    onRandomBeam,
    onOpenOnboarding,
    isMockEmpty,
    toggleMockSetup,
}: DashboardHeaderProps) {
    return (
        <header className="relative z-10 w-full mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-ink pb-8">
            <div className="relative z-10 select-none flex items-baseline gap-1">
                <h1 className="brand-font text-ink leading-none transition-colors duration-300">
                    <span className="text-5xl">FRAME</span>
                    <span className="text-4xl serif-italic text-[color:var(--pink)] lowercase tracking-tight font-bold ml-2">ink</span>
                </h1>
                {(user || isDemo || testState) && (
                    <div className="relative group cursor-help z-50">
                        <div className={`w-2.5 h-2.5 rounded-full ${testState === 'empty' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]'}`} />

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full left-0 pointer-events-none group-hover:pointer-events-auto mt-5">
                            <StatusTooltip
                                online={testState !== 'empty'}
                                totalImages={imagesCount}
                                refreshesWeekly={isDemo ? 14 : 7}
                                lastSync={testState === 'empty' ? "Never" : (isDemo ? "Just now" : undefined)}
                                onConnectHardware={import.meta.env.VITE_APP_MODE !== 'self_hosted' ? onOpenOnboarding : undefined}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center">
                <label className={`btn btn-icon btn-secondary cursor-pointer tooltip-trigger ${processing ? 'pointer-events-none opacity-80' : ''}`}>
                    {processing ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
                    <span className="tooltip-content">UPLOAD_IMAGE</span>
                    <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </label>
                <IconButton icon="Link" onClick={onOpenUrlImport} tooltip="IMPORT_URL" />
                <IconButton icon="Shuffle" className="btn-secondary-special" onClick={onRandomBeam} tooltip="RANDOM_DISPLAY" />

                <div className="flex items-center px-2">
                    <div className="w-3 h-[3px] bg-[color:var(--gold)] opacity-80" />
                </div>

                <IconButton icon="Settings" onClick={onOpenSettings} tooltip="Settings" />
            </div>

            {isDemo && (
                <div className="absolute left-0 bottom-0 translate-y-1/2 z-[60]">
                    <div className="tag-marker !rotate-0 !bg-blue !text-paper !border-black dark:!border-white !px-4 !py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-3">
                        <span className="opacity-70">DEMO_MODE //</span>
                        <button
                            onClick={toggleMockSetup}
                            className="hover:underline font-black cursor-pointer tracking-widest text-[10px]"
                        >
                            {isMockEmpty ? 'BACK TO DEMO APP >' : 'TRY OUT MOCK SETUP >'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
