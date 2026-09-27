import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollCamera } from '../../scene/camera/ScrollCamera';
import { Atmosphere } from '../../scene/systems/Atmosphere';
import { LightingRig } from '../../scene/environment/LightingRig';
import { ForegroundFraming } from '../../scene/environment/ForegroundFraming';
import { ChapterStructures } from '../../scene/environment/ChapterStructures';
import { WorldTerrain } from '../../scene/environment/WorldTerrain';
import { DistantHorizon } from '../../scene/environment/DistantHorizon';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface SceneCanvasProps {
  scrollProgress: React.RefObject<number>;
  quality: QualityLevel;
}

/**
 * The persistent R3F Canvas:
 * Orchestrates the full 3D documentary environment:
 * - Foreground framing elements
 * - Midground architecture and nature
 * - Expansive world terrain and pathway
 * - Distant mountain horizon
 * - Cinematic lighting and atmospheric fog
 */
export function SceneCanvas({ scrollProgress, quality }: SceneCanvasProps) {
  const dpr = quality === 'high' ? [1, 2] : quality === 'medium' ? [1, 1.5] : [1, 1];

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr as [number, number]}
        shadows={quality !== 'low'}
        gl={{
          antialias: quality !== 'low',
          alpha: false,
          powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 48,
          near: 0.2,
          far: 500,
          position: [0, 2.8, 14],
        }}
        onCreated={({ scene }) => {
          // Initial atmospheric fog (evolves via Atmosphere component)
          scene.fog = new THREE.Fog('#d4c0a0', 15, 140);
          scene.background = new THREE.Color('#d4c0a0');
        }}
      >
        {/* Cinematic camera rig driven by scroll */}
        <ScrollCamera scrollProgress={scrollProgress} />

        {/* Dynamic sun, hemisphere fill, and shadow generator */}
        <LightingRig scrollProgress={scrollProgress} quality={quality} />

        {/* Atmospheric fog controller */}
        <Atmosphere scrollProgress={scrollProgress} />

        {/* Layer 1: Foreground Framing (close to camera, strong parallax) */}
        <ForegroundFraming quality={quality} />

        {/* Layer 2: Midground Environment & Narrative Architecture */}
        <ChapterStructures quality={quality} />

        {/* Layer 3: Ground Landscape & Valley Road */}
        <WorldTerrain quality={quality} scrollProgress={scrollProgress} />

        {/* Layer 4: Distant Mountain Silhouettes & Horizon */}
        <DistantHorizon quality={quality} />
      </Canvas>
    </div>
  );
}
