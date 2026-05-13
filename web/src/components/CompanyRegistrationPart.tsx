"use client";

import { motion } from "framer-motion";
import { Check, XCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CompanyRegistrationPart() {
  const limitationsList = [
    "Open a corporate bank account",
    "Apply for a Qatar trade license",
    "Hire employees or process work visas",
    "Sign commercial contracts",
    "Access government approvals",
    "Legally operate within the Qatar market"
  ];

  const servicesList = [
    "Trade Name Reservation & Approval",
    "Business Activity Classification",
    "Articles of Association (AOA) Drafting & Notarization",
    "Ministry of Commerce and Industry (MOCI) Submission",
    "Qatar Chamber of Commerce Registration",
    "Qatar Trade License Issuance",
    "Establishment ID Processing",
    "Labour & Immigration Approvals",
    "Government Documentation Support",
    "PRO Services & Regulatory Follow-Ups",
    "Ministry Clearances & Compliance Assistance"
  ];

  const expertSupportList = [
    "Fast and transparent registration processes",
    "Reliable government coordination",
    "Accurate legal documentation",
    "Personalized consultation for foreign investors",
    "End-to-end company formation assistance"
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Top Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">
              Professional Support for Smooth and Compliant Business Setup in Qatar
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#050816] leading-tight mb-8 max-w-4xl">
              Our Role in Your Qatar Company Registration
            </h2>
            
            <div className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl space-y-6">
              <p>
                Every successful company formation in Qatar begins with one essential legal requirement — the <strong className="text-gray-900">Commercial Registration (CR)</strong>. This document serves as the official legal identity of your company and confirms that your business is recognized by the Government of Qatar.
              </p>
            </div>
            
            <div className="mt-8 bg-red-50/50 p-8 rounded-3xl border border-red-100 max-w-4xl">
              <h3 className="font-bold text-red-900 mb-4 text-lg">Without a valid Commercial Registration, businesses cannot:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {limitationsList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <XCircle className="text-red-400 shrink-0" size={18} />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl">
              At Trek Group, we provide complete guidance and professional support throughout the Qatar company registration process, ensuring your business setup is handled accurately, efficiently, and in full compliance with local regulations.
            </p>
          </motion.div>

          {/* Complete Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left side: Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <h3 className="text-3xl font-black text-[#050816] mb-4">Complete Qatar Company Registration Services</h3>
              <p className="text-gray-600 text-lg mb-8">
                Our experienced consultants manage every stage of the business formation process, helping foreign investors, entrepreneurs, and companies establish their presence in Qatar with confidence.
              </p>

              <h4 className="text-xl font-bold text-[#050816] mb-6">Our Services Include:</h4>
              <div className="grid grid-cols-1 gap-4 mb-10">
                {servicesList.map((point, i) => (
                  <motion.div 
                    key={point}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-gray-800 font-bold text-sm md:text-base">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side: Image and Expertise */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-10"
            >
              <div className="w-full h-[350px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/qatar_registration.png" 
                  alt="Qatar Business Registration Experts" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Why Professional Guidance Matters */}
              <div className="bg-[#050816] text-white p-10 rounded-[3rem] shadow-xl">
                <h4 className="text-2xl font-black mb-4">Why Professional Guidance Matters</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Qatar’s company formation process involves multiple government departments, legal procedures, and compliance requirements. <span className="text-secondary font-bold">Even a minor error</span> such as incorrect activity classification, incomplete documentation, or missing approvals can delay the entire registration process.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our experts understand the legal framework, regulatory standards, and administrative procedures required for smooth company formation in Qatar. We help businesses avoid delays, reduce risk, and ensure every step is completed correctly from start to finish.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Expert Support & CTA Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 border border-gray-100 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex-1">
              <h3 className="text-3xl font-black text-[#050816] mb-6">Expert Support You Can Trust</h3>
              <p className="text-gray-600 text-lg mb-8">
                With extensive experience in Qatar business setup services, Trek Group delivers:
              </p>
              <ul className="space-y-5 mb-8">
                {expertSupportList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-secondary" size={20} />
                    </div>
                    <span className="text-gray-800 font-bold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl text-center border border-gray-50">
              <h4 className="text-2xl font-black text-[#050816] mb-4">Start Your Business Journey in Qatar</h4>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Whether you are launching a startup, expanding internationally, or establishing a corporate presence in the Middle East, our team is ready to support your complete business setup.
              </p>
              <Link href="/contact" className="inline-block w-full bg-secondary text-white px-8 py-5 rounded-full font-black text-lg hover:bg-secondary-dark transition-colors shadow-lg hover:shadow-secondary/30 hover:-translate-y-1 transform duration-300">
                Contact Our Experts Today
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
