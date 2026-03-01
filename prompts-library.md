# 前端 Prompt 黄金结构
不要只说“帮我写个表单”
**你的 Prompt 必须包含以下 5 要素（RC-COF 模型）**
- **Role (角色)**：指定 AI 为“资深 React 架构师”。
- **Context (上下文)**：说明项目技术栈 (Next.js App Router, TS, Tailwind)。
- **Constraint (约束)**：强制规范（如：禁止 any，使用 zod 校验，移动端优先）。
- **Objective (目标)**：明确具体功能（如：带防抖的搜索框）。
- **Format (格式)**：要求输出代码结构、注释风格。

## 1. 🧱 复杂业务组件生成
> **场景**：需要快速搭建符合规范的 CRUD 组件。
```prompt
你是一个资深 React 架构师。请基于 Next.js (App Router), TypeScript, Tailwind CSS 编写一个 高级数据表格。
要求：
1. 使用 Functional Components + Hooks。
2. 类型定义严格，禁止使用 any，使用 interface 定义 Props。
3. 样式使用 Tailwind，支持深色模式 (dark:)。
4. 功能包含：[分页、排序、行选择]。
5. 代码结构清晰，将逻辑抽离为 custom hooks (如果复杂)。
6. 添加 JSDoc 注释说明关键 Props。
```
## 2. 🪝 自定义 Hook 生成
> **场景**：复用逻辑，表单提交处理。
```prompt
你是一个资深 React 架构师。请编写一个名为 useSubmit 的 TypeScript Hook。
功能描述：处理表单状态、验证、提交 loading 状态
依赖库：使用 react-hook-form 和 zod 进行验证。
返回值：返回 { formState, handleSubmit, errors, isSubmitting }。
要求：包含完整的类型推断，处理边缘情况（如网络错误），并给出使用示例
```
## 3. 📝 TypeScript 类型体操
> **场景**：复杂的泛型、工具类型推导。
```prompt
我有以下数据结构：[粘贴接口或数据样本]。
请帮我生成对应的 TypeScript Interface。
额外要求：
1. 生成一个 Utility Type，使得某些字段变为可选。
2. 生成一个 API Response 类型，包含 data, code, message 通用结构。
3. 确保所有字段都有注释。
```
## 4. 🎨 Tailwind 样式重构
> **场景**：将 CSS 模块或内联样式转为 Tailwind。
```prompt
请将以下 CSS 代码重构为 Tailwind CSS 类名。
要求：
1. 保持响应式设计 (sm:, md:, lg:)。
2. 提取重复样式为 @apply (如果在 CSS 文件中) 或直接组合类名。
3. 确保颜色使用 design token 变量 (如 bg-primary)。
[粘贴旧 CSS 代码]
```
## 5. 🔍 代码审查与优化 (Code Review)
> **场景**：检查自己写的代码，寻找性能隐患。
```prompt
请作为 Tech Lead 审查以下 React 代码。
关注点：
1. 是否有不必要的重渲染？(检查 useEffect 依赖，memo 使用)
2. 是否有内存泄漏风险？
3. 类型安全是否完善？
4. 可访问性 (a11y) 是否达标？
请给出具体的修改建议代码片段，并解释原因。
[粘贴代码]
```
## 6. 🐞 Bug 定位与修复
> **场景**：遇到报错，快速解决。
```prompt
我遇到了以下错误：[粘贴错误信息]。
相关代码片段如下：[粘贴代码]。
请分析可能的原因，并提供 3 种解决方案，按推荐程度排序。
如果是异步时序问题，请解释 Event Loop 机制在此处的影响。
```
## 7. 🔄 老代码重构 (Legacy Refactor)
> **场景**：将 Class 组件或旧函数式组件升级为现代最佳实践。
```prompt
请重构以下 React 代码：
1. 将 Class Component 转换为 Functional Component + Hooks。
2. 替换过时的生命周期方法 (componentDidMount 等) 为 useEffect。
3. 提取重复逻辑为 Custom Hook。
4. 增加 TypeScript 类型定义。
[粘贴旧代码]
```
## 8. 📦 单元测试生成 (Jest/Vitest)
> **场景**：为关键业务逻辑补全测试。
```prompt
请为以下 [组件/Hook] 编写单元测试，使用 Vitest + React Testing Library。
覆盖场景：
1. 正常渲染。
2. 用户交互 (点击、输入)。
3. 异步数据加载成功/失败。
4. 边缘情况 (空数据、网络错误)。
要求：测试用例描述清晰 (it should...)，Mock 外部依赖。
[粘贴代码]
```
## 9. 📄 API 接口层封装
> **场景**：统一请求处理。
```prompt
请基于 Axios 封装一个适用于 Next.js 前端的请求类。
要求：
1. 拦截器处理：自动注入 Token，统一处理 401/403/500 错误。
2. 泛型支持：响应数据自动推断类型。
3. 取消请求支持 (AbortController)。
4. 适配 Next.js Server Component 和 Client Component 的不同调用场景。
```
## 10. 💬 技术文档/注释生成
> **场景**：统一请求处理。
```prompt
请为以下代码模块生成技术文档。
包含：
1. 功能概述。
2. Props/Parameters 详细说明表格。
3. 使用示例 (Code Snippet)。
4. 注意事项/限制条件。
语言：中文，风格专业简洁。
[粘贴代码]。
```