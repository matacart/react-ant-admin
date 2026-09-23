import { Card, Col, Divider, Flex, Form, Row } from "antd";
import { EllipsisOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { history } from '@umijs/max';
import order, { FulfillmentItemType } from "@/store/order/order";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyButton from "@/components/Button/MyButton";
import SplitPackage from "../Modal/SplitPackage";
import SuspendDelivery from "../Modal/SuspendDelivery";
import { currencyPrecision } from "@/utils/common";
import { useSymbolLeft } from "@/hooks/customHooks";


function PendingShippedCard({groupIndex}:{groupIndex:number}) {

  const symbolLeft = useSymbolLeft();

  const fulfillment  = order.fulfillmentOrderList[groupIndex];

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <PendingSecondIcon className="font-28" />
            <span className="font-w-500">{"未发货"}（{fulfillment.fulfillmentItemList.reduce((pre:number,cur:FulfillmentItemType)=>Number(pre)+Number(cur.productNum),0)}）</span>
          </Flex>
          <MyDropdown
            tiggerEle={
              <div className="cursor-pointer"><EllipsisOutlined /></div>
            }
            placement="bottomRight"
            menu={{
              items:[
                {
                    key: "1", label: (
                        <div onClick={()=>{}}>更改地点</div>
                    )
                },
                {
                  key: "2", label: (
                    <SuspendDelivery groupIndex={groupIndex} />
                  )
                },
                // {
                //   key: "3", label: (
                //     <SplitPackage groupIndex={groupIndex} />
                //   )
                // },
              ]
            }} />
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
            <Flex gap={6}>
              <EnvironmentOutlined className="color-7A8499" />
              <div className="color-7A8499">{"地点"}</div>
            </Flex>
            <div className="color-242833">{"默认地点"}</div>
          </Flex>
          {fulfillment.fulfillmentOrder?.deliveryMethod?.deliveryName && <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
            <Flex gap={6}>
              <EnvironmentOutlined className="color-7A8499" />
              <div className="color-7A8499">{"配送方案"}</div>
            </Flex>
            <div className="color-242833">{fulfillment.fulfillmentOrder.deliveryMethod.deliveryName}</div>
          </Flex>}
          {fulfillment.fulfillmentItemList.map((item:FulfillmentItemType,index:number)=>{
            return(
              <Row key={index} style={{marginBottom:"20px"}}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.firstImage?item.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.title} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.title}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : </div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(item.productPrice)} X {item.productNum}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(Number(item.productAmount || 0))}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <Form>
        <Flex justify="flex-end" gap={12}>
            <MyDropdown 
            tiggerEle={
                <MyButton text={"承运商发货"} style={{height:"36px"}} icon={<UnfoldIcon className="font-20" />} iconPosition={"end"} />
            }
            menu={{
                items:[
                    {
                        key: "1", label: (
                            <div onClick={() => { } } className="">使用Shipper迅朋物流发货</div>
                        )
                    }
                ]
            }} />
            <PrimaryButton text={"标记为已发货"} onClick={()=>history.push(`/orders/delivery/${order.orderInfo.orderSeq}/${fulfillment.fulfillmentOrder.fulfillmentOrderSeq}/${order.languages}`)}  />
        </Flex>
      </Form>
    </Card>
  );
}

export default observer(PendingShippedCard);