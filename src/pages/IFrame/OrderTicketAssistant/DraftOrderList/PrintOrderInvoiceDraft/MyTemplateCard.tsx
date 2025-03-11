import { ExportIcon } from "@/components/Icons/Icons"
import { Card, Flex } from "antd"
import styled from "styled-components"


function MyTemplateCard(){

    const list = [1,2,3,4]

    return (
        <Scoped>
            <Card title={<Flex justify="space-between">
                <Flex gap={12}>
                    <div className="ota-font-14 ota-font-w-600">Default draft order template</div>
                    <div className="ota-font-14">2506885119584165959456</div>
                    <div className="ota-font-14 ota-font-w-500">1/1</div>
                </Flex>
                <Flex align="center">
                    <div className="ota-font-14 ota-font-w-500 ota-cursor-pointer ota-color-356DFF">原草稿单</div>
                    <ExportIcon className='ota-font-14 ota-cursor-pointer ota-color-356DFF' />
                </Flex>
            </Flex>}>
                <Flex justify="space-between" style={{marginBottom:"28px"}}>
                    <div className="ota-font-28 ota-font-w-600">DRAFT INVOICE</div>
                </Flex>
                {/*  */}
                <table className="table ota-font-12" style={{width:"100%"}}>
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
                                            <div className="ota-font-12 ota-font-w-600">23123123</div>
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
                        <Flex className="ota-font-14 ota-font-w-600" justify="space-between" style={{marginBottom:"4px"}}>
                            <div>总价</div>
                            <div style={{textAlign:"right"}}>$200.00</div>
                        </Flex>
                    </div>
                </Flex>
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
    