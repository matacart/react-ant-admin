// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
import { Oauth2 } from '../../../config/myConfig'
import cookie from 'react-cookies';
import { message } from 'antd';
import { errHandle } from './apiAppstore';

// 偏好设置 --- 获取robots.txt配置
export async function getRobotsTxtConfig(signal?:AbortSignal){
  const res = await request<ApiRobot.Default>(`/ApiRobots/getRobotsTxtConfig`, {
    method: 'POST',
    // retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 更新robots.txt配置
export async function updateRobotsTxtConfig(options:{
  robots_content:string,
},signal?:AbortSignal){
  const res = await request<ApiRobot.Default>(`/ApiRobots/updateRobotsTxtConfig`, {
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

// 偏好设置 --- 重置robots.txt配置
export async function resetRobotsTxtConfig(signal?:AbortSignal){
  const res = await request<ApiRobot.Default>(`/ApiRobots/resetRobotsTxtConfig`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 上传社交分享图片 
export async function uploadSocialPicture(options:{
  social_image:File,
}){
  const res = await request<ApiSite.Default>(`/ApiSite/uploadAndUpdateSocialPicture`, {
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

// 偏好设置 --- 获取社交分享图片
export async function getSocialPicture(){
  const res = await request<ApiSite.Default>(`/ApiSite/getSocialPicture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 删除社交分享图片
export async function deleteSocialPicture(){
  const res = await request<ApiSite.Default>(`/ApiSite/deleteSocialPicture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 页面 sections 列表
export async function installedSections(options:{
  mode:string,
  oseid:string,
  themeId:string,
  pageName:string,
  languages_id:string,
  versionId:string
},signal?:AbortSignal){
  const res = await request<ApiEditor.installedSections>(`/ApiEditor/installed_sections`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 主题信息
export async function templateInfo(options:{
  template_id:string,
  languages_id:string,
},signal:AbortSignal){
  const res = await request<ApiEditor.templateInfo>(`/ApiEditor/template_info`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// theme 多语言 对象
export async function languageSchema(options:{
  mode:string,
  themeId:string,
  language:string,
  versionId:string,
},signal?:AbortSignal){
  const res = await request<ApiEditor.languageSchema>(`/ApiEditor/languageSchema`, {
    method: 'POST',
    retryOnError: true, // 重试
    timeout: 30000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 偏好设置 --- 密码
export async function getProtectionPassWord(signal?:AbortSignal){
  const res = await request<ApiSite.Default>(`/ApiSite/get_password_protection`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    },
    signal:signal,
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 偏好设置 --- 更新密码设置
export async function updateProtectionPassWord(options:{
  gdprState:string,
  switchEnable:boolean,
  password:string
},signal?:AbortSignal){
  const res = await request<ApiSite.Default>(`/ApiSite/update_password_protection`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}


// 偏好设置 --- 站点地图
export async function getSitemapStatus(signal?:AbortSignal){
  const res = await request<ApiSitemap.Default>(`/ApiSitemap/sitemap_status`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 动态渠道路由
export async function getWebsiteRoutes(signal?:AbortSignal){
  const res = await request<ApiChannel.Default>(`/ApiChannel/get_pinned_sale_channels`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:1,
      limit:50
    },
    signal:signal,
  })
  if (res.code != 0 && res.code != 1002) errHandle(res);
  return res;
}

// -----------不重试--------------

// 获取用户状态---商户数据
export async function currentUserStatus(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/Api/user_session', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /notices */
// export async function getNotices(options?: { [key: string]: any }) {
//   return request<API.NoticeIconList>('/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

/** 获取规则列表 GET /rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>('/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

/** 更新规则 PUT /rule */
// export async function updateRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/rule', {
//     method: 'POST',
//     data: {
//       method: 'update',
//       ...(options || {}),
//     }
//   });
// }

/** 新建规则 POST /rule */
// export async function addRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/rule', {
//     method: 'POST',
//     data: {
//       method: 'post',
//       ...(options || {}),
//     }
//   });
// }

/** 删除规则 DELETE /rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/rule', {
//     method: 'POST',
//     data: {
//       method: 'delete',
//       ...(options || {}),
//     }
//   });
// }

/** 重设密码 */
export async function resetPassword(body:any, options?: { [key: string]: any }) {
  const res = await request<API.LoginResult>('https://www.matacart.com/h-module-UForgetPassword.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data:{
      username: body.username,
      area_code:body.phoneCode,
      code:body.captcha,
      password:body.password,
      confirm_password:body.password,
      service:"",
      from:"matacart"
    },
  });
  if (res.code != 0){
    message.error(res.msg || '失败');
    throw new Error(res.msg || '失败');
  };
  return res;
}

/** 注册 */
export async function register(body:any, options?: { [key: string]: any }) {
  return request<API.LoginResult>('https://www.matacart.com/h-module-URegister.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data:{
      username: body.username,
      password: body.password,
      code:body.captcha,
      area_code:body.phoneCode,
      nickname:"",
      service:"",
    }
  });
}

// 获取验证码
export async function getFakeCaptcha(phone:string,InternationalAreaCode:string,queueTyp:string) {
  return request<API.LoginResult>("https://www.matacart.com/h-module-sendSmsCode.html", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params:{
      base_name:phone,
      queue_type:queueTyp,
      area_code:InternationalAreaCode,
      service:"xht",
      from:"matacart"
    }
  });
}

/** 获取access_token */
export async function getAccessToken() {
  return request(Oauth2.hdyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      grant_type: Oauth2.grant_type,
      accessKeyId: Oauth2.accessKeyId,
      accessKeySecret: Oauth2.accessKeySecret
    },
    skipAuthRefresh: true,
  });
}

// completed
export async function getTaskList(options:{
  page:number,
  limit:number,
  taskStatus:string
}){
  const res = await request<ApiTask.Default>('/ApiTask/task_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      // 旧属性
      languages_id:"1",
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 文件库 文件列表---
// groupId?:string,extType?:number,pageNumber?:number,pageSize?:number,title?:string,
// groupId： 分组id 0 所有 extType：类型 0 所有 1 图片 2 视频 3 其他
export async function getFileList(options:{
  groupId:string,
  extType:number,
  pageNum:number,
  pageSize:number,
  title?:string,
},signal?:AbortSignal){
  const res = await request<ApiResource.FileList>("/ApiResource/file_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    },
    signal:signal
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 分组
export async function getGroupList(signal?:AbortSignal) {
  const res = await request<ApiResource.GroupList>("/ApiResource/group_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  });
  if (res.code != 0) errHandle(res);
  return res;
}
// 新增分组
export async function getGroupAdd(options:{
  groupName: string,
  groupId:string
}) {
  const res = await request<ApiResource.Default>("/ApiResource/group_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除分组
export async function deleteGroup(groupId: string) {
  const res = await request<ApiResource.Default>("/ApiResource/group_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      groupId: groupId,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}
// 删除文件
export async function deleteFile(id: string) {
  const res = await request<ApiResource.File>('/ApiResource/file_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id:id
    },
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 跳转链接
export async function getLinkList(options:any){
  const res = await request<ApiNav.Default>(`/ApiNav/getLinkList`, {
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

// 搜索链接节点
export async function getSearchLink(options:{
  node_types:string,
  ids:string,
  languages_id:string,
}){
  const res = await request<ApiNav.Default>(`/ApiNav/getLinkInfo`, {
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

// 菜单导航 pid:0 一级 is_sys:0 自定义 1 系统
export async function getNavList(options:{
  languages_id:string,
  id?:string,
  page?:string,
  limit?:string,
  pid?:string,
  group_by_sys?:string,
},signal?:AbortSignal) {
  const res = await request<ApiAppstore.Default>("/ApiNav/ezpage_tree_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 批量添加导航
export async function batchAddNavgate(options:any){
  const res = await request<ApiAppstore.roleList>(`/ApiNav/ezpage_batch_operate`, {
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

// 批量导入上传
export async function importProductTask(options:{
  file:any,
  type:string,
  handle:boolean
}) {
  const res = await request<ApiTask.Default>("/ApiTask/importProductTask", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      task_type:options.type,
      is_overwrite:options.handle?"1":"0",
      file:options.file
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}
// 下载处理进度Batch processing progress download
export async function JobExecResult(id:string) {
  const res = await request<ApiTask.Default>(`/ApiTask/jobExecResult`, {
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
    }
  });
  return res;
}

// 获取上传任务
export async function getTaskStatus(id :any) {
  const res = await request<ApiTask.Default>("/ApiTask/getTaskStatus", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // domain_id:cookie.load("domain")?.id,
      taskId:id
    },
    skipAuthRefresh: true,
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 导出产品
export async function exportProductTask(options:any) {
  const res = await request<ApiTask.Default>("/ApiTask/exportProductTask", {
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
// 导出订单
export async function exportOrderTask(options:any) {
  const res = await request<ApiTask.Default>("/ApiTask/exportOrderTask", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 模板设计--更新
export async function templateUpdate(options:{
  mode:string,
  oseid:string,
  themeId:string,
  pageName:string,  //模板名---识别模板，全局传""
  languagesId:string,
  versionId:string,
  sections?:any,
  settings?:string,
}){
  const res = await request<ApiEditor.Default>(`/ApiEditor/template_update`, {
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

// 全局 sections 对象
export async function settingsSections(options:{
  mode:string,
  themeId:string,
  action:string,
  languages_id:string,
  versionId:string,
  oseid?:string,
},signal?:AbortSignal){
  const res = await request<ApiEditor.settingsSections>(`/ApiEditor/settings`, {
    method: 'POST',
    retryOnError: options.action == 'get' ? true : false, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 导航
export async function getTemplatePage(options:{
  themeId:string,
  languages_id:string
},signal?:AbortSignal){
  const res = await request<ApiEditor.page>(`/ApiEditor/page`, {
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
  return res;
}

// 模板列表
export async function getJsonTemplates(options:{
  template_id:string,
  languages_id:string
  layout_code:string,
  version:string,
  mode:string,
}){
  const res = await request<ApiEditor.jsonTemplates>(`/ApiEditor/json_templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 创建模板文件
export async function createTemplateFile(options:{
  template_id:string,
  template_name:string,
  page_name:string,
  source_file_name:string,
  file_content:string,
  mode:string,
  duplicate_flag:string,
  languages_id:string
}){
  const res = await request<ApiEditor.Default>(`/ApiEditor/file_create`, {
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

// 删除模板文件
export async function delTemplateFile(options:{
  template_id:string,
  template_name:string,
  mode:string,
  languages_id:string,
}){
  const res = await request<ApiEditor.Default>(`/ApiEditor/delete_template`, {
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

// 重命名模板文件
export async function renameTemplateFile(options:{
  templateId:string, 
  mode:string, 
  languagesId:string,
  oldFileName:string, 
  newFileName:string, 
}){
  const res = await request<ApiEditor.Default>(`/ApiEditor/file_rename`, {
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

// 模板文件语言
export async function getJsonTemplatesLocale(options:{
  themeId:string
  mode:string,
  locale:string,
  languages_id:string,
  version_id:string,
},signal?:AbortSignal){
  const res = await request<ApiEditor.Locale>(`/ApiEditor/locale`, {
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
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 修改模板文件语言
export async function updateLocale(options:{
  themeId:string
  mode:string,
  locale:string,
  locale_data:string,
}){
  const res = await request<ApiEditor.Locale>(`/ApiEditor/locale_update`, {
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

// 获取首页seo
export async function getHomeSeo(options:{
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiSite.Default>(`/ApiSite/get_home_seo`, {
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
// 设置首页seo
export async function setHomeSeo(options:{
  languages_id:string,
  meta_title:string,
  meta_description:string,
  meta_keywords:string,
},signal?:AbortSignal){
  const res = await request<ApiSite.Default>(`/ApiSite/set_home_seo`, {
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

// 上传站点地图文件
export async function uploadSitemap(options:{
  sitemap_file:File,
},signal?:AbortSignal){
  const res = await request<ApiSitemap.Default>(`/ApiSitemap/sitemap_upload`, {
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
  return res;
}

// 切换站点地图文件状态
export async function switchSitemap(action:"on"|"off",signal?:AbortSignal){
  const res = await request<ApiSitemap.Default>(`/ApiSitemap/sitemap_switch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      action:action,
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取站点地图文件列表
export async function getSitemapList(signal?:AbortSignal){
  const res = await request<ApiSitemap.Default>(`/ApiSitemap/sitemap_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// ApiSitemap/sitemap_delete 删除站点地图文件
export async function delSitemapFile(id:string,signal?:AbortSignal){
  const res = await request<ApiSitemap.Default>(`/ApiSitemap/sitemap_delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      id:id
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 渠道应用 install
export async function installSaleChannel(id:string,signal?:AbortSignal){
  const res = await request<ApiChannel.Default>(`/ApiChannel/install_sale_channel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      app_id:id
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 渠道应用 uninstall
export async function uninstallSaleChannel(id:string,signal?:AbortSignal){
  const res = await request<ApiChannel.Default>(`/ApiChannel/uninstall_sale_channel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      domain_app_id:id
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 渠道应用 -- 订到导航
export async function pinSaleChannel(options:{
  domain_app_id:string,
  is_pinned:string,
},signal?:AbortSignal){
  const res = await request<ApiChannel.Default>(`/ApiChannel/pin_sale_channel`, {
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
  if (res.code != 0) errHandle(res);
  return res;
}

// 渠道列表
export async function getSaleChannelList(signal?:AbortSignal){
  const res = await request<ApiChannel.Default>(`/ApiChannel/sale_channel_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:"1",
      limit:"50"
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 邮件通知 ApiMessage/custom_template_config
export async function getCustomTemplateConfig(options:{
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiMessage/custom_template_config`, {
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
  if (res.code != 0) errHandle(res);
  return res;
}

// 邮件通知 配置
export async function setCustomTemplateConfig(options:{
  languages_id:string,
  config_key:string,
  config_value:boolean,
},signal?:AbortSignal){
  const res = await request<ApiMessage.Default>(`/ApiMessage/custom_template_config_save`, {
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