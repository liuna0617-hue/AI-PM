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
    <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
      <p className="text-sm font-medium text-river">第 {task.day} 天 · {stage.name}</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">{isCompleted ? "训练营已完成" : task.title}</h1>
      <p className="mt-3 text-ink/70">{task.contentSummary}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-paper p-4">
          <p className="text-sm font-semibold">学习目标</p>
          <p className="mt-2 text-sm leading-6 text-ink/70">{task.learningGoal}</p>
        </div>
        <div className="rounded-md bg-paper p-4">
          <p className="text-sm font-semibold">今日行动</p>
          <p className="mt-2 text-sm leading-6 text-ink/70">{task.actionTask}</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">推荐资源</h2>
          <span className="rounded-full bg-moss/10 px-3 py-1 text-sm text-moss">建议 {task.recommendedMinutes} 分钟</span>
        </div>
        <ResourceList resources={task.resources} />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">今日笔记</h2>
        <p className="mt-2 text-sm text-ink/60">{task.notePrompt}</p>
        <div className="mt-3">
          <NoteEditor disabled={isCompleted} />
        </div>
      </div>
    </section>
  );
}
