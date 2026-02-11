import { Card } from '../../../components/ui/Card';
import { IconButton } from '../../../components/ui/IconButton';

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
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4 backdrop-blur-none z-20">
                    <IconButton
                        icon="Zap"
                        variant="primary"
                        className="text-white btn-primary-special"
                        onClick={onSendToFrame}
                    />
                    <IconButton
                        icon="Pencil"
                        variant="secondary"
                        onClick={onEdit}
                    />
                </div>

                {/* STIPPLE_OVERLAY */}
                <div
                    className="absolute inset-0 bg-paper/10 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-saturate-0 mix-blend-hard-light"
                >
                    <div className="w-full h-full bg-blue-500/20" style={{ filter: 'url(#grain-stipple)' }}></div>
                </div>
            </div>
            <div className="mt-3 py-2 px-1 flex items-center justify-between gap-2">
                <div className="flex items-center min-w-0 flex-1">
                    <span className="text-[9px] font-black uppercase tracking-widest truncate mono-font opacity-70 leading-none">{img.name}</span>
                </div>
                {isLive && (
                    <div className="flex items-center gap-1.5 bg-ink text-paper dark:bg-paper dark:text-ink px-2 py-1 rounded-xs border border-ink dark:border-paper shadow-sm flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_4px_#22c55e]" />
                        <span className="mono-font text-[9px] font-black tracking-tighter leading-none">LIVE</span>
                    </div>
                )}
            </div>
        </Card>
    );
}
