import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <section className="w-full max-w-md rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-medium text-river">AI 产品经理转型营</p>
        <h1 className="mt-2 text-3xl font-semibold">欢迎回来</h1>
        <p className="mt-2 text-sm text-ink/60">登录后继续你的 60 天学习路径。</p>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
        <p className="mt-5 text-center text-sm text-ink/60">
          还没有账号？<Link className="font-medium text-river" href="/register">立即注册</Link>
        </p>
      </section>
    </main>
  );
}
