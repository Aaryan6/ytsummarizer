import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube Summarizer",
  description: "Summarize any youtube video with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="fixed h-screen overflow-y-auto flex flex-col w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
            <Navbar />
            {children}
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
