"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicesBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#2D1B69 1px, transparent 1px), linear-gradient(90deg, #2D1B69 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Blueprint Style Blueprint Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#2D1B69" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="#2D1B69" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#2D1B69" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint)" />
      </svg>

      {/* Barely Visible Abstract Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] border border-blue-100/20 rounded-[100px] rotate-12"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] border border-blue-50/30 rounded-full"
        />
      </div>

      {/* Clean Light Blue Glows */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-gray-50/80 to-transparent" />
    </div>
  );
}
