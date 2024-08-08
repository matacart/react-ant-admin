// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';




//  读取订单列表import { request } from 'your-request-library'; // 假设这是您的请求库

export async function getOrderList(page: number, limit: number, finalCondition?: string[]): Promise<any> {
  const body = {
    page,
    limit,
    ...(finalCondition && { finalCondition }), // 只有当finalCondition存在时才添加
  };

  return request(`/api/ApiStore/order_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body), // 将body转换为JSON字符串
  });
}
  
  //读取订单


  export async function getOrderDetail(page: string | undefined) {
    return request(`/api/ApiStore/order_detail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page}), // 将参数序列化为JSON字符串
    });
  }



















//   export async function getOrderDetail(orderId: string): Promise<any | null> {  
//   const url = `/api/ApiStore/order_detail/${orderId}`;  
     
//   try {  
//       const response = await axios.get(url);  

//       // 假设response.data应该是一个对象（单个订单）  
//       if (typeof response.data === 'object' && response.data !== null) {  
//           return {  
//               id: response.data.id,  
//               status: response.data.orders_status_name,  
//               datePurchased: response.data.date_purchased, // 确保后端返回的是这个键名  
//               customerName: response.data.customer_name,  
//               totalAmount: response.data.total_amount, // 确保后端有这个字段，或者您可能需要从其他地方获取它  
//               items: response.data.items // 确保后端有这个字段，包含订单项  
//           };  
//       } else {  
//           console.error('Unexpected response format. Expected a single order object.');  
//           return null;  
//       }  
//   } catch (error) {  
//       console.error(`Failed to fetch order detail for ID ${orderId}:`, error);  
//       throw error; // 或者返回一个错误对象，具体取决于您的需求  
//   }  
// }

  // export async function addOder() {
  //   return request('/api/ApiStore/order_add', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
      
  //     data: [
  //       {
  //           "id": "5517518188058789080",
  //           "domain_id": "433552",
  //           "source_domain_name": "www.mate-mall.com",
  //           "languages_id": "2",
  //           "currency": "USD",
  //           "order_total": "100.00",
  //           "shipping_method": "Free Shipping",
  //           "payment_method": "PayPal",
  //           "payment_method_no": null,
  //           "paypal_txt_id": null,
  //           "date_purchased": "2023-05-11 15:19:05",
  //           "tel": "904-444-6166",
  //           "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
  //           "delivery_name": "Calamat Calamat",
  //           "country": "United States",
  //           "province": "Florida(FL)",
  //           "city": "florida",
  //           "postcode": "32204",
  //           "address": "2306  Cherry Tree Drive",
  //           "employee_id": "0",
  //           "orders_status_id": "1",
  //           "remark": null,
  //           "ip_address": "3745957729",
  //           "is_share": "0",
  //           "status": "1",
  //           "employee_realname": "\u7ba1\u7406\u5458",
  //           "domain_name": "www.mate-mall.com",
  //           "payment_time": "1970-01-01 08:00:00",
  //           "delivery_time": "1970-01-01 08:00:00",
  //           "orders_status_name": "\u5f85\u5904\u7406",
  //           "productip": "223.70.199.97",
  //           "settlement_status": "0",
  //           "settlement_time": "1970-01-01 08:00:00",
  //           "commission_currency": "CNY",
  //           "commission_amount": "3.868620",
  //           "productinfo": [
  //               {
  //                   "id": "4616",
  //                   "orders_id": "5517518188058789080",
  //                   "product_id": "1315466621794",
  //                   "productModel": "ssss",
  //                   "productImage": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/346760\/app\/19\/2023-05-11\/645c67161e36a.jpg",
  //                   "productName": "ssss",
  //                   "productNum": "1",
  //                   "product_prid": "1315466621794:48114223c4fc4d301858cfa82e7f845c",
  //                   "productOption": null
  //               }
  //           ],
  //           "product_text": "Name: ssss<br\/>Model: ssss | Qty: 1 | <br\/>",
  //           "status_history_text": "Time: 2023-05-11 15:19:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
  //       },
  //       {
  //           "id": "5517521343832146903",
  //           "domain_id": "433552",
  //           "source_domain_name": "www.mate-mall.com",
  //           "languages_id": "2",
  //           "currency": "USD",
  //           "order_total": "100.00",
  //           "shipping_method": "Free Shipping",
  //           "payment_method": "PayPal",
  //           "payment_method_no": null,
  //           "paypal_txt_id": null,
  //           "date_purchased": "2023-05-11 15:31:38",
  //           "tel": "904-444-6166",
  //           "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
  //           "delivery_name": "Calamat Calamat",
  //           "country": "United States",
  //           "province": "Florida(FL)",
  //           "city": "florida",
  //           "postcode": "32204",
  //           "address": "2306  Cherry Tree Drive",
  //           "employee_id": "0",
  //           "orders_status_id": "1",
  //           "remark": null,
  //           "ip_address": "3745957729",
  //           "is_share": "0",
  //           "status": "1",
  //           "employee_realname": "\u7ba1\u7406\u5458",
  //           "domain_name": "www.mate-mall.com",
  //           "payment_time": "1970-01-01 08:00:00",
  //           "delivery_time": "1970-01-01 08:00:00",
  //           "orders_status_name": "\u5f85\u5904\u7406",
  //           "productip": "223.70.199.97",
  //           "settlement_status": "0",
  //           "settlement_time": "1970-01-01 08:00:00",
  //           "commission_currency": "CNY",
  //           "commission_amount": "3.868620",
  //           "productinfo": [
  //               {
  //                   "id": "4617",
  //                   "orders_id": "5517521343832146903",
  //                   "product_id": "1315466621794",
  //                   "productModel": "ssss",
  //                   "productImage": "\/\/img1.s.handingcdn.com\/Uploads\/Editor\/Picture\/mr\/346760\/app\/19\/2023-05-11\/645c67161e36a.jpg",
  //                   "productName": "ssss",
  //                   "productNum": "1",
  //                   "product_prid": "1315466621794:48114223c4fc4d301858cfa82e7f845c",
  //                   "productOption": null
  //               }
  //           ],
  //           "product_text": "Name: ssss<br\/>Model: ssss | Qty: 1 | <br\/>",
  //           "status_history_text": "Time: 2023-05-11 15:31:38     Status: Pending<br\/>Comments: 0<br\/><br\/>"
  //       }
        
  //     ]
  //   })
  // }
