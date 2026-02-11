export const SPECTRA_PALETTE = [
    { r: 25, g: 25, b: 30 },    // Black
    { r: 252, g: 250, b: 244 }, // White
    { r: 225, g: 20, b: 35 },   // Red
    { r: 0, g: 140, b: 60 },    // Green
    { r: 10, g: 50, b: 180 },   // Blue
    { r: 255, g: 215, b: 0 },   // Yellow
    { r: 255, g: 115, b: 0 },   // Orange
];

// Weights for Euclidean distance
const W_R = 0.29;
const W_G = 0.55;
const W_B = 0.45; // As requested, though sum > 1

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
    return (
        W_R * (r1 - r2) ** 2 +
        W_G * (g1 - g2) ** 2 +
        W_B * (b1 - b2) ** 2
    );
}

function findClosestColor(r: number, g: number, b: number) {
    let minDist = Infinity;
    let closest = SPECTRA_PALETTE[0];

    for (const color of SPECTRA_PALETTE) {
        const dist = colorDistance(r, g, b, color.r, color.g, color.b);
        if (dist < minDist) {
            minDist = dist;
            closest = color;
        }
    }
    return closest;
}

export function processImage(
    imgData: ImageData,
    gamma: number = 1.1,
    ditherStrength: number = 0.75
): ImageData {
    const width = imgData.width;
    const height = imgData.height;
    const data = new Uint8Array(imgData.data); // Copy to avoid mutating original if needed, but we usually want a new buffer

    // Float32 for error accumulation accuracy
    const buf = new Float32Array(width * height * 3);

    // 1. Apply Gamma & Fill Buffer
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Gamma correction: P' = 255 * (P / 255) ^ Gamma
        // Note: User asked for Gamma Correction (1.1).
        // Often this implies power(1/1.1) for decoding, but "Apply Gamma 1.1" usually assumes power(1.1).
        // Given E-Ink context, contrast increase is likely desired.
        const idx = (i / 4) * 3;
        buf[idx] = 255 * Math.pow(r / 255, gamma);
        buf[idx + 1] = 255 * Math.pow(g / 255, gamma);
        buf[idx + 2] = 255 * Math.pow(b / 255, gamma);
    }

    // 2. Floyd-Steinberg Dithering
    // 7/16, 3/16, 5/16, 1/16
    const w7 = (7 / 16) * ditherStrength;
    const w3 = (3 / 16) * ditherStrength;
    const w5 = (5 / 16) * ditherStrength;
    const w1 = (1 / 16) * ditherStrength;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 3;

            const oldR = buf[i];
            const oldG = buf[i + 1];
            const oldB = buf[i + 2];

            const closest = findClosestColor(oldR, oldG, oldB);

            // Quantize
            buf[i] = closest.r;
            buf[i + 1] = closest.g;
            buf[i + 2] = closest.b;

            // Error
            const errR = oldR - closest.r;
            const errG = oldG - closest.g;
            const errB = oldB - closest.b;

            // Distribution
            // Right (+1, 0)
            if (x + 1 < width) {
                const ni = (y * width + (x + 1)) * 3;
                buf[ni] += errR * w7;
                buf[ni + 1] += errG * w7;
                buf[ni + 2] += errB * w7;
            }

            // Bottom Left (-1, +1)
            if (y + 1 < height && x - 1 >= 0) {
                const ni = ((y + 1) * width + (x - 1)) * 3;
                buf[ni] += errR * w3;
                buf[ni + 1] += errG * w3;
                buf[ni + 2] += errB * w3;
            }

            // Bottom (0, +1)
            if (y + 1 < height) {
                const ni = ((y + 1) * width + x) * 3;
                buf[ni] += errR * w5;
                buf[ni + 1] += errG * w5;
                buf[ni + 2] += errB * w5;
            }

            // Bottom Right (+1, +1)
            if (y + 1 < height && x + 1 < width) {
                const ni = ((y + 1) * width + (x + 1)) * 3;
                buf[ni] += errR * w1;
                buf[ni + 1] += errG * w1;
                buf[ni + 2] += errB * w1;
            }
        }
    }

    // 3. Write back to Uint8ClampedArray
    const output = new Uint8ClampedArray(imgData.data.length);
    for (let i = 0; i < buf.length / 3; i++) {
        const idx = i * 4;
        const bIdx = i * 3;
        output[idx] = buf[bIdx];
        output[idx + 1] = buf[bIdx + 1];
        output[idx + 2] = buf[bIdx + 2];
        output[idx + 3] = 255; // Alpha
    }

    return new ImageData(output, width, height);
}
