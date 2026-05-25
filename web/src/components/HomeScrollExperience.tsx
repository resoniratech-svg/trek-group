"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero";

export default function HomeScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hero content stays visible then fades out on desktop
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.95]);

  const opacity = isMobile ? 1 : heroOpacity;
  const scale = isMobile ? 1 : heroScale;

  return (
    <div ref={containerRef} className="relative h-auto lg:h-[150vh]">
      {/* Sticky/Absolute Background Image */}
      <div className="absolute inset-0 lg:sticky lg:top-0 h-full lg:h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Optional overlay for text readability */}
        <img
          src="/homeBG.webp"
          alt="Trek Group Home Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Content Sections */}
      <div className="relative z-10 lg:-mt-[100vh] w-full">
        {/* Section 1: Hero */}
        <motion.div
          style={{
            opacity,
            scale
          }}
          className="min-h-[90vh] lg:min-h-screen flex items-center justify-center"
        >
          <Hero />
        </motion.div>
      </div>
    </div>
  );
}
