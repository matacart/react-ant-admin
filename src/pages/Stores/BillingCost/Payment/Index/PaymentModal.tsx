import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { getMerchantRechargeLink, getMerchentBalance } from "@/services/y2/api";
import { InfoCircleFilled } from "@ant-design/icons";
import { Checkbox, Flex, Form, Modal, Spin, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";

interface MerchentBalance {
  score4?: number | string; // 根据实际API返回类型调整
  currency_code?: string;
}

function PaymentModal(){

    const [opne,setOpen] = useState(false);

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [formLoading,setFormLoading] = useState(false);

    const [merchentBalance,setMerchentBalance] = useState<MerchentBalance>({});

    // 自定义验证器 - 检查是否为正整数
    const validatePositiveInteger = (_:any, value:any) => {
        if (value === null || value === undefined || value === '') {
            return Promise.reject(new Error('请输入充值金额'));
        }
        
        if (!Number.isInteger(value) || value <= 0) {
            return Promise.reject(new Error('充值金额必须为正整数'));
        }
        
        return Promise.resolve();
    };

    // 支付方式
    const options = [
        { value: 'alipay', label: <Flex gap={8} align="center">
            <img style={{height:"24px"}} src="/icons/payment/AlipayQR.svg" alt="支付宝" />
            <span>支付宝</span>
        </Flex> },
    ];

    // 取消
    const handleCancel = ()=>{
        form.resetFields();
        setOpen(false)
    }

    const handleOk = ()=>{
        form.validateFields().then(values=>{
            setLoading(true);
            getMerchantRechargeLink({
                amount: values.amount,
                method: values.method
            }).then(res=>{
                if(res.code == 0){
                    window.open(res.redirect_url);
                    form.resetFields();
                    setOpen(false)
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <>
            <PrimaryButton text="充值" onClick={()=>{
                setOpen(true);
                setFormLoading(true);
                getMerchentBalance().then(res=>{
                    res.code == 0 && setMerchentBalance(res.data)
                }).catch(err=>{
                    console.log(err)
                }).finally(()=>{
                    setFormLoading(false)
                })
            }} />
            <Modal
                title="充值"
                open={opne}
                width={620}
                centered
                onCancel={handleCancel}
                footer={() => (
                    <Flex gap={12} justify="end">
                        <DefaultButton loading={loading} text={"取消"} onClick={handleCancel} />
                        <PrimaryButton loading={loading} text={"确认"} onClick={handleOk} />
                    </Flex>
                )}
            >
                <Spin spinning={formLoading}>
                    <MyForm form={form} layout="vertical">
                        {/* 提示标签 */}
                        <Tag
                            className='tag'
                        >
                            <div className="text-box">
                                <InfoCircleFilled className="color-FE9E0F" />
                                <span style={{marginLeft:"8px"}}>不支持信用卡方式充值。若需人工充值，请联系平台客服(QQ:1806098280)。如您有未结清账单，充值后优先抵扣未结清账单。充值后请及时对支付订单进行结算，以免影响正常服务。在您消费后，将基于您的消费进行发票开具。充值的款项只可用于套餐或佣金扣款的消费，由于平台提供虚拟软件产品服务，不支持退款。</span>
                            </div>
                        </Tag>
                        <div style={{marginBottom:"24px"}}>当前余额：{merchentBalance?.score4} {merchentBalance?.currency_code}</div>
                        <Form.Item
                            name="amount"
                            initialValue={0}
                            label={<div>充值金额</div>}
                            rules={[
                                { validator: validatePositiveInteger }
                            ]}
                        >
                            <NumberInput placeholder="请输入充值金额" suffix={merchentBalance?.currency_code || "CNY"} style={{height:"36px",width:"100%"}} />
                        </Form.Item>
                        <Form.Item
                            name="method"
                            label={<div>充值方式</div>}
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择充值方式',
                                }
                            ]}
                        >
                            <DefaultSelect placeholder="请选择充值方式" options={options} />
                        </Form.Item>
                    </MyForm>
                </Spin>
            </Modal>
        </>
    )

}

export default PaymentModal;

const MyForm = styled(Form)`
    .tag{
        width: 100%;
        font-size: 14px;
        margin-top:12px;
        padding: 8px 16px;
        border-color: #FFE58F;
        background-color: #FFF0E0;
        margin-bottom: 20px;
        .text-box{
            display: inline-block;
            width: 99%;
            span{
                word-wrap: break-word;
                word-break: break-all;
                white-space: normal;
                line-height: 24px;
            }
        }
    }
`