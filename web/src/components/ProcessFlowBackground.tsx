"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProcessFlowBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-[3rem]">
      {/* Clean White and Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-white" />
      
      {/* Animated SVG Flowing Lines and Nodes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Structured Path 1 - Flowing Line */}
        <motion.path
          d="M-50 180 C 150 180, 250 80, 400 180 S 650 280, 850 180"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />

        {/* Structured Path 2 - Flowing Line */}
        <motion.path
          d="M-50 220 C 100 220, 300 320, 450 220 S 700 120, 850 220"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 8, delay: 1, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />

        {/* Connected Nodes - Symbolizing Approvals/Steps */}
        {[
          { x: 120, y: 180, delay: 0 },
          { x: 280, y: 140, delay: 1.5 },
          { x: 450, y: 220, delay: 3 },
          { x: 620, y: 160, delay: 4.5 },
          { x: 350, y: 280, delay: 0.8 },
        ].map((node, i) => (
          <g key={i}>
            {/* Glowing Connection Point */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#3B82F6"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4, delay: node.delay, repeat: Infinity }}
            />
            {/* Pulsing Outer Ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              stroke="#3B82F6"
              strokeWidth="0.5"
              strokeOpacity="0.2"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.8, 1] }}
              transition={{ duration: 4, delay: node.delay, repeat: Infinity }}
            />
          </g>
        ))}

        {/* Subtle Connection Lines between Nodes */}
        <motion.line 
          x1="120" y1="180" x2="280" y2="140" 
          stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
        />
        <motion.line 
          x1="280" y1="140" x2="450" y2="220" 
          stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line 
          x1="450" y1="220" x2="620" y2="160" 
          stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.1" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
        />
      </svg>

      {/* Modern Soft Blur Orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/30 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-50/40 rounded-full blur-[100px]" />
    </div>
  );
}
