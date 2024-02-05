import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { url, key } = body;

  if (!key) {
    return NextResponse.json({
      message: "OpenAI API key not found.",
      status: 404,
    });
  }

  const openai = new OpenAI({ apiKey: key });

  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.load();

  const summary = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are expert in summerizing long paragraphs, your work is to summerize the given text without missing the informative and important thing.",
      },
      {
        role: "user",
        content: `Can you summarize this? \n'''${docs[0]?.pageContent}'''`,
      },
    ],
  });

  return NextResponse.json({ summary, docs });
}
