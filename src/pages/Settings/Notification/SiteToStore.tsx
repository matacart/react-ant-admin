import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function SiteToStore() {

    const orderList = [
        {title:"准备取货", content:"通过POS或后台手动发送给客户，通知其订单可取货"},
        {title:"已取货", content:"当订单标记为已取货时发送给客户"},
    ]

    return (
        <Scoped>
            <Card title="到店取货" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
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

export default SiteToStore

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
