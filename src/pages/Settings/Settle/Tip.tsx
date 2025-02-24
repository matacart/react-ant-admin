import { Card, Checkbox, Col } from "antd";
import { useState } from "react";
import styled from "styled-components";


export default function Tip() {

    return(
        <Scoped>
            <Card>
                <Checkbox.Group>
                    <Col span={24}>
                        <Checkbox value={1}>在结账时显示小费选项</Checkbox>
                    </Col>
                </Checkbox.Group>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
`