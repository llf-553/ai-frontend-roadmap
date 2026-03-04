// components/layout/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export type HeaderProps = Readonly<{
  //
}>;

type NavItem = Readonly<{
  label: string;
  href: string;
}>;

const NAV_ITEMS: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "AI 聊天", href: "/chat" },
  { label: "文档问答", href: "/rag" },
  { label: "AI 助手", href: "/agent" },
  { label: "关于", href: "/about" },
] as const;

export const Header: React.FC<HeaderProps> = () => {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const toggleMobile = React.useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  const closeMobile = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo 区域 */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            AI
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold sm:text-base">
              AI 前端控制台
            </span>
            <span className="text-xs text-muted-foreground">
              Chat · RAG · Agent
            </span>
          </div>
        </div>

        {/* 桌面端导航 */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="切换主题"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span aria-hidden="true">
                {!mounted ? "🌓" : resolvedTheme === "dark" ? "🌙" : "☀️"}
              </span>
            </button>

            <button
              type="button"
              className="inline-flex items-center rounded-md border bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              登录
            </button>
          </div>
        </div>

        {/* 移动端按钮 */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="切换主题"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span aria-hidden="true">
              {!mounted ? "🌓" : resolvedTheme === "dark" ? "🌙" : "☀️"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleMobile}
            aria-label="打开主菜单"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span aria-hidden="true">
              {mobileOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* 移动端下拉导航 */}
      {mobileOpen ? (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto space-y-1 px-4 py-3 sm:px-6 lg:px-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="block rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              登录
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
};

