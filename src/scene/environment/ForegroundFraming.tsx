import { useMemo } from 'react';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface ForegroundFramingProps {
  quality: QualityLevel;
}

/**
 * ForegroundFraming:
 * Places geometric framing elements along the outer perimeter of the camera's FOV.
 * Creates depth, scale, and subtle framing without obstructing content or camera center.
 */
export function ForegroundFraming({ quality }: ForegroundFramingProps) {
  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b0967a',
        roughness: 0.88,
        metalness: 0.05,
        flatShading: quality !== 'high',
      }),
    [quality]
  );

  const darkStoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6e5a48',
        roughness: 0.85,
        metalness: 0.08,
        flatShading: true,
      }),
    []
  );

  const woodBranchMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4e3b2c',
        roughness: 0.95,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const foliageMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#656040',
        roughness: 0.8,
        metalness: 0.02,
        flatShading: true,
      }),
    []
  );

  const concreteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8c8a82',
        roughness: 0.92,
        metalness: 0.1,
        flatShading: true,
      }),
    []
  );

  return (
    <group>
      {/* ─── INTRO FRAMING (Z ≈ 14 to 5) ─── */}
      {/* Low stone terrace wall tucked into far left corner */}
      <mesh
        position={[-6.8, 0.4, 8]}
        rotation={[0, 0.25, 0]}
        material={stoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.6, 1.2, 8]} />
      </mesh>
      {/* Desert tree branch grazing far top-right corner */}
      <group position={[6.2, 5.2, 7]} rotation={[0.2, -0.4, -0.2]}>
        <mesh material={woodBranchMaterial} castShadow>
          <cylinderGeometry args={[0.08, 0.2, 4.5, 6]} />
        </mesh>
        <mesh position={[-0.8, 1.0, -0.3]} material={foliageMaterial}>
          <dodecahedronGeometry args={[0.8, 0]} />
        </mesh>
      </group>

      {/* ─── CHAPTER 1: THE SEEKER (Z ≈ -15 to -25) ─── */}
      {/* Boulder cluster on the far left */}
      <group position={[-5.8, 0.2, -18]} rotation={[0.1, 0.4, -0.1]}>
        <mesh material={stoneMaterial} castShadow receiveShadow>
          <dodecahedronGeometry args={[1.6, 0]} />
        </mesh>
      </group>

      {/* ─── CHAPTER 2: FOUNDING (Z ≈ -48 to -58) ─── */}
      {/* Ancient carved stone column framing right edge */}
      <group position={[6.2, 2.5, -48]}>
        <mesh material={stoneMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.65, 0.75, 7, 8]} />
        </mesh>
        <mesh position={[0, 3.6, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[1.8, 0.5, 1.8]} />
        </mesh>
      </group>

      {/* ─── CHAPTER 3: THE MOVEMENT GATHERS (Z ≈ -92 to -105) ─── */}
      {/* Overhead lintel high above the camera */}
      <mesh
        position={[0, 6.8, -95]}
        material={stoneMaterial}
        castShadow
      >
        <boxGeometry args={[12, 0.8, 1.4]} />
      </mesh>

      {/* ─── CHAPTER 4: PUNE ASHRAM (Z ≈ -148 to -162) ─── */}
      {/* Palm canopy grazing top left */}
      <group position={[-5.8, 5.8, -150]} rotation={[0.2, 0.3, 0.2]}>
        <mesh material={foliageMaterial} castShadow>
          <coneGeometry args={[2.5, 1.4, 7]} />
        </mesh>
      </group>

      {/* ─── CHAPTER 5: RAJNEESHPURAM (Z ≈ -212 to -225) ─── */}
      {/* Steel girder high in top-left sky */}
      <mesh
        position={[-6.2, 11.5, -215]}
        rotation={[0, 0, -0.1]}
        material={concreteMaterial}
        castShadow
      >
        <boxGeometry args={[8, 0.4, 0.6]} />
      </mesh>

      {/* ─── CHAPTER 6: COLLAPSE (Z ≈ -288 to -302) ─── */}
      {/* Tilted broken pillar on the left flank */}
      <group position={[-5.5, 2.4, -292]} rotation={[0.1, 0.2, 0.35]}>
        <mesh material={darkStoneMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 6.5, 7]} />
        </mesh>
      </group>

      {/* ─── CHAPTER 7: ABANDONMENT / RUINS (Z ≈ -352 to -368) ─── */}
      <mesh
        position={[5.8, 2.2, -358]}
        rotation={[0, -0.2, -0.08]}
        material={darkStoneMaterial}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.9, 4.8, 0.9]} />
      </mesh>

      {/* ─── CHAPTER 8: DUALITY (Z ≈ -422 to -438) ─── */}
      <mesh
        position={[-5.8, 2.5, -426]}
        rotation={[0, 0.3, 0]}
        material={stoneMaterial}
        castShadow
      >
        <cylinderGeometry args={[1.4, 1.8, 5, 8, 1, false, 0, Math.PI]} />
      </mesh>
      <mesh
        position={[5.8, 2.8, -426]}
        material={concreteMaterial}
        castShadow
      >
        <boxGeometry args={[0.8, 6.0, 3.5]} />
      </mesh>

      {/* ─── CHAPTER 9 & EPILOGUE (Z < -490) ─── */}
      {/* Clean open landscape, subtle rocks far below line of sight */}
      <mesh
        position={[-6.2, -0.6, -500]}
        material={stoneMaterial}
        castShadow
      >
        <dodecahedronGeometry args={[0.8, 0]} />
      </mesh>
    </group>
  );
}
