"use client";

import React from "react";
import { motion } from "framer-motion";

export default function JourneyFlowBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      {/* Calm pastel gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30" />
      
      {/* Animated Gradient Waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0 200 Q 200 150 400 200 T 800 200 V 400 H 0 Z"
          fill="url(#waveGradient)"
          animate={{
            d: [
              "M0 200 Q 200 150 400 200 T 800 200 V 400 H 0 Z",
              "M0 200 Q 200 250 400 200 T 800 200 V 400 H 0 Z",
              "M0 200 Q 200 150 400 200 T 800 200 V 400 H 0 Z",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0 250 Q 200 200 400 250 T 800 250 V 400 H 0 Z"
          fill="url(#waveGradient)"
          opacity="0.5"
          animate={{
            d: [
              "M0 250 Q 200 300 400 250 T 800 250 V 400 H 0 Z",
              "M0 250 Q 200 200 400 250 T 800 250 V 400 H 0 Z",
              "M0 250 Q 200 300 400 250 T 800 250 V 400 H 0 Z",
            ]
          }}
          transition={{ duration: 12, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Light Particles forming a guiding path forward */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/20 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
            initial={{ 
              x: `${(i * 10) + 10}%`, 
              y: `${50 + Math.sin(i) * 20}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
              x: [`${(i * 10) + 10}%`, `${(i * 10) + 15}%`],
            }}
            transition={{ 
              duration: 4, 
              delay: i * 0.3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Subtle Gold Accents (Glows) */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-100/20 rounded-full blur-[80px]" />

      {/* Particle Path Line */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400" preserveAspectRatio="none">
        <motion.path
          d="M 50 200 Q 200 180 400 220 T 750 200"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeDasharray="5,10"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
