import request from '@/utils/request';
import cookie from 'react-cookies';

// 邮件模板
export function getEmailTemplateConfig(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  return request<ApiEmail.Default>(`/ApiEmail/getTemplateConfig`, {
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

// 获取邮件模板详情
export async function getEmailTemplateDetail(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  return request<ApiEmail.Default>(`/ApiEmail/getCustomTemplateDetailV2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal,
  })
}

// 发送测试邮件
export async function sendTestEmailTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  test_data:any,
  to_email:string,
},signal?:AbortSignal){
  return request<ApiMessage.Default>(`/ApiEmail/sendTestEmail`, {
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



// 邮件通知 临时模板
// export async function upDateTemplateTempSave(res:{
//   template_code:string,
//   languages_id:string,
//   user_languages_id:string,
//   oseid:string,
//   sections:any,
//   order:string,
//   dynamicOrder:string,
// },signal?:AbortSignal){
//   return request<ApiMessage.Default>(`/ApiEmail/customTemplateTempSaveV2`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       domain_id:cookie.load("domain")?.id,
//       ...res
//     }
//   })
// }

// 主题设置 临时模板保存
// export async function saveTempTemplateSettings(res:{
//   template_code:string,
//   languages_id:string,
//   user_languages_id:string,
//   oseid:string,
//   settingsData:any,
// },signal?:AbortSignal){
//   return request<ApiMessage.Default>(`/ApiEmail/tempSaveTemplateSettings`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       domain_id:cookie.load("domain")?.id,
//       ...res
//     }
//   })
// }

// 邮件通知 临时保存模板
export async function SaveTempTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  order:string,
  dynamicOrder:string,
  settingsData:any,
  sections?:any,
},signal?:AbortSignal){
  return request<ApiMessage.Default>(`/ApiEmail/tempSaveTemplate`, {
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

// 邮件通知 保存正式模板
// export async function upDateTemplateFormalSave(res:{
//   template_code:string,
//   languages_id:string,
//   user_languages_id:string,
//   oseid:string,
// },signal?:AbortSignal){
//   return request<ApiMessage.Default>(`/ApiEmail/customTemplateFormalSaveV2`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       domain_id:cookie.load("domain")?.id,
//       ...res
//     }
//   })
// }

// 主题设置 模板保存
// export function saveTemplateSettings(res:{
//   template_code:string,
//   languages_id:string,
//   user_languages_id:string,
//   oseid:string,
// },signal?:AbortSignal){
//   return request<ApiMessage.Default>(`/ApiEmail/formalSaveTemplateSettings`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       domain_id:cookie.load("domain")?.id,
//       ...res
//     }
//   })
// }

// 邮件通知 保存正式模板
export async function saveFormalTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  return request<ApiMessage.Default>(`/ApiEmail/formalSaveTemplate`, {
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

// 邮件模板主题设置
export async function getEmailTemplateTheme(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
},signal?:AbortSignal){
  return request<ApiMessage.Default>(`/ApiEmail/getTempTemplateSettings`, {
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

// 获取 邮件代码
export function getSectionRenderTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
},signal?:AbortSignal){
  return request<ApiEmail.Default>(`/ApiEmail/getSectionRenderTemplate`, {
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

// 保存 邮件代码
export function updateSectionRenderTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
  render_template:string,
  render_css:string,
},signal?:AbortSignal){
  return request<ApiEmail.Default>(`/ApiEmail/saveSectionRenderTemplate`, {
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

// 重置 邮件代码
export function resetSectionRenderTemplate(res:{
  template_code:string,
  languages_id:string,
  user_languages_id:string,
  oseid:string,
  section_id:string,
},signal?:AbortSignal){
  return request<ApiEmail.Default>(`/ApiEmail/resetSectionRenderTemplate`, {
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