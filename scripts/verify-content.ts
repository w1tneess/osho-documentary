/**
 * Content and score verification.
 *
 * This exists to catch the class of mistake that is invisible in a screenshot
 * and fatal in production: a chapter with no subject, a beat with no measure, a
 * score entry that the camera never reaches, an image with no role.
 *
 * It runs against the same typed modules the app imports, so it cannot drift
 * from the content it is checking. It exits non-zero on any failure, and
 * `npm run build` chains it, so a structural regression fails the build rather
 * than shipping.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CHAPTER_SCENE_CONFIGS, SCORE_LENGTH } from '../src/entities/chapter/chapters.js'
import { documentary } from '../src/entities/content/documentary.js'
import { IMAGE_MANIFEST } from '../src/entities/content/imageManifest.js'
import type { DocumentaryBlock, ImageRole } from '../src/entities/content/types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

let total = 0
let failed = 0

function check(condition: boolean, message: string) {
  total++
  if (condition) return
  failed++
  console.error(`  ✗ ${message}`)
}

const HEX = /^#[0-9a-fA-F]{6}$/
const IMAGE_ROLES: ImageRole[] = ['portrait', 'landscape', 'plate', 'detail', 'bleed']
const EVIDENCE = new Set([
  'fact',
  'quote',
  'analysis',
  'argument',
  'conclusion',
  'reference',
])

console.log('\n── Score ──────────────────────────────────────────────')

check(SCORE_LENGTH === 12, `Score has 12 entries (intro + 9 chapters + close) — found ${SCORE_LENGTH}`)

const ids = new Set<string>()
CHAPTER_SCENE_CONFIGS.forEach((c, i) => {
  const at = `[score ${i} ${c.id}]`
  check(!ids.has(c.id), `${at} id is unique`)
  ids.add(c.id)

  check(c.fogDensity > 0 && c.fogDensity < 0.05, `${at} fogDensity in a sane range (${c.fogDensity})`)

  for (const key of ['fogColor', 'skyZenith', 'skyMid', 'skyHorizon', 'sunColor', 'keyColor', 'fillSky', 'fillGround', 'rimColor', 'groundColor', 'ridgeColor'] as const) {
    check(HEX.test(c[key]), `${at} ${key} is a 6-digit hex (${c[key]})`)
  }

  check(c.keyIntensity > 0, `${at} key intensity is positive (${c.keyIntensity})`)
  check(c.fillIntensity > 0, `${at} fill intensity is positive (${c.fillIntensity})`)

  // The key-to-fill ratio is the single number that decides whether the scene
  // models or flattens. A ratio near 1 is a flat render; the floor here is
  // deliberately low so a future entry cannot quietly reintroduce the wash.
  const ratio = c.keyIntensity / c.fillIntensity
  check(ratio > 1.8, `${at} key:fill ratio is above the flattening threshold (${ratio.toFixed(2)}:1)`)

  // The land must be darker than the sky, or the horizon has no figure/ground.
  const ground = relativeLuma(c.groundColor)
  const horizon = relativeLuma(c.skyHorizon)
  check(ground < horizon, `${at} ground (${ground.toFixed(3)}) is darker than the horizon sky (${horizon.toFixed(3)})`)

  check(c.cameraPos[2] > c.cameraTarget[2], `${at} camera looks forward along -Z (pos.z > target.z)`)
  check(Math.abs(c.cameraPos[0] - c.cameraTarget[0]) < 60, `${at} camera is not yawed off-axis`)
  check(c.fov >= 26 && c.fov <= 74, `${at} fov is within a usable range (${c.fov})`)
  check(
    c.composition === 'left' || c.composition === 'right' || c.composition === 'center',
    `${at} composition is a known side`
  )
})

// The camera must actually travel: a score whose waypoints do not move is a
// score the reader will notice.
for (let i = 1; i < SCORE_LENGTH; i++) {
  const prev = CHAPTER_SCENE_CONFIGS[i - 1].cameraPos
  const cur = CHAPTER_SCENE_CONFIGS[i].cameraPos
  const dz = prev[2] - cur[2]
  check(dz > 10, `[score ${i - 1}→${i}] camera advances down the valley by ${dz.toFixed(0)} units`)
}

console.log('── Chapters ───────────────────────────────────────────')

check(documentary.chapters.length === 9, `Nine chapters (${documentary.chapters.length})`)

const slugs = new Set<string>()
const beatIds = new Set<string>()
documentary.chapters.forEach((chapter, i) => {
  const at = `[chapter ${chapter.index} ${chapter.id}]`
  check(chapter.index === i + 1, `${at} index is sequential (${chapter.index})`)
  check(!slugs.has(chapter.slug), `${at} slug is unique`)
  slugs.add(chapter.slug)
  check(chapter.title.trim().length > 0, `${at} has a title`)
  check(chapter.beats.length > 0, `${at} has at least one beat (${chapter.beats.length})`)
  check(
    chapter.composition === 'left' || chapter.composition === 'right' || chapter.composition === 'center',
    `${at} declares a composition`
  )

  chapter.beats.forEach((beat) => {
    const bat = `${at} / beat ${beat.id}`
    check(!beatIds.has(beat.id), `${bat} id is unique`)
    beatIds.add(beat.id)
    check(beat.chapterId === chapter.id, `${bat} points back at its own chapter`)
    check(beat.blocks.length > 0, `${bat} has content`)
    beat.blocks.forEach((block, bi) => checkBlock(block, `${bat} / block ${bi}`))
  })
})

console.log('── Framing ────────────────────────────────────────────')

check(documentary.intro.length >= 3, `Intro carries title, deck and body (${documentary.intro.length})`)
const introHeading = documentary.intro.find((b) => b.type === 'heading')
check(introHeading !== undefined, 'Intro has a heading block for the prologue to title itself with')
check(
  documentary.intro.slice(2).some((b) => b.type === 'paragraph'),
  'Intro has body copy after the title block (otherwise the prologue renders empty)'
)
check(documentary.epilogue.length > 0, `Epilogue has content (${documentary.epilogue.length})`)
check(
  documentary.epilogue.some((b) => b.type === 'heading'),
  'Epilogue has a heading block for the conclusion to title itself with'
)
check(
  documentary.epilogue.filter((b) => b.type === 'paragraph').length > 0,
  'Epilogue has body copy after its heading (otherwise the conclusion renders as a title alone)'
)
check(documentary.references.length > 0, `References are present (${documentary.references.length})`)

// The conclusion's title is lifted out of the content and rendered once as the
// section heading. If the content stops providing a heading, the fallback string
// in the component becomes a second, silently-drifting source of truth.
const epilogueHeading = documentary.epilogue.find((b) => b.type === 'heading')
if (epilogueHeading && epilogueHeading.type === 'heading') {
  check(
    epilogueHeading.title.trim().length > 0,
    'Epilogue heading has a title for the band to render'
  )
}

console.log('── Archival plates ────────────────────────────────────')

const referenced = new Set<string>(['/images/osho/osho-portrait'])
documentary.chapters.forEach((c) =>
  c.beats.forEach((b) =>
    b.blocks.forEach((block) => {
      if (block.type === 'image') referenced.add(block.src.replace(/\.\w+$/, ''))
    })
  )
)
documentary.epilogue.forEach((block) => {
  if (block.type === 'image') referenced.add(block.src.replace(/\.\w+$/, ''))
})

for (const rel of referenced) {
  const entry = IMAGE_MANIFEST[rel]
  check(!!entry, `Plate has a manifest entry, so it gets a srcset and intrinsic size: ${rel}`)
  if (!entry) continue

  for (const v of [...entry.webp, entry.fallback].filter(Boolean) as string[]) {
    const disk = path.join(rootDir, 'public', v.replace(/^\//, ''))
    check(fs.existsSync(disk), `Derived plate exists on disk: ${v}`)
    if (fs.existsSync(disk)) {
      check(fs.statSync(disk).size > 4_000, `Derived plate is not a stub: ${v}`)
    }
  }
}

/**
 * The originals are archival source material and must not ship. A 900px scan
 * displayed at 240 CSS pixels is 267KB of pixels for 34KB of image, and Vercel
 * serves every byte in `public/` — an unsized file there is a silent cost on
 * every deployment, forever, whether or not it is ever requested.
 */
const plateDir = path.join(rootDir, 'public/images/osho')
const shipped = fs.existsSync(plateDir) ? fs.readdirSync(plateDir) : []
const unsized = shipped.filter(
  (f) => /\.(jpe?g|png|webp)$/i.test(f) && !/-(400|900|1600)\.(webp|jpg)$/i.test(f)
)
check(
  unsized.length === 0,
  `No unsized originals in public/images/osho (found: ${unsized.join(', ') || 'none'})`
)
check(
  fs.existsSync(path.join(rootDir, 'source/images')),
  'Archival originals are retained in source/images for regeneration'
)

console.log('── Deployment ─────────────────────────────────────────')

for (const file of ['public/robots.txt', 'public/sitemap.xml', 'vercel.json']) {
  check(fs.existsSync(path.join(rootDir, file)), `${file} is present`)
}

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8')
check(!indexHtml.includes('\uFFFD'), 'index.html contains no replacement characters (U+FFFD)')
check(indexHtml.includes('rel="canonical"'), 'index.html declares a canonical URL')
check(indexHtml.includes('og:image'), 'index.html declares an Open Graph image')
check(indexHtml.includes('application/ld+json'), 'index.html declares structured data')
check(indexHtml.includes('EB+Garamond'), 'index.html preloads the font family the stylesheet actually uses')
check(indexHtml.includes('Inter'), 'index.html preloads the body font family')
check(
  !indexHtml.includes('fonts.googleapis.com/css2?family=Playfair'),
  'index.html does not preload a font family the stylesheet abandoned'
)

// ─── helpers ──────────────────────────────────────────────────────────────

function checkBlock(block: DocumentaryBlock, at: string) {
  if (block.evidence !== undefined) {
    check(EVIDENCE.has(block.evidence), `${at} evidence kind is declared (${block.evidence})`)
  }

  switch (block.type) {
    case 'heading':
      check(block.title.trim().length > 0, `${at} heading has a title`)
      break
    case 'paragraph':
      check(block.body.trim().length > 0, `${at} paragraph has a body`)
      break
    case 'quote':
      check(block.text.trim().length > 0, `${at} quote has text`)
      check(
        !!(block.attribution || block.source),
        `${at} quote is attributed or sourced (an unattributed quote is a fabrication risk)`
      )
      break
    case 'analysis':
      check(block.body.trim().length > 0, `${at} analysis has a body`)
      break
    case 'statement':
      check(block.body.trim().length > 0, `${at} statement has a body`)
      break
    case 'timeline':
      check(block.items.length > 0, `${at} timeline has entries`)
      block.items.forEach((item, i) => {
        check(!!item.year.trim(), `${at} timeline item ${i} has a year`)
        check(item.event.trim().length > 0, `${at} timeline item ${i} has an event`)
      })
      break
    case 'reference':
      check(block.citation.trim().length > 0, `${at} reference has a citation`)
      if (block.url) {
        check(/^https?:\/\//.test(block.url), `${at} reference url is absolute (${block.url})`)
      }
      break
    case 'image':
      check(block.src.trim().length > 0, `${at} image has a src`)
      check(
        IMAGE_ROLES.includes(block.role),
        `${at} image declares a role (${block.role}) — an image with no role has no box`
      )
      check(block.alt.trim().length > 0, `${at} image has alt text`)
      check(!!block.archiveSource, `${at} archival image is credited (${block.src})`)
      break
  }
}

/** Rec. 709 relative luminance of a 6-digit hex, without pulling in three.js. */
function relativeLuma(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

console.log(
  failed === 0
    ? `\n✓ ${total} checks passed.\n`
    : `\n✗ ${failed} of ${total} checks failed.\n`
)
process.exit(failed === 0 ? 0 : 1)
