import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Zap } from 'lucide-react';

export type ToastType = 'info' | 'loading' | 'success' | 'error';

interface ToastProps {
    message: string;
    type?: ToastType;
}

export function Toast({ message, type = 'info' }: ToastProps) {
    return (
        <div className="fixed bottom-12 left-0 right-0 mx-auto w-fit z-[300] animate-toast-up text-ink">
            <div className="bg-[#1D1D1B] text-[#EBE6D7] px-12 py-5 border-[2.5px] border-[#EBE6D7] shadow-[6px_6px_0px_0px_rgba(29,29,27,0.5)] flex items-center gap-5 min-w-[340px] justify-center">
                {type === 'loading' ? (
                    <Loader2 size={22} className="animate-spin text-[#EBE6D7]" />
                ) : type === 'success' ? (
                    <CheckCircle size={22} className="text-green-400" />
                ) : type === 'error' ? (
                    <AlertCircle size={22} className="text-red-400" />
                ) : (
                    <Zap size={22} className="text-[#EBE6D7]" />
                )}
                <span className="font-black uppercase tracking-[0.25em] text-[12px] leading-none">{message}</span>
            </div>
        </div>
    );
}
