// app/chat/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 聊天 | AI 前端控制台",
};

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-xl font-semibold">AI 聊天</h1>
      <p className="text-sm text-muted-foreground">
        在这里接入你的 ChatGPT / Claude / 自建大模型，实现多轮对话。
      </p>
      {/* 这里放 Chat UI 容器，例如 <ChatPanel /> */}
    </div>
  );
}