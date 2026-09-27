import { useState, useEffect } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

/**
 * Adaptive quality detection.
 * - High: desktop with good GPU
 * - Medium: tablet or less powerful desktop
 * - Low: mobile or reduced-motion preference
 */
export function useQualityLevel(): QualityLevel {
  const [quality, setQuality] = useState<QualityLevel>('medium');

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    // @ts-expect-error — deviceMemory is not in all browsers
    const deviceMemory = navigator.deviceMemory || 4;

    if (reducedMotion || isMobile || deviceMemory < 4 || hardwareConcurrency <= 2) {
      setQuality('low');
    } else if (isTablet || hardwareConcurrency <= 4) {
      setQuality('medium');
    } else {
      setQuality('high');
    }
  }, []);

  return quality;
}
