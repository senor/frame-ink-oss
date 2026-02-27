import React, { useState } from 'react';
import { Dropdown } from '../../../components/ui/Dropdown';
import { SegmentedControl } from '../../../components/ui/SegmentedControl';

export const StyleGuideForms = () => {
    const [demoOrientation, setDemoOrientation] = useState(0);
    const [powerMode, setPowerMode] = useState<string | number>('active');

    return (
        <>
            <section className="mb-40">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">10_Form_Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Dropdowns */}
                    <div className="space-y-8">
                        <h3 className="brand-font text-2xl">Dropdowns</h3>
                        <Dropdown
                            label="Update Frequency"
                            value={60}
                            onChange={() => { }}
                            options={[
                                { value: 60, label: 'Every Hour' },
                                { value: 30, label: 'Every 30 Minutes' },
                                { value: 0, label: 'Manual Only' }
                            ]}
                        />
                        <Dropdown
                            label="Connection Type"
                            value="wifi"
                            onChange={() => { }}
                            options={[
                                { value: 'wifi', label: 'Wireless (WiFi)' },
                                { value: 'eth', label: 'Ethernet (LAN)' }
                            ]}
                        />
                    </div>

                    {/* Segmented Controls */}
                    <div className="space-y-8">
                        <h3 className="brand-font text-2xl">Segmented Controls</h3>
                        <SegmentedControl
                            label="Orientation"
                            value={demoOrientation}
                            onChange={setDemoOrientation}
                            options={[
                                { value: 0, label: 'Landscape' },
                                { value: 90, label: 'Portrait' }
                            ]}
                        />
                        <SegmentedControl
                            label="Power Mode"
                            value={powerMode}
                            onChange={setPowerMode}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'eco', label: 'Eco Save' },
                                { value: 'sleep', label: 'Deep Sleep' }
                            ]}
                        />
                    </div>
                </div>
            </section>

            <section className="mb-32">
                <h2 className="mono-font text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-30 text-ink">12_Form_System</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-8">
                        <input type="text" className="input-ritual" placeholder="ENTER_PAIRED_UID..." />
                        <div className="relative">
                            <select className="input-ritual appearance-none cursor-pointer">
                                <option>REFRESH_60M</option>
                                <option>REFRESH_30M</option>
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                        </div>
                    </div>
                    <div className="space-y-8 opacity-50">
                        <input type="text" className="input-ritual" placeholder="DISABLED_INPUT" disabled />
                    </div>
                </div>
            </section>
        </>
    );
};
