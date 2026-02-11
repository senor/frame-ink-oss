import { Card } from '../../../components/ui/Card';
import { OnboardingEmptyState } from './OnboardingEmptyState';
import { GalleryCard } from './GalleryCard';

interface Img {
    id: string;
    name: string;
    url: string;
    created?: { seconds?: number };
}

interface Config {
    current_image: string;
    confirmed_image?: string;
    rotation: number;
    interval: number;
}

interface GalleryGridProps {
    isInitialLoading: boolean;
    isDemo: boolean;
    images: Img[];
    demoImages: Img[];
    demoEphemeralImages: Img[];
    demoConfig: Config;
    config: Config;
    processing: boolean;
    loaded: Set<string>;
    onImageLoad: (id: string) => void;
    setActiveImg: (img: Img) => void;
    onSendToFrame: (img: Img) => void;
    onOpenOnboarding: () => void;
    isMockEmpty: boolean;
}

export function GalleryGrid({
    isInitialLoading,
    isDemo,
    images,
    demoImages,
    demoEphemeralImages,
    demoConfig,
    config,
    processing,
    loaded,
    onImageLoad,
    setActiveImg,
    onSendToFrame,
    onOpenOnboarding,
    isMockEmpty,
}: GalleryGridProps) {
    const displayImages = isDemo ? [...demoEphemeralImages, ...demoImages] : images;
    const currentConfig = isDemo ? demoConfig : config;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12 w-full">
            {isInitialLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <Card key={`skel-img-${i}`} className="p-4 card-module border-ink/20 opacity-40">
                        <div className="aspect-[4/5] border-[1px] border-ink/10 shimmer relative overflow-hidden bg-ink/5" />
                        <div className="mt-3 py-2 px-1 space-y-2">
                            <div className="h-2 w-1/2 bg-ink/10 shimmer rounded" />
                            <div className="h-1.5 w-1/3 bg-ink/5 shimmer rounded" />
                        </div>
                    </Card>
                ))
            ) : (
                <>
                    <OnboardingEmptyState
                        onUpload={() => {
                            const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                            input?.click();
                        }}
                        onConnect={onOpenOnboarding}
                        isUploading={processing}
                        showUpload={displayImages.length === 0}
                        showConnect={import.meta.env.VITE_APP_MODE !== 'self_hosted' && !(isDemo ? (demoConfig.confirmed_image && !isMockEmpty) : !!config.confirmed_image)}
                    />

                    {displayImages.map((img, i) => (
                        <GalleryCard
                            key={img.id}
                            img={img}
                            index={i}
                            isLive={currentConfig.current_image === img.name}
                            isLoaded={loaded.has(img.id)}
                            onLoad={() => onImageLoad(img.id)}
                            onClick={() => setActiveImg(img)}
                            onSendToFrame={(e) => {
                                e.stopPropagation();
                                onSendToFrame(img);
                            }}
                            onEdit={(e) => {
                                e.stopPropagation();
                                setActiveImg(img);
                            }}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
