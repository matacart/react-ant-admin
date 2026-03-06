
import { Request, Response } from "express";


export default{
    'POST /api/ApiChannel/get_pinned_sale_channels' : (req: Request, res: Response) => {
        res.json({
            "success": true,
            "code": "0",
            "message": "SUCCESS",
            "data": {
                "list": [
                    
                ],
                "total": "10",
                "page": "1",
                "limit": "50"
            }
        })
    }
}