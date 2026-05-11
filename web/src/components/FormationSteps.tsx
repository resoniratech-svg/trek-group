"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "Step 01",
    title: "Choose Your Business Activity and Legal Structure",
    description: "Before applying, select the business activity and the legal entity type (such as LLC, branch, or sole establishment). This determines the approvals required, the trade license category, and the ministry under which your activity will be regulated."
  },
  {
    number: "Step 02",
    title: "Apply for Commercial Registration (CR) with MOCI",
    description: "Submit your trade name, Articles of Association, and required documents to the Ministry of Commerce and Industry (MOCI). Once approved, the company receives its Commercial Registration (CR), the official document that legally establishes your company formation in Qatar. No company can proceed to licensing or hiring without a CR. With the CR issued, you can proceed to mandatory proceedings such as Qatar Chamber of Commerce Registration and Corporate bank account opening."
  },
  {
    number: "Step 03",
    title: "Apply for the Trade License",
    description: "Using your approved Commercial Registration and bank details, apply for your Qatar trade license through the Municipality. This includes providing office/virtual office documentation, property approvals, municipal inspections (when required) and any additional ministry clearances based on your business activity. The trade license legally authorizes your business to operate in Qatar."
  },
  {
    number: "Step 04",
    title: "Obtain Establishment ID and Tax Registration",
    description: "Once the trade license is issued, apply for your Establishment ID through the Ministry of Interior. This enables access to immigration and labour services, allowing your company to hire employees and issue work permits. Companies must also complete tax registration with the General Tax Authority (GTA) to meet Qatar’s financial and reporting requirements. Once these steps are completed, your company becomes fully operational and compliant with Qatar’s regulatory framework."
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
                  className="w-full h-full object-cover min-h-[500px] lg:min-h-[700px] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
              </motion.div>
              
              {/* Decorative Element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right Side: Scrolling Steps Container */}
            <div className="lg:w-1/2 relative">
              <div className="h-[600px] lg:h-[700px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
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
                        <p className="text-white/60 text-lg leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                          {step.description}
                        </p>
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
