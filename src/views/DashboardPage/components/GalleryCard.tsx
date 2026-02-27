import { Card } from '../../../components/ui/Card';
import { IconButton } from '../../../components/ui/IconButton';
import { Zap } from 'lucide-react';

interface Img {
    id: string;
    name: string;
    url: string;
    created?: { seconds?: number };
}

interface GalleryCardProps {
    img: Img;
    index: number;
    isLive: boolean;
    isLoaded: boolean;
    onLoad: () => void;
    onClick: () => void;
    onSendToFrame: (e: React.MouseEvent) => void;
    onEdit: (e: React.MouseEvent) => void;
    isRefreshing?: boolean;
}

export function GalleryCard({
    img,
    index,
    isLive,
    isLoaded,
    onLoad,
    onClick,
    onSendToFrame,
    onEdit,
    isRefreshing = false,
}: GalleryCardProps) {
    return (
        <Card
            className="group p-4 animate-scale-in card-module z-0"
            style={{ animationDelay: `${index * 30}ms` }}
            interactive
            onClick={onClick}
        >
            <div className="tag-ref absolute top-2 left-2 z-30">PRF-{1000 + index}</div>
            <div className={`aspect-[4/5] border-[1px] border-ink/10 overflow-hidden bg-surface ${!isLoaded ? 'shimmer' : ''}`}>
                <img
                    src={img.url}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading={index < 4 ? "eager" : "lazy"}
                    onLoad={onLoad}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-all flex items-center justify-center gap-4 backdrop-blur-none z-20 md:pointer-events-auto pointer-events-none group-active:opacity-100">
                    <IconButton
                        icon="Zap"
                        variant="primary"
                        className="text-white btn-primary-special w-14 h-14 md:w-12 md:h-12 pointer-events-auto"
                        onClick={onSendToFrame}
                    />
                    <IconButton
                        icon="Pencil"
                        variant="secondary"
                        className="w-14 h-14 md:w-12 md:h-12 bg-white text-black pointer-events-auto"
                        onClick={onEdit}
                    />
                </div>

                {/* Mobile action bar (always visible or prominent) */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 flex justify-between items-center z-30">
                    <button
                        onClick={onSendToFrame}
                        className="flex items-center gap-2 bg-blue text-white px-3 py-1.5 rounded-sm font-black text-[10px] tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    >
                        <Zap size={14} /> Sync
                    </button>
                    <button
                        onClick={onEdit}
                        className="p-1.5 text-white/80 hover:text-white"
                    >
                        <IconButton icon="Pencil" variant="tertiary" className="!w-8 !h-8 !p-0 text-white" onClick={onEdit} />
                    </button>
                </div>

                {/* STIPPLE_OVERLAY (Living Noise) */}
                <div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
                >
                    <div className="noise-living bg-white" style={{ filter: 'url(#cosmos-grain)', opacity: 0.25 }} />
                </div>

                {isLive && (
                    <div className={`tag-ref absolute top-2 right-2 z-30 flex items-center gap-1.5 ${isRefreshing ? '!bg-blue !text-paper' : ''} transition-colors duration-300`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isRefreshing ? 'bg-paper animate-spin rounded-none border-b-2 border-transparent' : 'bg-[#22c55e] animate-pulse'}`} />
                        <span>{isRefreshing ? 'REFRESHING' : 'LIVE'}</span>
                    </div>
                )}
            </div>
            <div className="mt-4 px-1">
                <span className="text-[9px] font-black uppercase tracking-widest truncate mono-font opacity-70 leading-none block text-left">{img.name}</span>
            </div>
        </Card>
    );
}
