import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/faqs.json");

function readFaqs() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    const faqs = readFaqs();
    const initialLength = faqs.length;
    const filteredFaqs = faqs.filter((f: any) => f.id !== id);

    if (filteredFaqs.length === initialLength) {
      return NextResponse.json({ error: "FAQ item not found" }, { status: 404 });
    }

    // Write back to database
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredFaqs, null, 2));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete FAQ item: " + error.message },
      { status: 500 }
    );
  }
}
