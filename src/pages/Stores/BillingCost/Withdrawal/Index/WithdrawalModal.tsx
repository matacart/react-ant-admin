import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { getMerchantWithdrawAdd, getMerchentBalance } from "@/services/y2/api";
import { Col, Flex, Form, App, Modal, Row, Spin, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import styled from "styled-components";

interface MerchentBalance {
  score4?: number | string; // 根据实际API返回类型调整
  currency_code?: string;
}

function WithdrawalModal(){
    
    const { message } = App.useApp();

    const [opne,setOpen] = useState(false);

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [formLoading,setFormLoading] = useState(false);

    const [merchentBalance,setMerchentBalance] = useState<MerchentBalance>({});

    // 自定义验证器 - 检查是否为正整数
    const validatePositiveInteger = (_:any, value:any) => {
        if (value === null || value === undefined || value === '') {
            return Promise.reject(new Error('请输入提现金额'));
        }
        
        if (!Number.isInteger(value) || value <= 0) {
            return Promise.reject(new Error('提现金额必须为正整数'));
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

    // 币种
    const currencyOptions = [
        { value: 'USD', label: <div>USD</div> },
        { value: 'CNY', label: <div>CNY</div> },
    ];

    // 取消
    const handleCancel = ()=>{
        form.resetFields();
        setOpen(false)
    }

    const handleOk = ()=>{
        form.validateFields().then(values=>{
            setLoading(true);
            getMerchantWithdrawAdd({
                method:values.method,
                currency_code:values.currency,
                amount:values.amount,
                account_info:values.account,
                status:"0",
            }).then(res=>{
                if(res.code == 0){
                    message.success("成功");
                    form.resetFields();
                    setOpen(false)
                }else{
                    message.error(res.msg);
                }
            }).catch(err=>{
                message.error("失败");
            }).finally(()=>{
                setLoading(false)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <>
            <PrimaryButton text="发起提款" onClick={()=>{
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
                title="提款"
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
                        <div style={{marginTop:"12px",marginBottom:"12px"}}>当前余额：{merchentBalance?.score4} {merchentBalance?.currency_code}</div>
                        <Form.Item
                            name="account"
                            label={<div>账号信息</div>}
                            required={false}
                            rules={[
                               {
                                    required: true,
                                    message: '请输入账号信息',
                                }
                            ]}
                        >
                            <DefaultInput placeholder="请输入账号信息" style={{height:"36px",width:"100%"}} />
                        </Form.Item>
                        
                        <Row gutter={[20,20]}>
                            <Col span={12}>
                                <Form.Item
                                    name="method"
                                    initialValue={"alipay"}
                                    label={<div>提现方式</div>}
                                    required={false}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择提现方式',
                                        }
                                    ]}
                                >
                                    <DefaultSelect placeholder="请选择提现方式" options={options} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="currency"
                                    label={<div>币种</div>}
                                    initialValue={"CNY"}
                                    required={false}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择币种',
                                        }
                                    ]}
                                >
                                    <DefaultSelect placeholder="请选择币种" options={currencyOptions} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="amount"
                            initialValue={0}
                            label={<div>提现金额</div>}
                            rules={[
                                { validator: validatePositiveInteger }
                            ]}
                        >
                            <NumberInput placeholder="请输入提现金额" style={{height:"36px",width:"100%"}} />
                        </Form.Item>
                        <Form.Item
                            name="remark"
                            label={<div>备注</div>}
                        >
                            <TextArea
                                showCount
                                maxLength={100}
                                placeholder="备注"
                                style={{ height: 60, resize: 'none' }}
                            />
                        </Form.Item>
                    </MyForm>
                </Spin>
            </Modal>
        </>
    )

}

export default WithdrawalModal;

const MyForm = styled(Form)`
    margin-bottom: 24px;
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;
`