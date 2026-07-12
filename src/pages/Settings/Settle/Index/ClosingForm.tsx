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

function ClosingForm() {
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">全名</div>}>
                        <div style={{marginTop:"4px"}} className="full-name-radio">
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,nameType:e.target.value})}
                                value={settingsInfo.checkoutFormConfig.nameType}
                                options={[
                                    {
                                        value: "FULL",
                                        label: (
                                            <div>
                                                <div className="color-474F5E">姓名同时填写</div>
                                                <div className="color-7A8499">符合亚洲客户的习惯</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: "SEPARATE",
                                        label: (
                                            <div>
                                                <div className="color-474F5E">姓、名分开填写</div>
                                                <div className="color-7A8499">符合欧美客户的习惯</div>
                                            </div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">公司名称</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,companyType:e.target.value})}
                                value={settingsInfo.checkoutFormConfig.companyType}
                                options={[
                                    {
                                        value: "HIDE",
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: "OPTIONAL",
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: "REQUIRED",
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">地址行2（公寓、单元等）</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,address2Type:e.target.value})}
                                value={settingsInfo.checkoutFormConfig.address2Type}
                                options={[
                                    {
                                        value: "HIDE",
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: "OPTIONAL",
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: "REQUIRED",
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">邮编格式校验<a style={{marginLeft:"2px"}} className="font-w-500">了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo.checkoutFormConfig.postCodeCheck=="1" ? true : false} onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,postCodeCheck:e.target.checked ? "1" : "0"})}>启用收件人邮编格式校验功能</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>开启后，将根据收件国家/州省/城市对邮编进行校验</div>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">收件人手机号</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,phoneType:e.target.value})}
                                value={settingsInfo.checkoutFormConfig.phoneType}
                                options={[
                                    {
                                        value: "HIDE",
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: "OPTIONAL",
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: "REQUIRED",
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">订单备注</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,orderRemarkType:e.target.value})}
                                value={settingsInfo.checkoutFormConfig.orderRemarkType}
                                options={[
                                    {
                                        value: "HIDE",
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: "OPTIONAL",
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">账单发送地址</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo.checkoutFormConfig.receiveAddressAsBillAddress=="1" ? true : false} onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,receiveAddressAsBillAddress:e.target.checked ? "1" : "0"})}>默认将收件地址用作账单地址</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>减少结账时需填写的字段数量。账单地址仍可编辑</div>
                            </Col>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">自动填充功能</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Col span={24}>
                                <Checkbox checked={settingsInfo.checkoutFormConfig.autoFillAddress=="1" ? true : false} onChange={(e)=>settingsInfo.setCheckoutFormConfig({...settingsInfo.checkoutFormConfig,autoFillAddress:e.target.checked ? "1" : "0"})}>启用地址自动填充功能</Checkbox>
                                <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>当客户输入其收货地址和账单地址时，为客户提供地址建议</div>
                            </Col>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(ClosingForm)

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
    .full-name-radio{
        .ant-radio{
            position: relative;
            top: -10px;
        }
    }
`
