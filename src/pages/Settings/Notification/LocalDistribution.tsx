import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LocalDistribution() {

    const orderList = [
        {title:"正在配送", content:"在客户的本地订单正在配送时发送给客户"},
        {title:"已送达", content:"在客户的本地订单已送达时发送给客户"},
        {title:"配送未成功", content:"在配送未成功时发送给客户"},
    ]

    return (
        <Scoped>
            <Card title="本地配送" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
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

export default LocalDistribution

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
