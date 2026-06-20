"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Building2,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Landmark,
  Calculator,
  Award,
  FileText,
  Globe2,
  Plane,
  Code2,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData, ServiceData } from "@/lib/servicesData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Helper map to dynamically find icons
const iconMap: Record<string, any> = {
  "Building2": Building2,
  "UserCheck": UserCheck,
  "FileCheck": FileCheck,
  "ShieldCheck": ShieldCheck,
  "Landmark": Landmark,
  "Calculator": Calculator,
  "Award": Award,
  "FileText": FileText,
  "Globe2": Globe2,
  "Plane": Plane,
  "Code2": Code2,
  "ArrowRight": ArrowRight
};

interface ServiceTemplateProps {
  id: string;
}

export default function ServiceTemplate({ id }: ServiceTemplateProps) {
  const service = servicesData[id];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Service Not Found</h1>
          <Link href="/services" className="text-secondary font-bold hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hello Trek Group, I would like to inquire about your "${service.title}" services in Qatar.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
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
          message: formData.message,
          service: service.title,
          formType: "service_inquiry_sidebar",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send inquiry");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Hello Trek Group, I would like to inquire about your "${service.title}" services in Qatar.`
      });
    } catch (err) {
      console.error("Service inquiry error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ServiceIcon = service.icon || Building2;

  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Dynamic/Static Service background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0b0f24] to-[#050816] opacity-95" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Banner */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 relative overflow-hidden border-b border-white/5">
          <div className="container mx-auto max-w-7xl relative z-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/50 text-xs md:text-sm font-medium mb-6">
              <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-secondary font-semibold">{service.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-sm font-bold uppercase tracking-wider">
                  Premium Service
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {service.title.split(" & ").map((word, i) => (
                    <span key={i}>
                      {i > 0 && " & "}
                      <span className={cn(i % 2 === 1 && "text-secondary italic")}>{word}</span>
                    </span>
                  ))}
                </h1>
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl font-medium">
                  {service.description}
                </p>
              </div>

              {/* Service Visual / Icon block */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className={cn("w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative group", service.color)}>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <ServiceIcon size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Rich Copy Details */}
              <div className="lg:col-span-8 space-y-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                {service.sections.map((section, idx) => (
                  <div key={idx} className="space-y-6 border-b border-white/5 last:border-0 pb-10 last:pb-0">
                    {section.title && (
                      <h2 className="text-xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-secondary rounded-full shrink-0" />
                        {section.title}
                      </h2>
                    )}
                    {section.text && (
                      <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                        {section.text}
                      </p>
                    )}
                    {section.points && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {section.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-secondary/25 transition-all duration-300">
                            <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                            <span className="text-white/90 font-semibold text-sm leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column: Sticky Lead Capture Form & Internal Navigation */}
              <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                
                {/* 1. High-Converting Inquiry Form */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                    Inquire About This Service
                  </h3>
                  <p className="text-white/60 text-xs mb-6 font-medium">
                    Complete the form below to receive a custom quote and strategy consultation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/70 text-xs font-black uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-black uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-black uppercase tracking-wider mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+974 5555 5555"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-black uppercase tracking-wider mb-2">Inquiry Details</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-secondary hover:bg-secondary-dark text-white font-black text-sm py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Free Consultation
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    {submitStatus === "success" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 text-xs font-semibold text-center"
                      >
                        ✓ Thank you! Our corporate consultants will contact you shortly.
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-xs font-semibold text-center"
                      >
                        ❌ Failed to send message. Please try again.
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* 2. Internal Sub-services Navigation */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-xl">
                  <h3 className="text-lg font-black text-white mb-6 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-secondary rounded-full" />
                    All Corporate Services
                  </h3>
                  <ul className="space-y-2">
                    {Object.values(servicesData).map((srv) => {
                      const isActive = srv.id === id;
                      return (
                        <li key={srv.id}>
                          <Link 
                            href={`/services/${srv.id}`}
                            className={cn(
                              "flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-sm font-semibold group",
                              isActive 
                                ? "bg-secondary/10 border-secondary/30 text-secondary" 
                                : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 text-white/80 hover:text-white"
                            )}
                          >
                            <span className="truncate pr-2">{srv.title}</span>
                            <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", isActive ? "text-secondary" : "text-white/40")} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 3. Credentials & Quick Contacts */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-xl space-y-6">
                  <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-secondary rounded-full" />
                    Why Trek Group?
                  </h3>
                  
                  {/* Credentials grid */}
                  <div className="grid grid-cols-3 gap-2 text-center pb-4 border-b border-white/5">
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-lg md:text-xl font-black text-secondary">15+</p>
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Years Exp</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-lg md:text-xl font-black text-secondary">1500+</p>
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Setups</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-lg md:text-xl font-black text-secondary">25+</p>
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Experts</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-xs font-semibold text-white/70">
                    <li className="flex gap-3 items-start">
                      <Phone className="text-secondary shrink-0" size={16} />
                      <div>
                        <p className="text-white">Call/WhatsApp</p>
                        <a href="tel:+97430516559" className="hover:text-secondary">+974 3051 6559</a> / <a href="tel:+97430056030" className="hover:text-secondary">3005 6030</a>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Mail className="text-secondary shrink-0" size={16} />
                      <div>
                        <p className="text-white">Email Address</p>
                        <a href="mailto:info@trek-group.com" className="hover:text-secondary">info@trek-group.com</a>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Clock className="text-secondary shrink-0" size={16} />
                      <div>
                        <p className="text-white">Office Hours</p>
                        <span>Saturday - Thursday: 8:00 AM - 6:00 PM</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <MapPin className="text-secondary shrink-0" size={16} />
                      <div>
                        <p className="text-white">Corporate Head Office</p>
                        <span>Office no-8, Building no-210, Street 330, Doha, Qatar</span>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
