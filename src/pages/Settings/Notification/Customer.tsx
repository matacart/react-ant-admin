import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Customer() {

    const orderList = [
        {title:"客户邀请", content:"在客户详情中发送此邮件，以转化客户注册成为会员"},
        {title:"注册成功", content:"客户注册成功后会收到此邮件",check:true},
        {title:"激活成功", content:"当COD订单创建和在线订单支付成功时，向客户发送此通知邮件",check:true},
        {title:"激活优惠", content:"当订单内容发生变更时，向客户发送此通知邮件，告知订单的变更内容"},
        {title:"重置密码", content:"当订单发货确认或发货信息更新时，向客户发送此通知邮件"},
        {title:"联系客户", content:"当订单包裹配送信息更新时，向客户发送此通知邮件（如果您选择此项）"},
        {title:"B2B访问电子邮件", content:"当订单被取消时，向客户发送此通知邮件"},
        {title:"礼品卡", content:"当订单产生退款时，向客户发送此通知邮件（如果您选择此项）"},
    ]

    return (
        <Scoped>
            <Card title="客户" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {orderList.map(item=>{
                    return(
                        <Row className="item">
                            <Col span={4}><Link to="">{item.title}</Link></Col>
                            <Col>
                                {item.check !== undefined && <Checkbox style={{marginRight:"10px"}} />}
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
