import request from '@/utils/request';
import { errHandle } from './apiAppstore';

// 全局搜索
export async function globalSearch(keyword:string) {
  const res = await request<ApiSearch.Default>('/ApiSearch/globalSearch',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      keyword: keyword,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}