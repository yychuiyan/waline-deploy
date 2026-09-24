# 炊烟小站 · Waline 评论服务

基于 [`@waline/vercel`](https://github.com/walinejs/waline) 的评论系统后端，部署在 Vercel，数据存 PostgreSQL。给 [炊烟小站](https://docs.yychuiyan.com/) 的文章评论区和留言板用。

线上入口：`https://waline.yychuiyan.com`

## 它做什么

1. 评论读写 API：文章评论、留言板。
2. 阅读量统计：站点 `pageviews.ts` 调 `/api/article?type=time`。
3. 自带管理后台，路径 `/ui`。

站点侧的调用在 `docs/.vitepress/theme/components/Comment.vue`，服务地址写死在 `serverURL`。

## 仓库结构

```
waline-deploy/
├── api/waline.js       # Vercel Serverless Function，仅 require('@waline/vercel')
├── public/index.html   # 占位页，指向 /ui 管理后台
├── vercel.json         # 所有路径 rewrite 到 /api/waline
├── package.json        # 只有一个依赖 @waline/vercel
├── .env.example        # 变量模板（提交），真值放 .env（不提交）
└── README.md
```

## 环境变量

真值放两处，**两边要保持一致**：

1. 本地 `waline-deploy/.env`（已 gitignore）
2. **Vercel 控制台** → Settings → Environment Variables

| 名称 | 说明 |
| --- | --- |
| `PG_DB` | 数据库名 |
| `PG_USER` | 数据库用户 |
| `PG_PASSWORD` | 数据库密码 |
| `PG_HOST` | 数据库主机 |
| `PG_PORT` | 端口，`6543` 常见于连接池 |
| `SITE_URL` | 站点地址 |
| `SITE_NAME` | 站点名称，评论通知里显示 |
| `SECURE_DOMAINS` | 允许的来源域名，逗号分隔 |
| `AUTHOR_EMAIL` | 博主邮箱，新评论通知发这里 |

> **Vercel 上的变量是运行时读取的，不依赖仓库里的任何文件。**
> `.env` 只在本地开发时用 —— 它没在仓库里，也不会影响线上。

## 本地

```bash
npm install
vercel dev        # 需 Vercel CLI：npm i -g vercel
```

需要先按 `.env.example` 建好 `.env`。

## 部署

推送到 `master` 触发 Vercel 自动部署。若没连 GitHub 集成，用 `vercel --prod` 手动部署。

**改了环境变量必须去 Vercel 控制台改，并重新部署才生效** —— 本地改 `.env` 只影响本地。

## 注意

- `.env` 不要提交，本仓库只提交 `.env.example`。
- 数据库连接信息泄漏等于整个评论库暴露。线上建议用最小权限的数据库账号，只授这一张库的读写。
- `.vercel/`、`.history/` 不要提交。
