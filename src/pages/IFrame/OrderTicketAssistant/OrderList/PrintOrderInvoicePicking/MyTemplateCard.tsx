import { Card, Flex } from "antd"
import styled from "styled-components"


function MyTemplateCard(){

    const list = [1,2,3,4]

    return (
        <Scoped>
            <Card>
                
                {/*  */}
                <div style={{marginBottom:"16px"}}>
                    <div className="ota-font-28 ota-font-w-600">我的模板</div>
                    <div className="ota-font-16 ota-font-w-600">Admin</div>
                    <div className="ota-font-12">Print Date3/3/2025, 9:38:24 PM</div>
                    <div className="ota-font-12">Selected order quantity1 orders</div>
                </div>
                {/*  */}
                <table className="table" style={{width:"100%"}}>
                    <thead>
                        <tr className="ota-font-12">
                            <th style={{textAlign:"left",padding:"20px 0"}}>SKU</th>
                            <th style={{textAlign:"center",padding:"20px 0"}}>PRODUCT</th>
                            <th style={{textAlign:"center",padding:"20px 0"}}>VARIANT</th>
                            <th style={{textAlign:"right",padding:"20px 0"}}>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(item=>{
                            return (
                                <tr>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12" align="center">
                                            <div className="ota-font-12 ota-font-w-600">10023</div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="center">
                                            <div className="ota-font-12 ota-font-w-600">23123123</div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="center">
                                            <div>US$50.00</div>
                                        </Flex>
                                    </td>
                                    <td style={{paddingBottom:"20px"}}>
                                        <Flex className="ota-font-12 ota-color-666666" justify="flex-end">
                                            <div>1</div>
                                        </Flex>
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                {/* Total  */}
                <Flex className="total">
                    <Flex justify="space-between" className="total-content ota-font-14 ota-font-w-600">
                        <div>付款方式</div>
                        <div>4</div>
                    </Flex>
                </Flex>
            </Card>
        </Scoped>
    )

}

export default MyTemplateCard

const Scoped = styled.div`
    flex: 2;
    .table{
        border-bottom: 1px solid #000000;
        border-top: 1px solid #000000;
    }
    .total{
        margin-top: 16px;
        justify-content: flex-end;
        .total-content{
            flex-basis: 50%;
        }
    }
`
    