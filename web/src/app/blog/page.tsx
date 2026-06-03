"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Search, BookOpen, Tag, HelpCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  intent: "Informational" | "Commercial" | "Local Doha Setup";
  date: string;
}

const categories = ["All", "Company Formation", "Foreign Ownership", "PRO & Compliance", "Visas & Immigration", "Finance & Tech"];
const intents = ["All", "Informational", "Commercial", "Local Doha Setup"];

const ShimmerCard = () => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-xl animate-pulse flex flex-col justify-between h-[300px]">
    <div>
      <div className="flex gap-2 mb-4">
        <div className="h-4 w-20 bg-white/10 rounded-md" />
        <div className="h-4 w-20 bg-white/10 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-white/5 rounded-md" />
        <div className="h-4 w-5/6 bg-white/5 rounded-md" />
      </div>
    </div>
    <div className="pt-4 border-t border-white/5 flex justify-between">
      <div className="h-4 w-20 bg-white/10 rounded-md" />
      <div className="h-4 w-24 bg-white/10 rounded-md" />
    </div>
  </div>
);

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIntent, setSelectedIntent] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setBlogPosts(data);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
            {loading ? (
              /* Shimmer Loading Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ShimmerCard />
                <ShimmerCard />
                <ShimmerCard />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group block h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                      className="h-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] group-hover:border-secondary/35 transition-all duration-300 flex flex-col justify-between shadow-xl"
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
                        <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-white/40">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1.5 text-secondary group-hover:text-white transition-colors cursor-pointer group-hover:translate-x-1.5 transition-transform">
                          Read Article
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
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

            {/* Add Blog Button under the page */}
            <div className="mt-16 text-center">
              <Link
                href="/blog/admin"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/30 text-white px-8 py-4 rounded-full font-black text-sm transition-all transform hover:scale-105 shadow-xl cursor-pointer"
              >
                <Plus size={16} className="text-secondary" />
                Add Blog (Admin Portal)
              </Link>
            </div>
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
