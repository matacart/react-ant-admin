// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';
import { Oauth2 } from '../../../config/myConfig'
import newStore from '@/store/newStore';

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
  })
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

export async function getProductList(page: any, limit: any) {
  return request(`/api/ApiStore/product_list?page=${page}&limit=${limit}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function addProduct() {
  return request('/api/ApiStore/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      "model": newStore.title,
      "sku": newStore.SKU,
      "categoryIds": newStore.productType,
      "product_image": newStore.selectedImgList[0] ,
      "product_video": '',
      "additional_image": newStore.selectedImgList,
      "price": newStore.price,
      "specialprice": newStore.costPrice,
      "start_time": null,
      "end_time": null,
      "quantity": newStore.inventory,
      "sales_count": 0,
      "minimum": 1,
      "weight": newStore.weight,
      "weight_class_id": newStore.productType,
      "languages_id": 2,
      "title": newStore.title,
      "stock_status_id": 5,
      "subtract": 1,
      "shipping": 1,
      "is_best": 0,
      "is_new": 0,
      "is_hot": 0,
      "sort": 3,
      "is_share": 0,
      "is_sys": 0,
      "inquiry_status": 0,
      "ad_waf_status": 1,
      "ad_product_id": null,
      "ad_product_url": "",
      "divided_status": 0,
      "divided_country": "",
      "divided_url": "",
      "group_id": 0,
      "content1": "",
      "content": "呃呃呃呃呃呃呃呃呃呃呃呃呃",
      "product_url": "",
      "tag": "",
      "meta_title": "啊啊啊啊啊啊啊啊啊",
      "meta_keyword": "",
      "meta_description":"日日日日日日日日日日",
      "status": 1
    }
  })
}
