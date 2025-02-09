import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LogisticsUpdate() {

    const orderList = [
        {title:"正在派送", content:"在订单的运单号状态为正在配送时发送"},
        {title:"已送达", content:"在订单的运单号状态为已送达时发送"},
    ]

    return (
        <Scoped>
            <Card title="物流更新" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {orderList.map(item=>{
                    return(
                        <Row className="item">
                            <Col span={4}><Link to="">{item.title}</Link></Col>
                            <Col>
                                <span className="color-7A8499">{item.content}</span>
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default LogisticsUpdate

const Scoped = styled.div`
    .order-card{
        padding-top: 0;
        padding-bottom: 0;
        .item{
            border-bottom: 1px solid #eef1f7;
            padding: 20px 0;
        }
        .item:last-child{
            border-bottom: none;
        }
    }
    
`
