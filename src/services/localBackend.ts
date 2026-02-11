import { IFrameBackend, Img, Config } from './backend';

const API_BASE = import.meta.env.VITE_LOCAL_API_URL || 'http://framelab.local:8000';

export class LocalBackend implements IFrameBackend {
    // Polling intervals for local mode
    private imageInterval: number | null = null;
    private configInterval: number | null = null;

    async init() {
        // Check if API is up
        try {
            const res = await fetch(`${API_BASE}/api/status`);
            if (!res.ok) throw new Error("Local API offline");
        } catch (e) {
            console.warn("Local API not reachable yet", e);
        }
    }

    subscribeImages(callback: (images: Img[]) => void): () => void {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/images`);
                if (res.ok) {
                    const data = await res.json();
                    const mapped = data.map((d: any) => ({
                        id: d.id,
                        name: d.name,
                        url: `${API_BASE}${d.url}`,
                        created: { seconds: d.created }
                    }));
                    callback(mapped);
                }
            } catch (e) {
                console.error("Failed to fetch local images", e);
            }
        };

        fetchImages();
        this.imageInterval = window.setInterval(fetchImages, 5000);

        return () => {
            if (this.imageInterval) window.clearInterval(this.imageInterval);
        };
    }

    subscribeAuth(callback: (user: any) => void): () => void {
        callback({ uid: 'local_user', email: 'local@framelab.ink' });
        return () => { };
    }

    subscribeConfig(callback: (config: Config) => void): () => void {
        const fetchConfig = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/config`);
                if (res.ok) {
                    const data = await res.json();
                    callback(data as Config);
                }
            } catch (e) {
                // quiet fail
            }
        };

        fetchConfig();
        this.configInterval = window.setInterval(fetchConfig, 5000);

        return () => {
            if (this.configInterval) window.clearInterval(this.configInterval);
        };
    }

    async uploadImage(file: File, name: string): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${API_BASE}/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error("Upload failed");
    }

    async deleteImage(id: string): Promise<void> {
        await fetch(`${API_BASE}/api/images/${id}`, { method: 'DELETE' });
    }

    async renameImage(id: string, newName: string): Promise<void> {
        const res = await fetch(`${API_BASE}/api/images/${id}/rename`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        if (!res.ok) throw new Error("Rename failed");
    }

    async displayImage(id: string, name: string): Promise<void> {
        await fetch(`${API_BASE}/api/display/${name}`, { method: 'POST' });
    }
}
