import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

interface AccessDeniedProps {
    email: string;
    onSignOut: () => void;
}

export function AccessDenied({ email, onSignOut }: AccessDeniedProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-ink relative">
            <div className="absolute inset-0 halftone-dark opacity-10"></div>
            <div className="relative z-10 max-w-lg w-full">
                <Card className="p-12 text-center bg-surface shadow-[8px_8px_0px_0px_var(--shadow-color)] relative overflow-hidden">
                    <div className="absolute inset-0 halftone-dark opacity-5 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center">
                                <AlertCircle className="text-red-500" size={32} />
                            </div>
                        </div>
                        <h3 className="brand-font text-5xl mb-6 text-center leading-none uppercase text-ink">Access<br />Denied</h3>
                        <p className="mono-font text-[11px] font-black uppercase tracking-widest mb-10 opacity-60 text-center leading-relaxed text-ink">
                            The account <span className="bg-ink text-paper px-1">{email}</span> has not been whitelisted for the Frame.ink beta yet.
                        </p>

                        <div className="space-y-4">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="btn btn-secondary w-full h-14 bg-paper text-ink border-paper hover:bg-paper/90 transition-all font-black"
                            >
                                Join the Beta List
                            </button>
                            <button
                                onClick={onSignOut}
                                className="btn btn-tertiary w-full h-10 text-ink/40 hover:text-ink transition-all uppercase text-[10px] font-black tracking-widest"
                            >
                                Logout & Switch Account
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
