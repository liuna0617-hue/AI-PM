import { Languages } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TranslationTool } from "@/components/translation-tool";
import { requireUser } from "@/lib/auth";

export default async function TranslatePage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <div className="mb-6 rounded-2xl border border-river/15 bg-white/85 p-6 shadow-soft">
        <p className="flex items-center gap-2 text-sm font-semibold text-river">
          <Languages className="h-4 w-4" />
          英文资源助手
        </p>
        <h1 className="mt-2 text-3xl font-semibold">英文资源转中文学习助手</h1>
        <p className="mt-2 max-w-3xl text-ink/60">把英文课程、文档或字幕转成中文学习材料，并沉淀成笔记草稿。</p>
      </div>
      <TranslationTool />
    </AppShell>
  );
}
