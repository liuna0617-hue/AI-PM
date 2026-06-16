import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <section className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-medium text-river">60 天任务制训练营</p>
        <h1 className="mt-2 text-3xl font-semibold">创建学习账号</h1>
        <p className="mt-2 text-sm text-ink/60">注册后从第 1 天开始，提交笔记即可推进进度。</p>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
        <p className="mt-5 text-center text-sm text-ink/60">
          已有账号？<Link className="font-medium text-river" href="/login">去登录</Link>
        </p>
      </section>
    </main>
  );
}
