import Link from "next/link";
import { ExternalLink, FileText, Languages } from "lucide-react";
import type { LearningResource } from "@/lib/curriculum";

export function ResourceList({ resources }: { resources: LearningResource[] }) {
  if (!resources.length) {
    return <p className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink/60">今天主要基于前面笔记完成整合复盘。</p>;
  }

  return (
    <div className="grid gap-3">
      {resources.map((resource) => (
        <div key={resource.url} className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-river/10 text-river">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{resource.title}</p>
              <p className="mt-1 text-xs text-ink/60">语言：{resource.language === "en" ? "英文" : resource.language === "zh" ? "中文" : "混合"}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {resource.translationSupported ? (
              <Link href="/translate" className="inline-flex items-center gap-1.5 rounded-full border border-river/20 bg-river/5 px-3 py-2 text-sm font-medium text-river transition hover:bg-river/10">
                <Languages className="h-4 w-4" />
                转中文学习笔记
              </Link>
            ) : null}
            <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-sm font-medium text-white transition hover:bg-river">
              <ExternalLink className="h-4 w-4" />
              打开资源
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
