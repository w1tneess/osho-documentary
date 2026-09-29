import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  sampleScore,
  CHAPTER_SCENE_CONFIGS,
  type CompositionSide,
} from '../../../../entities/chapter/chapters';

interface ScrollCameraProps {
  reducedMotion?: boolean;
}

/**
 * The camera is the other half of the composition, so it is driven by the same
 * score as everything else rather than by a hand-tuned spline that had drifted
 * out of step with the chapter states.
 *
 * Three jobs:
 *
 * 1. TRAVEL — position and target are sampled from a centripetal Catmull-Rom
 *    curve built directly from the score, so there is no corner at a chapter
 *    boundary and exactly one place where camera geometry is declared.
 *
 * 2. FRAMING — `subjectShift` pans the camera so the 3D subject sits opposite
 *    the editorial column. When the text is on the left the subject is pushed
 *    into the right third. This is the DOM/canvas contract, expressed once.
 *
 * 3. ART DIRECTION BY ASPECT — portrait is not a squeezed desktop frame. The
 *    subject is lifted into the upper third by pitching the camera down, the
 *    lens opens, and the lateral framing collapses. That frees the lower half
 *    of the screen for the reading plate. FOV is sampled per shot and *then*
 *    adjusted; it is not the primary responsive lever.
 */

/** Text left -> subject right, and so on. */
const COMPOSITION_PAN: Record<CompositionSide, number> = {
  left: 1,
  right: -1,
  center: 0,
  lower: 0,
};

/** How far a pan of 1.0 moves the look-at target, in world units. */
const PAN_STRENGTH = 26;

export function ScrollCamera({ reducedMotion = false }: ScrollCameraProps) {
  const currentPos = useRef(new THREE.Vector3(-2.2, 3.1, 12));
  const currentTarget = useRef(new THREE.Vector3(1.4, 2.4, -26));
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const pointerSmooth = useRef(new THREE.Vector2());
  const currentFov = useRef(52);

  const curves = useMemo(() => {
    const posPoints = CHAPTER_SCENE_CONFIGS.map((c) => new THREE.Vector3(...c.cameraPos));
    const lookPoints = CHAPTER_SCENE_CONFIGS.map((c) => new THREE.Vector3(...c.cameraTarget));
    return {
      pos: new THREE.CatmullRomCurve3(posPoints, false, 'centripetal', 0.5),
      look: new THREE.CatmullRomCurve3(lookPoints, false, 'centripetal', 0.5),
    };
  }, []);

  const scratch = useMemo(
    () => ({
      fwd: new THREE.Vector3(),
      right: new THREE.Vector3(),
      worldUp: new THREE.Vector3(0, 1, 0),
      offset: new THREE.Vector3(),
    }),
    []
  );

  useFrame(({ camera, size, pointer }, delta) => {
    const t = Math.max(0, Math.min(1, useAppStore.getState().scrollProgress));
    const { lower, upper, mix } = sampleScore(t);
    const s = scratch;

    curves.pos.getPoint(t, targetPos.current);
    curves.look.getPoint(t, targetLook.current);

    const targetFov = THREE.MathUtils.lerp(lower.fov, upper.fov, mix);
    const targetShift = THREE.MathUtils.lerp(lower.subjectShift, upper.subjectShift, mix);

    // ── Aspect art direction ───────────────────────────────────────────────
    const aspect = size.width / Math.max(1, size.height);
    /** 1 = ultrawide, 0 = tall phone. */
    const wide = THREE.MathUtils.clamp((aspect - 0.5) / 1.4, 0, 1);
    /** 1 = portrait phone, 0 = anything at or above 1.17 aspect. */
    const portrait = 1 - THREE.MathUtils.clamp((aspect - 0.62) / 0.55, 0, 1);

    // View basis for panning.
    s.fwd.subVectors(targetLook.current, targetPos.current);
    if (s.fwd.lengthSq() < 1e-6) s.fwd.set(0, 0, -1);
    s.fwd.normalize();
    s.right.crossVectors(s.fwd, s.worldUp);
    if (s.right.lengthSq() < 1e-6) s.right.set(1, 0, 0);
    s.right.normalize();

    // ── Lateral framing ────────────────────────────────────────────────────
    // Blend the composition side across a boundary so the pan travels instead
    // of snapping when the score crosses from one side to the other.
    const side = THREE.MathUtils.lerp(
      COMPOSITION_PAN[lower.composition],
      COMPOSITION_PAN[upper.composition],
      mix
    );

    // Pan by rotating: moving the look-at target sideways turns the camera the
    // other way, so the subject travels across frame with no terrain slide.
    const pan = targetShift * side * PAN_STRENGTH;
    s.offset.copy(s.right).multiplyScalar(-pan);
    targetLook.current.add(s.offset);

    // ── Portrait re-staging ────────────────────────────────────────────────
    if (portrait > 0.001) {
      // No usable third in a narrow frame: collapse the lateral framing.
      s.offset.copy(s.right).multiplyScalar(pan * portrait);
      targetLook.current.sub(s.offset);
      // Lift the eye and pitch down so the subject rides in the upper third.
      targetPos.current.y += portrait * 1.6;
      targetLook.current.y -= portrait * 2.7;
    }

    // Landscape: give very wide frames a little more air than a 16:9 one.
    const fovAdjust = portrait * 6 - Math.max(0, wide - 0.72) * 5;

    // ── Pointer parallax. Additive garnish, never a mechanic. ──────────────
    if (!reducedMotion) {
      pointerSmooth.current.x += (pointer.x - pointerSmooth.current.x) * 0.045;
      pointerSmooth.current.y += (pointer.y - pointerSmooth.current.y) * 0.045;
      const px = pointerSmooth.current.x * 0.55 * wide;
      const py = pointerSmooth.current.y * 0.3 * wide;

      s.offset.copy(s.right).multiplyScalar(-px);
      targetPos.current.add(s.offset);
      s.offset.copy(s.right).multiplyScalar(-px * 0.4);
      targetLook.current.add(s.offset);
      targetPos.current.y += py;

      // A slow drift so a stationary reader still sees the world breathe.
      targetPos.current.x += Math.sin(t * 21) * 0.06 * wide;
      targetPos.current.y += Math.cos(t * 15) * 0.035;
    }

    // ── Damping ────────────────────────────────────────────────────────────
    // Frame-rate independent: the previous fixed 0.06 lerp settled twice as
    // fast at 120Hz as at 60Hz.
    const d = Math.min(delta, 0.1);
    const kPos = 1 - Math.pow(0.0016, d);
    const kLens = 1 - Math.pow(0.0009, d);

    currentPos.current.lerp(targetPos.current, kPos);
    currentTarget.current.lerp(targetLook.current, kPos);
    currentFov.current += (targetFov + fovAdjust - currentFov.current) * kLens;

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const next = THREE.MathUtils.clamp(currentFov.current, 26, 74);
      if (Math.abs(camera.fov - next) > 0.005) {
        camera.fov = next;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
