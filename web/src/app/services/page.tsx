"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { servicesData } from "@/lib/servicesData";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Global Background Grid/Dots */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050816] opacity-95" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-20">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm md:text-base">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 mb-6 leading-tight">
              Corporate & Business <span className="text-secondary italic">Services</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              Explore our wide range of professional solutions designed to streamline your operations, protect your assets, and accelerate your business growth in Qatar.
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-7xl relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(servicesData).map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:border-secondary/35 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/5"
                  >
                    <div>
                      {/* Service Icon wrapper */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-110 group-hover:border-secondary/30 transition-all duration-300`}>
                        <ServiceIcon size={26} className="text-secondary" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
                        {service.description}
                      </p>
                    </div>

                    <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 text-secondary font-black text-sm group-hover:text-white transition-colors">
                      Learn More
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Stats Bar */}
        <section className="py-16 bg-white/5 border-y border-white/5 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-black text-secondary mb-2">15+</p>
                <p className="text-white/60 font-bold uppercase tracking-wider text-xs md:text-sm">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-secondary mb-2">1,500+</p>
                <p className="text-white/60 font-bold uppercase tracking-wider text-xs md:text-sm">Company Setups Completed</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-secondary mb-2">25+</p>
                <p className="text-white/60 font-bold uppercase tracking-wider text-xs md:text-sm">Expert Consultants</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-secondary mb-2">6+</p>
                <p className="text-white/60 font-bold uppercase tracking-wider text-xs md:text-sm">Service Countries (GCC & India)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-24 px-6 bg-transparent">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-blue-900/5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
                Ready to Start Your Business Journey in Qatar?
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium">
                Book a free consultation with our corporate experts to find the perfect tailored solution for your business setup and licensing requirements in Doha.
              </p>
              <Link href="/contact" className="inline-block">
                <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-secondary/20 cursor-pointer">
                  Book Free Consultation
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
