import Link from "next/link";
import type { LearningResource } from "@/lib/curriculum";

export function ResourceList({ resources }: { resources: LearningResource[] }) {
  if (!resources.length) {
    return <p className="text-sm text-ink/60">今天主要基于前面笔记完成整合复盘。</p>;
  }

  return (
    <div className="grid gap-3">
      {resources.map((resource) => (
        <div key={resource.url} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-ink/10 bg-paper px-3 py-3">
          <div>
            <p className="font-medium">{resource.title}</p>
            <p className="mt-1 text-xs text-ink/60">语言：{resource.language === "en" ? "英文" : resource.language === "zh" ? "中文" : "混合"}</p>
          </div>
          <div className="flex gap-2">
            {resource.translationSupported ? (
              <Link href="/translate" className="rounded-md border border-river/30 px-3 py-2 text-sm text-river hover:bg-river/10">
                转中文学习笔记
              </Link>
            ) : null}
            <a href={resource.url} target="_blank" rel="noreferrer" className="rounded-md bg-ink px-3 py-2 text-sm text-white hover:bg-moss">
              打开资源
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
