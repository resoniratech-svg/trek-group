export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getBlogs, insertBlog } from "@/lib/db";

// Simple hardcoded auth based on the frontend admin page
const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  return authHeader === ADMIN_CREDENTIALS;
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: any) {
    const isAuth = await verifyAuth();
  const authHeader = request.headers.get("authorization");
  const isBasicAuth = authHeader === ADMIN_CREDENTIALS;
  if (!isAuth && !isBasicAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    

    const body = await request.json();
    const { 
      title, excerpt, content, category, intent, targetLocation, coverImage,
      seo_title, meta_description, slug, canonical_url, image_alt, og_image, published_date, updated_date
    } = body;

    // Simple validation
    if (!title || !content || !excerpt || !category || !intent) {
      return NextResponse.json(
        { error: "Title, excerpt, content, category, and intent are required fields." },
        { status: 400 }
      );
    }

    const blogs = await getBlogs();
    
    // Create unique slug ID from title if slug not provided
    let id = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // De-duplicate ID/slug
    let finalId = id;
    let counter = 1;
    while (blogs.some((blog: any) => blog.id === finalId || blog.slug === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    const newBlog = {
      id: finalId,
      title,
      excerpt,
      content,
      category,
      intent,
      targetLocation: targetLocation || "",
      coverImage: coverImage || null,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      seo_title: seo_title || "",
      meta_description: meta_description || "",
      slug: finalId, // Must match finalId
      canonical_url: canonical_url || "",
      image_alt: image_alt || "",
      og_image: og_image || "",
      published_date: published_date || new Date().toISOString(),
      updated_date: updated_date || new Date().toISOString(),
    };

    const insertedBlog = await insertBlog(newBlog);
    return NextResponse.json(insertedBlog, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/blogs:", error);
    return NextResponse.json(
      { error: "Failed to create blog post. " + error.message },
      { status: 500 }
    );
  }
}
