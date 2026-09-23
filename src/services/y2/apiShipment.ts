import request from '@/utils/request';
export function importShipmentTask(res:{
  languages_id:string,
  file:File,
  send_notify:boolean,
}){
  return request<ApiLogistics.Default>(`/ApiShipment/importShipmentTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...res
    }
  })
}