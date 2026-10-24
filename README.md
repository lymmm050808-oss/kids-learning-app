# 幼儿启蒙 · 正式软件工程

这是从 `KidsLearningDemo` 原型逐步迁移而来的 React + TypeScript 正式工程。

## 当前进度

- 已建立 React 19、TypeScript 和 Vite 工程；
- 已拆分应用外壳、首页、科目卡片、学习页和家长页；
- 已集中保存任务数量、每日目标和 10/30/50 星徽章配置；
- 已接入三科答题、语音、星星奖励、家长设置与最近 7 天报告；
- 已建立可替换的数据服务层，并准备 Supabase 数据库建表与权限脚本；
- 当前仍使用本机存储，尚未连接在线账号。

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

- `src/services/learningStore.ts`：当前本机数据服务；
- `supabase/schema.sql`：后端数据库和行级权限脚本；
- `.env.example`：未来连接 Supabase 所需的公开环境变量模板。

下一步：创建 Supabase 项目、执行数据库脚本，然后接入家长登录与云端同步。
