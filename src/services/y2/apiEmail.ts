import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 邮件模板
export async function getEmailTemplateConfig(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmail/getTemplateConfig`, {
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

// 获取邮件模板详情
export async function getEmailTemplateDetail(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmail/getCustomTemplateDetailV2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 发送测试邮件
export async function sendTestEmailTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  test_data:any,
  to_email:string,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiEmail/sendTestEmail`, {
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

// 邮件通知 临时保存模板
export async function SaveTempTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  order:string,
  dynamicOrder:string,
  settingsData:any,
  sections?:any,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiEmail/tempSaveTemplate`, {
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

// 邮件通知 保存正式模板
export async function saveFormalTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiEmail/formalSaveTemplate`, {
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

// 邮件模板主题设置
export async function getEmailTemplateTheme(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiEmail/getTempTemplateSettings`, {
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

// 获取 邮件代码
export async function getSectionRenderTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmail/getSectionRenderTemplate`, {
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

// 保存 邮件代码
export async function updateSectionRenderTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
  render_template:string,
  render_css:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmail/saveSectionRenderTemplate`, {
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

// 重置 邮件代码
export async function resetSectionRenderTemplate(options:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmail/resetSectionRenderTemplate`, {
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

// 邮件通知 客服邮箱验证
export async function sendServiceVerifyEmail(options:{
  languages_id:string,
  email:string,
},signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiEmailVerify/sendVerifyEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 200) errHandle(res);
  return res;
}

// 客服邮箱验证状态
export async function getVerifyEmailStatus(signal?:AbortSignal){
  const res = await request<ApiEmail.Default>(`/ApiMerchant/customerEmailStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 激活客服邮箱
// export async function activateServiceVerifyEmail(options:{
//   lang:string,
//   token:string,
// },signal?:AbortSignal){
//   const res = await request<ApiEmail.Default>(`/ApiEmailVerify/activateVerify`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       domain_id:cookie.load("domain")?.id,
//       ...options
//     }
//   });
//   if (res.code != 200) errHandle(res);
//   return res;
// }