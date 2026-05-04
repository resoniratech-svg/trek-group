"use client";

import { motion } from "framer-motion";
import {
  Building2,
  UserCheck,
  FileCheck,
  Palette,
  Globe,
  Code2,
  LucideIcon
} from "lucide-react";
import ServicesBackground from "./ServicesBackground";
import Link from "next/link";

interface ServiceCard {
  title: string;
  icon: LucideIcon;
  x: number;
  y: number;
  delay: number;
  id: string;
}

const services: ServiceCard[] = [
  { title: "Company Formation", icon: Building2, x: -400, y: -250, delay: 0.1, id: "company-formation" },
  { title: "PRO Service", icon: UserCheck, x: 400, y: -250, delay: 0.2, id: "pro-service" },
  { title: "Translation and Attestation", icon: FileCheck, x: -480, y: 0, delay: 0.3, id: "translation-and-attestation" },
  { title: "Branding Services", icon: Palette, x: 480, y: 0, delay: 0.4, id: "branding-services" },
  { title: "International Business Events", icon: Globe, x: -300, y: 250, delay: 0.5, id: "international-business-events" },
  { title: "Software Services", icon: Code2, x: 300, y: 250, delay: 0.6, id: "software-services" },
];

export default function InteractiveServices() {
  return (
    <section className="py-24 bg-white overflow-hidden relative min-h-[1100px] flex flex-col items-center justify-center">
      {/* Background with Grid */}
      <ServicesBackground />

      <div className="container mx-auto px-6 relative z-10 text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block"
        >
          Comprehensive Solutions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-primary leading-tight"
        >
          Our <span className="text-secondary italic">End-to-End</span> Services
        </motion.h2>
      </div>

      <div className="relative w-full max-w-[1400px] h-[800px] flex items-center justify-center">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {services.map((service, i) => (
            <motion.path
              key={`line-${i}`}
              d={`M 700 400 L ${700 + service.x} ${400 + service.y}`}
              stroke="rgba(212,175,55,0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: service.delay }}
            />
          ))}
        </svg>

        {/* Central Figure */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-20 w-80 h-80 md:w-[500px] md:h-[500px]"
        >
          <div className="absolute inset-0 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
          <img
            src="/expert_businessman_multi_arms_1777724379082.png"
            alt="Trek Group Expert"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        {/* Floating Service Cards */}
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: 0, y: 0 }}
            whileInView={{
              opacity: 1,
              x: service.x,
              y: service.y
            }}
            transition={{
              duration: 1,
              delay: service.delay,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ scale: 1.1, y: service.y - 10 }}
            className="absolute z-30 group"
          >
            <Link href={`/services?service=${service.id}`} className="block">
              <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-2xl hover:border-secondary/50 transition-all cursor-pointer min-w-[220px]">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <service.icon size={24} />
                </div>
                <div className="text-left">
                  <div className="text-primary font-bold text-sm leading-tight">{service.title}</div>
                  <div className="text-primary/40 text-[10px] uppercase tracking-wider mt-1">Expert Service</div>
                </div>
              </div>
            </Link>

            {/* Floating particle effect for each card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className="absolute -inset-2 bg-secondary/5 rounded-2xl blur-lg -z-10 group-hover:bg-secondary/10"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
