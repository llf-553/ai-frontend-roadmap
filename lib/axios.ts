'use client';

import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
});

// 请求拦截
request.interceptors.request.use(
  (config) => {
    // 可加 token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('请求错误：', error);
    // 统一错误提示
    return Promise.reject(error);
  }
);

export default request;