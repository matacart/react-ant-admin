// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


interface FilterCondition {  
  id: string;  
  filter_group_id: string;  
  filter_name: React.ReactNode;  
  filter_field: string;  
  filter_value: string;  
  module: string;  
}  

//  读取订单列表import { request } from 'your-request-library'; // 假设这是您的请求库

export async function getOrderList(page?: number, limit?: number, finalCondition?: FilterCondition[]): Promise<any> {
  // 构造查询字符串
  const searchParams = new URLSearchParams();

  // 添加分页参数
  if (page) searchParams.set('page', page.toString());
  if (limit) searchParams.set('limit', limit.toString());

  // 添加过滤条件
  if (finalCondition && finalCondition.length > 0) {
    finalCondition.forEach(condition => {
      searchParams.set(condition.filter_field, condition.filter_value);
    });
  }

  // 发送请求
  return request(`/api/ApiStore/order_list?${searchParams.toString()}`, {
    method: 'GET', // 使用 GET 请求，因为我们将过滤条件作为查询参数发送
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

  
  //读取订单详情


  export async function getOrderDetail(page: number ): Promise<any> {
    return request(`/api/ApiStore/order_detail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: page || 1 }), // Provide a default value if page is undefined
    });
  }

  // 添加订单
export async function addOrder(orderData: any): Promise<any> {
  return request('/api/ApiStore/order_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
}

















// // @ts-ignore
// /* eslint-disable */
// import { request } from '@umijs/max';




// //  读取订单列表
// export async function getOrderList(page: any, limit: any) {
//     return request(`/api/ApiStore/order_list?page=${page}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   }
  
//   //读取订单


//   export async function getOrderDetail(page: string | undefined) {
//     return request(`/api/ApiStore/order_detail`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ page}), // 将参数序列化为JSON字符串
//     });
//   }










