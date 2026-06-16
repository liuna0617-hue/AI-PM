import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10">
      <section className="w-full max-w-md rounded-2xl border border-river/15 bg-white/90 p-8 shadow-lift backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-river to-cyan text-white shadow-soft">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="mt-5 text-sm font-semibold text-river">AI 产品经理成长营</p>
        <h1 className="mt-2 text-3xl font-semibold">欢迎回来</h1>
        <p className="mt-2 text-sm text-ink/60">登录后继续你的 60 天学习路径。</p>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
        <p className="mt-5 text-center text-sm text-ink/60">
          还没有账号？<Link className="font-semibold text-river hover:text-cyan" href="/register">立即注册</Link>
        </p>
      </section>
    </main>
  );
}
