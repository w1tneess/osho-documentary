import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface AtmosphericMotesProps {
  quality: QualityLevel;
  scrollProgress: React.RefObject<number>;
}

/**
 * Atmospheric Motes & Sun Dust Particle System
 * 
 * Implements guidance from premium-frontend-ui and high-end-visual-design:
 * - Generates floating atmospheric dust particles catching sunlight
 * - Subtle harmonic drift adds organic life to the 3D environment
 * - Extremely performant: 1 draw call via single THREE.Points buffer
 * - Adapts particle count based on hardware capability tier
 */
// Deterministic pseudo-random generator for stable particle distribution
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AtmosphericMotes({ quality, scrollProgress }: AtmosphericMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = quality === 'high' ? 450 : quality === 'medium' ? 220 : 80;

  // Initialize particle positions and random offsets with deterministic PRNG
  const [positions, initialY, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const initY = new Float32Array(particleCount);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread across camera travel corridor: X: [-25, 25], Y: [0.5, 12], Z: [-580, 20]
      const rX = pseudoRandom(i * 3 + 1);
      const rY = pseudoRandom(i * 3 + 2);
      const rZ = pseudoRandom(i * 3 + 3);
      const rSpd = pseudoRandom(i * 3 + 4);

      const x = (rX - 0.5) * 45;
      const y = 0.5 + rY * 10;
      const z = 20 - rZ * 600;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initY[i] = y;
      spd[i] = 0.2 + rSpd * 0.5;
    }

    return [pos, initY, spd];
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || quality === 'low') return;

    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Camera current Z position estimate from scroll
    const p = scrollProgress.current ?? 0;
    const camZ = 14 - p * 594;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const z = array[idx + 2];

      // Only animate motes near the active viewing volume (+/- 45 units from camera)
      if (Math.abs(z - camZ) < 55) {
        // Organic vertical floating drift
        array[idx + 1] = initialY[i] + Math.sin(time * speeds[i] + array[idx]) * 0.45;
        // Subtle horizontal breeze sway
        array[idx] += Math.sin(time * 0.4 + z * 0.05) * 0.003;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={quality === 'high' ? 0.08 : 0.06}
        color="#faebd7"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
