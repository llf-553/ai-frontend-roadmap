// components/layout/Footer.tsx
import * as React from "react";
import Link from "next/link";

export type FooterProps = Readonly<{
  //
}>;

export const Footer: React.FC<FooterProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:py-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              © {year} AI 前端控制台
            </p>
            <p className="max-w-md">
              聚合 AI 聊天、文档问答（RAG）和智能助手（Agent），打造可扩展的企业级 AI
              前端入口。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-foreground"
            >
              隐私政策
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <Link
              href="/legal/terms"
              className="transition-colors hover:text-foreground"
            >
              使用条款
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <Link
              href="/support"
              className="transition-colors hover:text-foreground"
            >
              帮助与支持
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

