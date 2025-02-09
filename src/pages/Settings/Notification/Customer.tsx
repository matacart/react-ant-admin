import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Customer() {

    const orderList = [
        {title:"客户邀请", content:"在客户详情中发送此邮件，以转化客户注册成为会员"},
        {title:"注册成功", content:"客户注册成功后会收到此邮件"},
    ]

    return (
        <Scoped>
            <Card title="客户" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
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

export default Customer

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
