import { useAppStore } from '../../../../features/store';
import { useMemo } from 'react';import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../../../features/useQualityLevel';
import { sampleScore } from '../../../../entities/chapter/chapters';

interface ForegroundFramingProps {
  quality: QualityLevel;
}

/**
 * ForegroundFraming — the FOREGROUND layer.
 *
 * Depth in a landscape is read from three planes, and the previous build only
 * really had two: a ground plane and a blank sky. These elements supply the
 * near plane, which is the cheapest and strongest depth cue there is — a dark,
 * soft silhouette crossing the outer edge of frame tells the eye "there is world
 * here" before it has resolved anything else.
 *
 * They are deliberately:
 *   • unlit and near-black, so they read as silhouette rather than as objects;
 *   • confined to the outer thirds, never in the reading column;
 *   • large and simple. A near-plane object with detail competes with the
 *     subject; a near-plane object without detail reads as depth.
 *
 * One shared material, three shared geometries: the whole layer is a handful of
 * draw calls and scales to any quality level.
 */

type Kind = 'spire' | 'boulder' | 'slab';

interface Placed {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  kind: Kind;
}

/** Deterministic scatter — stable across renders and quality levels. */
function pseudo(seed: number): number {
  const v = Math.sin(seed * 78.233 + 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

const STATIONS: Array<{ z: number; side: -1 | 1; scale: number }> = [
  { z: 6, side: -1, scale: 1.0 },
  { z: -20, side: 1, scale: 1.15 },
  { z: -54, side: -1, scale: 0.9 },
  { z: -100, side: 1, scale: 1.05 },
  { z: -160, side: -1, scale: 1.2 },
  { z: -232, side: 1, scale: 0.85 },
  { z: -300, side: -1, scale: 1.1 },
  { z: -370, side: 1, scale: 1.25 },
  { z: -438, side: -1, scale: 0.95 },
  { z: -512, side: 1, scale: 1.0 },
  { z: -592, side: -1, scale: 0.8 },
];

/**
 * `x` is in world units, so the lateral spread is the lever that decides how much
 * of a near-plane element is allowed into frame. The camera passes within a few
 * units of these Z positions, so anything that is merely "off to the side" ends
 * up filling a third of the screen the moment the camera arrives beside it. The
 * spread below is deliberately large relative to the camera's lateral excursion.
 */
const SPREAD = 15;

export function ForegroundFraming({ quality }: ForegroundFramingProps) {
  /** One material, authored once, shared by every silhouette in the layer. */
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#241c14',
        roughness: 1,
        metalness: 0,
      }),
    []
  );

  const items = useMemo<Placed[]>(() => {
    const out: Placed[] = [];
    const keep = quality === 'low' ? 0.55 : quality === 'medium' ? 0.8 : 1;

    STATIONS.forEach((s, i) => {
      if (i % 2 === 1 && pseudo(i) > keep) return;

      const spread = SPREAD + pseudo(i + 40) * 5;
      // Short and narrow: a near-plane object is a depth cue, and a depth cue
      // that is also a large object stops being a cue and starts being a subject.
      const h = (4.5 + pseudo(i + 80) * 3) * s.scale;
      const kind: Kind = s.scale > 1.1 ? 'boulder' : s.scale < 0.9 ? 'slab' : 'spire';

      out.push({
        position: [s.side * spread, -1.2, s.z],
        scale: kind === 'boulder' ? [h * 0.8, h * 0.5, h * 0.8] : [h * 0.3, h, h * 0.3],
        rotation: [
          (pseudo(i + 11) - 0.5) * 0.24,
          pseudo(i + 12) * 3,
          (pseudo(i + 13) - 0.5) * 0.2,
        ],
        kind,
      });
    });

    return out;
  }, [quality]);

  const scratch = useMemo(
    () => ({
      ground: new THREE.Color(),
      a: new THREE.Color(),
      b: new THREE.Color(),
      out: new THREE.Color(),
    }),
    []
  );

  useFrame(() => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const s = scratch;
    s.a.set(lower.groundColor).lerp(s.b.set(upper.groundColor), mix);
    // Near-plane silhouettes sit well below the ground value so they stay dark
    // against a bright sky and still separate against a dark one.
    s.out.copy(s.a).multiplyScalar(0.3);
    material.color.lerp(s.out, 0.1);
  });

  return (
    <group>
      {items.map((it, i) => (
        <mesh
          key={`fg-${i}`}
          position={it.position}
          scale={it.scale}
          rotation={it.rotation}
          material={material}
        >
          {it.kind === 'boulder' ? (
            <dodecahedronGeometry args={[1, 0]} />
          ) : it.kind === 'slab' ? (
            <boxGeometry args={[1, 1.6, 0.5]} />
          ) : (
            <cylinderGeometry args={[0.34, 0.72, 1.5, 6]} />
          )}
        </mesh>
      ))}
    </group>
  );
}
