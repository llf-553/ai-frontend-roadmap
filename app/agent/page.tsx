// app/agent/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 助手 | AI 前端控制台",
};

export default function AgentPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-xl font-semibold">AI 助手（Agent）</h1>
      <p className="text-sm text-muted-foreground">
        组合工具、工作流和多智能体，让 AI 主动帮你执行任务。
      </p>
      {/* 这里放 Agent 配置和运行界面 */}
    </div>
  );
}