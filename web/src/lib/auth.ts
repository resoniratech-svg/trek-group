import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs";
import path from "path";

function logDebug(msg: string) {
  try {
    fs.appendFileSync(path.join(process.cwd(), "auth-debug.log"), new Date().toISOString() + " - " + msg + "\n");
  } catch (e) {}
}

const SESSION_SECRET = process.env.SESSION_SECRET || "fallback_secret_do_not_use_in_prod";

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("trek_admin_session")?.value;

  if (!token) { logDebug("No token found"); return false; }

  try {
    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) { logDebug("Invalid parts"); return false; }

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("hex");

    if (signature !== expectedSignature) { logDebug("Signature mismatch. Token sig: " + signature + " Expected: " + expectedSignature); return false; }

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      logDebug("Token expired. Exp: " + payload.exp + " Now: " + Date.now());
      return false;
    }

    const roleMatch = payload.role === "admin";
    if (!roleMatch) logDebug("Role mismatch: " + payload.role);
    else logDebug("Auth success!");
    return roleMatch;
  } catch (e: any) {
    logDebug("Exception: " + e.message);
    return false;
  }
}

export function createSessionToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("hex");
    
  return `${payloadBase64}.${signature}`;
}
