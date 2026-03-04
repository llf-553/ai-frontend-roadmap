// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 前端控制台",
  description: "聚合 Chat / RAG / Agent 的 AI 前端应用首页",
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">AI 前端控制台</h1>
      <p className="text-muted-foreground">
        统一入口，快速访问 AI 聊天、文档问答和智能助手能力。
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/chat"
          className="rounded-lg border bg-background p-4 transition-colors hover:bg-accent"
        >
          <h2 className="font-medium">AI 聊天</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            与大模型进行自然语言对话，支持上下文记忆。
          </p>
        </Link>

        <Link
          href="/rag"
          className="rounded-lg border bg-background p-4 transition-colors hover:bg-accent"
        >
          <h2 className="font-medium">文档问答</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            基于企业知识库，实现精准检索增强问答。
          </p>
        </Link>

        <Link
          href="/agent"
          className="rounded-lg border bg-background p-4 transition-colors hover:bg-accent"
        >
          <h2 className="font-medium">AI 助手</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            配置多智能体流程，执行复杂业务任务。
          </p>
        </Link>
      </div>

      <div className="pt-2">
        <Link
          href="/about"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          了解更多关于本项目 →
        </Link>
      </div>
    </div>
  );
}