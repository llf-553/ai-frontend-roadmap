'use client';

import type { KeyboardEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * 智能搜索表单组件
 *
 * 功能特性：
 * - 输入防抖：输入停止 500ms 后再触发搜索逻辑，减少无效请求
 * - 下拉联想：根据输入内容匹配推荐关键词
 * - 键盘导航：支持 ↑ / ↓ 切换联想词，Enter 提交，Esc 关闭下拉
 */
export interface SearchFormProps {
  /**
   * 搜索提交回调函数
   * @param value 最终提交的搜索关键字
   */
  onSearch?: (value: string) => void;
}

// 模拟的联想关键词数据，可以根据实际业务替换为接口请求
const MOCK_KEYWORDS: string[] = [
  'React 19 新特性',
  'TypeScript 类型体操',
  'Tailwind CSS 响应式布局',
  '前端性能优化',
  'AI 辅助前端开发',
  '大模型应用开发',
  'Next.js 16 App Router',
  'React 服务端组件 RSC',
  '前端工程化最佳实践',
  'React Hooks 进阶',
  '状态管理方案对比',
  '前端测试与自动化',
];

const DEBOUNCE_DELAY = 500; // 防抖时间：500ms

export default function SearchForm({ onSearch }: SearchFormProps) {
  // 输入框实时值（受控组件）
  const [inputValue, setInputValue] = useState<string>('');
  // 防抖后的值，仅在用户停止输入一段时间后更新
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  // 当前联想词列表
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // 当前选中的联想词索引（-1 表示未选中）
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  // 下拉联想是否展开
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * 计算联想词：根据防抖后的输入值，从本地列表中筛选匹配项
   * 这里使用 useMemo 避免在无关状态更新时重复计算
   */
  const filteredSuggestions = useMemo(() => {
    const keyword = debouncedValue.trim().toLowerCase();
    if (!keyword) return [];

    return MOCK_KEYWORDS.filter((item) =>
      item.toLowerCase().includes(keyword),
    ).slice(0, 8); // 最多展示 8 条
  }, [debouncedValue]);

  /**
   * 输入值变化时开启防抖逻辑：
   * - 每次输入重置计时器
   * - 延迟结束后再更新 debouncedValue，从而触发搜索计算
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(inputValue);
    }, DEBOUNCE_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [inputValue]);

  /**
   * 当防抖后的值变化时，更新联想词列表以及下拉展示状态
   */
  useEffect(() => {
    setSuggestions(filteredSuggestions);
    setIsOpen(filteredSuggestions.length > 0);
    // 默认选中第一条，提升键盘操作体验
    setActiveIndex(filteredSuggestions.length > 0 ? 0 : -1);
  }, [filteredSuggestions]);

  /**
   * 提交最终搜索值（支持表单提交和键盘回车）
   */
  const submitSearch = useCallback(
    (rawValue?: string) => {
      const value = (rawValue ?? inputValue).trim();
      if (!value) return;

      onSearch?.(value);
      // 将输入框同步为最终提交值
      setInputValue(value);
      setIsOpen(false);
    },
    [inputValue, onSearch],
  );

  /**
   * 处理表单提交（点击按钮或在输入框内回车）
   */
  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      // 如果当前有选中的联想词，优先使用联想词
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        submitSearch(suggestions[activeIndex]);
      } else {
        submitSearch();
      }
    },
    [activeIndex, suggestions, submitSearch],
  );

  /**
   * 输入框按键处理：
   * - ArrowDown / ArrowUp：在联想词之间移动焦点
   * - Enter：提交当前选中项或输入内容
   * - Escape：关闭下拉
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        // 没有展开但有联想词时，先展开
        if (suggestions.length > 0) {
          setIsOpen(true);
          setActiveIndex(0);
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          if (suggestions.length === 0) return;
          event.preventDefault();
          setActiveIndex((prev) =>
            prev < 0 ? 0 : (prev + 1) % suggestions.length,
          );
          break;
        }
        case 'ArrowUp': {
          if (suggestions.length === 0) return;
          event.preventDefault();
          setActiveIndex((prev) =>
            prev <= 0 ? suggestions.length - 1 : prev - 1,
          );
          break;
        }
        case 'Enter': {
          // 交给表单 onSubmit 统一处理，避免重复逻辑
          break;
        }
        case 'Escape': {
          setIsOpen(false);
          setActiveIndex(-1);
          break;
        }
        default:
          break;
      }
    },
    [isOpen, suggestions.length],
  );

  /**
   * 选择联想词（使用 onMouseDown 避免因失焦导致点击丢失）
   */
  const handleSuggestionMouseDown = useCallback(
    (value: string) => {
      submitSearch(value);
    },
    [submitSearch],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
      aria-label="智能搜索表单"
    >
      <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-900/40">
        <input
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
          placeholder="搜索 AI 前端学习主题，例如：React 19 新特性"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-activedescendant={
            activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined
          }
        />

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-gray-900"
        >
          搜索
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          {suggestions.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item}
                id={`search-suggestion-${index}`}
                role="option"
                aria-selected={isActive}
                onMouseDown={(event) => {
                  // 阻止失焦导致无法触发选择逻辑
                  event.preventDefault();
                  handleSuggestionMouseDown(item);
                }}
                className={`cursor-pointer px-3 py-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}

