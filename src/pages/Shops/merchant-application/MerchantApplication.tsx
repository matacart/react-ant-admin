import { Divider, Cascader, Input, Select, Space,Button, Row, Col, Tooltip, Form, message } from 'antd'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, QuestionCircleOutlined, ClockCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { history } from '@umijs/max';
import { useState } from 'react';
import { accountAuthentication } from '@/services/y2/api';
import { useForm } from 'antd/es/form/Form';


const { TextArea } = Input;

export default function MerchantApplication() {
    const [form] = Form.useForm();

    const [isEmployee,setIsEmployee] = useState(false)

    const [loading,setLoading] = useState(false)

    const onFormFinish = (values: any) => {
        // history.push('/')
        console.log(values)
        accountAuthentication(values.user).then(res=>{
            console.log(res)
            // 
            if(res.code == 201){
                message.error('该账号已认证，请勿重复认证！');
            }else if(res.code == 0){
                message.success('账号认证成功！');
                history.back();
            }
        })
    };

    return (
        <Scoped>
            {/* 商户申请 */}
            <div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <h3>账号认证</h3>
                        <></>
                    </div>
                    <div className='create-content'>
                        <Form form={form} layout="vertical" onFinish={onFormFinish} onFinishFailed={()=>{console.log(1111)}}>
                            <div className='font-16 font-w-600'>
                                认证信息
                                <Tooltip title="用户申请提交之后，三分钟内审核开通！">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </div>
                            <Divider />
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'userType']} label="身份" rules={[{  }]}>
                                        <Select placeholder="账号类型" onChange={()=>{
                                            form.getFieldValue(['user', 'userType']) == "2"?setIsEmployee(true):setIsEmployee(false)
                                        }} options={[
                                            { value: '1', label: '商户号' },
                                            { value: '2', label: '员工号' },
                                        ]} />
                                    </Form.Item>
                                </Col>
                                { isEmployee && <Col span={12}>
                                    <Form.Item name={['user', 'merchantId']} label="商户ID" rules={[{  }]}>
                                        <Input placeholder="商户ID" />
                                    </Form.Item>
                                </Col>}
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="姓名：" rules={[{  }]}>
                                        <Input placeholder="姓名" />
                                    </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name={['user', 'phone']} label="电话：" rules={[{  }]}>
                                        <Input placeholder="电话" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'qq']} label="Q Q：" rules={[{  }]}>
                                        <Input placeholder="Q Q" />
                                    </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name={['user', 'email']} label="电子邮箱：" rules={[{  }]}>
                                        <Input placeholder="电子邮箱" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            {/* <div className='font-16 font-w-600'>
                                开通套餐
                                <Tooltip title="正式版到期自动扣费，请保持账户余额可用！">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </div>
                            <Divider /> */}
                            {/* <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="套餐类型：" rules={[{  }]}>
                                        <Input placeholder="申请备注" />
                                    </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="开通个数：" rules={[{  }]}>
                                        <Input placeholder="开通个数" />
                                    </Form.Item>
                                </Col>
                            </Row> */}
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item name={['user', 'remark']} label="申请备注：" rules={[{  }]}>
                                        <TextArea rows={4} placeholder="申请备注" showCount maxLength={200} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='create-footer' style={{ display:"flex",flexDirection:"row-reverse" }}>
                        <Button type="primary" loading={loading} onClick={()=>{
                            form.submit();
                            // setLoading(true)
                            // history.push('/stores/merchantCertification')
                        }} className='font-16' style={{
                            marginTop: "10px",
                            padding:"0 16px",
                            height: "36px",
                        }}>
                            提交
                        </Button>
                    </div>
                </div>
            </div>
            
        </Scoped>
        
    )
}

const Scoped = styled.div`
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        .desc{
            margin-top: 8px;
            color: #7a8499;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
        .litle-title{
            font-size: 16px;
            line-height: 22px;
            font-weight: 600;
        }
        .create-warp{
            max-width: 967px;
            min-width: 700px;
            width: 100%;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                h3 {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin: 0 24px 24px 0;
                    overflow: hidden;
                    color: #242833;
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }
            }
            .create-content{
                padding: 20px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                .create-item-warp{
                    .input{
                        width: 480px;
                        height: 36px;
                        margin-left: 20px;
                    }

                    display: flex;
                    margin-top: 10px;
                    .icon{
                        width: 40px;
                        height: 40px;
                    }
                    .create-item-text{
                        flex:1;
                        .litle-title{
                            color: black;
                        }
                    }

                }
            }
        }
    }
`