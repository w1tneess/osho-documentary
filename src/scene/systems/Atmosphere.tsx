import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTER_SCENE_CONFIGS } from '../../config/chapters';

interface AtmosphereProps {
  scrollProgress: React.RefObject<number>;
}

/**
 * Controls fog and background color, interpolating between chapter configs.
 * This is the primary mechanism for the "environment evolves with the story" requirement.
 */
export function Atmosphere({ scrollProgress }: AtmosphereProps) {
  const fogColorRef = useRef(new THREE.Color());

  // Temp colors for interpolation
  const tempA = useMemo(() => new THREE.Color(), []);
  const tempB = useMemo(() => new THREE.Color(), []);

  useFrame(({ scene }) => {
    const progress = scrollProgress.current ?? 0;
    const configs = CHAPTER_SCENE_CONFIGS;
    const totalConfigs = configs.length;

    const floatIndex = progress * (totalConfigs - 1);
    const lowerIndex = Math.floor(floatIndex);
    const upperIndex = Math.min(lowerIndex + 1, totalConfigs - 1);
    const t = floatIndex - lowerIndex;

    const lower = configs[lowerIndex];
    const upper = configs[upperIndex];

    // Interpolate fog color
    tempA.set(lower.fogColor);
    tempB.set(upper.fogColor);
    fogColorRef.current.lerpColors(tempA, tempB, t);

    // Apply fog
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(fogColorRef.current);
      scene.fog.near = THREE.MathUtils.lerp(lower.fogNear, upper.fogNear, t);
      scene.fog.far = THREE.MathUtils.lerp(lower.fogFar, upper.fogFar, t);
    }

    // Background color (simple version — gradient handled by CSS)
    scene.background = fogColorRef.current;
  });

  return null;
}
