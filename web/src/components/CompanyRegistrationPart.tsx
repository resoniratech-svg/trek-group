"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function CompanyRegistrationPart() {
  const points = [
    "Trade name reservation and approval",
    "Activity classification aligned with compliance guidelines",
    "Drafting and notarizing the Articles of Association (AOA)",
    "Submission to the Ministry of Commerce and Industry",
    "Chamber of Commerce enrollment",
    "Issuance of your Qatar trade license",
    "Establishment ID and labour approvals",
    "Immigration and ministry clearances",
    "Full government documentation support in Qatar",
    "Complete movement and follow-up through PRO services"
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Full Width Top Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col mb-16"
          >

            <h2 className="text-4xl md:text-6xl font-black text-[#050816] leading-tight mb-10 max-w-4xl">
              Our part in your Qatar Company Registration
            </h2>
            
            <div className="space-y-8 text-gray-600 text-lg md:text-xl leading-relaxed max-w-full">
              <p>
                Every company registration in Qatar begins with one decisive step: commercial registration. It is the official "birth certificate" of your business and this document proves that your company exists, is legally recognized, and has the authority to operate in the State of Qatar. Without CR, you cannot open a bank account, apply for a trade license, hire employees, secure contracts, or participate in the Qatar market.
              </p>
              <p>
                This is where our role becomes critical. Trek Group ensures your commercial registration (CR) process is completed correctly, cleanly, and without any of the friction. This is just the beginning of your business setup in Qatar.
              </p>
            </div>
          </motion.div>

          {/* Side by Side Bottom Part */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            
            {/* Left side: Points and Expert Note */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl font-black text-[#050816] mb-8 leading-tight">
                Here are some areas that we manage for your Qatar Company Registration Process:
              </h3>

              <div className="grid grid-cols-1 gap-5 mb-10">
                {points.map((point, i) => (
                  <motion.div 
                    key={point}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-[#0EA5E9] flex-shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-gray-700 font-bold text-base md:text-lg">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* Expert Note */}
              <div className="bg-[#f8f9fa] border-l-4 border-secondary p-8 rounded-r-3xl mb-10 mt-auto">
                <p className="text-gray-600 text-base md:text-lg italic leading-relaxed">
                  <span className="font-black text-[#050816] not-italic">Expert Note:</span> A single error, a missing attachment, or the wrong activity classification can halt the entire process, which is why investors prefer to work with Qatar business formation experts who understand the regulatory environment inside out.
                </p>
              </div>

              <Link href="/contact" className="inline-block w-fit border-2 border-[#050816] text-[#050816] hover:bg-[#050816] hover:text-white px-12 py-5 rounded-full font-black text-base uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl active:scale-95 text-center">
                Contact Our Experts
              </Link>
            </motion.div>

            {/* Right side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative min-h-[500px] lg:min-h-full"
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="/images/qatar_registration.png" 
                  alt="Qatar Business Registration Experts" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
