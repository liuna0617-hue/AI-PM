import Link from "next/link";
import { redirect } from "next/navigation";
import { Rocket } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-10">
      <section className="w-full max-w-md rounded-2xl border border-river/15 bg-white/90 p-8 shadow-lift backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-river to-cyan text-white shadow-soft">
          <Rocket className="h-6 w-6" />
        </div>
        <p className="mt-5 text-sm font-semibold text-river">60 天任务制训练营</p>
        <h1 className="mt-2 text-3xl font-semibold">创建学习账号</h1>
        <p className="mt-2 text-sm text-ink/60">注册后从第 1 天开始，提交笔记即可推进进度。</p>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
        <p className="mt-5 text-center text-sm text-ink/60">
          已有账号？<Link className="font-semibold text-river hover:text-cyan" href="/login">去登录</Link>
        </p>
      </section>
    </main>
  );
}
