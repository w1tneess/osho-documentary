import { useCallback, useEffect, useRef, useState } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

export interface QualityProfile {
  level: QualityLevel;
  reducedMotion: boolean;
  /** Reduced-motion is a separate axis from quality: it is a preference, not a
   *  capability, and a powerful machine still honours it. */
  saveData: boolean;
}

/**
 * Device capability, measured once.
 *
 * The tiers exist to decide geometry, shadow resolution and particle counts —
 * never to decide whether the documentary is readable. A reader on a low tier
 * gets the same text, the same composition and the same navigation; they get a
 * simpler world behind it.
 *
 * Note that `prefers-reduced-motion` and `saveData` are recorded separately from
 * the tier. The previous version collapsed reduced-motion into "low", which
 * meant asking for calmer animation also silently removed the scene.
 */
export function detectQuality(): QualityProfile {
  const fallback: QualityProfile = {
    level: 'medium',
    reducedMotion: false,
    saveData: false,
  };
  if (typeof window === 'undefined') return fallback;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ??
    false;

  // No WebGL at all: the caller drops the canvas and serves paper.
  let hasWebgl = false;
  try {
    const probe = document.createElement('canvas');
    hasWebgl = !!(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    hasWebgl = false;
  }
  if (!hasWebgl) return { level: 'low', reducedMotion, saveData: true };

  // A software rasteriser will not carry shadows or post-processing, whatever
  // the rest of the machine looks like.
  let softwareRenderer = false;
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    const info = gl?.getExtension('WEBGL_debug_renderer_info');
    if (info && gl) {
      const name = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)).toLowerCase();
      softwareRenderer =
        name.includes('swiftshader') ||
        name.includes('llvmpipe') ||
        name.includes('software') ||
        name.includes('basic render');
    }
  } catch {
    softwareRenderer = true;
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  // Not in the spec, absent on Firefox and older Safari. The default of 4 is
  // deliberately conservative: guessing high would hand a device a tier it
  // cannot sustain, and the cost of guessing high is a stuttering scene.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (softwareRenderer || saveData || cores <= 2 || memory < 3) {
    return { level: 'low', reducedMotion, saveData };
  }

  const pixels = window.innerWidth * window.innerHeight * Math.min(window.devicePixelRatio, 2) ** 2;
  if (memory >= 8 && cores >= 8 && pixels < 4_500_000) {
    return { level: 'high', reducedMotion, saveData };
  }
  if (memory >= 6 && cores >= 6) return { level: 'high', reducedMotion, saveData };
  return { level: 'medium', reducedMotion, saveData };
}

export function useQualityLevel(): QualityProfile {
  const [profile] = useState<QualityProfile>(detectQuality);
  return profile;
}

/**
 * The ambient soundscape.
 *
 * Optional, off by default, and only ever started by an explicit press — a
 * documentary that makes noise at a reader who did not ask for it is a
 * documentary that has decided the reader is an audience rather than a reader.
 *
 * The tone is a single sustained drone built from two detuned oscillators and a
 * slow filter sweep, so it needs no asset and cannot fail to load. It ducks to
 * silence on `visibilitychange`.
 */
export function useSoundscape() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);

    const nodes = nodesRef.current;
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
    }, 500);

    nodesRef.current = [];
    gainRef.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (ctxRef.current) return;

    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;

    // A gentle low-pass keeps the drone from ever becoming a tone the reader has
    // to sit through.
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    filter.Q.value = 0.7;

    master.connect(filter);
    filter.connect(ctx.destination);

    // Two detuned sines a fifth apart, plus a slow tremolo on the filter.
    const freqs = [55, 82.4, 110.3];
    for (let i = 0; i < freqs.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freqs[i];
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.18;
      osc.connect(g);
      g.connect(master);
      osc.start();

      // Each partial drifts slowly, so the drone never sits perfectly still.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.03 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.4 + i * 0.6;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      nodesRef.current.push(osc, lfo);
    }

    const sweep = ctx.createOscillator();
    sweep.frequency.value = 0.021;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 120;
    sweep.connect(sweepGain);
    sweepGain.connect(filter.frequency);
    sweep.start();
    nodesRef.current.push(sweep);

    ctxRef.current = ctx;
    gainRef.current = master;
    setPlaying(true);

    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2.2);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  // Never keep making noise in a background tab.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [stop]);

  return { playing, toggle, stop };
}
