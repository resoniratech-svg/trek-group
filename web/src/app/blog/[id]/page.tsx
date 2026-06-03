"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, HelpCircle, Share2, Clock, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  intent: string;
  date: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const blogId = params?.id as string;

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blogs/${blogId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Article not found.");
          } else {
            setError("Failed to load article.");
          }
          return;
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while loading the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Safe inline markdown formatter for simple tags
  const formatInlineMarkdown = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="bg-white/10 px-1.5 py-0.5 rounded text-secondary font-mono text-xs">$1</code>'
    );
    return formatted;
  };

  // Pure React Markdown + Table Parser
  const renderMarkdown = (content: string) => {
    if (!content) return null;
    const lines = content.split("\n");
    let inList = false;
    let inTable = false;
    let listItems: string[] = [];
    let tableRows: string[][] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 mb-6 space-y-2 text-white/80 font-medium text-base md:text-lg">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const dataRows = tableRows.slice(1);
        elements.push(
          <div key={`table-${key}`} className="overflow-x-auto my-8 border border-white/10 rounded-2xl shadow-2xl glass">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 text-left text-xs font-black text-secondary uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-transparent">
                {dataRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-white/5 transition-colors">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-6 py-4 text-sm font-medium text-white/80"
                        dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check Table
      if (trimmed.startsWith("|")) {
        if (inList) flushList(index);
        inTable = true;
        const cols = trimmed
          .split("|")
          .map((c) => c.trim())
          .filter((c, i, arr) => i > 0 && i < arr.length - 1);
        
        // Skip table formatting separator row (| :--- | :--- |)
        const isSeparator = cols.every(
          (c) => c.startsWith(":") || c.startsWith("-") || c.endsWith(":") || c.replace(/-/g, "") === ""
        );
        if (!isSeparator) {
          tableRows.push(cols);
        }
        return;
      } else {
        if (inTable) flushTable(index);
      }

      // Check List
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        listItems.push(trimmed.slice(2));
        return;
      } else {
        if (inList) flushList(index);
      }

      // Headers, HR, Paragraphs
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-lg md:text-xl font-bold text-secondary mt-8 mb-4 font-outfit">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-xl md:text-3xl font-black text-white mt-10 mb-4 border-b border-white/10 pb-3 font-outfit">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-2xl md:text-4xl font-black text-white mt-12 mb-6 font-outfit">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith("---")) {
        elements.push(<hr key={index} className="my-10 border-white/10" />);
      } else if (trimmed === "") {
        // Skip empty lines
      } else {
        elements.push(
          <p
            key={index}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-6 font-medium"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
      }
    });

    if (inList) flushList(lines.length);
    if (inTable) flushTable(lines.length);

    return elements;
  };

  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050816] opacity-95" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Content Area */}
        <div className="flex-grow pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-4xl relative z-20">
            {/* Back Button */}
            <div className="mb-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/50 hover:text-secondary font-black text-sm transition-all group cursor-pointer"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
                Back to Corporate Blog
              </Link>
            </div>

            {loading ? (
              /* Shimmer Loading State */
              <div className="space-y-8 animate-pulse">
                <div className="h-6 w-32 bg-white/10 rounded-lg" />
                <div className="h-14 w-3/4 bg-white/10 rounded-2xl" />
                <div className="flex gap-4">
                  <div className="h-5 w-24 bg-white/10 rounded-md" />
                  <div className="h-5 w-24 bg-white/10 rounded-md" />
                </div>
                <hr className="border-white/10" />
                <div className="space-y-4">
                  <div className="h-5 w-full bg-white/5 rounded-lg" />
                  <div className="h-5 w-full bg-white/5 rounded-lg" />
                  <div className="h-5 w-5/6 bg-white/5 rounded-lg" />
                  <div className="h-5 w-4/5 bg-white/5 rounded-lg" />
                </div>
              </div>
            ) : error ? (
              /* Error State */
              <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-white/10">
                <AlertCircle className="text-red-500 mx-auto mb-4" size={56} />
                <h2 className="text-2xl font-black text-white mb-2">{error}</h2>
                <p className="text-white/50 max-w-md mx-auto text-sm mb-8 font-medium">
                  The article you are trying to view might have been deleted or the URL is invalid.
                </p>
                <button
                  onClick={() => router.push("/blog")}
                  className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-full font-black text-base transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Return to Blog
                </button>
              </div>
            ) : blog ? (
              /* Article View */
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold uppercase tracking-wider">
                  <span className="text-secondary flex items-center gap-1.5">
                    <Tag size={14} />
                    {blog.category}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/50 flex items-center gap-1.5">
                    <HelpCircle size={14} />
                    {blog.intent}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Clock size={14} />
                    {calculateReadTime(blog.content)}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight font-outfit">
                  {blog.title}
                </h1>

                {/* Main Excerpt Highlight */}
                <p className="text-white/80 text-lg md:text-xl font-bold leading-relaxed mb-10 border-l-4 border-secondary pl-6 italic">
                  {blog.excerpt}
                </p>

                {/* Utility Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-y border-white/10 mb-12 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                      <span className="text-secondary font-black text-sm">TG</span>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm leading-none">Trek Group Advisory</h4>
                      <span className="text-white/40 text-xs font-bold">Official Consultant</span>
                    </div>
                  </div>

                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-secondary px-4 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        Copied Link
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        Share Article
                      </>
                    )}
                  </button>
                </div>

                {/* Dynamic Content Body */}
                <div className="prose prose-invert max-w-none text-white/80 font-medium leading-relaxed">
                  {renderMarkdown(blog.content)}
                </div>

                {/* Bottom Author Section */}
                <div className="mt-16 p-8 rounded-[2rem] border border-white/10 bg-white/5 glass flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/15 flex items-center justify-center border border-secondary/30 shrink-0 shadow-lg">
                    <span className="text-secondary font-black text-2xl">TG</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-white font-black text-lg mb-1">About Trek Group Qatar</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-medium">
                      Trek Group is a premier business setup and corporate advisory agency based in Doha, Qatar. We specialize in company formation, commercial licensing, QFC registrations, 100% foreign control advisory, and corporate PRO clearances.
                    </p>
                  </div>
                </div>
              </motion.article>
            ) : null}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
