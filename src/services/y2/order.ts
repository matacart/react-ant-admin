// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';
import { Oauth2 } from '../../../config/myConfig'
import newStore from '@/store/newStore';
import TableList from './../../pages/TableList/index';



//  读取订单列表
export async function getOrderList(page: any, limit: any) {
    return request(`/api/ApiStore/order_list?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
  //
  export async function addOder() {
    return request('/api/ApiStore/order_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
      data: [
        {
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
            "remark": null,
            "ip_address": "3745957729",
            "is_share": "0",
            "status": "1",
            "employee_realname": "\u7ba1\u7406\u5458",
            "domain_name": "www.mate-mall.com",
            "payment_time": "1970-01-01 08:00:00",
            "delivery_time": "1970-01-01 08:00:00",
            "orders_status_name": "\u5f85\u5904\u7406",
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
        {
            "id": "5517521343832146903",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:31:38",
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
            "remark": null,
            "ip_address": "3745957729",
            "is_share": "0",
            "status": "1",
            "employee_realname": "\u7ba1\u7406\u5458",
            "domain_name": "www.mate-mall.com",
            "payment_time": "1970-01-01 08:00:00",
            "delivery_time": "1970-01-01 08:00:00",
            "orders_status_name": "\u5f85\u5904\u7406",
            "productip": "223.70.199.97",
            "settlement_status": "0",
            "settlement_time": "1970-01-01 08:00:00",
            "commission_currency": "CNY",
            "commission_amount": "3.868620",
            "productinfo": [
                {
                    "id": "4617",
                    "orders_id": "5517521343832146903",
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
            "status_history_text": "Time: 2023-05-11 15:31:38     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        }
        
      ]
    })
  }