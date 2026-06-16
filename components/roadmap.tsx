import { CheckCircle2, ChevronDown, Circle, LockKeyhole, Map } from "lucide-react";
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-river">
            <Map className="h-4 w-4" />
            学习路线
          </p>
          <h2 className="mt-1 text-xl font-semibold">60天 AI 产品经理成长地图</h2>
        </div>
        <p className="text-sm text-ink/60">阶段卡片默认收起，点击查看详情</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stages.map((stage, index) => {
          const isCurrent = stage.id === currentStageId;
          const isCompleted = completedStageIds.includes(stage.id);
          const isLocked = !isCurrent && !isCompleted;
          const statusLabel = isCompleted ? "已完成" : isCurrent ? "当前阶段" : "未解锁";
          const stageTasks = isCurrent ? currentStageTasks : [];

          return (
            <details
              key={stage.id}
              className={`group relative rounded-lg border bg-white p-4 transition ${
                isCurrent
                  ? "border-river shadow-soft"
                  : isCompleted
                    ? "border-moss/30 bg-moss/5"
                    : "border-ink/10 bg-paper"
              }`}
            >
              {index < stages.length - 1 ? (
                <div className="pointer-events-none absolute left-[calc(100%-2px)] top-9 hidden h-px w-4 bg-ink/15 xl:block" />
              ) : null}

              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <div className="flex gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                      isCurrent
                        ? "border-river bg-river text-white"
                        : isCompleted
                          ? "border-moss bg-moss text-white"
                          : "border-ink/15 bg-white text-ink/50"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-ink/60">第 {stage.dayStart}-{stage.dayEnd} 天</p>
                    <h3 className="mt-1 font-semibold leading-6">{stage.name}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StatusPill isCompleted={isCompleted} isCurrent={isCurrent} isLocked={isLocked} label={statusLabel} />
                    </div>
                  </div>
                </div>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-ink/45 transition group-open:rotate-180" />
              </summary>

              <div className="mt-4 border-t border-ink/10 pt-4">
                <p className="text-sm leading-6 text-ink/70">{stage.goal}</p>

                {isCurrent ? (
                  <div className="mt-4">
                    <p className="text-sm font-semibold">当前阶段任务</p>
                    <div className="mt-3 grid gap-2">
                      {stageTasks.map((task) => (
                        <div
                          key={task.day}
                          className={`rounded-md border px-3 py-2 text-sm ${
                            task.day === currentDay
                              ? "border-river bg-river text-white"
                              : task.day < currentDay
                                ? "border-moss/20 bg-moss/10 text-moss"
                                : "border-ink/10 bg-white text-ink/70"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span>第 {task.day} 天 · {task.title}</span>
                            <span className="shrink-0 text-xs opacity-80">{task.recommendedMinutes} 分钟</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function StatusPill({
  isCompleted,
  isCurrent,
  isLocked,
  label,
}: {
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  label: string;
}) {
  const Icon = isCompleted ? CheckCircle2 : isLocked ? LockKeyhole : Circle;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        isCurrent
          ? "bg-river/10 text-river"
          : isCompleted
            ? "bg-moss/10 text-moss"
            : "bg-ink/5 text-ink/55"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
