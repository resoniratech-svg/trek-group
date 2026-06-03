import { NextResponse } from "next/server";
import { getBlogById, deleteBlog } from "@/lib/db";

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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
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
