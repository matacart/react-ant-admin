import request from '@/utils/request';
import cookie from 'react-cookies';

// 基础设置 --- 
export async function getTodayData(startDate:number,endDate:number,options?: { signal?: AbortSignal }) {
  return request<ApiStore.Default>('/ApiStore/today_statistics', {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domainID: cookie.load("domain")?.id,
      startDate:startDate,
      endDate:endDate
    },
    signal: options?.signal,
  })
}
