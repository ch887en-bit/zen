# Zen Quest - AI 禅意智慧应用

一个基于 OpenAI API 和 Cloudflare Workers 的禅意智慧对话应用。

## 功能特性

- 🤖 AI 驱动的智慧对话
- 🎨 DALL-E 3 图片生成
- 🌐 Cloudflare Workers 部署
- 📱 响应式设计
- 🎭 禅意主题界面

## 技术栈

- **前端**: React + TypeScript + Ant Design
- **后端**: Cloudflare Workers
- **AI**: OpenAI GPT-3.5 + DALL-E 3
- **部署**: Cloudflare Workers

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
# 开发环境配置
REACT_APP_WORKER_URL=https://your-worker.your-subdomain.workers.dev
```

### 3. 启动开发服务器

```bash
npm start
```

## Cloudflare Worker 部署

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 设置 OpenAI API 密钥

```bash
wrangler secret put OPENAI_API_KEY --env production
wrangler secret put OPENAI_API_KEY --env staging
```

### 4. 部署 Worker

```bash
# 部署到生产环境
wrangler deploy --env production

# 部署到测试环境
wrangler deploy --env staging
```

### 5. 更新前端配置

部署完成后，更新 `src/lib/cloudflare-api.ts` 中的 `WORKER_URL`：

```typescript
const WORKER_URL = 'https://your-worker.your-subdomain.workers.dev'
```

## 项目结构

```
src/
├── components/
│   ├── zen-page.tsx      # 主页面组件
│   ├── zen-page.css      # 页面样式
│   ├── input.tsx         # 输入组件
│   └── interaction.tsx   # 交互组件
├── lib/
│   └── cloudflare-api.ts # Cloudflare API 客户端
├── worker/
│   └── index.ts          # Cloudflare Worker 源码
└── App.tsx               # 主应用组件
```

## API 端点

### 聊天对话
- **POST** `/chat` - 与 AI 对话

### 图片生成
- **POST** `/image` - 生成 DALL-E 图片

### 页面内容生成
- **POST** `/page` - 生成完整的对话页面

## 使用说明

1. 在输入框中输入你的问题或困惑
2. 点击 "Quest" 按钮
3. AI 将生成智慧回答和相应的背景图片
4. 可以继续提问深入探讨

## 自定义配置

### 修改主题颜色

编辑 `src/components/zen-page.css` 中的 CSS 变量：

```css
:root {
  --primary-color: #e67e22;
  --secondary-color: #f39c12;
  --background-color: #f5f7fa;
}
```

### 调整 AI 参数

修改 `src/worker/index.ts` 中的 OpenAI 参数：

```typescript
{
  model: 'gpt-3.5-turbo',
  max_tokens: 1000,
  temperature: 0.7,
}
```

## 部署到生产环境

### 1. 构建应用

```bash
npm run build
```

### 2. 部署 Worker

```bash
wrangler deploy --env production
```

### 3. 配置域名

在 Cloudflare Dashboard 中配置自定义域名和路由。

## 故障排除

### 常见问题

1. **Worker 部署失败**
   - 检查 API 密钥是否正确设置
   - 确认 Wrangler 版本兼容性

2. **图片生成失败**
   - 验证 OpenAI API 配额
   - 检查图片生成提示词格式

3. **CORS 错误**
   - 确认 Worker 的 CORS 头设置
   - 检查前端域名配置

### 调试模式

启用 Worker 调试日志：

```bash
wrangler tail --env production
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 支持

如有问题，请提交 Issue 或联系开发团队。
