import { Card, Checkbox, Col, Divider, Form, Input, Row } from "antd"
import styled from "styled-components"


export default function ShippingDetailsCard(){
    return (
        <Scoped>
            <Card>
                <Checkbox>此地点的库存可用于在线销售</Checkbox>
                <div style={{marginLeft:"24px",marginTop:"4px"}}>当前此地点库存可用于在线商店销售</div>
            </Card>
        </Scoped>
    )

}

const Scoped = styled.div`
    margin-bottom: 20px;
`