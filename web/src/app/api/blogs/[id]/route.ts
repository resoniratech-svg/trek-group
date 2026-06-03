import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/blogs.json");

function readBlogs() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const blogs = readBlogs();
    const blog = blogs.find((b: any) => b.id === id);

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
    
    const blogs = readBlogs();
    const initialLength = blogs.length;
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);

    if (filteredBlogs.length === initialLength) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Write back to database
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredBlogs, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete blog post: " + error.message },
      { status: 500 }
    );
  }
}
