# 幼儿启蒙 · 知识星球

面向家庭使用的语文、数学和英语启蒙学习 PWA。项目从可交互原型继续扩展，包含儿童答题、家长设置与学习记录、家长资料检索和 Supabase 云端数据。

## 当前完成情况

- React、TypeScript、Vite 前端；按首页、答题页、家长中心拆分页面与组件。
- 语文、数学、英语按 3–4 岁和 5–6 岁分层；本地题库每科每年龄段 50 题。
- 家长账号登录；Supabase Postgres 保存学习设置、答题与学习时长记录。
- 每日题量和时长由家长调整；达到目标后提醒，不阻止继续使用。
- 家长可为本次学习开启摄像头和麦克风录像；录像暂存在当前页面，由家长下载，不上传到 Supabase。
- 家长中心提供一周学习统计、答题分析和 24 条带出处的启蒙资料检索。
- PWA 基础配置已包含清单、Service Worker、桌面和手机安装入口；安装需要 HTTPS。
- 已部署 HTTPS Sites 网站，访问策略只允许所有者本人；线上家长登录、数据隔离和手机端录像流程仍需实际验证。

## 技术结构

- **前端：** React + TypeScript + Vite；PWA manifest 和 Service Worker 提供安装入口及有限的静态页面缓存。
- **认证与云端数据：** Supabase Auth + Postgres + Row Level Security (RLS)。
- **答题接口：** 由 Supabase RPC 在数据库端读取题目、核对答案并记录结果；前端不应拥有 `service_role` 密钥。
- **资料检索：** 本地整理的 24 条资料摘要，以关键词匹配并展示来源；这是轻量资料检索，不是向量 RAG，也不调用生成式 AI。
- **后端范围：** 当前没有自建 Node/Express 服务；认证、数据库和受权限保护的答题操作由 Supabase 提供。

## 产品文档

- [产品需求文档（PRD）](docs/PRD.md)：产品范围、用户流程、功能需求、隐私边界和当前限制。
- [演示检查清单](docs/demo-checklist.md)：上线或录屏前的检查步骤。

## 本地运行

需要 Node.js 和 npm。在项目目录运行：

```bash
npm install
```

复制 `.env.example` 为 `.env.local`，填写 Supabase 项目地址和 **Publishable key**，再运行：

```bash
npm run dev
```

只填写 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY`。不要把 Supabase `service_role`/secret key 放入前端环境变量、代码、截图或 GitHub。`.env.local` 已由 Git 忽略。

## 检查

```bash
npm run lint
npm run build
```

## Supabase 配置检查

数据库迁移脚本位于 `supabase/`。首次配置应按项目记录的迁移顺序执行；升级题库后，最后应用 `secure_cloud_quiz.sql`，再检查其末尾的权限查询结果。上线前还需要在 Supabase Auth 中关闭新用户注册，并用已存在的家长账号实际登录和检查数据隔离。关闭注册不影响已注册账号登录。

需要确认的安全行为：

1. 匿名用户无法读取家庭学习记录或答题正确答案。
2. 已登录家长只能读取其账号下的儿童资料和学习记录。
3. 前端只能调用受控答题 RPC，不能自行写入正确答案或其他家庭的数据。
4. `profiles`、`children`、设置、学习任务和答题记录都启用了 RLS；题库正确答案由数据库端核对。

## 手机安装和演示

发布到 HTTPS 后：

- Android：使用 Chrome 打开网址，在浏览器菜单选择“安装应用”或“添加到主屏幕”。
- iPhone/iPad：使用 Safari 打开网址，点“分享”→“添加到主屏幕”。
- 安装后仍需要网络登录 Supabase；目前缓存的是部分静态页面资源，不承诺离线答题或离线同步。

演示前请按 [`docs/demo-checklist.md`](docs/demo-checklist.md) 检查手机页面，并使用虚构测试账号和虚构学习数据。不要把真实邮箱、儿童资料或学习记录放进公开截图/录屏。

## 简历表述参考

> 独立设计并实现面向幼儿家庭的启蒙学习 PWA，使用 React、TypeScript 和 Supabase 构建登录、分龄题库、答题记录与家长学习设置；通过 RLS 与数据库 RPC 限制家庭数据访问并在服务端核对答案；实现带来源链接的本地启蒙资料检索。

请在完成 HTTPS 发布、线上账号登录、数据权限验证和真实手机检查后，再把“已部署/可安装”作为项目成果描述。当前版本仍是个人使用的作品集原型，不是应用商店上架的原生 App。
