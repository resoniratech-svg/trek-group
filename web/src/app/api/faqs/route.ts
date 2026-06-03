export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getFaqs, insertFaq } from "@/lib/db";

export async function GET() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch FAQ items: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required fields." },
        { status: 400 }
      );
    }

    const faqs = await getFaqs();

    let id = question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (id.length > 50) {
      id = id.slice(0, 50);
    }

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

    const insertedFaq = await insertFaq(newFaq);

    return NextResponse.json(insertedFaq, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/faqs:", error);

    return NextResponse.json(
      { error: "Failed to create FAQ item. " + error.message },
      { status: 500 }
    );
  }
}