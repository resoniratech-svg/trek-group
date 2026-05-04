"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ContactExpert() {
  return (
    <section id="contact-expert" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="w-20 h-1.5 bg-secondary mb-8 rounded-full" />
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
              Talk to a <span className="text-secondary italic">Business Setup</span> Expert
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Share a few details and our Qatar business consultants will guide you through company formation, ownership options, licensing, and costs.
            </p>

            <div className="space-y-5">
              {[
                "Free Initial Consultation",
                "100% Confidential",
                "Response within 2 Hours",
                "Avoid Costly Mistakes",
                "All Your Questions, Answered"
              ].map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <span className="text-white font-bold text-lg md:text-xl">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative"
          >
            {/* Soft Glow behind form */}
            <div className="absolute -inset-4 bg-secondary/5 blur-3xl -z-10 rounded-[3rem]" />
            
            <h3 className="text-2xl font-black text-white mb-8">Get a Quote</h3>
            
            <form className="space-y-5">
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <select className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white/70 focus:outline-none focus:border-secondary/50 transition-colors appearance-none">
                  <option className="bg-[#050816]">Select Service</option>
                  <option className="bg-[#050816]">Company Formation</option>
                  <option className="bg-[#050816]">PRO Services</option>
                  <option className="bg-[#050816]">Attestation</option>
                </select>
              </div>
              <div className="space-y-1">
                <textarea 
                  placeholder="Briefly describe your business plan (optional)" 
                  rows={4}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
                ></textarea>
              </div>
              
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 uppercase tracking-widest mt-4">
                Request Consultation
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
