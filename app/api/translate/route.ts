import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cleanSubtitleText } from "@/lib/subtitle";
import { translateLearningText } from "@/lib/translate";
import { translateSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = translateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "输入内容有误" }, { status: 400 });
  }

  const originalText = cleanSubtitleText(parsed.data.text);
  if (!originalText) {
    return NextResponse.json({ error: "没有可转换的文本内容" }, { status: 400 });
  }

  try {
    const result = await translateLearningText(originalText);
    const job = await prisma.translationJob.create({
      data: {
        userId: user.id,
        sourceType: parsed.data.sourceType,
        sourceTitle: parsed.data.sourceTitle,
        originalText,
        translatedText: result.translatedText,
        bilingualText: result.bilingualText,
        keyPoints: JSON.stringify(result.keyPoints),
        pmInsights: JSON.stringify(result.pmInsights),
        noteDraft: result.noteDraft,
      },
    });

    return NextResponse.json({ job, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "转换失败" }, { status: 500 });
  }
}
