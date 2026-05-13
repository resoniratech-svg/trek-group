"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

export default function Hero() {
  return (
    <div className="relative w-full pt-44 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/80 backdrop-blur-md border border-secondary/30 rounded-full px-5 py-2 mb-8 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
              Premier Business Solutions in Qatar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black !text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl"
          >
            Build Your <span className="text-secondary italic">Future</span> in Qatar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base lg:text-lg !text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-bold drop-shadow-xl"
          >
            We provide seamless company formation, PRO services, and legal solutions tailored to your business goals.
            Experience the trek to success with Qatar's most trusted partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-secondary-light via-secondary to-secondary-dark text-black px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl shadow-secondary/40 group border border-white/20">
                Launch Your Business
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full bg-white/10 hover:bg-white/20 !text-white px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 border border-white/20 backdrop-blur-md group">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center !text-white group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-md">
                  <Play size={16} fill="currentColor" className="ml-1" />
                </div>
                View Our Story
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
