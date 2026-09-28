<div align="center">

# study-code

**把你的 AI 编程工具变成带你熟悉代码库的老师傅**

[![npm version](https://img.shields.io/npm/v/study-code.svg)](https://www.npmjs.com/package/study-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/node/v/study-code.svg)](https://nodejs.org)

[English](https://github.com/luojz/study-code/blob/master/README.md) · [GitHub 仓库](https://github.com/luojz/study-code)

---

</div>

## 它是什么？给谁用？

给你一个陌生的代码库——刚入职接手项目、接手别人的模块、或者想系统搞懂一个开源项目。study-code 把一套"老师傅带新人"的教学系统装进你的项目：你用大白话提问，AI 像经验丰富的老同事一样带你学——每个函数讲三层：**做什么、为什么这样设计、哪里容易踩坑**，不是逐行翻译代码。

没有配置文件，没有概念要学。装上，初始化，开始聊。

支持 **Claude Code**（自动识别）和 **ZCode**（导入一次命令）。

## 快速开始

```bash
# 1. 安装
npm install -g study-code

# 2. 进入你的项目，安装教学系统
cd your-project
study-code init
```

`study-code init` 只做一件事：把命令和教学文件写进项目的 `.claude/` 目录。装完之后看你用哪个工具：

### 用 Claude Code：直接开始，无需导入

打开 Claude Code，输入：

```
/teach:init    → 摸底评估 + 自动扫描项目结构（每个项目一次）
/teach:teach   → 开始学习，之后全靠自然对话
```

### 用 ZCode：导入命令（一次）

ZCode 不自动读取 `.claude/` 目录，把命令导入一次即可，两种方式任选：

- 用 ZCode 的导入功能，导入 `.claude/commands/teach/` 下的命令
- 或手动复制：把 `.claude/commands/teach/` 复制到项目的 `.zcode/commands/teach/`（ZCode 原生扫描 `.zcode/commands/`，子目录命令名同样是 `/teach:xxx`）

导入后同样输入 `/teach:init` 开始。教学文件本身（`.claude/skills/teacher/`）是普通 markdown，命令执行时 AI 会自己去读，不需要额外处理。

## 你的前十分钟会经历什么

第一次 `/teach:init`，老师傅先摸底——像聊天一样问几个问题：

```
老师傅: 你好！我是来帮你熟悉这个代码库的。先了解下你的背景——
        你之前主要用什么语言/框架？
你:      Vue 写得多，React 碰过一点
老师傅: 模块加载器（Webpack 这类）用过吗？
你:      Webpack 用过
...
老师傅: 明白了。你是 Vue 背景、来接手维护这个项目——
        我先扫一眼项目结构给你画张架构图，然后从入口文件开始带。
```

然后 `/teach:teach`，直接说人话：

```
你:      这个项目页面是怎么组织起来的？
老师傅: 我们跟着一次真实的页面加载走一遍。
        你打开首页时，最先跑的是 index.js 里的 init()——它做三件事：
        注册模块、初始化实例、调接口拿用户信息。
        注意第三件事：拿用户信息是异步的，但页面没等它就先渲染了——
        所以首屏偶尔会闪一下默认值，原因就在这。
        这个函数有 500 多行，今天先讲这三十行，下次接着讲？
```

## 学多深，花多少 token

项目有 1000 个文件，你只学其中 50 个？token 就只花那 50 个的。你说"看看 vue 目录"，它才展开那一层；你说"这个文件里有什么函数"，它才列出函数清单。不学的部分永远不扫。

进度存在项目的 `.study-code/` 目录里，精确到"某个函数讲到哪"。关掉对话明天接着学；今天用 Claude Code、明天换 ZCode，也从同一个断点继续——状态在项目里，不绑定工具。

两种学法，看你来的目的：

> **"我要改交易功能"** → 从功能入口带你追完整调用链，快速定位要改的代码
>
> **"刚接手这个项目"** → 从入口文件开始，按依赖关系系统学一遍

## 学到多深，有刻度

| 级别 | 含义 | 怎么达成 |
|-----|------|---------|
| 0 | 已发现 | 展开文件时自动发现 |
| 1 | 听过 | 老师傅讲过 |
| 2 | 能复述 | 提问答对 |
| 3 | 能找到 | 练习中定位到代码 |
| 4 | 能修改 | 实战模拟通过 |

"听懂了"不算数——提问答对才算"能复述"，练习中找到代码才算"能找到"，跨模块模拟通过才算"能修改"。学到"能修改"，就可以接真实需求了。

## 它是怎么工作的（可以不读）

```
.claude/
├── commands/teach/    ← 三个命令：/teach:init、/teach:teach、/teach:help
└── skills/teacher/    ← 教学逻辑：编排器 + 8 个行为规范 + 状态文件格式
```

命令是薄入口，正文一句委托给 `skills/teacher/orchestrator.md`：每轮读状态 → 决定下一步 → 理解你的自然语言 → 路由到对应行为（展开/讲解/追踪/提问/练习/模拟/查盲区/处理跑题）→ 回写状态。项目按需展开分四层（L0 根目录 → L1 子目录 → L2 文件 → L3 函数签名）。全部智能在 markdown 提示词里，npm 包本身零 AI 逻辑、纯文件复制。

学习状态（8 个文件）在项目根的 `.study-code/`：摸底配置、进度光标、学习路线图、覆盖率、会话快照、心智模型等。

## 系统要求

- Claude Code（自动识别）或 ZCode（导入命令）
- Node.js ≥ 16

## 作者

**Luojz** — [GitHub 主页](https://github.com/luojz)

## License

MIT
