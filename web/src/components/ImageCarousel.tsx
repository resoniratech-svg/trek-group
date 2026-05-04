"use client";

import { motion } from "framer-motion";

const images = [
  "/img1.jpeg",
  "/img2.jpeg",
  "/img3.jpeg",
  "/img4.jpeg",
  "/img5.jpeg",
  "/img6.jpeg",
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

      <div className="relative flex overflow-hidden">
        {/* Infinite scrolling container */}
        <motion.div
          className="flex gap-4 py-4 px-2"
          animate={{
            x: [0, -3000], 
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {doubledImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 25px 50px rgba(212,175,55,0.3)",
              }}
              className="relative flex-shrink-0 h-[300px] rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
            >
              <img
                src={src}
                alt={`Trek Group Moment ${index + 1}`}
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
