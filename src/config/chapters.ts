/**
 * Chapter configuration: defines the 3D scene parameters for each chapter.
 * Each chapter maps to a camera position, fog, lighting, and color palette
 * that evolves the 3D environment as the story progresses.
 */

export interface ChapterSceneConfig {
  id: string;
  /** Camera target Y position (scroll drives interpolation between chapters) */
  cameraY: number;
  /** Fog color — blends with the background */
  fogColor: string;
  fogNear: number;
  fogFar: number;
  /** Ambient light intensity */
  ambientIntensity: number;
  /** Directional light color */
  lightColor: string;
  lightIntensity: number;
  /** Background gradient stops */
  bgTop: string;
  bgBottom: string;
  /** Particle density multiplier (1 = base) */
  particleDensity: number;
  /** Ground plane color */
  groundColor: string;
}

export const CHAPTER_SCENE_CONFIGS: ChapterSceneConfig[] = [
  {
    // Intro — warm dawn, gentle
    id: 'intro',
    cameraY: 0,
    fogColor: '#e4d2b5',
    fogNear: 40,
    fogFar: 240,
    ambientIntensity: 0.6,
    lightColor: '#ffeedd',
    lightIntensity: 1.2,
    bgTop: '#d4a07a',
    bgBottom: '#f0e6d0',
    particleDensity: 0.6,
    groundColor: '#c4a97a',
  },
  {
    // Ch 1: Early Life — soft golden morning
    id: 'early-life',
    cameraY: -8,
    fogColor: '#dfcfb2',
    fogNear: 35,
    fogFar: 220,
    ambientIntensity: 0.6,
    lightColor: '#ffe8c0',
    lightIntensity: 1.2,
    bgTop: '#c8a068',
    bgBottom: '#e8d8b8',
    particleDensity: 0.7,
    groundColor: '#b89868',
  },
  {
    // Ch 2: Founding — warming light
    id: 'founding-movement',
    cameraY: -16,
    fogColor: '#d6c4a0',
    fogNear: 35,
    fogFar: 220,
    ambientIntensity: 0.65,
    lightColor: '#ffd8a0',
    lightIntensity: 1.25,
    bgTop: '#b89060',
    bgBottom: '#d8c8a8',
    particleDensity: 0.8,
    groundColor: '#a88858',
  },
  {
    // Ch 3: Pune Ashram — lush, abundant
    id: 'pune-ashram',
    cameraY: -24,
    fogColor: '#cbb48f',
    fogNear: 30,
    fogFar: 200,
    ambientIntensity: 0.7,
    lightColor: '#ffc878',
    lightIntensity: 1.3,
    bgTop: '#a88050',
    bgBottom: '#c8b898',
    particleDensity: 1.0,
    groundColor: '#987848',
  },
  {
    // Ch 4: Oregon — stark American desert
    id: 'rajneeshpuram',
    cameraY: -32,
    fogColor: '#c0ab8c',
    fogNear: 45,
    fogFar: 260,
    ambientIntensity: 0.75,
    lightColor: '#ffb858',
    lightIntensity: 1.4,
    bgTop: '#987040',
    bgBottom: '#b8a888',
    particleDensity: 1.2,
    groundColor: '#886838',
  },
  {
    // Ch 5: Legal Reckoning — cooling, twilight
    id: 'legal-reckoning',
    cameraY: -40,
    fogColor: '#8a99a8',
    fogNear: 30,
    fogFar: 190,
    ambientIntensity: 0.5,
    lightColor: '#aabbcc',
    lightIntensity: 0.95,
    bgTop: '#607080',
    bgBottom: '#8898a8',
    particleDensity: 0.8,
    groundColor: '#607080',
  },
  {
    // Ch 6: What He Got Wrong — somber dusk
    id: 'fundamentally-wrong',
    cameraY: -48,
    fogColor: '#707d8a',
    fogNear: 28,
    fogFar: 180,
    ambientIntensity: 0.45,
    lightColor: '#8899aa',
    lightIntensity: 0.85,
    bgTop: '#485868',
    bgBottom: '#687888',
    particleDensity: 0.5,
    groundColor: '#506070',
  },
  {
    // Ch 7: What He Got Right — cautious warmth returning
    id: 'philosophically-right',
    cameraY: -56,
    fogColor: '#9e917d',
    fogNear: 35,
    fogFar: 220,
    ambientIntensity: 0.55,
    lightColor: '#ddc898',
    lightIntensity: 1.05,
    bgTop: '#887858',
    bgBottom: '#a89878',
    particleDensity: 0.9,
    groundColor: '#887858',
  },
  {
    // Ch 8: Final Years — quiet, contemplative evening
    id: 'final-years',
    cameraY: -64,
    fogColor: '#807263',
    fogNear: 30,
    fogFar: 200,
    ambientIntensity: 0.48,
    lightColor: '#c8a878',
    lightIntensity: 0.9,
    bgTop: '#584838',
    bgBottom: '#786858',
    particleDensity: 0.6,
    groundColor: '#685848',
  },
  {
    // Ch 9: Impact & Legacy — open horizon, mixed light
    id: 'impact-legacy',
    cameraY: -72,
    fogColor: '#98a5b2',
    fogNear: 45,
    fogFar: 260,
    ambientIntensity: 0.65,
    lightColor: '#bbccdd',
    lightIntensity: 1.15,
    bgTop: '#7890a0',
    bgBottom: '#b0c0d0',
    particleDensity: 0.7,
    groundColor: '#8898a8',
  },
  {
    // Epilogue — final horizon: warm gold merging into open sky
    id: 'epilogue',
    cameraY: -80,
    fogColor: '#d2bea0',
    fogNear: 50,
    fogFar: 300,
    ambientIntensity: 0.7,
    lightColor: '#ffe0b0',
    lightIntensity: 1.3,
    bgTop: '#d4a878',
    bgBottom: '#e8d0b0',
    particleDensity: 0.5,
    groundColor: '#c8a878',
  },
];

/** Total number of scrollable "pages" */
export const TOTAL_SCROLL_PAGES = CHAPTER_SCENE_CONFIGS.length;
