import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex } from "antd";
import styled from "styled-components";

function OrderStatistics(){

    return(
        <MyCard>
            <Flex className="card-warp">
                <div className="item color-474F5E font-w-600">
                    <div className="color-356DFF text-underline">最近一笔订单</div>
                    <div style={{marginTop:"10px"}} className="font-16">2天前</div>
                    <div style={{marginTop:"4px"}} className="font-12 color-7A8499 font-w-500">通过 下单</div>
                </div>
                <div className="item line color-474F5E font-w-600">
                    <div className="text-underline">总订单数</div>
                    <div style={{marginTop:"10px"}} className="font-16">5</div>
                </div>
                <div className="item line color-474F5E font-w-600">
                    <div className="text-underline">总消费金额</div>
                    <div style={{marginTop:"10px"}} className="font-16">US$86,332.00</div>
                </div>
                <div className="item line color-474F5E font-w-600">
                    <div className="text-underline">客单价</div>
                    <div style={{marginTop:"10px"}} className="font-16">US$17,266.40</div>
                </div>
            </Flex>
            
        </MyCard>
    )
}


const MyCard = styled(Card)`
    .card-warp{
        .text-underline{
            text-decoration:underline;
            text-decoration-style: dashed;
            text-decoration-color: #d7dbe7;
            text-underline-offset: 5px;
        }
        .item{
            flex:1;
            padding-left: 20px;
            position: relative;
        }
        .line::before{
            position: absolute;
            width: 1px;
            height: 100%;
            content: "";
            left: 0;
            background-color: #eef1f7;
        }
    }
`

export default OrderStatistics