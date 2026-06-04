import { ExportOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col } from "antd";
import { useState } from "react";
import styled from "styled-components";


export default function CommodityInventoryDisposal() {

    return(
        <Scoped>
            <Card>
                <Checkbox.Group>
                    <Col span={24}>
                        <Checkbox value={1}>支付时锁定库存<a style={{marginLeft:"2px"}}>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></Checkbox>
                    </Col>
                </Checkbox.Group>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
`