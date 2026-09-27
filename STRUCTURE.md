# OSHO Interactive Documentary — Project Structure

**Document:** Structure  
**Version:** 1.0  
**Purpose:** Canonical repository and code organization contract

---

## 1. Repository Root

Recommended structure:

```text
osho-documentary/
│
├── PRD.md
├── TRD.md
├── STRUCTURE.md
├── DESIGN.md
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── index.html
│
├── public/
│   ├── favicon.svg
│   ├── og/
│   │   └── og-image.png
│   └── assets/
│       ├── textures/
│       └── models/
│
├── source/
│   └── OSHO_Rajneesh_Documentary_Report.docx
│
├── scripts/
│   └── validateContent.ts
│
└── src/
    ├── main.tsx
    ├── App.tsx
    │
    ├── app/
    │   ├── AppShell.tsx
    │   └── ErrorBoundary.tsx
    │
    ├── components/
    │   │
    │   ├── 3d/
    │   │   ├── DocumentaryCanvas.tsx
    │   │   ├── World.tsx
    │   │   ├── CameraRig.tsx
    │   │   ├── Environment.tsx
    │   │   ├── Terrain.tsx
    │   │   ├── PathSystem.tsx
    │   │   ├── ArchitectureSystem.tsx
    │   │   ├── VegetationSystem.tsx
    │   │   ├── ArtifactSystem.tsx
    │   │   ├── Atmosphere.tsx
    │   │   ├── LightingSystem.tsx
    │   │   └── SceneFallback.tsx
    │   │
    │   ├── documentary/
    │   │   ├── DocumentaryLayer.tsx
    │   │   ├── ChapterOverlay.tsx
    │   │   ├── ChapterTitle.tsx
    │   │   ├── ParagraphBlock.tsx
    │   │   ├── QuoteBlock.tsx
    │   │   ├── AnalysisBlock.tsx
    │   │   ├── TimelineBlock.tsx
    │   │   ├── StatementBlock.tsx
    │   │   └── ReferenceBlock.tsx
    │   │
    │   └── ui/
    │       ├── ChapterIndicator.tsx
    │       ├── ScrollHint.tsx
    │       ├── ProgressLine.tsx
    │       └── AccessibilityControls.tsx
    │
    ├── content/
    │   ├── documentary.ts
    │   ├── chapters.ts
    │   ├── references.ts
    │   └── types.ts
    │
    ├── config/
    │   ├── site.ts
    │   ├── runtime.ts
    │   └── quality.ts
    │
    ├── hooks/
    │   ├── useScrollProgress.ts
    │   ├── useChapterProgress.ts
    │   ├── useReducedMotion.ts
    │   ├── useQualityLevel.ts
    │   └── usePageVisibility.ts
    │
    ├── scene/
    │   ├── camera/
    │   │   ├── cameraPath.ts
    │   │   └── cameraMath.ts
    │   │
    │   ├── chapters/
    │   │   ├── chapter01.ts
    │   │   ├── chapter02.ts
    │   │   ├── chapter03.ts
    │   │   ├── chapter04.ts
    │   │   ├── chapter05.ts
    │   │   ├── chapter06.ts
    │   │   ├── chapter07.ts
    │   │   ├── chapter08.ts
    │   │   └── chapter09.ts
    │   │
    │   └── systems/
    │       ├── transitionSystem.ts
    │       ├── artifactSystem.ts
    │       └── lightingSystem.ts
    │
    ├── lib/
    │   ├── interpolation.ts
    │   ├── math.ts
    │   ├── dom.ts
    │   └── performance.ts
    │
    ├── styles/
    │   ├── globals.css
    │   ├── tokens.css
    │   ├── typography.css
    │   ├── documentary.css
    │   └── responsive.css
    │
    └── types/
        ├── scene.ts
        └── ui.ts
```

---

## 2. Root Documentation

### `PRD.md`

Defines:

- product purpose,
- audience,
- experience,
- scope,
- requirements,
- acceptance criteria.

### `TRD.md`

Defines:

- implementation,
- architecture,
- technical constraints,
- performance,
- deployment,
- accessibility.

### `STRUCTURE.md`

Defines repository organization and ownership of files.

### `DESIGN.md`

Defines the visual/art-direction system.

### `README.md`

Defines how a new developer runs and deploys the project.

---

## 3. Source Material

Keep the original report outside `src/`:

```text
source/
└── OSHO_Rajneesh_Documentary_Report.docx
```

This is reference material for development.

The browser should not be required to parse a DOCX at runtime.

Convert the relevant documentary copy into structured TypeScript data during development.

---

## 4. Application Layer

### `src/main.tsx`

Application entry point.

Only responsibilities:

- mount React,
- import global styles,
- render root application.

### `src/App.tsx`

High-level application composition.

Should not contain:

- huge documentary strings,
- detailed 3D geometry,
- camera math,
- giant conditional chapter logic.

---

## 5. App Shell

### `src/app/AppShell.tsx`

Coordinates:

```text
Page
├── Intro
├── 3D canvas
├── Documentary DOM layer
├── chapter indicator
└── ending
```

### `src/app/ErrorBoundary.tsx`

Provides graceful UI fallback when the 3D renderer or a React subtree fails.

---

## 6. 3D Components

### `DocumentaryCanvas.tsx`

Owns the persistent R3F `<Canvas>`.

Should define:

- camera defaults,
- rendering settings,
- quality settings,
- scene mounting.

### `World.tsx`

Composes the persistent environment.

### `CameraRig.tsx`

Reads normalized scroll progress and drives camera position/orientation.

### `Environment.tsx`

Coordinates chapter-aware environment state.

### `Terrain.tsx`

Provides terrain/path base.

### `ArchitectureSystem.tsx`

Provides reusable architectural forms.

### `VegetationSystem.tsx`

Provides trees/branches or other natural forms.

### `ArtifactSystem.tsx`

Provides symbolic documentary artifacts.

### `Atmosphere.tsx`

Handles fog and controlled atmospheric depth.

### `LightingSystem.tsx`

Handles scene lighting and chapter interpolation.

---

## 7. Documentary Components

### `DocumentaryLayer.tsx`

Renders all semantic documentary content.

### `ChapterOverlay.tsx`

Controls the chapter-level layout and transitions.

### `ChapterTitle.tsx`

Large editorial chapter titles.

### `ParagraphBlock.tsx`

Long-form text.

### `QuoteBlock.tsx`

Large quotation treatment.

### `AnalysisBlock.tsx`

Analytical passages, especially where the report distinguishes interpretation from historical description.

### `TimelineBlock.tsx`

Date/event sequences.

### `StatementBlock.tsx`

High-impact short statements.

### `ReferenceBlock.tsx`

Source/reference presentation where useful.

---

## 8. UI Components

Keep UI extremely small.

### `ChapterIndicator.tsx`

Displays:

```text
03 / 09
PUNE ASHRAM
```

### `ScrollHint.tsx`

Optional initial scroll invitation.

### `ProgressLine.tsx`

A minimal chapter/progress visual.

### `AccessibilityControls.tsx`

Only include controls that are genuinely necessary.

Do not build a full application toolbar.

---

## 9. Content Architecture

### `src/content/types.ts`

All content types.

### `src/content/documentary.ts`

Actual documentary copy.

This should contain structured blocks, not presentation code.

Example:

```ts
export const documentary = {
  intro: [...],
  chapters: [
    {
      id: "early-life",
      index: 1,
      title: "Early Life and Claimed Enlightenment",
      blocks: [...]
    }
  ],
  epilogue: [...]
}
```

### `src/content/chapters.ts`

Chapter metadata.

Keep visual scene configuration separate from the prose.

### `src/content/references.ts`

Reference metadata from the source report.

---

## 10. Scene Architecture

### `src/scene/camera/`

Camera path and mathematical interpolation.

### `src/scene/chapters/`

Nine chapter scene configurations.

Each file should describe visual parameters, not duplicate the actual rendering implementation.

Example:

```ts
export const chapter01Scene = {
  terrain: {...},
  architecture: {...},
  vegetation: {...},
  artifacts: {...},
  lighting: {...},
}
```

### `src/scene/systems/`

Reusable systems shared by chapters.

---

## 11. Hooks

Hooks should encapsulate browser/runtime concerns.

### `useScrollProgress`

Returns normalized overall page progress.

### `useChapterProgress`

Returns:

```ts
{
  index,
  id,
  localProgress
}
```

### `useReducedMotion`

Reads the OS/browser preference.

### `useQualityLevel`

Selects low/medium/high scene complexity.

### `usePageVisibility`

Detects hidden tabs so expensive animation can be reduced.

---

## 12. Configuration

### `config/site.ts`

Site-level information:

- title
- description
- canonical URL
- social metadata
- author/credit information

### `config/runtime.ts`

Runtime constants such as:

- scene height factors,
- animation limits,
- DPR caps.

### `config/quality.ts`

Quality profiles.

---

## 13. Styles

### `tokens.css`

Design tokens only.

### `typography.css`

Font families, scale, tracking, paragraph rhythm.

### `documentary.css`

Editorial layouts.

### `responsive.css`

Breakpoints and mobile-specific adaptations.

### `globals.css`

Base reset and root-level defaults.

Avoid scattering arbitrary color values across component styles.

---

## 14. Naming Rules

Use:

- PascalCase for React components.
- camelCase for functions and variables.
- kebab-case for URLs/slugs.
- lowercase filenames only when a file is not a component.
- descriptive names rather than abbreviations.

Examples:

Good:

```text
CameraRig.tsx
useScrollProgress.ts
documentary.ts
transitionSystem.ts
```

Avoid:

```text
Cam.tsx
stuff.ts
scene2.tsx
util.ts
```

---

## 15. Dependency Boundaries

### 3D code may import

- R3F
- Drei
- Three.js
- math utilities

### DOM/content code may import

- React
- content types/data
- small UI utilities

### Content must not import

- Three.js
- React Three Fiber
- DOM-specific rendering code

This keeps documentary data portable.

---

## 16. Chapter Data Separation

The following must remain separate:

```text
DOCUMENTARY CONTENT
       ≠
CAMERA PATH
       ≠
WORLD CONFIGURATION
       ≠
UI LAYOUT
```

They may reference the same chapter ID.

Example:

```text
chapter ID: "rajneeshpuram"

documentary.ts
→ copy

chapters.ts
→ metadata

scene/chapter04.ts
→ world parameters

cameraPath.ts
→ camera waypoints
```

This is a critical maintainability rule.

---

## 17. Project-Level Rules

Never:

- duplicate documentary paragraphs,
- put long text inside JSX files,
- put camera coordinates directly inside arbitrary components,
- create a separate Canvas per chapter,
- couple UI layout to Three.js meshes,
- hide all content inside a JavaScript animation sequence.

Always:

- make content data-driven,
- make scenes configurable,
- keep components reusable,
- keep the DOM semantic,
- keep the 3D layer optional from an information-access perspective.

---

## 18. Future Extension

The structure should make it possible to add later:

- alternate visual themes,
- more chapters,
- source footnotes,
- language variants,
- additional artifact types,
- richer accessibility controls,

without rewriting the core camera/content architecture.
