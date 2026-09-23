import { Card, Col, Flex, Form, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import MySelect from "@/components/Select/MySelect";
import styled from "styled-components";
import MyInput from "@/components/Input/MyInput";
import orderAfterSales from "@/store/order/orderAfterSales";
import { SuccessSecondIcon } from "@/components/Icons/Icons";
import { currencyPrecision } from "@/utils/common";
import { useSymbolLeft } from "@/hooks/customHooks";
import NumberInput from "@/components/Input/NumberInput";
import { ReturnReasonType } from "@/store/order/order";

function AfterSalesGoods({groupIndex,returnReasonList,form}:{groupIndex:number,returnReasonList:ReturnReasonType[],form:any}) {

  const symbolLeft = useSymbolLeft();

  const ordersPackage  = orderAfterSales.ordersPackageList[groupIndex];

  // 计算该包裹内所有商品的实际总件数
  const totalQuantity = ordersPackage.itemGroupList.reduce(
    (acc, group) =>
      acc + group.itemList.reduce((sum, item) => sum + (item.productNum || 0), 0),
    0
  );

  // 记录每个商品选择的退货原因，key 为商品 index
  const [refundReasonMap, setRefundReasonMap] = useState<Record<number, string>>({});

  // 初始化表单数据
  useEffect(() => {
    const list = ordersPackage.itemGroupList[0]?.itemList?.map((item) => ({
      groupId:item?.groupId || 0,
      productSource:item?.productSource,
      skuSeq:item?.productSku || "",
      version: item?.version || "0",
      packageSeq: ordersPackage.packageSeq || "",
      title: item?.title || "",
      attributes: item?.attributes || "",
      images: item?.images || "",
      payAmount: item?.productAmount || 0,
      fulfillmentOrderSeq:item?.fulfillmentOrderSeq || "",
      skuNum: item.productModifyNum || 0,
      itemRefundReason: {
        returnReason:undefined,
        returnReasonNote: "",
      },
    })) ?? [];
    const skuInfos: any[] = [];
    skuInfos[groupIndex] = list;
    form.setFieldsValue({ skuInfos });
  },[]);

  return (
    <MyCard
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <SuccessSecondIcon className="font-28" />
            <span className="font-w-500">{"已发货"}（{totalQuantity}）#{ordersPackage.appPackageSeq}</span>
          </Flex>
        </Flex>
      }
    >
    <Form form={form}>
        <div className="font-w-400">
          {ordersPackage.itemGroupList[0]?.itemList?.map((item,index)=>{
            const refundReason = refundReasonMap[index];
            return(
              <div key={index} className="item">
                <Row>
                  <Col span={14}>
                    <Flex style={{paddingRight:"40px"}}>
                      <img src={item.firstImage?item.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.title} style={{ width: "80px", height: "80px", marginRight: "20px" }} />
                      <Flex vertical align="flex-start" justify="flex-start" flex="1">
                        <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px" }} className="font-w-500">{item.title}</div>
                        <div style={{ fontSize: "14px", color: "#474F5E" }}>{item.attributes?.map((item:any)=>item.attributeValue??"").join("/")}</div>
                        <div style={{ fontSize: "14px", color: "#474F5E" }}>model:{}</div>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={5}>
                    <div style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(item.productPrice)} X {item.productNum}</div>
                    <Form.Item name={["skuInfos",groupIndex,index,"skuNum"]}>
                      <NumberInput disabled={!ordersPackage.itemGroupList[0]?.requireShipping} style={{marginTop:"8px",width:"100%",maxWidth:"120px",height:"36px"}}
                        min={0} 
                        max={item.productNum}
                        value={item?.productModifyNum || 0}
                        onChange={(value:number)=>{
                          const newOrdersPackageList = toJS(orderAfterSales.ordersPackageList);
                          newOrdersPackageList[groupIndex].itemGroupList[0].itemList[index].productModifyNum = value;
                          orderAfterSales.setOrdersPackageList(newOrdersPackageList);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Flex justify="end" style={{height:"100%"}}>
                      <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(item.productPrice*(item.productModifyNum || 0))}</span>
                    </Flex>
                  </Col>
                </Row>
                {(item?.productModifyNum || 0 )>0 && <div style={{marginTop:"8px"}}>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>退货原因（可选）</div>
                    <Flex style={{width:"100%"}} gap={12}>
                      <Form.Item style={{width:"40%"}} name={["skuInfos",groupIndex,index,"itemRefundReason","returnReason"]}>
                        <MySelect placeholder="请选择退货原因" options={returnReasonList} value={refundReasonMap[index]} onChange={(value:string)=>{
                          setRefundReasonMap({...refundReasonMap,[index]:value});
                        }} />
                      </Form.Item>
                      {refundReason === "OTHER" && (
                        <Form.Item style={{width:"40%"}} name={["skuInfos",groupIndex,index,"itemRefundReason","returnReasonNote"]}>
                          <MyInput placeholder="请添加退货原因" />
                        </Form.Item>
                      )}
                    </Flex>
                  </div>
                }
              </div>
            )
          })}
        </div>
      </Form>
    </MyCard>
  );
}

const MyCard = styled(Card)`
  .item{
    border-bottom: 1px solid #EEF1F6;
    padding-top: 20px;
    &:first-child{
      padding-top: 0;
    }
  }

`;

export default observer(AfterSalesGoods);
