export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getServiceById, updateService, getServices, deleteService } from "@/lib/db";

const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");



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
    
    if (body.slug) {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(body.slug)) {
        return NextResponse.json({ error: "Slug must be lowercase, URL-safe, and hyphen-separated." }, { status: 400 });
      }
      
      const allServices = await getServices();
      const duplicate = allServices.find((s: any) => (s.slug === body.slug || s.id === body.slug) && s.id !== id);
      if (duplicate) {
        return NextResponse.json({ error: "Slug is already in use by another service." }, { status: 400 });
      }
    }

    body.updated_date = new Date().toISOString();

    const updatedService = await updateService(id, body);

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found or update failed" }, { status: 404 });
    }

    return NextResponse.json(updatedService);
  } catch (error: any) {
    console.error("Error in PATCH /api/services/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update service: " + error.message },
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
    const success = await deleteService(id);
    if (!success) {
      return NextResponse.json({ error: "Service not found or failed to delete" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    console.error("Error in DELETE /api/services/[id]:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
