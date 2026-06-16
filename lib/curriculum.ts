export type ResourceLanguage = "en" | "zh" | "mixed";

export type LearningResource = {
  title: string;
  url: string;
  language: ResourceLanguage;
  translationSupported: boolean;
};

export type LearningStage = {
  id: string;
  name: string;
  dayStart: number;
  dayEnd: number;
  goal: string;
};

export type LearningTask = {
  day: number;
  stageId: string;
  title: string;
  recommendedMinutes: number;
  learningGoal: string;
  contentSummary: string;
  resources: LearningResource[];
  actionTask: string;
  notePrompt: string;
};

const resources = {
  aiForEveryone: {
    title: "DeepLearning.AI - AI For Everyone",
    url: "https://www.deeplearning.ai/courses/ai-for-everyone/",
    language: "en",
    translationSupported: true,
  },
  googleMl: {
    title: "Google Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
    language: "en",
    translationSupported: true,
  },
  hfNlp: {
    title: "Hugging Face NLP Course",
    url: "https://huggingface.co/learn/nlp-course/chapter1/1",
    language: "en",
    translationSupported: true,
  },
  hfLlm: {
    title: "Hugging Face LLM Course",
    url: "https://huggingface.co/learn/llm-course/chapter1/1",
    language: "en",
    translationSupported: true,
  },
  openaiPrompt: {
    title: "OpenAI Prompt Engineering Guide",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    language: "en",
    translationSupported: true,
  },
  anthropicPrompt: {
    title: "Anthropic Prompt Engineering",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    language: "en",
    translationSupported: true,
  },
  dlPrompt: {
    title: "DeepLearning.AI Prompt Engineering",
    url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
    language: "en",
    translationSupported: true,
  },
  openaiText: {
    title: "OpenAI Text Generation Guide",
    url: "https://platform.openai.com/docs/guides/text-generation",
    language: "en",
    translationSupported: true,
  },
  structuredOutputs: {
    title: "OpenAI Structured Outputs Guide",
    url: "https://platform.openai.com/docs/guides/structured-outputs",
    language: "en",
    translationSupported: true,
  },
  functionCalling: {
    title: "OpenAI Function Calling Guide",
    url: "https://platform.openai.com/docs/guides/function-calling",
    language: "en",
    translationSupported: true,
  },
  embeddings: {
    title: "OpenAI Embeddings Guide",
    url: "https://platform.openai.com/docs/guides/embeddings",
    language: "en",
    translationSupported: true,
  },
  evals: {
    title: "OpenAI Evals Guide",
    url: "https://platform.openai.com/docs/guides/evals",
    language: "en",
    translationSupported: true,
  },
  safety: {
    title: "OpenAI Safety Best Practices",
    url: "https://platform.openai.com/docs/guides/safety-best-practices",
    language: "en",
    translationSupported: true,
  },
  pair: {
    title: "Google People + AI Guidebook",
    url: "https://pair.withgoogle.com/guidebook/",
    language: "en",
    translationSupported: true,
  },
  microsoftResponsible: {
    title: "Microsoft Responsible AI Resources",
    url: "https://www.microsoft.com/en-us/ai/responsible-ai",
    language: "en",
    translationSupported: true,
  },
  langchain: {
    title: "LangChain Documentation",
    url: "https://python.langchain.com/docs/introduction/",
    language: "en",
    translationSupported: true,
  },
  llamaIndex: {
    title: "LlamaIndex Documentation",
    url: "https://docs.llamaindex.ai/en/stable/",
    language: "en",
    translationSupported: true,
  },
  dify: {
    title: "Dify Documentation",
    url: "https://docs.dify.ai/",
    language: "mixed",
    translationSupported: true,
  },
  coze: {
    title: "Coze Documentation",
    url: "https://www.coze.com/docs/welcome",
    language: "en",
    translationSupported: true,
  },
  pricing: {
    title: "OpenAI API Pricing",
    url: "https://openai.com/api/pricing/",
    language: "en",
    translationSupported: true,
  },
  chatgpt: { title: "ChatGPT", url: "https://chatgpt.com/", language: "mixed", translationSupported: false },
  claude: { title: "Claude", url: "https://claude.ai/", language: "mixed", translationSupported: false },
  gemini: { title: "Gemini", url: "https://gemini.google.com/", language: "mixed", translationSupported: false },
  perplexity: { title: "Perplexity", url: "https://www.perplexity.ai/", language: "mixed", translationSupported: false },
  figmaAi: { title: "Figma AI", url: "https://www.figma.com/ai/", language: "en", translationSupported: true },
  productHunt: {
    title: "Product Hunt AI",
    url: "https://www.producthunt.com/topics/artificial-intelligence",
    language: "en",
    translationSupported: true,
  },
  ttaaft: {
    title: "There is an AI for That",
    url: "https://theresanaiforthat.com/",
    language: "en",
    translationSupported: true,
  },
  linkedin: {
    title: "LinkedIn Jobs",
    url: "https://www.linkedin.com/jobs/",
    language: "mixed",
    translationSupported: false,
  },
} satisfies Record<string, LearningResource>;

export const learningStages: LearningStage[] = [
  { id: "stage-1", name: "AI 产品经理认知入门", dayStart: 1, dayEnd: 7, goal: "理解 AI 产品经理和传统产品经理的差异，建立 AI 产品形态和能力地图。" },
  { id: "stage-2", name: "AI 基础知识与大模型能力", dayStart: 8, dayEnd: 18, goal: "掌握 AI 产品经理需要理解的技术概念，能和算法、工程团队进行基础沟通。" },
  { id: "stage-3", name: "AI 产品设计方法", dayStart: 19, dayEnd: 30, goal: "学习从用户问题到 AI 能力方案的设计方法，掌握 AI 体验、评估、兜底和信任机制。" },
  { id: "stage-4", name: "AI 工具与原型实战", dayStart: 31, dayEnd: 42, goal: "熟练使用 AI 工具提升产品经理工作效率，并完成简单 AI 应用原型。" },
  { id: "stage-5", name: "AI 产品项目作品集", dayStart: 43, dayEnd: 54, goal: "围绕一个真实业务场景完成可展示的 AI 产品方案，形成转型作品集雏形。" },
  { id: "stage-6", name: "转型、简历与面试准备", dayStart: 55, dayEnd: 60, goal: "把 60 天学习成果转化为简历、作品集和面试表达。" },
];

const taskRows: Array<[number, string, number, LearningResource[], string]> = [
  [1, "AI 产品经理角色认知", 60, [resources.aiForEveryone, resources.pair], "写一篇笔记：AI 产品经理和传统产品经理的 5 个差异。"],
  [2, "AI 产品常见形态", 60, [resources.chatgpt, resources.claude, resources.gemini], "拆解 3 类 AI 产品：聊天助手、Copilot、Agent。"],
  [3, "大模型产品体验观察", 60, [resources.openaiText, resources.anthropicPrompt], "对比 ChatGPT 和 Claude 的一次任务体验，记录差异。"],
  [4, "AI 能力边界与幻觉", 60, [resources.safety, resources.microsoftResponsible], "总结 AI 产品中不能完全相信输出的 3 个场景。"],
  [5, "AI 产品价值判断", 75, [resources.pair, resources.perplexity], "找 2 个 AI 产品，分析它们解决的是效率、质量还是体验问题。"],
  [6, "AI 产品经理能力模型", 75, [resources.aiForEveryone, resources.googleMl], "输出自己的 AI 产品经理能力雷达图文字版。"],
  [7, "阶段复盘：建立案例库", 90, [resources.productHunt, resources.ttaaft], "建立 10 个 AI 产品案例清单，并标注产品类型。"],
  [8, "机器学习基础概念", 75, [resources.googleMl], "用产品语言解释训练、预测、模型、特征。"],
  [9, "深度学习和神经网络直觉", 75, [resources.googleMl, resources.aiForEveryone], "写出深度学习适合解决的 3 类产品问题。"],
  [10, "NLP 和 Transformer 入门", 90, [resources.hfNlp], "用非技术语言解释 Transformer 为什么重要。"],
  [11, "大语言模型基础", 75, [resources.hfLlm, resources.openaiText], "总结 LLM 输入、输出、上下文的关系。"],
  [12, "Prompt 与上下文", 75, [resources.openaiPrompt, resources.anthropicPrompt], "写 3 个不同质量的 Prompt，并比较输出差异。"],
  [13, "Token、上下文窗口和成本", 60, [resources.pricing, resources.openaiText], "说明上下文窗口和成本如何影响产品设计。"],
  [14, "Embedding 和语义检索", 75, [resources.embeddings, resources.llamaIndex], "用一个知识库搜索场景解释 Embedding。"],
  [15, "RAG 基础", 90, [resources.llamaIndex, resources.langchain], "画出一个 RAG 产品流程：用户问题、检索、生成、引用。"],
  [16, "微调、提示词和 RAG 的区别", 75, [resources.openaiPrompt, resources.embeddings], "写一份选择建议：什么时候用 Prompt、RAG、微调。"],
  [17, "多模态 AI 产品", 75, [resources.gemini, resources.chatgpt], "体验图片理解或文件理解能力，记录适合的产品场景。"],
  [18, "阶段复盘：技术沟通清单", 90, [resources.googleMl, resources.evals], "输出一份 AI 产品经理和算法/工程沟通问题清单。"],
  [19, "AI 场景识别", 75, [resources.pair], "选一个业务场景，判断是否适合引入 AI。"],
  [20, "用户需求到 AI 能力映射", 75, [resources.openaiText], "将一个用户需求拆成输入、模型能力、输出、反馈。"],
  [21, "AI 产品用户旅程", 90, [resources.pair], "画出一个 AI 功能的用户旅程和关键风险点。"],
  [22, "Prompt 体验设计", 90, [resources.openaiPrompt, resources.dlPrompt], "设计一个面向用户的 Prompt 模板。"],
  [23, "结构化输出设计", 75, [resources.structuredOutputs], "为一个 AI 分析功能设计 JSON 或表格输出结构。"],
  [24, "工具调用和工作流", 75, [resources.functionCalling, resources.langchain], "设计一个 AI 调用工具完成任务的流程。"],
  [25, "AI 输出质量评估", 90, [resources.evals], "为一个 AI 功能设计 5 个评估指标。"],
  [26, "失败兜底和人工介入", 75, [resources.safety, resources.microsoftResponsible], "写出 3 种失败场景和对应兜底策略。"],
  [27, "信任、解释和引用", 75, [resources.pair], "设计一个让用户信任 AI 输出的界面机制。"],
  [28, "AI 产品指标体系", 90, [resources.evals], "设计 AI 功能的业务指标、体验指标、质量指标。"],
  [29, "AI PRD 写法", 90, [resources.pair, resources.safety], "写一个 AI 功能 PRD 大纲。"],
  [30, "阶段复盘：AI 功能方案", 120, [], "完成一份 1 页 AI 功能方案：场景、能力、流程、指标、风险。"],
  [31, "AI 辅助需求分析", 75, [resources.chatgpt, resources.claude], "用 AI 把一个模糊需求整理成需求清单。"],
  [32, "AI 辅助竞品分析", 75, [resources.perplexity, resources.chatgpt], "输出一份 3 个竞品的对比表。"],
  [33, "AI 辅助用户访谈分析", 75, [resources.claude, resources.structuredOutputs], "将访谈文本整理成痛点、动机、机会点。"],
  [34, "AI 辅助 PRD 初稿", 90, [resources.chatgpt, resources.openaiPrompt], "生成并改写一个功能 PRD 初稿。"],
  [35, "AI 辅助原型和界面文案", 75, [resources.figmaAi, resources.claude], "设计一个 AI 功能页面的信息结构和文案。"],
  [36, "AI 辅助数据分析", 75, [resources.chatgpt, resources.gemini], "用一组示例数据生成产品洞察。"],
  [37, "Dify 入门", 90, [resources.dify], "搭建一个简单问答应用的方案说明。"],
  [38, "Coze 入门", 90, [resources.coze], "设计一个 Bot 的角色、知识和工作流。"],
  [39, "RAG 原型设计", 120, [resources.llamaIndex, resources.dify], "设计一个基于企业资料的知识库问答原型。"],
  [40, "Agent 产品流程", 90, [resources.langchain, resources.coze], "设计一个多步骤 Agent 流程。"],
  [41, "AI 工具工作流沉淀", 75, [resources.chatgpt, resources.claude, resources.perplexity], "总结自己最常用的 5 个 AI 产品经理工作流。"],
  [42, "阶段复盘：工具链方案", 120, [], "输出一份 AI 产品经理日常工具链和使用场景。"],
  [43, "选择作品集项目方向", 90, [resources.productHunt, resources.ttaaft], "选择 1 个 AI 产品项目方向，并说明为什么值得做。"],
  [44, "目标用户和场景定义", 90, [resources.pair], "写出目标用户、核心场景和当前痛点。"],
  [45, "需求和机会点拆解", 90, [resources.chatgpt, resources.claude], "输出机会点列表，并选择 MVP 切入点。"],
  [46, "AI 能力方案设计", 90, [resources.openaiText, resources.embeddings], "说明项目需要哪些 AI 能力：生成、检索、分类、工具调用等。"],
  [47, "核心流程设计", 120, [resources.pair], "画出用户主流程和 AI 处理流程。"],
  [48, "Prompt 和输出结构设计", 90, [resources.openaiPrompt, resources.structuredOutputs], "写出核心 Prompt 和输出字段。"],
  [49, "知识库和数据需求", 90, [resources.llamaIndex, resources.embeddings], "列出项目需要的数据、知识库和更新机制。"],
  [50, "质量评估设计", 90, [resources.evals], "设计评估样例、评分标准和验收指标。"],
  [51, "风险和兜底方案", 75, [resources.safety, resources.microsoftResponsible], "输出幻觉、误用、隐私、失败兜底清单。"],
  [52, "商业和成本估算", 75, [resources.pricing], "粗略估算调用成本，并说明商业可行性。"],
  [53, "项目方案文档整合", 120, [], "整合成一份 AI 产品项目方案。"],
  [54, "作品集表达优化", 120, [resources.figmaAi, resources.claude], "将项目方案整理成可展示的作品集结构。"],
  [55, "AI 产品经理岗位能力拆解", 75, [resources.perplexity, resources.linkedin], "分析 5 个 AI 产品经理岗位 JD，提取能力关键词。"],
  [56, "简历 AI 化表达", 90, [resources.claude, resources.chatgpt], "改写 3 条产品经历，让它们体现 AI 产品能力。"],
  [57, "作品集讲述结构", 90, [], "用背景-问题-方案-指标-风险结构讲述项目。"],
  [58, "AI 产品面试题准备", 90, [resources.pair, resources.evals], "准备 10 个 AI 产品面试题和回答要点。"],
  [59, "模拟面试和表达打磨", 90, [resources.chatgpt, resources.claude], "让 AI 扮演面试官，完成一次模拟问答并记录改进点。"],
  [60, "结营复盘和下一步计划", 120, [], "输出 60 天复盘：能力变化、作品集、下一阶段学习计划。"],
];

export const learningTasks: LearningTask[] = taskRows.map(([day, title, recommendedMinutes, taskResources, actionTask]) => {
  const stage = learningStages.find((item) => day >= item.dayStart && day <= item.dayEnd);
  if (!stage) throw new Error(`Stage not found for day ${day}`);
  return {
    day,
    stageId: stage.id,
    title,
    recommendedMinutes,
    learningGoal: stage.goal,
    contentSummary: `今天围绕「${title}」建立理解，并把学习内容转化为可复用的产品经理笔记。`,
    resources: taskResources,
    actionTask,
    notePrompt: `请记录：今天学到了什么？它和 AI 产品经理工作有什么关系？你会如何应用到真实产品场景中？`,
  };
});

export function getTaskByDay(day: number): LearningTask {
  const safeDay = Math.min(Math.max(day, 1), 60);
  const task = learningTasks.find((item) => item.day === safeDay);
  if (!task) throw new Error(`Task not found for day ${safeDay}`);
  return task;
}

export function getStageById(stageId: string): LearningStage {
  const stage = learningStages.find((item) => item.id === stageId);
  if (!stage) throw new Error(`Stage not found: ${stageId}`);
  return stage;
}

export function getCurrentStageTasks(stageId: string): LearningTask[] {
  return learningTasks.filter((item) => item.stageId === stageId);
}

export function getStageForDay(day: number): LearningStage {
  return getStageById(getTaskByDay(day).stageId);
}
