import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, InputNumber, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function UsePromoCode() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">
                        <div>使用限制</div>
                        <div className="font-w-500" style={{marginTop:"12px"}}>折扣码最大可叠加数量（1-5）</div>
                    </div>}>
                        <Col span={10} style={{marginTop:"4px"}}>
                            <InputNumber style={{width:"100%"}} min={1} max={5} defaultValue={3} onChange={()=>{}} />
                        </Col>
                    </Form.Item>

                    <Form.Item>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setAccountVersion(e.target.value)}
                                value={accountVersion}
                                options={[
                                    {
                                        value: 2,
                                        label: (
                                            <div className="color-474F5E">只在结算页可以使用优惠码</div>
                                        ),
                                    },
                                    {
                                        value: 3,
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

export default UsePromoCode

const Scoped = styled.div`
    margin-bottom: 20px;
    .card{
        padding-bottom: 4px;
    }
   
`
