// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI 前端控制台",
  description:
    "聚合 AI 聊天、文档问答（RAG）和智能助手（Agent）的企业级前端控制台。",
};

export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}