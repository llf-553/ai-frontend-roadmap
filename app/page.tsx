'use client';

import { useState, useCallback } from 'react';

/**
 * 首页组件 - AI 前端学习路线展示
 * 使用 use client 指令，使该组件在客户端渲染以支持交互
 */
export default function Home() {
  // 计数器状态，用于演示 React 状态管理
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存点击处理函数，避免子组件不必要的重渲染
  // 使用函数式更新 setCount(c => c + 1)，避免闭包陷阱
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8"
      // flex: 使用 Flex 布局
      // min-h-screen: 页面最小高度占满一屏
      // flex-col: 主轴垂直方向排列子元素
      // items-center: 交叉轴（水平方向）居中
      // justify-center: 主轴（垂直方向）居中
      // p-8: 整体内边距 2rem，保证内容不贴边
    >
      {/* 页面主标题 */}
      <h1
        className="text-4xl font-bold text-gray-800 dark:text-white"
        // text-4xl: 设置较大的标题字号
        // font-bold: 标题加粗
        // text-gray-800: 浅色模式下为深灰色文字
        // dark:text-white: 深色模式下文字为白色
      >
        AI 前端学习路线
      </h1>

      {/* 交互式计数器按钮，用于演示状态更新 */}
      <button
        type="button"
        onClick={handleIncrement}
        className="mt-8 rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        // mt-8: 按钮与标题之间的上外边距（间距）
        // rounded-lg: 大圆角，按钮更柔和
        // bg-blue-500: 按钮背景为中等饱和度的蓝色
        // px-6 / py-3: 水平 / 垂直内边距，控制按钮尺寸
        // text-white: 文字为白色，与蓝色背景对比清晰
        // transition-colors: 颜色变化时添加过渡动画
        // hover:bg-blue-600: 悬停时背景色加深，提供交互反馈
        aria-label={`当前计数：${count}，点击增加`}
      >
        点击计数: {count}
      </button>
    </main>
  );
}