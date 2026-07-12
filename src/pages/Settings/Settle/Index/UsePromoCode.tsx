import DefaultInputNumber from "@/components/Input/DefaultInputNumber";
import settingsInfo from "@/store/settings/settle/settingsInfo";
import { Card, Col, Form, Radio } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

const UsePromoCode = () => {
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">
                        <div>使用限制</div>
                        <div className="font-w-500" style={{marginTop:"12px"}}>折扣码最大可叠加数量（1-5）</div>
                    </div>}>
                        <Col span={10} style={{marginTop:"4px"}}>
                            <DefaultInputNumber
                                style={{width:"200px",height:"36px"}}
                                min={1}
                                max={5}
                                value={settingsInfo.config.maxDiscountCodeCount}
                                onChange={(value:string)=>{
                                    settingsInfo.setConfig({...settingsInfo.config,maxDiscountCodeCount:value})
                                }}
                            />
                        </Col>
                    </Form.Item>
                    <Form.Item>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,whenCanUsePromoCode:e.target.value})}
                                value={settingsInfo.config.whenCanUsePromoCode}
                                options={[
                                    {
                                        value: "ONLY_SETTLE",
                                        label: (
                                            <div className="color-474F5E">只在结算页可以使用优惠码</div>
                                        ),
                                    },
                                    {
                                        value: "ALWAYS",
                                        label: (
                                            <div className="color-474F5E">在购物车、结算页均可使用优惠码</div>
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

export default observer(UsePromoCode)

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
   
`
