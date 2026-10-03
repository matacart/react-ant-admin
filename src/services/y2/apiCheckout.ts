import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 获取结算信息
export async function getCheckoutSettingsInfo(options:{
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/settings_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 提交结算配置
export async function setCheckoutSettingsInfo(options:any,signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/settings_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取结算模板 -- 实时
export async function getCheckoutConfigLive(options:{
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_live`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取结算模板 -- 草稿
export async function getCheckoutConfigDrafts(options:{
  languages_id:string,
  type:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_drafts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 复制结算模板 -- 草稿
export async function copyCheckoutConfig(options:{
    languages_id:string,
    source_profile_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_copy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除结算模板 -- 草稿
export async function deleteCheckoutConfig(options:{
    languages_id:string,
    profile_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 重命名结算模板
export async function renameCheckoutConfig(options:{
    languages_id:string,
    profile_id:string,
    profile_name:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_rename`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 发布结算流程
export async function publishCheckoutConfig(options:{
    languages_id:string,
    profile_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 结账编辑器 -- 配置
export async function getCheckoutEditorConfig(options:{
    languages_id:string,
    profile_id:string,
    is_preview:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 结账编辑器 -- is_preview 保存 0 临时  1 正式
export async function setCheckoutEditorConfig(options:{
    languages_id:string,
    profile_id:string,
    config:any,
    is_preview:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckout/config_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}
