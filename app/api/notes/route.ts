import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { submitCurrentNote } from "@/lib/progress";
import { noteSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = noteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "笔记内容有误" }, { status: 400 });
  }

  try {
    await submitCurrentNote(user.id, parsed.data.content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "提交失败" }, { status: 400 });
  }
}
