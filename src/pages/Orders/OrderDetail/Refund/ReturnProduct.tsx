import { Card, Checkbox, Col, Divider, Flex, Form, Input, message, Modal, Popover, Radio, Row, Tooltip } from "antd";
import { EllipsisOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { DownIcon } from "@/components/Icons/Icons";
import { useNavigate } from "react-router-dom";
import orderRefund from "@/store/order/orderRefund";
import NumberInput from "@/components/Input/NumberInput";
import { toJS } from "mobx";


function ReturnProduct() {

  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  const returnInfo  = orderRefund.returnedProductGroup[0]

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          {returnInfo?.return.return_status_id == "3" ? <>
            <Flex align="center" gap={10}>
              <span className="font-w-500">{"已退货"}（{returnInfo.return.returned_quantity}）</span>
            </Flex>
          </>:<>
            <Flex align="center" gap={10}>
              <span className="font-w-500">{"退货中"}（{returnInfo.return.returned_quantity}）</span>
            </Flex>
          </>}
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          {returnInfo.product.map((item:any,index:number)=>{
            return(
              <Row key={index} style={{marginBottom:"20px"}}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image?item.product_image+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                    <div>
                        <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.final_price}X {item.quantity_returned}</span>
                    </div>
                    <div style={{marginTop:"12px"}}>
                        <NumberInput style={{width:"100px"}} value={item.num} min={0} max={item.remaining_quantity} onChange={(value:number)=>{
                            const newReturnedProductGroup = toJS(orderRefund.returnedProductGroup)
                            newReturnedProductGroup[0].product.forEach((product:any,index:number)=>{
                            if(product.id===item.id){
                                product.num=value??0
                            }
                            })
                            orderRefund.setReturnedProductGroup(newReturnedProductGroup)
                        }} />
                    </div>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.final_price+"")*parseInt(item.quantity_returned+"")).toFixed(4)}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
        <Form>
            <Flex>
                <Checkbox>重新入库商品到此地点 :</Checkbox>
                <Popover placement="bottomLeft" trigger="click" content={<div style={{ width: "260px",overflowY:"scroll" }}>
                    <Radio.Group
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        value={1}
                        options={[
                            { value: 1, label: <div className="font-w-400">默认地点</div> },
                        ]}
                    />
                </div>} arrow={false}>
                    <Flex gap={4} className="cursor-pointer" align="center">
                        <img style={{width:"18px"}} src="https://cdn.myshopline.cn/sl/admin/ec2-shopline-address-center/20250512115923155/imgs/icon-location.ba524.svg" />
                        <div>默认地点</div>
                        <DownIcon className="font-12" />
                    </Flex>
                </Popover>
            </Flex>
        </Form>
    </Card>
  );
}

export default observer(ReturnProduct);