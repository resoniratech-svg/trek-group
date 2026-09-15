export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
const ADMIN_CREDENTIALS = "Basic " + Buffer.from("admin:trekadmin123").toString("base64");
import { deleteFaq } from "@/lib/db";

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
    
    const success = await deleteFaq(id);

    if (!success) {
      return NextResponse.json({ error: "FAQ item not found or delete failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete FAQ item: " + error.message },
      { status: 500 }
    );
  }
}
