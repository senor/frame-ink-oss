import { useState, useRef, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { IconButton } from '../../../components/ui/IconButton';
import { Loader2, MessageSquare, Send, X, CheckCircle } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../../lib/firebase';
import { User } from 'firebase/auth';

interface FeedbackWidgetProps {
    user: any;
    appId?: string;
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
}

export function FeedbackWidget({ user, appId, notify }: FeedbackWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setIsOpen((prev) => {
                    if (prev) return false;
                    return prev;
                });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        if (!isFirebaseConfigured) {
            notify('FEEDBACK_DISABLED', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            const currentAppId = appId || 'frame-ink';
            await addDoc(collection(db, 'artifacts', currentAppId, 'public', 'data', 'feedback'), {
                text: feedback.trim(),
                user_email: user?.email || 'anonymous',
                user_uid: user?.uid || 'anonymous',
                timestamp: serverTimestamp(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });

            setIsSuccess(true);
            notify('FEEDBACK_SENT', 'success');
            setFeedback('');

            // Close after a brief success message
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
            }, 2000);

        } catch (error) {
            console.error("Error submitting feedback:", error);
            notify('FAILED_TO_SEND', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed bottom-12 right-12 z-[100]" ref={widgetRef}>
            {/* Trigger Button - Using system IconButton */}
            {!isOpen && (
                <IconButton
                    icon="MessageSquare"
                    onClick={() => setIsOpen(true)}
                    tooltip="LEAVE_FEEDBACK"
                    variant="secondary"
                    className="shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                />
            )}

            {/* Popover Form */}
            {isOpen && (
                <div className="absolute bottom-0 right-0 w-[320px] animate-in slide-in-from-bottom-4 fade-in duration-200">
                    <Card className="flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-ink bg-paper overflow-hidden !rounded-none">
                        {isSuccess ? (
                            <div className="h-[200px] flex flex-col items-center justify-center text-center p-6 gap-4 animate-in fade-in zoom-in duration-300 bg-paper">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                    <CheckCircle className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="brand-font text-2xl uppercase mb-1">RECEIVED</h3>
                                    <p className="text-[10px] uppercase tracking-widest opacity-60 font-mono">Thank you for helping us improve.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-paper">
                                <div className="flex items-center justify-between p-4 border-b border-ink/10 bg-ink/5">
                                    <h3 className="text-xs font-black tracking-widest uppercase flex items-center gap-2">
                                        <MessageSquare size={14} />
                                        FEEDBACK // BETA
                                    </h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="opacity-50 hover:opacity-100 transition-opacity p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                                    <textarea
                                        className="w-full bg-surface border-2 border-ink/10 p-3 text-sm focus:outline-none focus:border-ink focus:ring-0 min-h-[120px] resize-none mono-font placeholder:opacity-40 rounded-none transition-colors"
                                        placeholder="Tell us what you think..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        autoFocus
                                        disabled={isSubmitting}
                                    />

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={!feedback.trim() || isSubmitting}
                                            className={`btn btn-primary btn-sm gap-2 w-full justify-center !rounded-none ${(!feedback.trim() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                            {isSubmitting ? 'SENDING...' : 'SEND_FEEDBACK'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
}
