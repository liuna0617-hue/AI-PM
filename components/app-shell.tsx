"use client";

import Link from "next/link";
import { BookOpen, Clock, Home, Languages, LogOut } from "lucide-react";

export function AppShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-semibold text-ink">
            AI 产品经理转型营
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-ink/5" href="/">
              <Home size={16} /> 首页
            </Link>
            <Link className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-ink/5" href="/notebook">
              <BookOpen size={16} /> 笔记本
            </Link>
            <Link className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-ink/5" href="/translate">
              <Languages size={16} /> 转中文
            </Link>
            <Link className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-ink/5" href="/settings">
              <Clock size={16} /> 提醒
            </Link>
            <span className="hidden px-2 text-ink/60 md:inline">{userName}</span>
            <button onClick={logout} className="flex items-center gap-1 rounded-md px-3 py-2 text-ink/70 hover:bg-ink/5">
              <LogOut size={16} /> 退出
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
