import React from 'react';
import { IconButton } from '../../../components/ui/IconButton';

export const StyleGuideButtons = () => {
    return (
        <section className="mb-40">
            <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">05_Button_Matrix</h2>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-[150px_repeat(6,1fr)] gap-8 items-center min-w-[1000px]">
                    {/* Headers */}
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-right pr-4">Variant \ Size</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">XS</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">SM</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">MD</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">LG</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">XL</div>
                    <div className="font-mono text-[10px] opacity-40 uppercase font-black text-center">2XL</div>

                    {/* Special (MD Only) */}
                    <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Special</div>
                    <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                    <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                    <div className="flex justify-center flex-col gap-2 items-center">
                        <button className="btn btn-primary-special btn-md w-full">PRIMARY</button>
                        <button className="btn btn-secondary-special btn-md w-full">SECONDARY</button>
                    </div>
                    <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                    <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>
                    <div className="flex justify-center opacity-10 font-mono text-[9px]">-</div>

                    {/* Primary (Standard) - All Sizes */}
                    <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Primary</div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-xs">BTN</button></div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-sm">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-md">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-lg">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-xl">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-primary btn-2xl">BTN</button></div>

                    {/* Secondary */}
                    <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Secondary</div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-xs">BTN</button></div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-sm">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-md">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-lg">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-xl">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-secondary btn-2xl">BTN</button></div>

                    {/* Tertiary */}
                    <div className="font-mono text-[10px] font-bold uppercase text-right pr-4">Tertiary</div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-xs">BTN</button></div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-sm">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-md">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-lg">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-xl">BUTTON</button></div>
                    <div className="flex justify-center"><button className="btn btn-tertiary btn-2xl">BTN</button></div>

                </div>
            </div>
            <div className="mt-16 flex gap-8">
                <div className="space-y-4">
                    <p className="font-mono text-[9px] opacity-40 uppercase font-black">Icon Buttons</p>
                    <div className="flex gap-4">
                        {/* Using IconButton component for consistency */}
                        <IconButton icon="Settings" tooltip="SETTINGS" />
                        {/* Shuffle gets special secondary treatment */}
                        <IconButton icon="Shuffle" tooltip="RANDOMIZE" className="btn-secondary-special" />

                        {/* Custom styled IconButton */}
                        <IconButton icon="CloudUpload" tooltip="CLOUD_SYNC" className="!bg-ink !text-paper" />
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="font-mono text-[9px] opacity-40 uppercase font-black">Tactile Controls</p>
                    <div className="flex gap-4">
                        <IconButton icon="X" variant="tertiary" tooltip="CLOSE_MODAL" />
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="font-mono text-[9px] opacity-40 uppercase font-black">Utility Inline</p>
                    <button className="uppercase font-mono font-black text-[10px] border-2 border-border px-3 py-1 hover:bg-ink hover:text-paper transition-colors bg-transparent text-ink">Edit Name</button>
                </div>
            </div>
        </section>
    );
};
