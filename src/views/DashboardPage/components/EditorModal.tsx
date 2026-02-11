import { Modal } from '../../../components/ui/Modal';
import { ComparisonSlider } from './ComparisonSlider';
import { Loader2, Crop, Trash2, RotateCw, FlipHorizontal, CheckCircle, Zap } from 'lucide-react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useRef, useEffect, useState } from 'react';
import { useDemo } from '../../../context/DemoContext';
import { IFrameBackend } from '../../../services/backend';

interface EditorModalProps {
    activeImg: any;
    setActiveImg: (img: any) => void;
    config: { rotation: number };
    backend: IFrameBackend;
    user: any;
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
    sendToFrame: (img: any) => void;
    onImageUpdate?: (img: any) => void;
    onDelete?: () => void;
    hardwareConnected?: boolean;
    isDemo?: boolean;
}

function CropperSafe({
    src,
    onReady,
    onLoad,
}: {
    src: string;
    onReady: (cropper: Cropper) => void;
    onLoad?: () => void;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const img = document.createElement('img');
        img.crossOrigin = 'anonymous'; // Fix CORS issues with external images (Demo mode)

        // Failsafe: Handle load errors to prevent stuck state
        img.onerror = () => {
            console.error("Cropper image failed to load");
            if (onLoad) onLoad();
        };

        if (src.startsWith('http')) {
            const separator = src.includes('?') ? '&' : '?';
            img.src = `${src}${separator}t=${Date.now()}`;
        } else {
            img.src = src;
        }
        img.style.maxWidth = '100%';
        containerRef.current.appendChild(img);

        cropperRef.current = new Cropper(img, {
            aspectRatio: 480 / 800,
            viewMode: 1, // Restrict crop box to canvas
            guides: true,
            background: false,
            autoCropArea: 1,
            dragMode: 'move',
            responsive: true,
            restore: false,
            ready() {
                if (onLoad) onLoad();
            }
        });
        onReady(cropperRef.current);

        return () => {
            cropperRef.current?.destroy();
            cropperRef.current = null;
            if (containerRef.current) containerRef.current.innerHTML = '';
        };
    }, [src, onReady]);

    return <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden" />;
}

export function EditorModal({ activeImg, setActiveImg, config, backend, user, notify, sendToFrame, onImageUpdate, onDelete, hardwareConnected = false, isDemo: propIsDemo }: EditorModalProps) {
    const [isCropping, setIsCropping] = useState(false);
    const [cropper, setCropper] = useState<Cropper | null>(null);
    const [cropperLoading, setCropperLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState('');
    const { isDemo: contextIsDemo } = useDemo();
    const isDemo = propIsDemo ?? contextIsDemo;

    // Start in crop mode if it's a new image
    useEffect(() => {
        if (activeImg?.isNew) {
            setIsCropping(true);
            setCropperLoading(true);
        }
    }, [activeImg]);

    const handlePublish = async () => {
        if (!cropper || (!user && !isDemo) || !activeImg) return;
        setProcessing(true);

        cropper.getCroppedCanvas({ width: 480, height: 800 }).toBlob(
            async (blob) => {
                try {
                    if (!blob) throw new Error('Missing blob');

                    if (isDemo) {
                        const url = URL.createObjectURL(blob);
                        const name = activeImg.name.endsWith('.png') ? activeImg.name : `${activeImg.name}.png`;
                        const newImg = {
                            id: activeImg.id === 'PENDING' ? `demo_${Date.now()}` : activeImg.id,
                            name,
                            url,
                            created: { seconds: Math.floor(Date.now() / 1000) }
                        };
                        notify('PIECE_PUBLISHED // DEMO', 'success');
                        if (onImageUpdate) onImageUpdate(newImg);
                        void sendToFrame(newImg);
                    } else {
                        const name = activeImg.name.endsWith('.png') ? activeImg.name : `${activeImg.name.split('.')[0]}.png`;
                        // Create a file object from blob
                        const file = new File([blob], name, { type: 'image/png' });

                        if (activeImg.isNew) {
                            await backend.uploadImage(file, name);
                            notify('PIECE_PUBLISHED // ARCHIVED', 'success');
                            // Optimistic display not needed as backend subscription will catch it, but we can do it if id known. 
                            // Upload doesn't return ID easily in current interface without refetch, let's rely on subscription update or just close.
                            // Actually user interaction pattern expects display:
                            // Ideally uploadImage returns the new image metadata.
                            // For now, we just wait for sync.
                        } else {
                            // Re-upload logic (update existing image content)
                            // Our interface treats upload as new/overwrite by name.
                            // If ID triggers update, we might need specific update logic.
                            // For now let's assume reuse name = overwrite content.
                            await backend.uploadImage(file, name);
                            notify('PIECE UPDATED', 'success');
                        }
                    }
                } catch (e: any) {
                    console.error("Upload error:", e);
                    notify(`UPLOAD FAILED: ${e.message || 'UNKNOWN ERROR'}`, 'error');
                }

                setProcessing(false);
                setActiveImg(null);
                setIsCropping(false);
            },
            'image/png',
        );
    };

    const handleDelete = async () => {
        if (!activeImg || activeImg.isNew) return;
        await backend.deleteImage(activeImg.id);
        notify('PIECE_DELETED', 'success');
        setActiveImg(null);
    };

    const handleRename = async () => {
        if (!activeImg || !renameValue.trim() || activeImg.isNew) return;
        try {
            setProcessing(true);
            const newName = renameValue.trim().endsWith('.png') ? renameValue.trim() : `${renameValue.trim()}.png`;
            if (isDemo) {
                notify('IMAGE RENAMED (DEMO)', 'success');
                if (onImageUpdate) {
                    onImageUpdate({ ...activeImg, name: newName });
                }
            } else {
                await backend.renameImage(activeImg.id, newName);
                notify('IMAGE RENAMED', 'success');
            }
            setIsRenaming(false);
        } catch (error) {
            console.error(error);
            notify('RENAME FAILED', 'error');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal
            isOpen={!!activeImg}
            onClose={() => setActiveImg(null)}
            maxWidth="max-w-6xl"
            title={isCropping ? "WORKBENCH // REFRAME" : "WORKBENCH // SIMULATOR"}
            className={`flex flex-col md:flex-row overflow-hidden ${isCropping ? 'min-h-[70vh]' : ''} ${config.rotation === 90 ? 'h-auto md:h-[750px]' : 'h-auto md:h-[680px]'} max-h-[90vh] overflow-y-auto md:overflow-hidden`}
        >
            <div className={`relative flex-none md:flex-1 bg-[#0A0A0A] flex items-center justify-center md:border-r-[1.5px] border-white/10 group ${isCropping ? 'min-h-[65vh]' : ''} md:min-h-0`}>
                <div className="absolute inset-0 pattern-grid-lg opacity-[0.03]" />

                {isCropping ? (
                    <div className="p-8 md:p-12 w-full h-full flex items-center justify-center relative z-10">
                        {cropperLoading && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <Loader2 size={48} className="animate-spin text-white" />
                            </div>
                        )}
                        <CropperSafe src={activeImg.url} onReady={setCropper} onLoad={() => setCropperLoading(false)} />
                    </div>
                ) : (
                    <div className="relative w-full h-full z-10 flex items-center justify-center">
                        <ComparisonSlider originalSrc={activeImg.url} rotation={config.rotation} />
                    </div>
                )}
            </div>

            <div className="flex-none w-full md:w-[380px] p-8 md:p-10 flex flex-col relative bg-surface dark:bg-[#121212] text-ink dark:text-white border-t md:border-t-0 md:border-l-[1.5px] border-border-color">
                <div className="space-y-6">
                    {isRenaming ? (
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="w-full text-3xl brand-font border-b-2 border-current bg-transparent focus:outline-none p-0 pb-2"
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                placeholder="ENTER NAME"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <button onClick={() => void handleRename()} className="btn btn-primary btn-sm flex-1 font-black">SAVE</button>
                                <button onClick={() => setIsRenaming(false)} className="btn btn-secondary btn-sm flex-1 opacity-50 hover:opacity-100">CANCEL</button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl brand-font leading-[0.85] ink-bleed break-words max-w-full">
                                {activeImg.name.split('.')[0]}
                            </h2>
                            {!activeImg.isNew && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRenameValue(activeImg.name.split('.')[0]);
                                        setIsRenaming(true);
                                    }}
                                    className="btn btn-secondary btn-xs font-black uppercase tracking-[0.2em] mono-font"
                                >
                                    Edit Name
                                </button>
                            )}
                        </div>
                    )}
                    <div className="pt-2">
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mono-font truncate italic">REF. {activeImg.id}</p>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    {!isCropping ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" onClick={() => { setIsCropping(true); setCropperLoading(true); }} className="btn btn-secondary h-14 flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest">
                                <Crop size={18} /> Reframe
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (onDelete) {
                                        onDelete();
                                    } else {
                                        void handleDelete();
                                    }
                                }}
                                className="btn btn-secondary h-14 flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest"
                            >
                                <Trash2 size={18} /> Delete
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!cropper) return;
                                        cropper.rotate(90);
                                    }}
                                    className="btn btn-secondary btn-sm flex-1 font-black uppercase gap-2"
                                >
                                    <RotateCw size={14} /> Rotate
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const data = cropper?.getData();
                                        if (data) cropper?.scaleX(data.scaleX * -1);
                                    }}
                                    className="btn btn-secondary btn-sm flex-1 font-black uppercase gap-2"
                                >
                                    <FlipHorizontal size={14} /> Flip
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        {isCropping ? (
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => void handlePublish()}
                                    disabled={processing}
                                    className="btn btn-primary-special btn-md w-full disabled:opacity-50"
                                >
                                    {processing ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2"><CheckCircle size={16} /> {hardwareConnected ? 'Save & Display' : 'Save to Gallery'}</span>}
                                </button>
                                <button type="button" onClick={() => {
                                    if (activeImg?.isNew) {
                                        setActiveImg(null);
                                    } else {
                                        setIsCropping(false);
                                    }
                                }} className="btn btn-tertiary btn-md w-full">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => void sendToFrame(activeImg)}
                                className="btn btn-primary-special h-16 w-full gap-3 text-sm font-black tracking-widest uppercase"
                            >
                                {hardwareConnected ? (
                                    <>
                                        <Zap size={20} /> DISPLAY_ON_FRAME
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} /> SAVE_TO_GALLERY
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
