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

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "操作失败");
      return;
    }

    window.location.href = "/";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" ? (
        <label className="block">
          <span className="text-sm font-medium text-ink">昵称</span>
          <input name="name" className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2" />
        </label>
      ) : null}
      <label className="block">
        <span className="text-sm font-medium text-ink">邮箱</span>
        <input name="email" type="email" className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">密码</span>
        <input name="password" type="password" className="focus-ring mt-2 w-full rounded-md border border-ink/15 bg-white px-3 py-2" />
      </label>
      {error ? <p className="rounded-md bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring w-full rounded-md bg-ink px-4 py-2 font-medium text-white transition hover:bg-moss disabled:opacity-60"
      >
        {loading ? "处理中..." : mode === "register" ? "创建账号" : "登录"}
      </button>
    </form>
  );
}
