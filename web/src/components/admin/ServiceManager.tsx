"use client";

import { useState, useEffect } from "react";
import { Edit3, CheckCircle, Tag, Settings, Layout, X } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
  textColor: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: any;
  schemaMarkup: any;
  seo_title?: string;
  meta_description?: string;
  slug?: string;
  canonical_url?: string;
  image_alt?: string;
  og_image?: string;
  published_date?: string;
  updated_date?: string;
}

export default function ServiceManager() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<ServiceData>>({});
  const [sectionsStr, setSectionsStr] = useState("");
  const [schemaStr, setSchemaStr] = useState("");
  const [keywordsStr, setKeywordsStr] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (e) {
      console.error("Failed to load services", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: ServiceData) => {
    setEditingId(service.id);
    setFormData(service);
    setSectionsStr(JSON.stringify(service.sections, null, 2));
    setSchemaStr(JSON.stringify(service.schemaMarkup, null, 2));
    setKeywordsStr(service.keywords ? service.keywords.join(", ") : "");
    setFormError("");
    setFormSuccess("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setSaving(true);

    try {
      const parsedSections = JSON.parse(sectionsStr || "{}");
      const parsedSchema = JSON.parse(schemaStr || "{}");
      const parsedKeywords = keywordsStr.split(",").map(k => k.trim()).filter(Boolean);

      const payload = {
        ...formData,
        sections: parsedSections,
        schemaMarkup: parsedSchema,
        keywords: parsedKeywords
      };

      const res = await fetch(`/api/services/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          /* removed basic auth */
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update service");
      }

      setFormSuccess("Service updated successfully!");
      fetchServices();
      setTimeout(() => {
        setFormSuccess("");
        setEditingId(null);
      }, 2000);
    } catch (e: any) {
      setFormError(e.message || "Invalid JSON in Sections or Schema Markup, or server error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white/50 text-center py-12">Loading Services...</div>;
  }

  if (editingId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative"
      >
        <button 
          onClick={handleCancel}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black text-white mb-6 font-outfit flex items-center gap-2">
          <Settings className="text-secondary" />
          Edit Service: {formData.title}
        </h2>

        {formError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-xl">
            {formError}
          </div>
        )}
        {formSuccess && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-200 text-sm rounded-xl flex items-center gap-2">
            <CheckCircle size={16} /> {formSuccess}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Service Title</label>
              <input
                type="text"
                required
                value={formData.title || ""}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Icon Name (Lucide)</label>
              <input
                type="text"
                required
                value={formData.icon || ""}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Description</label>
            <textarea
              required
              value={formData.description || ""}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white h-24 resize-none focus:border-secondary transition-all"
            />
          </div>

          {/* SEO SETTINGS SECTION */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Tag className="text-secondary" size={16} />
              SEO SETTINGS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">SEO Title (50-60 chars)</label>
                <input
                  type="text"
                  value={formData.seo_title || ""}
                  onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-secondary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-secondary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Meta Description (150-160 chars)</label>
              <textarea
                value={formData.meta_description || ""}
                onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white h-20 resize-none focus:border-secondary transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Canonical URL</label>
                <input
                  type="url"
                  value={formData.canonical_url || ""}
                  onChange={(e) => setFormData({...formData, canonical_url: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-secondary transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Image Alt Text</label>
                <input
                  type="text"
                  value={formData.image_alt || ""}
                  onChange={(e) => setFormData({...formData, image_alt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-secondary transition-all"
                />
              </div>
            </div>
          </div>

          {/* ADVANCED SECTION */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Layout className="text-secondary" size={16} />
              ADVANCED DATA (JSON)
            </h3>
            
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Sections Data (Valid JSON)</label>
              <textarea
                value={sectionsStr}
                onChange={(e) => setSectionsStr(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono h-48 focus:border-secondary transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-wider mb-2">Schema Markup (Valid JSON)</label>
              <textarea
                value={schemaStr}
                onChange={(e) => setSchemaStr(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono h-48 focus:border-secondary transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              {saving ? "Saving..." : <><CheckCircle size={16} /> Save Changes</>}
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white font-outfit">Service Pages</h2>
          <p className="text-white/50 text-sm mt-1">Manage all {services.length} core business services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between group hover:bg-white/10 transition-colors">
            <div>
              <h3 className="font-bold text-white mb-2 line-clamp-1">{service.title}</h3>
              <p className="text-white/50 text-xs line-clamp-2">{service.description}</p>
              
              <div className="mt-4 flex gap-2">
                {service.slug ? (
                  <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">SEO Ready</span>
                ) : (
                  <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Pending SEO</span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleEdit(service)}
              className="mt-6 w-full py-2.5 rounded-xl border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 group-hover:border-secondary group-hover:text-secondary transition-colors cursor-pointer"
            >
              <Edit3 size={14} /> Edit Service
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
