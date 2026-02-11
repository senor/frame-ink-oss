# Gemini Veo 3.1 // Creative Guidance Baseline

**Project:** Frame.ink
**Aesthetic:** Grounded Industrial / Lo-Fi Sci-Fi / Analog Digital

This document serves as a baseline for generating video and static assets for Frame.ink using Gemini Veo 3.1, ensuring consistency with the visual identity.

---

## 1. Core Visual Pillars

*   **Industrial Zen:** The intersection of raw, utilitarian industrial design and calming, minimalist spaces. Think **Dieter Rams** meets **Brutalist Architecture**.
*   **Analog Digital:** Digital interfaces that feel physical—e-ink, matte screens, clicky buttons, tactile feedback. Avoid "holographic" or "glossy" sci-fi tropes.
*   **Structured Technical:** Beauty found in schematics, grids, and technical layouts. Information is decoration.

## 2. Materials & Textures

When prompting for textures and surfaces:

*   **Primary:** E-ink display (matte, paper-like, high contrast, slow refresh).
*   **Secondary:** Brushed Aluminum, Matte Black Plastic (Polycarbonate), Raw Concrete, Cardboard.
*   **Imperfections:** Dust, film grain, chromatic aberration (subtle), dithering patterns, scanlines (faint).

## 3. Lighting & Atmosphere

*   **Lighting:** Soft, diffused studio lighting. "God rays" or volumetric lighting for mood. High contrast shadows for drama (Chiaroscuro).
*   **Colors:**
    *   **Canvas:** `#EBE6D7` (Warm Paper)
    *   **Void:** `#1D1D1B` (Near Black, not pure #000)
    *   **Accents:** `#0A32B4` (International Klein Blue), `#F65866` (Warm Pink), `#DBA111` (Circuit Gold).
*   **Vibe:** Quiet, contemplative, heavy, deliberate.

## 4. Motion Principles (For Video Generation)

*   **Speed:** Slow, deliberate, mechanical. Avoid "woosh" or fast cuts.
*   **Refresh Cycle:** Simulate the e-ink refresh—flash to black, flash to white, ghosting, then settle.
*   **Camera:** Fixed tripod or very slow, steady pans (dolly). Macro shots of details.
*   **Interface:** Text types out (teletype style). Elements slide in on a grid. No bouncing or elasticity.

---

## 5. Prompt Engineering Guide

### Keywords (Positive)
`macro photography`, `product design`, `Dieter Rams`, `Teenage Engineering`, `e-ink display`, `matte texture`, `film grain`, `kodak portra`, `warm lighting`, `technical schematic`, `user interface`, `monospaced font`, `industrial machinery`, `start-up sequence`, `glitch art`, `dithering`.

### Keywords (Negative)
`3d render`, `blender guru`, `glossy`, `neon`, `cyberpunk`, `vaporwave`, `high saturation`, `cartoon`, `anime`, `distorted text`, `lens flare`, `bokeh overload`, `morphing`.

### Example Prompts

**Scenario A: Product Reveal**
> "Cinematic macro shot of a matte black industrial device with a large e-ink screen. The screen is refreshing, flashing from black to white with digital noise artifacts. Soft warm lighting. 50mm lens. High texture. Photorealistic."

**Scenario B: UI Interaction**
> "Close up of a retro-futuristic digital interface. Monospace text scrolling green on black. Grid lines. Analog interference. The screen flickers slightly like a CRT monitor. Minimalist design. 4k resolution."

**Scenario C: Mood / Atmosphere**
> "A quiet minimalist desk setup. A Frame.ink device sits on a concrete surface. Soft sunlight streaming through a window, casting long shadows. Dust motes dancing in the light. The device displays a monochrome Japanese woodblock print. Zen atmosphere."

---

## 6. Technical Specifics (Frame.ink DNA)

*   **Aspect Ratio:** 16:9 (Cinematic) or 4:5 (Vertical/Portrait for the device itself).
*   **Fonts:** `Syne` (Bold, geometric) for headers. `Space Mono` for data/code.
*   **UI Elements:** Use `//` as separators (e.g., `SYSTEM // IDLE`). Underlined "Ritual" inputs.

---

## 7. Technical Illustration Standards (Complete Library)

Reference these 13 specific visual patterns found in the Style Guide when generating technical assets:

### A. Logic & System Layers
*   **Seed Architect:** Nested rectangular frames with extending "circuit" lines. Self-drawing, step-wise construction.
*   **Symmetrical Core (Void Nexus):** Perfect concentric circles and rotating dials aligning to a central axis. "Gyroscope" aesthetic.
*   **Orbital Pulse:** Dashed circles with a rotating "radar" dial.
*   **Nested Frames:** Rectangular grid that pulses and reacts to focus/cursor.

### B. Data & Matrix Layers
*   **Particle Flux:** Organic clusters of small dots (`r=2-8`) drifting like dust or stars. Reactive dispersion.
*   **Dot Field:** Structured 8x8 grid of dots that fade/pulse in waves.
*   **Stream Flow:** Cascading terminal text (`> FRAME_SYNC_001`) with a blinking cursor.
*   **Vertical Sweep:** A scanning beam moving vertically across a defined square frame.

### C. Signal & Analog Layers
*   **Signal Wave:** Oscillating sine waves with ghosting/interference trails using dashed lines.
*   **Refresh Cycle:** Horizontal black/white bands simulating an e-ink screen refresh.

### D. Surface & Texture Layers
*   **Grain Flow:** Gradient noise textures that shift based on focus.
*   **Noise Field:** A dense field of dots that repel away from a central point (magnetic repulsion).
*   **Dotted Grid:** A subtle background grid of uniform dots.
