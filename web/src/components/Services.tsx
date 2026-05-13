"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  UserCheck,
  FileCheck,
  Plane,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Code2,
  FileText,
  Award,
  Landmark,
  Calculator,
  Palette,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProcessFlowBackground from "./ProcessFlowBackground";
import JourneyFlowBackground from "./JourneyFlowBackground";
import ServicesBackground from "./ServicesBackground";
import ScrollAnimation from "./ScrollAnimation";

const services = [
  {
    title: "Company Registration",
    description: "Streamlined business registration across all sectors in Qatar with full regulatory compliance.",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "Company Formation",
    description: "End-to-end support for LLC, 100% foreign ownership, and Free Zone setup.",
    icon: Building2,
    color: "bg-indigo-500",
  },
  {
    title: "PRO Services in Qatar",
    description: "Expert handling of government documents, labor cards, and trade licenses.",
    icon: UserCheck,
    color: "bg-purple-500",
  },
  {
    title: "Software Services",
    description: "Custom digital solutions, enterprise software, and innovative IT infrastructure.",
    icon: Code2,
    color: "bg-cyan-500",
  },
  {
    title: "Certificate Attestation",
    description: "Document legalization from MOFA, Embassies, and Chamber of Commerce.",
    icon: FileCheck,
    color: "bg-amber-500",
  },
  {
    title: "View All Services",
    description: "Explore our full range of 13+ professional business solutions tailored for you.",
    icon: ArrowRight,
    color: "bg-secondary",
    isViewMore: true,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Opacity transforms for content layers
  const formationOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.55], [0, 1, 1, 0]);
  const journeyOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <section id="services" className="pt-0 pb-12 bg-transparent scroll-mt-24">
      <div className="container mx-auto px-6">

        {/* Combined Scroll Experience Section */}
        <div ref={containerRef} className="relative h-[250vh] mb-0 rounded-[4rem] overflow-hidden">
          {/* Sticky ScrollAnimation Background */}
          <div className="sticky top-0 h-screen w-full">
            <ScrollAnimation progress={scrollYProgress} />
            {/* Maximum brightness overlay */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
          </div>

          {/* Overlay Content 1: Company Formation */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-auto">
              <motion.div
                style={{ opacity: formationOpacity }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 md:p-12 max-w-6xl mx-auto"
              >
                <div className="hidden lg:flex flex-col justify-center items-center relative">
                  {/* Left side empty as requested */}
                </div>

                <div className="flex flex-col justify-center bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl">
                  <h2 className="text-2xl md:text-4xl font-black text-black leading-[1.2] mb-6">
                    Company Formation in Qatar Made Easy and <span className="text-secondary italic">Investor-ready</span>
                  </h2>
                  <p className="text-black text-sm md:text-base leading-relaxed mb-6 font-semibold">
                    Setting up a business in Qatar shouldn’t feel like going through a maze. We simplify company formation by guiding you through every requirement, from choosing the right structure to securing all ministry approvals essential for a smooth market entry.
                  </p>
                  <Link href="/about">
                    <button className="bg-primary text-white hover:bg-secondary px-8 py-4 rounded-full font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center gap-2 group w-fit">
                      Discover More
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Overlay Content 2: Stress-Free Journey */}
          <div className="absolute inset-0 z-10 pointer-events-none top-[125vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-auto">
              <motion.div
                style={{ opacity: journeyOpacity }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 md:p-12 max-w-6xl mx-auto"
              >
                <div className="flex flex-col justify-center bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl order-2 lg:order-1">
                  <h3 className="text-2xl md:text-4xl font-black text-black leading-tight mb-6">
                    Here Your <span className="text-secondary italic">Qatar Business Journey</span> Feels Stress-Free
                  </h3>
                  <p className="text-black text-sm md:text-base leading-relaxed mb-6 font-semibold">
                    Our experts know that every business comes with its own set of challenges. We listen, understand, and guide you through every step with clarity and care, making your company formation stress-free and easy.
                  </p>
                  <Link href="/services">
                    <button className="bg-secondary text-white hover:bg-secondary-dark px-8 py-4 rounded-full font-bold text-base transition-all transform hover:scale-105 flex items-center gap-2 group shadow-xl shadow-secondary/20 w-fit">
                      Start Your Journey
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>

                <div className="hidden lg:flex flex-col justify-center items-center relative order-1 lg:order-2">
                  <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-[3rem] shadow-2xl border border-white overflow-hidden max-w-md">
                    <img
                      src="/images/qatar_office.png"
                      alt="Luxury Qatar Office"
                      className="w-full h-auto rounded-[2rem] opacity-100"
                    />
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="text-black font-black text-sm">Expert Guidance</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Services Section with Man Image */}
        <div className="relative flex flex-col lg:flex-row gap-12 items-stretch p-8 md:p-12 rounded-[3.5rem] overflow-hidden bg-transparent -mt-32">
          {/* Geometric Background Effect */}
          <ServicesBackground />

          {/* Left Side: Heading + Man Image */}
          <div className="w-full lg:w-[40%] flex flex-col relative z-10">
            {/* Services Heading */}
            <div className="mb-12 relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block relative"
              >
                <div className="absolute -inset-4 bg-secondary/10 blur-2xl rounded-full -z-10" />
                <h2 className="text-3xl md:text-5xl font-black text-black leading-tight">
                  Our <span className="text-secondary italic">Services</span>
                </h2>
                <div className="mt-4 flex gap-2">
                  <div className="w-12 h-1 bg-secondary rounded-full" />
                  <div className="w-4 h-1 bg-secondary/40 rounded-full" />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group flex-grow"
            >
              <img
                src="/images/man_pointing.png"
                alt="Business Consultant pointing to services"
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl border border-white/50"
              />
            </motion.div>
          </div>

          {/* Right Side: Services Grid */}
          <div className="w-full lg:w-[60%] pt-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-6 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-secondary/50 transition-all duration-500 shadow-xl shadow-gray-200/20 overflow-hidden flex flex-col justify-between"
                >
                  <Link href={service.isViewMore ? "/services" : `/services?service=${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="absolute inset-0 z-20" />
                  <div className="relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-6",
                      service.color
                    )}>
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-black mb-3 group-hover:text-secondary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className={cn("leading-relaxed mb-6 text-xs md:text-sm font-medium", service.isViewMore ? "text-black/80" : "text-black/60")}>
                      {service.description}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-secondary font-black text-xs group/btn pointer-events-none">
                      <span>{service.isViewMore ? "Explore Services" : "Learn More"}</span>
                      <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-in-out rounded-b-[2rem]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
