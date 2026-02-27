import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';

interface StyleGuideModalsProps {
    setShowOnboarding: (show: boolean) => void;
    setShowSettings: (show: boolean) => void;
    setShowCritical: (show: boolean) => void; // wait, showCritical was local? 
    setActiveEditorImage: (img: any) => void;
    setShowUrlImport: (show: boolean) => void;
    setShowBetaSignup: (show: boolean) => void;
}

export const StyleGuideModals = ({
    setShowOnboarding,
    setShowSettings,
    setActiveEditorImage,
    setShowUrlImport,
    setShowBetaSignup
}: Omit<StyleGuideModalsProps, 'setShowCritical'>) => {
    // Local state for example modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCritical, setShowCritical] = useState(false);

    // Mock Data for Editor Preview
    const mockImage = {
        id: 'mock-1',
        name: 'TEST_PATTERN.png',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        isNew: false
    };

    const mockNewImage = {
        ...mockImage,
        id: 'mock-new-1',
        name: 'NEW_UPLOAD.png',
        isNew: true
    };

    return (
        <section className="mb-40">
            <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-12 opacity-30 text-ink transition-colors duration-300">09_Modals</h2>
            <div className="flex flex-wrap gap-4">
                <button className="btn btn-secondary px-8 py-4" onClick={() => setIsModalOpen(true)}>1. Generic_Modal</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setShowOnboarding(true)}>2. Onboarding_System</button>
                <button className="btn btn-primary px-8 py-4" onClick={() => setShowSettings(true)}>3. System_Settings</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setShowCritical(true)}>4. Critical_Action</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setActiveEditorImage(mockImage)}>5. Simulator_View</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setShowUrlImport(true)}>6. Import_Source</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setShowBetaSignup(true)}>7. Beta_Access</button>
                <button className="btn btn-secondary px-8 py-4" onClick={() => setActiveEditorImage(mockNewImage)}>8. Workbench_Tool</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="System_Alert_Module">
                <div className="p-12 text-center">
                    <h2 className="text-4xl brand-font mb-4 text-ink">Attention Required</h2>
                    <p className="mono-font text-xs mb-8 max-w-sm mx-auto font-black opacity-60 tracking-tight uppercase">Processing interrupted by external signal interference.</p>
                    <button className="btn btn-primary btn-lg w-full" onClick={() => setIsModalOpen(false)}>Acknowledge Signal</button>
                </div>
            </Modal>

            <Modal isOpen={showCritical} onClose={() => setShowCritical(false)} variant="critical" maxWidth="max-w-2xl" title="DELETE_PROTOCOL">
                <div className="flex flex-col gap-10 text-center pt-4 text-void">
                    <h3 className="brand-font text-6xl uppercase leading-none">DELETE IMAGE?</h3>

                    <div className="mb-2">
                        <p className="mono-font text-xs font-black uppercase tracking-[0.2em] opacity-80">
                            DELETE_PROTOCOL // <span className="bg-void text-white px-2 py-0.5 whitespace-nowrap">TADANORI_2.PNG</span>
                        </p>
                    </div>


                    <div className="flex gap-4">
                        <button className="btn-system-primary flex-1 bg-void text-white h-16 border-2 border-void uppercase font-black hover:bg-void/90 transition-all font-black text-sm tracking-[0.2em]" onClick={() => setShowCritical(false)}>
                            DELETE
                        </button>
                        <button className="btn btn-tertiary flex-1 border-2 border-void text-void h-16 uppercase font-black text-sm tracking-[0.2em] hover:bg-void hover:text-white transition-all bg-transparent" onClick={() => setShowCritical(false)}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};
