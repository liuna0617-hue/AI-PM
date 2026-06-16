import { redirect } from "next/navigation";
import { CheckCircle2, Languages, NotebookPen } from "lucide-react";
import type { ReactNode } from "react";
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
          <section className="rounded-2xl border border-river/15 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">学习规则</h2>
            <div className="mt-4 grid gap-3">
              <Rule icon={<NotebookPen className="h-4 w-4" />} text="提交当天笔记即完成任务。" />
              <Rule icon={<CheckCircle2 className="h-4 w-4" />} text="未完成时会停留在当前天。" />
              <Rule icon={<Languages className="h-4 w-4" />} text="英文资源可使用转中文助手。" />
            </div>
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

function Rule({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-3 text-sm text-ink/72">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-river/10 text-river">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
