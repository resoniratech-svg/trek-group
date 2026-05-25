"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OpportunitySection() {
  return (
    <section className="py-6 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden group max-w-5xl mx-auto shadow-xl"
        >
          {/* Animated Glow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Left Content */}
            <div className="p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-2 leading-tight">
                Strategic <span className="text-secondary italic">Advantage</span>
              </h2>
              <div className="text-secondary font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
                <div className="w-8 h-[1px] bg-secondary" />
                Your Opportunity
              </div>
              <p className="text-black/80 text-sm md:text-lg leading-relaxed mb-8">
                Qatar offers a high potential paradise for entrepreneurs. We provide the ultimate expertise to help you make the most of it.
              </p>

              <Link href="/contact" className="mb-8">
                <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-full font-black text-base transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl shadow-secondary/20 group/btn">
                  Start Today
                  <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </Link>

              <div className="flex flex-wrap gap-8 md:gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-black">15</div>
                    <div className="text-black/50 text-[10px] font-bold uppercase tracking-widest leading-none">Years Experience</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-black">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-black text-black">1500 +</div>
                    <div className="text-black/50 text-[10px] font-bold uppercase tracking-widest leading-none">Company Setups</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative overflow-hidden group/img min-h-[250px]">
              <motion.img 
                src="/img6.webp" 
                alt="Qatar Business Opportunity" 
                className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent pointer-events-none" />
              
              {/* Inner Glow Border on Hover */}
              <div className="absolute inset-0 border-0 group-hover:border-[4px] border-secondary/20 transition-all duration-300 pointer-events-none" />
              
              {/* Floating Overlay Card */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md border border-gray-100 p-3 rounded-xl hidden md:block shadow-lg"
              >
                <div className="text-black/60 font-bold text-[8px] mb-0.5 uppercase tracking-widest">Growth Potential</div>
                <div className="text-secondary text-base font-black">Unlimited</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
