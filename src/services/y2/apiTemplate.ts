import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 版本添加
export async function addVersion(options:{
  theme_id:string,
  languages_id:string,
  mode:string,
  theme_package:File,
  version_name:string,
  version_remark?:string,
},signal?:AbortSignal){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/add_template_version`, {
    method: 'POST',
    timeout: 120000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res
}

// mode == 智能 用户 开发
// theme id
// 获取模板文件列表 ApiTemplate/file_list
export async function getThemeFileList(options:{
  id:string,
  templateId:string,
  mode:string,
  languages_id:string;
  version_id:string;
  versionId:string;
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 300000,
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res
}

// 获取文件详情
export async function getThemeFileDetail(options:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  versionId:string,
  mode:string,
  fileVersionId:string,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_detail`, {
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
  return res
}

// 版本
export async function getFileVersion(options:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  mode:string,
  versionId:string,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_version`, {
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
  return res
}

// 文件内容修改
export async function setFileSave(options:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  fileContent:string,
  mode:string,
  versionId:string,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res
}

// 文件重命名
export async function RenameFile(options:{
  templateId:string, 
  languagesId:string,
  mode:string, 
  oldFileName:string, 
  newFileName:string, 
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_rename`, {
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
  return res
}

// 主题文件删除
export async function deleteTemplateFile(options:{
  templateId:string, 
  languagesId:string,
  mode:string,
  fileName:string,
  versionId:string,
  // 是否强制删除物理文件
  forceDelete:boolean,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_del`, {
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
  return res
}

// 主题文件添加
export async function addTemplateFile(options:{
  templateId:string, 
  languagesId:string,
  mode:string,
  fileName:string,
  fileContent:string,
  versionId:string,
  sourceFileName?:string,
  duplicateFlag?:boolean,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_add`, {
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
  return res
}

// 文件上传
export async function templateFileUpload(options:{
  fileId:string, 
  fileName:string,
  file:any,
  mode:string,
  templateId:string, 
  languagesId:string,
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/file_upload`, {
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
  return res
}

// 客户使用模板
export async function getTemplateInstanceUsing(languagesId:string){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/instance_using`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 客户模板实例
export async function getTemplateInstanceList(options:any){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/instance_list`, {
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
  return res
}

// 模板商城实例
export async function getTemplateMallList(options:any,signal?:AbortSignal){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/templatemall_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 模板发布
export async function setInstanceStatus(options:{
  id:string,
  status:number,
  languages_id:string
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/instance_status`, {
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
  return res
}

// 模板重命名
export async function templateRename(options:{
  id:string,
  new_name:string,
  languages_id:string
}){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/template_rename`, {
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
  return res
}

// 上传压缩文件 -- 模板
export async function uploadTemplate(file:any){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/template_upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      zip_file:file
    }
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 下载压缩文件 -- 模板
export async function downloadTemplate(historyId:string){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/template_download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      history_id:historyId
    }
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 模板安装
export async function installTemplate(templateId:string){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/template_install`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      template_id:templateId
    }
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 模板信息
export async function getTemplateInfo(templateId:string,languagesId:string){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/template_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      template_id:templateId,
      languages_id:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 版本替换
export async function updateVersion(options:{
  theme_id:string,
  languages_id:string,
  mode:string,
  theme_package:File,
  version_id:string
},signal?:AbortSignal){
  const res = await request<ApiTemplate.Default>(`/ApiTemplate/update_template_version`, {
    method: 'POST',
    timeout: 120000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 版本切换
export async function setTemplateVersion(options:{
  id:string,
  template_id:string,
  languages_id:string,
  version_id:string,
  mode:string,
  target_type:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiTemplateVersion/switch_template_version`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res
}

// 主题版本
export async function getThemeVersions(options:{
  templateId:string,
  page:number,
  limit:number,
  target_type?:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiTemplateVersion/template_version_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if(res.code != 0)errHandle(res);
  return res;
}

// 删除主题版本
export async function deleteVersion(options:{
  id:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiTemplate/instance_delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res
}