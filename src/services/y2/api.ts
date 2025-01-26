// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { Oauth2 } from '../../../config/myConfig'
import newStore from '@/store/newStore';
import cookie from 'react-cookies';
import oldStore from '@/store/product/oldStore';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/ApiAppstore/currentUser', {
    method: 'POST',
    ...(options || {}),
  });
}

// 获取用户状态
export async function currentUserStatus(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/Api/user_session', {
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
export async function resetPassword(body:any, options?: { [key: string]: any }) {
  return request<API.LoginResult>('https://www.matacart.com/h-module-UForgetPassword.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data:{
      username: body.username,
      area_code:body.InternationalAreaCode,
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
      nickname:"",
      area_code:body.InternationalAreaCode,
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
    data: {
      grant_type: Oauth2.grant_type,
      accessKeyId: Oauth2.accessKeyId,
      accessKeySecret: Oauth2.accessKeySecret
    },
  });
}


// 账号认证
export async function accountAuthentication(res:any) {
  return request("/api/ApiAppstore/apply_add", {
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



// 删除产品 ----- 产品
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
export async function getProductDetail(id: string,languagesId: string) {
  return request(`/api/ApiStore/product`, {
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
  return request('/api/ApiStore/product_option_type_select', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
    // data: {
    //   "domain_id": cookie.load("domain")?.id,
    // },
  })
}

// 创建商品
export async function addProduct() {
  return request('/api/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "domain_id": cookie.load("domain")?.id,
      "model":newStore.model,
      "sku": newStore.SKU,
      "price": newStore.price,
      // 售价
      "specialprice": newStore.originPrice,
      "cost_price":newStore.costPrice,
      "start_time":newStore.startTime,
      "end_time":newStore.endTime,
      "quantity": newStore.inventory,
      "sales_count":newStore.salesCount.toString(),
      "minimum":newStore.minimum.toString(),
      "weight": newStore.weight,
      "weight_class_id": newStore.weightClassId,
      "title": newStore.title,
      "stock_status_id":"",
      "subtract":"",
      "shipping":newStore.isShipping?"1":"0",
      "is_home": newStore.isHome?"1":"0",
      "is_best": newStore.isBest?"1":"0",
      "is_new": newStore.isNew?"1":"0",
      "is_hot": newStore.isHot?"1":"0",
      "is_bind":newStore.isBind,
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
      // 询盘开关：
      "is_share": newStore.isShare,
      // 摘要
      "content": newStore.content,
      // 内容
      "content1": newStore.content1,
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
      "tags": newStore.tags,
      "platform_category_id": newStore.productType,
      "categoryIds":newStore.productCategories,
      // 品库
      "is_sys":newStore.partsWarehouse,
      // 封面
      "product_image": newStore.productImg ,
      "product_video": newStore.productVideo,  // 视频
      // 图片
      "additional_image": JSON.stringify(newStore.selectedImgList),
      "languages_id": newStore.language,
      // 联盟
      "alliance_status": newStore.allianceStatus,
      // 直营
      "hosted_status": newStore.hostedStatus,
      "attributes":JSON.stringify(Array.from([...newStore.attributes,...newStore.removeData])),
      "variants":JSON.stringify([...newStore.variants,...newStore.removeVariantData]),
      // 第三方链接
      "diversion":JSON.stringify([
        {
          url_amazon:newStore.thirdPartyPlatform.amazonUrl,
          status_amazon:newStore.thirdPartyPlatform.amazonStatus,
          sort_amazon:newStore.thirdPartyPlatform.amazonSort,
          url_ebay:newStore.thirdPartyPlatform.eBayUrl,
          status_ebay:newStore.thirdPartyPlatform.eBayStatus,
          sort_ebay:newStore.thirdPartyPlatform.eBaySort,
          url_tmall:newStore.thirdPartyPlatform.tmallUrl,
          status_tmall:newStore.thirdPartyPlatform.tmallStatus,
          sort_tmall:newStore.thirdPartyPlatform.tmallSort,
          url_aliexpress:newStore.thirdPartyPlatform.aliExpressUrl,
          status_aliexpress:newStore.thirdPartyPlatform.aliExpressStatus,
          sort_aliexpress:newStore.thirdPartyPlatform.aliExpressSort,
          url_whatsapp:newStore.thirdPartyPlatform.whatsappUrl,
          status_whatsapp:newStore.thirdPartyPlatform.whatsappStatus,
          sort_whatsapp:newStore.thirdPartyPlatform.whatsappSort,
          status:newStore.thirdPartyPlatform.status
        }
      ])
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
  return request('/api/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "domain_id": cookie.load("domain")?.id,
      // 旧属性
      "categorys": oldStore.categorys,
      "checked":oldStore.checked,
      "create_time": oldStore.create_time,
      "employee_id": oldStore.employee_id,
      "employee_realname": oldStore.employee_realname,
      "id": oldStore.productId,
      "languages_name": oldStore.languages_name,
      "model": oldStore.model,
      "update_time": oldStore.update_time,
      "start_time": oldStore.startTime,
      "end_time": oldStore.endTime,
      "weight_class_id": oldStore.weightClassId,
      "languages_id": oldStore.language,
      // 库存状态 1-有库存，2-无库存
      "stock_status_id": oldStore.stock_status_id,
      // 是否库存减一 1-是，0-否
      "subtract": oldStore.subtract,
      // 运费
      "shipping": oldStore.isShipping?"1":"0",
      // 品库
      "is_sys": oldStore.partsWarehouse,
      "is_bind": oldStore.isBind,
      // 加入推荐
      "is_best": oldStore.isBest?"1":"0",
      "is_new": oldStore.isNew?"1":"0",
      "is_hot": oldStore.isHot?"1":"0",
      "is_home": oldStore.isHome?"1":"0",
      // 
      "sort": oldStore.sort,
      "is_share": oldStore.isShare,
      // 询盘开关：
      "inquiry_status": oldStore.inquiryStatus,
      // 
      "ad_waf_status": oldStore.adWafStatus,
      "ad_product_id": oldStore.adProductId,
      "ad_product_url": oldStore.adProductUrl,
      "group_id": oldStore.adGroupId,
      // 
      "divided_status": oldStore.divided_status,
      "divided_country": oldStore.divided_country,
      "divided_url": oldStore.divided_url,
      // seo
      "meta_title": oldStore.metaTitle,
      "meta_keyword": oldStore.metaKeyword,
      "meta_description":oldStore.metaDescription,
      "product_url": "/"+oldStore.productUrl,
      "minimum": oldStore.minimum.toString(),
      // 
      "title": oldStore.title,
      // 新增属性
      "needTax":oldStore.needTax?"1":"0",
      "barcode":oldStore.ISBN,
      "SPU": oldStore.SPU,
      "manufactuer":oldStore.manufactuer,
      "inventory_tracking":oldStore.inventoryTracking?"1":"0",
      "status":oldStore.productStatus,
      // 缺货继续销售
      "continueSell":oldStore.continueSell?"1":"0",
      "shipping_country_id":oldStore.notion,  // 0 1 2 3 4 5
      "hs_code":oldStore.HSCode,
      "sku": oldStore.SKU,
      // 商品类型 -- 平台
      "platform_category_id": oldStore.productType,
      "categoryIds":oldStore.productCategories,
      "product_image": oldStore.productImg,
      "product_video": oldStore.productVideo,  // 视频
      // "additional_image": oldStore.selectedImgList,
      "additional_image": JSON.stringify(oldStore.selectedImgList),
      // 原价
      "price": oldStore.price,
      // 售价
      "specialprice":oldStore.originPrice,
      // 成本价
      "cost_price":oldStore.costPrice,
      "quantity": oldStore.inventory,
      // 销量
      "sales_count": oldStore.salesCount.toString(),
      "weight": oldStore.weight,
      // 描述
      "content1": oldStore.content1,
      // 内容
      "content": oldStore.content,
      // 标签
      "tag": oldStore.tags,
      // 联盟
      "alliance_status": oldStore.allianceStatus,
      // 直营
      "hosted_status": oldStore.hostedStatus,
      // 品库
      // 商品状态
      // 
      // "attributes":[{option_name:"111",option_values_name:"123"}]
      "attributes":JSON.stringify(Array.from([...oldStore.attributes,...oldStore.removeData])),
      "variants":JSON.stringify([...oldStore.variants,...oldStore.removeVariantData]),
      // 第三方链接
      "diversion":JSON.stringify([
        {
          url_amazon:oldStore.thirdPartyPlatform.amazonUrl,
          status_amazon:oldStore.thirdPartyPlatform.amazonStatus,
          sort_amazon:oldStore.thirdPartyPlatform.amazonSort,
          url_ebay:oldStore.thirdPartyPlatform.eBayUrl,
          status_ebay:oldStore.thirdPartyPlatform.eBayStatus,
          sort_ebay:oldStore.thirdPartyPlatform.eBaySort,
          url_tmall:oldStore.thirdPartyPlatform.tmallUrl,
          status_tmall:oldStore.thirdPartyPlatform.tmallStatus,
          sort_tmall:oldStore.thirdPartyPlatform.tmallSort,
          url_aliexpress:oldStore.thirdPartyPlatform.aliExpressUrl,
          status_aliexpress:oldStore.thirdPartyPlatform.aliExpressStatus,
          sort_aliexpress:oldStore.thirdPartyPlatform.aliExpressSort,
          url_whatsapp:oldStore.thirdPartyPlatform.whatsappUrl,
          status_whatsapp:oldStore.thirdPartyPlatform.whatsappStatus,
          sort_whatsapp:oldStore.thirdPartyPlatform.whatsappSort,
          status:oldStore.thirdPartyPlatform.status
        }
      ])
      // "status": oldStore.onPutProduct ? "1" : "0"
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




// 店铺币种汇率
export async function getCurrencies(domainId:string) {
  return await request(`/api/ApiAppstore/currencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:domainId
    }
  })
}
 


// 文件库
// export async function getFileList(page: any, limit: any) {
//   return request(`/api/ApiStore/file_list?page=${page}&limit=${limit}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

// 语言
// export async function getLanguages() {
//   return await request(`/api/ApiAppstore/languages_select`, {
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
export async function getProductList(page: any, limit: any, title: string, model: string, languagesId: string,tag:string,status:string|undefined,allianceStatus:string|undefined,hostedStatus:string|undefined) {
  return await request(`/api/ApiStore/product_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // languages_id: 1
    data: {
      // params
      "domain_id": cookie.load("domain")?.id,
      page:page,
      limit:limit,
      title:title,
      model:model,
      languages_id:languagesId,
      tag:tag,
      status:status,
      alliance_status:allianceStatus,
      hosted_status:hostedStatus
    }
  })
}

// 修改产品的状态 0：下架 1 -1:存档
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

// 批量删除
export async function deleteProductList(ids:string) {
  return await request('/api/ApiStore/product_batchdel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "ids": ids
    }
  })
}


// 创建款式名称 languages_id product_option_name sort product_option_type_id status
export async function addStyleName(id:string,languagesId:string,productStyleName:string,productOptionType:string){
  return await request('/api/ApiStore/product_option_add',{
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

export async function getProductOption(id:string,languagesId:string){
  return await request('/api/ApiStore/product_option',{
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
  return await request('/api/ApiStore/product_option_select',{
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
export async function getProductStyleValueList(optionId:string,language:string){
  return await request('/api/ApiStore/product_option_values_select',{
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
  return await request('/api/ApiStore/product_option_values_add',{
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
  return await request('/api/ApiStore/tags_add',{
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
// 查询标签  -- 排序
export async function selectTagsSort(languagesId:string,sortArgument:string,sortWay:string){
  return await request('/api/ApiStore/tags_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
      order_field:sortArgument,
      order_direction:sortWay,
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
// 平台分类
export async function getPlatformCategorySelect(language:string){
  return await request('/api/ApiStore/platform_category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
      limit:100,
      language_id:language
    }
  })
}

export async function getCategorySelect(){
  return await request('/api/ApiStore/category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // page:1,
      // limit:100
    }
  })
}


// ------------分类

// 分类查询
export async function getCategoryList(){
  return await request('/api/ApiStore/category_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "domain_id": cookie.load("domain")?.id,
      "page":1,
      "limit":100
    }
  })
}


// 创建分类

export async function addCategory(res:any){
  return await request('/api/ApiStore/category_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "domain_id": cookie.load("domain")?.id,
      languages_id: res.languages,
      title: res.title,
      content: res.content,
      category_image: res.coverImg,
      pid: res.categoryPid,
      sort: 1,
      status: res.status,
      is_bind: res.isBind,
      // 加入推荐
      is_best: res.isBest?"1":"0",
      is_new: res.isNew?"1":"0",
      is_hot: res.isHot?"1":"0",
      is_home: res.isHome?"1":"0",
      is_share:res.isShare,
      is_sys:res.partsWarehouse,
      meta_title:res.metaTitle,
      meta_keyword: res.metaKeyword,
      meta_description: res.metaDescription
    }
  })
}

// 详情
export async function getCategoryDetail(id:string,languageId:string){
  return await request('/api/ApiStore/category',{
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


// 更新分类
export async function upCategory(res:any){
  return await request('/api/ApiStore/category_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:res.id,
      "domain_id": cookie.load("domain")?.id,
      languages_id: res.languages,
      title: res.title,
      content: res.content,
      category_image: res.coverImg,
      pid: res.categoryPid,
      sort: 1,
      status: res.status,
      // 加入推荐
      is_best: res.isBest?"1":"0",
      is_new: res.isNew?"1":"0",
      is_hot: res.isHot?"1":"0",
      is_home: res.isHome?"1":"0",
      is_bind: res.isBind,
      is_share:res.isShare,
      is_sys:res.partsWarehouse,
      meta_title:res.metaTitle,
      meta_keyword: res.metaKeyword,
      meta_description: res.metaDescription
    }
  })
}

export async function deleteCategory(id:string){
  return await request('/api/ApiStore/category_del',{
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
  return await request('/api/ApiAppstore/currencies_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 采购订单列表
export async function getPurchaseList(orderNumber?:string,status?:string,supplier?:string,warehouse?:string,px?:any){
  return await request('/api/ApiStore/purchase_orders_list',{
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
  return await request('/api/ApiStore/purchase_orders',{
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
  return await request('/api/ApiStore/purchase_orders_add',{
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
  return await request('/api/ApiStore/purchase_orders_add',{
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
  return await request('/api/ApiStore/purchase_orders_del',{
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
  return await request('/api/ApiAppstore/state_select',{
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
  return await request('/api/ApiAppstore/city_select',{
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
  return await request('/api/ApiAppstore/supplier_add',{
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
  return await request('/api/ApiAppstore/supplier_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 获取供应商
export async function getSupplier(id:string){
  return await request('/api/ApiAppstore/supplier',{
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
  return await request('/api/ApiAppstore/supplier_add',{
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
  return await request('/api/ApiStore/warehouse_add',{
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
  return await request('/api/ApiStore/warehouse_select',{
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
  return await request('/api/ApiStore/warehouse_select',{
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
  const result = await request('/api/ApiAppstore/store',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
      languages_id:""
    }
  })
  return result.code == 0 ? result.data : null
}

// 更新店铺信息
export async function setStoreInfo(res:any){
  return await request('/api/ApiAppstore/store_set',{
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
  return await request('/api/ApiAppstore/store_add',{
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



// 时区
export async function getTimeZoneList(){
  const result = await request('/api/ApiAppstore/timezones_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return result.code == 0 ? result.data : null
}

// 所有币种
export async function getCurrenciesList() {
  return await request(`/api/ApiAppstore/currencies_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      page:"1",
      limit:"100"
    }
  })
}

// 更新币种
export async function setCurrenciesList(currenciesList:any) {
  return await request(`/api/ApiAppstore/domain_currencies_batchadd`, {
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
// 获取语言列表
export async function getLanguagesList() {
  const result = await request(`/api/ApiAppstore/languages_list`, {
    method: 'POST',
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

// 添加语言
export async function addLanguages(languages:any) {
  const result = await request(`/api/ApiAppstore/domain_languages_batchadd`, {
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
  const result = await request(`/api/ApiAppstore/domain_languages_del`, {
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

// 文件库 ---
export async function getFileList(groupId?:string,extType?:number,pageNumber?:number,pageSize?:number,title?:string){
  return request("/api/ApiResource/file_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "groupId": groupId,
      "extType":extType,
      "pageNum":pageNumber,
      "pageSize":pageSize,
      "title":title
    }
  });
}

// 分组 ---
export async function getGroupList() {
  return request("/api/ApiResource/group_list", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}
// 新增分组
export async function getGroupAdd(groupName: string,groupId:string) {
  return request("/api/ApiResource/group_add", {
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
  return request("/api/ApiResource/group_del", {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      "groupId": groupId,
      // access_token: localStorage.getItem('access_token')
    }
  });
}
// 删除文件
export async function deleteFile(id: string) {
  return request('/api/ApiResource/file_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "id":id
    },
  })
}
