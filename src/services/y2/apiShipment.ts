import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';
export async function importShipmentTask(options:{
  languages_id:string,
  file:File,
  send_notify:boolean,
}){
  const res = await request<ApiShipment.Default>(`/ApiShipment/importShipmentTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 查询批量发货任务状态
export async function batchShipmentStatus(options:{
  languages_id:string,
  task_id:string,
}){
  const res = await request<ApiShipment.Default>(`/ApiShipment/batchShipmentStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}