"use client";

import { motion } from "framer-motion";

const images = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp",
  "/img5.webp",
  "/img6.webp",
];

export default function ImageCarousel() {
  // Double the images array to create a seamless infinite scroll
  const doubledImages = [...images, ...images];

  return (
    <section className="pt-32 pb-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <span className="text-secondary font-black tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">Our Gallery</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          Moments of <span className="text-secondary italic">Excellence</span>
        </h2>
      </div>

      <style>{`
        @keyframes scrollCarousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.5rem)); }
        }
        .animate-carousel {
          animation: scrollCarousel 30s linear infinite;
          width: max-content;
        }
      `}</style>

      <div className="relative flex overflow-hidden group/carousel py-8">
        {/* Infinite scrolling container using CSS to allow pause on hover */}
        <div className="flex gap-4 px-2 animate-carousel hover:[animation-play-state:paused]">
          {doubledImages.map((src, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer transition-all duration-500 ease-out 
              group-hover/carousel:opacity-50
              hover:!opacity-100 hover:-translate-y-4 hover:z-20 hover:border-secondary hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)]"
            >
              <img
                src={src}
                alt={`Trek Group Moment ${index + 1}`}
                className="h-full w-auto object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ imageRendering: "auto" }}
              />
              {/* Subtle Gold Glow Overlay on Hover */}
              <div className="absolute inset-0 bg-transparent hover:bg-secondary/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
