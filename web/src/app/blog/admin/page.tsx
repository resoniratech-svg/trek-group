"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Lock, 
  User, 
  LogOut, 
  Plus, 
  Trash2, 
  Eye, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Tag, 
  HelpCircle,
  BookOpen,
  HelpCircle as FaqIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  intent: string;
  date: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const CATEGORIES = ["Company Formation", "Foreign Ownership", "PRO & Compliance", "Visas & Immigration", "Finance & Tech"];
const INTENTS = ["Informational", "Commercial", "Local Doha Setup"];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Portal View Selector (Blogs vs FAQs)
  const [managementMode, setManagementMode] = useState<"blogs" | "faqs">("blogs");

  // Blog Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [intent, setIntent] = useState(INTENTS[0]);

  // FAQ Form State
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  // UI States
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeBlogTab, setActiveBlogTab] = useState<"write" | "preview">("write");

  // Data Lists
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Authenticate on mount from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("trek_admin_auth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch data when logged in or lists are modified
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        // Fetch blogs
        const blogsRes = await fetch("/api/blogs", { cache: "no-store" });
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setBlogs(blogsData);
        }

        // Fetch FAQs
        const faqsRes = await fetch("/api/faqs", { cache: "no-store" });
        if (faqsRes.ok) {
          const faqsData = await faqsRes.json();
          setFaqs(faqsData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchData();
  }, [isLoggedIn, refreshTrigger]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "trekadmin123") {
      localStorage.setItem("trek_admin_auth", "true");
      setIsLoggedIn(true);
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid username or password. Try admin / trekadmin123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("trek_admin_auth");
    setIsLoggedIn(false);
  };

  // Blog publishing handler
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setFormError("All fields are required. Please fill in the details.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          intent,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to publish blog post");
      }

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory(CATEGORIES[0]);
      setIntent(INTENTS[0]);
      setSuccess(true);
      setActiveBlogTab("write");
      setRefreshTrigger((prev) => prev + 1);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Blog deletion handler
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        alert("Failed to delete the article.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting.");
    }
  };

  // FAQ publishing handler
  const handlePublishFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      setFormError("Please enter both the question and the answer.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: faqQuestion,
          answer: faqAnswer,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to publish FAQ");
      }

      // Reset form
      setFaqQuestion("");
      setFaqAnswer("");
      setSuccess(true);
      setRefreshTrigger((prev) => prev + 1);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // FAQ deletion handler
  const handleDeleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        alert("Failed to delete the FAQ.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting.");
    }
  };

  // Safe inline markdown formatter for preview
  const formatInlineMarkdown = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="bg-white/10 px-1.5 py-0.5 rounded text-secondary font-mono text-xs">$1</code>'
    );
    return formatted;
  };

  // Markdown parsing inside live preview
  const renderPreviewMarkdown = (text: string) => {
    if (!text) return <p className="text-white/30 italic">No content written yet...</p>;
    const lines = text.split("\n");
    let inList = false;
    let inTable = false;
    let listItems: string[] = [];
    let tableRows: string[][] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 mb-4 space-y-2 text-white/80">
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
          <div key={`table-${key}`} className="overflow-x-auto my-6 border border-white/10 rounded-xl glass">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left text-[11px] font-black text-secondary uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dataRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-xs text-white/80"
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

      if (trimmed.startsWith("|")) {
        if (inList) flushList(index);
        inTable = true;
        const cols = trimmed
          .split("|")
          .map((c) => c.trim())
          .filter((c, i, arr) => i > 0 && i < arr.length - 1);
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

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        listItems.push(trimmed.slice(2));
        return;
      } else {
        if (inList) flushList(index);
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-base font-bold text-secondary mt-6 mb-3 font-outfit">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-lg md:text-xl font-black text-white mt-8 mb-3 border-b border-white/10 pb-2 font-outfit">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-xl md:text-2xl font-black text-white mt-10 mb-4 font-outfit">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith("---")) {
        elements.push(<hr key={index} className="my-6 border-white/10" />);
      } else if (trimmed === "") {
        // Skip
      } else {
        elements.push(
          <p
            key={index}
            className="text-white/70 text-sm leading-relaxed mb-4"
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
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050816] opacity-95" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-7xl relative z-20">
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                /* Login Card Component */
                <motion.div
                  key="login-view"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-md mx-auto my-12 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-secondary/10 border border-secondary/25 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lock className="text-secondary" size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white">Admin Login</h2>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mt-1">
                      Trek Group Corporate Portal
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {loginError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-medium">
                        {loginError}
                      </div>
                    )}

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="text"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-xl font-black text-sm transition-all transform hover:scale-[1.02] shadow-xl shadow-secondary/10 cursor-pointer"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Admin Dashboard Component */
                <motion.div
                  key="dashboard-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {/* Dashboard Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] gap-4">
                    <div>
                      <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                        Advisory Portal
                      </span>
                      <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                        Trek Group Unified Portal
                      </h1>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link href="/blog" className="text-white/60 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors">
                        <Eye size={14} />
                        Live Blog
                      </Link>
                      <Link href="/faq" className="text-white/60 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors">
                        <Eye size={14} />
                        Live FAQ
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-200 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>

                  {/* Unified Tab Switcher (Blogs vs FAQs) */}
                  <div className="flex flex-col sm:flex-row bg-white/5 p-1.5 border border-white/10 rounded-2xl w-full sm:w-fit gap-1 sm:gap-0">
                    <button
                      onClick={() => {
                        setManagementMode("blogs");
                        setFormError("");
                        setSuccess(false);
                      }}
                      className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        managementMode === "blogs"
                          ? "bg-secondary text-white shadow-lg"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <FileText size={14} />
                      Manage Blog Articles ({blogs.length})
                    </button>
                    <button
                      onClick={() => {
                        setManagementMode("faqs");
                        setFormError("");
                        setSuccess(false);
                      }}
                      className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        managementMode === "faqs"
                          ? "bg-secondary text-white shadow-lg"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <FaqIcon size={14} />
                      Manage FAQ Database ({faqs.length})
                    </button>
                  </div>

                  {/* Mode-Based Content rendering */}
                  {managementMode === "blogs" ? (
                    /* BLOGS MANAGEMENT VIEW */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Compose and Preview */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-xl">
                          {/* Tab Switchers */}
                          <div className="flex flex-col sm:flex-row border-b border-white/10 bg-white/[0.02] p-2 gap-1 sm:gap-0">
                            <button
                              onClick={() => setActiveBlogTab("write")}
                              className={`flex items-center justify-center gap-1.5 px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                activeBlogTab === "write"
                                  ? "bg-secondary text-white shadow-md"
                                  : "text-white/50 hover:text-white"
                              }`}
                            >
                              <FileText size={14} />
                              Compose Article
                            </button>
                            <button
                              onClick={() => setActiveBlogTab("preview")}
                              className={`flex items-center justify-center gap-1.5 px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                activeBlogTab === "preview"
                                  ? "bg-secondary text-white shadow-md"
                                  : "text-white/50 hover:text-white"
                              }`}
                            >
                              <Eye size={14} />
                              Live Reader Preview
                            </button>
                          </div>

                          {/* Compose form */}
                          {activeBlogTab === "write" ? (
                            <form onSubmit={handlePublishBlog} className="p-8 space-y-6">
                              {success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-200 text-sm rounded-xl font-bold flex items-center gap-2">
                                  <CheckCircle size={18} className="text-green-500" />
                                  Blog article successfully uploaded and published!
                                </div>
                              )}

                              {formError && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-medium">
                                  {formError}
                                </div>
                              )}

                              {/* Title */}
                              <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                  Blog Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Step-by-Step Guide to MOCI Company Registration"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                                />
                              </div>

                              {/* Category & Intent */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                    Category
                                  </label>
                                  <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-secondary transition-all cursor-pointer"
                                  >
                                    {CATEGORIES.map((cat) => (
                                      <option key={cat} value={cat} className="bg-[#0b0f22] text-white">
                                        {cat}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                    Search Intent
                                  </label>
                                  <select
                                    value={intent}
                                    onChange={(e) => setIntent(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-secondary transition-all cursor-pointer"
                                  >
                                    {INTENTS.map((int) => (
                                      <option key={int} value={int} className="bg-[#0b0f22] text-white">
                                        {int}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Excerpt */}
                              <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                  Article Excerpt (Teaser Description)
                                </label>
                                <textarea
                                  rows={2}
                                  placeholder="Write a short summary (1-2 sentences) to entice readers on the catalog page."
                                  value={excerpt}
                                  onChange={(e) => setExcerpt(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all resize-none"
                                />
                              </div>

                              {/* Body Content */}
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                    Markdown Article Content
                                  </label>
                                  <span className="text-[10px] text-white/40 font-bold uppercase">
                                    Markdown is supported
                                  </span>
                                </div>
                                <textarea
                                  rows={12}
                                  placeholder={`Use # for main headers\nUse ## for secondary section titles\nUse - or * for list items\nUse **text** for bold details\nUse standard Markdown for tables (e.g. | Title | Info |)`}
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all font-mono"
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-xl shadow-secondary/15 cursor-pointer"
                              >
                                <Plus size={16} />
                                {loading ? "Publishing to Core System..." : "Publish & Upload Blog"}
                              </button>
                            </form>
                          ) : (
                            /* Preview pane */
                            <div className="p-8 space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar">
                              <span className="text-[10px] text-secondary font-black uppercase tracking-wider bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full inline-block">
                                {category} • {intent}
                              </span>
                              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight font-outfit mt-2">
                                {title || <span className="text-white/20 italic">Untitled Article</span>}
                              </h1>
                              {excerpt && (
                                <p className="text-white/80 text-sm font-bold border-l-2 border-secondary pl-4 italic">
                                  {excerpt}
                                </p>
                              )}
                              <hr className="border-white/10 my-4" />
                              <div className="prose prose-invert max-w-none text-white/80 font-medium">
                                {renderPreviewMarkdown(content)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Panel - Guidelines & List */}
                      <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-xl space-y-4">
                          <h3 className="text-white font-black text-sm uppercase tracking-wider border-b border-white/10 pb-2">
                            Formatting Cheat Sheet
                          </h3>
                          <div className="space-y-3 text-xs text-white/60 font-medium">
                            <div>
                              <span className="text-secondary font-mono">## Section Header</span>
                              <p className="mt-0.5">Creates a nice divider and secondary section title.</p>
                            </div>
                            <div>
                              <span className="text-secondary font-mono">**Important Note**</span>
                              <p className="mt-0.5">Renders bolded text for critical details.</p>
                            </div>
                            <div>
                              <span className="text-secondary font-mono">- Bullet Points</span>
                              <p className="mt-0.5">Renders as styled dot indicators in lists.</p>
                            </div>
                            <div>
                              <span className="text-secondary font-mono">| Item | Cost |</span>
                              <p className="mt-0.5">Creates a beautiful responsive pricing table.</p>
                            </div>
                          </div>
                        </div>

                        {/* List Manager */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-xl space-y-4">
                          <h3 className="text-white font-black text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
                            <span>Published Articles</span>
                            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">
                              {blogs.length}
                            </span>
                          </h3>

                          <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                            {blogs.length > 0 ? (
                              blogs.map((b) => (
                                <div
                                  key={b.id}
                                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-3 group"
                                >
                                  <div className="min-w-0">
                                    <h4 className="text-white text-xs font-black truncate leading-tight group-hover:text-secondary transition-colors">
                                      {b.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1 text-[9px] font-bold text-white/40 uppercase">
                                      <span className="truncate max-w-[80px]">{b.category}</span>
                                      <span>•</span>
                                      <span>{b.date}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <Link
                                      href={`/blog/${b.id}`}
                                      target="_blank"
                                      className="p-2 bg-white/5 hover:bg-secondary/15 border border-white/5 hover:border-secondary/25 text-white/70 hover:text-secondary rounded-lg transition-colors cursor-pointer"
                                      title="View Live"
                                    >
                                      <Eye size={12} />
                                    </Link>
                                    <button
                                      onClick={() => handleDeleteBlog(b.id)}
                                      className="p-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/25 text-red-200 rounded-lg transition-all cursor-pointer"
                                      title="Delete Article"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-white/30 text-xs">
                                <BookOpen className="mx-auto mb-2 opacity-50" size={32} />
                                No articles published yet.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* FAQS MANAGEMENT VIEW */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Compose FAQ */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] shadow-xl p-8 space-y-6">
                          <div className="border-b border-white/10 pb-4">
                            <h2 className="text-lg font-black text-white flex items-center gap-2">
                              <FaqIcon size={18} className="text-secondary" />
                              Publish New Frequently Asked Question
                            </h2>
                            <p className="text-white/40 text-xs mt-1">
                              Added FAQs will show up on both the homepage and the main FAQ support section.
                            </p>
                          </div>

                          <form onSubmit={handlePublishFAQ} className="space-y-6">
                            {success && (
                              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-200 text-sm rounded-xl font-bold flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-500" />
                                FAQ successfully added to the dynamic support catalog!
                              </div>
                            )}

                            {formError && (
                              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-medium">
                                {formError}
                              </div>
                            )}

                            {/* Question */}
                            <div className="space-y-2">
                              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                FAQ Question
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. What are the tax requirements for foreign startups in Qatar?"
                                value={faqQuestion}
                                onChange={(e) => setFaqQuestion(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                              />
                            </div>

                            {/* Answer */}
                            <div className="space-y-2">
                              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                FAQ Answer
                              </label>
                              <textarea
                                rows={6}
                                placeholder="Write the complete, detailed answer to address user queries."
                                value={faqAnswer}
                                onChange={(e) => setFaqAnswer(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-50 text-white py-4 rounded-xl font-black text-sm transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-xl shadow-secondary/15 cursor-pointer"
                            >
                              <Plus size={16} />
                              {loading ? "Adding to dynamic catalog..." : "Publish & Upload FAQ"}
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Right Panel - Current FAQs List Manager */}
                      <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-xl space-y-4">
                          <h3 className="text-white font-black text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
                            <span>Dynamic FAQ List</span>
                            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">
                              {faqs.length}
                            </span>
                          </h3>

                          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                            {faqs.length > 0 ? (
                              faqs.map((f) => (
                                <div
                                  key={f.id}
                                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-start justify-between gap-3 group"
                                >
                                  <div className="min-w-0">
                                    <h4 className="text-white text-xs font-black leading-snug group-hover:text-secondary transition-colors">
                                      {f.question}
                                    </h4>
                                    <p className="text-white/40 text-[10px] line-clamp-2 mt-1 font-medium leading-relaxed">
                                      {f.answer}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => handleDeleteFAQ(f.id)}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/25 text-red-200 rounded-lg transition-all cursor-pointer shrink-0"
                                    title="Delete FAQ"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-white/30 text-xs">
                                <BookOpen className="mx-auto mb-2 opacity-50" size={32} />
                                No FAQs uploaded yet.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
