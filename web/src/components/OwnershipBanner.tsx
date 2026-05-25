"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award } from "lucide-react";

export default function OwnershipBanner() {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-[2rem] p-6 md:p-10 overflow-hidden shadow-xl"
        >
          {/* Background Decorative Element (Seal) */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
            <div className="relative w-96 h-96 border-[12px] border-primary rounded-full flex items-center justify-center rotate-12">
              <div className="text-center font-black uppercase leading-none text-black">
                <div className="text-4xl">Most</div>
                <div className="text-6xl my-2">Trusted</div>
                <div className="text-4xl">Brand</div>
                <div className="mt-4 flex justify-center gap-2">
                  {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 bg-primary rotate-45" />)}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase border border-secondary/20">
                Investment Opportunities
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
              Business Setup in Qatar with <br />
              <span className="text-secondary italic underline decoration-secondary/30">100% Foreign Ownership</span>
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-0 max-w-3xl">
              We give you <span className="text-white font-bold italic">1000% surety</span> that you can own 100% of your company in Qatar, provided your business is structured under the right legal pathway. Qatar has opened its doors wider than ever for international investors, allowing full foreign ownership across multiple sectors but the process is precise.
            </p>
          </div>

          {/* Mobile version of the seal or just a badge */}
          <div className="mt-8 flex lg:hidden items-center gap-4 text-white/20">
            <Award size={48} />
            <div className="text-sm font-bold uppercase tracking-tighter">
              100% Foreign Ownership <br /> Qatar Business Setup
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
