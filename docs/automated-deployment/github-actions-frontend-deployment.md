# 使用 GitHub Actions 实现前端项目的 CI/CD：从零搭建自动部署流程

## 引言：为什么选择 GitHub Actions

在众多 CI/CD 工具中，GitHub Actions 凭借其无缝集成 GitHub 仓库、配置简单、免费额度慷慨等特点，成为前端开发者的首选工具之一。特别是对于已经在 GitHub 上托管代码的团队，无需引入额外的第三方服务，就能实现完整的自动化工作流。

试想一下，当你向 GitHub 仓库推送新代码或创建 Pull Request 时，自动触发构建、测试，并将应用部署到测试环境或生产环境。这一切都不需要你手动干预，大大提高了开发效率，减少了人为错误。无论是个人项目还是团队协作，GitHub Actions 都能满足你的自动化部署需求。

本文将带你从零开始，一步步搭建前端项目的自动部署流程，即使你是 GitHub Actions 的新手，也能轻松掌握这一强大工具。

## GitHub Actions 核心概念解析

在开始实战之前，我们需要理解 GitHub Actions 的几个核心概念：

### 1. 工作流（Workflow）

工作流是一个自动化的过程，由一个或多个作业（Jobs）组成，可以由各种事件触发，如推送代码、创建 Pull Request 等。工作流通过 YAML 文件定义，存储在仓库的 `.github/workflows` 目录中。

简单来说，工作流就是"当 X 事件发生时，执行 Y 操作"。

### 2. 事件（Events）

事件是触发工作流的特定活动。常见的事件包括：
- `push`：向仓库推送代码
- `pull_request`：创建或更新 Pull Request
- `schedule`：按计划定时执行
- `workflow_dispatch`：手动触发执行

你可以设置事件的具体条件，如只在特定分支上触发、只在特定文件变更时触发等。

### 3. 作业（Jobs）

作业是工作流中的一组步骤，在同一运行器（Runner）实例上执行。一个工作流可以包含多个作业，它们默认并行运行，但也可以配置为按顺序执行。

每个作业都在一个全新的虚拟环境中运行，因此如果作业之间需要共享数据，需要使用工件（Artifacts）或缓存（Cache）。

### 4. 步骤（Steps）

步骤是作业中的最小单位，可以是运行命令（如 `npm install`）或使用操作（Actions）。步骤按顺序执行，且可以访问共享的工作区文件。

### 5. 操作（Actions）

操作是 GitHub Actions 平台上可复用的代码单元，类似于函数，可以在步骤中调用。GitHub 官方提供了许多常用操作，如检出代码、设置 Node.js 环境等。社区也贡献了大量实用操作，可以在 [GitHub Marketplace](https://github.com/marketplace?type=actions) 中找到。

### 6. 运行器（Runners）

运行器是执行工作流的服务器，GitHub 提供了 Windows、Linux 和 macOS 运行器，也支持自托管运行器。

理解了这些概念，我们就能更好地设计和实现自动部署流程了。

## 前端项目自动部署方案设计

在实现自动部署之前，我们需要先设计一个适合前端项目的部署方案。一个典型的前端项目自动部署流程包括以下几个环节：

1. **代码检出**：从 GitHub 仓库拉取最新代码
2. **环境准备**：设置 Node.js 环境，安装依赖
3. **代码检查**：运行 ESLint、TypeScript 类型检查等
4. **单元测试**：确保代码质量和功能正确性
5. **构建**：生成生产环境代码
6. **部署**：将构建产物部署到目标环境

根据部署目标的不同，我们可以有多种部署方式：

- 部署到 GitHub Pages
- 部署到云存储（如 AWS S3、阿里云 OSS）
- 部署到云服务器（通过 SSH）
- 部署到专用平台（如 Netlify、Vercel）

在本文中，我们将以部署到 GitHub Pages 和云服务器为例，介绍如何配置 GitHub Actions。

## 实战：从零搭建 GitHub Actions 部署流程

接下来，我们通过一个实际的例子，一步步实现前端项目的自动部署。

### 准备工作

在开始之前，确保你已经：

1. 在 GitHub 上创建了一个仓库，并将前端项目代码推送到该仓库
2. 项目中包含了 package.json，并定义了构建命令（如 `npm run build`）

### 创建工作流配置文件

首先，我们需要在仓库中创建工作流配置文件：

1. 在项目根目录下创建 `.github/workflows` 文件夹
2. 在该文件夹中创建一个 YAML 文件，如 `deploy.yml`

下面是一个部署到 GitHub Pages 的基础配置：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # 当推送到 main 分支时触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # 在 Ubuntu 环境中运行
    
    steps:
    - name: Checkout code  # 步骤1：检出代码
      uses: actions/checkout@v3
      
    - name: Setup Node.js  # 步骤2：设置 Node.js 环境
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'  # 缓存 npm 依赖
        
    - name: Install dependencies  # 步骤3：安装依赖
      run: npm ci
      
    - name: Build  # 步骤4：构建
      run: npm run build
      
    - name: Deploy to GitHub Pages  # 步骤5：部署到 GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: dist  # 构建输出目录，根据你的项目配置调整
        branch: gh-pages  # 部署到哪个分支
```

这个工作流定义了：
- 当有代码推送到 main 分支时触发
- 在 Ubuntu 环境中运行
- 检出代码、设置 Node.js 环境、安装依赖、构建项目
- 使用 JamesIves 的 GitHub Pages 部署操作将构建产物部署到 gh-pages 分支

### 配置构建步骤

根据你的项目技术栈，构建步骤可能需要调整。以下是几种常见前端项目的构建配置：

#### React 项目（使用 Create React App）

```yaml
- name: Build
  run: npm run build
  env:
    CI: false  # 防止 warnings 导致构建失败
```

#### Vue 项目

```yaml
- name: Build
  run: npm run build
```

#### Angular 项目

```yaml
- name: Build
  run: npm run build -- --prod
```

### 配置部署步骤

除了 GitHub Pages，我们还可以配置部署到其他环境。下面是几种常见部署方式的配置：

#### 部署到云服务器（通过 SSH）

```yaml
- name: Deploy to server
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /var/www/html/my-app
      rm -rf *
      # 下面的命令假设你已经将构建产物上传到某个位置
      cp -r /path/to/uploaded/dist/* .
```

这里使用了 GitHub 的密钥管理功能，你需要在仓库的 Settings -> Secrets and variables -> Actions 中添加相应的密钥。

#### 部署到 AWS S3

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Deploy to S3
  run: aws s3 sync ./dist s3://my-bucket-name/ --delete
```

#### 部署到 Netlify

```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --dir=dist --prod
  env:
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### 配置缓存优化

GitHub Actions 支持缓存依赖项，这可以显著加快构建速度。上面的例子中，我们已经配置了 npm 缓存：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'npm'  # 缓存 npm 依赖
```

如果你使用的是 Yarn，可以这样配置：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'yarn'  # 缓存 yarn 依赖
```

除了依赖缓存，还可以缓存构建产物，特别是在有多个作业的情况下：

```yaml
- name: Cache build output
  uses: actions/cache@v3
  with:
    path: ./dist
    key: ${{ runner.os }}-build-${{ github.sha }}
```

## 进阶技巧：分支策略与环境配置

在实际项目中，我们通常需要管理多个环境（开发、测试、生产）和多个分支。GitHub Actions 可以灵活配置不同分支的不同部署策略。

### 多环境部署配置

以下是一个多环境部署的工作流示例：

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # ... 构建步骤 ...
  
  deploy-dev:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      # ... 部署到开发环境 ...
  
  deploy-prod:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      # ... 部署到生产环境 ...
```

这个工作流会：
- 对所有推送到 main 和 develop 分支的代码进行构建
- 仅将 develop 分支的代码部署到开发环境
- 仅将 main 分支的代码部署到生产环境

### 环境变量配置

不同环境通常需要不同的配置，可以通过环境变量实现：

```yaml
jobs:
  deploy-dev:
    # ...
    steps:
      - name: Build for development
        run: npm run build
        env:
          NODE_ENV: development
          API_URL: https://dev-api.example.com
  
  deploy-prod:
    # ...
    steps:
      - name: Build for production
        run: npm run build
        env:
          NODE_ENV: production
          API_URL: https://api.example.com
```

对于敏感信息，可以使用 GitHub 的密钥管理功能，并在工作流中引用：

```yaml
- name: Build
  run: npm run build
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

## 常见问题与解决方案

在使用 GitHub Actions 进行自动部署时，可能会遇到以下常见问题：

### 1. 构建失败但工作流未报错

问题：有时候构建命令可能返回错误，但 GitHub Actions 不会将其视为失败。

解决方案：在构建命令前加上 `set -e`，确保任何命令失败都会导致整个作业失败：

```yaml
- name: Build
  run: |
    set -e
    npm run build
```

### 2. 依赖安装缓慢

问题：每次运行工作流时，都需要重新安装依赖，耗时较长。

解决方案：正确配置依赖缓存，并使用 `npm ci` 而不是 `npm install`：

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'npm'

- name: Install dependencies
  run: npm ci
```

### 3. 部署时权限不足

问题：部署到 GitHub Pages 或其他环境时出现权限错误。

解决方案：确保工作流有正确的权限，对于 GitHub Pages，可以在仓库设置中启用 GitHub Actions 写入权限：

```yaml
- name: Deploy to GitHub Pages
  uses: JamesIves/github-pages-deploy-action@v4
  with:
    folder: dist
    branch: gh-pages
    token: ${{ secrets.GITHUB_TOKEN }}  # 使用 GitHub 自动生成的令牌
```

### 4. 环境变量在构建时不可用

问题：在构建过程中无法访问环境变量。

解决方案：确保环境变量正确设置，并使用 `process.env` 访问。对于 Create React App，环境变量需要以 `REACT_APP_` 开头：

```yaml
- name: Build
  run: npm run build
  env:
    REACT_APP_API_URL: https://api.example.com
```

## 最佳实践总结

通过以上实战，我们学习了如何使用 GitHub Actions 实现前端项目的自动部署。以下是一些最佳实践，帮助你更好地使用 GitHub Actions：

1. **保持工作流配置简单清晰**：将复杂的逻辑分解为多个作业或步骤，使配置文件易于理解和维护。

2. **合理使用缓存**：缓存依赖和构建产物，减少构建时间。

3. **注重安全性**：使用 GitHub Secrets 存储敏感信息，避免在工作流文件中硬编码。

4. **分环境部署**：根据分支或标签区分不同环境的部署策略。

5. **添加状态检查**：在部署完成后，添加健康检查步骤，确保部署成功。

6. **优化触发条件**：只在必要的时候触发工作流，例如，只在特定文件更改时才构建和部署。

7. **使用社区操作**：利用社区贡献的优质操作，避免重复造轮子。

8. **查看执行日志**：当工作流失败时，详细检查执行日志，找出问题所在。

通过遵循这些最佳实践，你可以构建出高效、可靠的前端自动部署流程，大幅提升开发效率。

## 扩展阅读与学习资源

如果你想深入学习 GitHub Actions，以下资源可能对你有所帮助：

1. [GitHub Actions 官方文档](https://docs.github.com/cn/actions)
2. [GitHub Marketplace Actions](https://github.com/marketplace?type=actions)
3. [GitHub Actions 工作流语法](https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions)
4. [GitHub Actions 上下文和表达式语法](https://docs.github.com/cn/actions/reference/context-and-expression-syntax-for-github-actions)
5. [awesome-actions](https://github.com/sdras/awesome-actions) - 优质 GitHub Actions 集合

在下一篇文章中，我们将探讨如何使用 Netlify 和 Vercel 这两个专业的前端部署平台，实现更简单、更高效的自动部署流程。敬请期待！

---

**作者介绍**：资深前端开发工程师，拥有多年自动化部署和 DevOps 经验，热衷于探索提升开发效率的最佳实践。

**推荐阅读**：
- 上一篇：[前端自动化部署技术总览：从手动部署到持续交付](./1-frontend-deployment-overview.md)
- 下一篇：Netlify 与 Vercel：零配置的前端部署平台 