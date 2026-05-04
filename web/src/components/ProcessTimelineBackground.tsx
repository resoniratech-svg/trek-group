"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProcessTimelineBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Subtle Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-gray-50/50" />
      
      {/* Flowing Connecting Lines (Horizontal) */}
      <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-20" viewBox="0 0 1200 128" preserveAspectRatio="none">
        <motion.path
          d="M 0 64 Q 150 32 300 64 T 600 64 T 900 64 T 1200 64"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path
          d="M 0 80 Q 150 48 300 80 T 600 80 T 900 80 T 1200 80"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>

      {/* Glowing Nodes (Abstract Background Decorations) */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 bg-blue-100/20 rounded-full blur-3xl"
            initial={{ 
              x: `${(i * 20) + 10}%`, 
              y: `${40 + Math.sin(i) * 20}%` 
            }}
            animate={{ 
              y: [`${40 + Math.sin(i) * 20}%`, `${60 + Math.sin(i) * 20}%`, `${40 + Math.sin(i) * 20}%`]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#2D1B69 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
    </div>
  );
}
