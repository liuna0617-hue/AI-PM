import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "注册信息有误" }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "这个邮箱已经注册" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        progress: { create: { currentDay: 1, completedDaysCount: 0 } },
        reminderSetting: { create: { enabled: false, reminderTime: "20:00" } },
      },
    });

    const session = await getSession();
    session.userId = user.id;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json({ error: "数据库暂时不可用，请确认本地 PostgreSQL 已启动" }, { status: 503 });
  }
}
