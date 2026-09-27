# OSHO Interactive Documentary — Design & Art Direction System

**Document:** Design  
**Version:** 1.0  
**Status:** Visual source of truth  
**Design language:** Warm editorial / cinematic documentary installation

---

## 1. Design Thesis

The visual identity should feel:

**warm, earthy, intellectual, cinematic, restrained, human.**

The site is about a complicated historical and philosophical subject.

The design must therefore resist two extremes:

### Extreme A

A sterile academic report.

### Extreme B

A devotional "spiritual" website.

The target is between them:

> **A literary documentary translated into space.**

The visual language should have confidence without trying to look expensive through effects alone.

---

## 2. Central Visual Metaphor

The environment changes as the argument changes.

The world begins:

- sparse,
- organic,
- open.

It becomes:

- structured,
- inhabited,
- architectural.

Then:

- enormous,
- organized,
- increasingly rigid.

Then:

- fragmented,
- empty,
- uncertain.

Finally:

- sparse,
- quiet,
- open again.

This creates a visual arc:

```text
OPEN
  ↓
FORMING
  ↓
EXPANDING
  ↓
DENSE
  ↓
CONTROLLED
  ↓
FRACTURED
  ↓
EMPTY
  ↓
DUAL
  ↓
QUIET
```

---

## 3. Color System

Use colors as a restrained editorial palette.

### Core

```css
--ink: #1C1816;
--ink-soft: #332A27;

--paper: #F3EBDD;
--paper-deep: #E7D8C4;

--maroon: #5A2028;
--maroon-deep: #41161C;

--ochre: #B48843;
--ochre-soft: #C8A96A;

--clay: #976B55;
--sand: #C8B39B;

--fog: #D8CFC3;
```

### Principles

- Cream is the primary reading surface.
- Near-black is used for body text and deep atmospheric regions.
- Maroon is an accent, not a full-screen default.
- Ochre is used sparingly for emphasis.
- Avoid highly saturated colors.
- Avoid neon.
- Avoid bright purple.
- Avoid "spiritual gradient" aesthetics.

---

## 4. Typography

### Display

Preferred:

**Playfair Display**

Use for:

- main title,
- chapter titles,
- large pull quotes,
- major statements.

### Body

Preferred:

**Inter**

Use for:

- paragraphs,
- metadata,
- navigation,
- supporting text.

### Metadata / Chapter markers

Preferred:

**IBM Plex Mono**

Use sparingly for:

- `01 / 09`,
- dates,
- small labels,
- source markers.

---

## 5. Typographic Personality

Headings:

- editorial,
- deliberate,
- high contrast,
- slightly dramatic.

Body:

- calm,
- generous,
- extremely readable.

Metadata:

- precise,
- technical,
- quiet.

Avoid:

- all-caps paragraphs,
- tiny body copy,
- excessive letter spacing,
- overly fashionable variable font tricks,
- text shadows.

---

## 6. Type Scale

Suggested desktop scale:

```text
Display       96–128 px
Chapter       64–96 px
Section       40–56 px
Subheading    24–32 px
Body          17–20 px
Small         13–15 px
Metadata      11–13 px
```

These are starting values.

Responsive sizing should be fluid using `clamp()`.

Example:

```css
font-size: clamp(3.25rem, 8vw, 8rem);
```

The exact scale should be adjusted after actual rendering rather than blindly applied.

---

## 7. Reading Width

Long-form body text should generally remain in a narrow editorial column.

Target:

```text
55–72 characters per line
```

Do not stretch paragraphs across the entire viewport.

The 3D world can occupy the entire screen.

The text should not.

---

## 8. Layout Philosophy

The page should feel spacious.

Use:

- large negative space,
- asymmetry,
- vertical rhythm,
- offset compositions,
- edge alignment,
- occasional full-width statements.

Avoid:

- dashboard grids,
- repeated rounded cards,
- excessive containers,
- centered-everything layouts,
- UI clutter.

---

## 9. Editorial Overlay Patterns

Support several patterns.

### Pattern A — Chapter Intro

```text
01 / THE SEEKER

EARLY LIFE AND
CLAIMED ENLIGHTENMENT

short introductory copy
```

### Pattern B — Editorial Column

```text
                         BODY
                         BODY
                         BODY
                         BODY
```

### Pattern C — Pull Quote

```text
                 “
                 LARGE
                 QUOTE
                 ”

                       — OSHO
```

### Pattern D — Split Analysis

```text
THE IDEA                   THE CONSEQUENCE

text                       text
text                       text
text                       text
```

### Pattern E — Timeline

```text
1953  ───────────  Claim of enlightenment

1970  ───────────  Dynamic Meditation

1974  ───────────  Pune
```

### Pattern F — Final Statement

Large text with almost no UI around it.

---

## 10. The 3D World

The 3D style should be **stylized realism**, not cartoon and not hyper-photorealism.

Think:

- physical materials,
- simplified geometry,
- strong silhouettes,
- natural light,
- soft atmospheric depth,
- tactile surfaces.

Geometry should be recognizable through shape and light rather than texture detail.

---

## 11. Geometry Language

### Organic forms

- uneven trees,
- branches,
- rocks,
- paths,
- low terrain ridges.

### Architectural forms

- columns,
- walls,
- platforms,
- long corridors,
- rectangular civic forms,
- large structural silhouettes.

### Fragmented forms

- offset blocks,
- separated walls,
- broken pathways,
- floating fragments used sparingly.

Do not use impossible geometry merely to show technical skill.

---

## 12. Chapter Visual Direction

### Chapter 01 — The Seeker

Palette:

cream + earth + muted green-brown.

Composition:

- open
- sparse
- long sightlines

Motion:

very slow

Visual language:

curiosity

---

### Chapter 02 — The Teacher

Palette:

warm stone + maroon accents.

Composition:

- more vertical structure
- emerging architecture
- stronger framing

Motion:

slow → moderate

Visual language:

formation

---

### Chapter 03 — The Movement

Palette:

ochre + warm brown + maroon.

Composition:

- branching paths
- gathering points
- increasing scale

Motion:

moderate

Visual language:

expansion

---

### Chapter 04 — Pune

Palette:

rich cream + warm green-brown + maroon.

Composition:

- beautiful gardens
- architecture
- reflective areas
- open communal spaces

Motion:

immersive

Then:

- tighter passages
- denser geometry
- darker shadows

Visual language:

beauty → pressure

---

### Chapter 05 — Rajneeshpuram

Palette:

dusty cream + ochre + industrial brown.

Composition:

- enormous scale
- roads
- fields
- infrastructure
- rigid structures

Motion:

largest cinematic movement

Visual language:

ambition → control

---

### Chapter 06 — Collapse

Palette:

desaturated maroon + gray earth + dark brown.

Composition:

- fractures
- disconnected forms
- empty roads
- asymmetric architecture

Motion:

slightly constrained

Visual language:

systemic breakdown

Do not use graphic violence or horror imagery.

---

### Chapter 07 — Legal Reckoning

Palette:

muted cream + dark brown + faded maroon.

Composition:

- fragments
- absence
- large negative space

Motion:

slow

Visual language:

aftermath

---

### Chapter 08 — Paradox

Palette:

split visual language.

One side:

warm / organic / open.

Other side:

rigid / architectural / constrained.

Do not literally divide the page with a giant line.

Use spatial and lighting contrast.

Visual language:

coexistence of incompatible impulses

---

### Chapter 09 — Legacy

Palette:

warm cream + soft earth + distant ochre.

Composition:

- horizon
- very little geometry
- enormous negative space

Motion:

very slow → almost still

Visual language:

trace / reflection / uncertainty

---

## 13. Opening Composition

Initial viewport should have:

- a strong horizon,
- little geometry,
- soft fog,
- restrained title,
- almost no UI.

Suggested hierarchy:

```text
OSHO

DOCUMENTARY

Philosophy, outcomes, and the truth behind the movement

01 / 09
```

The title should not cover the entire screen.

Keep enough negative space for the environment to breathe.

---

## 14. Ending Composition

The ending should invert the opening.

Opening:

the world is distant but beginning.

Ending:

the world has almost disappeared.

The final viewport should be mostly:

- horizon,
- cream/earth atmosphere,
- sparse geometry,
- quiet typography.

No:

- giant final logo,
- applause-like animation,
- dramatic particle explosion,
- "THE END" card,
- triumphant portrait.

---

## 15. Chapter Indicator

Format:

```text
03 / 09
PUNE ASHRAM
```

Placement:

prefer left edge or upper corner.

Style:

- small,
- monochrome,
- mono font,
- thin progress line.

It should behave as editorial metadata.

---

## 16. Motion Language

Motion should be:

**slow, intentional, damped.**

### Good

- camera gliding,
- object drift,
- slow reveal,
- environmental interpolation,
- subtle parallax.

### Bad

- bounce easing,
- exaggerated overshoot,
- aggressive zoom,
- random shake,
- constant particle movement,
- rapid rotations.

---

## 17. Motion Timing

Suggested baseline:

```text
micro UI transition      180–300 ms
chapter text transition  500–900 ms
large visual transition  1000–2200 ms
environmental shift      driven by scroll
quote settling           800–1600 ms
```

These are design starting points.

Tune them against actual scrolling rather than treating them as rigid values.

---

## 18. Depth & Parallax

The environment should visibly contain:

### Foreground

Objects near the camera.

### Midground

Primary scene.

### Background

Distant structures and horizon.

The three layers should move at meaningfully different apparent speeds as the camera travels.

Avoid excessive stereoscopic tricks.

---

## 19. Atmosphere

Use atmosphere to create depth, not fog walls.

Fog should:

- separate layers,
- soften distant geometry,
- unify chapter transitions.

Fog must never make text unreadable.

Do not put body text directly over the busiest region of the 3D composition.

---

## 20. Artifact Design

Artifacts should feel:

- tactile,
- slightly imperfect,
- understated.

Examples:

- book,
- paper,
- wooden chair,
- microphone,
- stone,
- document fragment.

They should not look like collectible game items.

No floating labels over every artifact.

Interaction should be subtle.

---

## 21. Interaction

Primary interaction:

**scrolling**

Secondary:

- subtle cursor response where appropriate,
- artifact response near the camera,
- accessible controls if a special mode is provided.

Do not require clicking to understand the documentary.

The site is a publication first, interactive artwork second.

---

## 22. Spacing System

Use a consistent base unit.

Recommended:

```text
4 px base
8
12
16
24
32
48
64
96
128
160
```

Large chapter sections can use:

```text
160–280 px
```

of vertical breathing room depending on viewport size.

---

## 23. Borders / Lines

Prefer thin rules over boxes.

Use:

- `1px` rules,
- subtle separators,
- editorial chapter lines.

Avoid:

- thick borders,
- glowing borders,
- neon outlines.

---

## 24. Corners / Cards

Use rectangular or almost-rectangular editorial forms.

Suggested default:

```text
border-radius: 0–6px
```

Cards should be uncommon.

The site should not visually resemble a SaaS product.

---

## 25. Shadows

Use natural soft shadows.

Avoid:

- huge drop shadows,
- colored glow,
- hard black UI shadows.

Depth should primarily come from the 3D environment.

---

## 26. Responsive Design

### Desktop

Use full cinematic composition.

Text can occupy:

- left 30–40%,
- right 30–40%,
- centered narrow column,
- split editorial layout.

### Tablet

Reduce:

- typography,
- environment complexity,
- overlay width.

### Mobile

Use:

- stacked text,
- smaller heading scale,
- simplified 3D composition,
- fewer artifacts,
- less environmental movement.

Never shrink desktop composition until it becomes unusable.

---

## 27. Accessibility Visual Rules

Minimum contrast should be maintained for body copy.

Do not place paragraph text directly on bright sky or high-frequency geometry.

When needed, use an extremely subtle:

- paper wash,
- shadow,
- gradient veil,

behind text.

The veil should support readability, not become a visible UI panel.

---

## 28. Image / Asset Treatment

Do not use random stock imagery to "fill space."

When imagery is used:

- make it editorial,
- desaturate where appropriate,
- integrate it into the environment,
- avoid collage overload.

Prefer original procedural or properly licensed visual material.

---

## 29. SEO / Social Preview Visual

Create one clean Open Graph image.

It should match the design system:

```text
OSHO
A DOCUMENTARY
```

with restrained typography and one quiet environmental visual.

Do not use clickbait imagery.

---

## 30. Final Art Direction Test

Before calling the design finished, evaluate:

### Does it feel warm?

Yes.

### Does it feel editorial?

Yes.

### Does the 3D feel necessary?

Yes.

### Does it look devotional?

No.

### Does it look like a template?

No.

### Is the subject being sensationalized?

No.

### Can the documentary be comfortably read?

Yes.

### Does the environment evolve with the story?

Yes.

### Does the final horizon feel earned?

Yes.

The design should feel authored, not ornamented.
