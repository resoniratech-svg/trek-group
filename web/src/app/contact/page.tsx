"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Section 1: Let's Start your Business */}
      {/* Section 1: Let's Start your Business */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <div className="flex items-center justify-center">
              <div className="max-w-xl w-full">
                <div className="text-secondary text-sm font-bold tracking-widest uppercase mb-4">• • • •</div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-6 leading-tight">
                  Let&apos;s Start Your <br />
                  Business Journey <br />
                  in <span className="text-[#0EA5E9]">Qatar</span>
                </h2>
                <div className="text-gray-600 leading-relaxed font-medium space-y-4 text-sm md:text-base">
                  <p>
                    If you&apos;re planning to establish a company in Qatar, you&apos;re already taking the first step toward expanding into one of the Middle East&apos;s fastest-growing business destinations. Qatar offers a strong economy, investor-friendly regulations, strategic global connectivity, and excellent opportunities for entrepreneurs, startups, and international companies.
                  </p>
                  <p>
                    We specialize in professional business setup and company formation services in Qatar, helping entrepreneurs and foreign investors navigate every stage of the registration process with confidence. From company incorporation and commercial registration to licensing, PRO services, document attestation, and government approvals, our experts provide complete end-to-end support tailored to your business goals.
                  </p>
                  <p>
                    Our mission is simple — to make your business setup process smooth, compliant, and hassle-free, so you can focus on building, managing, and growing your business successfully in Qatar.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[350px] lg:min-h-full bg-gray-100">
              <img
                src="/qatar_office.webp"
                alt="Handshake"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/mission_image.png'; // Fallback
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What You Should Know */}
      <section className="bg-[#F8FAFC] py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[350px] lg:min-h-full bg-gray-200 order-2 lg:order-1">
              <img
                src="/qatar_visionary.webp"
                alt="Phone Communication"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center order-1 lg:order-2 lg:pl-12">
              <div className="max-w-xl w-full">
                <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] mb-6 leading-tight">
                  What You Should <br className="hidden md:block" />
                  Know Before We <br className="hidden md:block" />
                  Talk
                </h2>
                <div className="w-16 h-1 bg-[#F97316] mb-6" />

                <p className="text-gray-600 leading-relaxed font-medium mb-8 text-sm md:text-base">
                  Starting a business in Qatar is a strategic investment opportunity, but success depends on making informed decisions from the very beginning. Understanding the legal processes, timelines, documentation requirements, and compliance standards can help you avoid unnecessary delays and costly mistakes.
                </p>

                <ul className="space-y-6">
                  {[
                    {
                      title: "Business Setup Requires Strategic Planning",
                      desc: "Company formation in Qatar involves multiple stages including approvals, documentation, licensing, and regulatory procedures. Patience, proper planning, and expert guidance are essential for ensuring a smooth and successful setup process."
                    },
                    {
                      title: "Choosing the Right Business Structure Matters",
                      desc: "Selecting the correct legal structure for your business is one of the most important decisions you will make. Whether it’s an LLC, branch office, professional entity, or free zone company, the right setup today can save significant legal, operational, and financial challenges in the future."
                    },
                    {
                      title: "Timelines Depend on Documentation & Approvals",
                      desc: "The speed of business registration in Qatar largely depends on the accuracy and readiness of your documents, ministry approvals, and compliance clearances. Well-prepared documentation helps accelerate the registration process and reduces approval delays."
                    },
                    {
                      title: "Ask the Right Questions Before You Begin",
                      desc: "Understanding licensing requirements, ownership regulations, office requirements, and operational costs is essential before starting your business journey. Asking informed questions helps you make confident business decisions and avoid future complications."
                    },
                    {
                      title: "Expert Guidance Prevents Costly Mistakes",
                      desc: "Professional business setup consultants help streamline the process, ensure regulatory compliance, and minimize risks associated with documentation errors or incorrect business structuring. Clear guidance from experienced experts is always more cost-effective than resolving avoidable mistakes later."
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="text-[#0EA5E9] shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="text-[#0A2540] font-black text-sm md:text-base mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact Form */}
      <section id="contact-form-section" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A2540] mb-8 leading-tight tracking-tight">
                Feel free to <br className="hidden lg:block" /> <span className="text-[#0EA5E9]">get in touch</span> or visit our location.
              </h2>
              <div className="w-16 h-1.5 bg-[#0EA5E9] rounded-full hidden lg:block" />
            </div>

            <div className="bg-transparent mt-8 lg:mt-0 w-full">
              {submitStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border-2 border-emerald-100 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black text-[#0A2540]">Message Sent!</h3>
                    <p className="text-gray-500 font-medium max-w-md mx-auto text-sm md:text-base">
                      Thank you for getting in touch. Your message and details have been successfully received and forwarded to our team at <strong>madhusudhant307@gmail.com</strong>.
                    </p>
                    <p className="text-gray-400 font-medium text-xs md:text-sm">
                      We will review your inquiry and get back to you shortly.
                    </p>
                    {previewUrl && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm font-semibold max-w-md mx-auto">
                        💡 <strong>[Test Mode] Live email was simulated!</strong><br />
                        Since SMTP credentials are not set on your machine, you can preview the sent mail layout here:<br />
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline font-bold mt-2 inline-block">
                          Open Simulated Email Preview ↗
                        </a>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setSubmitStatus("idle")}
                    className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-8 py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#0EA5E9]/20"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  className="space-y-8 md:space-y-10 w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setErrorMessage("");
                    
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const name = formData.get("name") as string;
                    const email = formData.get("email") as string;
                    const phone = formData.get("phone") as string;
                    const location = formData.get("location") as string;
                    const message = formData.get("message") as string;

                    try {
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name,
                          email,
                          phone,
                          location,
                          message,
                          formType: "contact_page",
                        }),
                      });

                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Failed to submit message");
                      }

                      const responseData = await response.json();
                      if (responseData.previewUrl) {
                        setPreviewUrl(responseData.previewUrl);
                      } else {
                        setPreviewUrl(null);
                      }
                      setSubmitStatus("success");
                      form.reset();
                    } catch (error: any) {
                      console.error("Submission error:", error);
                      setSubmitStatus("error");
                      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
                    <div className="space-y-2 border-2 border-gray-100 rounded-2xl p-4 md:p-5 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md focus-within:border-[#0EA5E9] focus-within:shadow-lg focus-within:-translate-y-1 group/field">
                      <label className="text-sm md:text-base font-bold text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors uppercase tracking-wider">Full name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-300"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2 border-2 border-gray-100 rounded-2xl p-4 md:p-5 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md focus-within:border-[#0EA5E9] focus-within:shadow-lg focus-within:-translate-y-1 group/field">
                      <label className="text-sm md:text-base font-bold text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors uppercase tracking-wider">Email address</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-300"
                        placeholder="Email@Address.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
                    <div className="space-y-2 border-2 border-gray-100 rounded-2xl p-4 md:p-5 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md focus-within:border-[#0EA5E9] focus-within:shadow-lg focus-within:-translate-y-1 group/field">
                      <label className="text-sm md:text-base font-bold text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors uppercase tracking-wider">Phone number</label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-300"
                        placeholder="+974 0000 0000"
                      />
                    </div>
                    <div className="space-y-2 border-2 border-gray-100 rounded-2xl p-4 md:p-5 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md focus-within:border-[#0EA5E9] focus-within:shadow-lg focus-within:-translate-y-1 group/field">
                      <label className="text-sm md:text-base font-bold text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors uppercase tracking-wider">Location</label>
                      <input
                        name="location"
                        type="text"
                        className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-300"
                        placeholder="Doha, Qatar"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-2 border-gray-100 rounded-2xl p-4 md:p-5 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md focus-within:border-[#0EA5E9] focus-within:shadow-lg focus-within:-translate-y-1 group/field">
                    <label className="text-sm md:text-base font-bold text-[#0EA5E9] block uppercase tracking-wider">Type your message...</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-600 text-sm font-semibold text-center"
                    >
                      ❌ {errorMessage}
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-[#0EA5E9]/30 hover:-translate-y-1 group disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <div className="bg-white rounded-full p-2 text-[#0EA5E9] transition-transform group-hover:translate-x-2">
                            <ArrowRight size={20} />
                          </div>
                          Send message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Get In Touch Cards */}
      <section className="py-24 bg-[#0A2540]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <MapPin size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">LOCATION</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                TREK GROUP Corporate Head Office<br />
                Office no -8, 2nd floor<br />
                Building no -210, Street - 330, Zone -43<br />
                Entrance - Near Baladna Hypermarket<br />
                Doha, Qatar
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Clock size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">OFFICE HOURS</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                Office Hours:<br />
                8:00 AM - 1:00 PM<br />
                4:00 PM - 10:00 PM
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Phone size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">PHONE</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                Mobile: +974 3051 6559<br />
                Mobile: +974 3005 6030<br />
                Tel: +974 4007 0727
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Mail size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">EMAIL</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                madhusudhant307@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-[#0EA5E9] font-bold mb-4">Ready to Incorporate?</h3>
          <h2 className="text-3xl md:text-5xl font-black text-[#0A2540] mb-10">Talk to a Business Setup Expert.</h2>

          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10" />

          <Link href="/#contact-expert">
            <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors shadow-lg shadow-orange-500/20">
              SPEAK WITH A CONSULTANT
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
