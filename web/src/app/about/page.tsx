"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CorporateGlobeBackground from "@/components/CorporateGlobeBackground";
import {
  CheckCircle2,
  Building2,
  UserCheck,
  FileCheck,
  Palette,
  Globe2,
  Code2,
  FileText,
  Award,
  ShieldCheck,
  Landmark,
  Calculator,
  Plane
} from "lucide-react";
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative">
              <div className="py-4 space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    Best in Class Company <br className="hidden md:block" />
                    Formation Experts
                  </h1>
                  <div className="w-16 h-1 bg-secondary" />
                </div>

                <div className="space-y-6 text-white/90 text-base md:text-lg font-medium leading-relaxed drop-shadow-md">
                  <p>
                    Trek Group is a trusted Qatar-based business setup and corporate solutions company dedicated to helping entrepreneurs, startups, and international investors establish and grow their businesses with ease.
                  </p>

                  <div className="bg-white/10 border-l-4 border-secondary p-5 md:p-6 rounded-r-2xl backdrop-blur-md shadow-lg my-8">
                    <p className="text-white font-black text-lg md:text-xl italic drop-shadow-sm">
                      “Entrepreneurs should not struggle to start or run their business”
                    </p>
                  </div>

                  <p>
                    Built on a simple vision, Trek Group has spent 15 years delivering reliable, efficient, and fully compliant business setup solutions across Qatar.
                  </p>

                  <div className="bg-black/30 rounded-[2rem] p-8 border border-white/10 shadow-2xl my-10 backdrop-blur-sm">
                    <h3 className="text-2xl font-black text-white mb-6">With 15 years of industry experience, we specialize in:</h3>
                    <ul className="space-y-4">
                      {[
                        "Company Formation in Qatar & Service Countries (KSA, UAE, Bahrain, Oman, Kuwait, India, etc.)",
                        "Commercial Registration (CR) Services",
                        "Trade License Processing",
                        "PRO & Government Liaison Services",
                        "Visa & Immigration Support",
                        "Document Attestation & Legal Documentation",
                        "Corporate Branding & Business Support Solutions"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="bg-secondary/20 p-1.5 rounded-full text-secondary">
                            <CheckCircle2 size={18} className="shrink-0" />
                          </div>
                          <span className="text-white/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    Our experienced consultants guide clients through every stage of the business setup process, from choosing the right legal structure and preparing documentation to securing government approvals and ensuring smooth operational setup.
                  </p>
                </div>
              </div>

              <div className="relative mt-8 lg:mt-0 space-y-12">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border border-white/10 bg-white/5 backdrop-blur-md"
                  >
                    <img
                      src="/ladder_support_final.webp"
                      alt="Business Support and Growth"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Decorative background grid pattern similar to image */}
                  <div className="absolute -inset-10 -z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(#2D1B69 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[#050816] p-6 rounded-2xl shadow-2xl z-20 hidden md:block border border-white/10 backdrop-blur-xl">
                    <div className="text-white font-black text-3xl mb-1">1500+</div>
                    <div className="text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Company Setups</div>
                  </div>
                </div>

                <div className="space-y-6 text-white/90 text-base md:text-lg font-medium leading-relaxed drop-shadow-md pt-4">
                  <p>
                    Over the years, Trek Group has grown from a small advisory unit into one of Qatar’s trusted business consultancy firms, proudly completing 1,500+ successful company setups across multiple industries. Our team includes 25+ expert consultants and team members, serving clients across Qatar, KSA, UAE, Bahrain, Oman, Kuwait, and India. Our reputation is built on professionalism, transparency, fast processing, and a commitment to simplifying even the most complex business formation procedures.
                  </p>

                  <div className="bg-gradient-to-br from-primary/20 to-secondary/10 rounded-[2rem] p-8 border border-secondary/20 shadow-2xl my-10 backdrop-blur-md">
                    <h3 className="text-2xl font-black text-white mb-6">Why Businesses Choose Trek Group</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "15 Years of Business Setup Experience in Qatar",
                        "Trusted for 1,500+ Successful Company Setups",
                        "25+ Expert Consultants & Dedicated Support",
                        "Active across Qatar, KSA, UAE, Bahrain, Oman, Kuwait & India",
                        "Fast & Reliable Government Processing",
                        "End-to-End Business Formation Solutions"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="bg-secondary p-1 rounded-full text-white mt-1 shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-white text-sm md:text-base leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l-4 border-secondary pl-6 py-2">
                    <p className="text-lg md:text-xl text-white font-bold italic leading-relaxed">
                      Whether you are launching a startup, expanding your company into Qatar, or looking for reliable PRO and corporate support services, Trek Group provides professional, growth-focused solutions tailored to your business goals.
                    </p>
                  </div>
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
                    src="/vision_image.webp"
                    alt="Our Vision"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="p-10 pt-12 relative flex flex-col flex-grow">
                  {/* Icon Badge */}
                  <div className="absolute -top-8 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-black">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-black mb-6 tracking-tight uppercase">OUR VISION</h3>
                  <p className="text-black/70 leading-relaxed text-base font-medium">
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

                  <h3 className="text-2xl font-black text-black mb-6 tracking-tight uppercase">OUR MISSION</h3>
                  <p className="text-black/70 leading-relaxed text-base font-medium">
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
            <span className="text-[40rem] font-black text-black leading-none">0</span>
          </div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Image & Heading Column */}
              <div className="lg:col-span-5 flex flex-col min-h-[400px]">
                <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none mb-8">
                  OUR PURPOSE
                </h2>
                <div className="flex-grow relative rounded-3xl overflow-hidden shadow-2xl w-full h-full">
                  <img
                    src="/ourPurposeBG.png"
                    alt="Our Purpose Background"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-7 pt-2">
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                    Businesses come to us with an idea. We become their business setup <br className="hidden md:block" />
                  </h3>

                  <div className="space-y-5">
                    <p className="text-black/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      1. Clarity First
                      Our expert Qatar business setup consultants simplify complex legal procedures, documentation requirements, and approval timelines into clear, actionable steps. We help entrepreneurs and investors understand every stage of company formation in Qatar without confusion.
                    </p>

                    <p className="text-black/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      2. Fast & Accurate Company Formation
                      We combine efficient internal processes with strong coordination across relevant ministries to deliver faster business setup approvals in Qatar while maintaining full legal compliance and accuracy.
                    </p>

                    <p className="text-black/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      3. Client-Focused Business Solutions
                      Our end-to-end Qatar company registration services are customized to match your business goals, industry requirements, and budget. From startups to international investors, we provide strategic guidance designed for long-term success.
                    </p>

                    <p className="text-black/70 text-sm md:text-[15px] leading-relaxed font-medium">
                      4. Long-Term Business Support in Qatar
                      Our relationship does not end after company formation. We continue supporting your business growth in Qatar with compliance assistance, business advisory services, licensing support, and operational guidance whenever needed.
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
            <div className="absolute inset-0 bg-gray-900/90 z-10" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Company Registration", desc: "Streamlined business registration across all sectors in Qatar with full regulatory compliance.", icon: <Building2 size={36} /> },
                { title: "Company Formation", desc: "End-to-end support for LLC, 100% foreign ownership, and Free Zone setup tailored to your specific business needs.", icon: <Building2 size={36} /> },
                { title: "PRO Services in Qatar", desc: "Expert handling of government documents, labor cards, trade licenses, and all essential compliance paperwork.", icon: <UserCheck size={36} /> },
                { title: "Visa & Immigration", desc: "Seamless processing for family, work, and investor visas in Qatar.", icon: <Plane size={36} /> },
                { title: "Certificate Attestation", desc: "Document legalization from MOFA, Embassies, and Chamber of Commerce.", icon: <FileCheck size={36} /> },
                { title: "Corporate Bank Account", desc: "Expert guidance in opening and managing corporate bank accounts in Qatar's leading banks.", icon: <Landmark size={36} /> }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="bg-white/5 backdrop-blur-md p-10 md:p-12 rounded-3xl shadow-lg border border-white/10 flex flex-col items-start hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group min-h-[320px]"
                >
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-[#0EA5E9] mb-8 group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors duration-300 shadow-xl">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white leading-tight mb-4">{service.title}</h4>
                  {service.desc && (
                    <p className="text-base text-white/70 leading-relaxed font-medium">{service.desc}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/services">
                <button className="bg-secondary hover:bg-secondary-dark text-white px-10 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-xl shadow-secondary/20 flex items-center gap-3 mx-auto">
                  View All Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>




        <Footer />
      </div>
    </main>
  );
}
