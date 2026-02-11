import { IconButton } from '../../components/ui/IconButton';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { SettingsModal } from './components/SettingsModal';
import { EditorModal } from './components/EditorModal';
import { UrlImportModal } from './components/UrlImportModal';
import { StatusTooltip } from './components/StatusTooltip';
import { OnboardingEmptyState } from './components/OnboardingEmptyState';
import { OnboardingModal } from './components/OnboardingModal';
import { AccessDenied } from './components/AccessDenied';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { FeedbackWidget } from './components/FeedbackWidget';
import { DashboardHeader } from './components/DashboardHeader';
import { GalleryGrid } from './components/GalleryGrid';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComparisonSlider } from './components/ComparisonSlider';
import {
  Link as LinkIcon,
  Loader2,
  Upload,
  Zap,
  MoveHorizontal,
  Crop,
  RotateCw,
  FlipHorizontal,
  CheckCircle,
  Cpu,
  AlertCircle,
  Trash2,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { getBackend } from '../../services/factory';
import { IFrameBackend, Img, Config } from '../../services/backend';
import { useDemo } from '../../context/DemoContext';

const INK_PALETTE: Array<[number, number, number]> = [
  [25, 25, 30],     // Spectra Dark
  [252, 250, 244],  // Spectra Paper
  [225, 20, 35],    // Spectra Red
  [0, 140, 60],     // Spectra Green
  [10, 50, 180],    // Spectra Blue
  [255, 215, 0],    // Spectra Yellow
  [255, 115, 0],    // Spectra Orange
];



// MOCK_IMAGES removed as per user request for cloud-only operation.

// The local Icon component definition is removed as per instructions.

export default function DashboardPage() {
  const navigate = useNavigate();
  const backend = useMemo(() => getBackend(), []);
  const [user, setUser] = useState<any | null>(null);

  // Developer Testing States via URL Params
  const queryParams = new URLSearchParams(window.location.search);
  const testState = queryParams.get('test_state');

  const [approvedStatus, setApprovedStatus] = useState<'loading' | 'approved' | 'rejected' | 'none'>('loading');
  const [images, setImages] = useState<Img[]>([]); // Start empty
  const [activeImg, setActiveImg] = useState<(Img & { isNew?: boolean }) | null>(null);
  const [config, setConfig] = useState<Config>({ current_image: '', rotation: 90, interval: 60 });
  const [modals, setModals] = useState({ settings: false, url: false, onboarding: false });
  const [notification, setNotification] = useState<{ msg: string; type: 'info' | 'loading' | 'success' | 'error' } | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Loading state for flash prevention
  const { isDemo } = useDemo();

  // Ephemeral state for Demo Mode
  const [demoImages, setDemoImages] = useState<Img[]>([]); // DB-seeded for demo
  const [demoEphemeralImages, setDemoEphemeralImages] = useState<Img[]>([]); // User-added in demo
  const [demoConfig, setDemoConfig] = useState<Config>({ current_image: '', rotation: 90, interval: 60, confirmed_image: 'CONNECTED' });
  const [isMockEmpty, setIsMockEmpty] = useState(false);

  const notify = (msg: string, type: 'info' | 'loading' | 'success' | 'error' = 'info') => {
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    setNotification({ msg, type });
    if (type !== 'loading') {
      toastTimeoutRef.current = window.setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSignIn = async () => {
    try {
      if (backend.signIn) {
        await backend.signIn();
      }
    } catch (e: any) {
      console.error("Sign in error:", e);
      notify("SIGN IN FAILED", "error");
    }
  };

  const handleSignOut = async () => {
    if (backend.signOut) await backend.signOut();
    setApprovedStatus('none');
    navigate('/');
  };

  const handleDemoImageUpdate = (img: Img) => {
    setDemoEphemeralImages(prev => {
      const exists = prev.find(i => i.id === img.id);
      if (exists) {
        return prev.map(i => i.id === img.id ? img : i);
      }
      return [img, ...prev];
    });
  };

  // Cloud init
  useEffect(() => {
    // Force test states if param present
    if (testState === 'denied') {
      setApprovedStatus('rejected');
      setIsInitialLoading(false);
      return;
    }
    if (testState === 'empty') {
      setApprovedStatus('approved');
      setImages([]);
      setIsInitialLoading(false);
      return;
    }

    let unsubConfig: (() => void) | undefined;
    let unsubImages: (() => void) | undefined;
    let unsubAuth: (() => void) | undefined;

    // --- DEMO MODE (CLOUD LANDING) ---
    // Kept completely separate from backend service to ensure reliability
    if (isDemo) {
      setApprovedStatus('approved');
      setDemoConfig({ current_image: 'TADANORI.png', rotation: 90, interval: 60, confirmed_image: 'CONNECTED' });

      // Fallback premium images to ensure demo is NEVER empty
      const fallbacks: Img[] = [
        { id: 'fallback_1', name: 'TADANORI.png', url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800' },
        { id: 'fallback_2', name: 'HIROSHI.png', url: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=800' },
        { id: 'fallback_3', name: 'NOMA_BAR.png', url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800' },
        { id: 'fallback_4', name: 'JEAN_JULLIEN.png', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
        { id: 'fallback_5', name: 'GEOFF_MCFETRIDGE.png', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800' },
      ];

      // For demo, we still peek at DB if we can, but fallback is primary
      unsubImages = backend.subscribeImages((list) => {
        if (isMockEmpty) {
          setDemoImages([]);
          setIsInitialLoading(false);
          return;
        }

        // Show all images from DB in demo mode instead of filtering by artist
        // This ensures photos previously "stored" are actually visible
        const fromDb = list;

        const uniqueFallbacks = fallbacks.filter(fallback =>
          !fromDb.some(dbImg => dbImg.name === fallback.name)
        );

        const combinedImages = [
          ...demoEphemeralImages,
          ...fromDb.filter(dbImg => !demoEphemeralImages.some(eImg => eImg.id === dbImg.id)),
          ...uniqueFallbacks.filter(fImg => !demoEphemeralImages.some(eImg => eImg.id === fImg.id) && !fromDb.some(dbImg => dbImg.id === fImg.id))
        ];

        setDemoImages(combinedImages);
        setIsInitialLoading(false);
      });
      return () => unsubImages?.();
    }

    // --- REAL MODE (LOCAL or CLOUD) ---
    unsubAuth = backend.subscribeAuth(async (u) => {
      setUser(u);
      if (!u) {
        setApprovedStatus('none');
        setIsInitialLoading(false);
        return;
      }

      // Check beta approval (Cloud only)
      // For local, verify logic should auto-approve or be skipped
      let approved = 'approved';

      if (backend.checkApproval && u.email) {
        try {
          approved = await backend.checkApproval(u.email);
        } catch (e) {
          console.error("Approval check failed", e);
          approved = 'rejected';
        }
      }

      if (approved === 'approved') {
        setApprovedStatus('approved');

        unsubConfig = backend.subscribeConfig((cfg) => {
          setConfig(cfg);
        });

        unsubImages = backend.subscribeImages((list) => {
          setImages(prev => {
            const urlMap = new Map(prev.map(i => [i.id, i.url]));
            list.forEach(img => {
              if (urlMap.has(img.id) && urlMap.get(img.id) !== img.url) {
                setLoaded(old => {
                  const next = new Set(old);
                  next.delete(img.id);
                  return next;
                });
              }
            });
            return list;
          });
          setIsInitialLoading(false);
        });
      } else {
        setApprovedStatus('rejected');
        setIsInitialLoading(false);
      }
    });

    return () => {
      unsubConfig?.();
      unsubImages?.();
      unsubAuth?.();
    };
  }, [isDemo, demoEphemeralImages, isMockEmpty]); // Added isMockEmpty to dependency array

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProcessing(true);

    // Failsafe: Client-side resize before setting state to prevent memory issues with large files
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Max dimension for "Pre-crop" workspace helps performance
          const MAX_DIM = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Use JPEG for working copy to save memory (Cropper will output PNG later)
          const resizedUrl = canvas.toDataURL('image/jpeg', 0.9);

          setActiveImg({ url: resizedUrl, name: file.name.toUpperCase(), isNew: true, id: 'PENDING' });
          setProcessing(false);
        };
        img.src = String(event.target?.result);
      };
      reader.readAsDataURL(file);
    }, 50);
  };


  const sendToFrame = async (img: Img) => {
    if (!user && !isDemo) return;

    if (isDemo) {
      setDemoConfig(prev => ({ ...prev, current_image: img.name }));
      notify('DISPLAY_SIMULATED', 'success');
      setActiveImg(null);
      return;
    }

    notify('DISPLAYING_ON_FRAME...', 'loading');
    try {
      await backend.displayImage(img.id, img.name);
      notify('IMAGE_DISPLAYED', 'success');
      setActiveImg(null); // Close modal on success to prevent spamming
    } catch (e: any) {
      console.error("Send to Frame Error:", e);
      notify(`SEND FAILED: ${e.message}`, 'error');
    }
  };

  const [deleteCandidate, setDeleteCandidate] = useState<Img | null>(null);

  const confirmPurge = async () => {
    if (!deleteCandidate) return;
    try {
      if (isDemo) {
        setDemoEphemeralImages(prev => prev.filter(i => i.id !== deleteCandidate.id)); // Use demoEphemeralImages
        notify('ITEM PURGED (DEMO)', 'success');
      } else {
        await backend.deleteImage(deleteCandidate.id);
        notify('ITEM PURGED', 'success');
      }
    } catch (e: any) {
      console.error("Purge Error:", e);
      notify('PURGE FAILED', 'error');
    }
    setDeleteCandidate(null);
  };

  const handleRename = async () => {
    if (!activeImg || !renameValue.trim() || activeImg.isNew) return;
    try {
      setProcessing(true);
      const newName = renameValue.trim().endsWith('.png') ? renameValue.trim() : `${renameValue.trim()}.png`;
      if (isDemo) {
        setDemoEphemeralImages(prev => prev.map(i => i.id === activeImg.id ? { ...i, name: newName } : i)); // Use demoEphemeralImages
        notify('IMAGE RENAMED (DEMO)', 'success');
      } else {
        await backend.renameImage(activeImg.id, newName);
        notify('IMAGE RENAMED', 'success');
      }
      setIsRenaming(false);
      // Update local state immediately for better UX
      setActiveImg(prev => prev ? { ...prev, name: newName } : null);
    } catch (error) {
      console.error(error);
      notify('RENAME FAILED', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const randomBeam = () => {
    const list = isDemo ? [...demoEphemeralImages, ...demoImages] : images; // Combine for random beam
    if (list.length === 0) return;
    void sendToFrame(list[Math.floor(Math.random() * list.length)]!);
  };

  if (approvedStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper relative overflow-hidden">
        <div className="grainy-bg" />
        <div className="flex flex-col items-center gap-6 relative z-10">
          <Loader2 className="animate-spin text-blue" size={48} />
          <span className="mono-font text-xs font-black uppercase tracking-[0.4em] opacity-40">CHECKING_STATUS...</span>
        </div>
      </div>
    );
  }

  if (!user && !isDemo && !testState) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-paper relative overflow-hidden">
        <div className="grainy-bg" />
        <div className="atmosphere-bg" />
        <div className="relative z-10 max-w-md w-full text-center">
          <h1 className="brand-font mb-4 leading-none uppercase transition-colors duration-300">
            <span className="text-5xl">Frame</span>
            <span className="serif-italic lowercase text-blue text-4xl">ink</span>
          </h1>
          <p className="mono-font text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-60">SYSTEM_LOGIN // AUTHORIZATION</p>

          <Card className="p-12 text-center bg-surface shadow-[8px_8px_0px_0px_var(--shadow-color)]">
            <h3 className="brand-font text-3xl mb-8 uppercase leading-tight">AUTHORIZE<br />ACCESS</h3>
            <button
              onClick={handleSignIn}
              className="btn btn-primary btn-lg w-full flex items-center justify-center gap-4 group"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              Connect with Google
            </button>
            <div className="mt-8 pt-8 border-t border-ink/10">
              <p className="mono-font text-[9px] font-black uppercase tracking-wider opacity-40 leading-relaxed text-center">
                This is a private beta service.<br />Whitelist registration required.
              </p>
            </div>
          </Card>

          <button
            onClick={() => window.location.href = '/'}
            className="btn btn-tertiary px-8 py-3 mt-12 gap-3"
          >
            <ArrowLeft size={16} /> BACK TO LANDING
          </button>
        </div>
      </div>
    );
  }

  if (approvedStatus === 'rejected') {
    return (
      <AccessDenied
        email={user?.email || 'TEST_USER@EXAMPLE.COM'}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-16 flex flex-col items-center max-w-[1600px] mx-auto">
      <div className="grainy-overlay" />
      <div className="grainy-bg" />
      <div className="atmosphere-bg" />

      {/* Header */}
      <div className="fixed bottom-0 left-0 z-0 pointer-events-none p-0 select-none overflow-hidden h-screen w-screen flex items-end justify-start">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Cpath d='M250 500 L50 250 L250 0 L450 250 Z' fill='none' stroke='%231D1D1B' stroke-width='5'/%3E%3Ccircle cx='250' cy='250' r='150' fill='none' stroke='%231D1D1B' stroke-width='10'/%3E%3C/svg%3E"
          className="h-[70vh] w-auto opacity-[0.05] -translate-x-1/4 translate-y-1/4"
          alt="Watermark"
        />
      </div>

      <DashboardHeader
        user={user}
        isDemo={isDemo}
        testState={testState}
        imagesCount={isDemo ? (demoEphemeralImages.length + demoImages.length) : images.length}
        processing={processing}
        handleFileUpload={handleFileUpload}
        onOpenUrlImport={() => setModals((m) => ({ ...m, url: true }))}
        onOpenSettings={() => setModals((m) => ({ ...m, settings: true }))}
        onRandomBeam={randomBeam}
        onOpenOnboarding={import.meta.env.VITE_APP_MODE === 'self_hosted' ? () => { } : () => setModals(m => ({ ...m, onboarding: true }))}
        isMockEmpty={isMockEmpty}
        toggleMockSetup={() => {
          if (isMockEmpty) {
            setIsMockEmpty(false);
            setDemoConfig(prev => ({ ...prev, confirmed_image: 'CONNECTED' }));
          } else {
            setIsMockEmpty(true);
            setDemoEphemeralImages([]);
            setDemoConfig(prev => ({ ...prev, confirmed_image: undefined }));
          }
        }}
      />

      {/* Gallery Grid */}
      <GalleryGrid
        isInitialLoading={isInitialLoading}
        isDemo={isDemo}
        images={images}
        demoImages={demoImages}
        demoEphemeralImages={demoEphemeralImages}
        demoConfig={demoConfig}
        config={config}
        processing={processing}
        loaded={loaded}
        onImageLoad={(id) => setLoaded(prev => new Set(prev).add(id))}
        setActiveImg={setActiveImg}
        onSendToFrame={sendToFrame}
        onOpenOnboarding={import.meta.env.VITE_APP_MODE === 'self_hosted' ? () => { } : () => setModals(m => ({ ...m, onboarding: true }))}
        isMockEmpty={isMockEmpty}
      />

      {/* Edit Modal - Now using extracted component */}
      {activeImg && (
        <EditorModal
          activeImg={activeImg}
          setActiveImg={setActiveImg}
          config={isDemo ? demoConfig : config}
          backend={backend}
          user={user}
          notify={notify}
          sendToFrame={sendToFrame}
          onImageUpdate={isDemo ? handleDemoImageUpdate : undefined}
          onDelete={() => {
            setDeleteCandidate(activeImg);
            setActiveImg(null); // Close editor
          }}
          hardwareConnected={isDemo || import.meta.env.VITE_APP_MODE === 'self_hosted' || !!(isDemo ? demoConfig : config).confirmed_image}
        />
      )}

      {/* Critical Delete Modal */}
      <Modal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        variant="critical"
        maxWidth="max-w-2xl"
        title="DELETE_PROTOCOL"
      >
        <div className="p-12 relative text-center text-void">
          <h3 className="brand-font text-5xl mb-6 uppercase">DELETE_PIECE?</h3>
          <div className="mb-10">
            <p className="mono-font text-xs font-black uppercase tracking-[0.2em] opacity-80">
              DELETE_PROTOCOL // <span className="bg-void text-white px-2 py-0.5">{deleteCandidate?.name}</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className="btn-system-primary flex-1 bg-void text-white h-16 text-sm font-black tracking-[0.2em] uppercase border-2 border-void hover:bg-void/90 transition-all font-black"
              onClick={confirmPurge}
            >
              EXECUTE_DELETE
            </button>
            <button
              className="btn btn-tertiary flex-1 h-16 text-[10px] font-black tracking-widest uppercase border-2 border-void text-void hover:bg-void hover:text-white transition-all bg-transparent font-black"
              onClick={() => setDeleteCandidate(null)}
            >
              CANCEL_ACTION
            </button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal - Now using extracted component */}
      {
        modals.settings && (
          <SettingsModal
            isOpen={modals.settings}
            onClose={() => setModals((m) => ({ ...m, settings: false }))}
            config={isDemo ? demoConfig : config}
            setConfig={isDemo ? setDemoConfig : setConfig}
            notify={notify}
            onSignOut={handleSignOut}
            user={user}
            isDemo={isDemo}
          />
        )}

      {/* Onboarding Modal */}
      {
        modals.onboarding && (
          <OnboardingModal
            isOpen={modals.onboarding}
            onClose={() => setModals((m) => ({ ...m, onboarding: false }))}
            onComplete={(handshakeData) => {
              console.log('Hardware connected:', handshakeData);
              notify('HARDWARE_CONNECTED', 'success');

              // Optimistic local update to hide the card immediately
              if (isDemo) {
                setDemoConfig(prev => ({ ...prev, confirmed_image: 'CONNECTED' }));
              } else {
                setConfig(prev => ({ ...prev, confirmed_image: 'CONNECTED' }));
                if (user) {
                  backend.displayImage('CONNECTION_ACK', 'CONNECTED').catch(e => console.error("Failed to persist connection status:", e));
                }
              }

              setModals((m) => ({ ...m, onboarding: false }));
            }}
            isDemo={isDemo}
          />
        )}

      {/* URL Import Modal */}
      {
        modals.url && (
          <UrlImportModal
            isOpen={modals.url}
            onClose={() => setModals((m) => ({ ...m, url: false }))}
            onImport={async (url) => {
              const fetchImage = async (targetUrl: string) => {
                const res = await fetch(targetUrl);
                if (!res.ok) throw new Error('Network response was not ok');
                return res.blob();
              };

              try {
                let blob;
                try {
                  // Attempt 1: Direct Fetch (works for CORS-enabled sources like Unsplash)
                  blob = await fetchImage(url);
                } catch (directError) {
                  console.warn("Direct fetch failed, attempting proxy...", directError);
                  // Attempt 2: CORS Proxy (wsrv.nl - robust, respects privacy, handles redirects)
                  // output=png ensures consistent format
                  const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=png`;
                  blob = await fetchImage(proxyUrl);
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target?.result) {
                    setActiveImg({
                      url: e.target.result as string,
                      name: 'IMPORTED_ARTIFACT.png',
                      isNew: true,
                      id: 'PENDING'
                    });
                  }
                };
                reader.readAsDataURL(blob);

              } catch (error) {
                console.error("Import failed:", error);
                throw error;
              }
            }}
          />
        )}


      {/* Toast */}
      {
        notification && (
          <div className="fixed bottom-12 left-0 right-0 mx-auto w-fit z-[300] animate-toast-up text-ink">
            <div className="bg-[#1D1D1B] text-[#EBE6D7] px-12 py-5 border-[2.5px] border-[#EBE6D7] shadow-[6px_6px_0px_0px_rgba(29,29,27,0.5)] flex items-center gap-5 min-w-[340px] justify-center">
              {notification.type === 'loading' ? (
                <Loader2 size={22} className="animate-spin" />
              ) : notification.type === 'success' ? (
                <CheckCircle size={22} className="text-green-400" />
              ) : notification.type === 'error' ? (
                <AlertCircle size={22} className="text-red-400" />
              ) : (
                <Zap size={22} />
              )}
              <span className="font-black uppercase tracking-[0.25em] text-[12px] leading-none">{notification.msg}</span>
            </div>
          </div>
        )}

      {/* Feedback Widget - Hidden in Demo and Self-Hosted modes */}
      {!isDemo && import.meta.env.VITE_APP_MODE !== 'self_hosted' && (
        <FeedbackWidget user={user} notify={notify} />
      )}
    </div >
  );
}
