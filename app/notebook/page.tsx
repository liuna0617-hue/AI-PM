import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getStageById } from "@/lib/curriculum";
import { requireUser } from "@/lib/auth";
import { isDemoUserId } from "@/lib/demo";
import { prisma } from "@/lib/prisma";

export default async function NotebookPage() {
  const user = await requireUser();
  const notes = isDemoUserId(user.id)
    ? []
    : await prisma.learningNote.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

  return (
    <AppShell userName={user.name}>
      <section className="rounded-2xl border border-river/15 bg-white p-6 shadow-soft">
        <p className="flex items-center gap-2 text-sm font-semibold text-river">
          <BookOpen className="h-4 w-4" />
          学习沉淀
        </p>
        <h1 className="mt-2 text-3xl font-semibold">我的笔记本</h1>
        <p className="mt-2 text-ink/60">这里沉淀你每天完成任务后写下的学习理解。</p>
        <div className="mt-6 grid gap-4">
          {notes.length ? (
            notes.map((note) => (
              <article key={note.id} className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
                <p className="text-sm font-semibold text-river">第 {note.day} 天 · {getStageById(note.stageId).name}</p>
                <h2 className="mt-1 text-lg font-semibold">{note.taskTitle}</h2>
                <p className="mt-1 text-xs text-ink/50">{note.createdAt.toLocaleString("zh-CN")}</p>
                <p className="mt-3 whitespace-pre-wrap leading-7 text-ink/75">{note.content}</p>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-mist p-8 text-center text-ink/60">还没有学习笔记。完成今天的任务后，你的笔记会出现在这里。</div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
