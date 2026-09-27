import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTER_SCENE_CONFIGS } from '../../config/chapters';

interface ScrollCameraProps {
  scrollProgress: React.RefObject<number>;
}

/**
 * Camera rig that smoothly interpolates between chapter scene configs
 * based on scroll progress. Uses lerp on position/lookAt for fluid motion.
 * Reads scrollProgress via ref (no React re-renders).
 */
export function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const targetPosRef = useRef(new THREE.Vector3(0, 2, 12));
  const currentPosRef = useRef(new THREE.Vector3(0, 2, 12));
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const progress = scrollProgress.current ?? 0;
    const configs = CHAPTER_SCENE_CONFIGS;
    const totalConfigs = configs.length;

    // Map progress [0,1] to a float index
    const floatIndex = progress * (totalConfigs - 1);
    const lowerIndex = Math.floor(floatIndex);
    const upperIndex = Math.min(lowerIndex + 1, totalConfigs - 1);
    const t = floatIndex - lowerIndex;

    const lower = configs[lowerIndex];
    const upper = configs[upperIndex];

    // Interpolate camera Y from chapter configs
    const cameraY = THREE.MathUtils.lerp(lower.cameraY, upper.cameraY, t);

    // Camera position: gentle side-to-side sway based on chapter
    const sway = Math.sin(progress * Math.PI * 4) * 1.5;
    targetPosRef.current.set(sway, cameraY + 4, 12);

    // Smooth damp towards target (lerp factor ~0.04 for cinematic feel)
    currentPosRef.current.lerp(targetPosRef.current, 0.04);
    camera.position.copy(currentPosRef.current);

    // Look slightly ahead (downward into the terrain)
    lookAtRef.current.set(0, cameraY - 2, 0);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}
