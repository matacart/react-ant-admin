import { App, Card, Col, Divider, Flex, Form, Row, Tooltip } from "antd";
import { EllipsisOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { CopyIcon, ReturnSecondIcon } from "@/components/Icons/Icons";
import order, { OrderRefundDetailInfoType, ReturnReasonType } from "@/store/order/order";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import copy from "copy-to-clipboard";
import { currencyPrecision } from "@/utils/common";
import { useSymbolLeft } from "@/hooks/customHooks";
import AfterSalesTrackingModal from "../Modal/AfterSalesTrackingModal";
import DangerButton from "@/components/Button/DangerButton";
import { cancelReturnOrder } from "@/services/y2/apiStore";
import AfterSalesTrackingQuery from "../Modal/AfterSalesTrackingQuery";

const CancelRefundFooter = ({ onClose, afterSaleOrderSeq }: { onClose: () => void, afterSaleOrderSeq: string }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      cancelReturnOrder({
        languages_id: order.languages,
        orderSeq: order.orderInfo?.orderSeq,
        afterSaleOrderSeq: afterSaleOrderSeq,
      });
      message.success("取消退货成功");
      order.triggerRefresh();
    } catch {
      message.error("取消退货失败");
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <Flex justify="flex-end" gap={12}>
      <DefaultButton onClick={onClose} text="继续退货" />
      <DangerButton loading={loading} onClick={handleCancel} text="取消退货" />
    </Flex>
  );
};

function OrderReturning({groupIndex,returnReasonList}:{groupIndex:number,returnReasonList:ReturnReasonType[]}) {

  const { message,modal } = App.useApp();

  const symbolLeft = useSymbolLeft();

  const afterSaleOrder  = order.afterSaleOrderList[groupIndex];

  // 取消退货
  const cancelRefund = () => {
    const confirm = modal.confirm({
      title: '确定要取消退货吗？',
      icon: <ExclamationCircleFilled style={{color:"#F86140"}} />,
      content: '取消退货后，商品将回到已发货状态，是否继续取消退货？',
      centered: true,
      footer: <CancelRefundFooter afterSaleOrderSeq={afterSaleOrder?.afterSaleOrderSeq || ""} onClose={()=>confirm.destroy()} />,
    })
  }

  const items = [
    {
      key: "1", label: <AfterSalesTrackingModal afterSaleOrder={afterSaleOrder} />
    },
    ...(afterSaleOrder?.canCancelRefund? [{ key: "2", label: <a style={{color:"#F86140"}} onClick={()=>cancelRefund()}>取消退货</a> }]: []),
  ]

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <ReturnSecondIcon className="font-28" />
            <span className="font-w-500">{"退货中"}（{afterSaleOrder.orderRefund?.orderRefundDetailInfoList?.reduce((pre:number,cur:any)=>pre+Number(cur.skuNum),0) || 0}）#{afterSaleOrder.afterSaleOrderSeq}</span>
            <Tooltip title="复制">
              <span style={{cursor:"pointer"}} onClick={()=>{
                  copy(afterSaleOrder.afterSaleOrderSeq)
                  message.success('复制成功')
              }}><CopyIcon className='color-7A8499 cursor-pointer' /></span>
            </Tooltip>
          </Flex>
          <MyDropdown
            tiggerEle={
              <div className="cursor-pointer"><EllipsisOutlined /></div>
            }
            placement="bottomRight"
            menu={{
              items:items
            }} />
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          {afterSaleOrder.orderRefund?.orderRefundDetailInfoList?.map((orderRefundDetailInfo:OrderRefundDetailInfoType,index:number)=>{
            return(
              <Row key={index} style={{marginBottom:"20px"}}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={orderRefundDetailInfo.orderItem?.firstImage?orderRefundDetailInfo.orderItem.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={orderRefundDetailInfo.orderItem?.title} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{orderRefundDetailInfo.orderItem?.title}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        orderRefundDetailInfo.orderItem?.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : </div>
                      <div style={{ fontSize: "14px", color: "#474F5E",marginTop:"4px" }}>退货原因 : {returnReasonList.find((item:ReturnReasonType)=>item.value===orderRefundDetailInfo.itemRefundReason?.returnReason)?.label || ""}</div>
                      {orderRefundDetailInfo.itemRefundReason?.returnReasonNote && <div style={{ fontSize: "14px", color: "#474F5E",marginTop:"4px" }}>备注 : {orderRefundDetailInfo.itemRefundReason.returnReasonNote}</div>}
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(orderRefundDetailInfo.orderItem?.productPrice)} X {orderRefundDetailInfo.orderItem?.productNum}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(Number(orderRefundDetailInfo.orderItem?.productAmount || 0))}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <Flex justify="space-between">
        {/* 物流信息 */}
        {(afterSaleOrder?.orderRefund?.expressCompanyCode || afterSaleOrder?.orderRefund?.expressCompanyCode == "0") ? <div>
          <span>{afterSaleOrder?.orderRefund?.expressCompany}</span>
          {afterSaleOrder?.orderRefund?.expressCode && <>
            :<AfterSalesTrackingQuery afterSaleOrder={afterSaleOrder} />
          </>}
        </div>:<div></div>}
        <Flex gap={12}>
          <DefaultButton text="标记已退货" />
          <PrimaryButton text={"退款"} onClick={()=>{}}  />
        </Flex>
      </Flex>
    </Card>
  );
}

export default observer(OrderReturning);