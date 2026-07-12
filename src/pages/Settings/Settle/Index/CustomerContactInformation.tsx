import settingsInfo from "@/store/settings/settle/settingsInfo";
import { ExportOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col, Form, Radio } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

const CustomerContactInformation = () => {

    return (
        <Scoped>
            <Card className="card">
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">结账联系方式</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,contactInfoType:e.target.value})}
                                value={settingsInfo?.config?.contactInfoType}
                                options={[
                                    {
                                        value: "EMAIL_ONLY",
                                        label: (
                                            <div className="color-474F5E">客户只能使用邮箱结账</div>
                                        ),
                                    },
                                    {
                                        value: "MOBILE_ONLY",
                                        label: (
                                            <div className="color-474F5E">客户只能使用手机号结账</div>
                                        ),
                                    },
                                    {
                                        value: "EMAIL_OR_MOBILE",
                                        label: (
                                            <div className="color-474F5E">客户可使用手机号或邮箱结账</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">订阅信息</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo?.config?.enableSubscription == "1" ? true : false} onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,enableSubscription:e.target.checked ? "1" : "0"})}>默认为客户订阅营销信息</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>勾选后，客户仍可以在结账页选择取消订阅营销信息</div>
                            </Col>
                            <Col span={24} style={{marginTop:"12px"}}>
                                <Checkbox checked={settingsInfo?.config?.acceptSmsSubscription == "1" ? true : false} onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,acceptSmsSubscription:e.target.checked ? "1" : "0"})}>客户可以选择订阅营销短信</Checkbox>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">到店取货与本地配送</div>
                        <div className="color-7A8499 font-12">若勾选必须填写手机号，结账时无法使用Apple Pay和Google Pay的快捷支付</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo?.config?.pickupPhoneRequired == "1" ? true : false} onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,pickupPhoneRequired:e.target.checked ? "1" : "0"})}>到店取货时，必须填写手机号</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>勾选后，客户仍可以在结账页选择取消订阅营销信息</div>
                            </Col>
                            <Col span={24} style={{marginTop:"12px"}}>
                                <Checkbox checked={settingsInfo?.config?.localDeliveryPhoneRequired == "1" ? true : false} onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,localDeliveryPhoneRequired:e.target.checked ? "1" : "0"})}>本地配送时，必须填写手机号</Checkbox>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={
                        <div className="color-242833 font-w-600">结账后接受订阅信息</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo?.config?.acceptSubscriptionByOtherContactType == "1" ? true : false} onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,acceptSubscriptionByOtherContactType:e.target.checked ? "1" : "0"})}>客户在完成订单后仍可选择添加电话号码或电子邮件，以便接收发货更新或其他订阅信息</Checkbox>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={
                        <div className="color-242833 font-w-600">选择客户接收物流更新通知的方式</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox disabled>客户在结账后可下载 Tracker App，并获取发货更新信息<a style={{marginLeft:"2px"}}>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>履约时效与经营情况符合 Tracker App 标准的店铺方可开通该功能。</div>
                            </Col>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(CustomerContactInformation)

const Scoped = styled.div`
    .divider{
        margin:20px 0px;
    }
    .text{
        margin-top: 16px;
    }
`
