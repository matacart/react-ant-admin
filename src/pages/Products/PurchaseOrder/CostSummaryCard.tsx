import { Card, Col, Flex, Form, Row, Select } from "antd";
import styled from "styled-components";
import CostSummaryModal from "./CostSummaryModal";
import { useEffect, useState } from "react";
import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";

function CostSummaryCard() {

    const [CostData,setCostData] = useState([
        {key:"0",name:"关税",nameCode:"1",price:"0.00"},
        {key:"1",name:"折扣",nameCode:"2",price:"1.00"},
        {key:"2",name:"国外交易费",nameCode:"3",price:"2.00"}
    ]);

    const [total,setTotal] = useState(0);


    useEffect(()=>{
        console.log(CostData)
        let newTotal = CostData.reduce((a:any,b:any)=>{
            return a + Number(b.price)
        },0).toFixed(2)
        setTotal(newTotal)
        // 总计
        purchaseOrderStore.purchaseOrder.orderTotal = newTotal
    },[CostData])

    return(
        <Scoped>
            <Card bordered={false} title="成本摘要" extra={<CostSummaryModal data={CostData} setData={setCostData} />}>
                <div className="title_box">
                    <Flex justify="space-between">
                        <div>税款</div>
                        <div className="font-w-600">US$0.00</div>
                    </Flex>
                    <div style={{marginTop: '12px'}}></div>
                    <Flex justify="space-between">
                        <div>小记</div>
                        <div className="font-w-600">US$0.00</div>
                    </Flex>
                    <div className="title_count font-14 color-7A8499">10 件商品</div>
                </div>
                {/* 成本调整 */}
                <div className="content_box">
                    <div>成本调整</div>
                    {CostData.map((item:any,index:number)=>{
                        console.log(item)
                        return(
                            <Flex style={{marginTop: '6px'}} justify="space-between">
                                <div>{item.name}</div>
                                <div className="font-w-600">US${item.price}</div>
                            </Flex>
                        )
                    })}
                </div>
                <div className="foot_box">
                    <Flex justify="space-between">
                        <div>总计</div>
                        <div className="font-w-600">US${(total)}</div>
                    </Flex>
                </div>
            </Card>
        </Scoped>
    )
}

export default CostSummaryCard;

const Scoped = styled.div`
    width: 100%;
    margin-top: 20px;
    .title_box{
        .title_count{
            margin-top: 8px;
        }
    }
    .content_box{
        padding-bottom: 10px;
        border-bottom: 1px solid #eef1f7;
        margin-bottom: 10px;
    }
    .foot_box{
        margin-top: 12px;
    }
`

