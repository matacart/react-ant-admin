import { Divider, Cascader, Input, Select, Space,Button, Row, Col, Tooltip, Form, message } from 'antd'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, QuestionCircleOutlined, ClockCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { useState } from 'react';
import { accountAuthentication } from '@/services/y2/api';
import DefaultSelect from '@/components/Select/DefaultSelect';
import DefaultInput from '@/components/Input/DefaultInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useSleep } from '@/hooks/customHooks';
import globalStore from '@/store/globalStore';
import cookies from 'react-cookies';
import MerchantCertification from './MerchantCertification';


const { TextArea } = Input;

export default function MerchantApplication() {

    const sleep = useSleep();

    const authentication = cookies.load('authentication');

    const [form] = Form.useForm();

    const [isEmployee,setIsEmployee] = useState(false);

    const [loading,setLoading] = useState(false);

    const onFormFinish = (values: any) => {
        form.validateFields().then(async ()=>{
            setLoading(true);
            accountAuthentication({
                name: values.user.name,
                phone: values.user.phone,
                qq:values.user.qq,
                email: values.user.email,
                apply_type:values.user.userType,
                mid:values.user.userType == "2"?values.user.merchantId:"",
                apply_remark:values.user.remark,
            }).then(async res=>{
                switch (res.code) {
                    case 201:
                        message.error('该账号已认证，请勿重复认证！');
                        break;
                    case 0:
                        await sleep(2000);
                        message.success('账号认证成功！');
                        // 保存带有过期时间的 cookie
                        cookies.save('authentication', 'true', { 
                            path: '/', 
                            expires: new Date(Date.now() + 3 * 60 * 1000) // 3分钟后过期
                        });
                        globalStore.setHeadRefresh(!globalStore.headRefresh);
                        history.back();
                        break;
                }
            }).catch(err=>{
                message.error("请求异常")
            }).finally(()=>{
                setLoading(false);
            })
        })
    };

    return (
        <Scoped>
            {/* 账号认证 */}
            {authentication == "true" ? <MerchantCertification />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <h3>账号认证</h3>
                    </div>
                    <div className='create-content'>
                        <Form form={form} layout="vertical" onFinish={onFormFinish}>
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
                                    <Form.Item name={['user', 'userType']} label="身份" rules={[
                                        { required: true, message: '请选择账号类型' }
                                    ]}>
                                        <DefaultSelect placeholder="账号类型" onChange={()=>{
                                            form.getFieldValue(['user', 'userType']) == "2"?setIsEmployee(true):setIsEmployee(false)
                                        }} options={[
                                            { value: '1', label: '商户号' },
                                            { value: '2', label: '员工号' },
                                        ]} />
                                    </Form.Item>
                                </Col>
                                { isEmployee && <Col span={12}>
                                    <Form.Item name={['user', 'merchantId']} label="商户ID" rules={[
                                        { required: true, message: '请输入商户ID' }
                                    ]}>
                                        <DefaultInput placeholder="商户ID" />
                                    </Form.Item>
                                </Col>}
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="姓名：" rules={[{  }]}>
                                        <DefaultInput placeholder="姓名" />
                                    </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name={['user', 'phone']} label="电话：" rules={[{  }]}>
                                        <DefaultInput placeholder="电话" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'qq']} label="Q Q：" rules={[{  }]}>
                                        <DefaultInput placeholder="Q Q" />
                                    </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                    <Form.Item name={['user', 'email']} label="电子邮箱：" rules={[{  }]}>
                                        <DefaultInput placeholder="电子邮箱" />
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
                                        <TextArea rows={4} placeholder="申请备注" showCount maxLength={200} style={{ height: 120, resize: 'none' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='create-footer' style={{ display:"flex",flexDirection:"row-reverse" }}>
                        <PrimaryButton text="提交" loading={loading} onClick={()=>{
                            form.submit();
                        }} className='font-16' style={{
                            marginTop: "20px",
                            padding:"0 16px",
                            height: "36px",
                        }} />
                    </div>
                </div>
            </div>}
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