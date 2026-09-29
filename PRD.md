# OSHO Interactive Documentary — Product Requirements Document

**Document:** PRD  
**Version:** 1.0  
**Status:** Build baseline  
**Project:** `osho.advaitachandra.in`  
**Primary implementation environment:** Google Antigravity IDE  
**Deployment target:** GitHub → Vercel → custom subdomain

---

## 1. Product Definition

Build a premium, single-page, scroll-driven interactive documentary about Osho Rajneesh.

This is a **written documentary presented as an immersive digital experience**. It is not a video documentary, a devotional fan page, a conventional biography site, or a Three.js demo with decorative effects.

The central product idea is:

> **The 3D journey is the documentary.**

As the visitor scrolls, the camera travels through one continuously evolving symbolic world. The environment changes with the narrative, while the documentary itself remains crisp, semantic HTML layered over the 3D scene.

The experience should feel like a **digital documentary installation / interactive museum publication**.

---

## 2. Source of Truth

The supplied source document is:

**`OSHO_Rajneesh_Documentary_Report.docx`**

It contains the documentary's nine sections, conclusion, quotations, analysis, claims, and references.

### Content rule

The supplied report is the primary source of truth for the website's documentary copy.

The implementation must:

- Preserve the report's structure and terminology.
- Not invent historical facts, quotations, dates, statistics, accusations, motives, or events.
- Not silently strengthen a claim.
- Distinguish documented material from interpretation where the source does so.
- Treat quotations as quotations only when they are explicitly presented as such in the source.
- Preserve uncertainty where the report expresses uncertainty.
- Never visually imply a factual claim that the written documentary does not establish.

### Important distinction

The report itself contains factual claims, analytical judgments, and interpretive conclusions. The website must not blur those categories.

Where practical, content records should support an optional provenance/type field such as:

- `fact`
- `quote`
- `analysis`
- `argument`
- `conclusion`
- `reference`

A claim should not be labeled **verified**, **documented**, or **court-recorded** by the UI unless the corresponding source information is actually available in the content data.

---

## 3. Product Goals

### Primary goals

1. Turn the documentary report into a memorable spatial narrative.
2. Make the 3D environment materially contribute to storytelling.
3. Preserve excellent readability despite the immersive presentation.
4. Present Osho's life, teachings, movement, failures, philosophical contributions, responsibility, and legacy without reducing the subject to a simplistic verdict.
5. Create a polished site suitable for a public GitHub repository and Vercel deployment.
6. Work well on desktop and remain meaningfully usable on mobile.

### Secondary goals

- Establish a recognizable visual identity for `osho.advaitachandra.in`.
- Make chapter progression intuitive without conventional website chrome.
- Make quotations and major analytical moments visually distinct.
- Ensure the final experience is coherent from first viewport to final horizon.
- Keep the project maintainable enough to extend later.

---

## 4. Non-Goals

The first release will **not** include:

- Video hosting or video playback.
- User accounts.
- Authentication.
- Database/CMS.
- Comments.
- Social feeds.
- Search across external websites.
- AI-generated documentary claims.
- A literal historical reconstruction of every location.
- A giant 3D Osho avatar/statue.
- A gamified experience.
- Scroll-jacking that replaces native browser scrolling.
- Heavy dependence on remote assets.

---

## 5. Target Audience

### Primary

Readers who are curious about Osho and want a visually engaging, substantial documentary rather than a short biography.

### Secondary

- Students and young readers.
- People interested in philosophy and spirituality.
- Visitors interested in the Rajneesh movement.
- Readers interested in the tension between charismatic leadership, ideas, institutions, and accountability.
- Visitors arriving from search or a shared link who may know little about Osho.

The experience must work for a first-time visitor without requiring prior knowledge.

---

## 6. Core Experience Principle

The site should communicate this progression through **space and atmosphere**, not only text:

> **Curiosity → Expansion → Idealism → Scale → Power → Corruption → Collapse → Paradox → Legacy**

The environment is therefore a narrative instrument.

It should not simply change because a chapter changed. It should change **for a reason connected to the chapter's emotional and conceptual state**.

---

## 7. Documentary Architecture

The report contains nine major sections.

### Chapter 01 — Early Life and Claimed Enlightenment

Themes:

- childhood
- intellectual curiosity
- early questioning
- education of the inner life
- claimed 1953 enlightenment experience

Visual movement:

**sparse → curious → still**

---

### Chapter 02 — Founding the Movement

Themes:

- Dynamic Meditation
- neo-sannyasins
- emergence of a growing movement
- the transition from individual teacher to expanding community

Visual movement:

**individual → network**

---

### Chapter 03 — Pune Ashram

Themes:

- community
- meditation
- therapy
- Zorba the Buddha
- sensuality and spirituality
- later boundary concerns

Visual movement:

**beauty → density → discomfort**

---

### Chapter 04 — Oregon Commune / Rajneeshpuram

Themes:

- relocation
- immense scale
- civic infrastructure
- ambition
- centralization
- increasing organizational control

Visual movement:

**utopia → machine**

---

### Chapter 05 — Legal Reckoning and Deportation

Themes:

- Sheela's departure
- investigations
- arrest
- legal proceedings
- plea
- deportation
- exile

Visual movement:

**system → fracture → absence**

---

### Chapter 06 — What Osho Got Fundamentally Wrong

Themes:

- enlightenment and moral infallibility
- obedience
- surrender
- authority
- accountability
- risks of unaccountable charismatic leadership

Visual movement:

**structure → compression**

---

### Chapter 07 — What Osho Got Philosophically Right

Themes:

- sexual repression
- meditation and awareness
- rejection of dogma
- integration of spiritual and mundane life

Visual movement:

**compression → opening**

---

### Chapter 08 — Final Years and the Question of Responsibility

Themes:

- return
- later public life
- silence
- responsibility
- accountability
- the limits of the teacher/master model

Visual movement:

**opening → reflection**

---

### Chapter 09 — Impact and Legacy

Themes:

- continuing communities
- continued publication and practice
- value attributed to teachings
- harms and suffering
- the coexistence of influence and damage

Visual movement:

**many traces → quiet horizon**

---

## 8. Conclusion / Epilogue

The source report has a conclusion titled **“The Paradox of Osho.”**

Treat this as a **postlude/epilogue attached to Chapter 09**, not as an additional numbered chapter.

The experience should end with a quiet visual field and enough negative space for the conclusion to breathe.

The website should not manufacture a triumphant final verdict.

The final visual message should be closer to:

> The visitor has been shown the material. The distinction is now theirs to consider.

---

## 9. Experience Flow

### Opening

- Nearly empty viewport.
- Distant environment.
- restrained title.
- subtle atmospheric movement.
- no giant portrait.
- no busy navigation.
- native scrolling begins the journey.

### Journey

- Scroll controls camera progress.
- Documentary sections enter through staged HTML overlays.
- Environment transforms continuously.
- Chapter indicator updates.
- Quotes create deliberate pauses.
- Environment complexity rises and falls with the narrative.

### Ending

- Geometry progressively disappears.
- Camera approaches a large horizon.
- motion slows.
- final text appears with generous whitespace.
- a quiet empty stretch follows the last text.

---

## 10. Functional Requirements

### FR-01 — Single continuous page

The documentary must behave as one continuous scroll experience.

### FR-02 — Nine chapters

All nine report sections must be accessible in order.

### FR-03 — Native scroll

Browser scrolling must remain native and accessible.

### FR-04 — Scroll-driven camera

Camera position and orientation must respond smoothly to normalized page progress.

### FR-05 — Environmental transitions

Chapters must visually transition into one another without hard scene swaps.

### FR-06 — Semantic documentary content

Long-form content must be rendered as HTML, not 3D text meshes.

### FR-07 — Quote treatment

Important quotations must support a dedicated layout and motion behavior.

### FR-08 — Chapter indicator

A persistent, minimal chapter indicator must show current chapter / total.

### FR-09 — Responsive experience

Desktop, tablet, and mobile layouts must all be intentionally designed.

### FR-10 — Reduced motion

`prefers-reduced-motion` must produce a calmer, less animated experience.

### FR-11 — Accessibility

The documentary must remain readable and navigable without relying on color or motion alone.

### FR-12 — SEO

The page must expose real HTML headings and meaningful metadata.

### FR-13 — Deployment

The project must build cleanly for Vercel without a server runtime.

---

## 11. UX Principles

1. **Story before spectacle.**
2. **Readability before visual effects.**
3. **Native scrolling before cinematic tricks.**
4. **Continuity before scene switching.**
5. **Restraint before decoration.**
6. **Evidence before assertion.**
7. **Ambiguity where the source itself is ambiguous.**
8. **Every animation must have a reason.**

---

## 12. Acceptance Criteria

The release is considered complete only when:

- The project starts successfully from a clean install.
- The production build succeeds.
- The page contains all nine chapters.
- The report's major arguments are represented without invented material.
- The camera travels continuously through the 3D world.
- There are no hard scene resets between chapters.
- Long text remains crisp HTML.
- No major paragraph is unreadable because of the 3D background.
- The chapter indicator works.
- Quote moments behave distinctly.
- The final chapter is reachable and visually resolves the journey.
- Mobile remains usable.
- Reduced-motion mode is usable.
- There are no obvious runtime or console errors.
- There are no fake claims of institutional affiliation, official endorsement, or historical authenticity.
- The project can be pushed to GitHub and deployed to Vercel as a static frontend.

---

## 13. Quality Bar

A successful implementation should make a visitor think:

> “This feels like entering a documentary.”

Not:

> “This is a website with a Three.js background.”

Not:

> “This is an AI-generated visual demo.”

Not:

> “This is a spiritual landing page.”

The product succeeds when the visual system, text, camera, and environment feel like one authored work.
