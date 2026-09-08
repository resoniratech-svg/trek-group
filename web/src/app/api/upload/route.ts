import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: "Database credentials are not configured on the server." },
        { status: 500 }
      );
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeName = file.name ? file.name.replace(/[^a-zA-Z0-9.-]/g, "_") : "upload.jpg";
    const filename = `${uniqueSuffix}-${safeName}`;
    
    // 1. Upload directly to Supabase Storage via REST API
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${filename}`;
    const supabaseRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!supabaseRes.ok) {
      const errBody = await supabaseRes.text();
      throw new Error(`Supabase rejected upload: ${errBody}`);
    }

    // 2. Construct the permanent public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/blog-images/${filename}`;

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file. " + error.message },
      { status: 500 }
    );
  }
}
