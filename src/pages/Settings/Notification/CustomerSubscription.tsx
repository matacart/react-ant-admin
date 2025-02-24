import { Button, Card, Checkbox, Col, Flex, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function CustomerSubscription() {

    const orderList = [
        {title:"订阅成功", content:"在客户订阅店铺时推送",check:true},
        {title:"取消订阅", content:"在客户取消订阅时推送",check:true},
        {title:"客户营销确认", content:"当客户订阅电子邮件营销（如果已启用电子邮件双重选择加入）时自动发送给客户进行订阅确认",settingTitle:"客户营销设置"},
    ]

    return (
        <Scoped>
            <Card title="客户订阅" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {orderList.map(item=>{
                    return(
                        <Row className="item">
                            <Col span={4}><Link to="">{item.title}</Link></Col>
                            <Col span={20}>
                                {item.check !== undefined && <Checkbox style={{marginRight:"10px"}} />}
                                <span className="color-7A8499">
                                    {item.content}
                                    <br />
                                    {item.settingTitle !== undefined && <Link to="">{item.settingTitle}</Link>}
                                </span>
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default CustomerSubscription

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
