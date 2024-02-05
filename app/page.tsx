"use client";
import KeyDialog from "@/components/key-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// url: https://youtu.be/DJvM2lSPn6w?si=SfGW4tyAqWrdMfnH

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
      setOpenDialog(true);
      return;
    }
    if (result) setResult(result);
    setLoading(false);
  };

  return (
    <main className="flex h-screen flex-col bg-gray-950 p-16 space-y-10">
      <KeyDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <div className="space-y-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold my-4 text-center uppercase tracking-wide">
            Youtube Summarizer
          </h1>
          <div className="flex gap-x-2 items-center">
            <Input
              type="text"
              placeholder="Paste the url here..."
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
            />
            {loading ? (
              <Button onClick={onClick} className="animate-bounce">
                Summarizing...
              </Button>
            ) : (
              <Button onClick={onClick} className="">
                Go!
              </Button>
            )}
          </div>
          {result && (
            <div className="space-y-2">
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
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 flex-1 animate-in duration-150">
          <ScrollArea className="max-h-[25rem] rounded-md border p-4 w-1/2">
            <h3 className="my-2 font-medium">Here is the summary</h3>
            <p className="whitespace-pre-wrap mt-2 text-foreground/80">
              {result?.summary.choices[0].message.content}
            </p>
          </ScrollArea>
          <ScrollArea className="max-h-[25rem] rounded-md border p-4 w-1/2">
            <h3 className="my-2 font-medium">Full context of the video</h3>
            <p className="whitespace-pre-wrap mt-2 text-foreground/80">
              {result?.docs[0]?.pageContent}
            </p>
          </ScrollArea>
        </div>
      )}
    </main>
  );
}
