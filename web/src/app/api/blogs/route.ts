import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/blogs.json");

// Helper function to read data
function readBlogs() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Ensure the directory exists
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading blogs data file:", error);
    return [];
  }
}

// Helper function to write data
function writeBlogs(data: any[]) {
  try {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing blogs data file:", error);
  }
}

export async function GET() {
  const blogs = readBlogs();
  return NextResponse.json(blogs);
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

    const blogs = readBlogs();
    
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

    // Prepend new blog to the array
    blogs.unshift(newBlog);
    writeBlogs(blogs);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/blogs:", error);
    return NextResponse.json(
      { error: "Failed to create blog post. " + error.message },
      { status: 500 }
    );
  }
}
