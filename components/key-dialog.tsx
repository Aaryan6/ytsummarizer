"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export default function KeyDialog({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const [key, setKey] = useState("");

  const onClick = async () => {
    if (!key) return setKey("Please enter a key");
    sessionStorage.setItem("openai_key", key);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You need to enter your Openai API key</DialogTitle>
          <DialogDescription>
            Go to{" "}
            <a href="https://openai.com/" target="_blank" className="underline">
              openai.com
            </a>{" "}
            and create an account to get your API key & Don&apos; worry, we not
            store your api key.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-x-2 my-2">
          <Input
            id="key"
            className="col-span-3"
            type="text"
            placeholder="Enter your Openai Api Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Button type="button" onClick={onClick}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
