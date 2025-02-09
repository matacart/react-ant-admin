import { Button, Card, Checkbox, Col, Row } from "antd";
import { check } from "prettier";
import { Link } from "react-router-dom";
import styled from "styled-components";

function CustomerMail() {

    const orderList = [
        {title:"订单确认", content:"当COD订单创建和在线订单支付成功时，向客户发送此通知邮件",check:true},
        {title:"订单编辑", content:"当订单内容发生变更时，向客户发送此通知邮件，告知订单的变更内容"},
        {title:"发货更新", content:"当订单发货确认或发货信息更新时，向客户发送此通知邮件",check:true},
        {title:"配送更新", content:"当订单包裹配送信息更新时，向客户发送此通知邮件（如果您选择此项）",check:true},
        {title:"订单取消", content:"当订单被取消时，向客户发送此通知邮件",check:true},
        {title:"订单退款", content:"当订单产生退款时，向客户发送此通知邮件（如果您选择此项）",check:true},
        {title:"订单退货", content:"当发起退货时，向客户发送此通知邮件（如果您选择此项）",check:true},
        {title:"订单已退货", content:"当订单中退货已完成时，向客户发送此通知邮件"},
        {title:"弃单召回", content:"当客户在结算流程放弃结账，向客户发送召回邮件（适用于未归档弃单）",settingTitle:"高级设置"},
        {title:"账单通知", content:"当订单逾期未入账时，可手动向客户发送此通知邮件"},
        {title:"退款成功", content:"当订单退款成功时发送该邮件（如果您在发起退款时选择了发送退款邮件）"},
        {title:"账单逾期", content:"当订单未付款且账单到期或是逾期时发送给客户",settingTitle:"发送设置"}
    ]

    return (
        <Scoped>
            <Card title="订单" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {orderList.map(item=>{
                    console.log(item.check)
                    return(
                        <Row className="item">
                            <Col span={4}><Link to="">{item.title}</Link></Col>
                            <Col>
                                {item.check !== undefined && <Checkbox style={{marginRight:"10px"}} />}
                                <span className="color-7A8499">{item.content}</span>
                                {item.settingTitle !== undefined && <Link to="" style={{marginLeft:"20px"}}>{item.settingTitle}</Link>}
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default CustomerMail

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
