import { TrendingUp } from "lucide-react";

export function ProgressSummary({
  completedDays,
  currentDay,
  percent,
  stageName,
}: {
  completedDays: number;
  currentDay: number;
  percent: number;
  stageName: string;
}) {
  return (
    <section className="rounded-2xl border border-river/15 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-river">
            <TrendingUp className="h-4 w-4" />
            当前进度
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-river">{percent}%</h2>
        </div>
        <div className="rounded-2xl bg-mist px-4 py-3 text-right text-sm text-ink/70">
          <p>已完成 {completedDays}/60 天</p>
          <p>当前第 {currentDay} 天</p>
        </div>
      </div>
      <div className="mt-5 h-3 rounded-full bg-line">
        <div className="h-3 rounded-full bg-gradient-to-r from-river to-cyan" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-4 rounded-xl bg-amber/10 px-3 py-2 text-sm text-amber">当前阶段：{stageName}</p>
    </section>
  );
}
