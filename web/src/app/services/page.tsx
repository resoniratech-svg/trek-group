"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FuturisticBackground from "@/components/FuturisticBackground";
import {
  Building2,
  UserCheck,
  FileCheck,
  Palette,
  Globe,
  Code2,
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Company Formation",
    id: "company-formation",
    description: "End-to-end support for LLC, 100% foreign ownership, and Free Zone setup tailored to your specific business needs.",
    details: [
      "Assistance with Mainland LLC Formation",
      "Free Zone Company Setup and Registration",
      "100% Foreign Ownership Structuring",
      "Branch Office Registration for Foreign Companies",
      "Trade License Issuance, Renewal, and Amendments"
    ],
    icon: Building2,
    color: "bg-blue-500",
    lightColor: "bg-blue-500/10",
    textColor: "text-blue-500"
  },
  {
    title: "PRO Service",
    id: "pro-service",
    description: "Expert handling of government documents, labor cards, trade licenses, and all essential compliance paperwork.",
    details: [
      "Visa Processing, Stamping, and Renewals",
      "Labor Quota and Establishment Card Applications",
      "Ministry of Interior (MOI) Approvals",
      "Corporate Bank Account Assistance",
      "Document Clearance and Legal Processing"
    ],
    icon: UserCheck,
    color: "bg-purple-500",
    lightColor: "bg-purple-500/10",
    textColor: "text-purple-500"
  },
  {
    title: "Translation and Attestation",
    id: "translation-and-attestation",
    description: "Certified translation and document legalization from MOFA, Embassies, and the Chamber of Commerce.",
    details: [
      "Legal and Corporate Document Translation",
      "MOFA (Ministry of Foreign Affairs) Attestation",
      "Embassy and Consulate Attestation",
      "Educational Certificate Attestation",
      "Commercial Document Legalization"
    ],
    icon: FileCheck,
    color: "bg-amber-500",
    lightColor: "bg-amber-500/10",
    textColor: "text-amber-500"
  },
  {
    title: "Branding Services",
    id: "branding-services",
    description: "Comprehensive brand identity creation, strategic positioning, and marketing solutions for market impact.",
    details: [
      "Corporate Identity and Logo Design",
      "Brand Strategy and Market Positioning",
      "Company Profile and Brochure Creation",
      "Marketing Collateral and Print Design",
      "Digital Brand Guidelines and Assets"
    ],
    icon: Palette,
    color: "bg-rose-500",
    lightColor: "bg-rose-500/10",
    textColor: "text-rose-500"
  },
  {
    title: "International Business Events",
    id: "international-business-events",
    description: "Seamless planning and execution of corporate events, conferences, and international exhibitions.",
    details: [
      "Corporate Conferences and Seminars Planning",
      "Exhibition Stand Design and Management",
      "Product Launch Events",
      "B2B Networking Event Organization",
      "End-to-end Event Logistics and VIP Support"
    ],
    icon: Globe,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-500/10",
    textColor: "text-emerald-500"
  },
  {
    title: "Software Services",
    id: "software-services",
    description: "Custom digital solutions, enterprise software, and innovative IT infrastructure for business growth.",
    details: [
      "AI Service and Automations",
      "Digital Marketing and SEO Strategies",
      "Custom Software Services and Web Development",
      "Enterprise Resource Planning (ERP) Implementation",
      "Mobile App Development (iOS & Android)"
    ],
    icon: Code2,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-500/10",
    textColor: "text-cyan-500"
  },
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setExpandedId(serviceParam);
      setTimeout(() => {
        const element = document.getElementById(serviceParam);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [searchParams]);

  const toggleService = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        {/* Unified Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/70 z-10" />
          <img 
            src="/trek_mountain_hero.png" 
            alt="Mountain Landscape Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs">Our Expertise</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mt-4 mb-6 leading-tight">
            Comprehensive <span className="text-secondary italic">Services</span>
          </h1>
          <p className="text-primary/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Explore our wide range of professional solutions designed to streamline your operations and accelerate your business growth in Qatar and beyond.
          </p>
        </div>
      </section>

      {/* Alternating Services Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Unified Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/80 z-10 backdrop-blur-sm" />
          <img 
            src="/trek_mountain_hero.png" 
            alt="Mountain Landscape Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-20">
          {/* Vertical Timeline Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => {
              const isExpanded = expandedId === service.id;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} id={service.id} className="relative flex flex-col md:flex-row items-center w-full group">
                  
                  {/* Center Node (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-secondary z-30 items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  </div>

                  {/* Spacer for alignment */}
                  {isEven ? null : <div className="hidden md:block md:w-1/2" />}

                  {/* Service Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={cn(
                      "w-full md:w-[45%]",
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    )}
                  >
                    <div 
                      className={cn(
                        "bg-white/80 backdrop-blur-xl border p-8 rounded-[2rem] shadow-xl transition-all duration-500 overflow-hidden relative",
                        isExpanded ? "border-secondary/60 shadow-[0_10px_40px_rgba(212,175,55,0.15)]" : "border-gray-100 hover:bg-white hover:border-gray-200 shadow-gray-200/50"
                      )}
                    >
                      {/* Subtle gradient glow inside card */}
                      <div className={cn(
                        "absolute -inset-24 opacity-10 blur-3xl rounded-full transition-opacity duration-500 pointer-events-none",
                        isExpanded ? service.color : "opacity-0"
                      )} />

                      <div className={cn("flex flex-col gap-6 relative z-10", isEven ? "md:items-end" : "md:items-start")}>
                        {/* Icon */}
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500",
                          isExpanded ? "scale-110 " + service.color + " text-white" : service.lightColor + " " + service.textColor + " group-hover:scale-110"
                        )}>
                          <service.icon size={32} />
                        </div>

                        {/* Title & Desc */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-primary mb-3 tracking-tight">
                            {service.title}
                          </h3>
                          <p className="text-primary/70 text-sm md:text-base leading-relaxed font-medium">
                            {service.description}
                          </p>
                        </div>

                        {/* Know More Button */}
                        <button 
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            "flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all duration-300",
                            isExpanded ? "bg-secondary text-white shadow-lg" : "bg-gray-100 text-primary hover:bg-gray-200"
                          )}
                        >
                          {isExpanded ? "Show Less" : "Know More"}
                          <ChevronDown size={18} className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "rotate-0")} />
                        </button>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4 }}
                            className="border-t border-gray-100 pt-8 relative z-10 text-left"
                          >
                            <h4 className="text-secondary font-black uppercase tracking-wider text-xs mb-6">
                              Full Service Details
                            </h4>
                            <ul className="space-y-4">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="mt-1">
                                    <CheckCircle2 className="text-secondary shrink-0" size={18} />
                                  </div>
                                  <span className="text-primary/90 font-medium text-sm leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-start">
                              <Link href="/contact">
                                <button className="flex items-center gap-2 text-secondary hover:text-secondary-dark font-bold text-sm group/btn transition-colors">
                                  Start Your Application
                                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                </button>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Spacer for alignment */}
                  {isEven ? <div className="hidden md:block md:w-1/2" /> : null}

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA inside Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-gray-50 border border-gray-100 p-10 md:p-16 rounded-[3rem] relative overflow-hidden shadow-xl shadow-gray-200/50">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
            <h2 className="text-2xl md:text-4xl font-black text-primary mb-6 relative z-10 leading-tight">
              Not sure which service you need?
            </h2>
            <p className="text-primary/70 text-base md:text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Book a free consultation with our experts to find the perfect tailored solution for your business setup and growth strategy.
            </p>
            <Link href="/contact" className="relative z-10 inline-block">
              <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-secondary/20">
                Book Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FuturisticBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center pt-32">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-primary font-bold">Loading Services...</p>
            </div>
          </div>
        }>
          <ServicesContent />
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}
