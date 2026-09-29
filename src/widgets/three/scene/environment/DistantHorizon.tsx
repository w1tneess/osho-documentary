import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleScore } from '../../../../entities/chapter/chapters';


/**
 * DistantHorizon — the BACKGROUND layer.
 *
 * The previous version scattered identical 75-unit cones at x = ±160 in a flat
 * tan that matched the fog exactly, so the "mountains" had no silhouette and no
 * separation: they dissolved into the sky. That is why the far field read as
 * blank paper.
 *
 * This is now three explicit depth bands. Each band is a continuous ridge
 * silhouette — not isolated cones — and each is lifted progressively toward the
 * aerial-perspective colour, which is what produces the classic three-plane
 * read: near ridge dark, mid ridge mid, far range nearly sky-valued.
 *
 * Bands are single triangle strips, so the entire background costs three draw
 * calls at every quality level. Ridges are unlit on purpose: a silhouette has no
 * business catching a key light, and unlit shading keeps the band a pure value
 * cue so it never competes with the midground for attention.
 */

const BANDS = [
  // The near band is a real ridge and must stay a real ridge. With fog now
  // tuned to gate the valley (fogFar around 250-420), a band lifted to 0.9 of
  // the fog colour would simply disappear. These sit far enough out to be
  // atmospheric without being erased.
  { z: -300, halfWidth: 170, height: 30, relief: 0.55, lift: 0.0 },
  { z: -470, halfWidth: 290, height: 54, relief: 0.78, lift: 0.34 },
  { z: -720, halfWidth: 460, height: 92, relief: 1.0, lift: 0.66 },
] as const;

/** A continuous ridge silhouette between a base line and a crest line. */
function buildRidge(halfWidth: number, height: number, relief: number, seed: number) {
  const segments = 72;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = (t * 2 - 1) * halfWidth;

    // Summed sine octaves: deterministic, cheap, and a believable ridgeline
    // without reading as a periodic waveform.
    const r =
      Math.sin(x * 0.0125 + seed) * 0.5 +
      Math.sin(x * 0.0291 + seed * 2.1) * 0.28 +
      Math.sin(x * 0.0672 + seed * 3.7) * 0.15 +
      Math.sin(x * 0.1411 + seed * 5.3) * 0.07;

    // Taper the ends so each band fades into the flanks rather than ending in
    // a visible wall.
    const envelope = Math.pow(Math.sin(t * Math.PI), 0.4);
    const crest = height * (0.32 + r * relief) * envelope;

    positions.push(x, -34, 0, x, crest, 0);

    if (i < segments) {
      const b = i * 2;
      indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

export function DistantHorizon() {
  const groupRef = useRef<THREE.Group>(null);

  const bands = useMemo(
    () =>
      BANDS.map((b, i) => ({
        geometry: buildRidge(b.halfWidth, b.height, b.relief, i * 3.7 + 1.1),
        z: b.z,
        lift: b.lift,
      })),
    []
  );

  const materials = useMemo(
    () =>
      BANDS.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: '#93826a',
            side: THREE.DoubleSide,
            // The bands are EXEMPT from scene fog, on purpose.
            //
            // They sit 300–750 units out, and the score's fog density varies by
            // a factor of two between chapters. Anything fog-exempt is governed
            // entirely by the `lift` below, which blends them toward the sky
            // colour the camera can actually see. Letting scene fog also act on
            // them double-counts the aerial perspective: on a low-density
            // chapter they stay opaque and render as flat cream slabs sitting on
            // a darker sky, which reads as cloud rather than as distance.
            fog: false,
            toneMapped: true,
          })
      ),
    []
  );

  const scratch = useMemo(
    () => ({
      fog: new THREE.Color(),
      ridge: new THREE.Color(),
      a: new THREE.Color(),
      b: new THREE.Color(),
      out: new THREE.Color(),
    }),
    []
  );

  useFrame(({ camera }) => {
    // Follow the camera in coarse Z steps. The ridges then read as effectively
    // infinitely distant (no parallax) but can never fall behind the traveller.
    if (groupRef.current) {
      groupRef.current.position.z = Math.round(camera.position.z / 60) * 60 - 30;
    }

    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const s = scratch;

    // Blended toward the sky's own horizon colour, not toward the fog colour:
    // these bands are not fogged, and what they have to disappear into is the
    // sky behind them, not the aerial-perspective tint the terrain uses.
    s.a.set(lower.skyHorizon).lerp(s.b.set(upper.skyHorizon), mix);
    s.fog.copy(s.a);
    s.a.set(lower.ridgeColor).lerp(s.b.set(upper.ridgeColor), mix);
    s.ridge.copy(s.a);

    for (let i = 0; i < materials.length; i++) {
      s.out.copy(s.ridge).lerp(s.fog, BANDS[i].lift * 0.9);
      materials[i].color.lerp(s.out, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {bands.map((b, i) => (
        <mesh
          key={`ridge-${i}`}
          geometry={b.geometry}
          material={materials[i]}
          position={[0, 0, b.z]}
          renderOrder={-900}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}
