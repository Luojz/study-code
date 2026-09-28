<div align="center">

# study-code

**Turn your AI coding tool into a personal code mentor**

[![npm version](https://img.shields.io/npm/v/study-code.svg)](https://www.npmjs.com/package/study-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/node/v/study-code.svg)](https://nodejs.org)

[中文文档](https://github.com/luojz/study-code/blob/master/docs/README.zh-CN.md) · [GitHub Repo](https://github.com/luojz/study-code)

---

</div>

## What is it? Who is it for?

Facing an unfamiliar codebase — just joined a team, inherited someone's module, or trying to understand an open-source project? study-code installs a "senior colleague teaching a newcomer" system into your project. You ask questions in plain language; the AI walks you through the code. Every function is taught in three dimensions: **what it does, why it's designed that way, and what pitfalls to watch for** — not line-by-line translation.

No config files. No concepts to learn. Install, init, talk.

Works with **Claude Code** (auto-detected) and **ZCode** (one-time command import).

## Quick Start

```bash
# 1. Install
npm install -g study-code

# 2. Install the teaching system into your project
cd your-project
study-code init
```

`study-code init` does exactly one thing: it writes the commands and teaching files into your project's `.claude/` directory. Then, depending on your tool:

### With Claude Code: just start, no import needed

Open Claude Code in your project and type:

```
/teach:init    → Assessment + project structure scan (once per project)
/teach:teach   → Start learning — from here on, just talk naturally
```

### With ZCode: import the commands (once)

ZCode does not read `.claude/` automatically. Import the commands once, either way:

- Use ZCode's import feature to import the commands under `.claude/commands/teach/`
- Or copy manually: copy `.claude/commands/teach/` to your project's `.zcode/commands/teach/` (ZCode natively scans `.zcode/commands/`; nested directories become `/teach:xxx` commands, same naming as Claude Code)

Then type `/teach:init` to start. The teaching files themselves (`.claude/skills/teacher/`) are plain markdown — the AI reads them on its own while executing the command, nothing extra to set up.

## Your first ten minutes

The first `/teach:init` is a friendly assessment — the mentor chats with you for a moment:

```
Mentor:   Hi! I'm here to help you get familiar with this codebase.
          First, tell me about your background — what languages
          and frameworks do you mostly work with?
You:      Mostly Vue, a little React
Mentor:   Used module bundlers like Webpack?
You:      Yes, Webpack
...
Mentor:   Got it. Vue background, here to maintain this project —
          I'll scan the project structure, sketch you an architecture
          picture, and we'll start from the entry point.
```

Then `/teach:teach` — just talk:

```
You:      How are the pages in this project organized?
Mentor:   Let's follow one real page load.
          When you open the home page, the first thing that runs is
          init() in index.js — it does three things: registers modules,
          creates the app instance, and fetches user info.
          Note the third one: fetching user info is async, but the page
          renders without waiting for it — that's why the first screen
          sometimes flashes default values.
          This function is 500+ lines; let's cover these thirty today
          and continue next time?
```

## Learn as deep as you go — tokens scale with what you learn

A project with 1,000 files but you only learn 50? Tokens are spent only on those 50. Say "look at the vue directory" and it expands just that level; say "what functions are in this file" and it lists just those. Nothing you don't learn ever gets scanned.

Progress is saved in the project's `.study-code/` directory, precise down to "where we stopped inside a function". Close the session and resume tomorrow. Learn with Claude Code today, switch to ZCode tomorrow — the state lives in your project, not in the tool.

Two ways to learn, depending on why you're here:

> **"I need to change the payment feature"** → traces the full call chain from the entry point, fast way to locate what you'll modify
>
> **"I just inherited this project"** → systematic tour from the entry point, expanding by dependencies

## How deep you've learned, on a scale

| Level | Meaning | How to reach it |
|-------|---------|-----------------|
| 0 | Discovered | Auto-discovered when expanding files |
| 1 | Heard | Mentor explained it |
| 2 | Can explain | Answered questions correctly |
| 3 | Can locate | Found the code in exercises |
| 4 | Can modify | Passed a practical simulation |

"Feels understood" doesn't count — answering questions correctly earns "can explain", locating code in exercises earns "can locate", passing a cross-module simulation earns "can modify". Once you reach "can modify", you're ready for real tasks.

## How it works (optional reading)

```
.claude/
├── commands/teach/    ← Three commands: /teach:init, /teach:teach, /teach:help
└── skills/teacher/    ← Teaching logic: orchestrator + 8 behavior specs + state schemas
```

Commands are thin entry points that delegate to `skills/teacher/orchestrator.md`: each turn it reads state → decides the next step → understands your natural language → routes to a behavior (expand / explain / trace / quiz / practice / simulate / gap-check / drift) → writes state back. Expansion is on-demand across four levels (L0 root → L1 directories → L2 files → L3 function signatures). All the intelligence lives in markdown prompts — the npm package itself has zero AI logic; it's pure file copying.

Learning state (8 files) lives in `.study-code/` at the project root: learner profile, progress cursor, learning roadmap, coverage, session snapshot, mental model, and more.

## Requirements

- Claude Code (auto-detected) or ZCode (import commands)
- Node.js >= 16

## Author

**Luojz** — [GitHub](https://github.com/luojz)

## License

MIT
