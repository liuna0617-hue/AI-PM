# AI 产品经理学习平台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可部署到腾讯云轻量服务器的 AI 产品经理 60 天学习平台 MVP。

**Architecture:** 采用单体全栈架构，前端页面、后端接口、登录鉴权、学习进度、笔记、翻译助手和提醒任务都放在一个 Next.js 应用中。PostgreSQL 负责持久化用户、笔记、进度、提醒和翻译结果；60 天任务内容作为代码内置数据。使用 Docker Compose 在腾讯云轻量服务器上部署 Next.js、PostgreSQL 和 Nginx。

**Tech Stack:** Next.js App Router、React、TypeScript、Tailwind CSS、shadcn/ui、Prisma、PostgreSQL、bcrypt、iron-session 或 NextAuth Credentials、DeepSeek/通义千问 OpenAI-compatible API、PushPlus、Docker Compose、Nginx。

---

## 1. 推荐技术方案

### 最优方案

第一版采用：

- `Next.js + React + TypeScript`：同时处理页面和后端接口。
- `Tailwind CSS + shadcn/ui`：快速搭建干净、专业的学习平台界面。
- `PostgreSQL + Prisma`：保存用户、进度、笔记、提醒设置和翻译结果。
- `bcrypt`：保存密码哈希。
- `iron-session` 或 `NextAuth Credentials`：实现邮箱/用户名 + 密码登录。
- `DeepSeek` 或 `通义千问`：实现英文资源转中文学习助手。
- `PushPlus`：实现微信提醒。
- `Docker Compose`：部署到腾讯云轻量服务器。
- `Nginx + HTTPS`：绑定域名并提供安全访问。

### 推荐原因

这套方案最适合当前产品：

- 一个项目即可完成页面、接口和任务调度，开发成本低。
- PostgreSQL 足够稳定，后续用户增长也能继续使用。
- Prisma 让数据模型清晰，适合快速迭代。
- DeepSeek/通义对中文生成友好，成本可控。
- PushPlus 接入简单，适合第一版微信提醒。
- Docker Compose 适合腾讯云轻量服务器，部署和迁移都方便。

### 第一版不采用

- 不做前后端分离。
- 不做微服务。
- 不做 Kubernetes。
- 不接正式微信公众号模板消息。
- 不自动下载公开视频。
- 不做长视频自动语音转写。
- 不做管理后台。

---

## 2. 目标文件结构

```text
ai-pm-learning-platform/
  app/
    (auth)/
      login/page.tsx
      register/page.tsx
    (dashboard)/
      page.tsx
      notebook/page.tsx
      settings/page.tsx
      translate/page.tsx
    api/
      auth/register/route.ts
      auth/login/route.ts
      auth/logout/route.ts
      dashboard/route.ts
      notes/route.ts
      settings/reminder/route.ts
      translate/route.ts
      cron/reminders/route.ts
    layout.tsx
    globals.css
  components/
    app-shell.tsx
    current-task-card.tsx
    roadmap.tsx
    resource-list.tsx
    note-editor.tsx
    progress-summary.tsx
    translation-result.tsx
  lib/
    auth.ts
    prisma.ts
    curriculum.ts
    progress.ts
    reminders.ts
    pushplus.ts
    translate.ts
    subtitle.ts
    validators.ts
  prisma/
    schema.prisma
    migrations/
  scripts/
    run-reminders.ts
  docker/
    nginx.conf
  docker-compose.yml
  Dockerfile
  .env.example
  package.json
  README.md
```

职责说明：

- `app/(auth)`：登录注册页面。
- `app/(dashboard)`：登录后的学习驾驶舱、笔记本、设置和翻译页面。
- `app/api`：所有后端接口。
- `components`：页面可复用 UI 组件。
- `lib/curriculum.ts`：写死的 60 天任务数据。
- `lib/progress.ts`：学习进度和任务完成逻辑。
- `lib/translate.ts`：大模型翻译和摘要逻辑。
- `lib/subtitle.ts`：`.srt`、`.vtt`、`.txt` 文本清洗。
- `lib/pushplus.ts`：PushPlus 推送。
- `lib/reminders.ts`：提醒筛选和消息生成。
- `scripts/run-reminders.ts`：服务器定时任务入口。
- `docker-compose.yml`：腾讯云轻量服务器部署编排。

---

## 3. 数据库模型

### Prisma Schema 草案

```prisma
model User {
  id              String           @id @default(cuid())
  name            String
  email           String           @unique
  passwordHash    String
  createdAt       DateTime         @default(now())
  progress        UserProgress?
  notes           LearningNote[]
  reminderSetting ReminderSetting?
  translationJobs TranslationJob[]
  reminderLogs    ReminderLog[]
}

model UserProgress {
  id                String    @id @default(cuid())
  userId            String    @unique
  currentDay        Int       @default(1)
  completedDaysCount Int      @default(0)
  latestCompletedAt DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model LearningNote {
  id        String   @id @default(cuid())
  userId    String
  day       Int
  stageId   String
  taskTitle String
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, day])
}

model ReminderSetting {
  id            String   @id @default(cuid())
  userId        String   @unique
  enabled       Boolean  @default(false)
  pushplusToken String?
  reminderTime  String   @default("20:00")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model TranslationJob {
  id             String   @id @default(cuid())
  userId         String
  sourceType     String
  sourceTitle    String?
  originalText   String
  translatedText String
  bilingualText  String
  keyPoints      String
  pmInsights     String
  noteDraft      String
  createdAt      DateTime @default(now())
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model ReminderLog {
  id        String   @id @default(cuid())
  userId    String
  day       Int
  sentDate  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, day, sentDate])
}
```

关键规则：

- 每个用户注册后创建 `UserProgress`，`currentDay = 1`。
- 每个用户每天最多一条 `LearningNote`。
- 提交当前任务笔记后，`currentDay` 加 1，最多到 60。
- 第 60 天提交后，`completedDaysCount = 60`，训练营完成。

---

## 4. 开发任务拆解

### Task 1: 初始化 Next.js 项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `.env.example`

- [ ] **Step 1: 创建项目依赖**

使用 Next.js、React、TypeScript、Prisma、Tailwind、bcrypt 和 zod。

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "reminders": "tsx scripts/run-reminders.ts"
  },
  "dependencies": {
    "@prisma/client": "latest",
    "bcryptjs": "latest",
    "clsx": "latest",
    "iron-session": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "zod": "latest"
  },
  "devDependencies": {
    "@types/bcryptjs": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "postcss": "latest",
    "prisma": "latest",
    "tailwindcss": "latest",
    "tsx": "latest",
    "typescript": "latest"
  }
}
```

- [ ] **Step 2: 配置环境变量示例**

`.env.example`：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_pm_learning"
SESSION_PASSWORD="replace-with-at-least-32-characters-secret"
APP_URL="http://localhost:3000"
LLM_BASE_URL="https://api.deepseek.com"
LLM_API_KEY=""
LLM_MODEL="deepseek-chat"
PUSHPLUS_API_URL="https://www.pushplus.plus/send"
CRON_SECRET="replace-with-cron-secret"
```

- [ ] **Step 3: 验收**

运行：

```bash
npm install
npm run dev
```

预期：

- `http://localhost:3000` 可以打开。
- 页面显示基础布局。

### Task 2: 建立数据库和 Prisma

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/prisma.ts`

- [ ] **Step 1: 写入 Prisma schema**

使用第 3 节的 Prisma schema。

- [ ] **Step 2: 创建 Prisma Client 单例**

`lib/prisma.ts`：

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

- [ ] **Step 3: 验收**

运行：

```bash
npm run prisma:generate
npm run prisma:migrate
```

预期：

- Prisma Client 生成成功。
- PostgreSQL 中创建 6 张业务表。

### Task 3: 注册登录和会话

**Files:**
- Create: `lib/auth.ts`
- Create: `lib/validators.ts`
- Create: `app/api/auth/register/route.ts`
- Create: `app/api/auth/login/route.ts`
- Create: `app/api/auth/logout/route.ts`
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/register/page.tsx`

- [ ] **Step 1: 定义校验规则**

`lib/validators.ts`：

```ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "请输入昵称").max(30, "昵称过长"),
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(8, "密码至少 8 位"),
});

export const loginSchema = z.object({
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(1, "请输入密码"),
});
```

- [ ] **Step 2: 实现 session 工具**

`lib/auth.ts`：

```ts
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export type SessionData = {
  userId?: string;
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    cookieName: "ai_pm_session",
    password: process.env.SESSION_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
    },
  });
}

export async function requireUser() {
  const session = await getSession();
  if (!session.userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) redirect("/login");
  return user;
}
```

- [ ] **Step 3: 注册时创建用户和学习进度**

注册成功后：

- 创建 `User`
- 创建 `UserProgress`
- 创建默认 `ReminderSetting`
- 写入 session
- 跳转首页

- [ ] **Step 4: 登录时校验密码**

使用 `bcryptjs.compare` 校验密码哈希。

- [ ] **Step 5: 验收**

手工测试：

- 新邮箱可以注册。
- 重复邮箱不能注册。
- 错误密码不能登录。
- 登录后访问首页。
- 退出后回到登录页。

### Task 4: 写入 60 天课程数据

**Files:**
- Create: `lib/curriculum.ts`

- [ ] **Step 1: 定义课程类型**

```ts
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
```

- [ ] **Step 2: 写入 6 个阶段**

阶段必须和课程计划一致：

- `stage-1`: 第 1-7 天，AI 产品经理认知入门
- `stage-2`: 第 8-18 天，AI 基础知识与大模型能力
- `stage-3`: 第 19-30 天，AI 产品设计方法
- `stage-4`: 第 31-42 天，AI 工具与原型实战
- `stage-5`: 第 43-54 天，AI 产品项目作品集
- `stage-6`: 第 55-60 天，转型、简历与面试准备

- [ ] **Step 3: 写入 60 个任务**

从 [60 天课程计划](../specs/2026-06-15-ai-pm-60-day-curriculum.md) 转成 `LearningTask[]`。

- [ ] **Step 4: 提供查询函数**

```ts
export function getTaskByDay(day: number): LearningTask {
  const task = learningTasks.find((item) => item.day === day);
  if (!task) throw new Error(`Task not found for day ${day}`);
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
```

- [ ] **Step 5: 验收**

运行单元检查或临时脚本，确认：

- 总任务数为 60。
- 每个 day 从 1 到 60 都存在。
- 每个任务的 stageId 都能匹配阶段。
- 英文资源 `translationSupported = true`。

### Task 5: 学习进度和笔记提交

**Files:**
- Create: `lib/progress.ts`
- Create: `app/api/dashboard/route.ts`
- Create: `app/api/notes/route.ts`

- [ ] **Step 1: 实现 dashboard 数据聚合**

返回：

- 当前用户
- 当前进度
- 当前任务
- 当前阶段
- 当前阶段任务列表
- 已完成笔记列表摘要
- 完成百分比

- [ ] **Step 2: 实现提交笔记逻辑**

规则：

- 只能提交当前 `currentDay` 的笔记。
- 笔记内容不能为空。
- 创建 `LearningNote`。
- 更新 `UserProgress`。
- 如果当前是第 60 天，`currentDay` 保持 60，`completedDaysCount` 设置为 60。
- 如果当前小于 60，`currentDay += 1`。

- [ ] **Step 3: 验收**

手工测试：

- 第 1 天提交笔记后进入第 2 天。
- 历史笔记中出现第 1 天笔记。
- 不能重复提交第 1 天笔记。
- 第 60 天提交后显示训练营完成。

### Task 6: 首页学习驾驶舱

**Files:**
- Create: `components/app-shell.tsx`
- Create: `components/current-task-card.tsx`
- Create: `components/roadmap.tsx`
- Create: `components/resource-list.tsx`
- Create: `components/note-editor.tsx`
- Create: `components/progress-summary.tsx`
- Create: `app/(dashboard)/page.tsx`

- [ ] **Step 1: 实现页面布局**

首页区域：

- 顶部导航：学习首页、笔记本、提醒设置
- 左侧/主区域：当前任务
- 右侧/下方：进度概览
- 下方：路线图

- [ ] **Step 2: 当前任务卡片**

展示：

- 当前第几天
- 阶段名称
- 任务标题
- 建议学习时间
- 学习目标
- 内容说明
- 今日行动任务
- 笔记提示

- [ ] **Step 3: 推荐资源列表**

每个资源展示：

- 标题
- 语言标签：英文、中文、混合
- 外部链接按钮
- 如果 `translationSupported = true`，展示“转中文学习笔记”入口

- [ ] **Step 4: 路线图组件**

规则：

- 展示 6 个阶段。
- 已完成阶段显示完成状态。
- 当前阶段高亮。
- 当前阶段展开每日任务标题。
- 未来阶段折叠。

- [ ] **Step 5: 验收**

手工测试：

- 新用户首页显示第 1 天。
- 路线图显示 6 个阶段。
- 当前阶段展开，第 2-6 阶段折叠。
- 提交笔记后首页更新到下一天。

### Task 7: 笔记本页面

**Files:**
- Create: `app/(dashboard)/notebook/page.tsx`

- [ ] **Step 1: 查询当前用户历史笔记**

按 `createdAt desc` 排序。

- [ ] **Step 2: 展示笔记列表**

每条展示：

- 第几天
- 阶段名称
- 任务标题
- 提交时间
- 笔记内容

- [ ] **Step 3: 空状态**

没有笔记时显示：

```text
还没有学习笔记。完成今天的任务后，你的笔记会出现在这里。
```

- [ ] **Step 4: 验收**

手工测试：

- 没有笔记时显示空状态。
- 提交一条笔记后出现在笔记本。
- 多条笔记按最新在前排序。

### Task 8: 英文资源转中文学习助手

**Files:**
- Create: `lib/subtitle.ts`
- Create: `lib/translate.ts`
- Create: `app/api/translate/route.ts`
- Create: `components/translation-result.tsx`
- Create: `app/(dashboard)/translate/page.tsx`

- [ ] **Step 1: 清洗字幕文本**

`lib/subtitle.ts` 需要移除：

- `.srt` 序号
- 时间轴
- `.vtt` header
- 多余空行

输出纯文本。

- [ ] **Step 2: 构造翻译提示词**

提示词要求输出 JSON：

```json
{
  "translatedText": "中文翻译",
  "bilingualText": "中英对照文本",
  "keyPoints": ["学习要点 1", "学习要点 2"],
  "pmInsights": ["AI 产品经理启发 1", "AI 产品经理启发 2"],
  "noteDraft": "可带入当天笔记的中文草稿"
}
```

- [ ] **Step 3: 调用大模型**

使用 OpenAI-compatible Chat Completions 接口：

- `LLM_BASE_URL`
- `LLM_API_KEY`
- `LLM_MODEL`

第一版推荐：

- DeepSeek：成本低，中文表现好。
- 通义千问：国内访问稳定。

- [ ] **Step 4: 限制输入长度**

第一版限制：

- 粘贴文本不超过 20,000 字符。
- 文件大小不超过 1MB。
- 超出时提示用户分段处理。

- [ ] **Step 5: 保存翻译记录**

写入 `TranslationJob`，默认仅用户本人可见。

- [ ] **Step 6: 页面交互**

页面提供：

- 文本粘贴框
- 文件上传
- 来源标题输入
- 生成按钮
- 结果展示
- “复制笔记草稿”按钮

- [ ] **Step 7: 验收**

手工测试：

- 粘贴英文文本可以生成中文学习材料。
- 上传 `.srt` 后能清洗时间轴。
- 超长文本会被拦截。
- 翻译结果保存到数据库。

### Task 9: 提醒设置和 PushPlus

**Files:**
- Create: `lib/pushplus.ts`
- Create: `lib/reminders.ts`
- Create: `app/api/settings/reminder/route.ts`
- Create: `app/(dashboard)/settings/page.tsx`
- Create: `app/api/cron/reminders/route.ts`
- Create: `scripts/run-reminders.ts`

- [ ] **Step 1: 提醒设置页面**

用户可以配置：

- 是否开启提醒
- PushPlus token
- 每日提醒时间

- [ ] **Step 2: PushPlus 发送函数**

发送内容：

- 标题：`AI 产品经理学习提醒`
- 内容：当前第几天、阶段、任务标题、今日行动任务、笔记提示

- [ ] **Step 3: 筛选需要提醒的用户**

规则：

- `enabled = true`
- `pushplusToken` 不为空
- 当前服务器时间匹配用户 `reminderTime`
- 当前任务还没有对应当天笔记

- [ ] **Step 4: 定时触发方式**

第一版采用服务器 crontab 每 5 分钟执行一次：

```bash
*/5 * * * * cd /opt/ai-pm-learning-platform && docker compose exec -T web npm run reminders
```

脚本内部只推送当前时间窗口内需要提醒的用户。

- [ ] **Step 5: 防重复提醒**

使用 `ReminderLog` 防止重复推送。同一天同一个任务只提醒一次，发送前检查 `[userId, day, sentDate]` 是否已经存在；发送成功后写入记录。

- [ ] **Step 6: 验收**

手工测试：

- 设置 PushPlus token 和时间后保存成功。
- 当前任务未完成时触发脚本会收到微信提醒。
- 当前任务已完成时不提醒。
- 同一天重复触发脚本不会重复发送。

### Task 10: Docker 和腾讯云部署

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `docker/nginx.conf`
- Modify: `.env.example`
- Create: `README.md`

- [ ] **Step 1: Dockerfile**

构建 Next.js production 镜像。

- [ ] **Step 2: docker-compose**

服务：

- `web`
- `postgres`
- `nginx`

PostgreSQL 使用 volume 保存数据。

- [ ] **Step 3: Nginx**

负责：

- 80/443 入口
- 反向代理到 `web:3000`
- 后续接入 HTTPS 证书

- [ ] **Step 4: 腾讯云服务器准备**

服务器要求：

- Ubuntu 22.04 LTS 或 24.04 LTS
- 建议 2 核 4G
- 开放安全组 80、443
- 安装 Docker 和 Docker Compose

- [ ] **Step 5: 上线命令**

```bash
docker compose up -d --build
docker compose exec web npx prisma migrate deploy
docker compose exec web npm run reminders
```

- [ ] **Step 6: 验收**

上线后确认：

- 域名可访问首页。
- 可以注册登录。
- 可以提交笔记。
- 可以打开笔记本。
- 可以保存提醒设置。
- 可以触发 PushPlus 测试消息。

---

## 5. 开发顺序建议

按下面顺序做，风险最低：

1. 项目初始化
2. 数据库和用户登录
3. 60 天课程数据
4. 首页学习驾驶舱
5. 提交笔记和进度推进
6. 笔记本
7. 英文资源转中文学习助手
8. PushPlus 提醒
9. Docker Compose 部署
10. 腾讯云上线验证

这个顺序先打通学习主流程，再做 AI 翻译和微信提醒。这样即使后两项遇到模型或推送服务配置问题，核心学习平台仍然可用。

---

## 6. 测试清单

### 主流程测试

- 新用户注册后进入第 1 天。
- 登录用户刷新页面后仍保持登录状态。
- 第 1 天提交笔记后进入第 2 天。
- 笔记本能看到第 1 天笔记。
- 用户不能提交空笔记。
- 用户不能跳过任务。

### 路线图测试

- 首页显示 6 个阶段。
- 当前阶段展开。
- 非当前阶段折叠。
- 阶段完成后下一阶段展开。

### 翻译助手测试

- 英文文本可以生成中文翻译。
- `.srt` 时间轴被清理。
- `.vtt` header 被清理。
- 超出长度会提示分段。
- 翻译结果不会公开展示给其他用户。

### 提醒测试

- 关闭提醒时不发送消息。
- 缺少 PushPlus token 时不发送消息。
- 当前任务完成后不发送消息。
- 当前任务未完成且到提醒时间时发送消息。
- 同一天同任务不重复发送。

### 部署测试

- Docker 容器重启后数据仍在。
- PostgreSQL volume 正常挂载。
- Nginx 反向代理正常。
- 服务器重启后服务可以恢复。

---

## 7. 成本和配置建议

### 腾讯云轻量服务器

推荐：

- 2 核 4G
- Ubuntu 22.04 LTS
- 40GB 以上磁盘
- 开放 80 和 443

### 大模型

第一版推荐优先使用 DeepSeek 或通义千问：

- 中文生成质量够用。
- 成本可控。
- 接口形态接近 OpenAI，后续可替换。

### 数据备份

第一版至少做：

- 每日 PostgreSQL dump
- 保留最近 7 天备份
- 备份文件放服务器本地和对象存储二选一

---

## 8. 自检结果

- 覆盖注册登录、首页路线图、60 天任务、笔记提交、进度推进、笔记本、英文转中文助手、PushPlus 提醒、腾讯云部署。
- 没有纳入管理后台、多训练营、付费、社区、排行榜、长视频转写等第一版排除项。
- 计划中保留 `ReminderLog`，用于避免重复推送，属于提醒功能必要支撑。
- 60 天具体任务内容引用课程计划文档，实施时需要转成 `lib/curriculum.ts` 数据。
