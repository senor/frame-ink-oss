import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Loader2, ArrowRight } from 'lucide-react';

interface UrlImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (url: string) => Promise<void>;
}

export function UrlImportModal({ isOpen, onClose, onImport }: UrlImportModalProps) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError('');

        try {
            await onImport(url);
            setUrl('');
            onClose();
        } catch (err: any) {
            setError('IMPORT_FAILED // CHECK_CONNECTION');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-2xl"
            title="IMPORT_EXTERNAL_SOURCE"
        >
            <div className="p-6 md:p-12 relative">
                <p className="mono-font text-[10px] md:text-xs opacity-50 mb-8 md:mb-12 uppercase tracking-[0.3em] font-black border-l-2 border-blue-500 pl-4">
                    ENTER_SOURCE_URL
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative">
                        <input
                            type="text"
                            className="input-ritual w-full"
                            placeholder="HTTPS://..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            autoFocus
                            disabled={loading}
                        />
                        {error && (
                            <p className="absolute -bottom-6 left-0 text-[10px] text-red-500 mono-font font-bold uppercase tracking-wider">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading || !url.trim()}
                            className="btn btn-primary-special px-8 py-4 flex items-center gap-4 group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span className="font-bold tracking-widest uppercase">IMPORT_SOURCE</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
