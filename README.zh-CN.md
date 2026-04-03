<div align="center">

# study-code

**让 Claude Code 变成你的专属代码老师**

[![npm version](https://img.shields.io/npm/v/study-code.svg)](https://www.npmjs.com/package/study-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/node/v/study-code.svg)](https://nodejs.org)

[English](README.md)

---

</div>

## 它是什么？

**study-code** 把一套 AI 教学系统安装到你的项目里，让 Claude Code 变成一个经验丰富的"老同事"——不是逐行翻译代码，而是真正帮你理解**为什么**这样写。

没有配置文件，没有学习曲线。装上，初始化，开始聊。

## 快速开始

### 方式一：npm 安装（推荐）

```bash
npm install -g study-code
cd your-project
study-code init
```

### 方式二：手动安装

```bash
git clone https://github.com/user/study-code.git
cd study-code
npm install
npm link        # 全局注册 study-code 命令
```

然后在你的项目中：

```bash
cd your-project
study-code init
```

### 开始学习

在项目中打开 Claude Code，输入：

```
/teach:init    →  摸底评估 + 自动扫描项目结构
/teach:teach   →  开始学习，自然对话即可
```

就两个命令。零配置。

---

## 它怎么教？

### 像真人聊天，不像读文档

```
你:      /teach:teach
老师傅:  上次你学到 init() 的 native 桥接部分，我正准备讲 fetchUserInfo()。继续？
你:      这个函数返回的是字符串不是数字吗？
老师傅:  好问题！这个确实容易踩坑……
```

三维度讲解——**功能**（做什么）、**意图**（为什么）、**陷阱**（注意什么）。

### 按需展开，不为整个代码库烧 Token

```
L0  项目根目录     ← 初始化时自动扫描
L1  子目录列表     ← 你说"看看 vue 目录"
L2  文件列表       ← 你说"展开 components"
L3  函数签名       ← 你说"这个文件里有什么函数"
```

1000 个文件的项目，你只学 50 个？Token 只花那 50 个的。

### 5 级覆盖率追踪

| Level | 含义 | 怎么达成 |
|-------|------|---------|
| 0 | 已发现 | 展开文件时自动发现 |
| 1 | 听过 | 老师傅讲过 |
| 2 | 能复述 | 提问答对 |
| 3 | 能找到 | 练习中定位到代码 |
| 4 | 能修改 | 实战模拟通过 |

从"知道有这个东西"到"能独立改代码"，每一步都有据可查。

### 跨对话断点恢复

关掉对话，明天再开？精确记录你学到哪个函数的哪一行，下次 `/teach:teach` 直接接上。

---

## 功能特点

- **渐进式扫描** — 只展开你想学的部分，Token 消耗可控
- **DAG 学习路线图** — 按代码依赖关系引导学习顺序
- **5 级覆盖率追踪** — 学习效果可量化
- **跨对话断点恢复** — 精确到函数级别
- **自适应引导** — 新手详细讲，老手简明讲
- **主动提问** — 讲完就问，检验理解
- **偏离检测** — 跑题了？回答完引导回来
- **实战模拟** — 学到一定程度，出真实需求考你

## 学习模式

**模式 A — 功能故事法（目标驱动）**
> "我要改交易功能" → 从入口追踪完整调用链

适合：有明确开发任务，快速定位要改的代码。

**模式 B — 分层递进法（系统学习）**
> 从入口点开始，按依赖关系逐步展开

适合：接手新项目，建立完整代码认知。

两种模式随时切换，直接说就行。

## 工作原理

`study-code init` 将教学技能脚手架安装到项目的 `.claude/` 目录：

```
.claude/
├── commands/teach/       ← 斜杠命令（/teach:teach, /teach:init, /teach:help）
└── skills/teacher/       ← 教学引擎（编排器、行为模块、状态模式）
```

学习状态保存在项目根目录的 `.study-code/` 中：

```
.study-code/
├── config.yaml           ← 学习者配置（引导强度、提问频率）
├── progress.yaml         ← 当前进度（光标位置、会话统计）
├── roadmap.yaml          ← 学习路线 DAG（节点、依赖、状态）
├── coverage.yaml         ← 覆盖率（函数级 5 层追踪）
├── tree-state.yaml       ← 树展开状态
├── snapshot.md           ← 会话快照（精确断点恢复）
├── mental-model.md       ← 心智模型（架构认知）
└── drift-log.yaml        ← 偏离日志
```

## 系统要求

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js >= 16

## License

MIT
