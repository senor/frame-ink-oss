export interface Img {
    id: string;
    name: string;
    url: string;
    created?: { seconds?: number };
}

export interface Config {
    current_image: string;
    confirmed_image?: string;
    rotation: number;
    interval: number;
}

export type BackendType = 'firebase' | 'local';

export interface IFrameBackend {
    /** Initialize connection (auth, sockets, etc) */
    init?(): Promise<void>;

    /** Subscribe to image list updates */
    subscribeImages(callback: (images: Img[]) => void): () => void;

    /** Subscribe to config updates */
    subscribeConfig(callback: (config: Config) => void): () => void;

    /** Upload a new image */
    uploadImage(file: File, name: string): Promise<void>;

    /** Delete an image */
    deleteImage(id: string): Promise<void>;

    /** Rename an image */
    renameImage(id: string, newName: string): Promise<void>;

    /** Trigger display update */
    displayImage(id: string, name: string): Promise<void>;

    /** Sign in (Cloud only) */
    signIn?(): Promise<void>;

    /** Sign out (Cloud only) */
    signOut?(): Promise<void>;

    /** Subscribe to auth state changes */
    subscribeAuth(callback: (user: any) => void): () => void;

    /** Check user Beta status (Cloud only) */
    checkApproval?(email: string): Promise<'loading' | 'approved' | 'rejected'>;
}
