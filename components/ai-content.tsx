"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export default function AiContent({
  result,
  setOpenDialog,
  loading,
}: {
  result: any;
  setOpenDialog: (value: boolean) => void;
  loading: boolean;
}) {
  const isSummary = Object.keys(result?.summary).length !== 0;
  return (
    <div className="w-full">
      <Tabs defaultValue={isSummary ? "summary" : "script"} className="w-full">
        <TabsList className="w-1/2 h-12 bg-transparent border">
          <TabsTrigger
            value="summary"
            className="w-full h-full data-[state=active]:bg-white data-[state=active]:text-background"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="script"
            className="w-full h-full data-[state=active]:bg-white data-[state=active]:text-background"
          >
            Script
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="">
          <ScrollArea className="rounded-md border p-8 w-full h-[calc(100vh-11rem)]">
            {isSummary ? (
              <p className="whitespace-pre-wrap mt-2 text-foreground/80">
                {result?.summary?.choices[0].message.content}
              </p>
            ) : loading ? (
              <p className="whitespace-pre-wrap mt-2 text-foreground/80 mb-2">
                Generating Summary...
              </p>
            ) : (
              <>
                <p className="whitespace-pre-wrap mt-2 text-foreground/80 mb-2">
                  Set OpenAI API key to see the summary.
                </p>
                <Button onClick={() => setOpenDialog(true)}>Set Key</Button>
              </>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="script">
          <ScrollArea className="rounded-md border p-8 w-full h-[calc(100vh-11rem)]">
            <p className="whitespace-pre-wrap mt-2 text-foreground/80">
              {result?.docs[0]?.pageContent}
            </p>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
