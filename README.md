<div align="center">

# study-code

**Turn Claude Code into your personal code mentor**

[![npm version](https://img.shields.io/npm/v/study-code.svg)](https://www.npmjs.com/package/study-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/node/v/study-code.svg)](https://nodejs.org)

[中文文档](README.zh-CN.md)

---

</div>

## What is it?

**study-code** installs an AI teaching system into your project's Claude Code environment. It makes Claude behave like a senior colleague who walks you through any codebase — not line-by-line translation, but **why** things work the way they do.

No config files. No learning curve. Install, init, talk.

## Quick Start

### Option 1: Install via npm (Recommended)

```bash
npm install -g study-code
cd your-project
study-code init
```

### Option 2: Manual Install

```bash
git clone https://github.com/user/study-code.git
cd study-code
npm install
npm link
```

Then in your project:

```bash
cd your-project
study-code init
```

### Start Learning

Open Claude Code in your project and type:

```
/teach:init    →  Assessment + project structure scan
/teach         →  Start learning — just talk naturally
```

That's it. Two commands. Zero configuration.

---

## How It Teaches

### Conversational, Not Mechanical

```
You:      /teach
Mentor:   Last time we got to the native bridge in init(), I was about to explain fetchUserInfo(). Continue?
You:      Does this function return a string instead of a number?
Mentor:   Great question! This is actually a common gotcha...
```

Three-dimensional explanation: **What** it does, **Why** it's designed that way, **Pitfalls** to watch out for.

### Expand Only What You Need

```
L0  Project root       ← Auto-scanned on init
L1  Directory listing   ← You say "look at the vue directory"
L2  File listing        ← You say "expand components"
L3  Function signatures ← You say "what functions are in this file"
```

A project with 1,000 files but you only learn 50? Tokens spent only on those 50.

### 5-Level Coverage Tracking

| Level | Meaning | How to reach it |
|-------|---------|-----------------|
| 0 | Discovered | Auto-discovered when expanding files |
| 1 | Heard | Mentor explained it |
| 2 | Can explain | Answered questions correctly |
| 3 | Can locate | Found the code in exercises |
| 4 | Can modify | Passed a practical simulation |

From "knows it exists" to "can independently change the code" — every step is tracked.

### Resume Across Sessions

Close the conversation, come back tomorrow? Exact resume point saved — down to the specific function and line. Next `/teach` picks right up.

---

## Features

- **Progressive scanning** — Expand only what you want to learn, keep token costs controlled
- **DAG learning roadmap** — Guided by code dependency relationships
- **5-level coverage tracking** — Quantifiable learning progress
- **Cross-session resume** — Precise to the function level
- **Adaptive guidance** — Detailed for beginners, concise for veterans
- **Active questioning** — Tests understanding after each concept
- **Drift detection** — Brings you back on topic when you go off-track
- **Practical simulations** — Real-world scenarios once you've learned enough

## Learning Modes

**Mode A — Feature Story (Goal-driven)**
> "I need to change the payment feature" → Traces the full call chain from entry point

Best for: You have a specific task and need to quickly understand the relevant code.

**Mode B — Layered Progression (Systematic)**
> Start from entry points, expand by dependency relationships

Best for: You're taking over a new project and want complete understanding.

Switch modes anytime — just say it in the conversation.

## How It Works

`study-code init` scaffolds teaching skills into your project's `.claude/` directory:

```
.claude/
├── commands/teach/       ← Slash commands (/teach, /teach:init, /teach:help)
└── skills/teacher/       ← Teaching engine (orchestrator, behaviors, schemas)
```

Learning state is saved in `.study-code/` at your project root:

```
.study-code/
├── config.yaml           ← Learner profile & guidance settings
├── progress.yaml         ← Current cursor position & session stats
├── roadmap.yaml          ← Learning DAG (nodes, dependencies, status)
├── coverage.yaml         ← Function-level 5-tier coverage tracking
├── tree-state.yaml       ← Tree expansion state
├── snapshot.md           ← Session snapshot (precise resume point)
├── mental-model.md       ← Architecture mental model
└── drift-log.yaml        ← Off-topic records
```

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js >= 16

## License

MIT
