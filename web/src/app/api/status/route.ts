export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDbStatus } from "@/lib/db";

export async function GET() {
  try {
    const status = getDbStatus();
    return NextResponse.json(status);
  } catch (error: any) {
    return NextResponse.json(
      { configured: false, error: error.message },
      { status: 500 }
    );
  }
}
