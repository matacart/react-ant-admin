// 报告数据

import { Request, Response } from "express"

export default{
    'GET /api/ApiAnalyse/report' : (req: Request, res: Response) => {
        res.json({
            "code":0,
            "msg":"ok",
            "data": [
                {
                    "date": "2023-06-01",
                    "salesVolume": "1320",
                    "amountPaid": "2000",
                    "visitorsNum":"5",
                    "customer": "30",
                    "orders":"20",
                    "pageView":"63",
                    "refundAmount":"111"
                },
                {
                    "date": "2023-06-11",
                    "salesVolume": "4000",
                    "amountPaid": "1000",
                    "visitorsNum":"6",
                    "customer": "70",
                    "orders":"20",
                    "pageView":"456",
                    "refundAmount":"223"
                },
                {
                    "date": "2023-08-01",
                    "salesVolume": "1000",
                    "amountPaid": "6000",
                    "visitorsNum":"2",
                    "customer": "40",
                    "orders":"70",
                    "pageView":"333",
                    "refundAmount":"221"
                },
                {
                    "date": "2023-06-12",
                    "salesVolume": "2000",
                    "amountPaid": "2000",
                    "visitorsNum":"1",
                    "customer": "70",
                    "orders":"90",
                    "pageView":"321",
                    "refundAmount":"123"
                },
                {
                    "date": "2023-10-01",
                    "salesVolume": "4000",
                    "amountPaid": "3000",
                    "visitorsNum":"1",
                    "customer": "10",
                    "orders":"20",
                    "pageView":"222",
                    "refundAmount":"4445"
                },
                {
                    "date": "2023-06-22",
                    "salesVolume": "1000",
                    "amountPaid": "2000",
                    "visitorsNum":"1",
                    "customer": "30",
                    "orders":"60",
                    "pageView":"111",
                    "refundAmount":"333"
                },
                {
                    "date": "2024-10-31",
                    "salesVolume": "1000",
                    "amountPaid": "2000",
                    "visitorsNum":"1",
                    "customer": "30",
                    "orders":"60",
                    "pageView":"23",
                    "refundAmount":"222"
                },
                {
                    "date": "2024-10-30",
                    "salesVolume": "2000",
                    "amountPaid": "4000",
                    "visitorsNum":"3",
                    "customer": "60",
                    "orders":"70",
                    "pageView":"2",
                    "refundAmount":"132"
                },
                
            ]
        })
        // res.json({
        // "code":0,
        // "msg":"ok",
        // "data": []
    
        // })   
    }
}
// {
//     // 'date':'2023-06-01',
//     // 'sell':'1000',
//     // 'sell_rate':'10%',
//     // 'sell_ratio':'10%',
//     // 'sell_amount':'1000',
//     // 'sell_amount_ratio':'10%',
//     // 'sell_amount_rate':'10%'
//     }