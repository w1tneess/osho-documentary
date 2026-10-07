# Osho Documentary Site

An interactive, strictly objective documentary-style website built with **Astro**, **Tailwind CSS**, and **MDX** detailing the history, claims, and controversies of Osho Rajneesh and his movement. Designed for maximum accessibility, performance, and transparency.

## 🚀 Setup & Local Development

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the dev server:

```sh
npm run dev
```

The site will be available at `http://localhost:4321`.

## 🛠 Available Scripts

| Command           | Action                                                              |
| :---------------- | :------------------------------------------------------------------ |
| `npm run dev`     | Starts local dev server at `localhost:4321`                         |
| `npm run build`   | Builds your production site to `./dist/` and runs Pagefind indexing |
| `npm run preview` | Previews your build locally before deploying                        |
| `npm run check`   | Runs Astro's strict typechecking and validation                     |
| `npm run lint`    | Runs Prettier for formatting (if configured)                        |

## 📝 Content Management (Adding Data)

The site uses Astro's **Content Collections** with strict Zod schemas for validation. The build will fail if any required metadata is missing or incorrect.

### Adding an Article

1. Create a new `.mdx` file in `src/content/articles/` under a relevant category subfolder.
2. Ensure you have the required frontmatter:

```yaml
---
title: 'Article Title'
summary: 'A short description.'
lastReviewed: 2024-05-20
status: 'draft' # or "review", "published"
category: ['life']
---
```

3. Use specialized components (`<FactCard>`, `<Claim>`, `<SourceGap>`) directly inside your MDX file.

### Adding an Event (Timeline)

Add a new entry to `src/content/events/events.yaml`:

```yaml
- id: example-event
  date: '1974-03-21'
  track: 'movement' # or "life", "controversy"
  title: 'Example Event'
  summary: 'Description of the event.'
  claimLevel: 'reported'
```

### Adding a Place (Map)

Add a new entry to `src/content/places/places.yaml`:

```yaml
- id: new-center
  name: 'New Center Name'
  lat: 18.5204
  lng: 73.8567
  description: 'Description of the geographic location.'
```

## 🚀 Deployment

This site is statically generated (`output: 'static'`) and can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

1. **Connect your repository** to your host of choice.
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. Make sure to configure security headers (CSP, X-Content-Type-Options) at the CDN level.

_Note: The `npm run build` script includes a `postbuild` hook that automatically runs Pagefind to index the static site for global search. Ensure your deployment environment has `npx` available to execute Pagefind._

## ⚠️ Known Limitations

While this project is built defensively with quality gates, nothing is completely bug-free. Current known limitations include:

1. **Offline PWA support** is not yet fully implemented.
2. The **Leaflet Map** may exhibit slight render delays on very slow connections, though it gracefully fades in.
3. **Pagefind Search Indexing** requires a built `dist` directory, meaning global search does not function during local `npm run dev` out-of-the-box unless the `dist` folder exists from a previous build.
4. **No i18n support** is included at this stage; Bengali translation pipelines are a potential future phase.
