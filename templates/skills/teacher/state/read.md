# State: Read — 从状态文件恢复上下文

## 读取优先级

### snapshot.md 优先
如果 snapshot.md 存在且有断点信息，这是最高优先级。

### 其他文件作为补充
按顺序读取：
1. `config.yaml` → 引导强度、提问频率、经验水平
2. `progress.yaml` → 光标位置、学习模式、会话数
3. `roadmap.yaml` → DAG 节点状态、依赖关系
4. `coverage.yaml` → 覆盖率层级（学习理解深度 0-4）
5. `tree-state.yaml` → 树展开状态（展开深度 0-3，与 coverage 独立）
6. `mental-model.md` → 心智模型
7. `drift-log.yaml` → 偏离记录

### 文件不存在或损坏时
用默认值，不报错：
```
config.yaml 不存在 → guidance_level: "standard", question_frequency: "medium"
progress.yaml 不存在 → 光标为空，sessions_completed: 0
coverage.yaml 不存在 → 覆盖率为 0
tree-state.yaml 不存在 → 无展开状态
mental-model.md 不存在 → 空心智模型
drift-log.yaml 不存在 → 无偏离记录
```

### 文件损坏（YAML 格式错误）
```
1. 不要崩溃或报错给用户
2. 用默认值替代损坏的字段
3. 在 snapshot.md 中标注："发现 {文件名} 部分数据异常，已用默认值恢复"
4. 下次写入时用正确格式覆盖
```

### 上下文组装
将所有状态文件的读入结果组装成当前对话的上下文描述。
