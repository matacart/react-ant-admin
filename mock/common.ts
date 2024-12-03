import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

// 模拟分类列表
export default {
    'POST  /api/ApiAppstore/domain_select': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "2",
            "data": [
                {
                    id: "213",
                    domainName: "test",
                    secondDomain: "2",
                    status: "1",
                },
                {
                    id: "2134",
                    domainName: "test2",
                    secondDomain: "2",
                    status: "1",
                }
            ]
        })
    }
}