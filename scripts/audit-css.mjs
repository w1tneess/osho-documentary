// Reports CSS classes and custom properties that no component references.
// Run: node scripts/audit-css.mjs
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const styleDir = path.join(root, 'src/shared/styles')
const css = fs
  .readdirSync(styleDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => fs.readFileSync(path.join(styleDir, f), 'utf8'))
  .join('\n')

// Class names, including those composed by template literals
// (`spread--${composition}`, `plate-figure--${role}`), which a naive scan misses.
const declared = new Set(
  [...css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1])
)

const sources = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(tsx?|jsx?)$/.test(e.name)) sources.push(fs.readFileSync(p, 'utf8'))
  }
}
walk(path.join(root, 'src'))
const all = sources.join('\n')

// A class is "referenced" if it appears literally, or as a hyphenated fragment
// that some template literal could compose (e.g. `spread--left` is produced by
// `spread--${x}` when x === 'left').
const literals = new Set(
  [...all.matchAll(/className=\{?["'`]([^"'`]+)["'`]/g)].flatMap((m) =>
    m[1].split(/\s+/).filter(Boolean)
  )
)

// Classes that are legitimately not referenced from a TSX className:
//  - added imperatively via classList (reveal on scroll)
//  - applied from index.html (the pre-hydration fallback shell)
const EXTERNAL = new Set(['is-visible', 'skip-link', 'webgl-fallback', 'no-js', 'js'])

const dead = [...declared]
  .filter((c) => !literals.has(c) && !EXTERNAL.has(c))
  // Skip filename and TLD fragments picked up from URLs in comments.
  .filter((c) => !/^\d/.test(c) && !/^(css|org|net|w3|tsx|ts|html|js|json|xml|com|dev|in)$/.test(c))
  .filter((c) => {
    // Skip composed names: keep any declaration whose distinct segments are all
    // known literals somewhere in the source.
    if (c.includes('__')) return true
    const head = c.split('--')[0]
    if (c.includes('--') && literals.has(head)) return false
    if (c.includes('--') && all.includes(`${head}--`)) return false
    return true
  })
  .filter((c) => !/^(spread|plate-figure|opener|drawer|rail|nav|hero|beat|reference|timeline|aside|pull|statement|prose|evidence|section|grade|colophon|split|scrim|mote)-?$/.test(c))

console.log('--- CSS class rules with no reference in src/ ---')
if (dead.length === 0) console.log('  (none)')
for (const c of dead.sort()) console.log(`  .${c}`)

// Custom properties: declared vs consumed. Consumption has to be scanned across
// CSS as well as TSX — every `var()` in this project lives in a stylesheet, so a
// TSX-only scan reports the entire token system as dead.
const declaredVars = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))
const usedVars = new Set([
  ...[...css.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]),
  ...[...all.matchAll(/var\(\s*(['"]?)(--[\w-]+)\1/g)].map((m) => m[2]),
])
const unusedVars = [...declaredVars].filter((v) => !usedVars.has(v)).sort()

console.log(`\n--- Custom properties declared but never consumed: ${unusedVars.length} ---`)
for (const v of unusedVars) console.log(`  ${v}`)

const missing = [...usedVars].filter((v) => !declaredVars.has(v)).sort()
console.log(`\n--- Custom properties consumed but never declared: ${missing.length} ---`)
for (const v of missing) console.log(`  ${v}`)

// Media query census: responsive behaviour should be a handful of deliberate
// compositions, not a pile of one-off overrides.
console.log('\n--- Media queries by file ---')
for (const f of fs.readdirSync(styleDir).filter((x) => x.endsWith('.css'))) {
  const src = fs.readFileSync(path.join(styleDir, f), 'utf8')
  const qs = [...src.matchAll(/@media[^{]+/g)].map((m) => m[0].replace(/\s+/g, ' ').trim())
  if (qs.length) console.log(`  ${f}: ${qs.length}`)
  for (const q of qs) console.log(`      ${q}`)
}
