import { Card, Flex } from "antd"
import styled from "styled-components"


function MyTemplateCard(){

    const list = [1,2,3,4]

    return (
        <Scoped>
            <Card title={<div>我的模板</div>}>
                <Flex justify="space-between">
                    <div>
                        <div className="ota-font-28 ota-font-w-600">INVOICE</div>
                        <div className="ota-font-16 ota-font-w-600">A Name</div>
                    </div>
                    <Flex vertical align="flex-end">
                        <img style={{width:"150px"}} src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABQEAAAAADWEcvkAAABMklEQVR4nOzSzWqDQBhAUS19/1e2uAjOJ9LdRQjnLEJmmD/h/h7H9pJ937bj2PfzBef/c3TNXuP1d5377Lqvmyesa5/Ova/5rJr3zb3rvv/Xzhevo/nFzy99OneePW+ZZ12zb/h562K+m7BICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLxF8AAAD//2WSZKFBliwNAAAAAElFTkSuQmCC"></img>
                        <div className="ota-font-12" style={{fontSize:"12px"}}>订单编号：21068851214902590227195502</div>
                    </Flex>
                </Flex>
                {/*  */}
                <Flex className="addressAndOrder">
                    <div>
                        <div className="ota-font-14 ota-font-w-600">收货地址</div>
                    </div>
                    <div className="">
                        <div className="ota-font-14 ota-font-w-600">订单信息</div>
                        <div className="ota-font-12">订单金额：US$200.00</div>
                        <div className="ota-font-12">订单编号：1001</div>
                        <div className="ota-font-12">订单日期：2025/2/28 11:28:49</div>
                    </div>
                </Flex>
                {/*  */}
                <table className="table" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"left",padding:"20px 0"}}>商品</th>
                            <th style={{textAlign:"center",padding:"20px 0"}}>数量</th>
                            <th style={{textAlign:"center",padding:"20px 0"}}>价格</th>
                            <th style={{textAlign:"right",padding:"20px 0"}}>小计</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(item=>{
                            return (
                                <tr>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12" align="center">
                                            <div>
                                                <img style={{width:"64px"}} src="data:image/png;base64,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" />
                                            </div>
                                            <div style={{marginLeft:"8px"}}>
                                                <div className="ota-font-12 ota-font-w-600">23123123</div>
                                                <div className="ota-color-666666">US$50.00</div>
                                            </div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="center">
                                            <div>1</div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="center">
                                            <div>US$50.00</div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="flex-end">
                                            <div>US$50.00</div>
                                        </Flex>
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                {/* paymentInfo */}
                <Flex className="addressAndOrder">
                    <div></div>
                    <div>
                        <Flex className="ota-font-12" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>小计</div>
                            <div className="ota-font-w-600" style={{textAlign:"right"}}>$200.00</div>
                        </Flex>
                        <Flex className="ota-font-12" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>运费</div>
                            <div className="ota-font-w-600" style={{textAlign:"right"}}>$0.00</div>
                        </Flex>
                        <Flex className="ota-font-14 ota-font-w-600" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>总价</div>
                            <div style={{textAlign:"right"}}>$200.00</div>
                        </Flex>
                        <Flex className="ota-font-12" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>付款金额</div>
                            <div className="ota-font-w-600" style={{textAlign:"right"}}>$200.00</div>
                        </Flex>
                        <Flex className="ota-font-12" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>实际付款</div>
                            <div className="ota-font-w-600" style={{textAlign:"right"}}>$200.00</div>
                        </Flex>
                    </div>
                </Flex>
                {/* paymentMethod */}
                <div className="payment-method">
                    <div className="payment-method-name ota-font-14 ota-font-w-600">付款方式</div>
                    <div className="ota-font-12" style={{marginTop:"8px"}}>codPay</div>
                </div>
            </Card>
        </Scoped>
    )

}

export default MyTemplateCard

const Scoped = styled.div`
    flex: 2;
    .addressAndOrder{
        padding-top: 28px;
        padding-bottom: 12px;
        div{
            flex: 1;
        }
    }
    .table{
        border-bottom: 1px solid #000000;
        border-top: 1px solid #000000;
    }
    .payment-method{
        margin-top: 40px;
        
    }
`
    