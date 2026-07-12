import DefaultButton from "@/components/Button/DefaultButton";
import DefaultInput from "@/components/Input/DefaultInput";
import settingsInfo from "@/store/settings/settle/settingsInfo";
import { Card, Checkbox, Col, Flex, Radio } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import DraggerCardPC from "./DraggerCardPC";
import DraggerCardMobile from "./DraggerCardMobile";
import MinTinyMce from "@/components/MCE/MinTinyMce";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

const CheckoutSecurityTrust = () => {

    const setContent = (content:string)=>{
        settingsInfo.setAfterSaleGuarantee({
            ...settingsInfo.afterSaleGuarantee,
            afterSaleGuaranteeDesc:content
        })
    }
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Col span={24}>
                    <Checkbox checked={settingsInfo.paymentSecurity?.paymentSecurityEnable == '1'?true:false} onChange={(e)=>{
                        settingsInfo.setPaymentSecurity({
                            ...settingsInfo.paymentSecurity,
                            paymentSecurityEnable: e.target.checked?'1':'0'
                        })
                    }}>在结账时显示安全与信任信息</Checkbox>
                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>可定义在结账过程展示店铺的支付安全信息，提高客户下单的信任感。</div>
                    {settingsInfo.paymentSecurity?.paymentSecurityEnable == "1" && <Flex className="checked-addition" vertical gap={12}>
                        <div>
                            <div className="title">支付安全信息说明</div>
                            <DefaultInput value={settingsInfo.paymentSecurity?.paymentSecurityDesc} onChange={(e:any)=>{
                                settingsInfo.setPaymentSecurity({
                                    ...settingsInfo.paymentSecurity,
                                    paymentSecurityDesc: e.target.value,
                                });
                            }} placeholder="请根据你的前台语言填写，如“Checkout Securely with”..." />
                        </div>
                        <div>
                            <div className="title">支付安全图标</div>
                            <Radio.Group
                                style={style}
                                value={settingsInfo.paymentSecurity?.paymentSecurityImageType}
                                onChange={(e) => {
                                    settingsInfo.setPaymentSecurity({
                                        ...settingsInfo.paymentSecurity,
                                        paymentSecurityImageType: e.target.value,
                                    });
                                }}
                            >
                                <Radio value="0">不显示图标</Radio>
                                <Radio value="1" className="radio-expan">
                                    <div>显示支付渠道图标</div>
                                    {settingsInfo.paymentSecurity?.paymentSecurityImageType == '1' && <Flex justify="space-between" style={{marginTop:"12px"}} gap={12}>
                                        <Flex className="color-7A8499" align="center">当前未配置展示图标</Flex>
                                        <DefaultButton text="进入配置" />
                                    </Flex>}
                                </Radio>
                                <Radio value="2" className="radio-expan" style={{width:"100%"}}>
                                    <div>显示自定义图片</div>
                                    {settingsInfo.paymentSecurity?.paymentSecurityImageType == '2' && <Flex vertical style={{marginTop:"12px",width:"100%"}} gap={12}>
                                        <DraggerCardPC />
                                        <DraggerCardMobile />
                                    </Flex>}
                                </Radio>
                            </Radio.Group>

                        </div>
                    </Flex>}
                </Col>
                <Col span={24} style={{marginTop:"20px"}}>
                    <Checkbox checked={settingsInfo.afterSaleGuarantee?.afterSaleGuaranteeEnable == '1'?true:false} onChange={(e)=>{
                        console.log(e.target.checked)
                        settingsInfo.setAfterSaleGuarantee({
                            ...settingsInfo.afterSaleGuarantee,
                            afterSaleGuaranteeEnable: e.target.checked?'1':'0'
                        })
                    }}>在结账时显示售后保障信息说明</Checkbox>
                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>可定义在结账过程展示店铺的售后保障信息。</div>
                    {settingsInfo.afterSaleGuarantee?.afterSaleGuaranteeEnable == '1' && <Flex className="checked-addition" vertical gap={12}>
                        <MinTinyMce content={settingsInfo.afterSaleGuarantee?.afterSaleGuaranteeDesc??""} setContent={setContent} />
                    </Flex>}
                </Col>
            </Card>
        </Scoped>
    )
}
export default observer(CheckoutSecurityTrust)

const Scoped = styled.div`
    margin-bottom: 20px;
    .card{
        .checked-addition{
            margin-top: 12px;
            margin-left: 24px;
            .title{
                margin-bottom: 8px;
                font-size: 14px;
            }
            .radio-expan{
                .ant-radio-label{
                    width: 100%;
                }
                .ant-radio{
                    display: relative;
                    top: 3px;
                    align-self: flex-start;
                }
            }
        }
        
    }
   
`
