import settingsInfo from "@/store/settings/settle/settingsInfo";
import { Card, Checkbox, Col, Form, Radio } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
};

function OrderProcessing() {
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">订单自动归档</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo.config.autoHideMarkOrder == "1"?true:false} onChange={(e)=>{
                                    settingsInfo.setConfig({...settingsInfo.config,autoHideMarkOrder:e.target.checked?"1":"0"})
                                }}>订单自动归档</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>系统将会对已付款并已发货的订单进行自动归档</div>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">支付订单后</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,autoSendOrderItemType:e.target.value})}
                                value={settingsInfo.config.autoSendOrderItemType}
                                options={[
                                    {
                                        value: "ONLY_GIFT_CARD",
                                        label: (
                                            <div className="color-474F5E">仅自动对订单的礼品卡进行发货</div>
                                        ),
                                    },
                                    {
                                        value: "NO_ORDER_ITEM",
                                        label: (
                                            <div className="color-474F5E">不要自动填充订单的任何订单商品</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(OrderProcessing)

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
   
`
