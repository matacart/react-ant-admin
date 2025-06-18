import { Card, Col, Divider, Flex, Form, Input, message, Popconfirm, Row, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { DeleteIcon, PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon, WarningIcon } from "@/components/Icons/Icons";
import orderProductEdit from "@/store/order/orderProductEdit";
import NumberInput from "@/components/Input/NumberInput";
import ProductTableModal from "./ProductTableModal";
import EditDiscount from "./EditDiscount";
import { toJS } from "mobx";
import CustomizeProductModal from "./CustomizeProductModal";


function RemainingCard() {

    const remainingInfo  = orderProductEdit.remainingProductGroup[0]

    // 删除产品 方案一 删除数据
    // const deleteProduct = (id:string)=>{
    //     const newRemainingProductGroup = toJS(orderProductEdit.remainingProductGroup)
    //     newRemainingProductGroup[0].product = newRemainingProductGroup[0].product.filter((item:any)=>item.id!==id)
    //     orderProductEdit.setRemainingProductGroup(newRemainingProductGroup)
    //     orderProductEdit.setDeleteProductIds([...orderProductEdit.deleteProductIds,id])
    // }

    // 删除产品 方案二 修改数据
    const deleteProduct = (item:any)=>{
        const newRemainingProductGroup = toJS(orderProductEdit.remainingProductGroup)
        if(item.id == ""){
            newRemainingProductGroup[0].product = newRemainingProductGroup[0].product.filter((product:any)=>product.vid!==item.vid)
        }else{
            newRemainingProductGroup[0].product.forEach((product:any,index:number)=>{
                if(product.id===item.id){
                    product.product_quantity = product.shipped_quantity
                }
            })
        }
        orderProductEdit.setRemainingProductGroup(newRemainingProductGroup)
    }

    return (
        <Card
        title={
            <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
                <Flex align="center" gap={10}>
                    <span className="font-w-500">{"未发货"}（{remainingInfo.remaining.remaining_quantity_count}）</span>
                </Flex>
                <Flex gap={12}>
                    <ProductTableModal />
                    {/* 自定义商品 */}
                    <CustomizeProductModal />
                </Flex>
            </Flex>
        }
        >
        <Form>
            <div className="font-w-400">
                <Row style={{marginBottom:"20px"}}>
                    <Col span={14}>商品</Col>
                    <Col span={4}>数量</Col>
                    <Col span={4} style={{textAlign:"right"}}>合计</Col>
                </Row>
                {/* 处理 productinfo 为 undefined 的情况 */}
                {remainingInfo.product.filter(item=>item.product_quantity!==item.shipped_quantity).map((item:any,index:number)=>{
                    return(
                    <Row key={index} style={{marginBottom:"20px"}}>
                        <Col span={14}>
                        <Flex style={{paddingRight:"40px"}}>
                            <img src={item.product_image ? item.product_image+"?x-oss-process=image/resize,w_200" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_200"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                            <Flex vertical align="flex-start" justify="flex-start">
                            <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.product_name}</div>
                            {item.attributes && <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                                item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                            }</div>}
                            {item.product_model && <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>}
                            <EditDiscount item={item} />
                            </Flex>
                        </Flex>
                        </Col>
                        <Col span={4}>
                        <Flex style={{height:"100%"}}>
                            <div>
                                <NumberInput style={{width:"100%"}} min={1} value={item.num} onChange={(value:number)=>{
                                    const newRemainingProductGroup = toJS(orderProductEdit.remainingProductGroup)
                                    newRemainingProductGroup[0].product.forEach((product:any,index:number)=>{
                                        if( item.id == "" ? product.vid == item.vid : product.id===item.id ){
                                            product.num=value??1
                                            product.product_quantity = value + parseInt(product.shipped_quantity+"")
                                        }
                                    })
                                    orderProductEdit.setRemainingProductGroup(newRemainingProductGroup)
                                }} />
                            </div>
                        </Flex>
                        </Col>
                        <Col span={4}>
                        <Flex justify="end" style={{height:"100%"}}>
                            <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.final_price+"")*parseInt(item.num+"")).toFixed(4)}</span>
                        </Flex>
                        </Col>
                        <Col span={2}>
                            <Flex justify="end" style={{width:"100%"}}>
                                <Popconfirm
                                    title="确认要将此商品从订单中移除吗？"
                                    okText="确定"
                                    icon={<WarningIcon style={{ color: '#F86140' }} />}
                                    cancelButtonProps={{style: { fontSize: '12px' }}}
                                    okButtonProps={{style: { fontSize: '12px',backgroundColor:"#F86140" }}}
                                    cancelText="取消"
                                    onConfirm={()=>{
                                        deleteProduct(item)
                                    }}
                                >
                                    <DeleteIcon className="font-20 color-F86140" />
                                </Popconfirm>
                            </Flex>
                        </Col>
                    </Row>
                    )
                })}
            </div>
        </Form>
        <Divider />
        </Card>
    );
}

export default observer(RemainingCard);