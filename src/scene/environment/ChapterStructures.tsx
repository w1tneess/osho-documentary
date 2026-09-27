import { useMemo } from 'react';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface ChapterStructuresProps {
  quality: QualityLevel;
}

/**
 * Reusable Classical Column with base plinth, tapered shaft, and capital
 */
function ArchitecturalColumn({
  position,
  height = 8.0,
  radius = 0.55,
  material,
  rotation,
}: {
  position: [number, number, number];
  height?: number;
  radius?: number;
  material: THREE.Material;
  rotation?: [number, number, number];
}) {
  const baseHeight = 0.45;
  const capHeight = 0.45;
  const shaftHeight = Math.max(1, height - baseHeight - capHeight);

  return (
    <group position={position} rotation={rotation}>
      {/* Stepped Base Plinth */}
      <mesh position={[0, baseHeight * 0.5, 0]} material={material} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.45, radius * 1.6, baseHeight, 14]} />
      </mesh>
      {/* Tapered Shaft */}
      <mesh position={[0, baseHeight + shaftHeight * 0.5, 0]} material={material} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 0.88, radius, shaftHeight, 14]} />
      </mesh>
      {/* Capital / Header */}
      <mesh position={[0, height - capHeight * 0.5, 0]} material={material} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.5, radius * 0.95, capHeight, 14]} />
      </mesh>
      {/* Abacus Slab */}
      <mesh position={[0, height + 0.12, 0]} material={material} castShadow receiveShadow>
        <boxGeometry args={[radius * 3.1, 0.24, radius * 3.1]} />
      </mesh>
    </group>
  );
}

/**
 * ChapterStructures:
 * The MIDGROUND architectural and natural environment.
 * Stylized cinematic realism:
 * - Ch 1: Solitary sacred Bodhi tree with branching canopy, roots, and meditation bench
 * - Ch 2: Monumental ceremonial stone gateway with stepped plinths and carved lintel
 * - Ch 3: Grand avenue of colonnades with multi-tier amphitheater terrace
 * - Ch 4: Pune Ashram: reflecting pool with marble coping, slender pavilions, palm clusters, narrowing corridor
 * - Ch 5: Rajneeshpuram: vast American scale, industrial assembly hangar, storage silos, watchtower, modular city
 * - Ch 6: Collapse: shattered colonnade, tilted fallen drums, cracked foundation slabs, displaced rubble
 * - Ch 7: Legal Reckoning & Exile: solitary weathered portal in vast quiet sands
 * - Ch 8: Duality: organic warm terraced meditation garden vs cold towering brutalist monoliths
 * - Ch 9: Legacy & Epilogue: serene stepped zen memorial plinth under infinite open sky
 */
export function ChapterStructures({ quality }: ChapterStructuresProps) {
  // Curated PBR materials
  const sandstoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4be9a',
        roughness: 0.85,
        metalness: 0.05,
        flatShading: quality === 'low',
      }),
    [quality]
  );

  const warmAshramMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e4d6c4',
        roughness: 0.72,
        metalness: 0.08,
      }),
    []
  );

  const poolWaterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#657e8c',
        roughness: 0.18,
        metalness: 0.45,
      }),
    []
  );

  const desertCommuneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9e968a',
        roughness: 0.88,
        metalness: 0.14,
        flatShading: true,
      }),
    []
  );

  const metalTrussMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6a6c70',
        roughness: 0.55,
        metalness: 0.65,
      }),
    []
  );

  const brokenRuinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#655e56',
        roughness: 0.94,
        metalness: 0.06,
        flatShading: true,
      }),
    []
  );

  const organicEarthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b87650',
        roughness: 0.82,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const brutalistMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4f5760',
        roughness: 0.9,
        metalness: 0.18,
        flatShading: true,
      }),
    []
  );

  const foliageMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#526038',
        roughness: 0.78,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const trunkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a382a',
        roughness: 0.9,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  return (
    <group>
      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 1: THE SEEKER (Z ≈ -20 to -40)
          Solitary Bodhi tree, circular stone meditation terrace, roots, bench
          ───────────────────────────────────────────────────────────── */}
      <group position={[6.0, 0, -32]}>
        {/* Tiered circular stone terrace */}
        <mesh position={[0, -0.4, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[4.8, 5.2, 0.8, 20]} />
        </mesh>
        <mesh position={[0, 0.1, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[3.8, 4.2, 0.4, 18]} />
        </mesh>

        {/* Tree Trunk & Organic Roots */}
        <mesh position={[0, 2.8, 0]} material={trunkMaterial} castShadow>
          <cylinderGeometry args={[0.42, 0.95, 5.8, 8]} />
        </mesh>
        {/* Radiating root buttresses */}
        {[0, 1.2, 2.5, 3.8, 5.0].map((angle, i) => (
          <mesh
            key={`root-${i}`}
            position={[Math.cos(angle) * 1.1, 0.3, Math.sin(angle) * 1.1]}
            rotation={[0, -angle, 0.4]}
            material={trunkMaterial}
            castShadow
          >
            <cylinderGeometry args={[0.15, 0.35, 1.8, 6]} />
          </mesh>
        ))}

        {/* Major branches */}
        <group position={[0, 5.2, 0]}>
          <mesh position={[-0.8, 1.0, 0.4]} rotation={[0.4, 0.2, 0.5]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.22, 0.38, 2.6, 6]} />
          </mesh>
          <mesh position={[0.9, 0.8, -0.5]} rotation={[-0.3, -0.4, -0.6]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.2, 0.35, 2.4, 6]} />
          </mesh>
        </group>

        {/* Peepal / Bodhi multi-layered canopy */}
        <group position={[0, 6.2, 0]}>
          <mesh position={[0, 0.5, 0]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[2.5, 1]} />
          </mesh>
          <mesh position={[-1.6, 0.2, 0.9]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[1.8, 0]} />
          </mesh>
          <mesh position={[1.8, 0.4, -0.8]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[2.0, 0]} />
          </mesh>
          <mesh position={[0.2, 1.6, 0.3]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[1.9, 0]} />
          </mesh>
        </group>

        {/* Natural stone meditation bench */}
        <mesh position={[-2.0, 0.4, 1.4]} rotation={[0, 0.45, 0]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.8]} />
        </mesh>
      </group>

      {/* Scattered rocks along Ch 1 path */}
      <mesh position={[-6.8, -0.4, -24]} material={sandstoneMaterial} castShadow>
        <dodecahedronGeometry args={[1.6, 0]} />
      </mesh>
      <mesh position={[-8.2, -0.2, -36]} material={sandstoneMaterial} castShadow>
        <dodecahedronGeometry args={[2.2, 0]} />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 2: FOUNDING THE MOVEMENT (Z ≈ -55 to -80)
          Monumental Stone Gateway & Initial Columns
          ───────────────────────────────────────────────────────────── */}
      <group position={[-4.5, 0, -68]}>
        {/* Stepped stone terrace */}
        <mesh position={[0, -0.4, 0]} material={sandstoneMaterial} receiveShadow>
          <boxGeometry args={[18, 0.8, 14]} />
        </mesh>

        {/* Ceremonial Stone Gateway */}
        <group position={[1.8, 0, 0]}>
          {/* Left Gateway Post */}
          <mesh position={[-2.8, 3.6, 0]} material={sandstoneMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.2, 7.6, 1.2]} />
          </mesh>
          {/* Right Gateway Post */}
          <mesh position={[2.8, 3.6, 0]} material={sandstoneMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.2, 7.6, 1.2]} />
          </mesh>
          {/* Layered Lintel & Cornice */}
          <mesh position={[0, 7.6, 0]} material={sandstoneMaterial} castShadow receiveShadow>
            <boxGeometry args={[7.6, 0.8, 1.4]} />
          </mesh>
          <mesh position={[0, 8.2, 0]} material={sandstoneMaterial} castShadow>
            <boxGeometry args={[8.4, 0.4, 1.6]} />
          </mesh>
        </group>

        {/* Flanking stone plinths */}
        <mesh position={[-6.2, 1.4, 2.8]} material={sandstoneMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.8, 3.0, 1.8]} />
        </mesh>
        <mesh position={[-6.2, 1.4, -2.8]} material={sandstoneMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.8, 3.0, 1.8]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 3: THE MOVEMENT GATHERS (Z ≈ -95 to -135)
          Grand Colonnade & Circular Gathering Plaza
          ───────────────────────────────────────────────────────────── */}
      {/* Colonnade with classical shafts, plinths & capitals */}
      {[-100, -108, -116, -124, -132].map((z, idx) => (
        <group key={`colonnade-${idx}`}>
          <ArchitecturalColumn position={[-4.8, 0, z]} height={8.2} radius={0.52} material={sandstoneMaterial} />
          <ArchitecturalColumn position={[4.8, 0, z]} height={8.2} radius={0.52} material={sandstoneMaterial} />
          {/* Entablature beam connecting the tops across Z */}
          {idx < 4 && (
            <>
              <mesh position={[-4.8, 8.4, z - 4]} material={sandstoneMaterial} castShadow>
                <boxGeometry args={[1.4, 0.5, 8.2]} />
              </mesh>
              <mesh position={[4.8, 8.4, z - 4]} material={sandstoneMaterial} castShadow>
                <boxGeometry args={[1.4, 0.5, 8.2]} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Central Circular Gathering Plaza */}
      <group position={[0, -0.6, -118]}>
        <mesh material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[15, 16, 0.6, 28]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[11, 12, 0.5, 24]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[7, 8, 0.5, 20]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 4: PUNE ASHRAM (Z ≈ -155 to -195)
          Reflecting pool with coping, marble pavilions, palm clusters, narrowing corridor
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -172]}>
        {/* Reflection Pool */}
        <mesh position={[1.5, -0.85, 0]} material={poolWaterMaterial} receiveShadow>
          <boxGeometry args={[8.2, 0.2, 20]} />
        </mesh>
        {/* Stepped pool coping border */}
        <mesh position={[1.5, -0.72, 0]} material={warmAshramMaterial} receiveShadow>
          <boxGeometry args={[9.4, 0.35, 21.2]} />
        </mesh>

        {/* Covered Ashram Pavilion on the right */}
        <group position={[7.8, 0, 0]}>
          <mesh position={[0, -0.4, 0]} material={warmAshramMaterial} receiveShadow>
            <boxGeometry args={[6.5, 0.6, 22]} />
          </mesh>
          {[-8, -3, 2, 7].map((zOffset, i) => (
            <ArchitecturalColumn
              key={`pune-col-${i}`}
              position={[-2.2, 0, zOffset]}
              height={6.6}
              radius={0.3}
              material={warmAshramMaterial}
            />
          ))}
          {/* Pavilion roof with eaves */}
          <mesh position={[0, 6.8, 0]} material={warmAshramMaterial} castShadow>
            <boxGeometry args={[7.2, 0.7, 23]} />
          </mesh>
        </group>

        {/* Ashram Palm Tree Clusters */}
        <group position={[-5.8, 0, -5]}>
          <mesh position={[0, 4.2, 0]} rotation={[0, 0, -0.12]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.2, 0.36, 9.5, 7]} />
          </mesh>
          <mesh position={[-0.5, 9.0, 0]} material={foliageMaterial} castShadow>
            <coneGeometry args={[3.0, 2.0, 8]} />
          </mesh>
        </group>
        <group position={[-7.2, 0, 4]}>
          <mesh position={[0, 3.8, 0]} rotation={[0.12, 0, 0.1]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.18, 0.34, 8.5, 7]} />
          </mesh>
          <mesh position={[0.4, 8.2, 0.3]} material={foliageMaterial} castShadow>
            <coneGeometry args={[2.6, 1.8, 8]} />
          </mesh>
        </group>

        {/* Transition into spatial pressure: Tall narrowing corridor walls (Z = -185 to -195) */}
        <mesh position={[-4.0, 4.5, -16]} material={warmAshramMaterial} castShadow>
          <boxGeometry args={[1.4, 10, 16]} />
        </mesh>
        <mesh position={[4.0, 4.5, -16]} material={warmAshramMaterial} castShadow>
          <boxGeometry args={[1.4, 10, 16]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 5: RAJNEESHPURAM (Z ≈ -225 to -275)
          Vast American desert scale: Hangar, silos, watchtower, highway barriers
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -250]}>
        {/* Massive Commune Assembly Hangar on the right */}
        <group position={[18, 0, 0]}>
          <mesh position={[0, 6.5, 0]} material={desertCommuneMaterial} castShadow receiveShadow>
            <boxGeometry args={[24, 13, 42]} />
          </mesh>
          {/* Sloped hangar roof */}
          <mesh position={[0, 13.8, 0]} rotation={[0, 0, Math.PI / 4]} material={metalTrussMaterial}>
            <cylinderGeometry args={[18, 18, 42, 4, 1, false, Math.PI * 0.25, Math.PI * 0.5]} />
          </mesh>
        </group>

        {/* Industrial Storage Silos */}
        <group position={[7.5, 0, 12]}>
          <mesh position={[0, 5.0, 0]} material={metalTrussMaterial} castShadow>
            <cylinderGeometry args={[2.4, 2.4, 10, 16]} />
          </mesh>
          <mesh position={[0, 10.8, 0]} material={metalTrussMaterial} castShadow>
            <coneGeometry args={[2.5, 1.6, 16]} />
          </mesh>
        </group>

        {/* Security Watchtower on the left (Z = -255) */}
        <group position={[-9.5, 0, -5]}>
          {/* Tower Leg Frame */}
          <mesh position={[0, 9.5, 0]} material={brutalistMaterial} castShadow>
            <boxGeometry args={[4.2, 19, 4.2]} />
          </mesh>
          {/* Observation Cabin */}
          <mesh position={[0, 19.5, 0]} material={brutalistMaterial} castShadow>
            <boxGeometry args={[7.0, 3.8, 7.0]} />
          </mesh>
          {/* Tower Antenna */}
          <mesh position={[0, 24.0, 0]} material={metalTrussMaterial}>
            <cylinderGeometry args={[0.08, 0.14, 7, 4]} />
          </mesh>
        </group>

        {/* Rows of modular barracks in distance */}
        {[-14, -4, 6, 16].map((zOffset, i) => (
          <mesh
            key={`barrack-${i}`}
            position={[-19, 2.2, zOffset]}
            material={desertCommuneMaterial}
            castShadow
          >
            <boxGeometry args={[11, 4.2, 6.5]} />
          </mesh>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 6: COLLAPSE & LEGAL RECKONING (Z ≈ -295 to -335)
          Broken environment: Fractured paths, tilted pillars, shattered symmetry
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -315]}>
        {/* Tilted broken pillar 1 */}
        <group position={[-3.8, 2.2, 4]} rotation={[0.22, -0.32, 0.44]}>
          <ArchitecturalColumn position={[0, 0, 0]} height={7.0} radius={0.58} material={brokenRuinMaterial} />
        </group>
        {/* Tilted broken pillar 2 */}
        <group position={[4.2, 1.8, -6]} rotation={[-0.32, 0.22, -0.38]}>
          <ArchitecturalColumn position={[0, 0, 0]} height={5.8} radius={0.55} material={brokenRuinMaterial} />
        </group>
        {/* Displaced foundation blocks with gaps */}
        <mesh position={[-2.6, -0.3, 0]} rotation={[0.06, 0.12, -0.09]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[7.5, 0.9, 8.5]} />
        </mesh>
        <mesh position={[3.4, 0.2, -2]} rotation={[-0.09, -0.16, 0.13]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[6.5, 1.2, 7.5]} />
        </mesh>
        {/* Shattered masonry fragments */}
        <mesh position={[1.4, 0.4, 5]} rotation={[0.4, 0.5, 0.2]} material={brokenRuinMaterial} castShadow>
          <dodecahedronGeometry args={[1.5, 0]} />
        </mesh>
        <mesh position={[-1.8, 0.3, -8]} rotation={[-0.3, 0.2, 0.5]} material={brokenRuinMaterial} castShadow>
          <dodecahedronGeometry args={[1.9, 0]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 7: ABANDONMENT / EMPTY RUINS (Z ≈ -360 to -405)
          Disappearance of scale: solitary abandoned gate, empty road
          ───────────────────────────────────────────────────────────── */}
      <group position={[-2.5, 0, -385]}>
        {/* Solitary weathered monolith gate */}
        <mesh position={[-3.0, 4.8, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[1.3, 10.0, 1.3]} />
        </mesh>
        <mesh position={[3.0, 4.8, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[1.3, 10.0, 1.3]} />
        </mesh>
        <mesh position={[0, 10.0, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[7.8, 1.2, 1.5]} />
        </mesh>
        {/* Scattered debris stones in the vast desert */}
        <mesh position={[7.0, -0.4, 6]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[2.4, 0.85, 2.0]} />
        </mesh>
        <mesh position={[-7.5, -0.4, -8]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[2.0, 0.75, 2.5]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 8: DUALITY / THE CONTRADICTION (Z ≈ -430 to -475)
          Divided visual world:
          Left side (X < 0): Warm, organic, curved terraces, gentle trees
          Right side (X > 0): Cold, rigid, sharp brutalist monoliths
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -452]}>
        {/* LEFT SIDE: ORGANIC, WARM, CURVED */}
        <group position={[-6.8, 0, 0]}>
          {/* Curved stepped earthen terraces */}
          <mesh position={[0, 0.5, 0]} rotation={[0, 0.2, 0]} material={organicEarthMaterial} receiveShadow>
            <cylinderGeometry args={[6.5, 8.0, 1.9, 18, 1, false, 0, Math.PI * 0.9]} />
          </mesh>
          <mesh position={[0, 2.4, 0]} rotation={[0, 0.4, 0]} material={organicEarthMaterial} receiveShadow>
            <cylinderGeometry args={[4.4, 5.6, 1.9, 18, 1, false, 0, Math.PI * 0.9]} />
          </mesh>
          {/* Organic gentle tree */}
          <mesh position={[-2.2, 4.8, -2]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.26, 0.42, 6.5, 7]} />
          </mesh>
          <mesh position={[-2.2, 8.4, -2]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[2.4, 1]} />
          </mesh>
        </group>

        {/* RIGHT SIDE: RIGID, COLD, BRUTALIST */}
        <group position={[6.8, 0, 0]}>
          <mesh position={[0, 5.0, -4]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.4, 11, 6.5]} />
          </mesh>
          <mesh position={[3.4, 6.5, 2]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.2, 14, 5.5]} />
          </mesh>
          <mesh position={[-2.0, 3.5, 4]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.0, 8.0, 4.5]} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 9 & EPILOGUE: THE OPEN HORIZON & LEGACY (Z < -490)
          Return toward vast openness, minimal clutter, solitary quiet plinth
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -535]}>
        {/* Minimalist zen stone plinth in the deep horizon distance */}
        <mesh position={[0, 0.45, 0]} material={sandstoneMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.9, 3.6]} />
        </mesh>
        <mesh position={[0, 1.7, 0]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[1.6, 1.7, 1.6]} />
        </mesh>
        {/* Subtle balanced marker stones */}
        <mesh position={[-4.8, -0.4, 4]} material={sandstoneMaterial} castShadow>
          <dodecahedronGeometry args={[1.0, 0]} />
        </mesh>
        <mesh position={[5.4, -0.4, -6]} material={sandstoneMaterial} castShadow>
          <dodecahedronGeometry args={[0.9, 0]} />
        </mesh>
      </group>
    </group>
  );
}
