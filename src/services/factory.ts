import { IFrameBackend } from './backend';
import { LocalBackend } from './localBackend';

export function getBackend(): IFrameBackend {
    return new LocalBackend();
}
