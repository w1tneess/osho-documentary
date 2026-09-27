import { useMemo } from 'react';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface WorldTerrainProps {
  quality: QualityLevel;
  scrollProgress: React.RefObject<number>;
}

/**
 * WorldTerrain:
 * The physical ground landscape spanning the entire documentary journey (Z = +30 to -650).
 * Features:
 * - Natural rolling side topography that frames the camera in a valley
 * - Flatter central corridor where paths, structures, and courtyards sit
 * - Stylized faceted low-poly look with warm sand/ochre earth tones
 * - Ground-level pathway ribbon running continuously through the landscape
 */
export function WorldTerrain({ quality }: WorldTerrainProps) {
  const segmentsX = quality === 'low' ? 36 : quality === 'medium' ? 64 : 96;
  const segmentsZ = quality === 'low' ? 120 : quality === 'medium' ? 240 : 360;

  // Generate terrain mesh geometry with central valley and natural hills
  const terrainGeometry = useMemo(() => {
    const width = 160;
    const length = 740;
    // Plane in local XY
    const geom = new THREE.PlaneGeometry(width, length, segmentsX, segmentsZ);
    const pos = geom.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1]; // local y becomes -z in world
      const worldZ = -330 - y;

      const distFromCenter = Math.abs(x);

      // Elevated side ridges to frame the scene gracefully
      const sideElevation = Math.pow(Math.max(0, distFromCenter - 12) * 0.12, 1.8);

      // Multi-frequency natural undulations
      const naturalNoise =
        Math.sin(x * 0.08) * Math.cos(worldZ * 0.03) * 2.2 +
        Math.sin(x * 0.2 + worldZ * 0.07) * 0.8 +
        Math.cos(x * 0.04 - worldZ * 0.02) * 1.5;

      // Narrative terrain variations:
      let zoneModifier = 1.0;
      if (worldZ < -230 && worldZ > -310) {
        zoneModifier = 0.35; // flat Oregon plateau
      } else if (worldZ <= -310 && worldZ > -370) {
        zoneModifier = 1.5; // rugged / broken terrain
      } else if (worldZ <= -480) {
        zoneModifier = 0.2; // vast flat serene horizon
      }

      // Height (Z in PlaneGeometry is elevation before rotation)
      const height = -1.2 + (sideElevation * 1.2 + naturalNoise * 0.7) * zoneModifier;
      arr[i * 3 + 2] = height;
    }

    geom.computeVertexNormals();
    return geom;
  }, [segmentsX, segmentsZ]);

  // Pathway / Road ribbon running flat on top of the terrain in 3D world space
  const pathGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const step = 4;
    for (let z = 30; z >= -650; z -= step) {
      let x = Math.sin(z * 0.018) * 3.5;
      
      // Ch5: dead straight road
      if (z <= -235 && z >= -315) {
        x = 0;
      }
      // Ch8: centered dividing line
      if (z <= -420 && z >= -480) {
        x = 0;
      }
      // Ch9/End: gentle fade
      if (z < -480) {
        x = Math.sin(z * 0.01) * 1.5;
      }

      points.push(new THREE.Vector3(x, -1.0, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    // Build path ribbon in true world 3D coordinates
    const geom = new THREE.BufferGeometry();
    const posList: number[] = [];
    const normList: number[] = [];
    const indexList: number[] = [];

    const numSteps = 240;
    const pathWidth = 3.6;

    for (let i = 0; i <= numSteps; i++) {
      const u = i / numSteps;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      // Left vertex
      posList.push(
        pt.x - normal.x * (pathWidth / 2),
        pt.y + 0.04,
        pt.z - normal.z * (pathWidth / 2)
      );
      normList.push(0, 1, 0);

      // Right vertex
      posList.push(
        pt.x + normal.x * (pathWidth / 2),
        pt.y + 0.04,
        pt.z + normal.z * (pathWidth / 2)
      );
      normList.push(0, 1, 0);

      if (i < numSteps) {
        const base = i * 2;
        indexList.push(base, base + 1, base + 2);
        indexList.push(base + 1, base + 3, base + 2);
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(posList, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(normList, 3));
    geom.setIndex(indexList);
    return geom;
  }, []);

  return (
    <group>
      {/* Primary Landscape */}
      <mesh
        geometry={terrainGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -330]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#d2be9a"
          roughness={0.94}
          metalness={0.03}
          flatShading={quality !== 'high'}
        />
      </mesh>

      {/* The Connecting Path / Road (already in world coordinates, no rotation needed) */}
      <mesh
        geometry={pathGeometry}
        receiveShadow
      >
        <meshStandardMaterial
          color="#bfa27a"
          roughness={0.88}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>
    </group>
  );
}
