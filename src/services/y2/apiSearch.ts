import request from '@/utils/request';

// 全局搜索
export function globalSearch(keyword:string) {
  return request<ApiSearch.Default>('/ApiSearch/globalSearch',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      keyword: keyword,
    }
  })
}