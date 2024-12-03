import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

// 模拟分类列表
export default {
    'POST  /api/ApiStore/category_list': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "1356",
            "data": [
                {
                    "id": "1",
                    "name": "手机",
                    "parent_id": "0",
                    "sort": "1",
                    "status": "1",
                    "level": "1",
                    "path": "1",
                    "children": [
                        {
                            "id": "2",
                            "name": "手机通讯",
                            "parent_id": "1",
                        }
                    ]
                }
            ]
        })
    }
}