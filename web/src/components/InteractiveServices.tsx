"use client";

import { motion } from "framer-motion";
import {
  Building2,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Landmark,
  LucideIcon
} from "lucide-react";
import Link from "next/link";

interface ServiceCard {
  title: string;
  icon: LucideIcon;
  x: number;
  y: number;
  delay: number;
  id: string;
}

const services: ServiceCard[] = [
  { title: "Company Formation", icon: Building2, x: -400, y: -250, delay: 0.1, id: "company-formation-business-setup" },
  { title: "PRO Services", icon: UserCheck, x: 400, y: -250, delay: 0.2, id: "pro-services" },
  { title: "100% Foreign Ownership", icon: ShieldCheck, x: -480, y: 0, delay: 0.3, id: "one-hundred-percent-foreign-ownership" },
  { title: "Qatari Sponsor Services", icon: UserCheck, x: 480, y: 0, delay: 0.4, id: "qatari-sponsor-services" },
  { title: "Certificate Attestation", icon: FileCheck, x: -300, y: 250, delay: 0.5, id: "certificate-attestation" },
  { title: "Corporate Bank Account", icon: Landmark, x: 300, y: 250, delay: 0.6, id: "corporate-bank-account-assistance" },
];

export default function InteractiveServices() {
  return (
    <section className="relative overflow-hidden min-h-[1100px] bg-slate-950">
      <div className="absolute inset-0 z-0">
        <img
          src="/fullBGservices.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center mb-2 pt-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-secondary font-bold tracking-[0.35em] uppercase text-base md:text-xl mb-4 block"
        >
          Comprehensive Solutions
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white leading-tight"
        >
          Our <span className="text-secondary italic">End-to-End</span> Services
        </motion.h2>
      </div>

      <div className="relative w-full max-w-[1400px] h-[840px] mx-auto z-20 -mt-16">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {services.map((service, i) => (
            <motion.path
              key={`line-${i}`}
              d={`M 700 420 L ${700 + service.x} ${420 + service.y}`}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 12"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: service.delay }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 z-20 w-[540px] max-w-full -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative w-full h-[680px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
            <img
              src="/bgServices.webp"
              alt="Expert business background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />
          </div>
        </motion.div>

        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              x: service.x,
              y: service.y
            }}
            transition={{
              duration: 1,
              delay: service.delay,
              type: "spring",
              stiffness: 60
            }}
            whileHover={{ scale: 1.05 }}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 group"
          >
            <Link href={`/services/${service.id}`} className="block">
              <div className="min-w-[260px] bg-white/90 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex items-center gap-4 shadow-2xl hover:border-secondary/40 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <service.icon size={22} />
                </div>
                <div className="text-left">
                  <div className="text-slate-950 font-semibold text-lg leading-tight">{service.title}</div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-[0.25em] mt-1">Expert Service</div>
                </div>
              </div>
            </Link>

            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
              className="absolute -inset-2 bg-white/10 rounded-3xl blur-3xl -z-10 group-hover:bg-secondary/20"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
