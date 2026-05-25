"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, Tag, HelpCircle, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  intent: "Informational" | "Commercial" | "Local Doha Setup";
  date: string;
}

const blogPosts: BlogPost[] = [
  // Company Formation & Registration
  {
    title: "Step-by-Step Guide to MOCI Company Registration in Qatar",
    excerpt: "Learn how to navigate the Ministry of Commerce and Industry registration process for new businesses in Doha.",
    category: "Company Formation",
    intent: "Informational",
    date: "May 24, 2026"
  },
  {
    title: "How to Register a Commercial Registration (CR) in Doha: Fees & Timeline",
    excerpt: "A complete practical breakdown of legal fees, official timelines, and documentation required for getting a CR.",
    category: "Company Formation",
    intent: "Commercial",
    date: "May 20, 2026"
  },
  {
    title: "QFC vs. MOCI: Which Company Setup Pathway is Best for Your Business?",
    excerpt: "An in-depth comparison of the Qatar Financial Centre (QFC) framework versus MOCI company registration options.",
    category: "Company Formation",
    intent: "Commercial",
    date: "May 15, 2026"
  },
  {
    title: "How to Form an LLC (Limited Liability Company) in Qatar",
    excerpt: "The ultimate guide to setting up a standard Limited Liability Company (LLC) under the Qatari Commercial Companies Law.",
    category: "Company Formation",
    intent: "Informational",
    date: "May 10, 2026"
  },
  {
    title: "Starting a Business in Qatar Free Zones: Ras Bufontas & Umm Alhoul",
    excerpt: "Discover tax exemptions, customs benefits, and infrastructure incentives of Qatar's premier Free Zones.",
    category: "Company Formation",
    intent: "Local Doha Setup",
    date: "May 05, 2026"
  },
  {
    title: "Industrial Licensing in Qatar: Steps to Set Up a Factory",
    excerpt: "A guide to securing approvals from the Ministry of Energy and MOCI for manufacturing and heavy industrial operations.",
    category: "Company Formation",
    intent: "Informational",
    date: "Apr 28, 2026"
  },
  {
    title: "A Guide to Single Window Services for Business Setup in Doha",
    excerpt: "How to leverage the Qatari Single Window portal to speed up your trade license and CR approvals.",
    category: "Company Formation",
    intent: "Informational",
    date: "Apr 22, 2026"
  },
  {
    title: "How to Open a Branch Office of a Foreign Company in Qatar",
    excerpt: "Establish a direct branch office of your international corporation in Doha with full legal operational details.",
    category: "Company Formation",
    intent: "Commercial",
    date: "Apr 18, 2026"
  },
  {
    title: "Requirements for Opening a Representative Office in Doha",
    excerpt: "Everything you need to know about setting up a marketing and liaison office in Qatar without trading commercial rights.",
    category: "Company Formation",
    intent: "Commercial",
    date: "Apr 12, 2026"
  },
  {
    title: "Cost of Starting a Business in Qatar: A Comprehensive Budget Breakdown",
    excerpt: "Plan your setup with confidence. Real cost estimates for government fees, office space, capital, and PRO clearances.",
    category: "Company Formation",
    intent: "Commercial",
    date: "Apr 05, 2026"
  },

  // Foreign Investment & Ownership
  {
    title: "100% Foreign Ownership in Qatar: Eligible Sectors & MOCI Guidelines",
    excerpt: "An updated list of business activities and sectors allowed for complete non-Qatari ownership under Foreign Investment Law.",
    category: "Foreign Ownership",
    intent: "Informational",
    date: "May 22, 2026"
  },
  {
    title: "How Foreign Investors Can Retain 100% Share Control in Doha",
    excerpt: "Practical legal structures and corporate governance frameworks to protect your capital and operations as a foreign expat.",
    category: "Foreign Ownership",
    intent: "Commercial",
    date: "May 12, 2026"
  },
  {
    title: "Understanding Qatar’s Foreign Investment Law No. 1 of 2019",
    excerpt: "An executive legal summary of Law No. 1 of 2019 and how it impacts regional and international market entries.",
    category: "Foreign Ownership",
    intent: "Informational",
    date: "May 01, 2026"
  },
  {
    title: "Advantages of Establishing Your Business in the Qatar Financial Centre",
    excerpt: "Learn about QFC's 100% foreign ownership, own legal environment (English common law), and corporate tax structure.",
    category: "Foreign Ownership",
    intent: "Informational",
    date: "Apr 20, 2026"
  },
  {
    title: "How to Navigate Regulatory Approvals for Foreign Startups in Qatar",
    excerpt: "A guide for tech and service startups looking to enter the Qatari market under new investment programs.",
    category: "Foreign Ownership",
    intent: "Commercial",
    date: "Apr 10, 2026"
  },

  // Corporate Compliance & PRO Services
  {
    title: "Why Your Doha Business Needs Professional Corporate PRO Services",
    excerpt: "Avoid delays and legal penalties by outsourcing document clearing, immigration, and license renewals to experts.",
    category: "PRO & Compliance",
    intent: "Commercial",
    date: "May 18, 2026"
  },
  {
    title: "Commercial Registration (CR) Renewal in Qatar: A Yearly Checklist",
    excerpt: "A detailed timeline, required document checklist, and fee guide to keep your business registration fully compliant.",
    category: "PRO & Compliance",
    intent: "Informational",
    date: "May 08, 2026"
  },
  {
    title: "How to Amend Your Commercial Registration (CR) and Shareholder Agreements",
    excerpt: "Steps to transfer shares, change company names, modify authorized signatories, or add new business activities.",
    category: "PRO & Compliance",
    intent: "Commercial",
    date: "May 02, 2026"
  },
  {
    title: "Wages Protection System (WPS) in Qatar: Compliance & Penalty Guide",
    excerpt: "Ensure your corporate payroll system conforms strictly to Ministry of Labor rules to avoid account suspensions.",
    category: "PRO & Compliance",
    intent: "Informational",
    date: "Apr 15, 2026"
  },
  {
    title: "How to Setup Corporate Labor Files & Ministry of Labor Portals",
    excerpt: "A practical guide to registering your company with immigration portals and labor departments.",
    category: "PRO & Compliance",
    intent: "Informational",
    date: "Apr 01, 2026"
  },

  // Visa & Immigration Procedures
  {
    title: "How to Apply for a Qatar Family Residence Visa: Documents & Steps",
    excerpt: "Bring your family to Doha. Everything about salary requirements, educational attestation, and housing contracts.",
    category: "Visas & Immigration",
    intent: "Informational",
    date: "May 25, 2026"
  },
  {
    title: "Qatar Work Visa Processing: Guide for Employers and HR Managers",
    excerpt: "Learn how companies quota allocations, medical assessments, and visa transfers work for new international hires.",
    category: "Visas & Immigration",
    intent: "Commercial",
    date: "May 14, 2026"
  },
  {
    title: "Understanding Qatar Business Visas vs. Tourist Entry Permits",
    excerpt: "Compare business visit visas, multi-entry corporate visas, and visa-free tourist entry requirements for business trips.",
    category: "Visas & Immigration",
    intent: "Informational",
    date: "May 09, 2026"
  },
  {
    title: "A Guide to QID Issuance, Medical Commission, and Fingerprinting in Doha",
    excerpt: "Steps to complete post-arrival procedures for fresh corporate recruits in Qatar smoothly.",
    category: "Visas & Immigration",
    intent: "Informational",
    date: "Apr 30, 2026"
  },
  {
    title: "How to Secure Schengen, UK, and US Travel Visas from Qatar",
    excerpt: "A preparation guide for professionals in Doha applying for travel visas for business or leisure.",
    category: "Visas & Immigration",
    intent: "Informational",
    date: "Apr 14, 2026"
  },

  // Financial, Tax & Digital Growth
  {
    title: "How to Open a Corporate Bank Account in Qatar: Top Banks Compared",
    excerpt: "A review of Qatar National Bank (QNB), Commercial Bank, and QIB options, requirements, and minimum balances.",
    category: "Finance & Tech",
    intent: "Commercial",
    date: "May 21, 2026"
  },
  {
    title: "Understanding Corporate Tax and Tax Card Registration in Qatar",
    excerpt: "Register with the General Tax Authority (GTA) via Dhareeba and learn about tax rates for foreign-owned shares.",
    category: "Finance & Tech",
    intent: "Informational",
    date: "May 16, 2026"
  },
  {
    title: "Bookkeeping & Audit Compliance: Preparing Your Doha Business for Audit",
    excerpt: "Keep audit documentation organized. Essential tips for selecting a licensed corporate auditor in Doha.",
    category: "Finance & Tech",
    intent: "Informational",
    date: "May 04, 2026"
  },
  {
    title: "Custom Software & Web Development Solutions for Doha Startups",
    excerpt: "Optimize your corporate presence. Integrate custom CRM/ERP systems and responsive websites for growth.",
    category: "Finance & Tech",
    intent: "Commercial",
    date: "Apr 25, 2026"
  },
  {
    title: "Why Local SEO is Crucial for Getting Customers in Doha, Qatar",
    excerpt: "Boost your lead pipeline. Learn how local digital strategies connect business services with Doha buyers.",
    category: "Finance & Tech",
    intent: "Commercial",
    date: "Apr 07, 2026"
  }
];

const categories = ["All", "Company Formation", "Foreign Ownership", "PRO & Compliance", "Visas & Immigration", "Finance & Tech"];
const intents = ["All", "Informational", "Commercial", "Local Doha Setup"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIntent, setSelectedIntent] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesIntent = selectedIntent === "All" || post.intent === selectedIntent;
    return matchesSearch && matchesCategory && matchesIntent;
  });

  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050816] opacity-95" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl text-center relative z-20">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">
              Knowledge Hub & SEO Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 mb-6 leading-tight">
              Trek Group <span className="text-secondary italic">Corporate Blog</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              A comprehensive guide and strategy index for entrepreneurs, investors, and businesses operating in Doha, Qatar.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="pb-8 px-6">
          <div className="container mx-auto max-w-7xl relative z-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-xl space-y-6">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text"
                  placeholder="Search articles, keywords or strategies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-all"
                />
              </div>

              {/* Filters grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Category Select */}
                <div>
                  <span className="block text-white/50 text-[10px] font-black uppercase tracking-wider mb-3">Filter by Category</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat 
                            ? "bg-secondary text-white shadow-lg" 
                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intent Select */}
                <div>
                  <span className="block text-white/50 text-[10px] font-black uppercase tracking-wider mb-3">Filter by Search Intent</span>
                  <div className="flex flex-wrap gap-2">
                    {intents.map((intent) => (
                      <button
                        key={intent}
                        onClick={() => setSelectedIntent(intent)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedIntent === intent 
                            ? "bg-secondary text-white shadow-lg" 
                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-7xl relative z-20">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Meta info tags */}
                      <div className="flex items-center gap-2 mb-4 text-xs font-bold">
                        <span className="text-secondary uppercase tracking-wider flex items-center gap-1.5">
                          <Tag size={12} />
                          {post.category}
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/40 flex items-center gap-1.5">
                          <HelpCircle size={12} />
                          {post.intent}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-3 leading-snug group-hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-white/40">
                      <span>{post.date}</span>
                      <button className="flex items-center gap-1.5 text-secondary hover:text-white transition-colors cursor-pointer group-hover:translate-x-1 transition-transform">
                        Read Outline
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/10">
                <BookOpen className="text-white/20 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-white/50 max-w-sm mx-auto text-sm">
                  Try adjusting your search query, selecting "All" categories, or resetting the filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Strategy Consultation */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Need Specific Legal or Business Setup Advice?
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-8 max-w-2xl mx-auto font-medium">
                Our team can guide you on the exact regulations, CR amendments, tax cards, and PRO steps required for your company structure.
              </p>
              <Link href="/contact" className="inline-block">
                <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-full font-black text-base transition-all transform hover:scale-105 shadow-2xl cursor-pointer">
                  Speak to an Expert Consultant
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
