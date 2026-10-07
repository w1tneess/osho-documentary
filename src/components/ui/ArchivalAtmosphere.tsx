'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ArchivalAtmosphere
 * Generative canvas rendering organic film dust motes and subtle analog light shifts.
 * Evokes historical 35mm film projection and archival preservation vaults.
 */
export function ArchivalAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Seeded particle generation
    const particleCount = Math.min(Math.floor(width / 35), 45);
    interface Mote {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      targetAlpha: number;
      pulseSpeed: number;
    }

    const motes: Mote[] = [];
    for (let i = 0; i < particleCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22 - 0.08, // Subtle upward drift like dust in projection light
        alpha: Math.random() * 0.35 + 0.1,
        targetAlpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let isDark = document.documentElement.classList.contains('dark');
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const baseR = isDark ? 245 : 45;
      const baseG = isDark ? 215 : 35;
      const baseB = isDark ? 180 : 25;

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;

        // Wrap around bounds
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;
        if (m.y < -10) m.y = height + 10;
        if (m.y > height + 10) m.y = -10;

        // Subtle alpha breathing
        m.alpha += (m.targetAlpha - m.alpha) * m.pulseSpeed;
        if (Math.abs(m.alpha - m.targetAlpha) < 0.02) {
          m.targetAlpha = Math.random() * 0.4 + 0.08;
        }

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${m.alpha * 0.45})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-multiply dark:mix-blend-screen"
      aria-hidden="true"
    />
  );
}
