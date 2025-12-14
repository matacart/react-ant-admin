// @ts-ignore
/* eslint-disable */
import request from '@//utils/request';
import { Oauth2 } from '../../../config/myConfig'
import cookie from 'react-cookies';


// --重试--
// 平台信息
export async function getPlatformInfo(){
  return await request('/ApiAppstore/platform_info',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}



// 店铺查询
export async function domainSelect( options?: { [key: string]: any }) {
  return request<API.LoginResult>('/ApiAppstore/domain_select', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

// 店铺列表
export async function getDomainList( options?: { [key: string]: any }) {
  return request<ApiAppstore.domainList>('/ApiAppstore/domain_list', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request('/ApiAppstore/currentUser', {
    method: 'POST',
    retryOnError: true,
    ...(options || {}),
  });
}

// 店铺币种汇率
export async function getCurrencies(domainId:string) {
  return await request(`/ApiAppstore/currencies`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:domainId
    }
  })
}

// 国家
export async function getCountryList(){
  return await request('/ApiAppstore/country_select',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
      limit:100
    }
  })
}

// 时区
export async function getTimeZoneList(){
  const result = await request('/ApiAppstore/timezones_select',{
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return result.code == 0 ? result.data : null
}

// 所有币种
export async function getCurrenciesList() {
  const result = await request(`/ApiAppstore/currencies_list`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:"1",
      limit:"100"
    }
  })
  return result.code == 0 ? result.data : null
}

// 获取语言列表
export async function getLanguagesList() {
  const result = await request(`/ApiAppstore/languages_list`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:"1",
      limit:""
    }
  })
  return result.code == 0 ? result.data : null
}

// 物流服务商
export async function getShippingcourier() {
  return request(`/ApiAppstore/shippingcourier_select`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      // domain_id:cookie.load("domain")?.id,
    }
  })
}




// 获取用户状态
export async function currentUserStatus(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/Api/user_session', {
    method: 'POST',
    ...(options || {}),
  });
}


/** 退出登录接口 POST /ApiAppstore/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/ApiAppstore/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /login/account  /y2/ApiAppstore/newlogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/ApiAppstore/newlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    }
  });
}

/** 重设密码 */
export async function resetPassword(body:any, options?: { [key: string]: any }) {
  return request<API.LoginResult>('https://www.matacart.com/h-module-UForgetPassword.html', {
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

// // 获取验证码
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
// export async function getAccessToken() {
//   let AccessToken = '';
//   await axios.post(
//     Oauth2.hdyUrl,
//     {
//       grant_type: Oauth2.grant_type,
//       accessKeyId: Oauth2.accessKeyId,
//       accessKeySecret: Oauth2.accessKeySecret
//     }, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   }).then((res:any) => {
//     AccessToken = res.data.access_token;
//   }).catch((error:any) => {
//     console.log('error', error);
//   });
//   return AccessToken;
// }

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


// 账号认证
export async function accountAuthentication(res:any) {
  return request("/ApiAppstore/apply_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      name: res.name,
      phone: res.phone,
      qq:res.qq,
      email: res.email,
      mid:res.userType == "2"?res.merchantId:"",
      apply_type:res.userType,
      apply_remark:res.remark,
    },
  });
}

// 基础设置 ---
export async function getTodayData(startDate:number,endDate:number,options?: { signal?: AbortSignal }) {
  return request('/ApiStore/today_statistics', {
    method: 'POST',
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

// 删除产品 ----- 产品
export async function deleteProduct(id: string) {
  return request('/ApiStore/product_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id: id,
      access_token: localStorage.getItem('access_token')
    },
  })
}

// 产品列表
// export async function getProductList(page: any, limit: any) {
//   return request(`/ApiStore/product_list?page=${page}&limit=${limit}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }
// /ApiStore/product_detail?page=${page}&limit=${limit}  测试
// 改用product_list
// 根据id & languages_id获取产品详情
export async function getProductDetail(id: string,languagesId: string) {
  return request(`/ApiStore/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      // params
      "id": id,
      "domain_id": cookie.load("domain").id,
      "languages_id": languagesId
    },
  })
}

// 选项类型
export async function getOptionType() {
  return request('/ApiStore/product_option_type_select', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
    // data: {
    //   "domain_id": cookie.load("domain")?.id,
    // },
  })
}

//创建 --- 更新商品 
export async function upDateProduct(res:any){
  // return
  return request('/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "domain_id": cookie.load("domain")?.id,
      // 旧属性
      ...res
    }
  })
}

// 获取订单
export async function getOrderDetail(id:string){
  // return
  return request('/ApiStore/getOrderDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "domain_id": cookie.load("domain")?.id,
      // 旧属性
      order_id:id
    }
  })
}

// completed
export async function getTaskList(page:number,limit:number,taskStatus:string){
  // return
  return request('/ApiTask/task_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      // 旧属性
      languages_id:"1",
      task_status:taskStatus,
      page:page,
      limit:limit
    }
  })
}


// 文件库
// export async function getFileList(page: any, limit: any) {
//   return request(`/ApiStore/file_list?page=${page}&limit=${limit}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

// 语言
// export async function getLanguages() {
//   return await request(`/ApiAppstore/languages_select`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

// 查询  ----产品列表
// page: 1
// limit: 10
// domain_id: 
// languages_id: 
// model: 1
// title: 
// tags
export async function getProductList(res:any,signal?: AbortSignal) {
  return await request<ApiStore.ProductList>(`/ApiStore/product_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "domain_id": cookie.load("domain")?.id,
      ...res
    },
    signal
  })
}

// 修改产品的状态 0：下架 1：上架 2:存档
export async function upDateProductStatus(productId: string, status: string) {
  return await request('/ApiStore/product_status_update', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id: productId,
      status: status
    }
  })
}

// 批量删除
export async function deleteProductList(ids:string) {
  return await request('/ApiStore/product_batchdel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "ids": ids
    }
  })
}

// 批量更新价格
export async function updataBatchUpdatePrice(res:any) {
  return await request('/ApiStore/batchUpdatePrice', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: res
  })
}


// 创建款式名称 languages_id product_option_name sort product_option_type_id status
export async function addStyleName(id:string,languagesId:string,productStyleName:string,productOptionType:string){
  return await request('/ApiStore/product_option_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id,
      "languages_id":languagesId,
      "product_option_name":productStyleName,
      "sort":"1",
      "product_option_type_id":productOptionType,
      "status":"1"
    }
  })
}

// 创建款式内容 需要先获取款式id 
// languages_id: 1
// option_values_name: 123
// sort: 1
// option_id: 1362219716562
// status: 
export async function addStyleContent(languagesId:string,productStyleValue:string,styleNameId:number){
  return await request('/ApiStore/product_option_values_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "languages_id":languagesId,
      "option_values_name":productStyleValue,
      "sort":1,
      "option_id":styleNameId,
      "status":1
    }
  })
}

// 将款式添加到对应的产品id
// option_id: 1363158285484
// optionvaluesIds: 1363166745810
// productIds: 1363152740171
// status: 1
export async function addStyle(styleNameId:number,styleContentId:number,productId:string){
  return await request('/ApiStore/attribute_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "option_id":styleNameId,
      "optionvaluesIds":styleContentId,
      "productIds":productId,
      "status":1
    }
  })
}
// 通过模型获取该模型下的所有款式
// model: 12332222111   languages_id
// ApiStore/attribute_list
export async function getProductStyleList(model:string,languagesId:string){
  return await request('/ApiStore/attribute_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "model":model,
      "languages_id":languagesId
    }
  })
}

export async function getProductOption(id:string,languagesId:string){
  return await request('/ApiStore/product_option',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id,
      "languages_id":languagesId
    }
  })
}


// 
export async function getProductOptionSelect(languagesId:string){
  return await request('/ApiStore/product_option_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // "model":model,
      "languages_id":languagesId
    }
  })
}


    

// id: 1363171657457
// attributes_image: []
// price_prefix: +
// option_values_price: 0.0000
// product_attribute_weight: 011
// sort: 657457
// status: 1
// 修改产品款式
export async function updateProductStyle(id:number,price:string,weight:string){
  return await request('/ApiStore/attribute_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id,
      "attributes_image":"[]",
      "option_values_price":price,
      "product_attribute_weight":weight,
      "sort":1,
      "status":1
    }
  })
}

// 删除款式
export async function deleteProductStyle(id:number){
  return await request('/ApiStore/attribute_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id
    }
  })
}

// 获取所有款式
export async function getProductStyleValueList(optionId:string,language:string){
  return await request('/ApiStore/product_option_values_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "option_id":optionId,
      "languages_id":language,
      "page":1,
      "limit":100
    }
  })
}

// 
export async function addProductOptionValues(id:string,language:string,optionId:string,optionValuesName:string){
  return await request('/ApiStore/product_option_values_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id,
      "languages_id":language,
      "status":"1",
      "option_id":optionId,
      "option_values_name":optionValuesName
    }
  })
}

// 添加标签
export async function addTags(languagesId:string,tag:string){
  return await request<ApiStore.addTags>('/ApiStore/tags_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
      tags:tag
    }
  })
}
// 删除标签
export async function removeTags(res:{
  languages_id:string,
  tag:string
}){
  return await request<ApiStore.removeTags>('/ApiStore/tags_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res
    }
  })
}
// 查询标签
export async function selectTags(res:{
  languages_id:string,
  tagName:string,
  order_field?:string,
  order_direction?:string,
}){
  return await request<ApiStore.selectTags>('/ApiStore/tags_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res,
    }
  })
}


// 平台分类
export async function getPlatformCategorySelect(language:string){
  return await request('/ApiStore/platform_category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      language_id:language,
      // page:1,
      // limit:100,
    }
  })
}


// ------------商品分类
// 查询
export async function getCategorySelect(res:{
  page?:number,
  limit?:number
},signal?:AbortSignal){
  return await request<ApiStore.Category>('/ApiStore/category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res,
    },
    signal: signal
  })
}
// 分类列表
export async function getCategoryList(res:any,signal?:AbortSignal){
  return await request<ApiStore.Category>('/ApiStore/category_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "domain_id": cookie.load("domain")?.id,
      ...res
    },
    signal: signal
  })
}
// 详情
export async function getCategory(id:string,languageId:string){
  return await request('/ApiStore/category',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "domain_id": cookie.load("domain")?.id,
      "id":id,
      "languages_id": languageId,
    }
  })
}
// 更新分类 无id时创建
export async function setCategory(res:any){
  return await request('/ApiStore/category_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "domain_id": cookie.load("domain")?.id,
      ...res
    }
  })
}
// 删除分类
export async function deleteCategory(id:string){
  return await request('/ApiStore/category_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
}
// 采购订单------


// 供应商货币
export async function getPurchaseCurrencyList(){
  return await request('/ApiAppstore/currencies_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 采购订单列表
export async function getPurchaseList(orderNumber?:string,status?:string,supplier?:string,warehouse?:string,px?:any){
  return await request('/ApiStore/purchase_orders_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      order_number:orderNumber,
      orders_status_id:status,
      supplier_id:supplier,
      warehouse_id:warehouse
    }
  })
}

// 采购订单详情
export async function getPurchase(id:string){
  return await request('/ApiStore/purchase_orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
}

// 添加采购订单
export async function addPurchaseOrders(res:any){
  return await request('/ApiStore/purchase_orders_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // 订单号
      order_number:res.orderNumber,
      supplier_id:res.supplierId,
      supplier_name:res.supplierName,
      warehouse_id:res.warehouseId,
      warehouse_name:res.warehouseName,
      currency:res.currency,
      // 汇率
      currency_value:res.currencyRate,
      payment_terms_id:res.paymentTermsId,
      payment_terms:res.paymentTerms,
      shipping_firstname:res.firstName,
      shipping_lastname:res.lastName,
      shipping_company:"",
      shipping_street_address:res.address,
      shipping_detailed_address:res.detailedAddress,
      shipping_district:res.district,
      shipping_country:res.country,
      shipping_country_id:res.countryId,
      shipping_state:res.state,
      shipping_state_id:res.stateId,
      shipping_city:res.city,
      shipping_city_id:res.cityId,
      // 运输商
      shipments:JSON.stringify(res.shippings),

      orders_status_id:"1",
      order_tax:"",
      order_total:res.orderTotal,
      remark:res.remark,
      comments:"",
      send_email:"0",
      status:"1"
    }
  })
}
// 编辑采购订单
export async function editPurchaseOrders(res:any){
  return await request('/ApiStore/purchase_orders_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // 订单号
      id:res.id,
      order_number:res.orderNumber,
      supplier_id:res.supplierId,
      supplier_name:res.supplierName,
      warehouse_id:res.warehouseId,
      warehouse_name:res.warehouseName,
      currency:res.currency,
      currency_value:res.currencyId,
      payment_terms_id:res.paymentTermsId,
      payment_terms:res.paymentTerms,
      shipping_firstname:res.firstName,
      shipping_lastname:res.lastName,
      shipping_company:"",
      shipping_street_address:res.address,
      shipping_detailed_address:res.detailedAddress,
      shipping_district:res.district,
      shipping_country:res.country,
      shipping_country_id:res.countryId,
      shipping_state:res.state,
      shipping_state_id:res.stateId,
      shipping_city:res.city,
      shipping_city_id:res.cityId,
      // 运输商
      shipments:JSON.stringify(res.shippings),

      orders_status_id:"1",
      order_tax:"",
      order_total:res.orderTotal,
      remark:res.remark,
      comments:"",
      send_email:"0",
      status:"1"
    }
  })
}
// 删除采购单
export async function delPurchaseOrders(id:string){
  return await request('/ApiStore/purchase_orders_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // 订单号
      id:id,
    }
  })
}

// 省
export async function getProvinceList(countryId:string){
  return await request('/ApiAppstore/state_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      country_id:countryId
    }
  })
}
// 市
export async function getCityList(cityId:string){
  return await request('/ApiAppstore/city_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      state_id:cityId
    }
  })
}

// 添加供应商
export async function AddSupplier(res:any){
  return await request('/ApiAppstore/supplier_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "name":res.supplierName,
      "country_id":res.nation,
      "country":res.countryLaber,
      "state_id":res.province??="",
      "state":res.provinceLaber??="",
      "city_id":res.city,
      "city":res.cityLaber??="",
      // 单号
      "code":"1",
      'image':"",	
      "type_id":"",
      "category_id":"",
      "district":res.district??="",
      "postcode":res.postcode,
      "address":res.address,
      "detailed_address":res.detailedAddress,
      'bank_name':"",
      'bank_number':"",
      "firstname":res.firstName,
      "lastname":res.lastName,
      "telephone":res.phone,
      "email_address":res.email,
      // 备注
      'remark':"",
      "approved":"1",
    }
  })
}

// 查询供应商列表
export async function selectSupplier(){
  return await request('/ApiAppstore/supplier_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 获取供应商
export async function getSupplier(id:string){
  return await request('/ApiAppstore/supplier',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id
    }
  })
}

// 编辑供应商
export async function editSupplier(res:any){
  return await request('/ApiAppstore/supplier_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":res.id,
      "name":res.supplierName,
      "country_id":res.nation,
      "city":res.city,
      // 单号
      "code":res.code,
      'image':"",	
      "type_id":"",
      "category_id":"",
      "state":res.province??="",
      "district":res.district??="",
      "postcode":res.postcode,
      "address":res.address,
      "detailed_address":res.detailedAddress,
      'bank_name':"",
      'bank_number':"",
      "linkman":res.name,
      "telephone":res.phone,
      "email_address":res.email,
      // 备注
      'remark':"",
      "approved":"1",
    }
  })
}

// 设置

// 添加仓库地址
export async function addWarehouse(res:any){
  return await request('/ApiStore/warehouse_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      id:"",
      code:res.warehouseLocationCode,
      name:res.warehouseLocationName,
      // 邮箱
      capacity:res.capacity,
      occupied_space:"",
      country:res.countryLaber,
      country_id:res.nation,
      state:res.provinceLaber,
      state_id:res.province,
      city:res.cityLaber,
      city_id:res.city,
      district:res.district,
      postcode:res.postcode,
      address:res.address,
      detailed_address:res.detailedAddress,
      // 姓氏
      lastname:res.lastName,
      // 名称
      firstname:res.name,
      telephone:res.phone,
      email_address:res.email,
      status:"1",
      is_default:"0"
    }
  })
}


// 仓库地址列表
export async function getAddWarehouseList(){
  return await request('/ApiStore/warehouse_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
}

// 仓库地址详情
export async function getAddWarehouse(id:string){
  return await request('/ApiStore/warehouse_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
}


// --基本设置
// 店铺信息
export async function getStoreInfo(id:string){
  const result = await request('/ApiAppstore/store',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      languages_id:""
    }
  })
  return result.data
}

export async function getDomain(id:string){
  const result = await request('/ApiAppstore/domain',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
  return result.code == 0 ? result.data : null
}

// 更新店铺信息
export async function setStoreInfo(res:any){
  return await request('/ApiAppstore/store_set',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:res.id,
      store_logo:res.storeLogo,
      store_name:res.storeName,
      merchant_email:res.merchantEmail,
      service_email:res.serviceEmail,
      timezone:res.timezone,
      product_type:res.productType,
      country_name:"",
      orders_prefix:res.ordersPrefix,
      remark:"",        
      // currency_id:res.currencyId,
      status:res.storeStauts,
    }
  })
}

// 
export async function createStore(res:any){
  return await request('/ApiAppstore/store_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:2,
      country_name:res.country,
      store_name:res.name,
      domain_name:res.url?(res.url+".demo.hdyshop.cn"):"",
      default_lang:'en-us',
      default_currency:res.currencie,
      merchant_email:res.email,
    }
  })
}







// 更新币种
export async function setCurrenciesList(currenciesList:any) {
  return await request(`/ApiAppstore/domain_currencies_batchadd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      currencies:JSON.stringify(currenciesList)
    }
  })
}

// 语言


// 添加语言
export async function addLanguages(languages:any) {
  const result = await request(`/ApiAppstore/domain_languages_batchadd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages:JSON.stringify(languages)
    }
  })
  return result.code == 0 ? result.data : null
}

// 删除语言
export async function delLanguages(languagesId:string) {
  const result = await request(`/ApiAppstore/domain_languages_del`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      languages_id:languagesId
    }
  })
  return result.code == 0 ? result.data : null
}

// 文件库 文件列表---
// groupId?:string,extType?:number,pageNumber?:number,pageSize?:number,title?:string,
// groupId： 分组id 0 所有 extType：类型 0 所有 1 图片 2 视频 3 其他
export async function getFileList(res:{
  groupId:string,
  extType:number,
  pageNum:number,
  pageSize:number,
  title?:string,
},signal?:AbortSignal){
  return request<ApiResource.FileList>("/ApiResource/file_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res,
    },
    signal:signal
  });
}

// 分组
export async function getGroupList(signal?:AbortSignal) {
  return request<ApiResource.GroupList>("/ApiResource/group_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  });
}
// 新增分组
export async function getGroupAdd(groupName: string,groupId:string) {
  return request("/ApiResource/group_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "groupId":groupId,
      "groupNames": groupName,
      // access_token: localStorage.getItem('access_token')
    }
  });
}

// 删除分组
export async function deleteGroup(groupId: string) {
  return request("/ApiResource/group_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      groupId: groupId,
      // access_token: localStorage.getItem('access_token')
    }
  });
}
// 删除文件
export async function deleteFile(id: string) {
  return request<ApiResource.File>('/ApiResource/file_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id:id
    },
  })
}

// 域名
export async function getDomainNameList(signal?:AbortSignal) {
  return request<ApiAppstore.Default>("/ApiAppstore/domain", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id: cookie.load("domain")?.id,
    },
    signal:signal
  });
}

// 添加域名

export async function addDomainName(domainName:string,otherDomain:string) {
  return request("/ApiAppstore/domain_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id: cookie.load("domain")?.id,
      domain_name:domainName,
      other_domain:otherDomain
    }
  });
}

// 删除插件
export async function delAddonsConfig(id:string,lang:string) {
  return request('/ApiAppstore/addons_config_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id:id,
      languages_id:lang
    },
  })
}

// 收款 --手动收款方式  -- 所有/详细
export async function getAddonsConfigs(id?:string) {
  return request("/ApiAppstore/addons_config_get", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      domain_id: cookie.load("domain")?.id,
      languages_id:"2",
      addons_id:"23"
    }
  });
}
// 手动收款方式  -- 配置
export async function getAddonsConfigArray(id?:string,addonsId?:string) {
  return request("/ApiAppstore/addons_config_array", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      domain_id: cookie.load("domain")?.id,
      languages_id:"2",
      addons_id:addonsId,
      user_languages_id:"1"
    }
  });
}
// 更新
export async function upDataAddonsConfig(res:any) {
  return request("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      // 配置
      // "config["+res.config.isAddressRequired+"]":"123",
      "config[isAddressRequired]":res.config.isAddressRequired,
      "config[isUploadCredentials]":res.config.isUploadCredentials,
      "config[credentialsText]":res.config.credentialsText,
      "config[credentialsImg]":res.config.credentialsImg,
      "config[cod_debugging]":res.config.cod_debugging,
      "config[cod_order_status_id]":res.config.cod_order_status_id,
      "config[cod_zone]":res.config.cod_zone,
      // "cod_debugging"
      id:res.id,
      languages_id:res.languages_id,
      addons_id:res.addons_id,
      title:res.title,
      summary:res.summary,
      description:res.description,
      is_sys:res.is_sys,
      remark:res.remark,
      status:res.status
    }
  });
}

// 添加
export async function setAddonsConfig(res:any) {
  return request("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      languages_id:"2",
      addons_id:"23",
      title:res.title,
      "config[isAddressRequired]":res.config.isAddressRequired,
      "config[isUploadCredentials]":res.config.isUploadCredentials,
      "config[credentialsText]":res.config.credentialsText,
      "config[credentialsImg]":res.config.credentialsImg,
      summary:res.summary,
      description:"",
      is_sys:0,
      remark:'',
      status:1
      // addons_id:"23"
      // addons_id:"23"
    }
  });
}

// 支付插件 group_id  1:信用卡 2：其它 type_id 插件类型1:支付 2配送
export async function getAddonsList(lang:string,type:string,group_id?:string) {
  return request("/ApiAppstore/addons_list", {
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
}

// 支付服务  -- 配置
export async function getAddonsConfigCreditCard(id:string,addonsId?:string,languagesId:string) {
  return request("/ApiAppstore/addons_config_array", {
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
}
// 支付服务  -- 更新
export async function setAddonsConfigs(res:any) {
  return request("/ApiAppstore/addons_config_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      ...res
    }
  });
}

// 配送插件
export async function getDeliveryList(lang:string) {
  return request("/ApiAppstore/delivery_list", {
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
}

// 规则
export async function getRule(id:string,type:string) {
  return request("/ApiAppstore/rule", {
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
}

export async function getRuleList(id:string,languagesId:string) {
  return request("/ApiAppstore/rule_list", {
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
}

// 
export async function setRuleList(res:any,languagesId:string) {
  return request("/ApiAppstore/rule_batchadd", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      rules:res,
      languages_id:languagesId
    }
  });
}


// 账号信息
export async function getUserInfo() {
  return request("/ApiAppstore/user_info", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // domain_id: cookie.load("domain")?.id
    }
  });
}

// 更新账号信息
export async function setUserInfo(res:any) {
  return request("/ApiAppstore/user_contact_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      contact_email:res.contact_email,
      contact_code:res.contact_code,
      contact_phone:res.contact_phone,
      languages_id:res.languages_id
      // domain_id: cookie.load("domain")?.id
    }
  });
}
// 
export async function upDatePassword(oldPassword:string,newPassword:string) {
  return request("/ApiAppstore/change_password", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      old_password:oldPassword,
      password:newPassword
    }
  });
}

// 移除登录设备
export async function delLoginRecord(id:string) {
  return request("/ApiAppstore/login_record_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  });
}
// 更新共享数据状态
export async function setUserSharing(res:string) {
  return request("/ApiAppstore/data_sharing_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      data_sharing:res
    }
  });
}
// 获取用户账号语言
export async function getUserLanguages() {
  return request("/ApiAppstore/user_languages_get", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}
// 设置用户账号语言
export async function setUserLanguages(languagesId:string) {
  return request("/ApiAppstore/user_languages_set", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId
    }
  });
}

// 员工查询
export async function getEmployeeList() {
  return request("/ApiAppstore/employee_select", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // languages_id:languagesId
    }
  });
}

// 创建应用 -- 更新
export async function creatAppStore(res:any) {
  return request("/ApiAppstore/app_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_name:res.name,
      developer_id:res.developer,
      developer_email:res.email,
      app_description:'',
      languages_id:"2",
      meta_title:'',
      meta_keyword:'',
      meta_description:'',
    }
  });
}

// 获取应用列表--开发

export async function getDevAppStores() {
  return request("/ApiAppstore/app_list", {
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
}

export async function getAppStores() {
  return request("/ApiAppstore/app_store_list", {
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
}
// 店铺已安装应用
export async function getDomainAppStores() {
  return request("/ApiAppstore/app_list", {
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
}


// 开发应用操作记录
export async function getAppActionlogs() {
  return request("/ApiAppstore/app_actionlog_list", {
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
}

// 开发应用信息
export async function getAppInfo({id,langId}:{id:string,langId:string}) {
  return request("/ApiAppstore/app_info", {
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
}
// API权限范围 permission_level 1 2
export async function getPermissionsList(appId:string,type:string,langId:string) {
  return request("/ApiAppstore/permissions_list", {
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
}
// 更新权限信息
export async function upDatePermissionsList(appId:string,permissions:any) {
  return request("/ApiAppstore/app_permissions_batchadd", {
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
}


// 上线应用状态设置 1安装  0卸载 -1删除
export async function setAppStatus(appId:string,status:string) {
  return request("/ApiAppstore/domain_app_add", {
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
}

// 开发应用--删除
export async function delDevApp(appId:string) {
  return request("/ApiAppstore/app_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:appId,
    }
  });
}
// 开发应用--卸载
export async function unInstallDevApp(appId:string) {
  return request("/ApiAppstore/app_uninstall", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:appId,
    }
  });
}

// 创建博客
export async function createArticles(res:any) {
  return request("/ApiAppstore/article_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res
    }
  });
}
// 更新博客
export async function upDateArticles(res:any) {
  return request("/ApiAppstore/article_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res,
      languages_id:res.lang,
      image:res.imgUrl,
      title:res.title,
      content:res.content,
      excerpt:res.abstract,
      meta_title: res.metaTitle,
      meta_keywords: res.metaKeywords,
      meta_description: res.metaDescription,
      publish_time: res.releaseTime,
      status:res.status
    }
  });
}

// 删除博客 -- 将状态更改为0
export async function delArticles(id:string) {
  return request("/ApiAppstore/article_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  });
}

// 博客列表
export async function getArticleList(page:string,limit:string,languages:string) {
  return request("/ApiAppstore/article_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:page,
      limit:limit,
      languages_id:languages,
    }
  });
}
// 博客详情
export async function getArticle(id?:string,languagesId?:string) {
  return request("/ApiAppstore/article_info", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      languages_id:languagesId,
    }
  });
}

// 博客集合
export async function getArticleCollection() {
  return request("/ApiAppstore/article_category_select", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

// 添加博客集合
export async function addArticleCollection(res:any) {
  return request("/ApiAppstore/article_category_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:res.lang,
      category_name:res.name,
      category_pid:res.parentId,
      sort:res.sort,
      is_share:'0',
      group_id:res.groupId,
      category_description:'',
      meta_title:res.seoTitle,
      meta_keywords:res.seoKeywords,
      meta_description:res.seoDescription,
      status:"1"
    }
  });
}

// 创建自定义页面
export async function addCustomerPage(res:any) {
  return request("/ApiAppstore/ezpage_add", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...res
    }
  });
}

// 删除自定义页面
export async function delCustomerPage(id:string) {
  return request("/ApiAppstore/ezpage_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  });
}

// 获取自定义页面详情
export async function getCustomerPage(id:string,languages_id:string) {
  return request("/ApiAppstore/ezpage", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      languages_id:languages_id
    }
  });
}


// 自定义页面列表 is_url:0
export async function getCustomerPageList(page:string,limit:string) {
  return request("/ApiAppstore/ezpage_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:page,
      limit:limit,
      is_url:0
    }
  });
}

// 菜单导航一级列表 is_url:1
export async function getNavList(page:string,limit:string) {
  return request("/ApiAppstore/nav_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:page,
      limit:limit,
      languages_id:"2",
      // is_url:1,
      // pid:"0",
      // app_id:19
    }
  });
}

// 批量导入上传
export async function importProductTask(file:any,type:string,handle:boolean) {
  return request("/ApiTask/importProductTask", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      task_type:type,
      is_overwrite:handle?"1":"0",
      file:file
    }
  });
}
// 下载处理进度Batch processing progress download
export async function JobExecResult(id:string) {
  // const searchParams = new URLSearchParams();
  // if (id) searchParams.set('id', id.toString());
  // ?${searchParams.toString()
  return request(`/ApiTask/jobExecResult`, {
    method: 'POST',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
    }
  });
}

// 获取上传任务
export async function getTaskStatus(id :any) {
  return request("/ApiTask/getTaskStatus", {
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
}


// 导出产品
export async function exportProductTask(res:any) {
  return request("/ApiTask/exportProductTask", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
      // rangeType:rangeType,
      // email:email,


      // task_type:taskType,
      // conditions:"",
      // // notify_emails:email,
      // is_email_sent:0,
    },
  });
}
// 导出订单
export async function exportOrderTask(res:any) {
  return request("/ApiTask/exportOrderTask", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
  });
}


// 客户列表
export async function getCustomerList(page: any, limit: any) {
  return request(`/ApiAppstore/customers_list`, {
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
}

// 创建客户
export async function createCustomer(res:any) {
  return request(`/ApiAppstore/customer_add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}


export async function getCustomer(id:string) {
  return request(`/ApiAppstore/customer_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      id:id
    }
  })
}

// 创建收货地址
export async function carateAddress(res:any) {
  return request(`/ApiAppstore/addressAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 设置订单收货地址
export async function setOrderShippingAddress(res:any) {
  return request(`/ApiStore/setOrderShippingAddress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}





// 设置物流单号
export async function setOrderNumber(res:any) {
  return request(`/ApiStore/setShippingNo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 设置退货单号
export async function setOrderNumberReturn(res:any) {
  return request(`/ApiStore/setReturnShippingNo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 设置订单发货
export async function setOrderShipped(res:any) {
  return request(`/ApiStore/setOrderShipped`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 取消订单发货
export async function cancelOrderShipment(res:{orderId:string,shippingSn:string,shipmentId:string}) {
  return request(`/ApiStore/cancelOrderShipment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 商家备注
export async function addOrderRemark(res:{orderId:string,remark:string}) {
  return request(`/ApiStore/addOrderRemark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 订单日志
export async function getOrderLogs(res:any) {
  return request(`/ApiStore/getOrderLogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 联系信息
export async function setOrderContact(res:any) {
  return request(`/ApiStore/setOrderContact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 标记付款
export async function setOrderPaid(res:any) {
  return request(`/ApiStore/setOrderPaid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 设置付款期限
export async function setOrderPaymentTerm(res:{orderId:string,paymentTerm:string,startDate:number}) {
  return request(`/ApiStore/setOrderPaymentTerm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 设置护照号/身份证号
export async function setOrderIdNumber(res:{orderId:string,idNumber:string}) {
  return request(`/ApiStore/setOrderIdNumber`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 删除付款期限
export async function delOrderPaymentTerm(res:{orderId:string}) {
  return request(`/ApiStore/delOrderPaymentTerm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 订单退货
export async function setOrderReturned(res:any) {
  return request(`/ApiStore/setOrderReturned`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 标记已退货
export async function setMarkProductAsRefunded(res:any) {
  return request(`/ApiStore/markProductAsRefunded`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 订单取消
export async function setCancelOrder(res:any) {
  return request(`/ApiStore/cancelOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 添加标签
export async function addOrderTag(res:{orderId:string,tagName:string}) {
  return request(`/ApiStore/addOrderTag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 删除标签
export async function removeOrderTag(res:{orderId:string,tagName:string}) {
  return request(`/ApiStore/removeOrderTag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 获取标签列表
export async function getOrderTagList(orderId:string) {
  return request(`/ApiStore/getOrderTagList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderId:orderId
    }
  })
}
// 批量添加标签列表
export async function batchAddOrderTags(res:{orderIds:string,tagNames:string}) {
  return request(`/ApiStore/batchAddOrderTags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 获取草稿单标签
export async function getDraftOrderTagList(draftId:string) {
  return request(`/ApiStore/getDraftOrderTagList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:draftId
    }
  })
}

// 草稿单添加标签
export async function batchAddDraftOrderTags(res:{draftIds:string,tagNames:string}) {
  return request(`/ApiStore/batchAddDraftOrderTags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 拆分发货
export async function splitOrderProducts(res:{orderProducts:string}) {
  return request(`/ApiStore/splitOrderProducts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

export async function getReturnReasons(languagesId:string) {
  return request(`/ApiStore/getReturnReasons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
}
export async function getReturnActions(languagesId:string) {
  return request(`/ApiStore/getReturnActions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
}
export async function getReturnStatuses(languagesId:string) {
  return request(`/ApiStore/getReturnStatuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
}

// 编辑订单产品
export async function editOrderProducts(res:any) {
  return request(`/ApiStore/editOrderProducts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 退款
export async function setOrderRefunded(res:any) {
  return request(`/ApiStore/setOrderRefunded`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 暂停发货
export async function pauseOrderShipping(res:any) {
  return request(`/ApiStore/pauseOrderShipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 开始发货
export async function resumeOrderShipping(res:{orderId:string,fulfillmentId:string}) {
  return request(`/ApiStore/resumeOrderShipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 添加草稿单
export async function addDraftOrder(res:any) {
  return request(`/ApiStore/createOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 客户地址列表
export async function getAddressList(res:any) {
  return request(`/ApiAppstore/addressList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 修改客户历史地址
export async function setAddressEdit(res:any) {
  return request(`/ApiAppstore/addressEdit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 新增客户历史地址
export async function addAddress(res:any) {
  return request(`/ApiAppstore/addressAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}


// 草稿单列表
export async function getOrderDraftList(res:any,signal?:AbortSignal) {
  return request<ApiStore.Order>(`/ApiStore/order_draft_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal
  })
}

// 草稿单信息
export async function getDraftDetail(draftId:string) {
  return request(`/ApiStore/getDraftDetail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:draftId
    }
  })
}

// 草稿单
export async function editDraftOrder(res:any) {
  return request(`/ApiStore/editDraftOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 删除草稿单
export async function delDraftOrder(id:any) {
  return request(`/ApiStore/delDraftOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:id
    }
  })
}

// 订单归档
export async function batchArcOrder(ids:string) {
  return request(`/ApiStore/batchArcOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderIds:ids
    }
  })
}

// 订单取消归档
export async function batchUnarcOrder(ids:string) {
  return request(`/ApiStore/batchUnarcOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderIds:ids
    }
  })
}

// 获取订单列表
export async function getOrderList(res:any,signal?:AbortSignal){
  return request<ApiStore.OrderList>(`/ApiStore/order_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal
  })
}


// mode == 智能 用户 开发
// theme id
// 获取模板文件列表 ApiTemplate/file_list
export async function getThemeFileList(res:{
  id:string,
  templateId:string,
  mode:string,
  languages_id:string;
}){
  return request(`/ApiTemplate/file_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 获取文件详情
export async function getThemeFileDetail(res:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  versionId:string,
  mode:string,
}){
  return request(`/ApiTemplate/file_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 版本
export async function getFileVersion(res:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  mode:string
}){
  return request(`/ApiTemplate/file_version`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
// 文件内容修改
export async function setFileSave(res:{
  id:string,
  templateId:string,
  languagesId:string,
  fileName:string,
  fileContent:string,
  mode:string
}){
  return request(`/ApiTemplate/file_save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 文件重命名
export async function RenameFile(res:{
  templateId:string, 
  languagesId:string,
  mode:string, 
  oldFileName:string, 
  newFileName:string, 
}){
  return request<ApiTemplate.RenameFile>(`/ApiTemplate/file_rename`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

export async function deleteTemplateFile(res:{
  templateId:string, 
  languagesId:string,
  mode:string,
  fileName:string,
  // 是否强制删除物理文件
  forceDelete:boolean,
}){
  return request<ApiTemplate.deleteTemplateFile>(`/ApiTemplate/file_del`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}
export async function addTemplateFile(res:{
  templateId:string, 
  languagesId:string,
  mode:string,
  fileName:string,
  fileContent:string,
  sourceFileName?:string,
  duplicateFlag?:boolean,
}){
  return request<ApiTemplate.addTemplateFile>(`/ApiTemplate/file_add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

export async function templateFileUpload(res:{
  fileId:string, 
  fileName:string,
  file:any,
  mode:string,
  templateId:string, 
  languagesId:string,
}){
  return request<ApiTemplate.templateFileUpload>(`/ApiTemplate/file_upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}



// 客户使用模板
export async function getTemplateInstanceUsing(languagesId:string){
  return request(`/ApiTemplate/instance_using`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:languagesId
    }
  })
}

// 客户模板实例
export async function getTemplateInstanceList(res:any){
  return request(`/ApiTemplate/instance_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 模板商城实例
export async function getTemplateMallList(res:any,signal?:AbortSignal){
  return request(`/ApiTemplate/templatemall_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:localStorage.getItem("use_lang"),
      ...res
    },
    signal:signal,
  })
}

// 模板发布
export async function setInstanceStatus(templateId:string,status:string){
  return request(`/ApiTemplate/instance_status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:localStorage.getItem("use_lang"),
      id:templateId,
      status:status
    }
  })
}
// 模板重命名
export async function templateRename(templateId:string,templateName:string){
  return request(`/ApiTemplate/template_rename`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:localStorage.getItem("use_lang"),
      id:templateId,
      new_name:templateName
    }
  })
}
// instance_status
// 上传压缩文件 -- 模板
export async function uploadTemplate(file:any){
  return request(`/ApiTemplate/template_upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      zip_file:file
    }
  })
}
// 下载压缩文件 -- 模板
export async function downloadTemplate(historyId:string){
  return request(`/ApiTemplate/template_download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      history_id:historyId
    }
  })
}

// 模板安装
export async function installTemplate(templateId:string){
  return request(`/ApiTemplate/template_install`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      template_id:templateId
    }
  })
}

// 模板信息
export async function getTemplateInfo(templateId:string,languagesId:string){
  return request(`/ApiTemplate/template_info`, {
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
}

// 模板设计--更新
export async function templateUpdate(res:{
  mode:string,
  oseid:string,
  themeId:string,
  pageName:string,  //模板名---识别模板，全局传""
  languagesId:string,
  sections?:any,
  settings?:string,
}){
  const result = await request(`/ApiEditor/template_update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
  return ((result as any)?.code == "SUCCESS" || (result as any)?.code == '0') ? (result as any)?.data : null
}


// 页面 sections 列表
export async function installedSections(res:{
  mode:string,
  oseid:string,
  themeId:string,
  pageName:string,
  languages_id:string,
},signal?:AbortSignal){
  return request<ApiEditor.installedSections>(`/ApiEditor/installed_sections`, {
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

// 全局 sections 对象
export async function settingsSections(res:{
  mode:string,
  themeId:string,
  action:string,
  languages_id:string,
  oseid?:string,
},signal?:AbortSignal){
  return request<ApiEditor.settingsSections>(`/ApiEditor/settings`, {
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

// theme 多语言 对象
export async function languageSchema(res:{
  mode:string,
  themeId:string,
  language:string,
},signal?:AbortSignal){
  return request<ApiEditor.languageSchema>(`/ApiEditor/languageSchema`, {
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

// 主题信息
export async function templateInfo(res:{
  template_id:string,
  languages_id:string,
},signal:AbortSignal){
  return request<ApiEditor.templateInfo>(`/ApiEditor/template_info`, {
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

// 导航
export async function getTemplatePage(res:{
  themeId:string,
  languages_id:string
},signal?:AbortSignal){
  return request<ApiEditor.page>(`/ApiEditor/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal
  })
}

// 模板列表
export async function getJsonTemplates(res:{
  template_id:string,
  languages_id:string
  layout_code:string,
  version:string,
  mode:string,
}){
  return request<ApiEditor.jsonTemplates>(`/ApiEditor/json_templates`, {
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

// 创建模板文件
export async function createTemplateFile(res:{
  template_id:string,
  template_name:string,
  page_name:string,
  source_file_name:string,
  file_content:string,
  mode:string,
  duplicate_flag:string,
  languages_id:string

}){
  return request<ApiEditor.jsonTemplates>(`/ApiEditor/file_create`, {
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

// 删除模板文件
export async function delTemplateFile(res:{
  template_id:string,
  template_name:string,
  mode:string,
  languages_id:string,
}){
  return request<ApiEditor.jsonTemplates>(`/ApiEditor/delete_template`, {
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

// 重命名模板文件
export async function renameTemplateFile(res:{
  templateId:string, 
  mode:string, 
  languagesId:string,
  oldFileName:string, 
  newFileName:string, 
}){
  return request<ApiEditor.jsonTemplates>(`/ApiEditor/file_rename`, {
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

// 模板文件语言
export async function getJsonTemplatesLocale(res:{
  themeId:string
  mode:string,
  locale:string,
},signal?:AbortSignal){
  return request<ApiEditor.Locale>(`/ApiEditor/locale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal
  })
}

// 修改模板文件语言
export async function updateLocale(res:{
  themeId:string
  mode:string,
  locale:string,
  locale_data:string,
}){
  return request<ApiEditor.Locale>(`/ApiEditor/locale_update`, {
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


// 子账号
export async function employeeSelect(signal?:AbortSignal){
  return request<ApiAppstore.employeeSelect>(`/ApiAppstore/employee_select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      app_id:19,
    },
    signal:signal
  })
}

// 角色
export async function getRoleList(signal?:AbortSignal){
  return request<ApiAppstore.roleList>(`/ApiAppstore/role_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal:signal
  })
}