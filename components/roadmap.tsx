import type { LearningStage, LearningTask } from "@/lib/curriculum";

export function Roadmap({
  stages,
  currentStageId,
  currentDay,
  completedStageIds,
  currentStageTasks,
}: {
  stages: LearningStage[];
  currentStageId: string;
  currentDay: number;
  completedStageIds: string[];
  currentStageTasks: LearningTask[];
}) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold">60 天路线图</h2>
      <div className="mt-5 grid gap-4">
        {stages.map((stage) => {
          const isCurrent = stage.id === currentStageId;
          const isCompleted = completedStageIds.includes(stage.id);
          return (
            <div key={stage.id} className={`rounded-lg border p-4 ${isCurrent ? "border-river bg-river/5" : "border-ink/10 bg-paper"}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-ink/60">第 {stage.dayStart}-{stage.dayEnd} 天</p>
                  <h3 className="mt-1 font-semibold">{stage.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{stage.goal}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-sm text-ink/70">
                  {isCompleted ? "已完成" : isCurrent ? "当前阶段" : "未解锁"}
                </span>
              </div>
              {isCurrent ? (
                <div className="mt-4 grid gap-2">
                  {currentStageTasks.map((task) => (
                    <div key={task.day} className={`rounded-md px-3 py-2 text-sm ${task.day === currentDay ? "bg-river text-white" : task.day < currentDay ? "bg-moss/10 text-moss" : "bg-white text-ink/70"}`}>
                      第 {task.day} 天 · {task.title}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
