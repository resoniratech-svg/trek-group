import fs from "fs";
import path from "path";

const blogsPath = path.join(process.cwd(), "src/data/blogs.json");
const faqsPath = path.join(process.cwd(), "src/data/faqs.json");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const isProduction = process.env.NODE_ENV === "production" || !!process.env.NETLIFY;

export function getDbStatus() {
  return {
    configured: isSupabaseConfigured,
    mode: isSupabaseConfigured ? "Supabase Cloud" : "Local JSON Files (Read-Only on Server)"
  };
}

// Helper function to call Supabase REST API
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
    try {
      return await supabaseFetch("blogs?select=*&order=created_at.desc");
    } catch (error) {
      console.error("Supabase getBlogs failed, falling back to local seed data:", error);
      return readJsonFile(blogsPath);
    }
  } else {
    return readJsonFile(blogsPath);
  }
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
    const data = await supabaseFetch("blogs", {
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
    writeJsonFile(blogsPath, blogs);
    return blog;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    await supabaseFetch(`blogs?id=eq.${id}`, {
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
    writeJsonFile(blogsPath, filteredBlogs);
    return filteredBlogs.length !== initialLength;
  }
}

// -------------------------------------------------------------
// FAQS CRUD Interfaces
// -------------------------------------------------------------
export async function getFaqs(): Promise<any[]> {
  if (isSupabaseConfigured) {
    try {
      return await supabaseFetch("faqs?select=*&order=created_at.desc");
    } catch (error) {
      console.error("Supabase getFaqs failed, falling back to local seed data:", error);
      return readJsonFile(faqsPath);
    }
  } else {
    return readJsonFile(faqsPath);
  }
}

export async function insertFaq(faq: any): Promise<any> {
  if (isSupabaseConfigured) {
    const data = await supabaseFetch("faqs", {
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
    writeJsonFile(faqsPath, faqs);
    return faq;
  }
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    await supabaseFetch(`faqs?id=eq.${id}`, {
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
    writeJsonFile(faqsPath, filteredFaqs);
    return filteredFaqs.length !== initialLength;
  }
}
