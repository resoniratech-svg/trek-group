"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";

export default function ContactExpert() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Company Formation",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message || "Requested expert consultation.",
          formType: "contact_expert_section",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit request");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Company Formation",
        message: ""
      });
    } catch (err: any) {
      console.error("Consultation request error:", err);
      setSubmitStatus("error");
      setErrorMessage(err.message || "Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {submitStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shadow-inner border border-secondary/20">
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-black text-white">Consultation Requested!</h3>
                  <p className="text-white/70 font-medium max-w-sm mx-auto text-sm md:text-base">
                    Thank you for reaching out. Your setup inquiry has been forwarded to our corporate consultants at <strong>madhusudhant307@gmail.com</strong>.
                  </p>
                  <p className="text-white/50 text-xs md:text-sm">
                    We will review your business plan and get back to you within 2 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="bg-secondary hover:bg-secondary-dark text-white font-black px-8 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name" 
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address" 
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number" 
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white/70 focus:outline-none focus:border-secondary/50 transition-colors appearance-none"
                  >
                    <option className="bg-[#050816]" value="Company Formation">Company Formation</option>
                    <option className="bg-[#050816]" value="PRO Services">PRO Services</option>
                    <option className="bg-[#050816]" value="Attestation">Attestation</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your business plan (optional)" 
                    rows={4}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
                  ></textarea>
                </div>
                
                {submitStatus === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-xs font-semibold text-center"
                  >
                    ❌ {errorMessage}
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 uppercase tracking-widest mt-4 flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Consultation"
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
