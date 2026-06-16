import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CurrentTaskCard } from "@/components/current-task-card";
import { ProgressSummary } from "@/components/progress-summary";
import { Roadmap } from "@/components/roadmap";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/progress";

export default async function DashboardPage() {
  const user = await requireUser();
  const dashboard = await getDashboardData(user.id);
  if (!dashboard.progress) redirect("/login");

  return (
    <AppShell userName={user.name}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <CurrentTaskCard task={dashboard.currentTask} stage={dashboard.currentStage} isCompleted={dashboard.isCompleted} />
        <div className="space-y-6">
          <ProgressSummary
            completedDays={dashboard.progress.completedDaysCount}
            currentDay={dashboard.progress.currentDay}
            percent={dashboard.completionPercent}
            stageName={dashboard.currentStage.name}
          />
          <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">学习规则</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
              <li>提交当天笔记即完成任务。</li>
              <li>未完成时会停留在当前天。</li>
              <li>英文资源可使用转中文助手。</li>
            </ul>
          </section>
        </div>
      </div>
      <div className="mt-6">
        <Roadmap
          stages={dashboard.stages}
          currentStageId={dashboard.currentStage.id}
          currentDay={dashboard.progress.currentDay}
          completedStageIds={dashboard.completedStageIds}
          currentStageTasks={dashboard.stageTasks}
        />
      </div>
    </AppShell>
  );
}
