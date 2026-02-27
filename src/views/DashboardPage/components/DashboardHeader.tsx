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
    onRandomDisplay: () => void;
    onOpenOnboarding: () => void;
    isMockEmpty: boolean;
    toggleMockSetup: () => void;
    isRefreshing?: boolean;
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
    onRandomDisplay,
    onOpenOnboarding,
    isMockEmpty,
    toggleMockSetup,
    isRefreshing = false,
}: DashboardHeaderProps) {
    return (
        <header className="relative z-10 w-full mb-10 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div className="relative z-10 select-none flex items-center gap-3 md:gap-4 h-12">
                <h1 className="brand-font text-ink leading-none transition-colors duration-300 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl">FRAME</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl serif-italic text-[color:var(--blue)] lowercase tracking-tight font-bold ml-1 md:ml-2">lab</span>
                </h1>
                {(user || isDemo || testState) && (
                    <div className="relative group cursor-help z-50 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${testState === 'empty' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]'}`} />

                        {isRefreshing && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue/10 border border-blue/30 rounded-full animate-pulse-slow">
                                <span className="mono-font text-[8px] font-black text-blue uppercase tracking-widest">SYNCING...</span>
                            </div>
                        )}

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full right-0 md:left-0 pointer-events-none group-hover:pointer-events-auto mt-4 z-[100]">
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

            <div className="flex gap-2 sm:gap-4 items-center w-full md:w-auto justify-start md:justify-end overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar relative">
                <label className={`btn btn-icon btn-secondary !w-12 !h-12 md:!w-14 md:!h-14 cursor-pointer tooltip-trigger ${processing ? 'pointer-events-none opacity-80' : ''}`}>
                    {processing ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                    <span className="tooltip-content">UPLOAD_IMAGE</span>
                    <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </label>
                <IconButton icon="Link" className="!w-12 !h-12 md:!w-14 md:!h-14" onClick={onOpenUrlImport} tooltip="IMPORT_URL" />
                <IconButton icon="Shuffle" className="btn-secondary-special !w-12 !h-12 md:!w-14 md:!h-14" onClick={onRandomDisplay} tooltip="RANDOM_DISPLAY" />

                <div className="flex items-center px-1 md:px-2">
                    <div className="w-2 h-[2px] md:w-3 md:h-[3px] bg-[color:var(--gold)] opacity-80" />
                </div>

                <IconButton icon="Settings" className="!w-12 !h-12 md:!w-14 md:!h-14" onClick={onOpenSettings} tooltip="Settings" />
            </div>

            {isDemo && (
                <div className="mt-12 md:mt-0 md:absolute md:left-0 md:bottom-0 md:translate-y-[60%] z-[60]">
                    <div className="tag-marker !rotate-[-1deg] !bg-[color:var(--gold)] !text-black !border-black dark:!border-white !px-4 !py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-3">
                        <span className="opacity-70 font-bold">DEMO_MODE //</span>
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
