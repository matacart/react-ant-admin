import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

// 模拟分类列表
export default {
    'POST  /api/ApiAppstore/domain_select': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "1356",
            "data": [
                {
                    id: "1",
                    domainName: "testname",
                    secondDomain: "qwer",
                    status: "1",
                }
            ]
        })
    }
}