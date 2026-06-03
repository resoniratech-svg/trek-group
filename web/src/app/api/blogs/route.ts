import { NextResponse } from "next/server";
import { getBlogs, insertBlog } from "@/lib/db";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, intent } = body;

    // Simple validation
    if (!title || !content || !excerpt || !category || !intent) {
      return NextResponse.json(
        { error: "Title, excerpt, content, category, and intent are required fields." },
        { status: 400 }
      );
    }

    const blogs = await getBlogs();
    
    // Create unique slug ID from title
    let id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // De-duplicate ID
    let finalId = id;
    let counter = 1;
    while (blogs.some((blog: any) => blog.id === finalId)) {
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
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
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
