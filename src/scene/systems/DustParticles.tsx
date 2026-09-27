import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface DustParticlesProps {
  count?: number;
  quality: QualityLevel;
  scrollProgress: React.RefObject<number>;
}

/**
 * Gently floating dust motes in the 3D space.
 * Count adapts to quality level. Motion driven by scroll progress.
 */
export function DustParticles({
  count: baseCount = 200,
  quality,
  scrollProgress,
}: DustParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const count = useMemo(() => {
    if (quality === 'low') return Math.floor(baseCount * 0.3);
    if (quality === 'medium') return Math.floor(baseCount * 0.6);
    return baseCount;
  }, [baseCount, quality]);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 80;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;
      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = Math.random() * 0.001 + 0.0005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const clampedDelta = Math.min(delta, 0.05);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] * clampedDelta * 60;
      arr[i3 + 1] += velocities[i3 + 1] * clampedDelta * 60;
      arr[i3 + 2] += velocities[i3 + 2] * clampedDelta * 60;

      // Wrap around
      if (arr[i3 + 1] > 40) arr[i3 + 1] = -40;
      if (Math.abs(arr[i3]) > 15) arr[i3] *= -0.9;
      if (Math.abs(arr[i3 + 2]) > 10) arr[i3 + 2] *= -0.9;
    }

    posAttr.needsUpdate = true;

    // Subtle scroll-driven rotation
    const progress = scrollProgress.current ?? 0;
    meshRef.current.rotation.y = progress * Math.PI * 0.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d4be94"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
