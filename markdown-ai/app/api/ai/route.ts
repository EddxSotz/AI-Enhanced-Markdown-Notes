import { NextResponse } from "next/server";
import { generateSummary } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {    
    const body = await req.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required to generate a summary" },
        { status: 400 }
      );
    }
    
    const summary = await generateSummary(content);
    
    return NextResponse.json({ summary }, { status: 200 });

  } catch (error) {
    console.error("Route Handler Error (AI):", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}