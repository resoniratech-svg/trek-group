"use client";

import { motion } from "framer-motion";
import InsightsBackground from "./InsightsBackground";

const factors = [
  {
    number: "01",
    title: "Investment Reforms",
    description: "Qatar permits full ownership in Agriculture, IT, Healthcare, Tourism, and more, eliminating local partner needs."
  },
  {
    number: "02",
    title: "Legal Structure",
    description: "Choosing LLC or professional setups requires expert guidance to navigate the path to 100% foreign ownership."
  },
  {
    number: "03",
    title: "Licensing Framework",
    description: "Your trade activity must match MOCI's eligibility list to qualify for full ownership rights in Qatar."
  },
  {
    number: "04",
    title: "CR Process",
    description: "A compliant Commercial Registration involves Trade Name, AOA, and meeting capital requirements correctly."
  },
  {
    number: "05",
    title: "Ministry Approvals",
    description: "Managing approvals across departments ensures no compliance gaps impact your 100% ownership status."
  },
  {
    number: "06",
    title: "PRO Support",
    description: "End-to-end PRO services ensure every document and attestation is accurate to avoid costly rejections."
  }
];

export default function KeySetupFactors() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <InsightsBackground />

      <div className="max-w-[1800px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              Essential Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight">
              Successful <span className="text-secondary italic">Business Setup</span> Factors
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Main Flowing Line (Desktop) */}
          <div className="absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
            {factors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group flex flex-col items-center"
              >
                {/* Step Circle & Glow */}
                <div className="mb-10 flex justify-center relative">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-secondary/20 shadow-xl flex items-center justify-center relative z-20 transition-all group-hover:border-secondary"
                  >
                    <span className="text-xl md:text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                      {factor.number}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-secondary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[1.5rem] p-5 md:p-6 text-center shadow-xl shadow-gray-200/30 hover:border-secondary/30 transition-all duration-500 group-hover:-translate-y-2 w-full h-full flex flex-col justify-center min-h-[180px]">
                  <h3 className="text-sm md:text-base xl:text-lg font-black text-primary mb-3 group-hover:text-secondary transition-colors leading-tight">
                    {factor.title}
                  </h3>
                  <p className="text-primary/80 text-xs md:text-sm leading-relaxed font-medium">
                    {factor.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {index < factors.length - 1 && (
                  <div className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 xl:hidden">
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
