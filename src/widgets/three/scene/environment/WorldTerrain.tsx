import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../../../features/useQualityLevel';
import { sampleScore } from '../../../../entities/chapter/chapters';

interface WorldTerrainProps {
  quality: QualityLevel;
}

const TERRAIN_WIDTH = 190;
const TERRAIN_LENGTH = 820;
const TERRAIN_CENTRE_Z = -360;

/**
 * WorldTerrain.
 *
 * The valley geometry is unchanged and for good reason: it is the continuous
 * spatial spine the whole documentary travels along, and a single rolling
 * corridor with a flanking ridge is exactly the right spatial idea for a
 * long-form read. What was wrong was never the shape — it was the paint.
 *
 * Two changes, both about value:
 *
 * 1. The material is driven by the score, so the ground is always clearly
 *    DARKER than the sky. Land reading lighter than sky is the single fastest
 *    way to make a 3D scene look like a flat illustration.
 *
 * 2. Vertex colours bake a value ramp across the cross-section: the valley
 *    floor sits in shadow, the flanks catch light, the far ridges lift toward
 *    the fog. That is a painted depth cue which survives even where fog does
 *    not reach, and it costs nothing at runtime.
 */
export function WorldTerrain({ quality }: WorldTerrainProps) {
  const segmentsX = quality === 'low' ? 40 : quality === 'medium' ? 72 : 112;
  const segmentsZ = quality === 'low' ? 140 : quality === 'medium' ? 280 : 420;

  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const ridgeMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // ── Valley geometry ──────────────────────────────────────────────────────
  const terrainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(TERRAIN_WIDTH, TERRAIN_LENGTH, segmentsX, segmentsZ);
    const pos = geom.attributes.position;
    const arr = pos.array as Float32Array;

    // Value ramp written into vertex colours: 0 = valley floor (dark),
    // 1 = lit ridge (light). Kept as a data channel so one material can carry
    // the whole cross-section without extra draw calls.
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const worldZ = TERRAIN_CENTRE_Z - y;

      const distFromCentre = Math.abs(x);

      // Flanking ridges: they frame the corridor and give the sky a silhouette
      // to sit behind instead of meeting the camera at a hard horizontal line.
      const ridge = Math.pow(Math.max(0, distFromCentre - 20) * 0.055, 2.1);

      // Low-frequency undulation at a cinematic scale, plus a fine break-up so
      // the surface never reads as a smooth mathematical sheet.
      const broad =
        Math.sin(x * 0.019) * Math.cos(worldZ * 0.014) * 5.6 +
        Math.sin(x * 0.043 + worldZ * 0.028) * 1.8 +
        Math.cos(x * 0.011 - worldZ * 0.007) * 3.6;
      const fine = Math.sin(x * 0.31 + worldZ * 0.19) * 0.32 + Math.cos(x * 0.22 - worldZ * 0.4) * 0.24;

      // Narrative terrain states along the journey.
      let zone = 1;
      let floorBias = 0;
      if (worldZ < -232 && worldZ > -316) {
        // Oregon: a high, flat, hard plateau.
        zone = 0.16;
        floorBias = 0.4;
      } else if (worldZ <= -316 && worldZ > -378) {
        // The collapse: broken, restless ground.
        zone = 1.15;
        floorBias = -0.25;
      } else if (worldZ <= -484) {
        // The closing horizon: a vast, level plain.
        zone = 0.08;
        floorBias = 0.55;
      }

      const height = -1.4 + (ridge + (broad + fine) * 0.5) * zone + floorBias * 0.6;
      arr[i * 3 + 2] = height;

      // Value ramp written into vertex colours. This MULTIPLIES the base
      // colour, so it has to be centred on 1.0 — a ramp of 0.1…1.0 would
      // crush the valley floor to a tenth of its albedo and the ground would
      // read as black. And the top of the range has to stay close to 1.0: at
      // 1.35 a near-camera slope under a raking key blows out to a pale patch
      // with no surface detail left in it.
      const openness = THREE.MathUtils.clamp((distFromCentre - 8) / 46, 0, 1);
      const distance = THREE.MathUtils.clamp((30 - worldZ) / 700, 0, 1);
      const v = THREE.MathUtils.clamp(
        0.74 + openness * 0.38 + distance * 0.08 + (broad + fine) * 0.01,
        0.62,
        1.16
      );
      colors[i * 3] = v;
      colors[i * 3 + 1] = v;
      colors[i * 3 + 2] = v;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.computeVertexNormals();
    return geom;
  }, [segmentsX, segmentsZ]);

  // ── The road ─────────────────────────────────────────────────────────────
  const pathGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let z = 40; z >= -760; z -= 5) {
      let x = Math.sin(z * 0.017) * 3.6;
      if (z <= -238 && z >= -318) x = 0; // Oregon: dead straight
      if (z <= -424 && z >= -486) x = 0; // The threshold: a dividing line
      if (z < -486) x = Math.sin(z * 0.009) * 1.4; // The closing plain
      points.push(new THREE.Vector3(x, -0.9, z));
    }

    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
    const geom = new THREE.BufferGeometry();
    const positions: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];
    const steps = 260;
    // Narrow enough that the road reads as a track rather than as a pale wedge
    // cutting the foreground in half when the camera passes directly over it.
    const halfWidth = 1.35;

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const pt = curve.getPointAt(u);
      const tan = curve.getTangentAt(u);
      const nx = -tan.z;
      const nz = tan.x;
      const len = Math.hypot(nx, nz) || 1;
      const ux = nx / len;
      const uz = nz / len;

      positions.push(
        pt.x - ux * halfWidth,
        pt.y + 0.05,
        pt.z - uz * halfWidth,
        pt.x + ux * halfWidth,
        pt.y + 0.05,
        pt.z + uz * halfWidth
      );
      normals.push(0, 1, 0, 0, 1, 0);

      if (i < steps) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geom.setIndex(indices);
    return geom;
  }, []);

  const scratch = useMemo(
    () => ({
      ground: new THREE.Color(),
      ridge: new THREE.Color(),
      road: new THREE.Color(),
      a: new THREE.Color(),
      b: new THREE.Color(),
    }),
    []
  );

  useFrame(() => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const s = scratch;

    s.a.set(lower.groundColor).lerp(s.b.set(upper.groundColor), mix);
    s.ground.copy(s.a);
    s.a.set(lower.ridgeColor).lerp(s.b.set(upper.ridgeColor), mix);
    s.ridge.copy(s.a);

    if (materialRef.current) {
      materialRef.current.color.lerp(s.ground, 0.1);
    }
    if (ridgeMaterialRef.current) {
      // The track is a worn surface, not a highlight. Deriving it from the
      // ground value — slightly lifted, slightly desaturated — keeps it
      // legible as a path without letting a 2.7-unit-wide ribbon cut the
      // foreground in half as a pale wedge.
      s.road.copy(s.ground).lerp(s.ridge, 0.3);
      ridgeMaterialRef.current.color.lerp(s.road, 0.1);
    }
  });

  return (
    <group>
      <mesh
        geometry={terrainGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, TERRAIN_CENTRE_Z]}
        receiveShadow
      >
        <meshStandardMaterial
          ref={materialRef}
          color="#6d5c45"
          vertexColors
          roughness={0.96}
          metalness={0.02}
          flatShading={quality !== 'high'}
        />
      </mesh>

      <mesh geometry={pathGeometry} receiveShadow>
        <meshStandardMaterial
          ref={ridgeMaterialRef}
          color="#93826a"
          roughness={0.9}
          metalness={0.04}
          flatShading={quality !== 'high'}
        />
      </mesh>
    </group>
  );
}
