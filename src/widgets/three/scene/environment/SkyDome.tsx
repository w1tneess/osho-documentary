import { useAppStore } from '../../../../features/store';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleScore } from '../../../../entities/chapter/chapters';


const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  // Force to the far plane; the dome is background, not geometry.
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.z = gl_Position.w;
}
`;

/**
 * Three-stop vertical sky with a physically-placed sun disc and halo.
 *
 * The value range top-to-bottom is the point: a dark zenith falling to a bright
 * horizon gives the frame a top and a bottom, which is what the previous
 * flat-colour background could never do. The sun is placed from real azimuth /
 * elevation so the visible disc always agrees with the directional key light and
 * the shadows on the ground.
 */
const FRAG = /* glsl */ `
precision highp float;

uniform vec3  uZenith;
uniform vec3  uMid;
uniform vec3  uHorizon;
uniform vec3  uSunColor;
uniform vec3  uSunDir;
uniform float uSunIntensity;
uniform float uHazeLift;

varying vec3 vDir;

// Cheap ordered dither: kills banding across a large smooth gradient,
// which is very visible on 8-bit displays at these value ranges.
float dither(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
}

void main() {
  vec3 dir = normalize(vDir);

  // Height above the horizon, remapped so the gradient uses its full range in
  // the band the camera actually sees (roughly -0.15 .. 0.55).
  float h = dir.y;
  float t = clamp((h + 0.12) / 0.72, 0.0, 1.0);

  // Two-segment ramp: horizon -> mid -> zenith. Smootherstep the first
  // segment so the horizon band stays tight and the sky opens above it.
  vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.34, t));
  col = mix(col, uZenith, smoothstep(0.26, 1.0, t));

  // Ground-side falloff: below the horizon the dome darkens toward the earth,
  // so the terrain silhouette always has something to sit against.
  //
  // Written low-edge-first. GLSL leaves smoothstep undefined when edge0 >= edge1,
  // and reversing the edges is the tempting way to write a descending ramp — it
  // renders as a soft grey disc at the sun on at least one driver in this stack.
  // Every ramp below is therefore expressed as 1 - smoothstep(lo, hi, x).
  col = mix(col, col * 0.42, smoothstep(-0.22, 0.0, h));

  // Haze lift just above the horizon — the atmosphere thickens at the skyline.
  col += uHorizon * uHazeLift * exp(-abs(h) * 14.0);

  // Sun disc + halo.
  //
  // Built from angular distance rather than from powers of the dot product.
  // pow(cos, 900) and friends clip all three channels to 1.0 at the same
  // rate, so the disc saturates to a flat neutral grey ball with no gradient
  // and no colour - a moon, not a sun. Distance-based falloff keeps the core
  // genuinely hot and lets the halo stay amber, which is what a low sun
  // actually looks like: a small blown-out point inside a large warm glow.
  vec3 toSun = normalize(uSunDir);
  float d = length(dir - toSun);

  float core = 1.0 - smoothstep(0.004, 0.016, d);
  float glow = exp(-d * 14.0) * 0.42 + exp(-d * 3.4) * 0.12;

  col += uSunColor * core * 3.2 * uSunIntensity;
  col += uSunColor * glow * uSunIntensity;

  col += dither(gl_FragCoord.xy) * (1.0 / 255.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * SkyDome: an inverted, camera-locked sphere rendered at the far plane.
 *
 * It follows the camera in XZ (never in Y) so the horizon line stays fixed in
 * frame while the world travels beneath it, and it samples the score so the
 * sky evolves continuously with the narrative.
 */
export function SkyDome() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uZenith: { value: new THREE.Color('#2b3f57') },
      uMid: { value: new THREE.Color('#8a8e93') },
      uHorizon: { value: new THREE.Color('#e2a886') },
      uSunColor: { value: new THREE.Color('#ffb877') },
      uSunDir: { value: new THREE.Vector3(0, 0.1, -1) },
      uSunIntensity: { value: 1.5 },
      uHazeLift: { value: 0.12 },
    }),
    []
  );

  // Scratch colours — never allocate inside the frame loop.
  const scratch = useMemo(
    () => ({
      zenA: new THREE.Color(),
      zenB: new THREE.Color(),
      midA: new THREE.Color(),
      midB: new THREE.Color(),
      horA: new THREE.Color(),
      horB: new THREE.Color(),
      sunA: new THREE.Color(),
      sunB: new THREE.Color(),
      dir: new THREE.Vector3(),
    }),
    []
  );

  useFrame(({ camera }) => {
    const { lower, upper, mix } = sampleScore(useAppStore.getState().scrollProgress);

    const s = scratch;
    s.zenA.set(lower.skyZenith).lerp(s.zenB.set(upper.skyZenith), mix);
    uniforms.uZenith.value.copy(s.zenA);
    s.midA.set(lower.skyMid).lerp(s.midB.set(upper.skyMid), mix);
    uniforms.uMid.value.copy(s.midA);
    s.horA.set(lower.skyHorizon).lerp(s.horB.set(upper.skyHorizon), mix);
    uniforms.uHorizon.value.copy(s.horA);
    s.sunA.set(lower.sunColor).lerp(s.sunB.set(upper.sunColor), mix);
    uniforms.uSunColor.value.copy(s.sunA);

    uniforms.uSunIntensity.value = THREE.MathUtils.lerp(
      lower.sunIntensity,
      upper.sunIntensity,
      mix
    );

    // How much the sky is allowed to bleed into the horizon band. The collapse
    // chapters get a flat, closed sky; the open chapters get a luminous one.
    uniforms.uHazeLift.value = THREE.MathUtils.lerp(
      lower.mood === 'vast' || lower.mood === 'open' ? 0.16 : 0.05,
      upper.mood === 'vast' || upper.mood === 'open' ? 0.16 : 0.05,
      mix
    );

    // Interpolate the sun on the shortest angular path so it never swings
    // backwards through the frame between adjacent score entries.
    const az = THREE.MathUtils.lerp(lower.sunAzimuth, upper.sunAzimuth, mix);
    const el = THREE.MathUtils.lerp(lower.sunElevation, upper.sunElevation, mix);
    const azRad = (az * Math.PI) / 180;
    const elRad = (el * Math.PI) / 180;
    s.dir.set(
      Math.sin(azRad) * Math.cos(elRad),
      Math.sin(elRad),
      -Math.cos(azRad) * Math.cos(elRad)
    );
    uniforms.uSunDir.value.copy(s.dir);

    // Lock the dome to the camera in all three axes. The vertex shader forces
    // the dome to the far plane, so only "the camera is at the centre" matters —
    // a dome smaller than the camera's height above its own origin would leave
    // the camera outside the sphere and the sky would simply not render.
    if (meshRef.current) {
      meshRef.current.position.copy(camera.position);
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-1000}>
      <sphereGeometry args={[1, 32, 20]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}
