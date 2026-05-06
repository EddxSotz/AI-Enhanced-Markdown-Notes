import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(content: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are an expert technical assistant. Summarize the following markdown note in exactly 3 concise bullet points. Return only the bullet points." 
        },
        { 
          role: "user", 
          content: content 
        }
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Failed to generate AI summary:", error);
    throw new Error("AI Service unavailable");
  }
}