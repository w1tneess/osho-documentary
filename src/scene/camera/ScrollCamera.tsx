import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ScrollCameraProps {
  scrollProgress: React.RefObject<number>;
}

interface CameraWaypoint {
  progress: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
}

/**
 * Directorial Cinematic Camera Rig
 * 
 * Implements:
 * - Specific art-directed shot composition per chapter
 * - Foreground framing with depth and parallax
 * - Smooth dolly movement that reveals: reveal -> approach -> pass -> reveal again
 * - Intentional negative space framing for the editorial content
 */
const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // 0. Intro: Wide dawn vista, balustrade on left, branch on right
  { progress: 0.0, pos: [0, 2.8, 14], lookAt: [0, 1.4, -15] },
  // 1. Ch 1: The Seeker - Camera moves left, frames the solitary Bodhi tree on the right
  { progress: 0.09, pos: [-2.8, 2.5, -18], lookAt: [3.2, 1.8, -35] },
  // 2. Ch 2: Founding - Approaching stone gate, pillar framing right, looking into terrace
  { progress: 0.18, pos: [2.6, 2.8, -52], lookAt: [-1.8, 2.2, -72] },
  // 3. Ch 3: Movement Gathers - Entering grand avenue of columns, looking towards circular plaza
  { progress: 0.27, pos: [0, 3.2, -98], lookAt: [0, 2.0, -125] },
  // 4. Ch 4: Pune Ashram - Reflecting pool and pavilion view, transitioning to corridor
  { progress: 0.36, pos: [-3.0, 2.8, -154], lookAt: [2.0, 1.8, -178] },
  // 5. Ch 5: Rajneeshpuram - Elevated wide crane shot, sweeping over highway & vast infrastructure
  { progress: 0.45, pos: [4.2, 7.8, -225], lookAt: [-2.0, 2.2, -265] },
  // 6. Ch 6: Collapse - Descending into fractured debris field, tilted pillars & broken slabs
  { progress: 0.55, pos: [-2.2, 2.6, -298], lookAt: [1.5, 1.4, -325] },
  // 7. Ch 7: Abandonment - Solitary ruined gate in empty desert
  { progress: 0.64, pos: [2.5, 2.2, -365], lookAt: [-2.0, 2.0, -395] },
  // 8. Ch 8: Duality - Centered on dividing threshold: organic left vs brutalist right
  { progress: 0.73, pos: [0, 3.0, -432], lookAt: [0, 2.0, -460] },
  // 9. Ch 9: Legacy - Horizon opening up, gentle hills, quiet memorial plinth
  { progress: 0.82, pos: [-1.2, 2.0, -505], lookAt: [0.5, 1.6, -545] },
  // 10. Epilogue & References - Vast infinite horizon, slow calm halt
  { progress: 1.0, pos: [0, 2.2, -580], lookAt: [0, 2.0, -640] },
];

export function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const currentPos = useRef(new THREE.Vector3(0, 2.8, 14));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, -15));
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  // Build interpolation splines for buttery smooth motion
  const { posCurve, lookAtCurve } = useMemo(() => {
    const posPoints = CAMERA_WAYPOINTS.map(w => new THREE.Vector3(...w.pos));
    const lookAtPoints = CAMERA_WAYPOINTS.map(w => new THREE.Vector3(...w.lookAt));
    return {
      posCurve: new THREE.CatmullRomCurve3(posPoints, false, 'centripetal'),
      lookAtCurve: new THREE.CatmullRomCurve3(lookAtPoints, false, 'centripetal'),
    };
  }, []);

  useFrame(({ camera }) => {
    const p = Math.max(0, Math.min(1, scrollProgress.current ?? 0));

    // Sample the cinematic spline path
    posCurve.getPointAt(p, targetPos.current);
    lookAtCurve.getPointAt(p, targetLookAt.current);

    // Subtle natural head movement (breathing camera feel)
    const microSwayX = Math.sin(p * 24) * 0.08;
    const microSwayY = Math.cos(p * 18) * 0.04;
    targetPos.current.x += microSwayX;
    targetPos.current.y += microSwayY;

    // Smooth cinematic damping (no rigid jumps)
    currentPos.current.lerp(targetPos.current, 0.06);
    currentLookAt.current.lerp(targetLookAt.current, 0.06);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
