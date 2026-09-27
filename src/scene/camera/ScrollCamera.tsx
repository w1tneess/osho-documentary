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
 * Directorial Cinematic Camera Rig with Fluid Aspect Adaptation
 * 
 * Implements Master Requirements 9 & 10:
 * "FLUID 3D CAMERA:
 * Camera composition must react to:
 * viewport width, viewport height, aspect ratio, orientation, current beat.
 * For wide screens: allow cinematic lateral compositions.
 * For portrait screens: prioritize vertical depth and subject clarity.
 * For intermediate aspect ratios: smoothly interpolate between these states."
 */
const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // 0. Intro: Wide dawn vista, tree & path framed to the right, calm negative space on left
  { progress: 0.0, pos: [-1.5, 2.6, 14], lookAt: [2.2, 1.6, -20] },
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

  useFrame(({ camera, size }) => {
    const p = Math.max(0, Math.min(1, scrollProgress.current ?? 0));

    // Sample the cinematic spline path
    posCurve.getPointAt(p, targetPos.current);
    lookAtCurve.getPointAt(p, targetLookAt.current);

    // Continuous aspect ratio adaptation:
    // Aspect ratio < 0.6 = narrow phone portrait, ~1.0 = tablet portrait/square, >= 1.6 = wide desktop
    const aspect = size.width / Math.max(1, size.height);
    const aspectWeight = THREE.MathUtils.clamp((aspect - 0.55) / (1.55 - 0.55), 0, 1);

    // 1. Fluid lateral compression: On narrow portrait screens, compress lateral displacement towards center
    // so focal 3D landmarks remain visible and don't collide with text
    const lateralScale = THREE.MathUtils.lerp(0.42, 1.0, aspectWeight);
    targetPos.current.x *= lateralScale;
    targetLookAt.current.x *= lateralScale;

    // 2. Fluid vertical perspective: elevate camera slightly in portrait view for enhanced ground depth
    const elevationLift = THREE.MathUtils.lerp(0.85, 0.0, aspectWeight);
    targetPos.current.y += elevationLift;

    // 3. Fluid FOV adaptation: on portrait screens, expand vertical FOV so horizontal coverage does not pinch
    const baseFov = 45;
    const targetFov = THREE.MathUtils.lerp(58, baseFov, aspectWeight);
    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();
    }

    // Subtle natural head movement (breathing camera feel)
    const microSwayX = Math.sin(p * 24) * 0.06 * aspectWeight;
    const microSwayY = Math.cos(p * 18) * 0.03;
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
