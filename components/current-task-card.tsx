import { BookMarked, CheckCircle2, ClipboardList, Lightbulb, NotebookPen, Target } from "lucide-react";
import type { ReactNode } from "react";
import type { LearningTask, LearningStage } from "@/lib/curriculum";
import { NoteEditor } from "./note-editor";
import { ResourceList } from "./resource-list";

export function CurrentTaskCard({
  task,
  stage,
  isCompleted,
}: {
  task: LearningTask;
  stage: LearningStage;
  isCompleted: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-river/15 bg-white shadow-lift">
      <div className="relative bg-gradient-to-br from-river to-cyan px-6 py-7 text-white">
        <div className="pointer-events-none absolute right-8 top-7 h-36 w-36 rotate-12 rounded-[2rem] border border-white/20" />
        <p className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <BookMarked className="h-4 w-4" />}
          第 {task.day} 天 · {stage.name}
        </p>
        <h1 className="relative mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
          {isCompleted ? "训练营已完成" : task.title}
        </h1>
        <p className="relative mt-3 max-w-2xl leading-7 text-white/82">{task.contentSummary}</p>
      </div>

      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <HighlightCard icon={<Target className="h-5 w-5" />} title="学习目标" text={task.learningGoal} />
          <HighlightCard icon={<ClipboardList className="h-5 w-5" />} title="今日行动" text={task.actionTask} />
          <HighlightCard icon={<NotebookPen className="h-5 w-5" />} title="笔记产出" text={task.notePrompt} />
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-mist/70 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Lightbulb className="h-5 w-5 text-amber" />
              推荐资源
            </h2>
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-sm font-semibold text-cyan">建议 {task.recommendedMinutes} 分钟</span>
          </div>
          <ResourceList resources={task.resources} />
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <NotebookPen className="h-5 w-5 text-river" />
            今日笔记
          </h2>
          <p className="mt-2 text-sm text-ink/60">{task.notePrompt}</p>
          <div className="mt-4">
            <NoteEditor disabled={isCompleted} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-river/10 text-river">{icon}</div>
      <p className="mt-4 text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-ink/68">{text}</p>
    </div>
  );
}
