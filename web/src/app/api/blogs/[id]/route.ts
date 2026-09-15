export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getBlogById, deleteBlog, updateBlog, getBlogs } from "@/lib/db";

const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  return authHeader === ADMIN_CREDENTIALS;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const blog = await getBlogById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blog post: " + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: any) {
    const isAuth = await verifyAuth();
  const authHeader = request.headers.get("authorization");
  const isBasicAuth = authHeader === ADMIN_CREDENTIALS;
  if (!isAuth && !isBasicAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    

    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const body = await request.json();
    
    // Slug validation
    if (body.slug) {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(body.slug)) {
        return NextResponse.json({ error: "Slug must be lowercase, URL-safe, and hyphen-separated." }, { status: 400 });
      }
      
      const allBlogs = await getBlogs();
      const duplicate = allBlogs.find((b: any) => (b.slug === body.slug || b.id === body.slug) && b.id !== id);
      if (duplicate) {
        return NextResponse.json({ error: "Slug is already in use by another blog post." }, { status: 400 });
      }
    }

    // Set updated_date to now
    body.updated_date = new Date().toISOString();

    const updatedBlog = await updateBlog(id, body);

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog post not found or update failed" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error("Error in PATCH /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update blog post: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: any) {
    const isAuth = await verifyAuth();
  const authHeader = request.headers.get("authorization");
  const isBasicAuth = authHeader === ADMIN_CREDENTIALS;
  if (!isAuth && !isBasicAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    

    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const success = await deleteBlog(id);

    if (!success) {
      return NextResponse.json({ error: "Blog post not found or delete failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete blog post: " + error.message },
      { status: 500 }
    );
  }
}
