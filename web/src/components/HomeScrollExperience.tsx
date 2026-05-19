"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      {/* Sticky Background Image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Optional overlay for text readability */}
        <img
          src="/homeBG.webp"
          alt="Trek Group Home Background"
          className="w-full h-full object-cover"
        />
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
