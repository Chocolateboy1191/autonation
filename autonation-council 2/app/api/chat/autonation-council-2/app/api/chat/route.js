import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { messages, system } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: system || "You are a helpful assistant for Autonation automotive business.",
      messages,
    });

    return Response.json({ content: response.content[0].text });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
