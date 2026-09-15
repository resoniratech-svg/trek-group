"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ImageCarousel() {
  const images = [
    "/img1.webp",
    "/img7.webp",
    "/img2.webp",
    "/img8.webp",
    "/img3.webp",
    "/img16.webp",
    "/img9.webp",
    "/img4.webp",
    "/img10.webp",
    "/img5.webp",
    "/img11.webp",
    "/img6.webp",
    "/img12.webp",
    "/img13.webp",
    "/img14.webp",
    "/img15.webp",
  ];
  console.log("Images loaded: " + images.length);

  return (
    <section className="pt-32 pb-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <span className="text-secondary font-black tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">Our Gallery</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          Moments of <span className="text-secondary italic">Excellence</span>
        </h2>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* Main Overflow Container */}
      <div className="relative flex overflow-hidden group/carousel py-8 gap-4">
        
        {/* First Marquee Block */}
        <div className="flex flex-shrink-0 gap-4 animate-marquee group-hover/carousel:[animation-play-state:paused]">
          {images.map((src, index) => {
            const isImg11 = src.includes("img11");
            return (
            <div
              key={`first-${index}`}
              className={`relative flex-shrink-0 h-[300px] ${isImg11 ? 'w-[450px] md:w-[600px]' : ''} rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer transition-all duration-500 ease-out group-hover/carousel:opacity-50 hover:!opacity-100 hover:-translate-y-4 hover:z-20 hover:border-secondary hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)]`}
            >
              <img
                src={src}
                alt={`Trek Group Moment ${index + 1}`}
                className={`h-full ${isImg11 ? 'w-full' : 'w-auto'} object-cover transition-transform duration-500 hover:scale-105`}
                style={{ imageRendering: "auto" }}
              />
              <div className="absolute inset-0 bg-transparent hover:bg-secondary/10 transition-colors duration-300" />
            </div>
          )})} 
        </div>

        {/* Second Marquee Block (Trailing clone for the seamless loop) */}
        <div className="flex flex-shrink-0 gap-4 animate-marquee group-hover/carousel:[animation-play-state:paused]" aria-hidden="true">
          {images.map((src, index) => {
            const isImg11 = src.includes("img11");
            return (
            <div
              key={`second-${index}`}
              className={`relative flex-shrink-0 h-[300px] ${isImg11 ? 'w-[450px] md:w-[600px]' : ''} rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer transition-all duration-500 ease-out group-hover/carousel:opacity-50 hover:!opacity-100 hover:-translate-y-4 hover:z-20 hover:border-secondary hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)]`}
            >
              <img
                src={src}
                alt={`Trek Group Moment clone ${index + 1}`}
                className={`h-full ${isImg11 ? 'w-full' : 'w-auto'} object-cover transition-transform duration-500 hover:scale-105`}
                style={{ imageRendering: "auto" }}
              />
              <div className="absolute inset-0 bg-transparent hover:bg-secondary/10 transition-colors duration-300" />
            </div>
          )})} 
        </div>

      </div>
    </section>
  );
}
