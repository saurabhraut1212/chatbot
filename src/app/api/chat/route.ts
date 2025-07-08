// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { GoogleGenAI  } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt }: { prompt: string } = await req.json();

  try {
     const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
    const botReply = response.text || "No response from AI";

    return NextResponse.json({ response: botReply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
  }
}
