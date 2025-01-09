import { Request, Response } from 'express';
export default {
    'POST  /api/ApiResource/purchase_list': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "count": "1356",
            "data": [
                {
                    id: "1",
                    title: '采购单号',
                    name: "2222",
                    locations:"",
                    status:"1",
                    quantity:"333",
                    count:"1111",
                    anticipate_time:"213213213123"
                },
                {
                    id: "1",
                    title: '采购单号',
                    name: "2222",
                    locations:"",
                    status:"2",
                    quantity:"333",
                    count:"1111",
                    anticipate_time:"213213213123"
                },
                {
                    id: "1",
                    title: '采购单号',
                    name: "2222",
                    locations:"",
                    status:"3",
                    quantity:"333",
                    count:"1111",
                    anticipate_time:"213213213123"
                },
                {
                    id: "1",
                    title: '采购单号',
                    name: "2222",
                    locations:"",
                    status:"4",
                    quantity:"333",
                    count:"1111",
                    anticipate_time:"213213213123"
                },
                {
                    id: "1",
                    title: '采购单号',
                    name: "2222",
                    locations:"",
                    status:"5",
                    quantity:"333",
                    count:"1111",
                    anticipate_time:"213213213123"
                }
            ]
        })
    }
}
