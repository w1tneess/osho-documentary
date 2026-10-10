# Osho Rajneesh: The Enigma & The Experiment
### An Interactive Documentary & Investigative Archival Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](https://osho-documentary.vercel.app)
[![Production](https://img.shields.io/badge/Production-oshodocumentary.advaitachandra.in-emerald?style=for-the-badge)](https://oshodocumentary.advaitachandra.in)
[![CI](https://github.com/w1tneess/osho-documentary/actions/workflows/ci.yml/badge.svg)](https://github.com/w1tneess/osho-documentary/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

An objective, investigative, multimedia documentary web platform examining the life, teachings, communes, and controversies of **Bhagwan Shree Rajneesh (Osho)**. Built with modern web architecture, editorial typography, evidentiary cross-referencing, and an interactive archival gallery.

🌐 **Live Deployments**:
- **Primary Domain**: [https://oshodocumentary.advaitachandra.in](https://oshodocumentary.advaitachandra.in)
- **Vercel Mirror**: [https://osho-documentary.vercel.app](https://osho-documentary.vercel.app)

---

## 🏛 Project Overview

From his beginnings as a university philosophy professor in central India to the founding of global ashrams, the contentious experiment of **Rajneeshpuram** in Oregon, and his final years in Pune, Osho remains one of the most polarizing figures of the 20th century.

This project delivers a **rigorously balanced, multi-perspective documentary investigation** that pairs long-form journalism with primary historical records—including government findings, legal depositions, FBI declassified files, CDC epidemiological reports, press archives, insider accounts, and disciple memoirs.

---

## 🧭 Five Core Investigative Pillars

1. **Life & Biographies** (`/life`):
   - Detailed chronicles spanning his early childhood in Kuchwada, university years in Jabalpur, the Bombay Woodlands apartment era, the world tour, and his final days in Pune (1990).
2. **Teachings & Philosophy** (`/teachings`):
   - An objective examination of Dynamic Meditation, Kundalini techniques, the synthesis of Eastern mysticism with Western humanistic psychology, and the concept of *Zorba the Buddha*.
3. **The Movement & Communes** (`/movement`):
   - The evolution of the Neo-Sannyas movement: from the 1970s Pune 1 ashram to the massive, self-contained agricultural city of Rajneeshpuram in Wasco County, Oregon, and the post-1990 transformation into the Osho International Meditation Resort.
4. **Controversies & Legal Evidence** (`/controversies`):
   - Evidence-based analysis of the 1984 The Dalles salmonella bioterror attack, the commune wiretapping network, immigration fraud indictments, the Alford plea bargain, and Osho's deportation.
5. **Legacy & Contemporary Reception** (`/legacy`):
   - The commercialization and global reach of Osho International Foundation (OIF), modern academic assessments, Netflix's *Wild Wild Country* cultural resurgence, and the ongoing trademark disputes.

---

## ⚡ Key Interactive & Archival Features

- **🏛 Executive Segmented Header Architecture**:
  - Fixed-at-the-top, floating glass segmented pill navigation with smooth Framer Motion spring sliding highlights, live scroll-depth reading beam, and editorial typography.
- **🖼 Curated Archival Gallery (`/gallery`)**:
  - Exactly **32 authenticated historical plates** spanning 1968–1990, complete with high-resolution imagery, historical provenance, date tags, catalog IDs, and full-screen lightbox inspection.
- **⏳ Tri-Track Chronology / Master Timeline (`/timeline`)**:
  - Interactive, filterable multi-track timeline categorizing events across **Life**, **Movement**, and **Controversy** with evidentiary claim levels (*Established*, *Reported*, *Disputed*, *Alleged*).
- **🗺 Geographic Investigation Map (`/map`)**:
  - Spatial mapping of critical historical hubs: Kuchwada, Jabalpur, Mumbai, Pune, Montclair (NJ), Antelope, Rajneeshpuram (Big Muddy Ranch), and European protest capitals.
- **🧭 Curated Thematic Pathways (`/paths`)**:
  - Guided investigative routes through complex themes: *The Oregon Rise & Fall*, *Philosophy of Zorba the Buddha*, *The 1984 Bioterror Investigation*, and *The Sannyas Diaspora*.
- **🔍 Global Command Palette (`Ctrl+K` / `⌘K`)**:
  - Instant modal search indexing all long-form articles, archival plates, timeline events, and glossary terms with keyboard navigation.
- **👓 Evidence Matrix & Perspective Lens**:
  - Objective side-by-side triangulation of contentious events from government prosecutors, investigative journalists, commune leadership, and rank-and-file sannyasins.
- **📚 Scholarly Sources & Glossary (`/sources` & `/glossary`)**:
  - Fully cited compendium of congressional reports, federal court transcripts, Oregon state investigations, scholarly monographs, and primary sannyasin publications.
- **⚖️ Forensic Methodology & Corrections Ledger (`/method` & `/corrections`)**:
  - Explicit 4-tier evidentiary verification framework (*Established*, *Reported*, *Disputed*, *Alleged*) alongside a public audit trail of revisions and factual amendments.
- **🎨 Editorial Design & Atmosphere**:
  - Bespoke editorial aesthetic with rich typography (*Fraunces*, *Plus Jakarta Sans*, *Source Serif 4*), film grain texture, analog projection motes, glassmorphism cards, and dynamic light/dark theme switching.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens
- **Motion & Smooth Scroll**: [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data & Content**: YAML data loaders (`yaml`), frontmatter parsing (`gray-matter`), custom MDX lite renderer
- **Security & Deployment**: Strict Content Security Policy (CSP), HTTP security headers, [Vercel](https://vercel.com/) Edge Network

---

## 📁 Repository Structure

```text
osho-documentary/
├── public/
│   ├── images/
│   │   └── archival/         # 32 curated high-resolution historical plates
│   └── scripts/
│       └── theme-init.js     # Early theme script to prevent flash
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/            # Project methodology & editorial standards
│   │   ├── articles/[...slug]# Long-form documentary articles
│   │   ├── controversies/    # Investigative controversy hub
│   │   ├── corrections/      # Public factual revisions audit ledger
│   │   ├── gallery/          # Interactive archival evidence gallery (32 plates)
│   │   ├── glossary/         # Comprehensive terminology index
│   │   ├── legacy/           # Contemporary reception & legacy
│   │   ├── life/             # Biographical chapters
│   │   ├── map/              # Spatial geographic investigation map
│   │   ├── method/           # Forensic evidence grading methodology
│   │   ├── movement/         # Commune history & governance
│   │   ├── paths/            # Curated investigative pathways
│   │   ├── sources/          # Evidentiary sources & legal archive
│   │   ├── teachings/        # Philosophy & meditation techniques
│   │   ├── timeline/         # Multi-track chronological timeline
│   │   ├── layout.tsx        # Root layout with navbar & footer
│   │   └── page.tsx          # Interactive documentary landing experience
│   ├── components/
│   │   ├── article/          # Editorial reading components & citation cards
│   │   ├── layout/           # Fixed Segmented Navbar, Footer, Mobile Navigation
│   │   ├── providers/        # ThemeProvider & SmoothScroll (Lenis)
│   │   └── ui/               # ArchivalGallery, CommandPalette, EvidenceMatrix, etc.
│   ├── content/              # Structured YAML data & MDX investigation files
│   │   ├── articles/         # In-depth editorial investigative essays
│   │   ├── events/           # Timeline events dataset
│   │   ├── places/           # Map coordinates and locations
│   │   └── sources/          # Primary bibliography & source records
│   ├── lib/                  # Archival catalog, data loaders, type definitions
│   │   ├── archivalImages.ts # Master manifest of 32 verified archival plates
│   │   ├── contentData.ts    # YAML parser and data fetchers
│   │   └── types.ts          # Core TypeScript models
│   └── styles/               # Global tokens, typography, and theme definitions
├── vercel.json               # Security headers & cache-control policy
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher (recommended: `v22.x`)
- **npm**: `v10.x` or higher

### 1. Clone the Repository

```bash
git clone https://github.com/w1tneess/osho-documentary.git
cd osho-documentary
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles and builds production bundle with static route generation |
| `npm run start` | Runs the production build server locally on port `3000` |
| `npm run lint` | Runs ESLint across the codebase for code quality |
| `npm run typecheck` | Validates TypeScript types across the entire project |
| `npm run format` | Formats files using Prettier |

---

## ⚖️ Editorial Principles & Historical Accuracy

1. **Evidentiary Neutrality**: Claims regarding criminal acts, theological insights, and commune internal conflicts are corroborated against official court transcripts, investigative reporting, or scholarly literature.
2. **Attribution Transparency**: Disputed historical events distinguish between verified state evidence, unverified accusations, and sannyasin defense statements.
3. **Archival Integrity**: Every archival image included in the public gallery contains documented historical provenance, date attribution, and context.
4. **Correction Accountability**: All corrections and evidentiary updates are publicly logged in the [Corrections Ledger](/corrections).

---

## 📄 License

This codebase is open source under the [MIT License](LICENSE). Archival photographs and historical public records remain the property of their respective archival repositories and are presented under educational and historical fair-use principles.
