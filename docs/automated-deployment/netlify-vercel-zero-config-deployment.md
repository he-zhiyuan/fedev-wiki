# Netlify 与 Vercel：零配置的前端部署平台

## 文章大纲
1. 引言：为什么选择专业的前端部署平台
2. Netlify 与 Vercel：平台概述与对比
3. Netlify 实战：从零开始部署前端项目
   - 注册与项目创建
   - 配置构建设置
   - 自定义域名与 HTTPS
   - 实现持续部署
   - 表单处理与无服务器函数
4. Vercel 实战：部署现代前端应用
   - 注册与项目导入
   - 构建配置与环境变量
   - 预览部署与生产部署
   - Next.js 项目的最佳实践
   - Edge Functions 与 API 路由
5. 自动化部署的最佳实践
6. 常见问题与解决方案
7. 平台功能高级应用
8. 总结与扩展阅读

## 引言：为什么选择专业的前端部署平台

在前面的文章中，我们探讨了使用 GitHub Actions 实现自动部署的方法。虽然 CI/CD 工具功能强大且高度可定制，但对于许多前端项目而言，这可能有点"杀鸡用牛刀"。配置复杂的工作流、管理服务器或存储空间、设置 CDN——这些操作不仅耗时，还容易出错。

这就是为什么专业的前端部署平台如 Netlify 和 Vercel 变得越来越受欢迎。它们提供了一种"零配置"的部署体验，专为前端开发者设计，将复杂的部署流程简化为几次点击或一个简单的 git push 命令。

想象一下：你提交代码到 GitHub，几分钟后，你的应用就自动构建、部署，并通过全球 CDN 分发，同时还有自动的 HTTPS、预览部署、回滚功能…这一切都无需你编写一行配置代码。这正是 Netlify 和 Vercel 所提供的体验。

本文将带你深入了解这两个平台，帮助你选择最适合自己项目的部署方案，并通过实战案例掌握使用技巧。

## Netlify 与 Vercel：平台概述与对比

在深入实战之前，让我们先对这两个平台进行概述和对比。

### Netlify

Netlify 成立于 2014 年，是最早专注于静态网站托管的平台之一，现已发展成为一个完整的 Jamstack 平台。

**核心优势**：
- 极简的部署流程
- 自动化的全球 CDN 分发
- 免费的自动 HTTPS
- 原子部署和即时回滚
- 分支部署和预览功能
- 内置表单处理
- 无服务器函数（Netlify Functions）
- 边缘计算（Edge Handlers）

**最适合**：静态网站、Jamstack 应用、博客、文档站点、营销网站。

### Vercel

Vercel（前身为 ZEIT）成立于 2015 年，是 Next.js 框架的创建者，专注于提供最佳的 React 应用部署体验。

**核心优势**：
- 针对 Next.js 优化的部署体验
- 全球边缘网络
- 自动 HTTPS
- 预览部署和评论功能
- 无服务器函数和 API 路由
- 图像优化
- 实时协作和分析
- Edge Functions

**最适合**：React 应用（特别是 Next.js）、SPA、需要服务端渲染的现代 Web 应用。

### 对比

|特性|Netlify|Vercel|
|---|---|---|
|**免费计划**|较慢的构建，100GB 带宽/月|更快的构建，100GB 带宽/月|
|**框架支持**|所有主流框架|所有主流框架，但对 Next.js 支持最佳|
|**部署速度**|快|非常快|
|**开发体验**|优秀|卓越（尤其是 Next.js 项目）|
|**无服务器函数**|AWS Lambda 基础|更灵活，支持多种运行时|
|**社区生态**|丰富|强大（特别是 Next.js 生态）|
|**定价**|相对更经济|略高|

## Netlify 实战：从零开始部署前端项目

现在，让我们通过一个实际例子，详细了解如何使用 Netlify 部署前端项目。

### 注册与项目创建

1. 访问 [Netlify 官网](https://www.netlify.com/)，点击"Sign up"注册账号。
2. 使用 GitHub、GitLab 或 Bitbucket 账号授权登录（推荐，这样可以直接关联代码仓库）。
3. 登录后，点击"New site from Git"按钮。
4. 选择你的代码托管平台（如 GitHub），并授权 Netlify 访问你的仓库。
5. 选择要部署的仓库。

### 配置构建设置

选择仓库后，Netlify 会自动检测你的项目类型，并提供默认的构建配置：

![Netlify 构建设置](https://example.com/netlify-build-settings.png)

对于大多数常见框架（React、Vue、Angular 等），Netlify 可以自动识别并提供正确的配置。例如，对于一个 Create React App 项目，默认配置通常是：

- 构建命令：`npm run build`
- 发布目录：`build`

你可以根据需要调整这些设置，然后点击"Deploy site"按钮开始部署。

几分钟后，你的网站就会被构建并部署到 Netlify 的全球 CDN 上，并分配一个默认域名（如 `your-project-name.netlify.app`）。

### 自定义域名与 HTTPS

部署成功后，你可能想使用自己的域名。Netlify 提供了简单的域名配置：

1. 在站点管理页面，点击"Domain settings"。
2. 点击"Add custom domain"，输入你的域名。
3. 根据 Netlify 提供的指导，到你的域名注册商处添加 DNS 记录。
   - 如果你想使用 Netlify DNS，可以选择将域名转移到 Netlify 管理。
   - 如果保留原有 DNS 提供商，则需要添加 CNAME 记录指向 Netlify 的默认域名。

添加域名后，Netlify 会自动为你的网站提供免费的 Let's Encrypt SSL 证书，启用 HTTPS。这个过程通常在几分钟内完成，无需任何手动操作。

### 实现持续部署

Netlify 的核心优势之一是无缝的持续部署流程。一旦配置完成，每当你推送代码到关联的 Git 仓库，Netlify 就会自动触发新的构建和部署。

默认情况下，Netlify 会监听主分支（如 `main` 或 `master`）的变更，但你也可以自定义这一行为：

1. 在站点管理页面，点击"Build & deploy"。
2. 在"Continuous Deployment"部分，你可以：
   - 修改监听的分支
   - 设置构建钩子
   - 配置部署上下文（如开发环境、生产环境）

特别有用的是分支部署功能：当你创建一个 Pull Request 时，Netlify 会自动为该分支创建一个预览部署，方便团队成员审查变更。

### 表单处理与无服务器函数

Netlify 不仅仅是一个静态网站托管平台，它还提供了一些强大的动态功能：

#### 表单处理

Netlify 内置了表单处理功能，无需后端服务器即可收集用户提交的数据：

1. 在 HTML 表单中添加 `data-netlify="true"` 属性：

```html
<form name="contact" method="POST" data-netlify="true">
  <p>
    <label>姓名：<input type="text" name="name" /></label>
  </p>
  <p>
    <label>邮箱：<input type="email" name="email" /></label>
  </p>
  <p>
    <label>留言：<textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">提交</button>
  </p>
</form>
```

2. 部署网站后，Netlify 会自动处理表单提交，并在管理界面的"Forms"标签页中显示提交数据。

3. 你还可以设置表单提交通知，通过邮件接收新的表单提交。

#### 无服务器函数（Netlify Functions）

对于需要后端逻辑的场景，Netlify 提供了基于 AWS Lambda 的无服务器函数：

1. 在项目根目录创建 `netlify/functions` 文件夹。

2. 在该文件夹中创建一个 JavaScript 文件，如 `hello-world.js`：

```javascript
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "你好，世界！" })
  };
}
```

3. 部署后，你可以通过 `/.netlify/functions/hello-world` 路径访问这个函数。

4. 在 `netlify.toml` 文件中配置函数设置（可选）：

```toml
[build]
  functions = "netlify/functions"

[dev]
  functions = "netlify/functions"
  publish = "build"
```

通过 Netlify Functions，你可以实现 API 请求处理、第三方服务集成、支付处理等需要服务器端逻辑的功能，同时保持静态网站的简单部署流程。

## Vercel 实战：部署现代前端应用

Vercel 作为 Next.js 的创建者，提供了专为现代前端应用优化的部署平台。下面我们来看看如何使用 Vercel 部署项目。

### 注册与项目导入

1. 访问 [Vercel 官网](https://vercel.com/)，点击"Sign Up"注册账号。
2. 使用 GitHub、GitLab 或 Bitbucket 账号授权登录。
3. 登录后，点击"New Project"按钮。
4. 选择你要导入的 Git 仓库。

### 构建配置与环境变量

选择仓库后，Vercel 会自动检测项目类型并提供默认配置：

![Vercel 项目配置](https://example.com/vercel-project-config.png)

对于大多数框架，Vercel 能够自动识别并提供正确的配置。特别是对于 Next.js 项目，Vercel 提供了最优的部署设置，无需任何手动配置。

如果需要设置环境变量，可以在"Environment Variables"部分添加：

1. 点击"Add"按钮。
2. 输入变量名和值。
3. 选择变量适用的环境（Production、Preview、Development）。

配置完成后，点击"Deploy"按钮开始部署。几分钟后，你的应用就会被构建并部署到 Vercel 的全球网络上，并分配一个默认域名（如 `your-project.vercel.app`）。

### 预览部署与生产部署

Vercel 的一个强大特性是自动的预览部署：

1. 当你创建一个 Pull Request 时，Vercel 会自动为该分支创建一个独立的预览部署。
2. 每个预览都有一个唯一的 URL，方便团队成员查看和测试变更。
3. 预览部署会在评论中自动添加链接，简化审查流程。

![Vercel 预览部署](https://example.com/vercel-preview-deployment.png)

当 Pull Request 被合并到主分支后，Vercel 会自动触发生产环境的部署。这个流程完全自动化，无需任何手动干预。

### Next.js 项目的最佳实践

作为 Next.js 的创建者，Vercel 为 Next.js 项目提供了最优的部署体验：

1. **自动路由识别**：Vercel 能够自动识别 Next.js 的文件系统路由，并正确配置服务器端渲染和静态生成。

2. **增量静态再生成（ISR）**：Vercel 原生支持 Next.js 的 ISR 功能，允许在特定时间间隔更新静态页面。

```javascript
// pages/posts/[id].js
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  return {
    props: { post },
    revalidate: 60 // 每60秒重新生成页面
  };
}

export async function getStaticPaths() {
  const posts = await fetchPosts();
  const paths = posts.map(post => ({
    params: { id: post.id }
  }));
  return { paths, fallback: 'blocking' };
}
```

3. **图像优化**：Vercel 自动处理 Next.js 的 Image 组件，提供全球 CDN 支持的图像优化。

```jsx
import Image from 'next/image';

function MyComponent() {
  return (
    <Image
      src="/my-image.jpg"
      alt="描述"
      width={500}
      height={300}
      priority
    />
  );
}
```

4. **自动 HTTPS 和边缘网络**：所有 Next.js 应用都自动通过 Vercel 的全球边缘网络提供，并启用 HTTPS。

### Edge Functions 与 API 路由

Vercel 提供了强大的边缘计算能力，特别适合需要低延迟的动态功能：

#### Edge Functions

Edge Functions 在离用户最近的边缘节点上执行，提供极低的延迟：

```javascript
// pages/api/edge.js
export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  return new Response(
    JSON.stringify({ name: '边缘函数示例', now: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
```

#### API 路由

Next.js 的 API 路由在 Vercel 上得到完美支持：

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: '你好，API 路由！' });
}
```

这些 API 路由可以用于处理表单提交、与第三方 API 集成、身份验证等。

## 自动化部署的最佳实践

无论你选择 Netlify 还是 Vercel，以下最佳实践都能帮助你充分利用这些平台：

### 1. 优化构建时间

- **依赖缓存**：两个平台都支持缓存依赖，确保配置正确以加快构建。
  
  对于 Netlify，可以在 `netlify.toml` 中配置缓存目录：
  ```toml
  [build]
    publish = "build"
    command = "npm run build"
  
  [[plugins]]
    package = "netlify-plugin-cache"
      [plugins.inputs]
      paths = ["node_modules/.cache", ".next/cache"]
  ```
  
  Vercel 会自动缓存 Next.js 项目的依赖和构建缓存。

### 2. 环境变量管理

- **区分环境**：为不同部署环境（开发、预览、生产）设置不同的环境变量。
- **敏感信息保护**：永远不要在代码中硬编码 API 密钥等敏感信息，而是使用平台的环境变量功能。

### 3. 分支策略

- **主分支部署到生产**：保持主分支（main/master）始终可部署到生产环境。
- **功能分支预览**：利用预览部署功能，为每个功能分支创建独立环境。
- **保护生产分支**：设置分支保护规则，确保代码审查和测试通过后才能合并到主分支。

### 4. 性能优化

- **构建产物优化**：压缩 JS/CSS，优化图像，启用代码分割。
- **预渲染**：尽可能使用静态生成而非服务器渲染，以获得最佳性能。
- **监控性能**：使用平台提供的分析工具监控网站性能。

### 5. 回滚策略

- **保持部署历史**：不要删除旧的部署，以便在需要时快速回滚。
- **定期备份**：对重要数据和配置进行定期备份。

## 常见问题与解决方案

使用 Netlify 和 Vercel 时，你可能会遇到以下常见问题：

### 1. 构建失败

**问题**：部署时构建过程失败。

**解决方案**：
- 检查构建日志，找出具体错误。
- 确保本地构建成功再推送代码。
- 验证环境变量配置是否正确。
- 对于 Netlify，可以尝试使用 `netlify.toml` 文件指定 Node.js 版本：
  ```toml
  [build.environment]
    NODE_VERSION = "16"
  ```

### 2. 路由问题

**问题**：客户端路由（如 React Router）在刷新页面时返回 404。

**解决方案**：
- 在 Netlify 中，创建 `_redirects` 文件（放在构建输出目录）：
  ```
  /*    /index.html   200
  ```
  
- 在 Vercel 中，创建 `vercel.json` 文件：
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### 3. 自定义域名配置

**问题**：自定义域名设置后无法访问或 HTTPS 不生效。

**解决方案**：
- 确认 DNS 记录正确设置并已传播（可能需要等待 24-48 小时）。
- 验证域名所有权（如果平台要求）。
- 检查 SSL 证书是否正确配置。

### 4. 构建超时

**问题**：大型项目构建时间过长，超出平台限制。

**解决方案**：
- 优化构建过程，减少不必要的步骤。
- 考虑升级到付费计划以获得更长的构建时间限制。
- 将构建过程拆分为多个较小的步骤。

## 平台功能高级应用

### Netlify 高级功能

#### 1. Split Testing

Netlify 允许你在不同部署之间进行 A/B 测试：

```toml
# netlify.toml
[context.branch-a]
  command = "npm run build:variant-a"
  publish = "dist"

[context.branch-b]
  command = "npm run build:variant-b"
  publish = "dist"

[[split-test]]
  from = "/*"
  to = 0.5
  branch = "branch-a"
  remainder = "branch-b"
```

#### 2. 大型媒体处理

使用 Netlify Large Media 处理大型文件：

```bash
# 安装 Netlify CLI
npm install netlify-cli -g

# 初始化 Git LFS
netlify lm:setup
```

然后在 `.gitattributes` 文件中配置需要通过 LFS 跟踪的文件类型：

```
*.jpg filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
```

#### 3. 插件生态

Netlify 有丰富的插件生态系统，可以扩展构建过程：

```toml
# netlify.toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

[[plugins]]
  package = "netlify-plugin-submit-sitemap"
```

### Vercel 高级功能

#### 1. 团队协作

Vercel 提供了强大的团队协作功能，包括评论和协作者管理：

![Vercel 团队协作](https://example.com/vercel-collaboration.png)

#### 2. 集成市场

Vercel 集成市场提供了与多种第三方服务的集成：

![Vercel 集成](https://example.com/vercel-integrations.png)

#### 3. Edge Config

使用 Edge Config 存储全局配置，在边缘网络快速访问：

```javascript
import { createClient } from '@vercel/edge-config';

const client = createClient(process.env.EDGE_CONFIG);

export default async function handler(req, res) {
  const features = await client.get('features');
  res.status(200).json({ features });
}
```

## 总结与扩展阅读

Netlify 和 Vercel 都是专为现代前端开发优化的部署平台，提供了"零配置"的部署体验。它们通过自动化构建、全球 CDN、即时预览等功能，大大简化了前端项目的部署流程。

**选择建议**：
- 如果你开发的是静态网站、Jamstack 应用或需要表单处理，Netlify 可能是更好的选择。
- 如果你主要使用 Next.js 或需要更强大的边缘计算能力，Vercel 可能更适合你。

无论选择哪个平台，它们都能帮助你实现快速、可靠的自动化部署，让你专注于代码开发而不是繁琐的部署细节。

### 扩展阅读

1. [Netlify 官方文档](https://docs.netlify.com/)
2. [Vercel 官方文档](https://vercel.com/docs)
3. [Jamstack 最佳实践](https://jamstack.org/best-practices/)
4. [Next.js 部署文档](https://nextjs.org/docs/deployment)
5. [静态站点生成器对比](https://www.staticgen.com/)

在下一篇文章中，我们将探讨如何使用 Webhook 实现更灵活的自定义自动部署流程。敬请期待！

---

**作者介绍**：资深前端开发工程师，拥有多年自动化部署和 DevOps 经验，热衷于探索提升开发效率的最佳实践。

**推荐阅读**：
- 上一篇：[使用 GitHub Actions 实现前端项目的 CI/CD](./2-github-actions-frontend-deployment.md)
- 下一篇：基于 Webhook 的自动部署实现 