import { Request, Response } from 'express';

// 模拟用户列表
export default {
    'POST  /api/ApiAppstore/customers_list': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "2",
            "data": [
                {
                    id: "21312312",
                    domainName: "test",
                    status: "1",
                },
                {
                    id: "214444434",
                    domainName: "test2",
                    secondDomain: "2",
                }
            ]
        })
    },
    // 用户
    'POST  /api/ApiAppstore/customers': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "2",
            "data": {
                    id: "21312312",
                    name: "客户1"
            },
        })
    }
}

