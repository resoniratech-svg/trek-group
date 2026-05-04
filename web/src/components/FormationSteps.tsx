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
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-black mb-20 text-center"
          >
            4 Steps to <span className="text-secondary italic">Company Formation</span> in Qatar
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left Side: Sticky Image */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 h-full"
              >
                <img 
                  id="formation-image"
                  src="/futuristic_stairs_process.png" 
                  alt="Company Formation Steps" 
                  className="w-full h-full object-cover min-h-[600px] lg:min-h-[750px]"
                />
              </motion.div>
            </div>

            {/* Right Side: Scrolling Steps Container */}
            <div className="lg:w-1/2 relative">
              <div className="h-[600px] lg:h-[750px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth rounded-[3rem]">
                <div className="space-y-8 py-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-50/80 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <span className="text-secondary font-black text-xl tracking-widest uppercase">
                          {step.number}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[#0EA5E9] text-base md:text-lg leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Optional: Gradient fade at top and bottom to show "hiding" effect */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-10 rounded-t-[3rem]" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 rounded-b-[3rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
