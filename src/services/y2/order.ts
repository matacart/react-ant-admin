// @ts-ignore
/* eslint-disable */
import { data } from '@remix-run/router';
import { request } from '@umijs/max';
import cookie from 'react-cookies';

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

interface FilterCondition {  
  id: string;  
  filter_group_id: string;  
  filter_name: React.ReactNode;  
  filter_field: string;  
  filter_value: string;  
  module: string;  
}  


// order_type 订单类型：0-客户创建，1-草稿单，2-系统自动创建，3-管理员后台创建，4-第三方平台导入，5-模板订单，6-测试订单，7-已取消订单，8-退货/退款订单，9紧急订单，10-大额订单，11-定制订单
export async function getOrderList(page?: number, limit?: number,id?:string,languagesId?:string,orderType?:number,condition?:any): Promise<any> {
  // 构造查询字符串
  const searchParams = new URLSearchParams();

  // 添加分页参数
  if (page) searchParams.set('page', page.toString());
  if (limit) searchParams.set('limit', limit.toString());
  if (id) searchParams.set('orders_status_id', id.toString());
  if (languagesId) searchParams.set('languages_id', languagesId.toString());
  if (orderType) searchParams.set('order_type', orderType.toString());
  if (condition) searchParams.set('condition', JSON.stringify(condition));
  searchParams.set('domain_id', cookie.load("domain")?.id);
  // 发送请求
  // /api/ApiStore/order_list
  return request(`/api/ApiStore/order_list?${searchParams.toString()}`, {
    method: 'GET', // 使用 GET 请求，因为我们将过滤条件作为查询参数发送
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export async function addOrders() {
  return request('/api/ApiStore/order_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:  {
      "id": "5517518188058789080",
      "domain_id": "433552",
      "source_domain_name": "www.mate-mall.com",
      "languages_id": "2",
      "currency": "USD",
      "order_total": "100.00",
      "shipping_method": "Free Shipping",
      "payment_method": "PayPal",
      "payment_method_no": null,
      "paypal_txt_id": null,
      "date_purchased": "2023-05-11 15:19:05",
      "tel": "904-444-6166",
      "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
      "delivery_name": "Calamat Calamat",
      "country": "United States",
      "province": "Florida(FL)",
      "city": "florida",
      "postcode": "32204",
      "address": "2306  Cherry Tree Drive",
      "employee_id": "0",
      "orders_status_id": "1",
  
      "delivery_status_id": "2",
    
      "payment_status_id":"8",
    
      "remark": null,
      "ip_address": "3745957729",
      "is_share": "0",
      "status": "1",
      "employee_realname": "\u7ba1\u7406\u5458",
      "domain_name": "www.mate-mall.com",
      "payment_time": "1970-01-01 08:00:00",
      "delivery_time": "1970-01-01 08:00:00",
      "productip": "223.70.199.97",
      "settlement_status": "0",
      "settlement_time": "1970-01-01 08:00:00",
      "commission_currency": "CNY",
      "commission_amount": "3.868620",
      "productinfo": [
          {
              "id": "4616",
              "orders_id": "5517518188058789080",
              "product_id": "1315466621794",
              "productModel": "ssss",
              "productImage": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/346760\/app\/19\/2023-05-11\/645c67161e36a.jpg",
              "productName": "ssss",
              "productNum": "1",
              "product_prid": "1315466621794:48114223c4fc4d301858cfa82e7f845c",
              "productOption": null
          }
      ],
      "product_text": "Name: ssss<br\/>Model: ssss | Qty: 1 | <br\/>",
      "status_history_text": "Time: 2023-05-11 15:19:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
  },
  })
}
//批量 入账付款
// 批量 入账付款
export async function updateOrderStatus(ids: string[]): Promise<any> {
  return request(`/api/ApiStore/order_batchpay`, {
    method: 'POST',  
    headers: {  
      'Content-Type': 'multipart/form-data',  
    },  
    data: {  
      ids: ids.join(','), 
    },  
  });  
}
//读取订单详情
export async function getOrderDetail(id:string): Promise<any> {
  return request(`/api/ApiStore/order_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id:id
    },
  });
}
// 批量删除订单
export async function batchdelOrders(ids: string[]) {  
  return request('/api/ApiStore/order_batchdel', {  
    method: 'POST',  
    headers: {  
      'Content-Type': 'multipart/form-data',  
    },  
    data: {  
      ids: ids.join(','), 
    },  
  });  
}
//批量发货
export async function batchshipOrders(ids: string[]): Promise<any> {
  return request('/api/ApiStore/order_batchship', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ids: ids.join(','), 
    },
  });
}


