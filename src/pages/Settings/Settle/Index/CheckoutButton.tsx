import settingsInfo from "@/store/settings/settle/settingsInfo";
import { history } from "@umijs/max";
import { Card, Checkbox, Col, Form, Radio, Row } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function CheckoutButton() {

    // 购物车按钮配置 -- 格式化为字符串数组
    const cartSettleButtonConfig = ()=>{
        const selectedValues = settingsInfo.cartSettleButtonConfig?.spbConfigs?.map((item:any)=>{
            return item.selected && item.channelName
        })
        return selectedValues ? selectedValues.filter(Boolean) : []
    }

    // 结算页按钮配置 -- 格式化为字符串数组
    const checkoutSettleButtonConfig = ()=>{
        const selectedValues = settingsInfo.checkoutSettleButtonConfig?.spbConfigs?.map((item:any)=>{
            return item.selected && item.channelName
        })
        return selectedValues ? selectedValues.filter(Boolean) : []
    }

    // 商品详情页按钮配置 -- 格式化为字符串数组
    const productDetailSettleButtonConfig = ()=>{
        const selectedValues = settingsInfo.productDetailSettleButtonConfig?.spbConfigs?.map((item:any)=>{
            return item?.selected && item.channelName
        })
        return selectedValues ? selectedValues.filter(Boolean) : []
    }



    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">商品详情页</div>}>
                        <div style={{marginTop:"4px"}} className="full-name-radio">
                            <Radio.Group
                                style={style}
                                value={settingsInfo.productDetailSettleButtonConfig?.system}
                                options={[
                                    {
                                        value: true,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">启用动态结算按钮</div>
                                                <div className="color-7A8499">根据配置的支付方式展示“立即购买”按钮或快捷支付按钮</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: false,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">自定义</div>
                                                <div className="color-7A8499">自行选择要展示的结帐按钮</div>
                                            </div>
                                        ),
                                    }
                                ]}
                                onChange={(e)=>{
                                    settingsInfo.setProductDetailSettleButtonConfig({
                                        ...settingsInfo.productDetailSettleButtonConfig,
                                        system:e.target.value
                                    })
                                }}
                            />
                            {!settingsInfo.productDetailSettleButtonConfig?.system && <div className="product_detail_settle_button_config">
                                <Checkbox.Group
                                    value={productDetailSettleButtonConfig()}
                                    onChange={(value)=>{
                                        const productDetailSettleButtonConfig = toJS(settingsInfo.productDetailSettleButtonConfig);
                                        productDetailSettleButtonConfig?.spbConfigs?.forEach((item:any)=>{
                                            item.selected = value.includes(item.channelName) || false
                                        })
                                        settingsInfo.setProductDetailSettleButtonConfig(productDetailSettleButtonConfig)
                                    }}
                                >
                                    <Row gutter={[0,12]}>
                                        <Col span={24}>
                                            <Checkbox value="BUY_NOW">展示“立即购买”按钮</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="PAY_PAL">展示PayPal快速结帐按钮</Checkbox>
                                            <div style={{marginLeft:"24px"}} className="font-12 color-62708D">此选项需在<span className="color-356DFF cursor-pointer" onClick={()=>history.push("/settings/payments")}> 付款设置 </span>中配置了PayPal支付方式才会生效</div>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="GOOGLE_PAY">Google Pay</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="APPLE_PAY">Apple Pay</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </div>}
                        </div>
                    </Form.Item>
                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">购物车</div>
                        <div className="color-7A8499 font-12">请选择在购物车要展示的结帐按钮</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group
                                value={cartSettleButtonConfig()}
                                onChange={(value)=>{
                                    const cartSettleButtonConfig = toJS(settingsInfo.cartSettleButtonConfig);
                                    cartSettleButtonConfig?.spbConfigs.forEach((item:any)=>{
                                        item.selected = value.includes(item.channelName) || false
                                    })
                                    settingsInfo.setCartSettleButtonConfig(cartSettleButtonConfig)
                                }}
                            >
                                <Row gutter={[0,12]}>
                                    <Col span={24}>
                                        <Checkbox value="PAY_PAL">Paypal</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="GOOGLE_PAY">Google Pay</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="APPLE_PAY">Apple Pay</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">结算页</div>
                        <div className="color-7A8499 font-12">请选择在结算页要展示的结帐按钮</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group 
                                value={checkoutSettleButtonConfig()}
                                onChange={(value)=>{
                                    const checkoutSettleButtonConfig = toJS(settingsInfo.checkoutSettleButtonConfig);
                                    checkoutSettleButtonConfig?.spbConfigs.forEach((item:any)=>{
                                        item.selected = value.includes(item.channelName) || false
                                    })
                                    settingsInfo.setCheckoutSettleButtonConfig(checkoutSettleButtonConfig)
                                }}
                            >
                                <Row gutter={[0,12]}>
                                    <Col span={24}>
                                        <Checkbox value="PAY_PAL">Paypal</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="GOOGLE_PAY">Google Pay</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="APPLE_PAY">Apple Pay</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(CheckoutButton)

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
    .product_detail_settle_button_config{
        margin-top: 12px;
        margin-left: 24px;
    }
    .full-name-radio{
        .ant-radio{
            position: relative;
            top: -10px;
        }
    }
`
