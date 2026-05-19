"use client";

import { motion } from "framer-motion";
import InsightsBackground from "./InsightsBackground";

const factors = [
  {
    number: "01",
    title: "Investment Reforms",
    description: "Qatar’s progressive investment policies allow up to 100% foreign ownership across key sectors including Information Technology, Healthcare, Tourism, Agriculture, Consulting, and Industrial Services. These reforms create a favorable environment for international entrepreneurs and global investors looking to establish a strong business presence in Qatar without requiring a local sponsor in eligible sectors."
  },
  {
    number: "02",
    title: "Business Legal Structure",
    description: "Selecting the right legal entity is one of the most important decisions when establishing a company in Qatar. Whether forming a Limited Liability Company (LLC), branch office, professional firm, or free zone entity, expert consultation ensures your business structure aligns with your operational goals, ownership requirements, and regulatory compliance standards."
  },
  {
    number: "03",
    title: "Licensing & Commercial Activities",
    description: "Every business activity in Qatar must comply with the Ministry of Commerce and Industry (MOCI) regulations. Choosing the correct commercial activity and securing the appropriate trade license are critical for obtaining approvals and maintaining smooth business operations. Proper licensing ensures your company remains fully compliant with Qatar’s business laws and ownership policies."
  },
  {
    number: "04",
    title: "Commercial Registration (CR) Process",
    description: "Commercial Registration (CR) is the foundation of every legally operating business in Qatar. The process includes trade name reservation, Articles of Association (AOA), office documentation, shareholder agreements, and capital requirement compliance. Professional assistance helps streamline the registration process while avoiding delays and documentation errors."
  },
  {
    number: "05",
    title: "Government & Ministry Approvals",
    description: "Business setup in Qatar often requires approvals from multiple government departments and regulatory authorities. Efficient coordination with ministries and compliance authorities helps businesses avoid operational delays, legal complications, and approval rejections. Our experts ensure every requirement is handled accurately from start to finish."
  },
  {
    number: "06",
    title: "Professional PRO Services",
    description: "Reliable PRO (Public Relations Officer) services play a vital role in managing legal documentation, attestations, visa processing, immigration procedures, labor approvals, and government submissions. End-to-end PRO support ensures faster processing, reduced compliance risks, and seamless communication with all relevant authorities in Qatar."
  }
];

export default function KeySetupFactors() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <InsightsBackground />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              Essential Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black leading-tight mb-6">
              Successful <span className="text-secondary italic">Business Setup</span> Factors
            </h2>
            <p className="text-black/80 font-medium leading-relaxed max-w-4xl mx-auto text-base md:text-lg">
              Setting up a business in Qatar offers exceptional opportunities for foreign investors seeking growth in one of the Middle East’s fastest-growing economies. Understanding the legal framework, licensing procedures, and regulatory requirements is essential for establishing a compliant and successful company. Our experts provide end-to-end guidance to simplify the entire company formation process while helping businesses achieve long-term operational success.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
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
                <div className="mb-8 flex justify-center relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-secondary/20 shadow-xl flex items-center justify-center relative z-20 transition-all group-hover:border-secondary"
                  >
                    <span className="text-xl md:text-2xl font-black text-black group-hover:text-secondary transition-colors">
                      {factor.number}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-secondary/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[1.5rem] p-6 md:p-8 text-center shadow-xl shadow-gray-200/30 hover:border-secondary/30 transition-all duration-500 group-hover:-translate-y-2 w-full h-full flex flex-col justify-start">
                  <h3 className="text-base md:text-lg xl:text-xl font-black text-black mb-4 group-hover:text-secondary transition-colors leading-tight">
                    {factor.title}
                  </h3>
                  <p className="text-black/80 text-sm leading-relaxed font-medium">
                    {factor.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {index < factors.length - 1 && (
                  <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 lg:hidden">
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
