"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What are the documents required to start a business in Qatar?",
    answer: "Typically, you need the Commercial Name reservation, Articles of Association, ID copies of shareholders, and a lease agreement for office space. Specific licenses may require additional ministry approvals."
  },
  {
    question: "How long does it take to complete the company formation procedure?",
    answer: "The process usually takes between 2 to 4 weeks. However, with Trek Group's fast-track PRO services, we can often expedite approvals and complete registration more quickly."
  },
  {
    question: "What is the minimum price to start a business in Qatar?",
    answer: "Costs vary significantly based on the entity type and sector. A basic LLC setup starts with registration fees and office lease costs. Contact us for a detailed breakdown tailored to your specific business model."
  },
  {
    question: "What are the procedures for registering a company in Qatar?",
    answer: "The procedure involves: 1) Name Reservation, 2) Articles of Association drafting, 3) Commercial Registration (CR), 4) Trade License application, and 5) Labor/Immigration file opening."
  },
  {
    question: "What are the different types of business entities to set up a business in Qatar?",
    answer: "Common entities include Limited Liability Companies (LLC), Branch of a Foreign Company, Representative Offices, and Sole Proprietorships. Each has different ownership and capital requirements."
  },
  {
    question: "How long will it take to design a logo in Qatar?",
    answer: "A professional logo design typically takes 5 to 10 business days, including research, concept development, and revisions to ensure it perfectly represents your brand's identity."
  },
  {
    question: "Why does your company need a logo in Doha, Qatar?",
    answer: "A logo is essential for brand recognition and building trust in the Qatari market. It distinguishes you from competitors and communicates your professionalism to local and international clients."
  },
  {
    question: "What are the main characteristics of an LLC in Qatar?",
    answer: "An LLC must have a minimum of two shareholders and a maximum of 50. It provides limited liability protection, and while many sectors allow 100% foreign ownership, some still require a local partner."
  },
  {
    question: "How can a foreign company or investor start a business in Qatar?",
    answer: "Foreign investors can start a business through the Ministry of Commerce and Industry (MOCI) or via Free Zones like Qatar Financial Centre (QFC) or Manateq, which offer specialized benefits."
  },
  {
    question: "Do I need to register my company in Qatar if I am selling products online?",
    answer: "Yes, any commercial activity in Qatar, including e-commerce, requires a valid Commercial Registration and a specific license for online trading to comply with local regulations."
  },
  {
    question: "Does TREK provide designing and branding services?",
    answer: "Absolutely. TREK offers a full suite of creative services, including logo design, corporate identity development, website design, and marketing collateral to help your business stand out."
  },
  {
    question: "How design agency help you to grow your business in Qatar?",
    answer: "A design agency creates a strong visual presence that builds credibility, improves user engagement, and ensures your brand values are communicated effectively to the Qatari audience."
  },
  {
    question: "Cost of branding services in Qatar",
    answer: "Branding costs depend on the scope, ranging from simple logo design to full corporate identity packages. We offer competitive, value-driven pricing for startups and established enterprises."
  },
  {
    question: "What includes the branding package in Qatar?",
    answer: "Our branding packages typically include logo files, brand guidelines, typography, color palettes, business cards, letterheads, and social media templates."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-bold tracking-widest uppercase text-xs"
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mt-4"
          >
            Everything You Need to <span className="text-secondary italic">Know</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-all hover:bg-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-sm md:text-base font-bold text-white leading-tight pr-4">{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-white/60 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
