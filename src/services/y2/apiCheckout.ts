import request from '@/utils/request';
import cookie from 'react-cookies';

// 获取结算信息
export function getCheckoutSettingsInfo(res:{
  languages_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/settings_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 提交结算配置
export function setCheckoutSettingsInfo(res:any,signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/settings_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}


// 获取结算模板 -- 实时
export function getCheckoutConfigLive(res:{
  languages_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_live`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 获取结算模板 -- 草稿
export function getCheckoutConfigDrafts(res:{
  languages_id:string,
  type:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_drafts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 复制结算模板 -- 草稿
export function copyCheckoutConfig(res:{
    languages_id:string,
    source_profile_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_copy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 删除结算模板 -- 草稿
export function deleteCheckoutConfig(res:{
    languages_id:string,
    profile_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 重命名结算模板
export function renameCheckoutConfig(res:{
    languages_id:string,
    profile_id:string,
    profile_name:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_rename`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 发布结算流程
export function publishCheckoutConfig(res:{
    languages_id:string,
    profile_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}


// 结账编辑器 -- 配置
export function getCheckoutEditorConfig(res:{
    languages_id:string,
    profile_id:string,
    is_preview:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}


// 结账编辑器 -- is_preview 保存 0 临时  1 正式
export function setCheckoutEditorConfig(res:{
    languages_id:string,
    profile_id:string,
    config:any,
    is_preview:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckout/config_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
