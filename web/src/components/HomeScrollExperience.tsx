"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomeScrollAnimation from "./HomeScrollAnimation";
import Hero from "./Hero";

export default function HomeScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero content stays visible then fades out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.95]);

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      {/* Sticky Background Animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HomeScrollAnimation progress={scrollYProgress} />
      </div>

      {/* Overlay Content Sections */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Section 1: Hero */}
        <motion.div 
          style={{ 
            opacity: heroOpacity,
            scale: heroScale
          }} 
          className="min-h-screen flex items-center justify-center"
        >
          <Hero />
        </motion.div>
      </div>
    </div>
  );
}
