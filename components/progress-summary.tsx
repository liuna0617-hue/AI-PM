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
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/60">当前进度</p>
          <h2 className="mt-1 text-2xl font-semibold">{percent}%</h2>
        </div>
        <div className="text-right text-sm text-ink/70">
          <p>已完成 {completedDays}/60 天</p>
          <p>当前第 {currentDay} 天</p>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-ink/10">
        <div className="h-2 rounded-full bg-river" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm text-ink/70">当前阶段：{stageName}</p>
    </section>
  );
}
