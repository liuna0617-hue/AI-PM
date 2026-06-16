import { AppShell } from "@/components/app-shell";
import { TranslationTool } from "@/components/translation-tool";
import { requireUser } from "@/lib/auth";

export default async function TranslatePage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">英文资源转中文学习助手</h1>
        <p className="mt-2 text-ink/60">把英文课程、文档或字幕转成中文学习材料，并沉淀成笔记草稿。</p>
      </div>
      <TranslationTool />
    </AppShell>
  );
}
