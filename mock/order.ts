import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

export default {



'POST  /api/ApiStore/order_list': (req: Request, res: Response) => {
    res.json({
    "code": 0,
    "msg": "",
    "count": "3",
    "data": [
     
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
        {
            "id": "5517517682112480839",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:17:05",
            "tel": "904-444-6166",
            "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
            "delivery_name": "Calamat Calamat",
            "country": "United States",
            "province": "Florida(FL)",
            "city": "florida",
            "postcode": "32204",
            "address": "2306  Cherry Tree Drive",
            "employee_id": "0",
            "orders_status_id": "9",
       
            "delivery_status_id": "3",
       
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
                    "id": "4615",
                    "orders_id": "5517517682112480839",
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
            "status_history_text": "Time: 2023-05-11 15:17:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },
        {
            "id": "5517517682112480839",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:17:05",
            "tel": "904-444-6166",
            "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
            "delivery_name": "Calamat Calamat",
            "country": "United States",
            "province": "Florida(FL)",
            "city": "florida",
            "postcode": "32204",
            "address": "2306  Cherry Tree Drive",
            "employee_id": "0",
            "orders_status_id": "10",
       
            "delivery_status_id": "10",
         
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
                    "id": "4615",
                    "orders_id": "5517517682112480839",
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
            "status_history_text": "Time: 2023-05-11 15:17:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },
        {
            "id": "5517517682112480839",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:17:05",
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
           
            "delivery_status_id": "1",
          
            "payment_status_id":"7",
       
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
                    "id": "4615",
                    "orders_id": "5517517682112480839",
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
            "status_history_text": "Time: 2023-05-11 15:17:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },
        {
            "id": "5517517682112480839",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:17:05",
            "tel": "904-444-6166",
            "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
            "delivery_name": "Calamat Calamat",
            "country": "United States",
            "province": "Florida(FL)",
            "city": "florida",
            "postcode": "32204",
            "address": "2306  Cherry Tree Drive",
            "employee_id": "0",
            "orders_status_id": "2",
   
            "delivery_status_id": "0",
      
            "payment_status_id":"15",
    
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
                    "id": "4615",
                    "orders_id": "5517517682112480839",
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
            "status_history_text": "Time: 2023-05-11 15:17:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },
        {
            "id": "5517517682112480839",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "order_total": "100.00",
            "shipping_method": "Free Shipping",
            "payment_method": "PayPal",
            "payment_method_no": null,
            "paypal_txt_id": null,
            "date_purchased": "2023-05-11 15:17:05",
            "tel": "904-444-6166",
            "email": "2fc46331d334c1b011428b9c2cc00413@gmail.com",
            "delivery_name": "Calamat Calamat",
            "country": "United States",
            "province": "Florida(FL)",
            "city": "florida",
            "postcode": "32204",
            "address": "2306  Cherry Tree Drive",
            "employee_id": "0",
            "orders_status_id": "10",
    
            "delivery_status_id": "0",
        
            "payment_status_id":"16",
         
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
                    "id": "4615",
                    "orders_id": "5517517682112480839",
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
            "status_history_text": "Time: 2023-05-11 15:17:05     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },
    ]})
  },
  

  

  'POST  /api/ApiStore/order_detail': (req: Request, res: Response) => {
       
        
    res.json({
    "code": 0,
    "msg": "",
    "count": "3",
    "data": [
     

        {
            "id": "5517521343832146903",
            "domain_id": "433552",
            "source_domain_name": "www.mate-mall.com",
            "languages_id": "2",
            "currency": "USD",
            "orders_name":"ssss",
            "orders_price":"100.00",
            "orders_num":"1.00",
            "orders_total": "100.00",
            "shipping_cost":"0.00",
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
            "delivery_status_id": "1",
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
            "historyinfo":[
                {
                    "id": "1",
                    "orders_id": "5517521343832146903",
                    "orders_status_id":"您编辑了发货单1001-F1的跟踪信息。",
                    "pid":"0",
                    "time":"2023-05-11 15:31:38",
                    "comments":"{shipping_id} 111 ",

                },
                {
                    "id": "2",
                    "orders_id": "5517521343832146904",
                    "pid":"1",
                    "orders_status_id":"您编辑了发货单1001-F1的跟踪信息。",
                    "time":"2023-05-11 15:31:38",
                    "comments":"{remark} 123 ",

                },
                {
                    "id": "3",
                    "orders_id": "5517521343832146905",
                    "pid":"5517521343832146903",
                    "orders_status_id":"您添加了备注。",
                    "time":"2023-05-11 15:31:38",
                    "comments":"",

                },
                {
                    "id": "4",
                    "orders_id": "5517521343832146906",
                    "pid":"0",
                    "orders_status_id":"SYSTEM通过货到付款处理了US$1.00的付款请求。",
                    "time":"2023-05-11 15:31:38",
                    "comments":"{order_total} US$1.00",

                },
                {
                    "id": "5",
                    "orders_id": "5517521343832146907",
                    "pid":"0",
                    "orders_status_id":"发货更新电子邮件已发送至化细菌 硝 (1807191473@qq.com)。",
                    "time":"2023-05-11 15:31:38",
                    "comments":"重新发送邮件",

                },
            ],
            "product_text": "Name: ssss<br\/>Model: ssss | Qty: 1 | <br\/>",
            "status_history_text": "Time: 2023-05-11 15:31:38     Status: Pending<br\/>Comments: 0<br\/><br\/>"
        },

    ]




})
}
}
