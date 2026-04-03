# Behavior: Expand — 展开节点

展开一个未展开的树节点，像打开折叠的文件夹一样。

## 四层展开逻辑

注意：展开深度 (L0-L3) 与学习理解层级 (level 0-4) 是独立的两套体系。
- 展开深度：tree-state.yaml 的 level 字段，0-3
- 学习层级：coverage.yaml 的 level 字段，0-4

| 从 → 到 | 操作 | 命令 | 输出 |
|---------|------|------|------|
| L0→L1 | 列出子目录 | `ls <path>` | 子目录名列表 |
| L1→L2 | 列出文件+发现依赖 | 读文件头部 require | 文件列表+大小+依赖边 |
| L2→L3 | 提取函数清单 | 正则提取函数签名 | 函数分组清单 |
| L3→explain | 交给 explain 行为 | 读具体代码 | 函数级讲解 |

### L0→L1: 列出子目录
```
1. 执行 ls <path>，获取子目录和文件名
2. 过滤排除目录：node_modules, dist, .git, img, static/img, vendor
3. 过滤排除文件：*.min.js, *.min.css, .DS_Store
4. 对每个子项标注类型（directory/file）
5. 输出引导（见下方"展开引导输出"）
6. 写入 tree-state.yaml
```

### L1→L2: 文件级展开
```
1. ls <path> 获取文件列表及大小
2. 对每个 JS/TS 文件读前 50 行，提取 require/import 语句
3. 发现外部依赖 → 在 roadmap.yaml 创建 DAG 边 → 标记 "discovered"
4. 输出引导（文件级引导）
5. 写入 tree-state.yaml + roadmap.yaml
```

### L2→L3: 函数级展开
```
1. 读取目标文件全部内容
2. 用正则提取函数签名：
   - function xxx(
   - var xxx = function(
   - xxx: function(
   - const xxx = (
   - methods: { xxx(
3. 按职责分组（根据函数名和上下文推断）：
   - 初始化/init/mount
   - 数据获取/fetch/request/get
   - 事件处理/handle/on/bind
   - 渲染/render/update/draw
   - 工具/format/calc/parse
4. 输出引导（函数级引导）
5. 写入 tree-state.yaml + coverage.yaml（新增发现的函数）
```

### L3→explain: 交给 explain 行为
展开到 L3（函数清单）后，具体的函数讲解交给 explain 行为处理。
tree-state 不会记录 L4，因为函数讲解属于 learning 行为，不是 tree 展开行为。

## 展开引导输出

展开一个节点时，输出四层引导信息：

```
📋 <目录/文件名> 有 X 个子项：

┌─────────────────────────────────────────────────────────────┐
│ 子项名      │ 是什么          │ 多重要     │ 什么时候看     │
├─────────────┼─────────────────┼────────────┼───────────────┤
│ index.js    │ 主入口，5975行  │ ★★★★★    │ 先看（入口）  │
│ logic.js    │ 辅助逻辑，800行 │ ★★★      │ 后看          │
│ jump.js     │ 跳转方法，300行 │ ★★★★    │ 先看（常用）  │
│ cai-fu-*.js │ 财富模块        │ ★★        │ 按需看        │
└─────────────┴─────────────────┴────────────┴───────────────┘

⚠ 前置提醒：
  index.js 依赖 tools.js（未展开）和 native 桥接（未展开）
  ✓ 你已学过心智模型，不影响开始

📌 我的建议顺序：index.js(初始化) → jump.js → index.js(数据) → index.js(事件)

从哪个开始？还是按我建议的来？
```

### 引导强度调整
- **brief（老手）**: 只给前两列（名称+是什么），简要建议
- **standard（中等）**: 给全部四列 + 建议顺序
- **detailed（新手）**: 给全部四列 + 详细解释每个子项 + "跟着我走就行"

## 状态更新

展开完成后更新：
1. `tree-state.yaml` — 新增节点、标记 expansion level (0-3)
2. `roadmap.yaml` — 新增 DAG 节点（status: discovered, expanded: false, level_reached: 0）和边
   - 被展开的父节点：`expanded: true`, `status: expanded`
3. `coverage.yaml` — L3 展开时新增发现的函数（level=0）
4. `snapshot.md` — 更新当前位置

### 新节点写入 roadmap 的标准格式
```yaml
M{X}.{Y}:
  id: "M{X}.{Y}"
  title: "{描述性标题}"
  type: module
  phase: {mental-model|foundation|core|advanced}
  prerequisites: [{前置节点ID}]
  files: ["{关联文件路径}"]
  status: discovered
  level_reached: 0
  expanded: false
  discovered_at: "{ISO datetime}"
```
