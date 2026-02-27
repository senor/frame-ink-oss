
import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Copy, Check } from 'lucide-react';

interface CodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    code: { jsx: string, css?: string };
}

export const CodeModal = ({ isOpen, onClose, title, code }: CodeModalProps) => {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

    const handleCopy = async () => {
        const textToCopy = activeTab === 'jsx' ? code.jsx : (code.css || '');

        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;

            // Fix: Prevent scrolling by making the textarea invisible and fixed
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleTabChange = (tab: 'jsx' | 'css') => {
        setActiveTab(tab);
        setCopied(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            maxWidth="max-w-3xl"
        >
            <div className="flex flex-col h-[60vh] bg-paper">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10 bg-ink/5">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider hidden sm:block">{title}</span>

                        {/* Tabs */}
                        <div className="flex bg-ink/5 rounded p-1 gap-1">
                            <button
                                onClick={() => handleTabChange('jsx')}
                                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded transition-colors ${activeTab === 'jsx' ? 'bg-ink text-paper shadow-sm' : 'text-ink/60 hover:text-ink hover:bg-ink/5'}`}
                            >
                                JSX / Structure
                            </button>
                            {code.css && (
                                <button
                                    onClick={() => handleTabChange('css')}
                                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded transition-colors ${activeTab === 'css' ? 'bg-ink text-paper shadow-sm' : 'text-ink/60 hover:text-ink hover:bg-ink/5'}`}
                                >
                                    CSS / Animations
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-ink/10 text-ink/70 hover:text-ink transition-colors text-xs font-mono uppercase font-bold"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-green-600" />
                                <span className="text-green-600">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy_{activeTab === 'jsx' ? 'JSX' : 'CSS'}</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-0 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-auto bg-[#1e1e1e] text-[#d4d4d4] p-6 text-xs font-mono leading-relaxed">
                        <pre className="whitespace-pre">{activeTab === 'jsx' ? code.jsx : code.css}</pre>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
