"use client";

import * as React from "react";

/**
 * 封装请求函数的类型
 * P: 参数类型
 * R: 返回数据类型
 */
export type RequestService<P, R> = (params: P) => Promise<R>;

/**
 * useRequest 配置项
 */
export interface UseRequestOptions<P, R> {
  /** 初始参数（用于自动加载或作为默认参数） */
  defaultParams?: P;
  /** 是否在挂载时自动执行一次请求（配合 defaultParams 使用） */
  manual?: boolean;
  /** 自动重试次数（默认 0 不重试） */
  retryCount?: number;
  /** 每次重试之间的延迟（毫秒，默认 1000ms） */
  retryDelay?: number;
  /** 请求成功回调 */
  onSuccess?(data: R, params: P): void;
  /** 请求失败回调 */
  onError?(error: unknown, params: P): void;
}

/**
 * useRequest 返回结果
 */
export interface UseRequestResult<P, R> {
  /** 是否正在请求中 */
  loading: boolean;
  /** 最新的数据 */
  data: R | null;
  /** 最新的错误 */
  error: unknown | null;
  /** 最近一次请求使用的参数 */
  params: P | null;
  /** 触发请求（会应用重试逻辑） */
  run(params: P): Promise<R | null>;
  /** 使用上一次的参数重新请求（若还不存在参数则不执行） */
  refresh(): Promise<R | null>;
  /** 重置状态（data/error/loading/params） */
  reset(): void;
}

/**
 * 通用请求 Hook：
 * - 发送请求
 * - 管理 loading / error / data
 * - 支持自动重试
 */
export function useRequest<P, R>(
  service: RequestService<P, R>,
  options?: UseRequestOptions<P, R>,
): UseRequestResult<P, R> {
  const {
    defaultParams,
    manual = true,
    retryCount = 0,
    retryDelay = 1000,
    onSuccess,
    onError,
  } = options ?? {};

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<R | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);
  const [params, setParams] = React.useState<P | null>(
    defaultParams ?? null,
  );

  const retryCountRef = React.useRef<number>(retryCount);
  const retryDelayRef = React.useRef<number>(retryDelay);

  /** 内部执行函数，包含重试逻辑 */
  const execute = React.useCallback(
    async (currentParams: P): Promise<R | null> => {
      setLoading(true);
      setError(null);

      let attempt = 0;
      const maxAttempts = Math.max(0, retryCountRef.current) + 1;

      // 简单的线性重试策略
      while (attempt < maxAttempts) {
        try {
          const result = await service(currentParams);
          setData(result);
          setError(null);
          onSuccess?.(result, currentParams);
          setLoading(false);
          return result;
        } catch (err) {
          attempt += 1;
          if (attempt >= maxAttempts) {
            setError(err);
            onError?.(err, currentParams);
            setLoading(false);
            return null;
          }

          // 等待一段时间后重试
          const delay = retryDelayRef.current;
          if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      // 理论上不会走到这里
      setLoading(false);
      return null;
    },
    [service, onSuccess, onError],
  );

  /** 主动触发请求 */
  const run = React.useCallback(
    async (nextParams: P): Promise<R | null> => {
      setParams(nextParams);
      return execute(nextParams);
    },
    [execute],
  );

  /** 使用上一次参数重试 */
  const refresh = React.useCallback(async (): Promise<R | null> => {
    if (params == null) {
      return null;
    }
    return execute(params);
  }, [execute, params]);

  /** 重置所有状态 */
  const reset = React.useCallback(() => {
    setLoading(false);
    setData(null);
    setError(null);
    setParams(defaultParams ?? null);
  }, [defaultParams]);

  /** 自动执行一次（当 manual=false 且存在 defaultParams 时） */
  React.useEffect(() => {
    if (!manual && defaultParams != null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      execute(defaultParams);
    }
  }, [manual, defaultParams, execute]);

  return {
    loading,
    data,
    error,
    params,
    run,
    refresh,
    reset,
  };
}