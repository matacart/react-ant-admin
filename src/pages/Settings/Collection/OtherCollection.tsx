import DefaultTag from "@/components/Tag/DefaultTag";
import { Button, Card, Divider, Flex, Modal, Typography } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useState } from "react";
import DefaultButton from "@/components/Button/DefaultButton";

const { Text, Link } = Typography;

export default function OtherCollection() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">其他收款方式</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="desc color-474F5E font-14">客户需要跳转至第三方页面完成支付流程，您可以同时启用多个服务商。 <Text underline className="color-7A8499 cursor-pointer" onClick={() => setIsModalOpen(true)}>查看示例</Text></div>
                <div className="payment-info">
                    <div>
                        <Flex>
                            <img style={{marginRight:"8px"}} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-payment/20241217173356968/imgs/paypal-logo.073fe.svg"></img>
                            <DefaultTag text="未启用" />
                        </Flex>
                        <p className="font-12 color-7A8499" style={{marginTop:"12px"}}>绑定常用PayPal账户，降低交易风险</p>
                    </div>
                    <Flex align="center" className="color-356DFF">启用</Flex>
                </div>
                <div className="btn-warp">
                    <DefaultButton onClick={()=>history.push("/settings/payments/other")} text="添加" />
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
                    <img src={"https://cdn.myshopline.cn/sl/admin/ec2-admin-payment/20250211112125682/imgs/otherPayment.e0a26.png"} alt="" />
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
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #eef1f6;
        border-radius: 6px;
        padding:20px 24px;
        /* margin-bottom: 16px; */
        /* background-color: rgb(243 244 246); */
    }
    .payment-info:hover{
        background-color: #f0f7ff;
        cursor: pointer;
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