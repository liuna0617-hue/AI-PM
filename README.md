# AI 产品经理转型训练营

面向产品经理的 60 天 AI 产品经理转型学习平台。

## 第一版能力

- 注册登录
- 首页学习驾驶舱
- 60 天学习路线图
- 当前任务与推荐资源
- 提交笔记推进进度
- 独立笔记本
- 英文资源转中文学习助手
- PushPlus 微信提醒
- Docker Compose 部署

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

3. 启动 PostgreSQL

```bash
docker compose up -d postgres
```

4. 初始化数据库

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. 启动开发服务

```bash
npm run dev
```

访问 `http://localhost:3000`。

## 腾讯云轻量服务器部署

1. 在服务器安装 Docker 和 Docker Compose。
2. 将代码拉到服务器。
3. 复制 `.env.example` 为 `.env`，填写生产环境配置。
4. 启动服务：

```bash
docker compose up -d --build
docker compose exec web npx prisma migrate deploy
```

5. 配置定时提醒：

```bash
*/5 * * * * cd /opt/ai-pm-learning-platform && docker compose exec -T web npm run reminders
```

## 环境变量

- `DATABASE_URL`: PostgreSQL 连接字符串
- `SESSION_PASSWORD`: 至少 32 位的会话密钥
- `APP_URL`: 应用访问地址
- `LLM_BASE_URL`: 大模型 OpenAI-compatible API 地址
- `LLM_API_KEY`: 大模型 API Key
- `LLM_MODEL`: 大模型名称
- `PUSHPLUS_API_URL`: PushPlus API 地址
- `CRON_SECRET`: 定时接口密钥
