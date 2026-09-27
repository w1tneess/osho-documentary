import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../hooks/useQualityLevel';

interface LightingRigProps {
  scrollProgress: React.RefObject<number>;
  quality: QualityLevel;
}

/**
 * Cinematic Lighting Rig
 * 
 * Provides:
 * - Directional key sunlight with real shadows
 * - Hemisphere light (sky vs ground bounce) giving true volumetric dimensionality
 * - Soft fill light to prevent crushed shadows
 * - Dynamic color temperature that shifts from dawn gold -> ashram warmth -> harsh desert -> dusk slate -> open horizon gold
 */
export function LightingRig({ scrollProgress, quality }: LightingRigProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);

  // Color lerping references
  const skyColor = useRef(new THREE.Color());
  const groundColor = useRef(new THREE.Color());
  const sunColor = useRef(new THREE.Color());

  useFrame(() => {
    const p = Math.max(0, Math.min(1, scrollProgress.current ?? 0));

    // Calculate light parameters based on narrative zone
    if (p < 0.15) {
      // Intro & Ch1: Warm dawn
      sunColor.current.set('#ffeedd');
      skyColor.current.set('#e8d4b8');
      groundColor.current.set('#8a6d4b');
    } else if (p < 0.32) {
      // Ch2 & Ch3: Morning sun, vibrant warmth
      sunColor.current.set('#fff2dc');
      skyColor.current.set('#dfd0b5');
      groundColor.current.set('#7a5a3a');
    } else if (p < 0.42) {
      // Ch4: Pune Ashram - Lush, warm dappled sunlight
      sunColor.current.set('#ffe8ba');
      skyColor.current.set('#d8c29d');
      groundColor.current.set('#5c4a32');
    } else if (p < 0.52) {
      // Ch5: Rajneeshpuram - High harsh desert midday sun
      sunColor.current.set('#fff5e0');
      skyColor.current.set('#c8b595');
      groundColor.current.set('#8c6d48');
    } else if (p < 0.62) {
      // Ch6: Collapse - Amber and slate twilight
      sunColor.current.set('#d89568');
      skyColor.current.set('#8a98a8');
      groundColor.current.set('#483c32');
    } else if (p < 0.72) {
      // Ch7: Ruin & Reckoning - Cool overcast slate
      sunColor.current.set('#b0b8c0');
      skyColor.current.set('#788898');
      groundColor.current.set('#3a444e');
    } else if (p < 0.82) {
      // Ch8: Duality - Split warm ochre and cool blue
      sunColor.current.set('#d0b48c');
      skyColor.current.set('#9ca3af');
      groundColor.current.set('#55493e');
    } else {
      // Ch9 & Epilogue: Golden hour horizon
      sunColor.current.set('#ffd8a8');
      skyColor.current.set('#d4be9e');
      groundColor.current.set('#6a5542');
    }

    if (hemiLightRef.current) {
      hemiLightRef.current.color.lerp(skyColor.current, 0.05);
      hemiLightRef.current.groundColor.lerp(groundColor.current, 0.05);
    }

    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(sunColor.current, 0.05);
      // Follow the camera along Z with appropriate offset
      const zCenter = 15 - p * 600;
      dirLightRef.current.position.set(25, 35, zCenter + 20);
      dirLightRef.current.target.position.set(0, 0, zCenter - 15);
      dirLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Volumetric ambient fill: sky light vs warm earth bounce */}
      <hemisphereLight
        ref={hemiLightRef}
        args={['#e8d4b8', '#8a6d4b', 0.65]}
      />

      {/* Primary directional sun: casts crisp architectural shadows */}
      <directionalLight
        ref={dirLightRef}
        position={[25, 35, 20]}
        intensity={1.25}
        castShadow={quality !== 'low'}
        shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-bias={-0.0005}
      />
    </>
  );
}
