"use client";

import { useState } from "react";
import { FileUp, Languages, Sparkles } from "lucide-react";

type TranslationResult = {
  translatedText: string;
  bilingualText: string;
  keyPoints: string[];
  pmInsights: string[];
  noteDraft: string;
};

export function TranslationTool() {
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceType, setSourceType] = useState<"text" | "txt" | "srt" | "vtt">("text");
  const [text, setText] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setError("文件不能超过 1MB，请分段处理。");
      return;
    }
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension === "txt" || extension === "srt" || extension === "vtt") {
      setSourceType(extension);
    }
    setSourceTitle(file.name);
    setText(await file.text());
  }

  async function submit() {
    setLoading(true);
    setError("");
    setResult(null);
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceTitle, sourceType, text }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error ?? "转换失败");
      return;
    }
    setResult(data.result);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <section className="rounded-2xl border border-river/15 bg-white p-5 shadow-soft">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-river/10 text-river">
          <FileUp className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">输入英文材料</h2>
        <p className="mt-2 text-sm text-ink/60">支持粘贴英文文本，或上传 .txt / .srt / .vtt 字幕文件。</p>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">来源标题</span>
            <input value={sourceTitle} onChange={(event) => setSourceTitle(event.target.value)} className="focus-ring mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2.5 shadow-sm transition focus:border-river" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">上传文件</span>
            <input type="file" accept=".txt,.srt,.vtt" onChange={onFileChange} className="mt-2 w-full rounded-xl border border-dashed border-line bg-paper px-3 py-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">英文文本</span>
            <textarea value={text} onChange={(event) => setText(event.target.value)} className="focus-ring mt-2 min-h-64 w-full rounded-2xl border border-line bg-paper px-3 py-2.5 leading-7 shadow-sm transition focus:border-river" />
          </label>
          {error ? <p className="rounded-xl border border-clay/20 bg-clay/10 px-3 py-2 text-sm text-clay">{error}</p> : null}
          <button onClick={submit} disabled={loading} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-river to-cyan px-4 py-2.5 font-semibold text-white shadow-soft transition hover:brightness-105 disabled:opacity-60">
            <Sparkles className="h-4 w-4" />
            {loading ? "生成中..." : "生成中文学习材料"}
          </button>
        </div>
      </section>
      <section className="rounded-2xl border border-river/15 bg-white p-5 shadow-soft">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Languages className="h-5 w-5 text-river" />
          转换结果
        </h2>
        {result ? (
          <div className="mt-5 space-y-5">
            <ResultBlock title="中文翻译" content={result.translatedText} />
            <ResultBlock title="中英对照" content={result.bilingualText} />
            <ListBlock title="学习要点" items={result.keyPoints} />
            <ListBlock title="AI 产品经理视角启发" items={result.pmInsights} />
            <ResultBlock title="笔记草稿" content={result.noteDraft} />
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-mist p-8 text-center text-ink/60">生成后会在这里看到中文翻译、学习要点和笔记草稿。</div>
        )}
      </section>
    </div>
  );
}

function ResultBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-line bg-paper p-4 text-sm leading-7 text-ink/75">{content}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-2 space-y-2 rounded-2xl border border-line bg-paper p-4 text-sm text-ink/75">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
