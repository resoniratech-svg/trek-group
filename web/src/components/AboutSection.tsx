"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-transparent overflow-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Image with Glass Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-gray-100 group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                alt="Trek Group Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Glassmorphism Experience Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-secondary/30 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-20 border border-white/50 group hover:bg-secondary/60 transition-all duration-500"
            >
              <div className="text-white font-black text-4xl mb-1 drop-shadow-md">15</div>
              <div className="text-white/90 text-[10px] font-black uppercase tracking-[0.2em] leading-tight max-w-[100px]">
                Years of Experience
              </div>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                <motion.div 
                  animate={{ 
                    x: ['-100%', '200%'],
                    y: ['-100%', '200%']
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-full h-full bg-gradient-to-br from-transparent via-white/30 to-transparent rotate-45"
                />
              </div>
            </motion.div>
            
            {/* Decorative dots */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Side: Content */}
          <div className="py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-black tracking-widest uppercase text-[10px] border border-secondary/20 mb-6">
                About Trek Group
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                Your Strategic Partner for <span className="text-secondary italic underline decoration-secondary/30">Growth</span>
              </h2>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                Trek Group is a leading business consultancy in Qatar, specializing in company formation, PRO services, and document attestation.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-12"
            >
              {[
                "Expert Local Knowledge",
                "Fast Processing",
                "Transparent Pricing",
                "Dedicated Support",
                "360° Business Solutions",
                "Government Liaison"
              ].map((item, index) => (
                <motion.div 
                  key={item} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <svg width="12" height="10" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L4 7.5L11 0.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-bold text-white text-base md:text-lg group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <Link href="/about">
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-10 py-5 rounded-full font-black text-base transition-all hover:bg-secondary transform shadow-2xl shadow-primary/20 flex items-center gap-3 group"
              >
                Learn More About Us
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-2" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
