import { useAppStore } from '../../../../features/store';
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../../../features/useQualityLevel';
import { sampleScore } from '../../../../entities/chapter/chapters';

interface ChapterStructuresProps {
  quality: QualityLevel;
  }

/**
 * ChapterStructures — the MIDGROUND.
 *
 * The previous build modelled its subjects literally: a Rolls-Royce made of two
 * boxes, trees made of a cylinder with two spheres on it, a "quonset hut" made
 * of a box with a half-cylinder on top. Held at the distance a documentary
 * camera actually works at, none of that reads as what it claims to be — it
 * reads as a blockout, which is exactly what it was, and it is why the scene
 * looked like a Three.js demo rather than a place.
 *
 * The rule applied here instead: at midground distance a subject is read as a
 * SILHOUETTE and a VALUE, not as a model. So every structure below is built for
 * its outline and its tonal position in the frame, and detail is spent only
 * where a human eye would actually resolve it.
 *
 * Every material is also darkened toward the terrain value. In the old build the
 * structures were near-white against near-white ground, so nothing separated.
 */

function pseudo(seed: number): number {
  const v = Math.sin(seed * 45.164 + 11.137) * 43758.5453;
  return v - Math.floor(v);
}

// ─── Shared material set ─────────────────────────────────────────────────────

interface Palette {
  dark: THREE.MeshStandardMaterial;
  mid: THREE.MeshStandardMaterial;
  light: THREE.MeshStandardMaterial;
  accent: THREE.MeshStandardMaterial;
  warm: THREE.MeshStandardMaterial;
}

function usePalette(quality: QualityLevel): Palette {
  return useMemo(() => {
    const flat = quality !== 'high';
    return {
      dark: new THREE.MeshStandardMaterial({ color: '#22201e', roughness: 0.42, metalness: 0.35, flatShading: flat }),
      mid: new THREE.MeshStandardMaterial({ color: '#4a4238', roughness: 0.86, metalness: 0.08, flatShading: flat }),
      light: new THREE.MeshStandardMaterial({ color: '#8a7c68', roughness: 0.8, metalness: 0.05, flatShading: flat }),
      accent: new THREE.MeshStandardMaterial({ color: '#7a3a2a', roughness: 0.82, metalness: 0.04, flatShading: flat }),
      warm: new THREE.MeshStandardMaterial({
        color: '#c08a3e',
        emissive: '#8a4c14',
        emissiveIntensity: 0.2,
        roughness: 0.5,
        metalness: 0.2,
      }),
    };
  }, [quality]);
}

/** Instanced stand of trees: a trunk plus two offset canopy masses. */
function Grove({
  position,
  count,
  spread,
  height,
  mat,
}: {
  position: [number, number, number];
  count: number;
  spread: number;
  height: number;
  mat: THREE.Material;
}) {
  const trunks = useMemo(() => {
    const out: Array<{ x: number; z: number; h: number; r: number; rot: number }> = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + pseudo(i * 3.1) * 0.9;
      const d = spread * (0.35 + pseudo(i * 7.7) * 0.75);
      out.push({
        x: Math.cos(a) * d,
        z: Math.sin(a) * d,
        h: height * (0.68 + pseudo(i * 11.3) * 0.6),
        r: pseudo(i * 5.5) * Math.PI,
        rot: (pseudo(i * 2.3) - 0.5) * 0.16,
      });
    }
    return out;
  }, [count, spread, height]);

  return (
    <group position={position}>
      {trunks.map((t, i) => (
        <group key={`t-${i}`} position={[t.x, 0, t.z]} rotation={[t.rot, t.r, 0]}>
          <mesh position={[0, t.h * 0.34, 0]} material={mat} scale={[t.h * 0.035, t.h * 0.68, t.h * 0.035]}>
            <cylinderGeometry args={[0.7, 1, 1, 5]} />
          </mesh>
          <mesh position={[0, t.h * 0.82, 0]} material={mat} scale={[t.h * 0.34, t.h * 0.3, t.h * 0.34]}>
            <icosahedronGeometry args={[1, 0]} />
          </mesh>
          <mesh
            position={[t.h * 0.16, t.h * 0.68, -t.h * 0.1]}
            material={mat}
            scale={[t.h * 0.22, t.h * 0.2, t.h * 0.22]}
          >
            <icosahedronGeometry args={[1, 0]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** A stepped stone plinth — the base note for several subjects. */
function Plinth({
  position,
  w,
  d,
  steps,
  mat,
}: {
  position: [number, number, number];
  w: number;
  d: number;
  steps: number;
  mat: THREE.Material;
}) {
  return (
    <group position={position}>
      {Array.from({ length: steps }, (_, i) => (
        <mesh
          key={`s-${i}`}
          position={[0, i * 0.32, 0]}
          material={mat}
          receiveShadow
          scale={[w - i * 0.9, 0.34, d - i * 0.9]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Chapter subjects ────────────────────────────────────────────────────────

/** CH 01 — The solitary tree on a stepped terrace. The first subject in the film. */
function TheSeeker({ p, quality }: { p: Palette; quality: QualityLevel }) {
  return (
    <group position={[7.5, 0, -34]}>
      <Plinth position={[0, -0.6, 0]} w={13} d={13} steps={2} mat={p.light} />
      {/* Trunk: tapered and slightly leaning, so it is not a pole. */}
      <group rotation={[0.02, 0, 0.035]}>
        <mesh position={[0, 3.4, 0]} material={p.mid} castShadow scale={[0.62, 7, 0.62]}>
          <cylinderGeometry args={[0.72, 1.35, 1, 8]} />
        </mesh>
        {/* Three canopy masses at different heights and radii: the silhouette
            that makes it read as a tree rather than a lollipop. */}
        <mesh position={[-0.6, 8.4, 0.3]} material={p.mid} castShadow scale={[3.5, 2.3, 3.3]}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
        <mesh position={[1.9, 7.2, -0.7]} material={p.mid} castShadow scale={[2.4, 1.7, 2.5]}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
        <mesh position={[0.2, 10.1, -0.2]} material={p.mid} castShadow scale={[2.2, 1.5, 2.1]}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
      </group>
      {/* A single low seat: scale reference, and a human absence. */}
      <mesh position={[-3.4, 0.5, 2.6]} rotation={[0, 0.4, 0]} material={p.light} castShadow scale={[2.4, 0.7, 1]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      {quality !== 'low' && (
        <>
          <pointLight position={[4.6, 2.2, 3.2]} intensity={9} distance={24} decay={2} color="#ffb45e" />
          <mesh position={[4.6, 0.9, 3.2]} material={p.warm}>
            <cylinderGeometry args={[0.3, 0.3, 0.7, 6]} />
          </mesh>
        </>
      )}
    </group>
  );
}

/** CH 02 — The ceremonial gate. A strong rectangular void in the landscape.
 *
 *  Held out to one side and kept below the horizon line. Centred and tall it
 *  becomes a black wall across the middle of the frame; off to one side it
 *  becomes a gate, and the eye can travel past it. The hanging cloth is two
 *  narrow panels rather than one wide sheet, because a wide dark rectangle at
 *  midground reads as a hole in the image. */
function TheGate({ p }: { p: Palette }) {
  return (
    <group position={[-15, 0, -70]} rotation={[0, 0.22, 0]}>
      <Plinth position={[0, -0.5, 0]} w={17} d={15} steps={1} mat={p.mid} />
      {[-4.4, 4.4].map((x) => (
        <mesh key={`post-${x}`} position={[x, 3.6, 0]} material={p.accent} castShadow scale={[1.15, 8.2, 1.15]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
      {/* Lintel: the horizontal that closes the shape. */}
      <mesh position={[0, 7.7, 0]} material={p.accent} castShadow scale={[11.6, 1, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      {/* Two narrow hanging panels, well clear of one another. */}
      {[-2.1, 2.1].map((x) => (
        <mesh key={`cloth-${x}`} position={[x, 5.2, 0.12]} material={p.warm} scale={[1.5, 4.2, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
      {/* Two flanking lanterns give the gate a human scale. */}
      {[-6.4, 6.4].map((x) => (
        <group key={`l-${x}`} position={[x, 0, 1.6]}>
          <mesh position={[0, 0.7, 0]} material={p.mid} scale={[0.4, 1.5, 0.4]}>
            <cylinderGeometry args={[0.6, 0.9, 1, 6]} />
          </mesh>
          <mesh position={[0, 1.75, 0]} material={p.warm}>
            <cylinderGeometry args={[0.3, 0.3, 0.6, 6]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** CH 03 — The ashram: a dark pyramid mass and a low reflecting pool. */
function TheAshram({ p, quality }: { p: Palette; quality: QualityLevel }) {
  return (
    <group>
      <group position={[-26, 0, -134]}>
        <Plinth position={[0, -0.5, 0]} w={20} d={20} steps={3} mat={p.dark} />
        {/* The pyramid is the darkest mass in the frame: it has to hold the
            composition against a bright sky. But it is held well to one side
            and kept below the skyline — centred, it stops being a subject and
            becomes a backdrop. */}
        <mesh position={[0, 6.5, 0]} rotation={[0, Math.PI / 4, 0]} material={p.dark} castShadow scale={[15, 12, 15]}>
          <coneGeometry args={[0.72, 1, 4]} />
        </mesh>
        <mesh position={[0, 12.8, 0]} rotation={[0, Math.PI / 4, 0]} material={p.warm} scale={[1.6, 1.8, 1.6]}>
          <coneGeometry args={[0.72, 1, 4]} />
        </mesh>
      </group>

      <group position={[9, 0, -152]}>
        {/* Pool: a dark, low, horizontal band. Reads as water by being the only
            thing in the frame with a specular response. */}
        <mesh position={[0, -0.75, 0]} material={p.dark} receiveShadow scale={[11, 0.3, 26]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={[0, -0.55, 0]} material={p.light} receiveShadow scale={[12.4, 0.5, 27.4]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        {/* Colonnade: a rhythm of verticals is the cheapest way to express
            "a designed complex" at this distance. */}
        {Array.from({ length: 7 }, (_, i) => (
          <mesh
            key={`col-${i}`}
            position={[8.4, 3.1, -12 + i * 4]}
            material={p.mid}
            castShadow
            scale={[0.42, 6.6, 0.42]}
          >
            <cylinderGeometry args={[1, 1.2, 1, 10]} />
          </mesh>
        ))}
        <mesh position={[8.4, 6.7, 0]} material={p.accent} castShadow scale={[1.4, 0.7, 28]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        {/* The roof plane: one long dark horizontal that closes the colonnade. */}
        <mesh position={[8.4, 7.3, 0]} material={p.dark} castShadow scale={[9.5, 0.6, 29]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </group>

      {quality !== 'low' && (
        <>
          <Grove position={[-6, -1, -128]} count={9} spread={7} height={7.5} mat={p.mid} />
          <Grove position={[16, -1, -170]} count={7} spread={6} height={6.4} mat={p.mid} />
        </>
      )}
    </group>
  );
}

/** CH 04 — Oregon. Vast, hard, industrial; a hangar, a tower, a fence line. */
function TheCommune({ p, quality }: { p: Palette; quality: QualityLevel }) {
  const fencePosts = useMemo(() => Array.from({ length: 16 }, (_, i) => -80 + i * 11), []);
  return (
    <group>
      <group position={[26, 0, -252]}>
        {/* Quonset hangar: a half-cylinder reads correctly at any distance,
            which a box never does. */}
        <mesh position={[0, 4.2, 0]} rotation={[0, 0, Math.PI / 2]} material={p.light} castShadow scale={[9.6, 9.6, 38]}>
          <cylinderGeometry args={[1, 1, 1, 24, 1, false, 0, Math.PI]} />
        </mesh>
        {/* Ribs: a light-catching rhythm across the arc. */}
        {Array.from({ length: 9 }, (_, i) => (
          <mesh
            key={`rib-${i}`}
            position={[0, 4.2, -15 + i * 3.8]}
            rotation={[0, 0, Math.PI / 2]}
            material={p.mid}
            scale={[9.9, 9.9, 0.28]}
          >
            <torusGeometry args={[1, 0.02, 4, 18, Math.PI]} />
          </mesh>
        ))}
        <mesh position={[0, -0.3, 0]} material={p.mid} receiveShadow scale={[21, 0.5, 39]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </group>

      <group position={[-15, 0, -262]}>
        <mesh position={[0, 7, 0]} material={p.mid} castShadow scale={[2.4, 15, 2.4]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={[0, 15.4, 0]} material={p.dark} castShadow scale={[4.4, 2.6, 4.4]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={[0, 18.4, 0]} material={p.mid} scale={[0.14, 3.4, 0.14]}>
          <cylinderGeometry args={[0.5, 0.8, 1, 4]} />
        </mesh>
      </group>

      <group position={[13, 0, -292]}>
        <mesh position={[0, 3.4, 0]} material={p.light} castShadow scale={[2.4, 7, 2.4]}>
          <cylinderGeometry args={[1, 1, 1, 14]} />
        </mesh>
        <mesh position={[0, 7.4, 0]} material={p.mid} castShadow scale={[2.5, 1.2, 2.5]}>
          <coneGeometry args={[1, 1, 14]} />
        </mesh>
      </group>

      {/* The perimeter: a receding fence is the strongest possible statement of
          "this land has been claimed". */}
      <group position={[-9, -1, -240]}>
        {fencePosts.map((z) => (
          <group key={`fp-${z}`} position={[0, 0, z]}>
            <mesh position={[0, 0.85, 0]} material={p.mid} scale={[0.14, 1.7, 0.14]}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <mesh position={[0, 1.5, 5.5]} rotation={[Math.PI / 2, 0, 0]} material={p.mid} scale={[0.07, 11, 0.07]}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <mesh position={[0, 0.95, 5.5]} rotation={[Math.PI / 2, 0, 0]} material={p.mid} scale={[0.06, 11, 0.06]}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          </group>
        ))}
      </group>

      {quality !== 'low' && <pointLight position={[0, 6, -252]} intensity={6} distance={40} decay={2} color="#ffd9a8" />}
    </group>
  );
}

/** CH 05–06 — Collapse. Broken verticals, a heavy flat light, almost no colour.
 *
 *  The palette for this chapter is cold, so these fragments are built from the
 *  cold end of the shared set only. Using the warm stone for a scene the score
 *  has deliberately desaturated produces a warm junkyard in the middle of a
 *  cold frame, which reads as a mistake rather than as a subject. */
function TheCollapse({ p, quality }: { p: Palette; quality: QualityLevel }) {
  const debris = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        x: (pseudo(i) - 0.5) * 30,
        z: -336 - pseudo(i + 5) * 26,
        s: 1.6 + pseudo(i + 9) * 3.4,
        r: (pseudo(i + 3) - 0.5) * 0.55,
        ry: pseudo(i + 7) * 3,
      })),
    []
  );

  return (
    <group>
      {/* Standing fragments: verticals, because the chapter is about something
          that was vertical and is no longer. Widely spaced, so the eye reads
          them as separate losses rather than as a pile. */}
      {[
        { x: -14, z: -330, h: 11, tilt: 0.2 },
        { x: 8, z: -340, h: 6, tilt: -0.3 },
        { x: -3, z: -352, h: 15, tilt: 0.08 },
        { x: 17, z: -360, h: 3.6, tilt: 0.44 },
      ].map((b, i) => (
        <mesh
          key={`frag-${i}`}
          position={[b.x, b.h * 0.5 - 1.2, b.z]}
          rotation={[b.tilt * 0.5, 0, b.tilt]}
          material={p.dark}
          castShadow
          scale={[1.3, b.h, 1.3]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}

      {debris.map((d, i) => (
        <mesh
          key={`deb-${i}`}
          position={[d.x, -0.7, d.z]}
          rotation={[d.r * 0.3, d.ry, d.r]}
          material={p.mid}
          castShadow
          receiveShadow
          scale={[d.s, d.s * 0.28, d.s * 0.7]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}

      {quality !== 'low' && (
        <pointLight position={[0, 5, -344]} intensity={4} distance={34} decay={2} color="#7f8fa6" />
      )}
    </group>
  );
}

/** CH 07–08 — The threshold. Warm terraces on one side, cold mass on the other. */
function TheThreshold({ p, quality }: { p: Palette; quality: QualityLevel }) {
  return (
    <group position={[0, 0, -452]}>
      {/* Left: ascending warm terraces — invitation. */}
      <group position={[-11, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={`ter-${i}`}
            position={[0, 0.9 + i * 1.7, 0]}
            material={p.warm}
            receiveShadow
            scale={[13 - i * 2.6, 1.8, 13 - i * 2.6]}
          >
            <cylinderGeometry args={[1, 1.06, 1, 20]} />
          </mesh>
        ))}
        {quality !== 'low' && <Grove position={[-4, 0, 0]} count={7} spread={5.5} height={6.8} mat={p.mid} />}
      </group>

      {/* Right: cold vertical mass — refusal. Deliberately unlit on its camera
          face so it reads as a wall, not a building. */}
      <group position={[12, 0, -2]}>
        <mesh position={[0, 8, 0]} material={p.dark} castShadow scale={[3.4, 17, 8]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={[5.6, 12, 4]} material={p.dark} castShadow scale={[3, 25, 6.5]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={[-5.2, 6, 3]} material={p.mid} castShadow scale={[2.6, 13, 6]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </group>
    </group>
  );
}

/** CH 09–11 — The memorial, then the quiet horizon. */
function TheMemorial({ p, quality }: { p: Palette; quality: QualityLevel }) {
  return (
    <group position={[0, 0, -556]}>
      {/* Concentric stone rings: the raked white-pebble bed abstracted to
          geometry, so the closing frames still have a subject. */}
      <mesh position={[0, -0.7, 0]} material={p.light} receiveShadow scale={[30, 0.5, 30]}>
        <cylinderGeometry args={[1, 1.04, 1, 40]} />
      </mesh>
      <mesh position={[0, -0.15, 0]} material={p.dark} receiveShadow scale={[17, 0.6, 17]}>
        <cylinderGeometry args={[1, 1.03, 1, 36]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={p.dark} castShadow scale={[10.5, 0.8, 10.5]}>
        <cylinderGeometry args={[1, 1.02, 1, 32]} />
      </mesh>
      {/* The one warm note in the entire frame. */}
      <mesh position={[0, 1.05, 0]} material={p.warm} scale={[10.7, 0.14, 10.7]}>
        <torusGeometry args={[1, 0.014, 8, 48]} />
      </mesh>
      <mesh position={[0, 1.9, 0]} material={p.dark} castShadow receiveShadow scale={[6.4, 1.9, 6.4]}>
        <cylinderGeometry args={[1, 1.05, 1, 28]} />
      </mesh>
      {/* The standing stone. A single vertical, held for the final beat. */}
      <mesh position={[0, 4.4, 0]} material={p.dark} castShadow scale={[2.4, 3.2, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh position={[0, 4.4, 0.3]} material={p.warm} scale={[1.9, 2.3, 0.06]}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      {quality !== 'low' && (
        <>
          <pointLight position={[0, 2.2, 0]} intensity={16} distance={40} decay={2} color="#ffc978" />
          {[-9, 9].map((x) => (
            <Grove key={`g-${x}`} position={[x, -1, -9]} count={6} spread={6} height={8} mat={p.mid} />
          ))}
        </>
      )}
    </group>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ChapterStructures({ quality }: ChapterStructuresProps) {
  const palette = usePalette(quality);

  const scratch = useMemo(
    () => ({
      ground: new THREE.Color(),
      dark: new THREE.Color(),
      light: new THREE.Color(),
      lit: new THREE.Color(),
      warm: new THREE.Color(),
      a: new THREE.Color(),
      b: new THREE.Color(),
    }),
    []
  );

  /**
   * Structures take the colour of the LIGHT, not of the ground.
   *
   * Tinting them toward the ground albedo looked correct in the warm chapters
   * and wrong in the cold ones: a warm-brown debris field sat in the middle of a
   * deliberately desaturated collapse frame and read as a mistake. An object
   * lit by a blue hemisphere is blue, whatever it is standing on — so the
   * midtone is blended toward the fill colour, and every chapter's structures
   * sit in that chapter's temperature without a single hand-placed exception.
   */
  useFrame(() => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const s = scratch;
    s.a.set(lower.groundColor).lerp(s.b.set(upper.groundColor), mix);
    s.ground.copy(s.a);

    s.a.set(lower.fillSky).lerp(s.b.set(upper.fillSky), mix);
    s.lit.copy(s.ground).lerp(s.a, 0.34);

    s.dark.copy(s.ground).multiplyScalar(0.3);
    s.light.copy(s.ground).lerp(scratch.a.set('#e6dac3'), 0.52);

    palette.dark.color.lerp(s.dark, 0.1);
    palette.mid.color.lerp(s.lit, 0.1);
    palette.light.color.lerp(s.light, 0.1);
    palette.accent.color.lerp(s.lit, 0.1);

    // The one warm material in the set, and it follows the chapter's own light.
    // An orange terraced garden sitting in the middle of a deliberately cold
    // collapse frame reads as a colour-management accident; here the same stone
    // is terracotta in the Pune summer and grey stone in the collapse, which is
    // both what the light would do and what the narrative wants.
    const sun = THREE.MathUtils.lerp(lower.sunIntensity, upper.sunIntensity, mix);
    const warmth =
      THREE.MathUtils.clamp(
        1 - THREE.MathUtils.lerp(lower.sunElevation, upper.sunElevation, mix) / 32,
        0,
        1
      ) * Math.min(1, sun / 2.3);

    s.warm.copy(scratch.a.set('#3c3a38')).lerp(scratch.b.set('#c88a3e'), warmth);
    palette.warm.color.lerp(s.warm, 0.1);
    palette.warm.emissiveIntensity += (0.08 + warmth * 0.9 - palette.warm.emissiveIntensity) * 0.08;
  });

  return (
    <group>
      <TheSeeker p={palette} quality={quality} />
      <TheGate p={palette} />
      <TheAshram p={palette} quality={quality} />
      <TheCommune p={palette} quality={quality} />
      <TheCollapse p={palette} quality={quality} />
      <TheThreshold p={palette} quality={quality} />
      <TheMemorial p={palette} quality={quality} />
    </group>
  );
}
