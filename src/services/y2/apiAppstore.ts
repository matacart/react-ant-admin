import request from '@/utils/request';
import { message } from 'antd';
import cookie from 'react-cookies';

// 错误处理
export const errHandle = (res:ApiAppstore.Default)=>{
  const msg = res.msg || '失败';
  message.error({
    content: msg,
    key: 'api-error', // 关键：固定 key，只保留一个错误提示
    duration: 2,
  });
  throw new Error(res.msg || '失败');
}

// 平台信息
export async function getPlatformInfo(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/platform_info',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 国家
export async function getCountryList(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/country_select',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 国家v2
export async function getCountryListV2(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/country_select_v2',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 省
export async function getProvinceList(countryId:string){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/state_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      country_id:countryId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 市
export async function getCityList(provinceCode:string){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/city_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      state_id:provinceCode
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 店铺查询
export async function domainSelect( options?: { [key: string]: any }) {
  const res = await request<ApiAppstore.Default>('/ApiAppstore/domain_select', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 店铺列表
export async function getDomainList( options?: { [key: string]: any }) {
  const res = await request<ApiAppstore.domainList>('/ApiAppstore/domain_list', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
  if (res.code != 0) errHandle(res);
  return res;
}

/** 获取当前的用户 GET /currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  const res = await request<ApiAppstore.CurrentUser>('/ApiAppstore/currentUser', {
    method: 'POST',
    retryOnError: true,
    ...(options || {}),
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 时区
export async function getTimeZoneList(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/timezones_select',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 所有币种
export async function getCurrenciesList(page?: number, limit?: number) {
   const res = await request<ApiAppstore.Default>(`/ApiAppstore/currencies_list`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:page,
      limit:limit
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取语言列表 only_bound:店铺绑定的语言
export async function getLanguagesList(options?:{
  languages_id:string,
  only_bound:string,
}) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/languages_list`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      limit:100,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

/** 退出登录接口 POST /ApiAppstore/logout */
export async function logout(options?: { [key: string]: any }) {
  const res = await request<ApiAppstore.Default>('/ApiAppstore/logout', {
    method: 'POST',
    ...(options || {}),
  });
  if (res.code != 0) errHandle(res);
  return res;
}

/** 登录接口 POST /login/account  /y2/ApiAppstore/newlogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const res = await request<API.LoginResult>('/ApiAppstore/newlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  if (res.code != 0){
    message.error(res.msg || '失败');
    throw new Error(res.msg || '失败');
  };
  return res;
}

// 账号认证
export async function accountAuthentication(options:{
  name:string,
  phone:string,
  qq:string,
  email:string,
  mid:string,
  apply_type:string,
  apply_remark:string,
}) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/apply_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{...options},
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 图片上传
export async function uploadPic(formData:FormData){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/doUploadPic', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 视频上传
export async function doUploadVideo(formData:FormData){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/doUploadVideo', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 供应商货币
export async function getPurchaseCurrencyList(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/currencies_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加供应商
export async function AddSupplier(options:any){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/supplier_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      name:options.supplierName,
      country_id:options.nation,
      country:options.countryLaber,
      state_id:options.province??"",
      state:options.provinceLaber??"",
      city_id:options.city,
      city:options.cityLaber??"",
      // 单号
      code:"1",
      image:"",	
      type_id:"",
      category_id:"",
      district:options.district??"",
      postcode:options.postcode,
      address:options.address,
      detailed_address:options.detailedAddress,
      bank_name:"",
      bank_number:"",
      linkman:options.firstName,
      lastname:options.lastName,
      telephone:options.phone,
      email_address:options.email,
      // 备注
      remark:"",
      approved:"1",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 查询供应商列表
export async function selectSupplier(){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/supplier_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取供应商
export async function getSupplier(id:string){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/supplier',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 编辑供应商
export async function editSupplier(options:any){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/supplier_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:options.id,
      name:options.supplierName,
      country_id:options.nation,
      city:options.city,
      // 单号
      code:options.code,
      image:"",	
      type_id:"",
      category_id:"",
      state:options.province??"",
      district:options.district??"",
      postcode:options.postcode,
      address:options.address,
      detailed_address:options.detailedAddress,
      bank_name:"",
      bank_number:"",
      linkman:options.firstName,
      telephone:options.phone,
      email_address:options.email,
      // 备注
      remark:"",
      approved:"1",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 店铺信息
export async function getStoreInfo(options:{
  languages_id:string
}){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/store',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新店铺信息
export async function setStoreInfo(options:any){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/store_set',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 创建店铺
export async function createStore(options:{
  languages_id:string,
  country_name:string,
  store_name:string,
  handle:string,
  domain_primary:string,
  default_lang:string,
  default_currency:string,
  merchant_email:string,
}){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/store_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:options
  })
  if (res.code != 0 && res.code == 201) errHandle(res);
  return res;
}

// 充值记录
export async function getRechargeList(options:{
  page:string,
  limit:string
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/merchant_recharge_list',{
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
  if (res.code != 0 && res.code == 201) errHandle(res);
  return res;
}

// 提款记录
export async function getWithdrawList(options:{
  page:string,
  limit:string
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/merchant_withdraw_list',{
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
  if (res.code != 0 && res.code == 201) errHandle(res);
  return res;
}

// 获取账户余额
export async function getMerchentBalance(signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/merchent_balance',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取支付链接
export async function getMerchantRechargeLink(options:{
  amount:string
  method:string
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/merchant_recharge_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 发起提现
export async function getMerchantWithdrawAdd(options:{
  method:string,
  currency_code:string,
  amount:string,
  account_info:string,
  status:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/merchant_withdraw_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新币种
export async function setCurrenciesList(currenciesList:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/domain_currencies_batchadd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      currencies:JSON.stringify(currenciesList)
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 语言
// 添加语言
export async function addLanguages(languages:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/domain_languages_batchadd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages:JSON.stringify(languages)
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除语言
export async function delLanguages(languagesId:string) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/domain_languages_del`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      languages_id:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 域名
export async function getDomainNameList(signal?:AbortSignal) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/domain", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id: cookie.load("domain")?.id,
    },
    signal:signal
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加域名
export async function addDomainName(primaryName:string,otherDomain:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/domain_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id: cookie.load("domain")?.id,
      domain_primary:primaryName,
      other_domain:otherDomain || "",
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除插件
export async function delAddonsConfig(options:{
  id:string,
  languages_id:string
}){
  const res = await request<ApiAppstore.Default>('/ApiAppstore/addons_config_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...options
    }
  })
  if(res.code != 0) errHandle(res);
  return res;
}

// 收款 --手动收款方式 addons_id:23  -- 所有/详细
export async function getAddonsConfigs(langId:string,id?:string,) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_get", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      domain_id: cookie.load("domain")?.id,
      languages_id:langId,
      addons_id:"23"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 手动收款方式  -- 配置
export async function getAddonsConfigArray(options:{
  id?:string,
  languages_id:string,
  addons_id?:string
}) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_array", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:options.id,
      domain_id: cookie.load("domain")?.id,
      languages_id:options.languages_id,
      addons_id:options.addons_id,
      user_languages_id:"1"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新
export async function upDataAddonsConfig(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      // 配置
      // "config["+res.config.isAddressRequired+"]":"123",
      "config[isAddressRequired]":options.config.isAddressRequired,
      "config[isUploadCredentials]":options.config.isUploadCredentials,
      "config[credentialsText]":options.config.credentialsText,
      "config[credentialsImg]":options.config.credentialsImg,
      "config[cod_debugging]":options.config.cod_debugging,
      "config[cod_order_status_id]":options.config.cod_order_status_id,
      "config[cod_zone]":options.config.cod_zone,
      // "cod_debugging"
      id:options.id,
      languages_id:options.languages_id,
      addons_id:options.addons_id,
      title:options.title,
      summary:options.summary,
      description:options.description,
      is_sys:options.is_sys,
      remark:options.remark,
      status:options.status
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加
export async function setAddonsConfig(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      languages_id:"2",
      addons_id:"23",
      title:options.title,
      "config[isAddressRequired]":options.config.isAddressRequired,
      "config[isUploadCredentials]":options.config.isUploadCredentials,
      "config[credentialsText]":options.config.credentialsText,
      "config[credentialsImg]":options.config.credentialsImg,
      summary:options.summary,
      description:"",
      is_sys:0,
      remark:'',
      status:1
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 支付插件 group_id  1:信用卡 2：其它 type_id 插件类型1:支付 2配送
export async function getAddonsList(lang:string,type:string,group_id?:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      languages_id:lang,
      group_id:group_id,
      type_id:type,
      limit:"100"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 支付服务  -- 配置
export async function getAddonsConfigCreditCard(id:string,addonsId?:string,languagesId?:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_array", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      domain_id: cookie.load("domain")?.id,
      languages_id:languagesId,
      addons_id:addonsId,
      user_languages_id:"1"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 支付服务  -- 更新
export async function setAddonsConfigs(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 配送插件
export async function getDeliveryList(lang:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/delivery_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      languages_id:lang,
      group_id:0,
      page:1,
      limit:100
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 规则
export async function getRule(id:string,type:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/rule", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      id:id,
      languages_id:"2",
      page_type:type
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

export async function getRuleList(id:string,languagesId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/rule_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      id:id,
      app_id:"19",
      languages_id:languagesId,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 
export async function setRuleList(options:any,languagesId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/rule_batchadd", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      rules:options,
      languages_id:languagesId
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}


// 账号信息
export async function getUserInfo() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/user_info", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{}
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新账号信息
export async function setUserInfo(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/user_contact_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      contact_email:options.contact_email,
      contact_code:options.contact_code,
      contact_phone:options.contact_phone,
      languages_id:options.languages_id
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 修改密码
export async function upDatePassword(oldPassword:string,newPassword:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/change_password", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      old_password:oldPassword,
      password:newPassword
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 移除登录设备
export async function delLoginRecord(id:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/login_record_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新共享数据状态
export async function setUserSharing(options:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/data_sharing_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      data_sharing:options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取用户账号语言
export async function getUserLanguages() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/user_languages_get", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 设置用户账号语言
export async function setUserLanguages(languagesId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/user_languages_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 员工查询
export async function getEmployeeList() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/employee_select", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // languages_id:languagesId
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 创建应用 -- 更新
export async function creatAppStore(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_name:options.name,
      developer_id:options.developer,
      developer_email:options.email,
      app_description:'',
      languages_id:"2",
      meta_title:'',
      meta_keyword:'',
      meta_description:'',
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取应用列表--开发
export async function getDevAppStores() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      languages_id:"2",
      page:"1",
      limit:"100",

    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

export async function getAppStores() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_store_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // domain_id:cookie.load("domain")?.id,
      languages_id:"2",
      page:"1",
      limit:"100",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}
// 店铺已安装应用
export async function getDomainAppStores() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      languages_id:"2",
      page:"1",
      limit:"100",
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 开发应用操作记录
export async function getAppActionlogs() {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_actionlog_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
    // data:{
    //   languages_id:"2",
    //   page:"1",
    //   limit:"100",
    // }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 开发应用信息
export async function getAppInfo({id,langId}:{id:string,langId:string}) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_info", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      domain_id:cookie.load("domain")?.id,
      languages_id:langId,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// API权限范围 permission_level 1 2
export async function getPermissionsList(appId:string,type:string,langId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/permissions_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_id:appId,
      // domain_id:cookie.load("domain")?.id,
      permission_type:type,
      languages_id:langId,
      permission_level:"1"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新权限信息
export async function upDatePermissionsList(appId:string,permissions:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_permissions_batchadd", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_id:appId,
      permissions:permissions
      // domain_id:cookie.load("domain")?.id,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 上线应用状态设置 1安装  0卸载 -1删除
export async function setAppStatus(appId:string,status:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/domain_app_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      app_id:appId,
      status:status,
      is_nav:"0",
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 开发应用--删除
export async function delDevApp(appId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:appId,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 开发应用--卸载
export async function unInstallDevApp(appId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/app_uninstall", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:appId,
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}


// 创建自定义页面
export async function addCustomerPage(options:any) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/ezpage_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
      page_type:"custom_page"
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除自定义页面
export async function delCustomerPage(id:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/ezpage_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取自定义页面详情
export async function getCustomerPage(id:string,languages_id:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/ezpage", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      languages_id:languages_id
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}


// 自定义页面列表 is_url:0 page_type:custom_page
export async function getCustomerPageList(page:string,limit:string,languagesId:string) {
  const res = await request<ApiAppstore.Default>("/ApiAppstore/ezpage_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:page,
      limit:limit,
      languages_id:languagesId,
      is_url:0,
      page_type:'custom_page'
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 客户列表
export async function getCustomerList(page: any, limit: any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/customers_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      page: page,
      limit: limit,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 创建客户
export async function createCustomer(options:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/customer_add`, {
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

export async function getCustomer(id:string) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/customer_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      id:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 创建收货地址
export async function carateAddress(options:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/addressAdd`, {
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

// 客户地址列表
export async function getAddressList(options:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/addressList`, {
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

// 修改客户历史地址
export async function setAddressEdit(options:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/addressEdit`, {
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
// 新增客户历史地址
export async function addAddress(options:any) {
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/addressAdd`, {
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

// 子账号
export async function employeeSelect(signal?:AbortSignal){
  const res = await request<ApiAppstore.employeeSelect>(`/ApiAppstore/employee_select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_id:19,
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 角色
export async function getRoleList(signal?:AbortSignal){
  const res = await request<ApiAppstore.roleList>(`/ApiAppstore/role_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 消息
export async function getUserMessage(options:{
  page:number,
  limit:number,
  msg_type:string,
  is_read:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/user_message`, {
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

// 新消息数量
export async function getNewUserMessage(signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/user_message_new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 标记已读
export async function readUserMessage(options:{
  ids:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/user_message_readed`, {
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

// 删除消息
export async function delUserMessage(options:{
  ids:string,
},signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/user_message_deled`, {
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

// 全部已读
export async function readAllMessage(signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/user_message_allreaded`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      msg_type: 'all'
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取autotoken
export async function getGenerateAuthToken(signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/generateAuthToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 平台语言
export async function getPlatformLanguagesList(signal?:AbortSignal){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/admin_ui_languages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 店铺语言
export async function getShopLanguagesList(){
  const res = await request<ApiAppstore.Default>(`/ApiAppstore/store_language_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}
