// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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

//  读取订单列表

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
  export async function addOrders(newOrder?: { id: number; products: never[]; discount: number; shippingFee: number; tax: number; createdAt: Date; updatedAt: Date; }) {
    return request('/api/ApiStore/order_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
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
            "product_text": "Name: ssss<br\/>Model: ssss | Qty: 1 | <br\/>",
            "status_history_text": "Time: 2023-05-11 15:19:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
      }
    })
  }

//批量 入账付款
export async function updateOrderStatus(ids: string[]): Promise<any> {
  return request(`/api/ApiStore/order_batchpay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ids: ids.join(','), 
      orders_status_id: 8, 
      access_token: localStorage.getItem('access_token')
    }),
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
      'Content-Type': 'application/json',
    },
    data: {
      ids: ids.join(','), 
      delivery_status_id: 3,
      access_token: localStorage.getItem('access_token')
    },
  });
}


// case 'batchdel':
//   if(!(admin.hasPerm('delete:/store/orderlist')||admin.hasPerm('is_merchant'))) {	
//     layer.msg("鏃犲垹闄ゆ搷浣滄潈闄�!");
  
//   }else{
//       var checkStatus = table.checkStatus('LAY-store-order-list')
//       ,checkData = checkStatus.data; //寰楀埌閫変腑鐨勬暟鎹�

//       if(checkData.length === 0){
//         return layer.msg('璇烽€夋嫨鏁版嵁');
//       }
      
//       layer.confirm('纭畾鍒犻櫎鍚楋紵', function(index) {
//         var delList=[];
//         checkData.forEach(function(n,i){
//           delList.push(n.id);
//         });
      
//         //鎵ц Ajax 鍚庨噸杞�  
//         if(delList!=''){
//           $.ajax({
//             url: layui.setter.base_server + "ApiStore/order_batchdel",
//             type:"POST",
//             dataType:"json",
//             data:{"ids":delList,"access_token":layui.setter.getToken().access_token},
//             success:function (res) {
//               if(res.code==0){
//                 layer.msg("鍒犻櫎鎴愬姛");
//                 table.reload("LAY-store-order-list",{});
//               }else{
//                 layer.msg("鍒犻櫎澶辫触");
//               }
//             },
//             error:function () {
//               layer.msg("绯荤粺閿欒");
//             }
//           })
         
//         }else{
//           layer.tips("璇烽€夋嫨闇€瑕佸垹闄ょ殑琛�",$("#batchDel"),{
//             tips:[3,"#5fb878"]
//           })
//         }		  
//       });			

//   }