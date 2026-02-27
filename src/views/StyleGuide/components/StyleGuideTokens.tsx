import React from 'react';
import { Card } from '../../../components/ui/Card';
import { BackButton } from '../../../components/ui/BackButton';
import { NumberedListItem } from '../../../components/ui/NumberedListItem';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Scan } from 'lucide-react';

export const StyleGuideTokens = () => {
    return (
        <>
            {/* 01_Core_Palette */}
            <section className="mb-32">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">01_Core_Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--const-void)] border-2 border-[color:var(--const-paper)]/25 mb-4 halftone-dark" />
                        <p className="font-mono text-[10px] font-bold">VOID_BASE</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--const-paper)] border-2 border-[color:var(--const-void)] mb-4" />
                        <p className="font-mono text-[10px] font-bold text-[color:var(--const-paper)]">PAPER_BASE</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--bg-surface)] border-2 border-[color:var(--const-void)]/10 mb-4" />
                        <p className="font-mono text-[10px] font-bold text-ink">SURFACE_DEFAULT</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--bg-surface-module)] border-2 border-[color:var(--const-void)]/10 mb-4" />
                        <p className="font-mono text-[10px] font-bold text-ink">SURFACE_MODULE</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--blue)] mb-4" />
                        <p className="font-mono text-[10px] font-bold text-[color:var(--blue)]">INK_BLUE</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--gold)] mb-4" />
                        <p className="font-mono text-[10px] font-bold text-[color:var(--gold)]">CIRCUIT_GOLD</p>
                    </div>
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--orange)] mb-4" />
                        <p className="font-mono text-[10px] font-bold text-[color:var(--orange)]">MARKER_ORANGE</p>
                    </div>
                </div>
            </section>

            {/* 02_Secondary_Palette */}
            <section className="mb-32">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">02_Secondary_Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {/* Zine Green */}
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--green)] border-2 border-border mb-4 flex items-center justify-center">
                            <div className="bg-[color:var(--green)] text-white border-white px-2 py-1 font-mono text-[8px] font-black uppercase border transform -rotate-1 shadow-none">STATUS_OK</div>
                        </div>
                        <p className="font-mono text-[10px] font-bold text-[color:var(--green)]">ZINE_GREEN</p>
                    </div>
                    {/* Tech Cyan */}
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--cyan)] border-2 border-border mb-4 flex items-center justify-center">
                            <Scan className="w-6 h-6 text-black" />
                        </div>
                        <p className="font-mono text-[10px] font-bold text-[color:var(--cyan)]">TECH_CYAN</p>
                    </div>
                    {/* Void Purple */}
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--purple)] border-2 border-border mb-4 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                        </div>
                        <p className="font-mono text-[10px] font-bold text-[color:var(--purple)]">VOID_PURPLE</p>
                    </div>
                    {/* System Pink */}
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--pink)] border-2 border-border mb-4 flex items-center justify-center">
                            <div className="w-6 h-6 bg-[color:var(--pink)] rounded-full mix-blend-multiply"></div>
                        </div>
                        <p className="font-mono text-[10px] font-bold text-[color:var(--pink)]">SYSTEM_PINK</p>
                    </div>
                    {/* Ink Secondary */}
                    <div>
                        <div className="w-full aspect-square bg-[color:var(--ink-secondary)] border-2 border-border mb-4 flex items-center justify-center">
                            <span className="text-white text-[10px] font-mono">60%</span>
                        </div>
                        <p className="font-mono text-[10px] font-bold text-ink opacity-60">INK_SECONDARY</p>
                    </div>
                </div>
            </section>

            {/* 03_Texture_Lab */}
            <section className="mb-32">
                <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">03_Texture_Lab</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                    {/* HIFI_DITHER Sample */}
                    <Card className="p-8">
                        <div className="aspect-video texture-sample bg-[color:var(--const-void)] flex items-center justify-center overflow-hidden border border-border relative">
                            <svg viewBox="0 0 200 100" className="w-full h-full">
                                <radialGradient id="lab-grad"><stop offset="0%" stopColor="var(--blue)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
                                <circle cx="100" cy="50" r="40" fill="url(#lab-grad)" />
                                <rect width="200" height="100" fill="white" filter="url(#hi-fi-stipple-global)" opacity="0.6" style={{ mixBlendMode: 'overlay' }} />
                            </svg>
                            <div className="tag-marker absolute bottom-4 right-4">HIFI_DITHER</div>
                        </div>
                        <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">Composite stipple over radial gradients for "printed" depth.</p>
                    </Card>

                    {/* Atmospheric Stipple */}
                    <Card className="p-8">
                        <div className="aspect-video w-full h-full bg-[color:var(--const-void-dark)] flex items-center justify-center relative overflow-hidden border border-border">
                            <div className="w-32 h-32 rounded-full bg-[color:var(--blue)] blur-3xl opacity-60"></div>
                            <div className="absolute inset-0 opacity-80 mix-blend-overlay"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
                            />
                            <div className="tag-marker z-20 absolute bottom-4 right-4">ATMOSPHERE:DEEP_GLOW</div>
                        </div>
                        <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">High-contrast noise over radial blurs.</p>
                    </Card>

                    {/* Industrial Grit */}
                    <Card className="p-8">
                        <div className="aspect-video w-full h-full bg-[#EBE6D7] flex items-center justify-center relative overflow-hidden border border-border">
                            <div className="absolute inset-0 opacity-40 mix-blend-multiply"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                }}
                            />
                            <div className="tag-marker !bg-[color:var(--const-void)] !text-[color:var(--const-paper)] absolute bottom-4 right-4">TEXTURE:VELLUM_GRIT</div>
                        </div>
                        <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">Multi-octave noise simulating physical pigment.</p>
                    </Card>

                    {/* Cosmos Noise */}
                    <Card className="p-8 group">
                        <div className="aspect-video w-full h-full bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden border border-border">
                            {/* Random Background Image */}
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-0 group-hover:grayscale opacity-60"
                                alt="Texture background"
                            />

                            {/* Blue radial glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--blue)_0%,_transparent_70%)] opacity-20 blur-3xl" />

                            {/* The "Living" Noise Layer */}
                            <div className="noise-living opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                                style={{
                                    filter: 'url(#cosmos-grain)',
                                    backgroundColor: 'white',
                                    zIndex: 20
                                }}
                            />

                            <div className="tag-marker z-10 absolute bottom-4 right-4 !bg-blue !text-white">SURFACE:COSMOS_ALIVE</div>
                        </div>
                        <p className="font-mono text-[9px] mt-4 opacity-50 uppercase tracking-widest">HOVER: Image shifts to B&W with high-intensity dither overlay.</p>
                    </Card>
                </div>
            </section>
            {/* 04_Typography_Hierarchy */}
            <section className="mb-32">
                <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink transition-colors duration-300">04_Typography_Hierarchy</h2>
                <div className="space-y-12">
                    <div className="border-l-4 border-ink pl-8">
                        <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Syne / 7XL (72px) / Brand</p>
                        <h3 className="brand-font text-7xl uppercase">A BETTER WAY</h3>
                    </div>
                    <div className="border-l-4 border-ink pl-8">
                        <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Syne / 8XL (96px) / Extended Title Display</p>
                        <h3 className="title-font text-8xl uppercase">FRAMELAB.ink</h3>
                    </div>
                    <div className="border-l-4 border-[color:var(--gold)] pl-8">
                        <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Space Mono / 4XL (36px)</p>
                        <h3 className="mono-font text-4xl uppercase font-black">SYS_CONNECTION_OK</h3>
                    </div>
                    <div className="border-l-4 border-[color:var(--orange)] pl-8">
                        <p className="mono-font text-[10px] uppercase tracking-widest opacity-50 mb-2">Instrument Serif / 5XL (48px)</p>
                        <h3 className="serif-italic text-5xl">the laboratory aesthetic</h3>
                    </div>
                </div>
            </section>

            {/* Instruction_Payloads - Moved from Banners */}
            <section className="mb-32">
                <h3 className="brand-font text-2xl mb-12">System_Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <BackButton
                            label="Back_to_Options"
                            onClick={() => { }}
                        />
                        <NumberedListItem
                            number="01"
                            title="Flash Pi OS Lite"
                            description={
                                <>
                                    Use <a href="#" className="underline decoration-2 underline-offset-2 hover:text-void font-bold">Raspberry Pi Imager</a> to flash standard 64-bit Lite OS.
                                </>
                            }
                        />
                        <NumberedListItem
                            number="02"
                            title="Run Installation"
                            description="Execute the command in your terminal to begin the installation."
                        />
                    </div>
                    <div className="space-y-8">
                        <CodeBlock
                            code="curl -sSL https://get.framelab.ink/install | bash"
                            accentColor="blue"
                        />
                        <CodeBlock
                            code="curl -sSL https://get.framelab.ink/add | bash"
                            accentColor="orange"
                        />
                        <div className="pt-8 space-y-4">
                            <p className="mono-font text-[10px] opacity-40 uppercase">Text_Utilities</p>
                            <div className="flex gap-4 items-center">
                                <span className="highlight-marker">/boot/</span>
                                <span className="highlight-marker">config.json</span>
                                <span className="tag-marker tag-marker-recommended">RECOMMENDED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
