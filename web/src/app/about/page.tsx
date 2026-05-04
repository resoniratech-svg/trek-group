"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateGlobeBackground from "@/components/CorporateGlobeBackground";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CorporateGlobeBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* About Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="py-4">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    Best in Class Company <br className="hidden md:block" />
                    Formation Experts
                  </h1>
                  <div className="w-16 h-1 bg-secondary" />
                </div>

                <div className="space-y-6">
                  <p className="text-white text-base md:text-lg font-medium leading-relaxed drop-shadow-md">
                    Trek Group is a Qatar-based business setup and corporate solutions provider built on one simple thought:
                  </p>

                  <div className="bg-white/10 border-l-4 border-secondary p-5 md:p-6 rounded-r-2xl backdrop-blur-md shadow-lg">
                    <p className="text-white font-black text-lg md:text-xl italic drop-shadow-sm">
                      “Entrepreneurs should not struggle to start or run their business.”
                    </p>
                  </div>

                  <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium drop-shadow-md">
                    For more than a decade, we&apos;ve been guiding investors, startups, and growing companies through every stage of business formation in Qatar like documentation, right legal structure, government approvals, commercial registration (CR), trade license processing, branding, visa services and long-term operational support.
                  </p>

                  <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium drop-shadow-md">
                    What started as a small advisory unit has grown into a trusted business setup consultancy with <span className="font-black text-secondary">10+ years of experience</span>, a <span className="font-black text-secondary">1,000+ client portfolio</span>, and a reputation for simplifying even the most complex processes of business setup in Qatar.
                  </p>
                </div>
              </div>

              <div className="relative mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border border-white/10 bg-white/5 backdrop-blur-md"
                >
                  <img
                    src="/ladder_support_final.png"
                    alt="Business Support and Growth"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Decorative background grid pattern similar to image */}
                <div className="absolute -inset-10 -z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(#2D1B69 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#050816] p-6 rounded-2xl shadow-2xl z-20 hidden md:block border border-white/10 backdrop-blur-xl">
                  <div className="text-white font-black text-3xl mb-1">1000+</div>
                  <div className="text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Clients Supported</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Mission & Vision */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Vision Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group relative"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src="/vision_image.png" 
                    alt="Our Vision" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="p-10 pt-12 relative flex flex-col flex-grow">
                  {/* Icon Badge */}
                  <div className="absolute -top-8 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-primary mb-6 tracking-tight uppercase">OUR VISION</h3>
                  <p className="text-primary/70 leading-relaxed text-base font-medium">
                    To become Qatar&apos;s most trusted partner for company formation and corporate solutions, enabling entrepreneurs from around the world to build, scale, and succeed in the region.
                  </p>
                </div>
                {/* Bottom Border Accent */}
                <div className="h-2 bg-[#A5F3FC] w-full" />
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group relative"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src="/mission_image.png" 
                    alt="Our Mission" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="p-10 pt-12 relative flex flex-col flex-grow">
                  {/* Icon Badge */}
                  <div className="absolute -top-8 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#D4AF37]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-primary mb-6 tracking-tight uppercase">OUR MISSION</h3>
                  <p className="text-primary/70 leading-relaxed text-base font-medium">
                    To simplify business formation and empower companies through reliable consultancy, faultless documentation support, transparent guidance, and innovative corporate solutions.
                  </p>
                </div>
                {/* Bottom Border Accent */}
                <div className="h-2 bg-[#FED7AA] w-full" />
              </motion.div>
            </div>
          </div>
        </section>


        {/* Our Purpose Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute left-0 bottom-10 opacity-10">
            <div className="grid grid-cols-5 gap-2">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-primary rounded-full" />
              ))}
            </div>
          </div>
          
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
            <span className="text-[40rem] font-black text-primary leading-none">0</span>
          </div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Heading Column */}
              <div className="lg:col-span-4">
                <div className="w-48 h-1 bg-secondary mb-6" />
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none">
                  OUR <br />
                  PURPOSE
                </h2>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-8 pt-2">
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-black text-primary leading-tight">
                    Businesses come to us with an idea. We become their business setup <br className="hidden md:block" />
                    <span className="bg-[#FFF7ED] px-4 py-1 rounded-lg text-secondary inline-block mt-2 md:mt-0">
                      &ldquo;Painkiller&rdquo;
                    </span>.
                  </h3>

                  <div className="space-y-5">
                    <p className="text-primary/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      We help them avoid the hassle of the backend process and turn it into a registered, licensed, operational business in Qatar......without delays, confusion, or unnecessary costs.
                    </p>

                    <p className="text-primary/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      We provide relief to them beyond paperwork. We work as strategic partners offering end-to-end guidance, clarity, and accountability, so entrepreneurs can focus on growth while we handle the groundwork.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Unified Background Section for Our Approach & Services */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gray-900/80 z-10" />
            <img 
              src="/expert_businessman_multi_arms_1777724379082.png" 
              alt="Business Approach Background" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
          </div>

          <div className="container mx-auto px-6 max-w-6xl relative z-20">
            {/* Our Approach Section */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Approach</h2>
                <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
              </div>

              <div className="space-y-12">
                {[
                  {
                    title: "Clarity First",
                    desc: "Our Qatar business setup consultants break down legal terms, documentation and timelines into simple, actionable steps.",
                    align: "left"
                  },
                  {
                    title: "Speed with Accuracy",
                    desc: "We leverage a strong internal process and ministry relationships to deliver faster approvals without compromising compliance.",
                    align: "right"
                  },
                  {
                    title: "Client-Centric Execution",
                    desc: "Our end-to-end services are tailored to the client’s goals, industry and budget. Whether it’s an early-stage entrepreneur or an international investor we follow this same success formula.",
                    align: "left"
                  },
                  {
                    title: "Long-Term Partnership",
                    desc: "Our experts don’t disappear after your company formation. We stay with you as your company grows in Qatar, advising, solving problems, and keeping your compliance on track.",
                    align: "right"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex ${item.align === 'left' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className="w-full md:w-[55%] bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl hover:bg-white/15 transition-all duration-300 relative group overflow-hidden">
                      {/* Subtle hover effect light */}
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-secondary to-orange-400 text-white flex items-center justify-center font-black text-xl shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                          <p className="text-white/80 leading-relaxed font-medium text-sm md:text-base">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Company Formation Services Grid */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0EA5E9] mb-4">Our Company Formation Services</h2>
              <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
              <p className="text-[#0EA5E9] text-lg font-medium">End-to-end corporate solutions, including</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Company Formation in Qatar",
                  desc: "(LLC, Branch Office, Holding Company, Partnership, Free Zone)",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
                {
                  title: "PRO Services in Qatar",
                  desc: "(Visas, Labour Cards, Establishment ID, Ministry Approvals)",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  )
                },
                {
                  title: "Business Registration & Licensing",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                {
                  title: "Translation & Certificate Attestation",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  )
                },
                {
                  title: "Branding & Creative Enablement",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )
                },
                {
                  title: "International Business Events Support",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h.293m1.414 0l1.414 1.414M11 18.03V17a2 2 0 012-2h1m1 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "Offshore Company Consultation",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                {
                  title: "Business Consultancy & Compliance",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 flex flex-col items-start hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#0EA5E9] mb-6 group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-[17px] font-black text-white leading-tight mb-2">{service.title}</h4>
                  {service.desc && (
                    <p className="text-[12px] text-white/60 leading-relaxed font-medium">{service.desc}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>




        <Footer />
      </div>
    </main>
  );
}
