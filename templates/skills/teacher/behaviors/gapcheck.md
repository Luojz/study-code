# Behavior: Gapcheck — 盲区检查

检查学习覆盖率盲区，输出三部分。

## 触发条件
- 用户说 "还有哪些没学的" / "学得怎样了" / "查漏补缺"
- 编排器判断需要提示盲区时

## 三部分盲区输出

### Part A: 已发现但未学的函数
```
从 coverage.yaml 筛选 level = 0 的函数

📋 已发现但未学的函数（共 X 个）：

  重要性排序：
  1. [高] init() — 入口函数，被 12 处引用
  2. [高] fetchData() — 数据请求，被 8 处引用
  3. [中] formatMoney() — 金额格式化，被 6 处引用
  4. [低] parseConfig() — 配置解析，被 2 处引用

  建议优先学前 3 个。
```

### Part B: 已发现但未展开的依赖节点
```
从 roadmap.yaml 筛选 status = discovered 且 expanded = false 的节点

📁 发现了但还没展开的模块：

  1. common/tools.js — index.js 依赖它，被引用 20+ 次
  2. z_modules/native/ — 业务层调用 native 能力的桥梁
  3. jump.js — 页面跳转方法，开发中经常要新增跳转

  建议先展开 tools.js，它是被引用最多的。
```

### Part C: 从未展开的大分支
```
从 tree-state.yaml 找出顶层目录中从未展开的分支

🌲 完全未探索的分支：

  1. jy/ — 交易模块（目录结构未知）
  2. hq/ — 行情模块（目录结构未知）
  3. zx/ — 资讯模块（目录结构未知）

  如果你负责这些模块，建议展开看看。
  如果只负责个人中心，可以先不管。
```

## 排序策略

按以下因素综合排序：
1. 被引用频率（require/import 次数）
2. 当前学习路径的邻近度
3. 学习目标相关性（config.yaml 中的 focus_areas）
