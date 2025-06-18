import SimpleCard from "@/components/Card/SimpleCard";
import NumberInput from "@/components/Input/NumberInput";
import orderDelivery from "@/store/order/orderDelivery";
import { Form, Row, Col, Flex, Card } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function UndispatchedGoods(){

    useEffect(()=>{

        console.log(orderDelivery)
    },[])

    return (
        <div>
            <SimpleCard title={<Flex justify="space-between">
                <div className="font-w-500">未发货商品</div>
                <div className="font-w-400 font-14">默认地点</div>
            </Flex>} content={<div>
                <Form>
                    <div className="font-w-400">
                    {orderDelivery.deliveryProductList.map((item,index)=>{
                        return(
                        <Flex key={index} style={{borderBottom: "1px solid #EEF1F6",padding:"20px 0"}}>
                            <Flex style={{paddingRight:"10px"}}>
                                <img src={item.product_image?item.product_image+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_200"} alt={item.product_name} style={{ width: "80px", height: "80px", marginRight: "10px" }} />
                            </Flex>
                            <Flex style={{flex:1}} vertical>
                                <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all" }} className="font-w-500">{item.product_name}</div>
                                {item.attributes && <div style={{ fontSize: "14px", color: "#474F5E" }}>{item.attributes[0].product_option} · {item.attributes[0].product_option_values}</div>}
                                <div style={{ fontSize: "14px", color: "#474F5E" }}>sku:{null}</div>
                            </Flex>
                            <Flex justify="end" vertical style={{height:"100%"}}>
                                <NumberInput style={{width:"128px"}} min={0} max={item.remaining_quantity} value={item.quantity} onChange={(value:number)=>{
                                    const newDeliveryProductList = toJS(orderDelivery.deliveryProductList)
                                    orderDelivery.setDeliveryProductList(newDeliveryProductList.map((product,index)=>{
                                        if(product.id===item.id){
                                            product.quantity=value
                                        }
                                        return product
                                    }))
                                }} />
                                <div className="color-7A8499" style={{textAlign:"right",marginTop:"8px"}}>最大数量为{item.remaining_quantity}</div>
                            </Flex>
                        </Flex>
                        )
                    })}
                    </div>
                </Form>
            </div>} />
        </div>
    )
}

export default observer(UndispatchedGoods)