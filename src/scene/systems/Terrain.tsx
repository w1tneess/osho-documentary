import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface TerrainProps {
  quality: QualityLevel;
  scrollProgress: React.RefObject<number>;
}

/**
 * Procedural rolling terrain — the ground plane of the documentary.
 * Uses a displaced PlaneGeometry with scroll-driven color transitions.
 * Simplified at lower quality levels.
 */
export function Terrain({ quality, scrollProgress }: TerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const segments = useMemo(() => {
    if (quality === 'low') return 32;
    if (quality === 'medium') return 64;
    return 128;
  }, [quality]);

  // Pre-compute displacement
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(60, 200, segments, segments * 3);
    const posAttr = geom.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < posAttr.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      // Organic rolling hills using layered sine
      const height =
        Math.sin(x * 0.15) * 1.2 +
        Math.sin(y * 0.08 + x * 0.1) * 0.8 +
        Math.sin(x * 0.3 + y * 0.2) * 0.4 +
        Math.cos(x * 0.05 - y * 0.12) * 1.5;
      arr[i * 3 + 2] = height;
    }

    geom.computeVertexNormals();
    return geom;
  }, [segments]);

  useFrame(() => {
    if (!meshRef.current) return;
    const progress = scrollProgress.current ?? 0;
    // The terrain scrolls "past" as the story progresses
    meshRef.current.position.y = progress * 80;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#c4a97a"
        roughness={0.92}
        metalness={0.02}
        flatShading={quality === 'low'}
      />
    </mesh>
  );
}
