"use client";

import { motion } from "framer-motion";
import ProcessTimelineBackground from "./ProcessTimelineBackground";

const steps = [
  {
    number: "01",
    title: "Activity & Structure",
    description: "Choose your business activity and legal structure (LLC, Branch, etc.)."
  },
  {
    number: "02",
    title: "Commercial Registration",
    description: "Submit documents to MOCI and receive your Commercial Registration (CR)."
  },
  {
    number: "03",
    title: "Trade License",
    description: "Apply for your municipal trade license to legally operate in Qatar."
  },
  {
    number: "04",
    title: "Establishment ID",
    description: "Obtain your Establishment ID for labor and immigration services."
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <ProcessTimelineBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-secondary font-black tracking-[0.3em] uppercase text-[10px]"
          >
            How We Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-primary mt-4"
          >
            Simplified <span className="text-secondary italic">Business Formation</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group flex flex-col items-center"
              >
                {/* Step Circle */}
                <div className="mb-8 flex justify-center relative">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white border-2 border-secondary/20 shadow-xl flex items-center justify-center relative z-20 transition-colors group-hover:border-secondary"
                  >
                    <span className="text-xl font-black text-primary group-hover:text-secondary transition-colors">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-secondary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* Content Card (Smaller) */}
                <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[1.5rem] p-5 text-center shadow-xl shadow-gray-200/30 hover:border-secondary/30 transition-all duration-500 group-hover:-translate-y-2 w-full max-w-[280px]">
                  <h3 className="text-sm md:text-base font-black text-primary mb-2 group-hover:text-secondary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-primary/60 text-[10px] md:text-xs leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 lg:hidden">
                    <div className="w-1 h-1 rounded-full bg-secondary/30" />
                    <div className="w-1 h-1 rounded-full bg-secondary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
