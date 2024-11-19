// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { Oauth2 } from '../../../config/myConfig'
import newStore from '@/store/newStore';
import oldStore from '@/store/oldStore';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/ApiAppstore/currentUser', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/ApiAppstore/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/ApiAppstore/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account  /y2/ApiAppstore/newlogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/newlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
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
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    }
  });
}

/** 重设密码 */
export async function reset(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 */
export async function register(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
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
    data: {
      grant_type: Oauth2.grant_type,
      accessKeyId: Oauth2.accessKeyId,
      accessKeySecret: Oauth2.accessKeySecret
    },
  });
}

// 删除产品
export async function deleteProduct(id: string) {
  return request('/api/ApiStore/product_del', {
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
//   return request(`/api/ApiStore/product_list?page=${page}&limit=${limit}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }
// /api/ApiStore/product_detail?page=${page}&limit=${limit}  测试
// 改用product_list
// 根据id & languages_id获取产品详情
export async function getProductDetail(id: string, languagesId: string) {
  return request(`/api/ApiStore/product_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      // params
      id: id,
      languages_id: languagesId
    },
  })
}

// 

// 创建商品
export async function addProduct() {
  return request('/api/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },

    // 
    
// "1362129239148"
// inquiry_status
// : 
// "0"
// is_best
// : 
// "0"
// is_hot
// : 
// "0"
// is_new
// : 
// "0"
// is_share
// : 
// "0"
// languages_id
// : 
// "2"
// meta_description
// : 
// "日日日日日日日日日日"
// meta_keyword
// : 
// ""
// meta_title
// : 
// "啊啊啊啊啊啊啊啊啊"
// minimum
// : 
// "1"
// model
// : 
// "1111"
// price
// : 
// "0.0000"
// product_image
// : 
// ""
// product_url
// : 
// ""
// product_video
// : 
// ""
// quantity
// : 
// "2147483647"
// sales_count
// : 
// "0"
// shipping
// : 
// "1"
// sku
// : 
// "11133"
// sort
// : 
// "3"
// status
// : 


    data: {
      "model":newStore.model,
      "sku": newStore.SKU,
      "price": newStore.price,
      "specialprice": "",
      "start_time":"",
      "end_time":"",
      "quantity": newStore.inventory,
      "sales_count":"",
      "minimum":"",
      "weight": newStore.weight,
      "weight_class_id": "",
      "title": newStore.title,
      "stock_status_id":"",
      "subtract":"",
      "shipping":"",
      "is_best": 0,
      "is_new": 0,
      "is_hot": 0,
      "is_share":0,
      "sort" : 0,
      "product_url" : '',
      "meta_title" : '',
      "meta_keyword" : '',
      "meta_description" : '',
      "inquiry_status" : 0,
      "ad_waf_status" : 1,
      "ad_product_id" : 0,
      "ad_product_url" : '',
      "group_id" : 0,
      "divided_status" : 0,
      "divided_country" : '',
      "divided_url" : '',
      // 摘要
      "content": newStore.content,
      // 内容
      "content1": newStore.content1,
      "originPrice":newStore.originPrice,
      "cost_price":newStore.costPrice,
      "needTax":newStore.needTax?"1":"0",
      // 条码
      "barcode": newStore.ISBN,
      "inventory_tracking":newStore.inventoryTracking?"1":"0",
      "continueSell":newStore.continueSell?"1":"0",
      // 发货地区
      "shipping_country_id":newStore.notion,  // 0 1 2 3 4 5
      "hs_code":newStore.HSCode,
      // 
      // 商品状态
      "status": newStore.onPutProduct ? "1" : "0",
      "SPU": newStore.SPU,
      "manufactuer":newStore.manufactuer,
      "tag": newStore.tag,
      "categoryIds": newStore.productType,
      // 封面
      "product_image": newStore.selectedImgList[0] ,
      "product_video": '',  // 视频
      // 图片
      "additional_image": JSON.stringify(newStore.selectedImgList),
      "languages_id": newStore.language,
      // "languages_name": "Chinese"
      // "model":newStore.model,
      // "sku": newStore.SKU,
      // "price": newStore.price,
      // "specialprice": oldStore.specialprice,
      // "start_time":"",
      // "end_time":"",
      // "quantity": newStore.inventory,
      // "sales_count":"",
      // "minimum":"",
      // "weight": newStore.weight,
      // "weight_class_id": "",
      // "title": newStore.title,
      // "stock_status_id":"",
      // "subtract":"",
      // "shipping":"",
      // "is_best": 0,
      // "is_new": 0,
      // "is_hot": 0,
      // "is_share":0,
      // "sort" : 0,
      // "product_url" : '',
      // "meta_title" : '',
      // "meta_keyword" : '',
      // "meta_description" : '',
      // "inquiry_status" : 0,
      // "ad_waf_status" : 1,
      // "ad_product_id" : 0,
      // "ad_product_url" : '',
      // "group_id" : 0,
      // "divided_status" : 0,
      // "divided_country" : '',
      // "divided_url" : '',
      // // 摘要
      // "content": newStore.content,
      // // 内容
      // "content1": newStore.content1,
      // "originPrice":newStore.originPrice,
      // "costPrice":newStore.costPrice,
      // "needTax":newStore.needTax?"1":"0",
      // "ISBN": newStore.ISBN,
      // "inventory_tracking":newStore.inventoryTracking?"1":"0",
      // "continueSell":newStore.continueSell?"1":"0",
      // // 
      // "notion":newStore.notion,  // 0 1 2 3 4 5
      // "HSCode":newStore.HSCode,
      // // 
      // // 商品状态
      // "status": newStore.onPutProduct ? "1" : "0",
      // "SPU": newStore.SPU,
      // "manufactuer":newStore.manufactuer,
      // "tag": newStore.tag,
      // "categoryIds": newStore.productType,
      // // 封面
      // "product_image": newStore.selectedImgList[0] ,
      // "product_video": '',  // 视频
      // // 图片
      // "additional_image": newStore.selectedImgList,
      // "languages_id": 1,
      // "languages_name": "Chinese"
    }
  })
}

//更新商品 
export async function submitRenewalProduct(res:any){
  // return
  return request('/api/ApiStore/product_reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      // 旧属性
      "additional_image": oldStore.additional_image,
      "categorys": oldStore.categorys,
      "checked":oldStore.checked,
      "create_time": oldStore.create_time,
      "domain_id": oldStore.domain_id,
      "employee_id": oldStore.employee_id,
      "employee_realname": oldStore.employee_realname,
      "id": oldStore.productId,
      "languages_name": oldStore.languages_name,
      "model": oldStore.model,
      "update_time": oldStore.update_time,
      // 特殊价
      "specialprice": oldStore.specialprice,
      "start_time": oldStore.start_time,
      "end_time": oldStore.end_time,
      "weight_class_id": oldStore.weight_class_id,
      "languages_id": oldStore.languages_id,
      // 库存状态 1-有库存，2-无库存
      "stock_status_id": oldStore.stock_status_id,
      // 是否库存减一 1-是，0-否
      "subtract": oldStore.subtract,
      // 运费
      "shipping": oldStore.shipping,
      // 加入推荐
      "is_best": oldStore.is_best,
      "is_new": oldStore.is_new,
      "is_hot": oldStore.is_hot,
      // 
      "sort": oldStore.sort,
      // 询盘开关：
      "is_share": oldStore.is_share,
      "is_sys": oldStore.is_sys,
      // 
      "inquiry_status": oldStore.inquiry_status,
      // 
      "ad_waf_status": oldStore.ad_waf_status,
      "ad_product_id": oldStore.ad_product_id,
      "ad_product_url": oldStore.ad_product_url,
      // 
      "divided_status": oldStore.divided_status,
      "divided_country": oldStore.divided_country,
      "divided_url": oldStore.divided_url,
      "group_id": oldStore.group_id,
      // seo
      "meta_title": oldStore.meta_title,
      "meta_keyword": oldStore.meta_keyword,
      "meta_description":oldStore.meta_description,
      "minimum": oldStore.minimum,
      // 
      "title": oldStore.title,
      // 新增属性
      "needTax":oldStore.needTax?"1":"0",
      "ISBN":oldStore.ISBN,
      "SPU": oldStore.SPU,
      "manufactuer":oldStore.manufactuer,
      "inventory_tracking":oldStore.inventoryTracking?"1":"0",
      // 缺货继续销售
      "continueSell":oldStore.continueSell?"1":"0",
      "notion":oldStore.notion,  // 0 1 2 3 4 5
      "HSCode":oldStore.HSCode,
      "sku": oldStore.SKU,
      "categoryIds": oldStore.productType,
      "product_image": oldStore.selectedImgList,
      "product_video": oldStore.product_video,  // 视频
      // "additional_image": oldStore.selectedImgList,
      "price": oldStore.price,
      // 原价
      "originPrice":oldStore.originPrice,
      // 成本价
      "costPrice":oldStore.costPrice,
      "quantity": oldStore.inventory,
      // 销量
      "sales_count": oldStore.sales_count,
      "weight": oldStore.weight,
      // 描述
      "content1": oldStore.content1,
      // 内容
      "content": oldStore.content,
      // 标签
      "tag": oldStore.tag,
      // 商品状态
      "status": oldStore.onPutProduct ? "1" : "0"
    }
  })
}



// 店铺列表
export async function getDomainList( options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/domain_select', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

// 文件库
export async function getFileList(page: any, limit: any) {
  return request(`/api/ApiStore/file_list?page=${page}&limit=${limit}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 语言
export async function getLanguages() {
  return await request(`/api/ApiAppstore/languages_select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 查询  ----产品列表
// page: 1
// limit: 10
// domain_id: 
// languages_id: 
// model: 1
// title: 
// tags
export async function getProductList(page: any, limit: any, title: string, model: string, languagesId: string,tags:string,status:string|undefined) {
  return await request(`/api/ApiStore/product_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // languages_id: 1
    data: {
      // params
      page:page,
      limit:limit,
      title:title,
      model:model,
      languages_id:languagesId,
      tags:tags,
      status:status
    }
  })
}

// 修改产品的状态 0：下架 1
export async function upDateProductStatus(productId: string, status: string) {
  return await request('/api/ApiStore/product_status_update', {
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




// 创建款式名称 languages_id product_option_name sort product_option_type_id status
export async function addStyleName(languagesId:string,productStyleName:string){
  return await request('/api/ApiStore/product_option_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "languages_id":languagesId,
      "product_option_name":productStyleName,
      "sort":"1",
      "product_option_type_id":"1",
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
  return await request('/api/ApiStore/product_option_values_add',{
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
  return await request('/api/ApiStore/attribute_add',{
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
  return await request('/api/ApiStore/attribute_list',{
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

// id: 1363171657457
// attributes_image: []
// price_prefix: +
// option_values_price: 0.0000
// product_attribute_weight: 011
// sort: 657457
// status: 1
// 修改产品款式
export async function updateProductStyle(id:number,price:string,weight:string){
  return await request('/api/ApiStore/attribute_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "id":id,
      "attributes_image":newStore.selectedImgList,
      "option_values_price":price,
      "product_attribute_weight":weight,
      "sort":1,
      "status":1
    }
  })
}

// 删除款式
export async function deleteProductStyle(id:number){
  return await request('/api/ApiStore/attribute_del',{
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
export async function getProductStyleValueList(){
  return await request('/api/ApiStore/product_option_values_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "page":1,
      "limit":100
    }
  })
}

// 添加标签
export async function addTags(languagesId:string,tag:string){
  return await request('/api/ApiStore/tags_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
      tag:tag
    }
  })
}
// 删除标签
export async function removeTags(languagesId:string,tag:string){
  return await request('/api/ApiStore/tags_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
      tag:tag
    }
  })
}
// 查询标签
export async function selectTags(languagesId:string){
  return await request('/api/ApiStore/tags_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
    }
  })
}
// 国家
export async function getCountryList(){
  return await request('/api/ApiAppstore/country_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
      limit:100
    }
  })
}
