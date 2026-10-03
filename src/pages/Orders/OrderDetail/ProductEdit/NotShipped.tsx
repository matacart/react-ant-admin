import { Card, Col, Divider, Flex, Form, Popconfirm, Row, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { DeleteIcon, WarningIcon } from "@/components/Icons/Icons";
import orderProductEdit from "@/store/order/orderProductEdit";
import NumberInput from "@/components/Input/NumberInput";
import ProductTableModal from "./ProductTableModal";
import { toJS } from "mobx";
import CustomizeProductModal from "./CustomizeProductModal";
import { FulfillmentItemType } from "@/store/order/order";
import { useSymbolLeft } from "@/hooks/customHooks";
import { currencyPrecision, getCurrencyAmount } from "@/utils/common";
import styled from "styled-components";
import EditDiscount from "./EditDiscount";

function NotShipped() {

    const symbolLeft = useSymbolLeft();
    // 删除商品
    const removeProduct = (item:FulfillmentItemType,index:number) => {
        const newFulfillmentItemList = toJS(orderProductEdit.fulfillmentItemList);
        newFulfillmentItemList.splice(index,1);
        console.log(newFulfillmentItemList)
        orderProductEdit.setFulfillmentItemList(newFulfillmentItemList);
    }

    return (
        <MyCard title={
            <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
                <Flex align="center" gap={10}>
                    <span className="font-w-500">{"未发货"}（{3}）</span>
                </Flex>
                <Flex gap={12}>
                    <ProductTableModal  />
                    {/* 自定义商品 */}
                    <CustomizeProductModal />
                </Flex>
            </Flex>
        }>
            <div className="font-w-400">
                <Row style={{marginBottom:"20px"}}>
                    <Col span={14}>商品</Col>
                    <Col span={4}>数量</Col>
                    <Col span={4} style={{textAlign:"right"}}>合计</Col>
                </Row>
                {orderProductEdit.fulfillmentItemList.map((item:FulfillmentItemType,index:number)=>{
                    return(
                        <Row key={index} style={{marginBottom:"20px"}}>
                            <Col span={14}>
                                <Flex style={{paddingRight:"40px"}}>
                                    <img src={item.firstImage ? item.firstImage+"?x-oss-process=image/resize,w_200" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_200"} alt={item.title} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                                    <Flex vertical align="flex-start" justify="flex-start">
                                        <div className="font-14 color-474F5E font-w-500 title">{item.title}</div>
                                        <div className="font-14 color-474F5E">{
                                            item.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                                        }</div>
                                        <EditDiscount item={item} index={index} />
                                        <div className="font-14 color-474F5E">model : {}</div>
                                    </Flex>
                                </Flex>
                            </Col>
                            <Col span={4}>
                                <Flex style={{height:"100%"}}>
                                    <div>
                                        <NumberInput style={{width:"100%"}} min={1} value={item.productNum} onChange={(value:number)=>{
                                            const fulfillmentItemList = toJS(orderProductEdit.fulfillmentItemList)
                                            fulfillmentItemList[index].productNum = value
                                            orderProductEdit.setFulfillmentItemList(fulfillmentItemList)
                                        }} />
                                    </div>
                                </Flex>
                            </Col>
                            <Col span={4}>
                                <Flex justify="end" style={{height:"100%"}}>
                                    <span>{getCurrencyAmount(item.productAmountWithPromotionSet.settleMoney.currencyCode,item.productAmountWithPromotionSet.settleMoney.amount)}</span>
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
                                        onConfirm={()=>removeProduct(item,index)}
                                    >
                                        <DeleteIcon className="font-20 color-F86140" />
                                    </Popconfirm>
                                </Flex>
                            </Col>
                        </Row>
                    )
                })}
            </div>
            <Divider />
        </MyCard>
    );
}

export default observer(NotShipped);

const MyCard = styled(Card)`
    .title{
        margin-bottom: 4px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
    }
`