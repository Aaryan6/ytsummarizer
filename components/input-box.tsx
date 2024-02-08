"use client";

import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

import { Righteous } from "next/font/google";
const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function InputBox({
  url,
  setUrl,
  loading,
  onClick,
  result,
}: {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onClick: () => void;
  result: any;
}) {
  return (
    <div
      className={cn(
        "w-full",
        result ? "max-w-lg space-y-4" : "mx-auto max-w-3xl space-y-8"
      )}
    >
      <h1
        className={cn(
          "text-4xl font-bold my-4 uppercase tracking-wide",
          result ? "text-left" : "text-center",
          righteous.className
        )}
      >
        Youtube Summarizer
      </h1>
      <div className="grid grid-cols-6 gap-x-2 w-full">
        <Input
          type="text"
          placeholder="Paste the url here..."
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          className={cn(
            "w-full col-span-5 focus-visible:ring-0 focus-visible:outline-none",
            result ? "p-4 text-base" : "p-8 text-lg"
          )}
        />
        {loading ? (
          <Button onClick={onClick} className="h-full">
            <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button
            onClick={onClick}
            className={cn(
              "h-full w-full col-span-1",
              result ? "text-base" : "text-lg"
            )}
          >
            Go!
          </Button>
        )}
      </div>
    </div>
  );
}
