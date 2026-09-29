/**
 * THE DOCUMENTARY SCORE
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for how the world *looks* at every narrative beat.
 *
 * The previous model treated each chapter as a flat colour wash: a fog colour
 * equal to the background colour, with fog starting 40 units from the camera.
 * Because the terrain is 740 units long and the camera rides 2–3 units above it,
 * that meant everything beyond the nearest dune was already 100% fog — the whole
 * frame converged on one sand value. That is the "washed out" problem, and no
 * amount of CSS can fix it. It is a lighting/atmosphere problem.
 *
 * The model is now a *score*, and it enforces the three things a real
 * documentary frame needs:
 *
 *   1. A SKY with an actual vertical value range (zenith, horizon, below).
 *   2. AERIAL PERSPECTIVE via exponential-squared fog. This is not decoration,
 *      it is the depth gate: the current chapter's subject sits 20–50 units
 *      from the lens and the next chapter's sits 120–180 units away, and a
 *      linear fog ramp cannot serve both ends of that range at once. At
 *      density 0.005–0.0095 the near subject stays crisp while the next
 *      chapter dissolves to a silhouette — which is what isolates each frame
 *      without ever switching the scene.
 *   3. A KEY-TO-FILL RATIO — a strong, low, directional sun against a much
 *      weaker hemisphere fill, so surfaces model and cast readable shadows.
 *
 * Every field is interpolated by normalized scroll progress, so the world
 * evolves continuously. There are no scene swaps.
 */

/** Where the documentary text sits relative to the 3D subject. */
export type CompositionSide =
  /** Text column on the left, subject weighted to the right third. */
  | 'left'
  /** Text column on the right, subject weighted to the left third. */
  | 'right'
  /** Text centred, subject pushed low and wide (statement / quote beats). */
  | 'center'
  /** Text anchored to the bottom band (portrait viewports, quiet horizons). */
  | 'lower';

export interface ChapterSceneConfig {
  /** Stable id — must match the DOM section id. */
  id: string;

  // ── Camera ────────────────────────────────────────────────────────────────
  /** Eye position in world space. */
  cameraPos: readonly [number, number, number];
  /** Look-at target in world space. */
  cameraTarget: readonly [number, number, number];
  /**
   * Vertical field of view in degrees. Chosen per shot, never as a blanket
   * responsive lever: wide angles open the world (vastness, scale, failure);
   * long lenses compress and isolate (intimacy, a single held moment).
   */
  fov: number;
  /** Lateral dolly applied in screen space, in units of a 16:9 frame width. */
  subjectShift: number;

  // ── Sky ───────────────────────────────────────────────────────────────────
  /** Zenith colour — always the darkest or lightest extreme of the sky. */
  skyZenith: string;
  /** Mid-sky colour. */
  skyMid: string;
  /** Horizon colour — where the world meets the eye. */
  skyHorizon: string;
  /** Direction the sun sits, in degrees around Y from -Z. */
  sunAzimuth: number;
  /** Sun elevation above the horizon, in degrees. Low = long shadows. */
  sunElevation: number;
  /** Sun disc + halo colour. */
  sunColor: string;
  /** Sun disc brightness, 0 hides it. */
  sunIntensity: number;

  // ── Atmosphere ────────────────────────────────────────────────────────────
  /** Exponential-squared fog density. Replaces the old near/far pair.
   *  ~0.005 keeps the near subject crisp; ~0.0095 closes the frame down. */
  fogDensity: number;
  /** Aerial-perspective colour. Deliberately a little darker and cooler than
   *  `skyHorizon`, so the distant ridge bands still read as shapes rather than
   *  dissolving into the sky entirely. */
  fogColor: string;

  // ── Light ─────────────────────────────────────────────────────────────────
  /** Directional key (sun) colour. */
  keyColor: string;
  /** Directional key intensity. */
  keyIntensity: number;
  /** Hemisphere sky term. */
  fillSky: string;
  /** Hemisphere ground-bounce term. */
  fillGround: string;
  /** Hemisphere intensity — deliberately a fraction of the key. */
  fillIntensity: number;
  /** A low-intensity rim from behind, to peel silhouettes off the background. */
  rimColor: string;
  rimIntensity: number;

  // ── Ground ────────────────────────────────────────────────────────────────
  /** Terrain base colour. Deliberately darker than the sky: land is not sky. */
  groundColor: string;
  /** Far-ridge colour, slightly lifted toward the fog for aerial depth. */
  ridgeColor: string;

  // ── Grade ─────────────────────────────────────────────────────────────────
  /** Tone-mapping exposure. Restrained: 0.7–0.95 keeps highlight rolloff. */
  exposure: number;
  /** Vignette strength, 0 disables. */
  vignette: number;

  // ── Atmosphere density (particles) ────────────────────────────────────────
  particleDensity: number;

  // ── Composition ───────────────────────────────────────────────────────────
  /** Which side the editorial column occupies. */
  composition: CompositionSide;
  /** Flavour tag used by the DOM layer to choose a scrim shape. */
  mood: 'open' | 'intimate' | 'vast' | 'closing';
}

export const CHAPTER_SCENE_CONFIGS: readonly ChapterSceneConfig[] = [
  {
    // ── 0 · PROLOGUE ── Dawn over the valley. Cold blue zenith, warm low sun.
    // The world is quiet, wide and mostly empty. Nothing has happened yet.
    id: 'intro',
    cameraPos: [-2.2, 3.1, 12],
    cameraTarget: [1.4, 2.4, -26],
    fov: 52,
    subjectShift: 0.16,
    skyZenith: '#2b3f57',
    skyMid: '#8a8e93',
    skyHorizon: '#e2a886',
    sunAzimuth: 38,
    sunElevation: 7,
    sunColor: '#ffb877',
    sunIntensity: 1.5,
    fogColor: '#b9ac9a',
    fogDensity: 0.0072,
    keyColor: '#ffc489',
    keyIntensity: 2.5,
    fillSky: '#7e93ad',
    fillGround: '#4a3826',
    fillIntensity: 1.05,
    rimColor: '#c8d8ea',
    rimIntensity: 0.5,
    groundColor: '#8a7458',
    ridgeColor: '#ab987c',
    exposure: 0.88,
    vignette: 0.42,
    particleDensity: 0.5,
    composition: 'left',
    mood: 'open',
  },
  {
    // ── 1 · CH 01 Early Life ── Morning. A single tree, hard light, short shadows.
    // Curiosity: crisp, defined, still small.
    id: 'early-life',
    cameraPos: [-3.4, 2.4, -16],
    cameraTarget: [3.6, 2.2, -34],
    fov: 44,
    subjectShift: 0.2,
    skyZenith: '#2d4a6b',
    skyMid: '#7d9cbd',
    skyHorizon: '#e8d2ae',
    sunAzimuth: 62,
    sunElevation: 26,
    sunColor: '#fff0d2',
    sunIntensity: 2.0,
    fogColor: '#c3c2b6',
    fogDensity: 0.0068,
    keyColor: '#fff2dc',
    keyIntensity: 2.9,
    fillSky: '#93b1d0',
    fillGround: '#5c452c',
    fillIntensity: 1.15,
    rimColor: '#bcd2e8',
    rimIntensity: 0.45,
    groundColor: '#947d5e',
    ridgeColor: '#b4a486',
    exposure: 0.94,
    vignette: 0.36,
    particleDensity: 0.7,
    composition: 'left',
    mood: 'intimate',
  },
  {
    // ── 2 · CH 02 Founding ── The sun climbs. Warm, saturated, ceremonial.
    // The world gains scale: the first architecture appears.
    id: 'founding-movement',
    cameraPos: [2.8, 2.9, -50],
    cameraTarget: [-2.2, 2.6, -70],
    fov: 46,
    subjectShift: -0.18,
    skyZenith: '#2f5680',
    skyMid: '#84a6c6',
    skyHorizon: '#f0cfa0',
    sunAzimuth: 88,
    sunElevation: 34,
    sunColor: '#ffe6bc',
    sunIntensity: 2.1,
    fogColor: '#cabd9f',
    fogDensity: 0.0064,
    keyColor: '#ffdfae',
    keyIntensity: 3.0,
    fillSky: '#8fb0cd',
    fillGround: '#5e4429',
    fillIntensity: 1.1,
    rimColor: '#c4d6e6',
    rimIntensity: 0.4,
    groundColor: '#a2855c',
    ridgeColor: '#c0ab8a',
    exposure: 0.95,
    vignette: 0.34,
    particleDensity: 0.9,
    composition: 'right',
    mood: 'open',
  },
  {
    // ── 3 · CH 03 Pune Ashram ── High summer. Rich, dense, almost over-exposed
    // in the highlights: the utopia at its most convincing.
    id: 'pune-ashram',
    cameraPos: [-1.4, 3.4, -104],
    cameraTarget: [0.4, 2.2, -132],
    fov: 50,
    subjectShift: 0.12,
    skyZenith: '#245a86',
    skyMid: '#79a8cc',
    skyHorizon: '#f6dcae',
    sunAzimuth: 116,
    sunElevation: 48,
    sunColor: '#fff6e0',
    sunIntensity: 2.3,
    fogColor: '#cfc3a4',
    fogDensity: 0.0064,
    keyColor: '#fff2d8',
    keyIntensity: 3.1,
    fillSky: '#86b2d4',
    fillGround: '#5a4a2e',
    fillIntensity: 1.2,
    rimColor: '#b9d0e4',
    rimIntensity: 0.35,
    groundColor: '#a88a5c',
    ridgeColor: '#c4af8b',
    exposure: 1.0,
    vignette: 0.3,
    particleDensity: 1.0,
    composition: 'left',
    mood: 'open',
  },
  {
    // ── 4 · CH 04 The Oregon Commune ── Hard, thin, high-desert light.
    // The palette turns arid. Distance becomes enormous.
    id: 'rajneeshpuram',
    cameraPos: [5.0, 8.6, -228],
    cameraTarget: [-3.0, 1.6, -268],
    fov: 40,
    subjectShift: -0.22,
    skyZenith: '#1d5588',
    skyMid: '#6e9ec8',
    skyHorizon: '#f4e2bd',
    sunAzimuth: 148,
    sunElevation: 58,
    sunColor: '#fffaf0',
    sunIntensity: 2.6,
    fogColor: '#cbc7b6',
    fogDensity: 0.0058,
    keyColor: '#fff8ea',
    keyIntensity: 3.4,
    fillSky: '#7dabd4',
    fillGround: '#6b5a40',
    fillIntensity: 1.3,
    rimColor: '#c8dcee',
    rimIntensity: 0.3,
    groundColor: '#bda780',
    ridgeColor: '#cfbf9c',
    exposure: 1.02,
    vignette: 0.3,
    particleDensity: 0.8,
    composition: 'right',
    mood: 'vast',
  },
  {
    // ── 5 · CH 05 Legal Reckoning ── The turn. The light drops hard.
    // A compressed, low, raking sun; a long black shadow across the valley.
    // The frame stops being warm. This is the first real tonal break.
    id: 'legal-reckoning',
    cameraPos: [-2.8, 2.5, -300],
    cameraTarget: [1.8, 1.2, -328],
    fov: 46,
    subjectShift: 0.2,
    skyZenith: '#16283f',
    skyMid: '#4a5a70',
    skyHorizon: '#c98d5c',
    sunAzimuth: 196,
    sunElevation: 9,
    sunColor: '#ff8f52',
    sunIntensity: 1.8,
    fogColor: '#6d6a68',
    fogDensity: 0.0082,
    keyColor: '#ff9d63',
    keyIntensity: 2.0,
    fillSky: '#4e627c',
    fillGround: '#2e2620',
    fillIntensity: 0.9,
    rimColor: '#8fa6c4',
    rimIntensity: 0.6,
    groundColor: '#6b5c49',
    ridgeColor: '#8a7c6a',
    exposure: 0.8,
    vignette: 0.5,
    particleDensity: 0.6,
    composition: 'left',
    mood: 'intimate',
  },
  {
    // ── 6 · CH 06 What He Got Fundamentally Wrong ── The collapse.
    // Low-key, cold, desaturated. Long shadows, a heavy vignette, no warmth
    // anywhere. The sky is nearly flat: the frame closes in on itself.
    id: 'fundamentally-wrong',
    cameraPos: [2.2, 2.2, -366],
    cameraTarget: [-2.4, 1.6, -398],
    fov: 38,
    subjectShift: -0.2,
    skyZenith: '#0d1723',
    skyMid: '#25313f',
    skyHorizon: '#4a5464',
    sunAzimuth: 232,
    sunElevation: 4,
    sunColor: '#7a6a70',
    sunIntensity: 0.5,
    fogColor: '#39424f',
    fogDensity: 0.0095,
    keyColor: '#8e8a92',
    keyIntensity: 1.55,
    fillSky: '#33465c',
    fillGround: '#1c1a18',
    fillIntensity: 0.52,
    rimColor: '#6f8296',
    rimIntensity: 0.75,
    groundColor: '#4a4744',
    ridgeColor: '#6b6d72',
    exposure: 0.7,
    vignette: 0.62,
    particleDensity: 0.35,
    composition: 'left',
    mood: 'intimate',
  },
  {
    // ── 7 · CH 07 What He Got Philosophically Right ── The opening.
    // The value range returns and then some: a low sun breaking through,
    // long light, a warm horizon under a still-cold zenith. Relief, not joy.
    id: 'philosophically-right',
    cameraPos: [0.0, 2.8, -434],
    cameraTarget: [0.0, 1.8, -466],
    fov: 48,
    subjectShift: 0.0,
    skyZenith: '#123252',
    skyMid: '#4d7ba6',
    skyHorizon: '#f0b478',
    sunAzimuth: 272,
    sunElevation: 11,
    sunColor: '#ffc07a',
    sunIntensity: 1.9,
    fogColor: '#7e8496',
    fogDensity: 0.0074,
    keyColor: '#ffc489',
    keyIntensity: 2.2,
    fillSky: '#5b7fa6',
    fillGround: '#3a3228',
    fillIntensity: 1.05,
    rimColor: '#9ec0e0',
    rimIntensity: 0.7,
    groundColor: '#75694f',
    ridgeColor: '#9a939e',
    exposure: 0.86,
    vignette: 0.46,
    particleDensity: 0.8,
    composition: 'center',
    mood: 'open',
  },
  {
    // ── 8 · CH 08 Final Years & Responsibility ── Stillness. The world holds
    // its breath: high contrast, one hard light, everything else falls away.
    id: 'final-years',
    cameraPos: [-1.6, 2.1, -506],
    cameraTarget: [0.8, 1.4, -546],
    fov: 42,
    subjectShift: 0.18,
    skyZenith: '#1a2c42',
    skyMid: '#536378',
    skyHorizon: '#d8a878',
    sunAzimuth: 306,
    sunElevation: 14,
    sunColor: '#ffbe86',
    sunIntensity: 1.6,
    fogColor: '#6f7278',
    fogDensity: 0.0086,
    keyColor: '#ffc999',
    keyIntensity: 1.9,
    fillSky: '#4e5f78',
    fillGround: '#2a241e',
    fillIntensity: 0.9,
    rimColor: '#8fa4bd',
    rimIntensity: 0.7,
    groundColor: '#5f5445',
    ridgeColor: '#7c776f',
    exposure: 0.78,
    vignette: 0.54,
    particleDensity: 0.5,
    composition: 'right',
    mood: 'intimate',
  },
  {
    // ── 9 · CH 09 Impact & Legacy ── The world opens again. Wide, hazy,
    // many traces receding. The palette is neutral-cool with one warm note.
    id: 'impact-legacy',
    cameraPos: [1.2, 2.4, -572],
    cameraTarget: [-0.6, 1.6, -614],
    fov: 54,
    subjectShift: -0.1,
    skyZenith: '#22405c',
    skyMid: '#6e8aa6',
    skyHorizon: '#e6cba6',
    sunAzimuth: 336,
    sunElevation: 19,
    sunColor: '#ffdaa8',
    sunIntensity: 1.7,
    fogColor: '#a3a9ac',
    fogDensity: 0.0062,
    keyColor: '#ffe0bb',
    keyIntensity: 2.1,
    fillSky: '#7b95ad',
    fillGround: '#463c2e',
    fillIntensity: 1.15,
    rimColor: '#b6cbdd',
    rimIntensity: 0.55,
    groundColor: '#867a63',
    ridgeColor: '#a8a6ad',
    exposure: 0.92,
    vignette: 0.38,
    particleDensity: 0.6,
    composition: 'left',
    mood: 'vast',
  },
  {
    // ── 10 · EPILOGUE ── The final horizon. Highest-key, lowest-contrast frame
    // in the documentary, and deliberately so: the material has been shown and
    // the judgement is the reader's. No verdict is manufactured.
    id: 'epilogue',
    cameraPos: [0.0, 2.6, -632],
    cameraTarget: [0.0, 2.2, -700],
    fov: 56,
    subjectShift: 0.0,
    skyZenith: '#3d5a7c',
    skyMid: '#95a8bd',
    skyHorizon: '#f4dcb6',
    sunAzimuth: 352,
    sunElevation: 12,
    sunColor: '#ffe4bb',
    sunIntensity: 1.4,
    fogColor: '#cfc7b8',
    fogDensity: 0.0052,
    keyColor: '#ffeed2',
    keyIntensity: 2.05,
    fillSky: '#93a8c0',
    fillGround: '#5a5040',
    fillIntensity: 0.95,
    rimColor: '#c6d4e2',
    rimIntensity: 0.4,
    groundColor: '#a49a84',
    ridgeColor: '#c2beb4',
    exposure: 1.0,
    vignette: 0.26,
    particleDensity: 0.45,
    composition: 'center',
    mood: 'closing',
  },
  {
    // ── 11 · REFERENCES ── The archive. Flat, quiet, evenly lit paper light.
    id: 'references',
    cameraPos: [0.0, 2.4, -664],
    cameraTarget: [0.0, 2.0, -736],
    fov: 56,
    subjectShift: 0.0,
    skyZenith: '#42597a',
    skyMid: '#9aa9bc',
    skyHorizon: '#efe0c4',
    sunAzimuth: 356,
    sunElevation: 10,
    sunColor: '#ffeacb',
    sunIntensity: 1.2,
    fogColor: '#cfcabf',
    fogDensity: 0.0048,
    keyColor: '#fff2dd',
    keyIntensity: 1.9,
    fillSky: '#9aabc0',
    fillGround: '#5e5646',
    fillIntensity: 0.72,
    rimColor: '#c8d4e0',
    rimIntensity: 0.35,
    groundColor: '#a8a08c',
    ridgeColor: '#a9a69e',
    exposure: 1.05,
    vignette: 0.2,
    particleDensity: 0.25,
    composition: 'center',
    mood: 'closing',
  },
];

/** Number of score entries (intro + 9 chapters + epilogue + references). */
export const SCORE_LENGTH = CHAPTER_SCENE_CONFIGS.length;

/**
 * DOM sections that participate in the score, in document order.
 * Must match the class names emitted by the documentary components.
 */
export const SECTION_SELECTOR =
  '.spread-hero, .spread-chapter, .spread-epilogue, .spread-references';

/**
 * Sample the score at normalized progress `t` in [0, 1].
 * Returns the index pair and the blend factor so callers can lerp what they need
 * without allocating.
 */
export function sampleScore(t: number): {
  lower: ChapterSceneConfig;
  upper: ChapterSceneConfig;
  mix: number;
} {
  const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t;
  const span = SCORE_LENGTH - 1;
  const f = clamped * span;
  const i = Math.min(Math.floor(f), span - 1);
  return {
    lower: CHAPTER_SCENE_CONFIGS[i],
    upper: CHAPTER_SCENE_CONFIGS[i + 1],
    mix: f - i,
  };
}
