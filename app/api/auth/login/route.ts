import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { DEMO_USER_ID, getDemoCredentials, isDemoMode } from "@/lib/demo";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "登录信息有误" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    const matched = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!matched) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    const session = await getSession();
    session.userId = user.id;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Login failed", error);
    if (isDemoMode()) {
      const demo = getDemoCredentials();
      if (parsed.data.email === demo.email && parsed.data.password === demo.password) {
        const session = await getSession();
        session.userId = DEMO_USER_ID;
        await session.save();
        return NextResponse.json({ ok: true });
      }
    }
    return NextResponse.json({ error: "数据库暂时不可用，请确认本地 PostgreSQL 已启动" }, { status: 503 });
  }
}
