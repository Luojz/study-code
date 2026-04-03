# State: Write — 更新状态文件

## 写入时机

| 事件 | 更新的文件 |
|------|-----------|
| 展开了一个节点 | tree-state.yaml, roadmap.yaml, snapshot.md |
| 讲解了一个函数 | coverage.yaml (level→1), snapshot.md, knowledge/ |
| 提问答对 | coverage.yaml (level→2), progress.yaml |
| 练习正确 | coverage.yaml (level→3), snapshot.md |
| 模拟通过 | coverage.yaml (level→4), snapshot.md |
| 发生偏离 | drift-log.yaml, progress.yaml |
| 用户说"不学了" | snapshot.md (详细断点), progress.yaml |
| 模式切换 | progress.yaml (learning_mode, previous_mode) |

## snapshot.md 生成规则

每次会话中断或关键节点时更新 snapshot.md：

```markdown
# 学习快照

## 当前位置
- **DAG 节点**: {当前节点 ID}
- **文件路径**: {当前文件路径}
- **函数组**: {当前函数组名}
- **当前函数**: {当前正在讲的函数名}
- **讲解进度**: {精确到函数内的进度描述}

## 上次对话摘要
**老师傅**: {最后一条老师傅消息摘要}
**新人**: {最后一条新人消息摘要}
**老师傅正准备**: {下一步要讲的内容}

## 待补充
- {还没讲的内容}

## 下一步建议
{自然语言描述}
```

## knowledge/ 笔记生成规则

每学完一个模块，在 `knowledge/` 下生成笔记：
```
knowledge/
├── 00-mental-model/
│   └── architecture.md
├── 01-foundations/
│   ├── seajs.md
│   └── native-bridge.md
└── 02-modules/
    └── personal-center-init.md
```

笔记包含：关键职责、设计意图摘要、陷阱提醒、关联的 DAG 节点 ID。

## 更新原则
- 每次状态变更只更新相关文件
- 覆盖率更新是增量式的
- snapshot.md 在每次关键节点都更新
