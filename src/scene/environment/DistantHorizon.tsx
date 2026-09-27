import { useMemo } from 'react';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface DistantHorizonProps {
  quality: QualityLevel;
}

/**
 * DistantHorizon:
 * The BACKGROUND layer.
 * Provides mountain ridges, distant silhouettes, and atmospheric horizon structure.
 */
export function DistantHorizon({ quality }: DistantHorizonProps) {
  const mountainGeom = useMemo(() => {
    const geom = new THREE.ConeGeometry(65, 38, quality === 'low' ? 5 : 7);
    geom.computeVertexNormals();
    return geom;
  }, [quality]);

  const distantRidgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#a08e78',
        roughness: 0.95,
        metalness: 0.0,
        flatShading: true,
      }),
    []
  );

  const farHorizonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8e7f6e',
        roughness: 0.98,
        metalness: 0.0,
        flatShading: true,
      }),
    []
  );

  const mountains = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; scale: number; rotY: number }> = [];

    // Deterministic pseudo-random helper
    const pseudo = (seed: number) => {
      const v = Math.sin(seed * 91.345 + 54.123) * 43758.5453;
      return v - Math.floor(v);
    };

    for (let z = -30; z >= -650; z -= 50) {
      const r1 = pseudo(z);
      const r2 = pseudo(z + 1);
      const r3 = pseudo(z + 2);
      const r4 = pseudo(z + 3);

      // Left mountain ridge
      list.push({
        x: -60 - r1 * 20,
        y: 12 + r2 * 8,
        z: z + (r3 - 0.5) * 15,
        scale: 0.9 + r4 * 0.6,
        rotY: r1 * Math.PI,
      });

      // Right mountain ridge
      list.push({
        x: 60 + r2 * 20,
        y: 12 + r3 * 8,
        z: z + (r4 - 0.5) * 15,
        scale: 0.9 + r1 * 0.6,
        rotY: r2 * Math.PI,
      });
    }

    // Backdrop mountains at deep horizon flanking the sides, keeping center open
    for (let x = -110; x <= 110; x += 28) {
      if (Math.abs(x) < 38) continue;
      const rx = pseudo(x);

      list.push({
        x,
        y: 12 + rx * 6,
        z: -680,
        scale: 1.5 + rx * 0.4,
        rotY: rx * Math.PI,
      });
    }

    return list;
  }, []);

  return (
    <group>
      {mountains.map((m, idx) => (
        <mesh
          key={`mtn-${idx}`}
          geometry={mountainGeom}
          material={idx % 2 === 0 ? distantRidgeMaterial : farHorizonMaterial}
          position={[m.x, m.y, m.z]}
          scale={[m.scale, m.scale, m.scale]}
          rotation={[0, m.rotY, 0]}
        />
      ))}
    </group>
  );
}
