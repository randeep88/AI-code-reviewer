import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { code, language } = await req.json();

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    stream: true,
    messages: [
      {
        role: "system",
        content: `
You are a senior software engineer performing a professional code review.
Be concise but precise.
Always respond in markdown.
Use clear section headings.
`,
      },
      {
        role: "user",
        content: `
Review the following ${language} code and respond with:

## Summary
## Bugs
## Security Issues
## Performance Improvements
## Refactored Code
## Code Quality Score (0-10)

Code:
${code}
`,
      },
    ],
  });

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
