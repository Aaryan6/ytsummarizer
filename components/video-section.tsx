"use client";

import { cn } from "@/lib/utils";

export default function VideoSection({
  url,
  result,
}: {
  url: string;
  result: any;
}) {
  if (!url) return null;
  const id = url.split("/").pop();
  return (
    <div className={cn("max-w-2xl w-full", result ? "mx-0" : "mx-auto")}>
      <iframe
        width="full"
        height="full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full h-auto rounded-lg"
      ></iframe>
    </div>
  );
}
