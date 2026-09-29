import { useAppStore } from '../../../../features/store';
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleScore } from '../../../../entities/chapter/chapters';

/**
 * Aerial perspective.
 *
 * Exponential-squared, and the choice of distribution is doing real work here
 * rather than being a default. This is a 800-unit valley with a subject roughly
 * every 100 units, and the frame has to read as one place rather than as a
 * diorama of every chapter at once.
 *
 * With `f = 1 - exp(-(d·k)²)`:
 *   d·k = 0.4  ->  15%   the current chapter's subject, 20–50 units out
 *   d·k = 0.9  ->  55%   the middle distance
 *   d·k = 1.3  ->  82%   the next chapter's subject, 120–180 units out
 *   d·k = 2.0  ->  98%   the far ridges
 *
 * So one number per chapter sets both the atmosphere and the depth gate, and
 * the near world stays crisp while the rest of the world recedes — which is
 * what a linear near/far pair could not do at any setting.
 */
export function Atmosphere() {
  const scratch = useMemo(
    () => ({ a: new THREE.Color(), b: new THREE.Color(), out: new THREE.Color() }),
    []
  );

  const fog = useMemo(() => new THREE.FogExp2('#b9ac9a', 0.0072), []);

  useFrame(({ scene }) => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);

    scratch.a.set(lower.fogColor);
    scratch.b.set(upper.fogColor);
    scratch.out.lerpColors(scratch.a, scratch.b, mix);

    fog.color.lerp(scratch.out, 0.1);
    fog.density += (THREE.MathUtils.lerp(lower.fogDensity, upper.fogDensity, mix) - fog.density) * 0.1;

    scene.fog = fog;
    // The dome owns the background. Anything assigned here would flatten it.
    scene.background = null;
  });

  return null;
}
