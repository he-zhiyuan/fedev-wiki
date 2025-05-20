# Git 基础

Git 是一个分布式版本控制系统，本文将介绍 Git 的基础知识和常用命令。

## 什么是Git？为什么要学习它？

想象一下这个场景：你正在开发一个网站，经过几天的努力，你完成了所有功能。突然，你发现新添加的代码导致了严重bug，但你已经记不清之前的代码是什么样子了...

或者另一个场景：你和同事一起开发一个项目，你们经常需要共享代码，但每次都通过U盘或邮件发送文件，然后手动合并彼此的修改，这既繁琐又容易出错...

Git就是为解决这些问题而生的！它让你能够：

- 追踪代码的每一次变化
- 随时回到之前的任何版本
- 与团队成员高效协作
- 在不影响主代码的情况下尝试新功能

作为一名前端开发者，掌握Git已经成为必备技能，无论是个人项目还是团队协作，Git都能极大提升你的开发效率和代码质量。

## 基础概念

### 1. 版本控制

#### 集中式版本控制
早期的版本控制系统如SVN，采用集中式架构：有一个中央服务器保存所有文件的修订版本，开发者通过客户端从服务器"检出"(checkout)文件。

**缺点**：
- 服务器宕机时，无法提交更新
- 中央服务器数据丢失，所有历史记录都会丢失
- 必须联网才能工作

#### 分布式版本控制
Git是分布式版本控制系统，这意味着：
- 每个开发者都拥有完整的代码仓库副本
- 可以在本地进行几乎所有操作，不需要联网
- 即使中央服务器崩溃，任何客户端都包含了完整的项目历史

想象一下，分布式版本控制就像是每个人都有一本完整的"项目日记"，而不只是一页纸。

#### Git 工作流程
Git项目有三个主要区域：
1. **工作目录**：你实际编辑文件的地方
2. **暂存区(Stage/Index)**：临时存储你的改动
3. **仓库(Repository)**：保存项目的所有历史

基本工作流程：
1. 在工作目录中修改文件
2. 将修改的文件添加到暂存区(`git add`)
3. 提交更新，将暂存区的文件永久存储到仓库中(`git commit`)

#### 版本管理策略
- **语义化版本**：遵循主版本.次版本.修订号(例如1.2.3)的命名规则
- **发布周期**：确定何时发布新版本，如每周/每月发布
- **分支管理**：使用不同分支管理开发、测试和生产环境

### 2. 仓库管理

#### 本地仓库
本地仓库是你电脑上的Git项目文件夹，包含了：
- 完整的项目文件
- `.git`目录（存储所有版本信息）

创建本地仓库有两种方式：
```bash
# 方式1：初始化新仓库
git init

# 方式2：克隆现有仓库
git clone https://github.com/username/repository.git
```

#### 远程仓库
远程仓库是托管在网络上的项目版本，常见的远程仓库服务有：
- GitHub
- GitLab
- Bitbucket

通过远程仓库，团队成员可以共享代码、协同工作。

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/username/repository.git

# 从远程仓库获取更新
git pull origin main
```

#### 分支管理
分支允许你在不影响主代码的情况下开发新功能或修复bug。

```bash
# 创建并切换到新分支
git checkout -b feature-login

# 切换回主分支
git checkout main

# 合并分支
git merge feature-login
```

#### 标签管理
标签用于标记特定的提交点，通常用于标记发布版本。

```bash
# 创建标签
git tag v1.0.0

# 查看所有标签
git tag

# 推送标签到远程
git push origin v1.0.0
```

## 常用命令

### 1. 基础操作

#### git init
初始化一个新的Git仓库。

```bash
mkdir my-project
cd my-project
git init
```

这会在当前目录创建一个`.git`文件夹，包含了Git仓库所需的所有文件。

#### git clone
从远程仓库克隆项目到本地。

```bash
git clone https://github.com/username/repository.git
```

这会在当前目录下创建一个与远程仓库同名的文件夹，并下载所有文件和历史记录。

#### git add
将修改的文件添加到暂存区。

```bash
# 添加单个文件
git add index.html

# 添加多个文件
git add file1.js file2.css

# 添加所有修改的文件
git add .
```

**注意**：`git add .`会添加所有修改和新文件，但不会添加已删除的文件。使用`git add -A`可以添加所有变化（包括删除）。

#### git commit
将暂存区的修改提交到仓库。

```bash
git commit -m "添加登录功能"
```

**提交信息的最佳实践**：
- 使用简洁明了的语言
- 描述"做了什么"而不是"怎么做的"
- 使用现在时态（"Add feature"而不是"Added feature"）

#### git status
查看工作目录和暂存区的状态。

```bash
git status
```

输出会显示：
- 已修改但未暂存的文件（红色）
- 已暂存但未提交的文件（绿色）
- 未跟踪的文件

### 2. 分支操作

#### git branch
管理分支。

```bash
# 查看所有本地分支
git branch

# 查看所有远程分支
git branch -r

# 查看所有分支（本地和远程）
git branch -a

# 创建新分支
git branch feature-cart

# 删除分支
git branch -d feature-cart
```

#### git checkout
切换分支或恢复工作目录文件。

```bash
# 切换到存在的分支
git checkout main

# 创建并切换到新分支
git checkout -b feature-payment

# 丢弃工作区的修改
git checkout -- index.html
```

**提示**：现代Git也提供了`git switch`命令来替代部分`checkout`功能，更加直观：
```bash
# 切换分支
git switch main

# 创建并切换分支
git switch -c feature-payment
```

#### git merge
将指定分支的更改合并到当前分支。

```bash
# 切换到main分支
git checkout main

# 合并feature-search分支到main
git merge feature-search
```

如果出现冲突，Git会标记冲突的地方，需要手动解决后再提交。

#### git rebase
将当前分支的更改"移植"到指定分支之上。

```bash
# 当前在feature分支上
git rebase main
```

与merge相比，rebase会创建更干净的提交历史，但需要小心使用，尤其是对于已推送到远程的分支。

#### git stash
临时保存工作目录的修改，以便切换分支或执行其他操作。

```bash
# 保存当前修改
git stash

# 应用最近的stash并删除它
git stash pop

# 查看所有stash
git stash list

# 应用特定的stash
git stash apply stash@{1}
```

### 3. 远程操作

#### git remote
管理远程仓库。

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/username/repo.git

# 更改远程仓库地址
git remote set-url origin https://github.com/username/new-repo.git

# 删除远程仓库
git remote remove origin
```

#### git fetch
从远程仓库获取最新代码，但不合并。

```bash
# 获取默认远程仓库的更新
git fetch

# 获取特定远程仓库的更新
git fetch origin
```

fetch只下载数据，不会自动合并或修改你的工作。

#### git pull
从远程仓库获取并合并更新。

```bash
# 相当于git fetch + git merge
git pull origin main
```

**注意**：如果本地有未提交的修改，pull可能会导致冲突。

#### git push
将本地分支的更新推送到远程仓库。

```bash
# 推送当前分支到远程同名分支
git push origin HEAD

# 推送本地分支到远程特定分支
git push origin local-branch:remote-branch

# 设置上游分支并推送
git push -u origin feature-branch
```

设置上游分支后，后续可以直接使用`git push`和`git pull`。

#### git tag
管理标签。

```bash
# 创建轻量标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "版本1.0.0发布"

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

## 配置管理

### 1. 用户配置

#### 全局配置
设置适用于所有仓库的配置。

```bash
# 设置用户名和邮箱（首次使用Git必须设置）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 设置默认编辑器
git config --global core.editor "code --wait"
```

#### 仓库配置
设置只对当前仓库有效的配置。

```bash
# 在当前仓库使用不同的用户名和邮箱
git config user.name "项目专用名"
git config user.email "项目专用邮箱"
```

#### 别名配置
创建命令别名，简化常用操作。

```bash
# 创建status的别名st
git config --global alias.st status

# 创建用于查看提交历史的别名
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'"
```

设置别名后，可以使用`git st`代替`git status`。

#### 凭证管理
设置凭证存储，避免重复输入密码。

```bash
# 缓存凭证15分钟
git config --global credential.helper cache

# 永久存储凭证
git config --global credential.helper store
```

**安全提示**：永久存储会将凭证明文保存在本地，请确保电脑安全。

### 2. 忽略文件

#### .gitignore
`.gitignore`文件用于指定Git应忽略的文件或目录，这些文件不会被Git跟踪。

常见需要忽略的文件：
- 依赖目录（如`node_modules`）
- 构建输出（如`dist`、`build`）
- 本地配置文件
- 日志文件
- 临时文件
- 敏感信息（如API密钥、密码）

示例`.gitignore`文件：
```
# 依赖目录
node_modules/
jspm_packages/

# 构建输出
/dist
/build
/coverage

# 环境文件
.env
.env.local
.env.development.local

# 日志
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 编辑器配置
.idea/
.vscode/
*.sublime-workspace

# 操作系统文件
.DS_Store
Thumbs.db
```

#### 忽略规则
- `**/logs`：忽略所有名为logs的目录
- `*.log`：忽略所有.log文件
- `!important.log`：不忽略important.log
- `/TODO`：只忽略当前目录下的TODO文件
- `build/`：忽略build目录下的所有文件

#### 强制添加
如果需要添加一个被忽略的文件，可以使用`-f`（强制）选项：

```bash
git add -f config.production.js
```

#### 忽略更新
如果修改了`.gitignore`文件，但Git似乎没有应用新规则，可能需要清除缓存：

```bash
git rm -r --cached .
git add .
git commit -m "更新.gitignore规则"
```

## 高级特性

### 1. 提交管理

#### 提交历史
查看提交历史的各种方式：

```bash
# 查看简洁历史
git log --oneline

# 查看图形化历史
git log --graph --oneline

# 查看特定文件的历史
git log -- index.html

# 查看特定作者的提交
git log --author="张三"

# 按日期筛选提交
git log --since="2023-01-01" --until="2023-12-31"
```

#### 提交修改
修改最近的提交：

```bash
# 修改最后一次提交的信息
git commit --amend -m "新的提交信息"

# 在最后一次提交中添加忘记的文件
git add forgotten-file.js
git commit --amend
```

**注意**：不要修改已推送到远程的提交，这会导致历史不一致。

#### 提交合并
合并多个小提交为一个有意义的提交：

```bash
# 合并最近的3个提交
git rebase -i HEAD~3
```

这会打开一个交互式界面，可以选择保留(`pick`)、合并(`squash`)或编辑(`edit`)提交。

#### 提交回退
回到之前的版本：

```bash
# 软回退（保留更改但撤销提交）
git reset --soft HEAD~1

# 混合回退（撤销提交和暂存，但保留工作目录更改）
git reset HEAD~1  # 默认是--mixed

# 硬回退（完全丢弃更改）
git reset --hard HEAD~1
```

**警告**：`--hard`选项会永久删除更改，慎用！

### 2. 冲突处理

#### 冲突原因
当Git无法自动合并更改时会产生冲突，通常发生在：
- 两个分支修改了同一文件的同一部分
- 一个分支删除了文件，而另一个分支修改了该文件
- 两个分支都添加了同名文件但内容不同

#### 冲突解决
Git会在冲突文件中标记冲突区域：
```
<<<<<<< HEAD
当前分支的内容
=======
要合并的分支的内容
>>>>>>> feature-branch
```

解决步骤：
1. 打开冲突文件
2. 找到并编辑冲突区域（删除标记并保留需要的内容）
3. 保存文件
4. 添加到暂存区：`git add <冲突文件>`
5. 完成合并：`git commit`

#### 合并策略
Git提供了多种合并策略：

- **Fast-forward**：当目标分支是源分支的直接上游时，简单移动指针
```bash
git merge --ff feature
```

- **No Fast-forward**：始终创建新的合并提交，保留分支历史
```bash
git merge --no-ff feature
```

- **Squash**：将源分支的所有提交合并为一个提交
```bash
git merge --squash feature
```

#### 最佳实践
- 经常拉取和合并上游更改，避免大规模冲突
- 保持较小的提交，专注于单一功能或修复
- 在合并前先使用`git diff`查看更改
- 使用可视化工具（如VS Code、SourceTree）解决冲突

## 最佳实践

### 1. 提交规范

#### 提交信息
采用结构化的提交信息格式：
```
<类型>(<范围>): <简短描述>

<详细描述>

<关闭的问题>
```

常见类型：
- `feat`：新功能
- `fix`：修复bug
- `docs`：文档更新
- `style`：代码风格变更（不影响功能）
- `refactor`：重构代码
- `test`：添加测试
- `chore`：构建过程或工具变更

例如：
```
feat(auth): 添加用户登录功能

实现了基于JWT的用户认证系统，包括登录表单和验证逻辑。

Closes #123
```

#### 提交粒度
- 每个提交应专注于单一逻辑变更
- 避免在一个提交中混合多个不相关的更改
- 将大型功能分解为多个小的、相关的提交

#### 提交频率
- 经常提交，避免积累大量更改
- 确保每次提交后代码可以正常工作
- 在完成一个功能点后立即提交

#### 提交检查
使用预提交钩子检查代码质量：
```bash
# 安装husky和lint-staged
npm install --save-dev husky lint-staged

# 在package.json中配置
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.js": ["eslint", "prettier --write", "git add"]
}
```

### 2. 分支策略

#### 分支命名
采用一致的分支命名约定：
- `main`/`master`：主分支，保持稳定可部署
- `develop`：开发分支，集成最新功能
- `feature/xxx`：新功能分支
- `bugfix/xxx`：修复bug的分支
- `hotfix/xxx`：紧急修复生产环境问题的分支
- `release/x.y.z`：发布准备分支

#### 分支管理
常见的分支模型：
- **Git Flow**：适合有计划发布的大型项目
- **GitHub Flow**：简化版，适合持续部署
- **GitLab Flow**：结合环境分支的混合模型

#### 合并策略
根据不同情况选择合并方式：
- 使用`merge`保留完整历史
- 使用`rebase`创建线性历史
- 使用`squash`合并简化历史

#### 发布流程
标准发布流程：
1. 从`develop`创建`release/x.y.z`分支
2. 在发布分支上进行最终测试和修复
3. 合并到`main`并打标签
4. 将发布更改合并回`develop`

## 常见问题与解决方案

### 1. "我提交了错误的更改怎么办？"
```bash
# 修改最后一次提交
git commit --amend

# 撤销最后一次提交但保留更改
git reset HEAD~1

# 完全撤销最后一次提交（危险！）
git reset --hard HEAD~1
```

### 2. "我想丢弃所有未提交的更改"
```bash
# 丢弃工作区的更改
git checkout -- .

# 丢弃工作区和暂存区的更改
git reset --hard
```

### 3. "我不小心删除了一个分支"
```bash
# 查看最近的操作
git reflog

# 恢复删除的分支
git checkout -b 分支名 提交ID
```

### 4. "我需要暂时切换到其他任务"
```bash
# 保存当前更改
git stash

# 完成其他任务后返回
git stash pop
```

## 总结

Git是一个功能强大的版本控制系统，掌握它可以极大提高你的开发效率。从基本的提交、分支操作，到高级的合并策略和团队协作，Git都提供了丰富的工具和命令。

作为前端开发者，建议你：
1. 养成良好的提交习惯，编写清晰的提交信息
2. 学会使用分支进行功能开发和实验
3. 掌握团队协作的最佳实践
4. 了解如何处理冲突和紧急情况

## 拓展阅读

- [Pro Git书籍](https://git-scm.com/book/zh/v2) - 全面的Git学习资源
- [Git官方文档](https://git-scm.com/doc) - 官方参考文档
- [GitHub Learning Lab](https://lab.github.com/) - 交互式学习GitHub和Git
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) - 结构化提交信息规范

> 注：本文档会持续更新，欢迎关注！ 