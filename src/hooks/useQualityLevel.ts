import { useState } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

/**
 * Capability-first quality detection.
 * Adheres to Master Directive:
 * "DEVICE CAPABILITY > DEVICE LABEL.
 * Do not assume: desktop = powerful, mobile = weak.
 * A powerful phone should not unnecessarily receive the lowest-quality scene.
 * An old desktop should not automatically receive maximum quality."
 */
export function detectQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'medium';

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }

  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  // @ts-expect-error — deviceMemory is available in modern Chromium/Blink browsers
  const deviceMemory = navigator.deviceMemory || 4;

  // WebGL GPU capability probe
  let isReliableGpu = true;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'low';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
      if (
        renderer.includes('swiftshader') ||
        renderer.includes('llvmpipe') ||
        renderer.includes('software') ||
        renderer.includes('basic render')
      ) {
        isReliableGpu = false;
      }
    }
  } catch {
    return 'low';
  }

  if (!isReliableGpu || deviceMemory < 3 || hardwareConcurrency <= 2) {
    return 'low';
  }

  // Tier 1: Modern multi-core processors (phones, tablets, and desktops alike)
  if (deviceMemory >= 6 && hardwareConcurrency >= 6) {
    return 'high';
  }

  return 'medium';
}

export function useQualityLevel(): QualityLevel {
  const [quality] = useState<QualityLevel>(() => detectQuality());
  return quality;
}
