import { IFrameBackend, Img, Config } from './backend';

const API_BASE = import.meta.env.VITE_LOCAL_API_URL || 'http://frame-ink.local:8000';

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
                    // Transform local data to match Img interface
                    // Local API returns { id, name, url, size }
                    // We add a fake created timestamp or use file mtime if available
                    const mapped = data.map((d: any) => ({
                        id: d.id,
                        name: d.name,
                        url: `${API_BASE}${d.url}`, // Absolute URL to Pi
                        created: { seconds: Date.now() / 1000 } // TODO: Use real file time
                    }));
                    callback(mapped);
                }
            } catch (e) {
                console.error("Failed to fetch local images", e);
            }
        };

        fetchImages(); // Initial fetch
        this.imageInterval = window.setInterval(fetchImages, 5000); // Poll every 5s

        return () => {
            if (this.imageInterval) window.clearInterval(this.imageInterval);
        };
    }

    subscribeAuth(callback: (user: any) => void): () => void {
        // Local mode is always "authenticated" as a generic local user
        callback({ uid: 'local_user', email: 'local@frame.ink' });
        return () => { };
    }

    subscribeConfig(callback: (config: Config) => void): () => void {
        const fetchConfig = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/status`);
                if (res.ok) {
                    const data = await res.json();
                    // Map status to Config
                    // Note: Local API status is currently simple. We might need to expand it.
                    // For now, let's mock the config based on status or add a /config endpoint to python
                    callback({
                        current_image: data.current_image || '',
                        rotation: 90,
                        interval: 0 // Local mode might control schedule differently
                    });
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
        // Local API rename not implemented yet in python, we can add it later
        // For now, maybe just re-upload or implement a move endpoint
        console.warn("Rename not supported in local mode v1");
    }

    async displayImage(id: string, name: string): Promise<void> {
        await fetch(`${API_BASE}/api/display/${name}`, { method: 'POST' });
    }
}
