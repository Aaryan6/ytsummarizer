"use client";
import KeyDialog from "@/components/key-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoSection from "@/components/video-section";
import AiContent from "@/components/ai-content";
import InputBox from "@/components/input-box";

interface IResult {
  summary: {
    choices: {
      index: number;
      message: {
        role: string;
        content: string;
      };
    }[];
  };
  docs: {
    pageContent: string;
    metadata: {
      title: string;
      description: string;
      author: string;
    };
  }[];
}

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<IResult | null>(null);
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const key = sessionStorage.getItem("openai_key");

    if (!url) return setUrl("Please enter a url");
    const data = await fetch("/api/yt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, key }),
    });
    const result = await data.json();
    if (result.status == 404) {
      setResult(result);
      setLoading(false);
      setOpenDialog(true);
      return;
    }
    if (result) setResult(result);
    setLoading(false);
  };

  return (
    <main className="flex flex-col lg:flex-row space-y-10 lg:space-x-10 h-screen px-8 py-8 lg:px-16 lg:py-16 overflow-y-auto">
      <KeyDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onSubmit={onClick}
      />
      <div className="space-y-8 w-full">
        <InputBox
          url={url}
          setUrl={setUrl}
          loading={loading}
          onClick={onClick}
          result={result}
        />
        <VideoSection url={url} result={result} />
        <div className="flex-1">
          {result && (
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">
                Title: {result?.docs[0].metadata?.title}
              </h2>
              <h3 className="text-base font-medium text-muted-foreground">
                Channel: {result?.docs[0].metadata?.author}
              </h3>
            </div>
          )}
        </div>
      </div>
      {result && (
        <AiContent
          result={result}
          setOpenDialog={setOpenDialog}
          loading={loading}
        />
      )}
    </main>
  );
}
