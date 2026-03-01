'use client';

import { useState, useCallback } from 'react';
import SearchForm from '@/components/search/SearchForm';

/**
 * 首页组件 - AI 前端学习路线展示
 * 使用 use client 指令，使该组件在客户端渲染以支持交互
 */
export default function Home() {

  // 最近一次搜索的关键字，用于在页面上展示搜索结果（示例）
  const [lastQuery, setLastQuery] = useState<string>('');

  /**
   * 处理搜索提交：
   * - 接收 SearchForm 组件回传的搜索关键字
   * - 在页面上展示，也可以在这里发起接口请求等
   */
  const handleSearch = useCallback((value: string) => {
    setLastQuery(value);
    // 实际项目中，可以在这里触发接口请求或路由跳转
    // 例如：router.push(`/search?q=${encodeURIComponent(value)}`);
    // 这里简单打印到控制台，便于在开发者工具中观察
    console.log('搜索提交：', value);
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
      {/* 智能搜索表单：支持防抖、下拉联想和键盘导航 */}
      <div className="mt-8 w-full max-w-xl">
        <SearchForm onSearch={handleSearch} />
        {lastQuery && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            最近一次搜索：
            <span className="font-semibold text-gray-900 dark:text-white">
              {lastQuery}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}