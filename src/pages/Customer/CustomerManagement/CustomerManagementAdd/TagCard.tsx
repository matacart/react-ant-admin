import { Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import styled from "styled-components";

export default function TagCard() {

    return (
        <Scoped>
            <Card title="标签">
                <div className="select-box">

                    <Select placeholder="添加标签内容，回车确认" className="select-box-item" />

                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .select-box{
        /* width: 100%; */
        .select-box-item{
            width: 100%;
        }
    }
    
`