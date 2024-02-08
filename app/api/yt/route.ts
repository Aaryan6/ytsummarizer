import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { url, key } = body;

  const openai = new OpenAI({ apiKey: key });

  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.load();

  if (!key) {
    return NextResponse.json({
      summary: {},
      docs,
      message: "OpenAI API key not found.",
      status: 404,
    });
  }

  const summary = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are expert in summerizing youtube videos content, your work is to summerize the given context of a youtube video in the structured way, if possible use heading & bullet points to explain the things, don't miss the informative and important thing.",
      },
      {
        role: "user",
        content: `Summarize this content of a youtube video? \n'''${docs[0]?.pageContent}'''`,
      },
    ],
  });

  return NextResponse.json({ summary, docs });
}
