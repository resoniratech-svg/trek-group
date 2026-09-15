export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getServices, insertService } from "@/lib/db";

const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");




export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error: any) {
    console.error("Error in GET /api/services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services: " + error.message },
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
      id, title, description, icon, color, lightColor, textColor, 
      metaTitle, metaDescription, keywords, sections, schemaMarkup,
      seo_title, meta_description, slug, canonical_url, image_alt, og_image, published_date, updated_date
    } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: "ID, Title, and Description are required fields." },
        { status: 400 }
      );
    }

    let finalSlug = slug || id;
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(finalSlug)) {
      return NextResponse.json({ error: "Slug must be lowercase, URL-safe, and hyphen-separated." }, { status: 400 });
    }

    const services = await getServices();
    
    if (services.some((s: any) => s.id === id)) {
      return NextResponse.json({ error: "Service ID must be unique." }, { status: 400 });
    }
    if (services.some((s: any) => s.slug === finalSlug)) {
      return NextResponse.json({ error: "Service Slug must be unique." }, { status: 400 });
    }

    const newService = {
      id,
      title,
      description,
      icon: icon || "FileText",
      color: color || "bg-blue-500",
      lightColor: lightColor || "bg-blue-500/10",
      textColor: textColor || "text-blue-500",
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      keywords: keywords || [],
      sections: sections || {},
      schemaMarkup: schemaMarkup || {},
      seo_title: seo_title || "",
      meta_description: meta_description || "",
      slug: finalSlug,
      canonical_url: canonical_url || "",
      image_alt: image_alt || "",
      og_image: og_image || "",
      published_date: published_date || new Date().toISOString(),
      updated_date: updated_date || new Date().toISOString(),
    };

    const insertedService = await insertService(newService);
    return NextResponse.json(insertedService, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/services:", error);
    return NextResponse.json(
      { error: "Failed to create service. " + error.message },
      { status: 500 }
    );
  }
}
