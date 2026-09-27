# OSHO Interactive Documentary — Technical Requirements Document

**Document:** TRD  
**Version:** 1.0  
**Status:** Build baseline  
**Runtime:** Modern evergreen browsers  
**Deployment:** Static frontend on Vercel  
**Repository:** GitHub

---

## 1. Technical Objective

Create a maintainable, production-ready React application that combines:

- semantic HTML documentary content,
- a persistent React Three Fiber canvas,
- native document scrolling,
- data-driven chapter configuration,
- responsive scene quality,
- progressive visual transitions,
- accessible reduced-motion behavior,
- clean GitHub/Vercel deployment.

The implementation must be robust enough that later visual iteration does not require rewriting the application architecture.

---

## 2. Recommended Stack

### Required

- React
- Vite
- TypeScript
- `three`
- `@react-three/fiber`
- `@react-three/drei`

### Optional

- GSAP only if a specific multi-property sequence cannot be cleanly expressed with ordinary interpolation.
- A lightweight utility library only when it removes measurable complexity.

### Avoid initially

- Next.js
- Redux
- a backend
- database/CMS
- authentication
- server-side rendering
- large animation frameworks layered on top of each other
- unnecessary component libraries

The project is primarily a static, single-route interactive publication.

---

## 3. Runtime Architecture

Use a split architecture:

```text
Browser
│
├── Semantic DOM document
│   ├── Intro
│   ├── Chapter overlays
│   ├── Quotes
│   ├── Analysis blocks
│   ├── Timeline blocks
│   └── Conclusion
│
└── Persistent R3F canvas
    ├── CameraRig
    ├── World
    ├── Terrain
    ├── Architecture
    ├── Artifacts
    ├── Atmosphere
    └── Lighting
```

The two layers communicate through **normalized scroll progress and active chapter state**, not by putting documentary content inside the 3D scene.

---

## 4. Scroll Architecture

### Requirement

Use native browser scrolling.

Do not hijack wheel/touch input.

Create a page timeline with enough vertical height to stage nine chapters.

A recommended model:

```text
document height
        ↓
scrollY
        ↓
normalized progress [0, 1]
        ↓
chapter progress
        ↓
camera target
        ↓
damped camera transform
```

### Do not

- prevent default wheel behavior,
- replace touch scrolling with pointer gestures,
- force scroll snapping,
- continuously call React state setters from `useFrame`.

### Preferred implementation

Maintain high-frequency values in refs or external mutable objects.

Use React state only for lower-frequency UI changes such as active chapter labels.

---

## 5. Camera System

Create a reusable `CameraRig`.

Each chapter has a camera target:

```ts
type CameraWaypoint = {
  position: [number, number, number]
  lookAt: [number, number, number]
  focalLength?: number
  roll?: number
  ease?: number
  hold?: number
}
```

Do not simply jump between waypoints.

Use:

1. normalized overall progress,
2. a piecewise chapter interpolation,
3. a non-linear easing curve,
4. damping toward the result.

Pseudo-flow:

```text
scroll progress
→ locate chapter segment
→ calculate local progress
→ apply chapter-specific easing
→ interpolate position
→ interpolate look-at
→ damp camera
```

### Camera principles

- smooth but responsive,
- no seasick movement,
- no random shake,
- no hard cuts,
- no automatic camera movement fighting the user's scroll.

---

## 6. World Architecture

Create one persistent `<Canvas>`.

The world should be composed of reusable systems:

```text
World
├── Environment
│   ├── Terrain
│   ├── PathSystem
│   ├── Vegetation
│   ├── ArchitectureSystem
│   └── RuinSystem
│
├── ArtifactSystem
│
├── Atmosphere
│
└── LightingSystem
```

Avoid nine complete duplicate scenes.

Instead use chapter configuration to alter:

- object visibility,
- transforms,
- scale,
- density,
- lighting,
- fog,
- material parameters,
- camera behavior.

---

## 7. Data-Driven Chapters

Create a chapter configuration model.

Example:

```ts
type ChapterConfig = {
  id: string
  index: number
  slug: string
  title: string
  subtitle?: string

  scrollStart: number
  scrollEnd: number

  camera: CameraWaypoint

  world: {
    terrainVariant?: string
    architectureLevel?: number
    vegetationDensity?: number
    artifactDensity?: number
    fogDensity?: number
    warmth?: number
    contrast?: number
  }

  content: DocumentaryBlock[]
}
```

Do not scatter chapter-specific numbers throughout components.

The goal is to make future art direction possible by editing configuration rather than rewriting rendering logic.

---

## 8. Content Model

Create typed documentary blocks.

Recommended:

```ts
type DocumentaryBlock =
  | {
      type: "heading"
      eyebrow?: string
      title: string
      body?: string
    }
  | {
      type: "paragraph"
      body: string
    }
  | {
      type: "quote"
      text: string
      attribution?: string
      source?: string
    }
  | {
      type: "analysis"
      label?: string
      body: string
    }
  | {
      type: "timeline"
      items: TimelineItem[]
    }
  | {
      type: "statement"
      body: string
    }
  | {
      type: "reference"
      citation: string
      url?: string
    }
```

Where practical, allow optional provenance:

```ts
type EvidenceKind =
  | "fact"
  | "quote"
  | "analysis"
  | "argument"
  | "conclusion"
  | "reference"
```

The UI must not expose provenance labels unless the content actually provides them.

---

## 9. Environment Transition System

Do not switch scenes at chapter boundaries.

Instead calculate a transition factor between two chapter states:

```text
chapter A state
        ↓
transition t [0,1]
        ↓
chapter B state
```

Use the value to interpolate:

- terrain color
- fog
- object scale
- architecture density
- light intensity
- material roughness
- object opacity
- camera pacing

This makes one persistent world feel like it is evolving rather than being replaced.

---

## 10. Visual Rendering Strategy

Prefer procedural geometry and simple materials.

Priority order:

1. Composition
2. Silhouette
3. Lighting
4. Depth
5. Motion
6. Fine detail

Do not solve weak composition by adding polygons.

### Recommended object strategy

- Instanced meshes for repeated rocks/trees/columns.
- Shared geometries.
- Shared materials.
- Small number of material variants.
- Avoid unique textures unless they materially improve the scene.

---

## 11. Materials and Shaders

Keep materials simple.

Default preference:

- `MeshStandardMaterial`
- `MeshPhysicalMaterial` only where necessary
- simple custom shaders only for a specific visual need

Avoid stacking heavy shader effects.

No visual effect should exist solely because it is easy to add.

---

## 12. Lighting

Use a restrained lighting rig.

Baseline:

```text
Ambient / Hemisphere light
+
one primary directional light
+
optional low-intensity fill/rim light
+
scene fog
```

Per-chapter parameters can adjust:

- light direction
- intensity
- color temperature
- fog density
- contrast

Avoid excessive bloom.

Avoid multiple expensive dynamic shadows.

---

## 13. Post-Processing

Post-processing is optional.

Do not introduce a large post-processing pipeline by default.

Only add effects such as:

- very subtle bloom,
- mild vignette,
- restrained color grading,

if testing shows that they materially improve the art direction.

Never use post-processing to hide weak geometry or lighting.

---

## 14. HTML Overlay System

Create a fixed/anchored documentary layer above the canvas.

Recommended conceptual structure:

```text
<main>
  <Canvas />
  <DocumentaryViewport>
    <ChapterOverlay />
  </DocumentaryViewport>
</main>
```

Long-form content remains ordinary HTML.

Use CSS for:

- layout,
- opacity,
- transforms,
- typography,
- responsive positioning.

Avoid calculating every DOM position from scratch every frame.

Prefer chapter-level progress and CSS variables.

---

## 15. Chapter Activation

Determine active chapter from scroll progress.

Avoid expensive DOM queries in every animation frame.

Options:

- precomputed chapter ranges,
- `IntersectionObserver` for low-frequency content activation,
- normalized scroll progress for camera choreography.

The active chapter indicator may update only when the current chapter changes.

---

## 16. Quote Moments

Quote blocks receive a distinct scene state.

A quote state may modify:

```text
camera speed     ↓
world animation  ↓
artifact motion  ↓
visual noise     ↓
negative space   ↑
typographic scale ↑
```

Do not hardcode quote-specific rendering inside the world.

Use block metadata to request a visual mode.

---

## 17. Performance Requirements

### General targets

These are engineering targets, not guarantees:

- Aim for ~60 FPS on a normal modern desktop during ordinary movement.
- Aim for a stable, usable mobile experience with adaptive quality.
- Avoid long blank loading states.
- Keep the initial document useful before the 3D scene is fully ready.

### Main rules

Do not:

- allocate new objects in hot `useFrame` loops,
- set React state every frame,
- create duplicate geometries,
- create duplicate materials,
- continuously recompute expensive pathfinding,
- load huge 3D models unnecessarily,
- run expensive particles behind text without purpose.

### Prefer

- refs,
- shared resources,
- instancing,
- memoized scene primitives,
- configuration-driven transforms,
- adaptive DPR,
- simplified mobile scenes.

---

## 18. Device Quality Levels

Create an internal quality model:

```ts
type QualityLevel = "low" | "medium" | "high"
```

Possible determinants:

- viewport size,
- device pixel ratio,
- coarse pointer / touch device,
- reduced-motion preference,
- measured performance after startup.

### High

- full environment detail
- higher shadow quality
- more artifacts
- richer atmosphere

### Medium

- reduced geometry
- fewer shadows
- lower artifact count

### Low

- minimal geometry
- minimal shadows
- reduced atmospheric effects
- still preserves camera journey and visual narrative

---

## 19. Mobile Strategy

Do not design mobile as an afterthought.

Mobile should preserve:

- chapter order,
- camera journey,
- core color system,
- major environmental transitions,
- documentary readability.

Mobile may reduce:

- object density,
- depth complexity,
- shadows,
- particle counts,
- environmental decoration.

The DOM layout should change deliberately at mobile widths.

---

## 20. Reduced Motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

is active:

- greatly reduce camera interpolation,
- remove decorative looping movement,
- minimize artifact animation,
- avoid aggressive parallax,
- preserve normal scrolling,
- preserve all documentary content.

The site should remain coherent without animation.

---

## 21. Asset Strategy

Prefer:

1. procedural geometry,
2. CSS-generated textures,
3. tiny self-contained textures,
4. openly licensed assets,
5. public-domain assets.

Do not make the project dependent on random remote URLs.

Any external asset should have:

- a stable source,
- a license suitable for publication,
- local caching under `public/assets/` where appropriate,
- attribution documented when required.

Do not download random copyrighted Osho imagery.

---

## 22. Accessibility

Requirements:

- semantic `main`, `section`, `header`, `footer`,
- exactly one logical `h1`,
- proper heading hierarchy,
- accessible text contrast,
- keyboard access to all actionable controls,
- visible focus,
- no critical meaning encoded only by color,
- no essential information conveyed only through animation,
- reduced-motion support.

The 3D canvas is enhancement, not the only information channel.

---

## 23. SEO

Single-page metadata should include:

- title,
- description,
- canonical URL,
- Open Graph title/description/image,
- Twitter/X metadata where desired,
- favicon,
- semantic headings,
- meaningful page copy.

Recommended canonical:

`https://osho.advaitachandra.in/`

Do not claim:

- official Osho organization affiliation,
- official endorsement,
- institutional authorship,
- historical authenticity of generated 3D assets.

---

## 24. Deployment

Target:

```text
GitHub
  ↓
Vercel
  ↓
osho.advaitachandra.in
```

Build must be static.

Recommended scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "validate:content": "tsx scripts/validateContent.ts"
}
```

If the exact tooling differs, maintain equivalent functionality.

---

## 25. Content Validation

Add a lightweight validation script that checks:

- every chapter has a unique ID,
- every chapter has a valid index 1–9,
- scroll ranges do not overlap incorrectly,
- every block has the required fields,
- quote blocks contain text,
- headings are not empty,
- references are syntactically valid,
- slugs are unique.

This should fail the build or validation command when structural errors are introduced.

---

## 26. Error Handling

The site must degrade gracefully.

If the 3D renderer fails:

- documentary HTML must remain accessible,
- the page must still be readable,
- no blank screen,
- show a minimal fallback background,
- do not expose stack traces to the visitor.

Do not make the entire documentary dependent on WebGL success.

---

## 27. Testing / Verification

At minimum, verify:

### Functional

- dev server
- production build
- chapter progression
- camera
- overlays
- final chapter
- all links

### Responsive

- desktop
- laptop
- tablet
- mobile

### Accessibility

- keyboard
- reduced motion
- contrast
- heading structure

### Runtime

- no uncaught exceptions
- no repeated React warnings
- no obvious memory leaks during repeated scrolling

### Deployment

- fresh clone
- clean install
- production build
- Vercel deployment configuration

---

## 28. Security / Repository Hygiene

Never commit:

- secrets,
- API keys,
- `.env` values containing secrets,
- personal machine paths,
- `node_modules`,
- build output unless deliberately required.

Use:

```text
.env.example
.gitignore
README.md
```

when needed.

---

## 29. Architecture Quality Rules

The codebase should satisfy:

- no giant monolithic component,
- no duplicate scene implementations,
- no duplicated content strings,
- no chapter-specific magic numbers scattered across components,
- no per-frame React state updates,
- no unnecessary global state library,
- no unnecessary backend,
- no unnecessary network dependency.

The architecture must make visual iteration cheap.

---

## 30. Technical Definition of Done

The application is technically complete when:

1. `npm install` succeeds from a clean clone.
2. `npm run dev` launches the site.
3. `npm run build` succeeds.
4. `npm run lint` succeeds, or the chosen equivalent passes.
5. `npm run validate:content` succeeds.
6. The browser console has no critical errors.
7. The 3D canvas and HTML layer remain synchronized.
8. All nine chapters are reachable.
9. Mobile has an intentional quality reduction.
10. Reduced motion is implemented.
11. WebGL failure leaves documentary content readable.
12. GitHub/Vercel deployment requires no server-side runtime.
