"use client";

import { Briefcase } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Lock, 
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
, Link as LinkIcon, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  intent: string;
  targetLocation?: string;
  coverImage?: string;
  date: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const CATEGORIES = ["Company Formation", "Foreign Ownership", "PRO & Compliance", "Visas & Immigration", "Finance & Tech"];
const INTENTS = [
  "Informational",
  "Commercial Investigation",
  "Transactional / Lead Generation",
  "Navigational / Branded"
];
const TARGET_LOCATIONS = ["", "Qatar", "Doha", "GCC", "Saudi Arabia", "UAE", "International", "Best setup"];


function InternalLinkModal({ isOpen, onClose, onSelect }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorText, setAnchorText] = useState("");
  const [selectedTarget, setSelectedTarget] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setAnchorText("");
      setSelectedTarget(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && isOpen) {
        setLoading(true);
        const res = await fetch('/api/admin/search-links', {
          credentials: 'include',
          headers: { "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz" }
        });
        if (res.ok) setResults(await res.json());
        setLoading(false);
        return;
      }
      if (query.length < 2) return;
      setLoading(true);
      const res = await fetch(`/api/admin/search-links?q=${encodeURIComponent(query)}`, {
          credentials: 'include',
          headers: { "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz" }
        });
      if (res.ok) setResults(await res.json());
      setLoading(false);
    };
    
    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0b0f22] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-white font-bold flex items-center gap-2">
            <LinkIcon size={18} className="text-secondary" />
            Insert Internal Link
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white"><X size={20} /></button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          {!selectedTarget ? (
            <>
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search blogs or services..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                />
              </div>
              
              {loading && <p className="text-white/50 text-sm text-center py-8">Searching...</p>}
              
              {!loading && results.length > 0 && (
                <div className="space-y-2">
                  {results.map((r) => (
                    <button
                      key={`${r.type}-${r.id}`}
                      onClick={() => setSelectedTarget(r)}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex flex-col"
                    >
                      <span className="text-white font-bold text-sm">{r.title}</span>
                      <span className="text-white/40 text-xs flex gap-2 mt-1">
                        <span className="text-secondary font-medium">[{r.type}]</span>
                        <span>/{r.type === 'BLOG' ? 'blog' : 'services'}/{r.slug}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">Target</p>
                <p className="text-white font-medium text-sm">{selectedTarget.title}</p>
                <button onClick={() => setSelectedTarget(null)} className="text-secondary text-xs mt-2 hover:underline">Change Target</button>
              </div>
              
              <div>
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Anchor Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Company Formation"
                  value={anchorText}
                  onChange={(e) => setAnchorText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all"
                  autoFocus
                />
              </div>
              
              <button
                onClick={() => onSelect(selectedTarget, anchorText)}
                disabled={!anchorText.trim()}
                className="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-50 text-white py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2"
              >
                Insert Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Portal View Selector (Blogs vs FAQs)
  const [managementMode, setManagementMode] = useState<"blogs" | "faqs" | "services">("blogs");
  const [services, setServices] = useState<any[]>([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceSectionsText, setServiceSectionsText] = useState("");

  // Blog Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [intent, setIntent] = useState(INTENTS[0]);
  const [targetLocation, setTargetLocation] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

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
  const [dbStatus, setDbStatus] = useState<{ configured: boolean; mode: string } | null>(null);

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
        // Fetch database status
        try {
          const statusRes = await fetch("/api/status", { cache: "no-store" });
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            setDbStatus(statusData);
          }
        } catch (dbErr) {
          console.error("Failed to fetch database status", dbErr);
        }

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

        // Fetch services
        const servicesRes = await fetch("/api/services", { cache: "no-store" });
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
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
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("trek_admin_auth");
    setIsLoggedIn(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      setCoverImage(data.url);
    } catch (err: any) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
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
          credentials: "include",
          method: "POST",
          headers: {
            "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          intent,
          targetLocation,
          coverImage,
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
      setTargetLocation("");
      setCoverImage("");
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
          credentials: "include",
          headers: { "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz" }
        });

      if (res.ok) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        const errorData = await res.json();
        alert(`Failed to delete article: ${errorData.error || "Server error"}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`An error occurred while deleting: ${err.message}`);
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
          credentials: "include",
          method: "POST",
          headers: {
            "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz",
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
  
  const handlePublishService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceSlug || !serviceDescription) {
      setFormError("Title, Slug, and Description are required.");
      return;
    }
    setLoading(true);
    setFormError("");
    setSuccess(false);

    try {
      let parsedSections = {};
      try {
        if (serviceSectionsText) parsedSections = JSON.parse(serviceSectionsText);
      } catch(e) {
        // Fallback if not valid JSON
        parsedSections = { "Overview": serviceSectionsText };
      }

      const payload = {
        id: serviceSlug,
        slug: serviceSlug,
        title: serviceTitle,
        description: serviceDescription,
        sections: parsedSections,
        seo_title: serviceTitle,
        meta_description: serviceDescription
      };

      const res = await fetch("/api/services", {
        credentials: "include",
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz"
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setServiceTitle("");
        setServiceSlug("");
        setServiceDescription("");
        setServiceSectionsText("");
        
        // refresh services
        fetch('/api/services').then(r => r.json()).then(data => setServices(data || []));
      } else {
        const errorData = await res.json();
        setFormError(errorData.error || "Failed to add service");
      }
    } catch (err: any) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { 
        method: "DELETE", 
        credentials: "include", 
        headers: { "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz" } 
      });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      } else {
        const errorData = await res.json();
        alert(`Failed to delete service: ${errorData.error || "Server error"}`);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/faqs/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Authorization": "Basic YWRtaW46dHJla2FkbWluMTIz" }
        });

      if (res.ok) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        const errorData = await res.json();
        alert(`Failed to delete FAQ: ${errorData.error || "Server error"}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`An error occurred while deleting: ${err.message}`);
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

                  {/* Database Connection Diagnostics Status Bar */}
                  {dbStatus && (
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between text-xs font-black uppercase tracking-wider gap-2 ${
                      dbStatus.configured 
                        ? "bg-green-500/10 border-green-500/20 text-green-400" 
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${dbStatus.configured ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                        <span>Database Status: {dbStatus.mode}</span>
                      </div>
                      {!dbStatus.configured && (
                        <span className="text-[10px] text-red-400/80 lowercase normal-case font-medium">
                          (Please configure SUPABASE_URL and SUPABASE_ANON_KEY variables in Netlify settings)
                        </span>
                      )}
                    </div>
                  )}

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
                    <button
                      onClick={() => {
                        setManagementMode("services");
                        setFormError("");
                        setSuccess(false);
                      }}
                      className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        managementMode === "services"
                          ? "bg-secondary text-white shadow-lg"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Briefcase size={14} />
                      Manage Services ({services.length})
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

                              {/* Cover Image Upload */}
                              <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                  Cover Image (Optional)
                                </label>
                                <div className="flex items-center gap-4">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-white/60
                                      file:mr-4 file:py-2.5 file:px-4
                                      file:rounded-xl file:border-0
                                      file:text-xs file:font-black
                                      file:bg-secondary/10 file:text-secondary
                                      hover:file:bg-secondary/20 transition-all cursor-pointer bg-white/5 border border-white/10 rounded-xl p-1.5"
                                  />
                                  {uploadingImage && (
                                    <span className="text-xs text-secondary animate-pulse shrink-0 font-bold">Uploading...</span>
                                  )}
                                </div>
                                {coverImage && (
                                  <div className="mt-4 relative rounded-xl overflow-hidden border border-white/10 w-full max-w-md aspect-video">
                                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
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

                                <div className="space-y-2">
                                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                    Target Location (Optional)
                                  </label>
                                  <select
                                    value={targetLocation}
                                    onChange={(e) => setTargetLocation(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-secondary transition-all cursor-pointer"
                                  >
                                    {TARGET_LOCATIONS.map((loc, idx) => (
                                      <option key={idx} value={loc} className="bg-[#0b0f22] text-white">
                                        {loc === "" ? "None (Optional)" : loc}
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
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                      Markdown Article Content
                                    </label>
                                    <button 
                                      type="button" 
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setIsLinkModalOpen(true);
                                      }}
                                      className="text-xs text-secondary hover:text-white transition-colors flex items-center gap-1 font-bold"
                                    >
                                      <LinkIcon size={14} />
                                      Insert Internal Link
                                    </button>
                                  </div>
                                <textarea
                                  rows={12}
                                  placeholder={`Use # for main headers\nUse ## for secondary section titles\nUse - or * for list items\nUse **text** for bold details\nUse standard Markdown for tables (e.g. | Title | Info |)`}
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                    ref={contentRef}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary transition-all font-mono"
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={loading || uploadingImage}
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
                              {coverImage && (
                                <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 mt-6 mb-8">
                                  <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
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
                  
                  ) : managementMode === "services" ? (
                    /* SERVICES MANAGEMENT VIEW */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Compose Service */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] shadow-xl p-8 space-y-6">
                          <div className="border-b border-white/10 pb-4">
                            <h2 className="text-lg font-black text-white flex items-center gap-2">
                              <Briefcase size={18} className="text-secondary" />
                              Publish New Service
                            </h2>
                            <p className="text-white/40 text-xs mt-1">
                              Styling (colors/icons) and SEO metadata are generated automatically from your content.
                            </p>
                          </div>

                          <form onSubmit={handlePublishService} className="space-y-6">
                            {success && (
                              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-200 text-sm rounded-xl font-bold flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-500" />
                                Service successfully added to the catalog!
                              </div>
                            )}

                            {formError && (
                              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl font-medium">
                                {formError}
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Service Title</label>
                                <input type="text" placeholder="e.g. Company Formation" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">URL Slug</label>
                                <input type="text" placeholder="e.g. company-formation" value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Short Description</label>
                              <textarea rows={2} placeholder="Brief summary for service cards..." value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all" />
                            </div>

                            <div className="space-y-2">
                              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Full Content (Sections)</label>
                              <textarea rows={6} placeholder="Detailed content for the service page (can be JSON or plain text)..." value={serviceSectionsText} onChange={(e) => setServiceSectionsText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all" />
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50">
                              <Plus size={16} />
                              {loading ? "Publishing Service..." : "Publish & Upload Service"}
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Right Panel - Current Services List */}
                      <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-xl space-y-4">
                          <h3 className="text-white font-black text-sm uppercase flex items-center justify-between border-b border-white/10 pb-2">
                            <span>Dynamic Services List</span>
                            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">{services.length}</span>
                          </h3>
                          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                            {services.length > 0 ? (
                              services.map((s) => (
                                <div key={s.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3 group">
                                  <div className="min-w-0">
                                    <h4 className="text-white text-xs font-black leading-snug group-hover:text-secondary truncate">{s.title}</h4>
                                    <p className="text-white/40 text-[10px] line-clamp-2 mt-1">{s.description}</p>
                                  </div>
                                  <button onClick={(e) => { e.preventDefault(); handleDeleteService(s.id); }} className="p-2 bg-red-500/10 hover:bg-red-500/25 text-red-200 rounded-lg shrink-0" title="Delete Service">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8 text-white/30 text-xs">
                                <Briefcase className="mx-auto mb-2 opacity-50" size={32} />
                                No services published yet.
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

        
        <InternalLinkModal 
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          onSelect={(target: any, anchor: string) => {
            const isBlog = target.type === 'BLOG';
            const basePath = isBlog ? '/blog' : '/services';
            const shortcode = `[${anchor}](${basePath}/${target.slug})`;
            
            const textarea = contentRef.current;
            if (textarea) {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const newContent = content.substring(0, start) + shortcode + content.substring(end);
              setContent(newContent);
              
              setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + shortcode.length, start + shortcode.length);
              }, 10);
            } else {
              setContent(content + shortcode);
            }
            setIsLinkModalOpen(false);
          }}
        />
        <Footer />

      </div>
    </main>
  );
}
