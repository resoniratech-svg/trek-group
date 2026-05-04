import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FuturisticBackground from "@/components/FuturisticBackground";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "How to Setup a 100% Foreign Owned LLC in Qatar",
      excerpt: "A comprehensive guide on the new regulations allowing complete foreign ownership for businesses in Qatar.",
      date: "May 1, 2026",
      category: "Company Formation"
    },
    {
      title: "Understanding the New PRO Requirements for 2026",
      excerpt: "Everything you need to know about the latest updates to labor laws and visa processing.",
      date: "April 24, 2026",
      category: "Compliance"
    },
    {
      title: "Why Qatar is the Best Hub for Tech Startups",
      excerpt: "Discover the incentives, free zones, and infrastructure supporting tech entrepreneurs in Doha.",
      date: "April 15, 2026",
      category: "Business Strategy"
    }
  ];

  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FuturisticBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Blog Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs">Latest Insights</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mt-4 mb-6 leading-tight">
                  Trek Group <span className="text-secondary italic">Blog</span>
                </h1>
                <p className="text-primary/70 text-base md:text-lg leading-relaxed">
                  Stay updated with the latest news, regulations, and insights on doing business in Qatar.
                </p>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:border-secondary/50 transition-all duration-500 shadow-xl shadow-gray-200/50 flex flex-col"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-secondary font-bold text-xs uppercase tracking-wider">{post.category}</span>
                    <span className="text-primary/40 text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-primary/60 leading-relaxed mb-8 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn self-start">
                    Read Article
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1 text-secondary" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
