import { Button, Card, Checkbox, Col, Divider, Flex, Input, Modal, Radio, Typography } from "antd"
import { useState } from "react";
import styled from "styled-components"


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop:"20px"
};

export default function ReceivablesEntrySettings() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [receivablesEntry,setReceivablesEntry] = useState(0);
    

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">收款入账设置</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="payment-info">
                   <div className="payment-info-li"></div>
                   <div>系统会自动收取客户的已付款项</div>
                </div>
                <Button className="submit-btn" onClick={()=>setIsModalOpen(true)}>管理</Button>
            </Card>
            {/* 示例 */}
            <ScopedModal title="管理入款获取方式" width={620} getContainer={false} centered open={isModalOpen} onCancel={()=>setIsModalOpen(false)} >
                <Radio.Group
                    style={style}
                    value={receivablesEntry}
                    onChange={(e)=>setReceivablesEntry(e.target.value)}
                    options={[
                        {
                        value: 0,
                        label: (
                            <div>
                                <div className="color-474F5E">自动入账订单的付款</div>
                                <div className="color-7A8499">系统会自动对客户的付款方式授权并收取费用。</div>
                            </div>
                        ),
                        },
                        {
                        value: 1,
                        label: (
                            <Flex vertical>
                                <div className="color-474F5E">手动入账订单的付款</div>
                                <div className="color-7A8499">系统会在客户下单时对客户的付款方式授权，您需要在授权期内手动入账付款。</div>
                            </Flex>
                        ),
                        }
                    ]}
                />
                {receivablesEntry == 1 && <div className="checkbox-box">
                    <Checkbox.Group style={{width:"100%"}}>
                        <Col className="checkbox-item" span={24}>
                            <Checkbox value={7}>在授权即将到期时发送告警电子邮件。</Checkbox>
                        </Col>
                        <Col className="checkbox-item" span={24}>
                            <Checkbox value={8}>延期入账付款</Checkbox>
                            <Flex className="checkbox-item-content" justify="space-between" align="center">
                                <div className="color-474F5E font-w-600">AdyenOther</div>
                                <Flex align="center">
                                    <div className="color-B8BECC" style={{marginRight:"8px"}}>最多12天</div>
                                    <Input style={{width:"80px",height:"36px",color:"#7A8499"}} suffix="天" />
                                </Flex>
                            </Flex>
                        </Col>
                    </Checkbox.Group>
                </div>}
            </ScopedModal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .desc{
        margin-top: 4px;
    }
    .submit-btn{
        margin-top: 16px;
    }
    .payment-info{
        display: flex;
        align-items: center;
        .payment-info-li{
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #35c08e;
            margin-right: 6px;
        }
    }
`

const ScopedModal = styled(Modal)`
    
    .ant-radio{
        position: relative;
        top: -10px;
    }

    .checkbox-box{
        margin-top: 12px;
        padding: 0 20px;
        .checkbox-item{
            border-top: 1px solid #eef1f6;
            padding: 12px 0;
            .checkbox-item-content{
                padding: 8px 20px;
                padding-right: 0;
            }
        }
    }
`