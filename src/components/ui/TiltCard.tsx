'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
 children: React.ReactNode;
 className?: string;
 maxTilt?: number;
 perspective?: number;
 glareOpacity?: number;
}

export function TiltCard({
 children,
 className = '',
 maxTilt = 8,
 perspective = 1000,
 glareOpacity = 0.15,
}: TiltCardProps) {
 const cardRef = useRef<HTMLDivElement>(null);
 const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

 // Spring physics for buttery-smooth Apple-grade motion
 const springConfig = { stiffness: 260, damping: 20 };
 const rotateX = useSpring(0, springConfig);
 const rotateY = useSpring(0, springConfig);
 const scale = useSpring(1, springConfig);

 const handleMouseMove = useCallback(
 (e: React.MouseEvent<HTMLDivElement>) => {
 if (!cardRef.current) return;
 const rect = cardRef.current.getBoundingClientRect();
 const x = e.clientX - rect.left;
 const y = e.clientY - rect.top;

 const centerX = rect.width / 2;
 const centerY = rect.height / 2;

 const tiltX = ((y - centerY) / centerY) * -maxTilt;
 const tiltY = ((x - centerX) / centerX) * maxTilt;

 rotateX.set(tiltX);
 rotateY.set(tiltY);
 scale.set(1.02);

 const glareX = (x / rect.width) * 100;
 const glareY = (y / rect.height) * 100;
 setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity });
 },
 [maxTilt, glareOpacity, rotateX, rotateY, scale],
 );

 const handleMouseLeave = useCallback(() => {
 rotateX.set(0);
 rotateY.set(0);
 scale.set(1);
 setGlarePos((prev) => ({ ...prev, opacity: 0 }));
 }, [rotateX, rotateY, scale]);

 return (
 <motion.div
 ref={cardRef}
 onMouseMove={handleMouseMove}
 onMouseLeave={handleMouseLeave}
 style={{
 perspective: `${perspective}px`,
 rotateX,
 rotateY,
 scale,
 transformStyle: 'preserve-3d',
 }}
 className={`relative will-change-transform ${className}`}
 >
 {children}

 {/* Dynamic Specular Glare Overlay */}
 <div
 className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out"
 style={{
 opacity: glarePos.opacity,
 background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`,
 }}
 />
 </motion.div>
 );
}
