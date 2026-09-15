import fs from "fs";
import path from "path";

const blogsPath = path.join(process.cwd(), "src/data/blogs.json");
const servicesPath = path.join(process.cwd(), "src/data/services.json");
const faqsPath = path.join(process.cwd(), "src/data/faqs.json");
const inquiriesPath = path.join(process.cwd(), "src/data/inquiries.json");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const isProduction = process.env.NODE_ENV === "production" || !!process.env.NETLIFY;

export function getDbStatus() {
  return {
    configured: isSupabaseConfigured,
    mode: isSupabaseConfigured ? "Supabase Cloud" : "Local JSON Files (Read-Only on Server)"
  };
}

// Helper function to call Supabase REST API (for reads via anon key)
async function supabaseFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    "apikey": SUPABASE_ANON_KEY!,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { 
    ...options, 
    headers,
    cache: "no-store"
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let parsedError;
    try {
      parsedError = JSON.parse(errorText);
    } catch {
      parsedError = { message: errorText };
    }
    throw new Error(parsedError.message || parsedError.hint || `Supabase Error: ${response.status}`);
  }

  // DELETE requests might return empty responses
  if (options.method === "DELETE" || response.status === 204) {
    return true;
  }

  return await response.json();
}

// Helper function to call Supabase REST API (for writes via service role key)
async function supabaseAdminFetch(endpoint: string, options: RequestInit = {}) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing in environment variables. Administrative writes are disabled.");
  }
  
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { 
    ...options, 
    headers,
    cache: "no-store"
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let parsedError;
    try {
      parsedError = JSON.parse(errorText);
    } catch {
      parsedError = { message: errorText };
    }
    throw new Error(parsedError.message || parsedError.hint || `Supabase Admin Error: ${response.status}`);
  }

  if (options.method === "DELETE" || response.status === 204) {
    return true;
  }

  return await response.json();
}

// Local JSON File Helper Functions (Fallback for local dev only)
function readJsonFile(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

function writeJsonFile(filePath: string, data: any[]) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error(`Error writing file ${filePath}:`, error);
    throw new Error(`Local write failed: ${error.message}`);
  }
}

// -------------------------------------------------------------
// BLOGS CRUD Interfaces
// -------------------------------------------------------------
export async function getBlogs(): Promise<any[]> {
  if (isSupabaseConfigured) {
    return await supabaseFetch("blogs?select=*&order=created_at.desc");
  }

  return [];
}

export async function getBlogById(id: string): Promise<any | null> {
  if (isSupabaseConfigured) {
    try {
      const data = await supabaseFetch(`blogs?id=eq.${id}&select=*`);
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error(`Supabase getBlogById(${id}) failed, falling back to local seed data:`, error);
      const blogs = readJsonFile(blogsPath);
      return blogs.find((b: any) => b.id === id) || null;
    }
  } else {
    const blogs = readJsonFile(blogsPath);
    return blogs.find((b: any) => b.id === id) || null;
  }
}

export async function insertBlog(blog: any): Promise<any> {
  if (isSupabaseConfigured) {
    // If it fails, throw directly to API handler (NO silent fallback)
    const data = await supabaseAdminFetch("blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Prefer": "return=representation",
      },
    });
    return data && data.length > 0 ? data[0] : blog;
  } else {
    if (isProduction) {
      throw new Error("Supabase database variables are missing. Local file writes are disabled in production.");
    }
    const blogs = readJsonFile(blogsPath);
    blogs.unshift(blog);
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(blogsPath, blogs);
    return blog;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      // 1. Fetch the blog to see if it has a cover image in Supabase storage
      const blog = await getBlogById(id);
      if (blog && blog.coverImage && blog.coverImage.includes("/blog-images/")) {
        const filename = blog.coverImage.split("/blog-images/").pop();
        if (filename) {
          const storageUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${filename}`;
          // 2. Delete the image file from the storage bucket
          await fetch(storageUrl, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
              "apikey": SUPABASE_ANON_KEY!
            }
          });
        }
      }
    } catch (err) {
      console.error("Failed to delete attached image from storage:", err);
      // We continue with row deletion even if image deletion fails (e.g., file already gone)
    }

    // 3. Delete the database row
    await supabaseAdminFetch(`blogs?id=eq.${id}`, {
      method: "DELETE",
    });
    return true;
  } else {
    if (isProduction) {
      throw new Error("Supabase database variables are missing. Local file writes are disabled in production.");
    }
    const blogs = readJsonFile(blogsPath);
    const initialLength = blogs.length;
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(blogsPath, filteredBlogs);
    return filteredBlogs.length !== initialLength;
  }
}

// -------------------------------------------------------------
// FAQS CRUD Interfaces
// -------------------------------------------------------------
export async function getFaqs(): Promise<any[]> {
  if (isSupabaseConfigured) {
    return await supabaseFetch("faqs?select=*&order=created_at.desc");
  }

  return [];
}

export async function insertFaq(faq: any): Promise<any> {
  if (isSupabaseConfigured) {
    const data = await supabaseAdminFetch("faqs", {
      method: "POST",
      body: JSON.stringify(faq),
      headers: {
        "Prefer": "return=representation",
      },
    });
    return data && data.length > 0 ? data[0] : faq;
  } else {
    if (isProduction) {
      throw new Error("Supabase database variables are missing. Local file writes are disabled in production.");
    }
    const faqs = readJsonFile(faqsPath);
    faqs.unshift(faq);
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(faqsPath, faqs);
    return faq;
  }
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    await supabaseAdminFetch(`faqs?id=eq.${id}`, {
      method: "DELETE",
    });
    return true;
  } else {
    if (isProduction) {
      throw new Error("Supabase database variables are missing. Local file writes are disabled in production.");
    }
    const faqs = readJsonFile(faqsPath);
    const initialLength = faqs.length;
    const filteredFaqs = faqs.filter((f: any) => f.id !== id);
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(faqsPath, filteredFaqs);
    return filteredFaqs.length !== initialLength;
  }
}

// -------------------------------------------------------------
// INQUIRIES Interfaces
// -------------------------------------------------------------
export async function insertInquiry(inquiry: any): Promise<any> {
  const timestamp = new Date().toISOString();
  const inquiryWithTime = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
    created_at: timestamp,
    ...inquiry
  };

  if (isSupabaseConfigured) {
    try {
      const data = await supabaseAdminFetch("inquiries", {
        method: "POST",
        body: JSON.stringify(inquiryWithTime),
        headers: {
          "Prefer": "return=representation",
        },
      });
      return data && data.length > 0 ? data[0] : inquiryWithTime;
    } catch (error) {
      console.error("Supabase insertInquiry failed, falling back to local file logging:", error);
      try {
        if (!isProduction) {
          const inquiries = readJsonFile(inquiriesPath);
          inquiries.unshift(inquiryWithTime);
          throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(inquiriesPath, inquiries);
        }
      } catch (err) {
        console.error("Failed to write inquiry to local fallback file:", err);
      }
      return inquiryWithTime;
    }
  } else {
    if (isProduction) {
      console.warn("Supabase database variables are missing. Inquiry was not saved to database.");
      return inquiryWithTime;
    }
    const inquiries = readJsonFile(inquiriesPath);
    inquiries.unshift(inquiryWithTime);
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(inquiriesPath, inquiries);
    return inquiryWithTime;
  }
}

// -------------------------------------------------------------
// SERVICES CRUD Interfaces
// -------------------------------------------------------------
export async function getServices(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      return await supabaseFetch("services?select=*&order=created_at.desc");
    } catch (e) {
      console.warn('Supabase getServices failed (table might not exist yet). Falling back to local services.json');
      return readJsonFile(servicesPath);
    }
  }
  return readJsonFile(servicesPath);
}

export async function getServiceById(id: string): Promise<any | null> {
  if (isSupabaseConfigured) {
    try {
      const data = await supabaseFetch(`services?id=eq.${id}&select=*`);
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error(`Supabase getServiceById(${id}) failed, falling back to local data:`, error);
      const services = readJsonFile(servicesPath);
      return services.find((s: any) => s.id === id || s.slug === id) || null;
    }
  } else {
    const services = readJsonFile(servicesPath);
    return services.find((s: any) => s.id === id || s.slug === id) || null;
  }
}

export async function insertService(service: any): Promise<any> {
  if (isSupabaseConfigured) {
    const data = await supabaseAdminFetch('services', {
      method: 'POST',
      body: JSON.stringify(service),
      headers: {
        'Prefer': 'return=representation',
      },
    });
    return data && data.length > 0 ? data[0] : service;
  } else {
    if (isProduction) {
      throw new Error('Supabase database variables are missing. Local file writes are disabled in production.');
    }
    const services = readJsonFile(servicesPath);
    
    // Check for upsert
    const existingIndex = services.findIndex((s: any) => s.id === service.id);
    if (existingIndex >= 0) {
      services[existingIndex] = { ...services[existingIndex], ...service };
    } else {
      services.unshift(service);
    }
    throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(servicesPath, services);
    return service;
  }
}

export async function updateService(id: string, updates: any): Promise<any> {
  if (isSupabaseConfigured) {
    const data = await supabaseAdminFetch(`services?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        'Prefer': 'return=representation',
      },
    });
    return data && data.length > 0 ? data[0] : null;
  } else {
    if (isProduction) {
      throw new Error('Supabase database variables are missing. Local file writes are disabled in production.');
    }
    const services = readJsonFile(servicesPath);
    const index = services.findIndex((s: any) => s.id === id);
    if (index >= 0) {
      services[index] = { ...services[index], ...updates };
      throw new Error("Writes to local JSON files are disabled by Phase 3 rules."); // writeJsonFile(servicesPath, services);
      return services[index];
    }
    return null;
  }
}


export async function updateBlog(id: string, updates: any): Promise<any> {
  if (isSupabaseConfigured) {
    const data = await supabaseAdminFetch(`blogs?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: {
        'Prefer': 'return=representation',
      },
    });
    return data && data.length > 0 ? data[0] : null;
  } else {
    throw new Error('Writes to local JSON files are disabled by Phase 3 rules.');
  }
}


export async function getSitemapBlogs(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      return await supabaseFetch("blogs?select=slug,updated_date,published_date,date,created_at&order=created_at.desc");
    } catch (e) {
      console.warn("getSitemapBlogs failed", e);
    }
  }
  return [];
}

export async function getSitemapServices(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      return await supabaseFetch("services?select=slug,updated_date,published_date,created_at&order=created_at.desc");
    } catch (e) {
      console.warn("getSitemapServices failed", e);
    }
  }
  return [];
}


export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    await supabaseAdminFetch(`services?id=eq.${id}`, {
      method: "DELETE",
    });
    return true;
  } else {
    // Local fallback
    const services = await getServices();
    const filtered = services.filter((s: any) => s.id !== id);
    if (services.length === filtered.length) return false;
    
    // Save to local file
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "src", "data", "services.json");
      await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
      return true;
    } catch (error) {
      console.error("Failed to delete local service:", error);
      return false;
    }
  }
}
