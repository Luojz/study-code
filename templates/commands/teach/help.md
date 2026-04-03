---
name: "TEACH: Help"
description: List all study-code commands and usage
category: Learning
tags: [learning, help, documentation]
---

List all study-code commands with descriptions and usage guidance.

---

**Input**: None

**Output**

```
# Study-Code 命令

## 核心命令（推荐）

### /teach:init
初始化学习系统。
- 4 维度摸底（背景、经验、目标、疑问）
- 扫描项目结构，发现入口点
- 创建状态文件在 `.study-code/` 目录

### /teach
主学习命令 — 自然对话即可。
- 读取当前学习状态，智能引导下一步
- 支持自然语言，自动理解意图：

| 你说... | 系统理解 |
|---------|---------|
| "继续" | 继续当前内容 |
| "讲讲XXX" | 讲解特定话题 |
| "XXX怎么调用" | 追踪功能路径 |
| "考考我" | 出题测试 |
| "练练手" | 出练习 |
| "模拟实战" | 模拟真实需求 |
| "有哪些没学" | 检查盲区 |
| "不学了" | 保存进度，下次继续 |

**就这两个命令！** `/teach:init` 初始化，`/teach` 学习。系统理解自然语言。

---

## 学习模式

### 模式 A：功能故事法（目标驱动）
追踪一个功能从入口到终点的完整调用链。
适合：有具体开发任务，想快速理解某功能。

### 模式 B：分层递进法（系统学习）
从入口点开始，按依赖关系逐步展开。
适合：系统学习整个代码库。

两种模式可以在学习中自然切换，不需要手动设置。

---

## 状态文件

学习进度保存在 `.study-code/` 目录（项目根目录下）：

| 文件 | 说明 |
|------|------|
| config.yaml | 学习者配置（引导强度、提问频率） |
| progress.yaml | 当前进度（光标位置、会话统计） |
| roadmap.yaml | 学习路线 DAG（节点、依赖、状态） |
| coverage.yaml | 覆盖率（函数级 5 层追踪 Level 0-4） |
| tree-state.yaml | 树展开状态（已展开/发现的节点） |
| snapshot.md | 会话快照（精确断点恢复） |
| mental-model.md | 心智模型（架构认知） |
| drift-log.yaml | 偏离日志（问题记录） |

学习笔记生成在 `.study-code/knowledge/` 目录。

---

## 覆盖率层级

| Level | 含义 | 如何达成 |
|-------|------|---------|
| 0 | 已发现 | 展开文件时自动发现函数签名 |
| 1 | 听过 | 老师傅讲过这个函数 |
| 2 | 能复述 | 提问答对，能用自己的话说 |
| 3 | 能找到 | 练习中能定位到代码 |
| 4 | 能修改 | 模拟实战中正确分析修改影响 |

---

## 快速开始

1. `/teach:init` 初始化
2. `/teach` 开始学习
3. 自然对话 — 系统处理一切
```
