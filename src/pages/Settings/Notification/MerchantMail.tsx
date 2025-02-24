import { Button, Card, Checkbox, Col, Flex, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MerchantMail() {

    const orderList = [
        {title:"新订单", content:"当客户下单时，向收件人发送新订单通知"},
        {title:"订单退款失败", content:"当订单退款失败时发送该邮件"},
    ]

    return (
        <Scoped>
            <Card title="模板" classNames={{body:"order-card"}} extra={
                <>
                    <Button className="color-474F5E" style={{marginRight:"10px"}}>员工邮箱设置</Button>
                    <Button className="color-474F5E">查看发送场景</Button>
                </>
            }>
                {orderList.map(item=>{
                    return(
                        <Row className="item">
                            <Col span={4}><Link to="">{item.title}</Link></Col>
                            <Col span={20}>
                                <span className="color-7A8499">
                                    {item.content}
                                    <br />
                                </span>
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default MerchantMail

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
