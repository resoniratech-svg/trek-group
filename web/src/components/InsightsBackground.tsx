"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InsightsBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Subtle Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-secondary/5" />
      
      {/* Flowing Connecting Lines (Horizontal) */}
      <svg className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 opacity-[0.15]" viewBox="0 0 1440 256" preserveAspectRatio="none">
        <motion.path
          d="M 0 128 Q 180 64 360 128 T 720 128 T 1080 128 T 1440 128"
          stroke="#3B82F6"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path
          d="M 0 160 Q 180 96 360 160 T 720 160 T 1080 160 T 1440 160"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>

      {/* Glowing Nodes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-secondary/5 rounded-full blur-3xl"
            initial={{ 
              x: `${(i * 16) + 5}%`, 
              y: `${45 + Math.sin(i) * 15}%` 
            }}
            animate={{ 
              y: [`${45 + Math.sin(i) * 15}%`, `${55 + Math.sin(i) * 15}%`, `${45 + Math.sin(i) * 15}%`]
            }}
            transition={{ 
              duration: 8 + i, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#2D1B69 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
