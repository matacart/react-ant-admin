import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
};

function CheckoutSecurityTrust() {

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Checkbox.Group>
                    <Col span={24}>
                        <Checkbox value={1}>在结账时显示安全与信任信息</Checkbox>
                        <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>可定义在结账过程展示店铺的支付安全信息，提高客户下单的信任感。</div>
                    </Col>
                    <Col span={24} style={{marginTop:"20px"}}>
                        <Checkbox value={2}>在结账时显示售后保障信息说明</Checkbox>
                        <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>可定义在结账过程展示店铺的售后保障信息。</div>
                    </Col>
                </Checkbox.Group>
            </Card>
        </Scoped>
    )
}

export default CheckoutSecurityTrust

const Scoped = styled.div`
    margin-bottom: 20px;
    .card{
    }
   
`
