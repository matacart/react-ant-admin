import DefaultButton from "@/components/Button/DefaultButton";
import { history } from "@umijs/max";
import { Button, Card, Flex, Modal, Typography } from "antd"
import { useState } from "react";
import styled from "styled-components"

const { Text, Link } = Typography;

export default function CreditCardCollection() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">信用卡/借记卡收款</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="desc color-474F5E font-14">客户在结账页便可完成支付流程。 <Text underline className="color-7A8499 cursor-pointer" onClick={() => setIsModalOpen(true)}>查看示例</Text></div>
                <div className="btn-warp">
                    <DefaultButton onClick={()=>history.push("/settings/payments/thirdCreditCard")} text="选择服务商" />
                </div>
            </Card>
            {/* 示例 */}
            <ScopedModal title="示例" width={620} getContainer={false} centered open={isModalOpen} onCancel={()=>setIsModalOpen(false)} 
                footer={[
                    <Button key="submit" type="primary" loading={false} onClick={()=>setIsModalOpen(false)}>
                        我知道了
                    </Button>
                ]}>
                <div className="img-box">
                    <img src={"https://cdn.myshopline.cn/sl/admin/ec2-admin-payment/20250211112125682/imgs/thirdPart.7ad4c.png"} alt="" />
                </div>
            </ScopedModal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .desc{
        margin-top: 4px;
    }
    .btn-warp{
        margin-top: 16px;
    }
    .payment-info{
        padding:12px;
        margin-bottom: 16px;
        background-color: rgb(243 244 246);
        div{
            flex:1;
        }
    }
`

const ScopedModal = styled(Modal)`
    .ant-modal-content{
        padding: 20px 0;
    }
    .ant-modal-title{
        padding: 0 24px;
    }
    .ant-modal-footer{
        padding: 0 24px;
    }
    .img-box{
        margin: 0;
        padding: 24px;
        background: #f0f3f9;
        overflow: auto;
    }
`