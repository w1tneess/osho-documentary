import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollCamera } from './scene/camera/ScrollCamera';
import { Atmosphere } from './scene/systems/Atmosphere';
import { LightingRig } from './scene/environment/LightingRig';
import { SkyDome } from './scene/environment/SkyDome';
import { ForegroundFraming } from './scene/environment/ForegroundFraming';
import { ChapterStructures } from './scene/environment/ChapterStructures';
import { WorldTerrain } from './scene/environment/WorldTerrain';
import { DistantHorizon } from './scene/environment/DistantHorizon';
import { AtmosphericMotes } from './scene/environment/AtmosphericMotes';
import { sampleScore } from '../../entities/chapter/chapters';
import type { QualityLevel } from '../../features/useQualityLevel';
import { useAppStore } from '../../features/store';

interface SceneCanvasProps {
  quality: QualityLevel;
  reducedMotion: boolean;
}

/**
 * The persistent R3F canvas.
 *
 * Layer order *is* the depth structure of the piece, stated once:
 *
 *   SkyDome            BACKGROUND — a real vertical value range
 *   DistantHorizon     BACKGROUND — three ridge bands lifted to aerial haze
 *   WorldTerrain       MIDGROUND   — the continuous valley the camera travels
 *   ChapterStructures  MIDGROUND   — the subjects of each chapter
 *   ForegroundFraming  FOREGROUND  — dark near-plane silhouettes
 *   AtmosphericMotes   ATMOSPHERE  — suspended dust, only under a raking sun
 *
 * There is no post-processing chain. Bloom at a 0.93 luminance threshold adds
 * a pass, a dependency and a framebuffer for a highlight the sun core already
 * produces, and a vignette belongs over the whole frame — DOM included — which
 * a post pass cannot reach. Both are cheaper and better as CSS. The cost is one
 * render target and roughly 150KB of bundle.
 *
 * The canvas mounts only after first paint. The documentary is the product; the
 * 3D world is the room it is shown in, and the room should not be what a visitor
 * waits for.
 */
export function SceneCanvas({ quality, reducedMotion }: SceneCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Two frames: one to paint the document, one to let the browser commit it.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  const dpr: [number, number] =
    quality === 'high' ? [1, 1.75] : quality === 'medium' ? [1, 1.35] : [0.75, 1];

  if (!mounted) return null;

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows={quality !== 'low'}
        gl={{
          antialias: quality !== 'low',
          alpha: false,
          powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ fov: 52, near: 0.5, far: 2600, position: [-2.2, 3.1, 12] }}
        onCreated={({ gl }) => {
          // Percentage-closer soft filtering: a wider kernel than the default
          // without the cost of a full PCSS injection, which is all the shadow
          // softening this scene actually needs.
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <ScoreExposure />

          <ScrollCamera reducedMotion={reducedMotion} />
          <LightingRig quality={quality} />
          <Atmosphere />

          {/* Depth order, back to front. */}
          <SkyDome />
          <DistantHorizon />
          <WorldTerrain quality={quality} />
          <ChapterStructures quality={quality} />
          <ForegroundFraming quality={quality} />
          <AtmosphericMotes
            quality={quality}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Exposure is the last dial on the tonal scale, and the previous build never
 * touched it after mount — so every chapter was graded at the same stop. It is
 * sampled from the score here, in the one place that owns the renderer.
 */
function ScoreExposure() {
  const gl = useThree((s) => s.gl);
  useFrame(() => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const next = THREE.MathUtils.lerp(lower.exposure, upper.exposure, mix);
    gl.toneMappingExposure += (next - gl.toneMappingExposure) * 0.08;
  });
  return null;
}
