"use client";

import { useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const payload =
        mode === "register"
          ? {
              name: String(formData.get("name") ?? ""),
              email: String(formData.get("email") ?? ""),
              password: String(formData.get("password") ?? ""),
            }
          : {
              email: String(formData.get("email") ?? ""),
              password: String(formData.get("password") ?? ""),
            };

      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "操作失败，请稍后重试");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("网络或服务异常，请稍后重试");
    } finally {
      setLoading(false);
      return;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" ? (
        <label className="block">
          <span className="text-sm font-medium text-ink">昵称</span>
          <input name="name" className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm transition focus:border-river" />
        </label>
      ) : null}
      <label className="block">
        <span className="text-sm font-medium text-ink">邮箱</span>
        <input name="email" type="email" className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm transition focus:border-river" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">密码</span>
        <input name="password" type="password" className="focus-ring mt-2 w-full rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm transition focus:border-river" />
      </label>
      {error ? <p className="rounded-xl border border-clay/20 bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring w-full rounded-xl bg-gradient-to-r from-river to-cyan px-4 py-2.5 font-semibold text-white shadow-soft transition hover:brightness-105 disabled:opacity-60"
      >
        {loading ? "处理中..." : mode === "register" ? "创建账号" : "登录"}
      </button>
    </form>
  );
}
