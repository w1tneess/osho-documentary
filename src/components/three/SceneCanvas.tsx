import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollCamera } from '../../scene/camera/ScrollCamera';
import { DustParticles } from '../../scene/systems/DustParticles';
import { Terrain } from '../../scene/systems/Terrain';
import { Atmosphere } from '../../scene/systems/Atmosphere';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface SceneCanvasProps {
  scrollProgress: React.RefObject<number>;
  quality: QualityLevel;
}

/**
 * The persistent R3F Canvas — fixed behind the DOM content layer.
 * This is the "3D journey" described in the PRD.
 */
export function SceneCanvas({ scrollProgress, quality }: SceneCanvasProps) {
  const dpr = quality === 'high' ? [1, 2] : quality === 'medium' ? [1, 1.5] : [1, 1];

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr as [number, number]}
        gl={{
          antialias: quality !== 'low',
          alpha: false,
          powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 55,
          near: 0.5,
          far: 100,
          position: [0, 2, 12],
        }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog('#e8d8b8', 5, 30);
          scene.background = new THREE.Color('#e8d8b8');
        }}
      >
        {/* Camera rig driven by scroll */}
        <ScrollCamera scrollProgress={scrollProgress} />

        {/* Atmospheric controller */}
        <Atmosphere scrollProgress={scrollProgress} />

        {/* Lighting */}
        <ambientLight intensity={0.5} color="#ffeedd" />
        <directionalLight
          position={[8, 12, 5]}
          intensity={1.0}
          color="#ffeedd"
          castShadow={quality === 'high'}
          shadow-mapSize-width={quality === 'high' ? 1024 : 512}
          shadow-mapSize-height={quality === 'high' ? 1024 : 512}
        />

        {/* Terrain */}
        <Terrain quality={quality} scrollProgress={scrollProgress} />

        {/* Dust particles */}
        <DustParticles quality={quality} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
