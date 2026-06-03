import { NextResponse } from "next/server";
import { deleteFaq } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
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
