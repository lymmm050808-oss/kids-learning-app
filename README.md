# 幼儿启蒙 · 正式软件工程

这是从 `KidsLearningDemo` 原型逐步迁移而来的 React + TypeScript 正式工程。

## 当前进度

- 已建立 React、TypeScript 和 Vite 前端，并拆分首页、学习页和家长页；
- 已连接 Supabase 家长账号、数据库和云端学习记录；家长登录、答题记录、学习设置与星星总数可以同步；
- 本地数据仍会保留为备用存储；云端连接失败时可以继续使用本地题库；
- 每科题库按 3–4 岁、5–6 岁分层，每个年龄段各 50 道题；云端需要执行下方题库更新脚本。

## 本地运行

```bash
npm install
npm run dev
```

## 检查

```bash
npm run lint
npm run build
```

## 数据层

- `src/services/learningStore.ts`：本机备用数据存储；
- `src/services/cloudLearningStore.ts`：Supabase 云端同步；
- `supabase/schema.sql`：数据库表和家长数据权限；
- `.env.example`：Supabase 公开连接配置模板。不要把 `.env.local` 上传到 GitHub。

## 题库扩展

- 本地题库为每科、每个年龄段各 50 道题（每科合计 100 道）；
- 在 Supabase SQL Editor 执行 `supabase/add_question_bank_100.sql`，脚本会为每科、每个年龄段新增 38 道题，并保留已有的 12 道入门题；
- 云端题库加载失败时，应用会使用相同的本地年龄分层题库。

## 个人使用权限

- 应用页面要求家长账号登录，网页不提供新账号注册入口；
- 部署前还需要在 Supabase Auth 设置中关闭“Allow new users to sign up”。关闭后，已存在的家长账号仍可登录；
- Supabase 官方说明：[Auth 通用配置](https://supabase.com/docs/guides/auth/general-configuration)。

## 启蒙知识库与检索（第一阶段）

- 家长中心提供按科目检索的启蒙资料；会优先显示儿童当前年龄段的结果，也补充展示相关年龄段内容；
- 首批中文资料摘要保存在 `src/data/learningKnowledge.ts`，每条资料都附有原始来源链接；
- `src/services/knowledgeSearch.ts` 使用本地关键词和常见问法匹配，不会把搜索内容发送到第三方；
- 这是 RAG 的“检索”准备阶段，目前没有向量检索，也不会由 AI 自动生成回答；不需要模型密钥或付费 API。
