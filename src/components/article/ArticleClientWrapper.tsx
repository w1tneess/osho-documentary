'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ReaderControls } from './ReaderControls';

interface ArticleClientWrapperProps {
 slug: string;
 title: string;
 category: string;
 children: React.ReactNode;
}

export function ArticleClientWrapper({
 slug,
 title,
 category,
 children,
}: ArticleClientWrapperProps) {
 // Track scroll progress
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001,
 });

 // Record reading history in localStorage
 useEffect(() => {
 try {
 const historyStr = localStorage.getItem('osho_read_history');
 const readArticles: string[] = historyStr ? JSON.parse(historyStr) : [];
 if (!readArticles.includes(slug)) {
 readArticles.push(slug);
 localStorage.setItem('osho_read_history', JSON.stringify(readArticles));
 }
 } catch {
 // Storage error ignored
 }
 }, [slug]);

 return (
 <>
 {/* Top Fixed Reading Progress Bar */}
 <motion.div
 className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[60]"
 style={{ scaleX }}
 />

 {/* Interactive Reader Controls Toolbar */}
 <ReaderControls articleTitle={title} articleCategory={category} />

 {/* Main Article Prose Content */}
 <div className="article-body font-serif text-lg leading-loose space-y-6 text-neutral-800 dark:text-neutral-200 transition-all duration-200">
 {children}
 </div>
 </>
 );
}
