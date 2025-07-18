// src/utils/request.ts
import { request } from '@umijs/max';

/**
 * 统一封装的 request 方法，自动添加 API 前缀
 */
export default function <T>(url: string, options?: any):Promise<T>{
  // 判断是否是绝对地址（带 http）
  const isAbsoluteUrl = url.startsWith('http');

  const isProduction = process.env.NODE_ENV === 'production';

  // 获取当前环境变量中的 API 地址
  const apiPrefix = process.env.VITE_API_PREFIX || '/api';
  const apiProdUrl = process.env.VITE_API_PROD_URL || '//api.handingyun.cn/y2';

  // console.log(process.env.NODE_ENV)

  // 拼接完整 URL
  console.log(`${apiPrefix}${url}`)
  const fullUrl = isAbsoluteUrl ? url : false ? `${apiProdUrl}${url}` : `${apiPrefix}${url}`;

  return request<T>(fullUrl, options);

}