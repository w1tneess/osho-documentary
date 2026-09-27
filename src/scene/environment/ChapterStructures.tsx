import { useMemo } from 'react';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface ChapterStructuresProps {
  quality: QualityLevel;
}

/**
 * ChapterStructures:
 * The MIDGROUND architectural and natural environment.
 * Distinct environmental storytelling per chapter:
 * - Ch 1: Solitary Bodhi tree & natural boulders
 * - Ch 2: Stone gate, plinths, and emerging columns
 * - Ch 3: Grand colonnade and circular gathering terrace
 * - Ch 4: Pune Ashram (reflecting pool, lush palms, narrowing corridors)
 * - Ch 5: Rajneeshpuram (vast city sprawl, straight highway, hangar, watchtower)
 * - Ch 6: Collapse (fractured roadway, tilted pillars, shattered symmetry)
 * - Ch 7: Abandonment (isolated ruins, empty expanses)
 * - Ch 8: Duality (curved organic earth vs cold brutalist monoliths)
 * - Ch 9: The open horizon & quiet zen memorial plinth
 */
export function ChapterStructures({ quality }: ChapterStructuresProps) {
  // Shared materials
  const sandstoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4be9a',
        roughness: 0.88,
        metalness: 0.04,
        flatShading: quality !== 'high',
      }),
    [quality]
  );

  const warmAshramMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e2d4c0',
        roughness: 0.75,
        metalness: 0.08,
      }),
    []
  );

  const poolWaterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#7a8e99',
        roughness: 0.15,
        metalness: 0.4,
      }),
    []
  );

  const desertCommuneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9e988c',
        roughness: 0.9,
        metalness: 0.12,
        flatShading: true,
      }),
    []
  );

  const brokenRuinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#635c54',
        roughness: 0.95,
        metalness: 0.05,
        flatShading: true,
      }),
    []
  );

  const organicEarthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ba7a54',
        roughness: 0.85,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const brutalistMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#555e68',
        roughness: 0.92,
        metalness: 0.15,
        flatShading: true,
      }),
    []
  );

  const foliageMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5e6840',
        roughness: 0.8,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const trunkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4e3b2c',
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
          Natural forms: solitary Bodhi tree, circular stone plinth, rocks
          ───────────────────────────────────────────────────────────── */}
      <group position={[5.5, 0, -32]}>
        {/* Meditation circular stone terrace */}
        <mesh position={[0, -0.6, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[4.2, 4.6, 0.6, 16]} />
        </mesh>
        {/* Tree Trunk */}
        <mesh position={[0, 2.5, 0]} material={trunkMaterial} castShadow>
          <cylinderGeometry args={[0.45, 0.9, 5.5, 7]} />
        </mesh>
        {/* Peepal / Bodhi stylized foliage canopy */}
        <group position={[0, 5.2, 0]}>
          <mesh material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[2.4, 0]} />
          </mesh>
          <mesh position={[-1.2, 0.8, 0.8]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[1.6, 0]} />
          </mesh>
          <mesh position={[1.4, 0.6, -0.6]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[1.8, 0]} />
          </mesh>
        </group>
        {/* Natural stone bench */}
        <mesh position={[-1.6, 0.1, 1.2]} rotation={[0, 0.4, 0]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[1.8, 0.45, 0.7]} />
        </mesh>
      </group>

      {/* Scattered rocks along Ch 1 path */}
      <mesh position={[-6.5, -0.4, -26]} material={sandstoneMaterial} castShadow>
        <dodecahedronGeometry args={[1.5, 0]} />
      </mesh>
      <mesh position={[-7.8, -0.2, -38]} material={sandstoneMaterial} castShadow>
        <dodecahedronGeometry args={[2.0, 0]} />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 2: FOUNDING THE MOVEMENT (Z ≈ -55 to -80)
          Emergence of architecture: stone gateway, plinths, initial columns
          ───────────────────────────────────────────────────────────── */}
      <group position={[-4.5, 0, -68]}>
        {/* Stepped stone terrace */}
        <mesh position={[0, -0.5, 0]} material={sandstoneMaterial} receiveShadow>
          <boxGeometry args={[16, 0.6, 14]} />
        </mesh>
        {/* Ceremonial Stone Gateway */}
        <group position={[1.8, 0, 0]}>
          {/* Left Gateway Post */}
          <mesh position={[-2.4, 3.2, 0]} material={sandstoneMaterial} castShadow>
            <boxGeometry args={[1.0, 6.8, 1.0]} />
          </mesh>
          {/* Right Gateway Post */}
          <mesh position={[2.4, 3.2, 0]} material={sandstoneMaterial} castShadow>
            <boxGeometry args={[1.0, 6.8, 1.0]} />
          </mesh>
          {/* Lintel */}
          <mesh position={[0, 6.8, 0]} material={sandstoneMaterial} castShadow>
            <boxGeometry args={[6.4, 0.9, 1.2]} />
          </mesh>
        </group>
        {/* Flanking stone plinths */}
        <mesh position={[-5.5, 1.2, 2.5]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[1.6, 2.8, 1.6]} />
        </mesh>
        <mesh position={[-5.5, 1.2, -2.5]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[1.6, 2.8, 1.6]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 3: THE MOVEMENT GATHERS (Z ≈ -95 to -135)
          Scale expansion: Rhythmic colonnade, vast circular gathering plaza
          ───────────────────────────────────────────────────────────── */}
      {/* Colonnade flanking the path */}
      {[-100, -108, -116, -124, -132].map((z, idx) => (
        <group key={`colonnade-${idx}`}>
          {/* Left Column */}
          <mesh position={[-4.5, 3.5, z]} material={sandstoneMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.55, 0.65, 8.5, 8]} />
          </mesh>
          {/* Right Column */}
          <mesh position={[4.5, 3.5, z]} material={sandstoneMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.55, 0.65, 8.5, 8]} />
          </mesh>
        </group>
      ))}

      {/* Central Circular Gathering Plaza */}
      <group position={[0, -0.6, -118]}>
        <mesh material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[14, 15, 0.5, 24]} />
        </mesh>
        <mesh position={[0, 0.4, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[10, 11, 0.5, 24]} />
        </mesh>
        <mesh position={[0, 0.8, 0]} material={sandstoneMaterial} receiveShadow>
          <cylinderGeometry args={[6, 7, 0.5, 20]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 4: PUNE ASHRAM (Z ≈ -155 to -195)
          Lush, beautiful sanctuary -> transitioning to spatial pressure
          Reflecting pool, palm clusters, marble-style pavilions, narrowing corridors
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -172]}>
        {/* Reflection Pool */}
        <mesh position={[1.5, -0.85, 0]} material={poolWaterMaterial} receiveShadow>
          <boxGeometry args={[8, 0.2, 18]} />
        </mesh>
        {/* Pool coping / marble border */}
        <mesh position={[1.5, -0.75, 0]} material={warmAshramMaterial} receiveShadow>
          <boxGeometry args={[8.8, 0.3, 18.8]} />
        </mesh>

        {/* Covered Ashram Pavilion on the right */}
        <group position={[7.5, 0, 0]}>
          <mesh position={[0, -0.4, 0]} material={warmAshramMaterial} receiveShadow>
            <boxGeometry args={[6, 0.6, 20]} />
          </mesh>
          {/* Slender pavilion columns */}
          {[-7, -2, 3, 8].map((zOffset, i) => (
            <mesh key={`pune-col-${i}`} position={[-2, 3.0, zOffset]} material={warmAshramMaterial} castShadow>
              <cylinderGeometry args={[0.3, 0.35, 6.5, 8]} />
            </mesh>
          ))}
          {/* Pavilion roof */}
          <mesh position={[0, 6.4, 0]} material={warmAshramMaterial} castShadow>
            <boxGeometry args={[6.8, 0.6, 21]} />
          </mesh>
        </group>

        {/* Ashram Palm Tree Clusters */}
        <group position={[-5.5, 0, -5]}>
          <mesh position={[0, 4.0, 0]} rotation={[0, 0, -0.1]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.2, 0.35, 9, 6]} />
          </mesh>
          <mesh position={[-0.4, 8.5, 0]} material={foliageMaterial} castShadow>
            <coneGeometry args={[2.8, 1.8, 7]} />
          </mesh>
        </group>
        <group position={[-6.8, 0, 4]}>
          <mesh position={[0, 3.5, 0]} rotation={[0.1, 0, 0.08]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.18, 0.32, 8, 6]} />
          </mesh>
          <mesh position={[0.3, 7.5, 0.2]} material={foliageMaterial} castShadow>
            <coneGeometry args={[2.4, 1.6, 7]} />
          </mesh>
        </group>

        {/* Transition into spatial pressure: Tall narrowing corridor walls (Z = -185 to -195) */}
        <mesh position={[-3.8, 4.0, -16]} material={warmAshramMaterial} castShadow>
          <boxGeometry args={[1.2, 9, 14]} />
        </mesh>
        <mesh position={[3.8, 4.0, -16]} material={warmAshramMaterial} castShadow>
          <boxGeometry args={[1.2, 9, 14]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 5: RAJNEESHPURAM (Z ≈ -225 to -275)
          Vast American desert scale: Long straight highway, massive hangar, watchtower
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -250]}>
        {/* Massive Commune Assembly Hangar on the right */}
        <group position={[16, 0, 0]}>
          <mesh position={[0, 6.0, 0]} material={desertCommuneMaterial} castShadow receiveShadow>
            <boxGeometry args={[22, 12, 38]} />
          </mesh>
          {/* Sloped corrugated roof */}
          <mesh position={[0, 13.0, 0]} rotation={[0, 0, Math.PI / 4]} material={desertCommuneMaterial}>
            <cylinderGeometry args={[16, 16, 38, 4, 1, false, Math.PI * 0.25, Math.PI * 0.5]} />
          </mesh>
        </group>

        {/* Security Watchtower on the left (Z = -255) */}
        <group position={[-9, 0, -5]}>
          {/* Tower Leg Frame */}
          <mesh position={[0, 9, 0]} material={brutalistMaterial} castShadow>
            <boxGeometry args={[4, 18, 4]} />
          </mesh>
          {/* Observation Cabin */}
          <mesh position={[0, 19, 0]} material={brutalistMaterial} castShadow>
            <boxGeometry args={[6.5, 3.5, 6.5]} />
          </mesh>
          {/* Tower Antenna */}
          <mesh position={[0, 23, 0]} material={brutalistMaterial}>
            <cylinderGeometry args={[0.08, 0.12, 6, 4]} />
          </mesh>
        </group>

        {/* Rows of modular barracks in distance */}
        {[-14, -4, 6, 16].map((zOffset, i) => (
          <mesh
            key={`barrack-${i}`}
            position={[-18, 2.0, zOffset]}
            material={desertCommuneMaterial}
            castShadow
          >
            <boxGeometry args={[10, 3.8, 6]} />
          </mesh>
        ))}
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 6: COLLAPSE & LEGAL RECKONING (Z ≈ -295 to -335)
          Broken environment: Fractured paths, tilted pillars, shattered symmetry
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -315]}>
        {/* Tilted broken pillar 1 */}
        <group position={[-3.8, 2.2, 4]} rotation={[0.2, -0.3, 0.42]}>
          <mesh material={brokenRuinMaterial} castShadow>
            <cylinderGeometry args={[0.65, 0.75, 7.5, 7]} />
          </mesh>
        </group>
        {/* Tilted broken pillar 2 */}
        <group position={[4.2, 1.8, -6]} rotation={[-0.3, 0.2, -0.35]}>
          <mesh material={brokenRuinMaterial} castShadow>
            <cylinderGeometry args={[0.6, 0.7, 6.0, 7]} />
          </mesh>
        </group>
        {/* Displaced foundation blocks with gaps */}
        <mesh position={[-2.5, -0.3, 0]} rotation={[0.05, 0.1, -0.08]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[7, 0.8, 8]} />
        </mesh>
        <mesh position={[3.2, 0.2, -2]} rotation={[-0.08, -0.15, 0.12]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[6, 1.1, 7]} />
        </mesh>
        {/* Shattered masonry fragments */}
        <mesh position={[1.2, 0.4, 5]} rotation={[0.4, 0.5, 0.2]} material={brokenRuinMaterial} castShadow>
          <dodecahedronGeometry args={[1.4, 0]} />
        </mesh>
        <mesh position={[-1.8, 0.3, -8]} rotation={[-0.3, 0.2, 0.5]} material={brokenRuinMaterial} castShadow>
          <dodecahedronGeometry args={[1.8, 0]} />
        </mesh>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 7: ABANDONMENT / EMPTY RUINS (Z ≈ -360 to -405)
          Disappearance of scale: solitary abandoned gate, empty road
          ───────────────────────────────────────────────────────────── */}
      <group position={[-2.5, 0, -385]}>
        {/* Solitary weathered monolith gate */}
        <mesh position={[-2.8, 4.5, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[1.2, 9.5, 1.2]} />
        </mesh>
        <mesh position={[2.8, 4.5, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[1.2, 9.5, 1.2]} />
        </mesh>
        <mesh position={[0, 9.5, 0]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[7.2, 1.1, 1.4]} />
        </mesh>
        {/* Scattered debris stones in the vast desert */}
        <mesh position={[6.5, -0.4, 6]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[2.2, 0.8, 1.8]} />
        </mesh>
        <mesh position={[-7.2, -0.4, -8]} material={brokenRuinMaterial} castShadow>
          <boxGeometry args={[1.8, 0.7, 2.4]} />
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
        <group position={[-6.5, 0, 0]}>
          {/* Curved stepped earthen terraces */}
          <mesh position={[0, 0.5, 0]} rotation={[0, 0.2, 0]} material={organicEarthMaterial} receiveShadow>
            <cylinderGeometry args={[6, 7.5, 1.8, 16, 1, false, 0, Math.PI * 0.9]} />
          </mesh>
          <mesh position={[0, 2.2, 0]} rotation={[0, 0.4, 0]} material={organicEarthMaterial} receiveShadow>
            <cylinderGeometry args={[4, 5.2, 1.8, 16, 1, false, 0, Math.PI * 0.9]} />
          </mesh>
          {/* Organic gentle tree */}
          <mesh position={[-2, 4.5, -2]} material={trunkMaterial} castShadow>
            <cylinderGeometry args={[0.25, 0.4, 6, 6]} />
          </mesh>
          <mesh position={[-2, 8.0, -2]} material={foliageMaterial} castShadow>
            <dodecahedronGeometry args={[2.2, 1]} />
          </mesh>
        </group>

        {/* RIGHT SIDE: RIGID, COLD, BRUTALIST */}
        <group position={[6.5, 0, 0]}>
          <mesh position={[0, 4.5, -4]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.2, 10, 6]} />
          </mesh>
          <mesh position={[3.2, 6.0, 2]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.0, 13, 5]} />
          </mesh>
          <mesh position={[-1.8, 3.2, 4]} material={brutalistMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.8, 7.5, 4]} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          CHAPTER 9 & EPILOGUE: THE OPEN HORIZON & LEGACY (Z < -490)
          Return toward vast openness, minimal clutter, solitary quiet plinth
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -535]}>
        {/* Minimalist zen stone plinth in the deep horizon distance */}
        <mesh position={[0, 0.4, 0]} material={sandstoneMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.8, 3.2]} />
        </mesh>
        <mesh position={[0, 1.6, 0]} material={sandstoneMaterial} castShadow>
          <boxGeometry args={[1.4, 1.6, 1.4]} />
        </mesh>
        {/* Subtle balanced marker stones */}
        <mesh position={[-4.5, -0.4, 4]} material={sandstoneMaterial} castShadow>
          <dodecahedronGeometry args={[0.9, 0]} />
        </mesh>
        <mesh position={[5.2, -0.4, -6]} material={sandstoneMaterial} castShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
        </mesh>
      </group>
    </group>
  );
}
