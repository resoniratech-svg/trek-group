"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "Step 01",
    title: "Choose Your Business Activity and Legal Structure",
    description: (
      <div className="space-y-4">
        <p>The first step in setting up a company in Qatar is selecting the right business activity and legal structure. This decision determines the approvals, licensing requirements, ownership eligibility, and the government authorities involved in the registration process.</p>
        <p>Foreign investors can choose from several legal entity types, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-white/80 group-hover:text-white transition-colors">
          <li>Limited Liability Company (LLC)</li>
          <li>Branch Office</li>
          <li>Sole Establishment</li>
          <li>Free Zone Company</li>
          <li>Representative Office</li>
        </ul>
        <p>Choosing the correct structure is essential for ensuring legal compliance, operational flexibility, and eligibility for 100% foreign ownership in Qatar.</p>
      </div>
    )
  },
  {
    number: "Step 02",
    title: "Apply for Commercial Registration (CR) with MOCI",
    description: (
      <div className="space-y-4">
        <p>After finalizing the business structure, the next step is applying for Commercial Registration (CR) through the Ministry of Commerce and Industry (MOCI).</p>
        <p>This process includes:</p>
        <ul className="list-disc pl-5 space-y-1 text-white/80 group-hover:text-white transition-colors">
          <li>Trade name reservation</li>
          <li>Submission of Articles of Association</li>
          <li>Shareholder and company documentation</li>
          <li>Approval from relevant authorities</li>
        </ul>
        <p>Once approved, the Commercial Registration certificate is issued, officially establishing your company in Qatar. The CR is a mandatory legal requirement for proceeding with licensing, banking, immigration, and operational activities.</p>
        <p>After obtaining the CR, businesses can move forward with:</p>
        <ul className="list-disc pl-5 space-y-1 text-white/80 group-hover:text-white transition-colors">
          <li>Qatar Chamber of Commerce Registration</li>
          <li>Corporate bank account opening</li>
          <li>Government portal activation</li>
        </ul>
      </div>
    )
  },
  {
    number: "Step 03",
    title: "Apply for the Trade License",
    description: (
      <div className="space-y-4">
        <p>With the Commercial Registration approved, businesses must apply for a Trade License through the Municipality and relevant government departments.</p>
        <p>The trade license application generally requires:</p>
        <ul className="list-disc pl-5 space-y-1 text-white/80 group-hover:text-white transition-colors">
          <li>Valid Commercial Registration (CR)</li>
          <li>Office or virtual office agreement</li>
          <li>Municipality approvals</li>
          <li>Property documentation</li>
          <li>Safety and inspection clearances (if applicable)</li>
          <li>Additional ministry approvals based on business activity</li>
        </ul>
        <p>The Trade License legally authorizes your company to conduct commercial operations in Qatar.</p>
      </div>
    )
  },
  {
    number: "Step 04",
    title: "Obtain Establishment ID and Tax Registration",
    description: (
      <div className="space-y-4">
        <p>Once the Trade License is issued, the company must complete additional compliance procedures to become fully operational.</p>
        <p><strong className="text-white font-bold">Establishment ID Registration</strong><br />
          Apply for the Establishment ID through the Ministry of Interior (MOI). This enables the company to:</p>
        <ul className="list-disc pl-5 space-y-1 text-white/80 group-hover:text-white transition-colors">
          <li>Hire employees</li>
          <li>Apply for work permits</li>
          <li>Process residency visas</li>
          <li>Access immigration and labor services</li>
        </ul>
        <p><strong className="text-white font-bold">Tax Registration</strong><br />
          Businesses are also required to register with the General Tax Authority (GTA) to comply with Qatar’s taxation and financial reporting regulations.</p>
        <p>Completing these registrations ensures your company operates legally, efficiently, and in full compliance with Qatar’s regulatory framework.</p>
      </div>
    )
  }
];

export default function FormationSteps() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mb-20 text-center leading-tight"
          >
            4 Simple Steps to <span className="text-secondary italic underline decoration-secondary/30">Success</span> in Qatar
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left Side: Image with Frame */}
            <div className="lg:w-1/2 relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 relative"
              >
                <img
                  id="formation-image"
                  src="/futuristic_stairs_process.png"
                  alt="Company Formation Steps"
                  className="w-full h-full object-cover min-h-[300px] sm:min-h-[500px] lg:min-h-[700px] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
              </motion.div>

              {/* Decorative Element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right Side: Scrolling Steps Container */}
            <div className="lg:w-1/2 w-full relative">
              <div className="h-auto lg:h-[700px] overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-6 custom-scrollbar scroll-smooth">
                <div className="space-y-8 py-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all duration-500 group"
                    >
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <span className="text-secondary font-black text-2xl tracking-[0.2em] uppercase">
                            {step.number}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                            <span className="font-black text-lg">{index + 1}</span>
                          </div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                          {step.title}
                        </h3>
                        <div className="text-white/60 text-lg leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Edge Fades */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
