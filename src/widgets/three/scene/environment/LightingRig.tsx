import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../../../features/useQualityLevel';
import { sampleScore } from '../../../../entities/chapter/chapters';

interface LightingRigProps {
  quality: QualityLevel;
}

const DEG = Math.PI / 180;

/**
 * Three-point rig built around a real key/fill ratio.
 *
 * The previous rig ran a hemisphere light at 0.52–0.65 against a directional at
 * ~1.05–1.35. That ratio — roughly 1:2 — is what "flat" means in lighting: the
 * fill was doing half the work of the key, so nothing modelled, nothing cast a
 * readable shadow, and every surface converged on the same mid tone.
 *
 * The ratio is now 4:1 to 8:1 depending on the chapter. A low, warm key rakes
 * across the valley; a deliberately weak hemisphere keeps the shadow side open
 * without filling it; a cold rim from behind the camera's opposite quarter peels
 * silhouettes off the background. On the collapse chapters the key drops to
 * near-nothing and the rim does most of the work, which is what makes those
 * frames read as closed rather than merely dark.
 */
export function LightingRig({ quality }: LightingRigProps) {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.HemisphereLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const keyTarget = useMemo(() => new THREE.Object3D(), []);
  const rimTarget = useMemo(() => new THREE.Object3D(), []);

  const scratch = useMemo(
    () => ({
      key: new THREE.Color(),
      fillSky: new THREE.Color(),
      fillGround: new THREE.Color(),
      rim: new THREE.Color(),
      a: new THREE.Color(),
      b: new THREE.Color(),
      dir: new THREE.Vector3(),
      rimDir: new THREE.Vector3(),
    }),
    []
  );

  const shadowsOn = quality !== 'low';

  useFrame(({ camera }) => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const s = scratch;

    s.a.set(lower.keyColor).lerp(s.b.set(upper.keyColor), mix);
    s.key.copy(s.a);
    s.a.set(lower.fillSky).lerp(s.b.set(upper.fillSky), mix);
    s.fillSky.copy(s.a);
    s.a.set(lower.fillGround).lerp(s.b.set(upper.fillGround), mix);
    s.fillGround.copy(s.a);
    s.a.set(lower.rimColor).lerp(s.b.set(upper.rimColor), mix);
    s.rim.copy(s.a);

    const keyIntensity = THREE.MathUtils.lerp(lower.keyIntensity, upper.keyIntensity, mix);
    const fillIntensity = THREE.MathUtils.lerp(lower.fillIntensity, upper.fillIntensity, mix);
    const rimIntensity = THREE.MathUtils.lerp(lower.rimIntensity, upper.rimIntensity, mix);

    const az = THREE.MathUtils.lerp(lower.sunAzimuth, upper.sunAzimuth, mix) * DEG;
    const el = THREE.MathUtils.lerp(lower.sunElevation, upper.sunElevation, mix) * DEG;
    s.dir.set(
      Math.sin(az) * Math.cos(el),
      Math.sin(el),
      -Math.cos(az) * Math.cos(el)
    ).normalize();

    // The shadow frustum is anchored to the camera's own Z, not to a hand-tuned
    // linear ramp. Previously the light slid on a fixed `15 - p * 600` curve
    // that drifted out of step with the real camera spline; anchoring to the
    // camera is both simpler and provably correct at every scroll position.
    const focus = camera.position;
    const distance = 70;

    if (keyRef.current) {
      const k = keyRef.current;
      k.color.copy(s.key);
      k.intensity += (keyIntensity - k.intensity) * 0.08;
      k.position.copy(focus).addScaledVector(s.dir, distance);
      keyTarget.position.copy(focus);
      keyTarget.updateMatrixWorld();
      k.target = keyTarget;
    }

    if (rimRef.current) {
      const r = rimRef.current;
      r.color.copy(s.rim);
      r.intensity += (rimIntensity - r.intensity) * 0.08;
      // A rim only works if it is on the FAR side of the subject. In this world
      // the camera always travels and looks toward -Z, so the backlight is
      // placed ahead of the subject in the view direction, offset laterally off
      // the key. Mirroring the key instead — the obvious implementation — puts
      // the light behind the camera, where it is just a second fill and no
      // silhouette is ever separated from the background.
      s.rimDir.set(s.dir.x * 0.45, 0.3, -1).normalize();
      r.position.copy(focus).addScaledVector(s.rimDir, distance);
      rimTarget.position.copy(focus);
      rimTarget.updateMatrixWorld();
      r.target = rimTarget;
    }

    if (fillRef.current) {
      const f = fillRef.current;
      f.color.lerp(s.fillSky, 0.08);
      f.groundColor.lerp(s.fillGround, 0.08);
      f.intensity += (fillIntensity - f.intensity) * 0.08;
    }
  });

  return (
    <>
      <hemisphereLight ref={fillRef} args={['#7e93ad', '#4a3826', 0.42]} />

      <directionalLight
        ref={keyRef}
        position={[40, 30, 40]}
        intensity={2.5}
        castShadow={shadowsOn}
        shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={190}
        shadow-camera-left={-52}
        shadow-camera-right={52}
        shadow-camera-top={52}
        shadow-camera-bottom={-52}
        shadow-bias={-0.0006}
        shadow-normalBias={0.035}
        shadow-radius={quality === 'high' ? 3 : 1.5}
      />

      <directionalLight
        ref={rimRef}
        position={[-40, 16, -40]}
        intensity={0.5}
        castShadow={false}
      />
    </>
  );
}
