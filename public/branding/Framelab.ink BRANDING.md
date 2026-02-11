# Brand Identity Guidelines: Frame.ink

**Version:** 1.0 // Final Baseline
**Vision:** Connecting digital consciousness with physical space through deliberate, low-friction hardware.

---

## 1. Visual Identity & Soul

Frame.ink sits at the intersection of **Brutalist Architecture** and **Calm Technology**. It is designed to feel permanent, heavy, and functionally honest.

### 1.1 Industrial Zen: The Beauty of the Bare
The aesthetic is heavily influenced by the "Good Design" principles of **Dieter Rams** and the specialized industrialism of **Teenage Engineering**. 

- **Honest Materials:** In a digital context, this means avoiding gradients that simulate plastic or fake "depth." Instead, we use flat planes of color (`Void` and `Paper`) that feel like solid material. 
- **Brutalist Restraint:** Like Brutalist architecture, we don't hide the "infrastructure." Our status indicators, ID tags (`PRF-10XX`), and grid lines are fully visible. They aren't "decorations" tacked on; they *are* the interface.
- **Minimalist Weight:** Every element on the screen should feel like it has physical mass. When a modal opens, it shouldn't "pop"—it should slide into place like a heavy mechanical drawer.

### 1.2 Analog Digital: The E-Ink Philosophy
Frame.ink rejects the "Retina Display" obsession with infinite refresh rates and millions of colors. We embrace the limitations of the medium.

- **Matte by Default:** The interface is strictly non-glossy. We use SVG filters (Noise, Stipple, Grain) to give the digital pixels a "tooth," making the screen feel more like paper than glass.
- **The Power of the Refresh:** In most apps, a flicker is a bug. In Frame.ink, the e-ink refresh cycle—the momentary flash of black and white—is a signature feature. It signals a **Ritual of Change.** It tells the user that the system is physically moving particles to create a new image.
- **Tactile Feedback:** While our buttons are on a screen, they are designed with high-contrast borders and "hard" shadows (`box-shadow: 4px 4px 0px 0px`). This creates a "clicky," mechanical feel that mimics a physical toggle switch.

### 1.3 Structured Technical: The Schematic Aesthetic
Beauty in Frame.ink is found in organization and technical clarity. 

- **Information as Art:** We use monospaced fonts and double-slash separators (`//`) to make every screen feel like a technical readout or an operations manual. 
- **The Grid as a Guide:** The layout is never "loose." Everything is locked to a strict grid, providing a sense of order and reliability. This structure is what creates the "Zen"—when the interface is perfectly ordered, the user’s mind can be at rest.
- **The Schematic Layer:** Notice the "brackets" on our cards and modals. These are simplified technical schematics. They suggest that the device is a piece of precision hardware, inviting the user to treat the interaction with the same care they would use to operate a high-end camera or a piece of laboratory equipment.

---

## 2. Typography

Our typography uses high-contrast pairings to balance geometric strength with organic elegance.

-   **Primary Display (Brand):** `Syne` (Bold/ExtraBold).
    -   Used for: Logos, H1 Headers, core calls to action.
    -   *Logic:* Rigid, geometric, and uncompromising.
-   **The "ink" Signature:** `Instrument Serif` (Italic).
    -   Used for: The "ink" suffix, pull quotes, and subtle emphasis.
    -   *Logic:* Soft, human, and fluid—primitive like a pen stroke.
-   **Technical Interface:** `Space Mono`.
    -   Used for: Meta-data, ID tags (e.g., `PRF-1002`), numbers, and system messages.
    -   *Logic:* Precision, technical documentation, legibility.
-   **Body / Utility:** `Inter`.
    -   Used for: Clean, neutral, high-legibility.

---

## 3. Color Palette (The Ritual Spectrum)

Colors are used sparingly and deliberately against a baseline of warmth and total darkness.

-   **Warm Paper (`#EBE6D7`):** The primary canvas. Warmth that avoids clinical sterile whites.
-   **Void (`#1D1D1B`):** The primary ink. A deep, heavy near-black.
-   **International Klein Blue (`#0A32B4`):** Represents "Power" and "Connectivity."
-   **Industrial Pink (`#F65866`):** The signature brand accent. Used for the "ink" logo element.
-   **Circuit Gold (`#DBA111`):** Highlights technical status and "Warning/Active" states.

---

## 4. Visual Language & Texture

Frame.ink is never "glossy." It is textured and matte.

-   **Dithering:** High-contrast dot patterns used to simulate 7-color e-ink limitations.
-   **Noise Fields:** Dynamic grain that reacts to user interaction.
-   **Stipple Overlays:** A "Hi-Fi" gritty texture applied to image previews and modals.
-   **The Double-Slash:** Universal separator for data (e.g., `SYSTEM // IDLE`).

---

## 5. Voice & Tone

The "Voice" of the system is that of a calm, reliable technical operator.

-   **Be Deliberate:** Use uppercase for technical labels (`UPLOAD_SEQUENCE`, `FRAME_SYNC`).
-   **No Fluff:** Avoid marketing jargon. Use technical but accessible terms (e.g., "Beam to Frame").
-   **The Rhythm:** Quiet. No loud animations. Elements should slide or fade with mechanical precision.
