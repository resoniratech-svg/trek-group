import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/faqs.json");

// Helper function to read data
function readFaqs() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading faqs data file:", error);
    return [];
  }
}

// Helper function to write data
function writeFaqs(data: any[]) {
  try {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing faqs data file:", error);
  }
}

export async function GET() {
  const faqs = readFaqs();
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    // Simple validation
    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required fields." },
        { status: 400 }
      );
    }

    const faqs = readFaqs();
    
    // Generate unique slug-like ID from question
    let id = question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    if (id.length > 50) {
      id = id.slice(0, 50);
    }
    
    // De-duplicate ID
    let finalId = id;
    let counter = 1;
    while (faqs.some((faq: any) => faq.id === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    const newFaq = {
      id: finalId,
      question,
      answer,
    };

    // Prepend new FAQ to the array
    faqs.unshift(newFaq);
    writeFaqs(faqs);

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/faqs:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ item. " + error.message },
      { status: 500 }
    );
  }
}
