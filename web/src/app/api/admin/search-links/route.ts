import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getBlogs, getServices } from "@/lib/db";

export async function GET(request: Request) {
  const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");
  
  const isAuth = await verifyAuth();
  const authHeader = request.headers.get("authorization");
  const isBasicAuth = authHeader === ADMIN_CREDENTIALS;
  
  if (!isAuth && !isBasicAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  // 2. Fetch lightweight metadata
  const allBlogs = await getBlogs();
  const allServices = await getServices();

  const results = [];

  for (const b of allBlogs) {
    if (!q || b.title.toLowerCase().includes(q) || (b.slug || b.id).toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)) {
      results.push({
        type: 'BLOG',
        id: b.id,
        title: b.title,
        slug: b.slug || b.id,
        category: b.category || 'Blog'
      });
    }
  }

  for (const s of allServices) {
    if (!q || s.title.toLowerCase().includes(q) || (s.slug || s.id).toLowerCase().includes(q)) {
      results.push({
        type: 'SERVICE',
        id: s.id,
        title: s.title,
        slug: s.slug || s.id,
        category: 'Service'
      });
    }
  }

  return NextResponse.json(results);
}
