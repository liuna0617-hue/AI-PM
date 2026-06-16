"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NoteEditor({ disabled = false }: { disabled?: boolean }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error ?? "提交失败");
      return;
    }
    window.location.reload();
  }

  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={disabled}
        className="focus-ring min-h-40 w-full resize-y rounded-2xl border border-line bg-paper px-4 py-3 leading-7 shadow-sm transition focus:border-river"
        placeholder="写下今天的学习笔记：你学到了什么？和 AI 产品经理工作有什么关系？"
      />
      {error ? <p className="rounded-xl border border-clay/20 bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p> : null}
      <button
        onClick={submit}
        disabled={disabled || loading}
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-river to-cyan px-4 py-2.5 font-semibold text-white shadow-soft transition hover:brightness-105 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {disabled ? "训练营已完成" : loading ? "提交中..." : "提交笔记并完成今天任务"}
      </button>
    </div>
  );
}
