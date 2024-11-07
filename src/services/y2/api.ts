// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';
import { Oauth2 } from '../../../config/myConfig'
import newStore from '@/store/newStore';
import TableList from './../../pages/TableList/index';
import { dataTool } from 'echarts';
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
export async function getProductList(page: any, limit: any) {
  return request(`/api/ApiStore/product_list?page=${page}&limit=${limit}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
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
export async function addProduct() {
  return request('/api/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "model":newStore.title,
      "sku": newStore.SKU,
      "price": newStore.price,
      "specialprice": oldStore.specialprice,
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
      "costPrice":newStore.costPrice,
      "needTax":newStore.needTax?"1":"0",
      "ISBN": newStore.ISBN,
      "inventory_tracking":newStore.inventoryTracking?"1":"0",
      "continueSell":newStore.continueSell?"1":"0",
      // 
      "notion":newStore.notion,  // 0 1 2 3 4 5
      "HSCode":newStore.HSCode,
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
      "additional_image": newStore.selectedImgList,
      "languages_id": 1,
      "languages_name": "Chinese"
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
      "id": oldStore.id,
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