export type TranslationOutput = {
  translatedText: string;
  bilingualText: string;
  keyPoints: string[];
  pmInsights: string[];
  noteDraft: string;
};

function parseJsonFromText(text: string): TranslationOutput {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(cleaned) as TranslationOutput;
  return {
    translatedText: parsed.translatedText ?? "",
    bilingualText: parsed.bilingualText ?? "",
    keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
    pmInsights: Array.isArray(parsed.pmInsights) ? parsed.pmInsights : [],
    noteDraft: parsed.noteDraft ?? "",
  };
}

export async function translateLearningText(text: string): Promise<TranslationOutput> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new Error("还没有配置 LLM_API_KEY");
  }

  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.deepseek.com";
  const model = process.env.LLM_MODEL ?? "deepseek-chat";

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "你是一个面向产品经理的中英学习材料转换助手。只输出 JSON，不输出 Markdown。字段包括 translatedText、bilingualText、keyPoints、pmInsights、noteDraft。",
        },
        {
          role: "user",
          content: `请把下面英文学习材料转成中文学习材料。要求：1. 中文翻译准确自然；2. 给出中英对照；3. 提炼 5-10 条学习要点；4. 给出 AI 产品经理视角启发；5. 写一段可放入当天笔记的草稿。\n\n${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`模型服务请求失败：${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("模型没有返回可用内容");
  }

  return parseJsonFromText(content);
}
