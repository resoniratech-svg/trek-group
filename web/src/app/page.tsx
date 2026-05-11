"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactExpert from "@/components/ContactExpert";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import InteractiveServices from "@/components/InteractiveServices";
import OpportunitySection from "@/components/OpportunitySection";
import KeySetupFactors from "@/components/KeySetupFactors";
import CorporateGlobeBackground from "@/components/CorporateGlobeBackground";
import OwnershipBanner from "@/components/OwnershipBanner";
import HomeScrollExperience from "@/components/HomeScrollExperience";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CompanyRegistrationPart from "@/components/CompanyRegistrationPart";
import FormationSteps from "@/components/FormationSteps";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Global Animated Background - Keeps it consistent on the rest of the page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CorporateGlobeBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Apple-style Scroll Experience (Sticky Section) */}
        <HomeScrollExperience />

        {/* The rest of the page follows after the scroll experience */}
        <div className="relative z-20 bg-transparent -mt-[50vh]">
          <InteractiveServices />
          <OwnershipBanner />
          
          <FormationSteps />

          <AboutSection />

          <KeySetupFactors />
          <ImageCarousel />
          <OpportunitySection />
          <ContactExpert />
          <CompanyRegistrationPart />
          <FAQ />


          {/* CTA Section */}
          <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl"
              >
                <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Ready to Start Your <span className="text-secondary italic">Trek</span> to Success?
                </h2>
                <p className="text-white/70 text-base md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                  Contact our consultants today for a free consultation and let us guide you through the process of setting up your dream business in Qatar.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link href="/contact" className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-2xl shadow-secondary/20 inline-flex items-center justify-center">
                    Book Free Consultation
                  </Link>
                  <a href="tel:+97430056030" className="text-white font-black text-lg hover:text-secondary transition-colors flex items-center gap-2">
                    Call Us: <span className="text-secondary">+974 3005 6030</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
