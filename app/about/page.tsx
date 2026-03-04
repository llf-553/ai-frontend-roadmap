// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | AI 前端控制台",
};

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">关于本项目</h1>
      <p className="text-sm text-muted-foreground">
        这是一个基于 Next.js App Router + TypeScript + Tailwind 的 AI 前端模板，
        聚合聊天、RAG 和 Agent 能力，适合作为企业级应用基座。
      </p>
      {/* 可补充技术栈、架构图、团队信息等 */}
    </div>
  );
}