import { ExportOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col } from "antd";
import { useState } from "react";
import styled from "styled-components";


export default function AdditionalInformation() {

    return(
        <Scoped>
            <Card>
                <Checkbox.Group>
                    <Col span={24}>
                        <Checkbox value={1}>在结账时显示附加信息输入框<a style={{marginLeft:"20px"}}>编辑适用国家列表</a></Checkbox>
                    </Col>
                </Checkbox.Group>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
`