import React from 'react';
import { StatusTooltip } from '../../DashboardPage/components/StatusTooltip';
import { Tooltip } from '../../../components/ui/Tooltip';
import { CheckCircle, AlertCircle, Loader2, Zap, Info } from 'lucide-react';

interface StyleGuideIndicatorsProps {
    notify: (msg: string, type: 'info' | 'loading' | 'success' | 'error') => void;
}

export const StyleGuideIndicators = ({ notify }: StyleGuideIndicatorsProps) => {
    return (
        <>
            <section className="mb-40">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">11_Feedback</h2>
                <div className="space-y-12">
                    <div className="p-8 border-2 border-dashed border-ink/20 rounded bg-paper/50">
                        <p className="font-mono text-xs text-center opacity-50 mb-6">TOAST NOTIFICATION TRIGGER AREA</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => notify('System Updated', 'success')}
                                className="btn btn-secondary px-6 py-3 text-xs gap-2"
                            >
                                <CheckCircle size={16} className="text-green-600" />
                                Trigger Success
                            </button>
                            <button
                                onClick={() => notify('Connection Lost', 'error')}
                                className="btn btn-secondary px-6 py-3 text-xs gap-2"
                            >
                                <AlertCircle size={16} className="text-red-500" />
                                Trigger Error
                            </button>
                            <button
                                onClick={() => notify('Processing...', 'loading')}
                                className="btn btn-secondary px-6 py-3 text-xs gap-2"
                            >
                                <Loader2 size={16} className="animate-spin" />
                                Trigger Loading
                            </button>
                            <button
                                onClick={() => notify('System Neutral', 'info')}
                                className="btn btn-secondary px-6 py-3 text-xs gap-2"
                            >
                                <Zap size={16} />
                                Trigger Info
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-40">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">13_Status_Indicator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Online State */}
                    <div className="flex flex-col gap-8 items-center border border-dashed border-ink/20 p-12 rounded">
                        <h3 className="brand-font text-2xl">Online State</h3>
                        <div className="relative group cursor-help z-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e] mb-2" />
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full left-0 mt-5">
                                <StatusTooltip online={true} totalImages={24} refreshesWeekly={42} />
                            </div>
                        </div>
                        <p className="font-mono text-xs opacity-50 text-center mt-32">Hover for details</p>
                    </div>

                    {/* Offline State */}
                    <div className="flex flex-col gap-8 items-center border border-dashed border-ink/20 p-12 rounded">
                        <h3 className="brand-font text-2xl">Offline State</h3>
                        <div className="relative group cursor-help z-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] mb-2" />
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full left-0 mt-5">
                                <StatusTooltip online={false} totalImages={12} refreshesWeekly={0} lastSync="2 days ago" />
                            </div>
                        </div>
                        <p className="font-mono text-xs opacity-50 text-center mt-32">Hover for details</p>
                    </div>
                </div>
            </section>

            <section className="mb-40">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">14_Content_Tooltips</h2>
                <div className="flex flex-wrap gap-12 items-center">

                    {/* Top Tooltip */}
                    <div className="flex flex-col gap-4 items-center">
                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Top Position</p>
                        <Tooltip content="SYSTEM_READY // ALL_SYSTEMS_GO" position="top">
                            <button className="btn btn-secondary btn-sm gap-2">
                                <Info size={14} />
                                HOVER_ME
                            </button>
                        </Tooltip>
                    </div>

                    {/* Bottom Tooltip */}
                    <div className="flex flex-col gap-4 items-center">
                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Bottom Position</p>
                        <Tooltip content="DATA_STREAM_ACTIVE" position="bottom">
                            <button className="btn btn-secondary btn-sm gap-2">
                                <Info size={14} />
                                HOVER_ME
                            </button>
                        </Tooltip>
                    </div>

                    {/* Right Tooltip */}
                    <div className="flex flex-col gap-4 items-center">
                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Right Position</p>
                        <Tooltip content="SIDE_MODULE_LOADED" position="right">
                            <button className="btn btn-secondary btn-sm gap-2">
                                <Info size={14} />
                                HOVER_ME
                            </button>
                        </Tooltip>
                    </div>

                    {/* Text Trigger */}
                    <div className="flex flex-col gap-4 items-center">
                        <p className="font-mono text-[9px] opacity-40 uppercase font-black">Text Trigger</p>
                        <Tooltip content="ADDITIONAL_CONTEXT_PROVIDED" position="top">
                            <span className="font-mono text-[10px] uppercase font-bold underline decoration-dotted cursor-help">
                                Explain_This_Term
                            </span>
                        </Tooltip>
                    </div>

                </div>
            </section>
        </>
    );
};
