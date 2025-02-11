import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, fileContent } = await req.json();

    // Construct the system message to handle file content
    const systemMessage = fileContent 
      ? "You are an AI assistant. Below you will find content from an uploaded file, followed by the user's prompt. Please consider both when formulating your response."
      : "You are an AI assistant. Please help with the following prompt.";

    // Construct the full prompt with file content if present
    const fullPrompt = fileContent
      ? `File Content:\n${fileContent}\n\nUser Prompt:\n${prompt}`
      : prompt;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: fullPrompt }
      ],
      model: "deepseek-r1-distill-llama-70b",
    });

    return NextResponse.json({ response: completion.choices[0]?.message?.content || 'No response' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 