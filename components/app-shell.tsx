"use client";

import Link from "next/link";
import { BookOpen, Clock, GraduationCap, Home, Languages, LogOut } from "lucide-react";

export function AppShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 border-b border-river/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-river to-cyan text-white shadow-soft">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">AI 产品经理成长营</span>
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto text-sm">
            <Link className="flex items-center gap-1.5 rounded-full px-3 py-2 text-ink/70 transition hover:bg-river/10 hover:text-river" href="/">
              <Home size={16} /> 首页
            </Link>
            <Link className="flex items-center gap-1.5 rounded-full px-3 py-2 text-ink/70 transition hover:bg-river/10 hover:text-river" href="/notebook">
              <BookOpen size={16} /> 笔记
            </Link>
            <Link className="flex items-center gap-1.5 rounded-full px-3 py-2 text-ink/70 transition hover:bg-river/10 hover:text-river" href="/translate">
              <Languages size={16} /> 翻译
            </Link>
            <Link className="flex items-center gap-1.5 rounded-full px-3 py-2 text-ink/70 transition hover:bg-river/10 hover:text-river" href="/settings">
              <Clock size={16} /> 提醒
            </Link>
            <span className="hidden px-2 text-ink/55 md:inline">{userName}</span>
            <button onClick={logout} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-ink/65 transition hover:bg-clay/10 hover:text-clay">
              <LogOut size={16} /> 退出
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
