"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateGlobeBackground from "@/components/CorporateGlobeBackground";
import FAQ from "@/components/FAQ";
import { motion } from "framer-motion";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#050816] relative overflow-x-hidden">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CorporateGlobeBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Animated Hero Header */}
        <section className="pt-40 pb-10 text-center container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs mb-6 block">Support Center</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              Find Your <span className="text-secondary italic underline decoration-secondary/30">Answers</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about setting up and growing your business in Qatar, all in one place.
            </p>
          </motion.div>
        </section>

        <div className="pb-24">
          <FAQ />
        </div>
        <Footer />
      </div>
    </main>
  );
}
