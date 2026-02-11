# Frame.ink Design System // AI Context Export

**Project:** Frame.ink
**Frameworks:** React, Tailwind CSS, Lucide React
**Aesthetic:** Industrial Zen, Analog Digital, Lo-Fi Technical

This document contains the core design tokens, utility classes, and component patterns required to generate UI code that matches the Frame.ink design system.

---

## 1. Design Tokens (Tailwind Config)

### Colors
**Logical Colors (Use these primarily):**
*   `bg-paper` / `text-paper`: Canvas background (`#EBE6D7` light, `#060606` dark).
*   `bg-surface` / `text-surface`: Card/Modal background (`#FFFFFF` light, `#141414` dark).
*   `text-ink`: Primary text (`#1D1D1B` light, `#EBE6D7` dark).
*   `text-ink-secondary`: Secondary text (60% opacity).
*   `border-border`: Default border color (matches ink).

**Brand Accents:**
*   `text-blue` / `bg-blue`: `#0A32B4` (Main Action / Active).
*   `text-orange` / `bg-orange`: `#F15A24` (Warning / Alert).
*   `text-gold` / `bg-gold`: `#DBA111` (Highlight / Circuitry).
*   `text-pink` / `bg-pink`: `#F65866` (Rare Accent).

### Typography
*   **Headings:** `brand-font` (`Syne`, ExtraBold 800). Uppercase, tight tracking.
*   **Body/UI:** `mono-font` (`Space Mono`). Technical, data-heavy, uppercase for labels.
*   **Accents:** `serif-italic` (`Instrument Serif`, Italic). Used for "ink" branding.

### Effects
*   **Shadows:** Hard edge shadows. `shadow-[4px_4px_0px_0px_var(--shadow-color)]`.
*   **Borders:** 2px solid is standard (`border-2`).
*   **Corners:** Sharp (`rounded-none`) or slightly rounded (`rounded-sm`).

---

## 2. Global Utilities (global.css)

### Texture & Atmosphere
Always include these in the specific layout root if creating a new page/view.
```jsx
<div className="paper-grain opacity-50 z-[1]" />
<div className="grainy-bg opacity-30 z-[1]" />
<div className="grainy-overlay opacity-40 pointer-events-none" />
```

### Text Helpers
*   `.ink-bleed`: Adds a subtle text-shadow to simulate ink spread.
*   `.input-ritual`: Underlined input style.

---

## 3. Core Component Patterns

### Buttons
**Primary (Action):**
```jsx
<button className="btn btn-primary btn-md">ACTION_LABEL</button>
```

**Secondary (Surface):**
```jsx
<button className="btn btn-secondary btn-md">SECONDARY_ACTION</button>
```

**Tertiary (Outline/Ghost):**
```jsx
<button className="btn btn-tertiary btn-md">CANCEL</button>
```

**System/Critical:**
```jsx
<button className="btn-system-primary">CRITICAL_ACTION</button>
```

### Cards
**Standard Card:**
```jsx
<Card className="p-6">Content</Card>
```

**Interactive Card:**
```jsx
<Card interactive className="p-6 hover:translate-y-[-4px]">
    Content
</Card>
```

### Modals
**Usage:**
```jsx
<Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    title="MODAL_TITLE" 
    maxWidth="max-w-2xl"
>
    <div className="p-8">
        Content...
    </div>
</Modal>
```

### Inputs
**Ritual Input (Underlined):**
```jsx
<input 
    type="text" 
    className="input-ritual w-full" 
    placeholder="ENTER_DATA..." 
/>
```

**Dropdowns:**
Use the `<Dropdown />` component for selects to ensure custom styling.

---

## 4. Layout Patterns

### Section Header
```jsx
<div className="mb-12">
    <h2 className="brand-font text-4xl mb-4">SECTION_TITLE</h2>
    <p className="mono-font text-xs opacity-60 uppercase tracking-widest max-w-lg">
        Contextual description for this section.
    </p>
</div>
```

### Data/Label Pair
```jsx
<div className="flex flex-col gap-1">
    <span className="mono-font text-[10px] opacity-40 uppercase tracking-widest">LABEL</span>
    <span className="mono-font text-sm font-bold">DATA_VALUE</span>
</div>
```

---

## 5. Iconography
*   Library: `lucide-react`
*   Style: Thin strokes (default), crisp.
*   Usage: Often paired with `btn-icon` or inside buttons.

---

## 6. Do's and Don'ts for Code Generation

*   **DO** use uppercase for almost all UI labels and headers (`text-transform: uppercase` is often applied via class).
*   **DO** use `//` as a separator for breadcrumbs or subtitles.
*   **DO** prefer `mono-font` for any data, numbers, or technical text.
*   **DON'T** use rounded fonts or soft shadows.
*   **DON'T** use standard Tailwind gray colors (gray-100, etc.). Use `opacity` on `text-ink` instead.
