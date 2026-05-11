"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
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
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center p-12 md:p-24">
            <div className="max-w-md">
              <div className="text-secondary text-sm font-bold tracking-widest uppercase mb-4">• • • •</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-6 leading-tight">
                Let&apos;s Start <br />
                your <br />
                Business <br />
                in <span className="text-[#0EA5E9]">Qatar</span>
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                If you are reading this, congratulations. You are taking the first step to your new business in Qatar. We are a business setup firm specializing in company formation so you can focus on growth.
              </p>
            </div>
          </div>
          <div className="h-[400px] md:h-auto w-full relative bg-gray-100">
            <img 
              src="/images/qatar_office.png" 
              alt="Handshake" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/mission_image.png'; // Fallback
              }}
            />
          </div>

        </div>
      </section>

      {/* Section 2: What You Should Know */}
      <section className="bg-[#F8FAFC]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] md:h-auto w-full relative bg-gray-200 order-2 md:order-1">
            <img 
              src="/vision_image.png" 
              alt="Phone Communication" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-24 order-1 md:order-2">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] mb-6 leading-tight">
                What You Should <br />
                Know Before We <br />
                Talk
              </h2>
              <div className="w-16 h-1 bg-[#F97316] mb-8" />
              
              <ul className="space-y-6">
                {[
                  "Business setups take time in Qatar, be prepared with patience, resilience, and decisions.",
                  "The right structure is critical today, saves you a lot of trouble later.",
                  "Timeline depends entirely on documentation readiness and approvals.",
                  "Questions to vendors must make sense.",
                  "Clear guidance always costs less than mistakes."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-[#0EA5E9] shrink-0 mt-1" size={20} />
                    <span className="text-[#0A2540] font-bold text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contact Form */}
      <section className="py-24 md:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black text-[#0A2540] mb-12 leading-[1] tracking-tighter">
                Feel free to <span className="text-[#0EA5E9]">get in touch</span> or visit our location.
              </h2>
              <div className="w-24 h-2 bg-[#0EA5E9] rounded-full hidden lg:block" />
            </div>
            
            <div className="bg-transparent mt-8 lg:mt-0 w-full">
              <form 
                className="space-y-16 md:space-y-24 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get("name") || "Not provided";
                  const email = formData.get("email") || "Not provided";
                  const phone = formData.get("phone") || "Not provided";
                  const location = formData.get("location") || "Not provided";
                  const message = formData.get("message") || "No message";
                  
                  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0ALocation: ${location}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                  window.location.href = `mailto:info@trekgroups.com?subject=Website Contact: ${name}&body=${body}`;
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
                  <div className="space-y-4 border-b-2 border-gray-300 pb-4 transition-all duration-500 focus-within:border-[#0EA5E9] group/field">
                    <label className="text-sm md:text-base font-black text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors">Full name</label>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-400" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-4 border-b-2 border-gray-300 pb-4 transition-all duration-500 focus-within:border-[#0EA5E9] group/field">
                    <label className="text-sm md:text-base font-black text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors">Email address</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-400" 
                      placeholder="Email@Address.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
                  <div className="space-y-4 border-b-2 border-gray-300 pb-4 transition-all duration-500 focus-within:border-[#0EA5E9] group/field">
                    <label className="text-sm md:text-base font-black text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors">Phone number</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      required 
                      className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-400" 
                      placeholder="+974 0000 0000" 
                    />
                  </div>
                  <div className="space-y-4 border-b-2 border-gray-300 pb-4 transition-all duration-500 focus-within:border-[#0EA5E9] group/field">
                    <label className="text-sm md:text-base font-black text-[#0A2540]/60 block group-focus-within/field:text-[#0EA5E9] transition-colors">Location</label>
                    <input 
                      name="location" 
                      type="text" 
                      className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold placeholder:text-gray-400" 
                      placeholder="Doha, Qatar" 
                    />
                  </div>
                </div>

                <div className="space-y-4 border-b-2 border-gray-300 pb-4 transition-all duration-500 focus-within:border-[#0EA5E9] group/field">
                  <label className="text-sm md:text-base font-black text-[#0EA5E9] block">Type your message...</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-transparent focus:outline-none text-[#0A2540] text-lg md:text-xl font-bold resize-none leading-tight" 
                  ></textarea>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    className="w-full md:w-auto bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-16 py-8 rounded-[2rem] font-black text-2xl transition-all flex items-center justify-center gap-8 hover:shadow-3xl hover:shadow-[#0EA5E9]/50 hover:-translate-y-2 group"
                  >
                    <div className="bg-white rounded-full p-3 text-[#0EA5E9] transition-transform group-hover:translate-x-3">
                      <ArrowRight size={32} />
                    </div>
                    Send message
                  </button>
                </div>
              </form>
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
                TREK GROUP BUSINESS SERVICES<br />
                Nuija 43, Doha, Qatar
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Clock size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">OFFICE HOURS</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                Sun - Thu<br />
                7:30 AM - 10:00 PM<br />
                Saturday<br />
                8:00 AM - 10:00 PM<br />
                *Friday Holiday
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Phone size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">PHONE</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                +974 3005 6030<br />
                +974 3051 6558
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:bg-secondary hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 group cursor-pointer border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-secondary transition-colors duration-500 shadow-sm">
                <Mail size={20} />
              </div>
              <h3 className="text-[#0EA5E9] text-xs font-black tracking-widest uppercase mb-4 group-hover:text-white transition-colors duration-500">EMAIL</h3>
              <p className="text-[#0A2540] text-sm font-bold leading-relaxed group-hover:text-white transition-colors duration-500">
                info@trekgroups.com
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
