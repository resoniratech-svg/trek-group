"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Loader2 } from "lucide-react";

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/faqs", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-secondary" size={32} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id || index}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white group"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-sm md:text-base font-bold text-white group-hover:text-black transition-colors leading-tight pr-4">
                    {faq.question}
                  </span>
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
                      <div className="p-6 pt-0 text-white/60 group-hover:text-black/70 transition-colors text-sm leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
