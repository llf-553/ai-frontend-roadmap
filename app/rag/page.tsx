// app/rag/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文档问答 | AI 前端控制台",
};

export default function RagPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-xl font-semibold">文档问答（RAG）</h1>
      <p className="text-sm text-muted-foreground">
        上传或选择知识库，基于检索增强生成（RAG）进行精准问答。
      </p>
      {/* 这里放文档选择区 + 问答 Panel */}
    </div>
  );
}