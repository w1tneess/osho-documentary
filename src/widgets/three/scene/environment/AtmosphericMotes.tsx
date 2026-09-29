import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityLevel } from '../../../../features/useQualityLevel';
import { sampleScore } from '../../../../entities/chapter/chapters';

interface AtmosphericMotesProps {
  quality: QualityLevel;
  reducedMotion?: boolean;
}

/**
 * Suspended dust.
 *
 * Deliberately restrained. Dust earns its place only when a light source is
 * low and raking — at high sun it is invisible, at night it is noise — so its
 * opacity and size are driven from the score rather than pinned on. One draw
 * call, one buffer, no per-frame allocation.
 */

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AtmosphericMotes({
  quality,
  reducedMotion = false,
}: AtmosphericMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const count = quality === 'high' ? 520 : quality === 'medium' ? 260 : 0;

  const { positions, baseX, baseY, baseZ, phase } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const bx = new Float32Array(count);
    const by = new Float32Array(count);
    const bz = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (pseudoRandom(i * 3 + 1) - 0.5) * 52;
      const y = 0.4 + pseudoRandom(i * 3 + 2) * 11;
      const z = 20 - pseudoRandom(i * 3 + 3) * 740;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      bx[i] = x;
      by[i] = y;
      bz[i] = z;
      ph[i] = pseudoRandom(i * 3 + 4) * Math.PI * 2;
    }
    return { positions: pos, baseX: bx, baseY: by, baseZ: bz, phase: ph };
  }, [count]);

  useFrame(({ camera, clock }) => {
    if (!pointsRef.current || count === 0) return;

    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);
    const density = THREE.MathUtils.lerp(lower.particleDensity, upper.particleDensity, mix);

    // Dust only registers when the light is low and raking. Fade it out as the
    // sun climbs, and let the score's own density curve take over.
    const sunHeight = THREE.MathUtils.lerp(lower.sunElevation, upper.sunElevation, mix);
    const rake = 1 - THREE.MathUtils.clamp((sunHeight - 8) / 42, 0, 1);

    if (materialRef.current) {
      const target = density * rake * 0.5;
      materialRef.current.opacity += (target - materialRef.current.opacity) * 0.06;
      materialRef.current.visible = materialRef.current.opacity > 0.01;
    }

    if (reducedMotion || !materialRef.current?.visible) return;

    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    const t = clock.getElapsedTime();
    const camZ = camera.position.z;

    // Only touch motes near the viewing volume. The rest keep their last
    // position, which is invisible anyway.
    for (let i = 0; i < count; i++) {
      if (Math.abs(baseZ[i] - camZ) > 60) continue;
      const idx = i * 3;
      array[idx] = baseX[i] + Math.sin(t * 0.32 + phase[i]) * 0.32;
      array[idx + 1] = baseY[i] + Math.sin(t * 0.21 + phase[i] * 1.7) * 0.42;
    }
    attr.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={quality === 'high' ? 0.09 : 0.07}
        color="#ffeed6"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        fog={false}
      />
    </points>
  );
}
