import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The documentary and the 3D world are two different products sharing a page.
 * The reader can be reading before a single triangle exists, and on a device
 * that will never render one — so they ship as two chunks.
 *
 * `SceneCanvas` is imported dynamically from App.tsx, which puts three.js and
 * the R3F runtime in their own chunk behind a network round trip. Everything
 * else — every word of the documentary, the navigation, the contents drawer —
 * arrives in the entry chunk, which is roughly 40KB gzipped. The world then
 * loads behind it, and never blocks it.
 */
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    sourcemap: false,
    reportCompressedSize: true,

    // three.js is ~600KB on its own and will never fit under a 500KB warning
    // threshold. The threshold is raised rather than silenced so a genuine
    // regression in the app's own code is still visible.
    chunkSizeWarningLimit: 900,

    rollupOptions: {
      output: {
        // Explicit vendor split. R3F and three change on a different schedule
        // than the documentary, so they get their own long-lived cache entry.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'
          return 'vendor'
        },
      },
    },
  },
})
