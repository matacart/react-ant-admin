import { Button, Form, Input, Divider, Checkbox, App, ConfigProvider, Dropdown, Flex } from 'antd';
import { LockOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import { getFakeCaptcha, register } from '@/services/y2/api';
import {state} from '../../../config/myConfig'
import styled from 'styled-components';
import { UnfoldIcon } from '@/components/Icons/Icons';
// 在文件顶部导入所有图标
import googleIcon from '@/../public/icons/logos/google.svg';
import facebookIcon from '@/../public/icons/logos/facebook.svg';
import appleIcon from '@/../public/icons/logos/apple.svg';
import linkieIcon from '@/../public/icons/logos/linkie.svg';
import { Link } from 'react-router-dom';

interface Props {
    changeForm: (value: number) => void
}

// 修改style常量定义部分
const style: React.CSSProperties = {
    color: '#7A8499',
    position: 'absolute',
    width: "100%",
    top: "10px",
    left: "10px",
    padding: "10px 0",
    maxHeight: "300px",
    overflow: "auto",
}


export default function Register(props: Props) {

    const { message } = App.useApp();

    const [countdown, setCountdown] = useState(0); // 倒计时状态

    const [captchaIsLoding, setCaptchaIsLoading] = useState(false);
    const [phone, setPhone] = useState('');

    const intl = useIntl();

    const [phoneCode,setPhoneCode] = useState("86");
    // 搜索
    const [searchKey, setSearchKey] = useState('');

    const Ref = useRef(null);

    const filteredItems  = JSON.parse(sessionStorage.getItem("country") || "[]").filter((item: any) => item.country_name.includes(searchKey));

    const items = filteredItems
        .map((item: any) => {
            return {
                key: item.country_id,
                label: <a onClick={() => {
                setSearchKey("")
                setPhoneCode(item.codes)
                }} style={{ color: phoneCode == item.codes ? "#356DFF" : "" }}>
                <span style={{ marginRight: "8px" }}>{item.country_name}</span>{"+" + item.codes}
                </a>,
            }
        })
        .concat(
            filteredItems.length === 0 ? [{
                key: 'no-data',
                disabled: true,
                label: (
                <div style={{ 
                    color: '#999',
                    textAlign: 'center',
                    padding: '8px 0'
                }}>
                    <FormattedMessage id="pages.search.noData" defaultMessage="无匹配数据" />
                </div>
                )
            }] : []
        );

    // 倒计时效果
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown]);

    return (
        <Scoped>
            <h3>{intl.formatMessage({id: 'user.register.title'})}</h3>
            <div className="register-form-content">
            <div className='user-box' ref={Ref}></div>
            <Form
                name="normal_register"
                className="register-form"
                layout="horizontal"
                onFinish={
                    async (values: API.LoginParams) => {
                        try {
                            const msg = await register({ ...values,phoneCode });
                            if (msg.status == 1) {
                                message.success(intl.formatMessage({id: 'user.register.success'}));
                                history.push('/user/signIn');
                                return;
                            }else if(msg.status == -1){
                                message.error(msg.msg);
                                return;
                            }
                        } catch (error) {
                            message.error(intl.formatMessage({id: 'user.register.failure'}));
                        }
                    }
                }
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({ id: 'user.register.phoneRequired' }),
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: (
                                intl.formatMessage({ id: 'user.register.phoneNumberInvalid' })
                            ),
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                        style={{
                            height: '52px',
                        }}
                        placeholder={intl.formatMessage({ id: 'user.register.usernameLabel' })}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                            <ConfigProvider
                                theme={{
                                components: {
                                    Dropdown: {
                                    /* 这里是你的组件 token */
                                        paddingXXS:0
                                    },
                                },
                                }}
                            >
                                <Dropdown overlayClassName="search-dropdown-overlay" getPopupContainer={()=>Ref.current!} onOpenChange={(open)=>{
                                    !open && setSearchKey("")
                                }} menu={{style:style,items:[
                                {
                                    key: 'search',
                                    label: (
                                    <div style={{ padding:0,width:"100%"}} onClick={(e) => e.stopPropagation()}>
                                        <Form.Item style={{margin:"0"}}>
                                            <Input
                                                name="undefined"
                                                value={searchKey}
                                                style={{height:"36px",fontSize:"14px",borderRadius:"4px"}}
                                                placeholder="搜索国家"
                                                onChange={(e) => setSearchKey(e.target.value)}
                                                // onClick={(e) => e.stopPropagation()}
                                                suffix={<SearchOutlined />}
                                            />
                                        </Form.Item>
                                    </div>
                                    ),
                                },
                                ...items,
                                ]}} placement="bottomRight" trigger={["click"]}>
                                <Flex gap={6} className='color-7A8499 cursor-pointer'>
                                    +{phoneCode}
                                    <UnfoldIcon />
                                </Flex>
                                </Dropdown>
                            </ConfigProvider>
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({ id: 'user.register.captchaRequired' }),
                        },
                    ]}

                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                        }}
                    >
                        <Input
                            style={{
                                width: '50%',
                                height: '51px',
                                flex: 2,
                                marginRight: '10px',
                            }}
                            
                            type="text"
                            placeholder={intl.formatMessage({ id: 'user.register.captcha' })}
                        />
                        <Button
                            loading={captchaIsLoding}
                            disabled={countdown > 0} // 倒计时期间禁用按钮
                            style={{
                                height: '51px',
                                flex: 1
                            }}
                            onClick={async () => {
                                // InternationalAreaCode
                                setCaptchaIsLoading(true);
                                const result = await getFakeCaptcha(phone,phoneCode,"reg");
                                if (!result) {
                                    message.error(intl.formatMessage({id: 'user.register.captchaFailure'}));
                                    return;
                                } else {
                                    if(result.status){
                                        // 获取验证码成功
                                        setCountdown(60); // 启动60秒倒计时
                                        message.success(intl.formatMessage({
                                            id: 'user.register.getcaptchaSuccess'
                                        }));
                                    }else if(result.status == 0){
                                        message.error("手机号已被注册")
                                    }
                                }
                                setCaptchaIsLoading(false);
                            }}
                        >
                            {countdown > 0 ? `${countdown}s` : <FormattedMessage id={'user.register.getCaptcha'} />}
                        </Button>
                    </div>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({ id: 'user.register.passwordRequired' }),
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            height: '52px',
                        }}
                        visibilityToggle={true}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage({ id: 'user.register.passwordLabel' })}
                    />
                </Form.Item>
                <Form.Item
                    name="password2"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({ id: 'user.register.passwordRequired' }),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(<FormattedMessage id="user.register.passwordNotMatch" defaultMessage='输入的密码不匹配' />);
                            },
                        })
                    ]}
                >
                    <Input.Password
                        style={{
                            height: '52px',
                        }}
                        visibilityToggle={true}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage({ id: 'user.register.confirmPasswordLabel' })}
                    />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error(intl.formatMessage({ id: 'user.register.shouldGreetment' }))),
                        },
                    ]}
                >
                    <Checkbox style={{
                        color: '#7a8499',
                        fontSize: '12px'
                    }}>{intl.formatMessage({ id: 'user.register.registerAgreed' })}{state.title}&nbsp;
                        <a style={{
                            fontSize: '12px',
                            fontWeight: '400'
                        }} href='https://www.matacart.com/xieyi.html'>{intl.formatMessage({ id: 'user.register.userAgreement' })},</a>
                        <a style={{
                            fontSize: '12px',
                            fontWeight: '400'
                        }} href='https://www.matacart.com/privacy.html'>{intl.formatMessage({ id: 'user.register.privacyPolicy' })}</a>
                    </Checkbox>
                </Form.Item>
                <Button
                    style={{
                        height: '46px',
                    }}
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                >
                    {intl.formatMessage({ id: 'user.register.register' })}
                </Button>
            </Form>
            </div>
            <Divider
                style={{
                    marginTop: '40px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#666',
                    fontWeight: '500',
                }}
                orientationMargin="3em"
            >
                {intl.formatMessage({ id: 'user.register.otherWays' })}
            </Divider>
            <div
                className="external-register-button-container"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '60px',
                }}
            >
                <Button className="external-register-button" block>
                    <img
                        src={googleIcon}
                        style={{
                            objectFit: 'contain',
                            height: '62%',
                        }}
                    />
                    {intl.formatMessage({ id: 'user.register.linkGoogle' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src={facebookIcon} />
                    {intl.formatMessage({ id: 'user.register.linkFacebook' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src={appleIcon} />
                    {intl.formatMessage({ id: 'user.register.linkApple' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src={linkieIcon} style={{ height: '100%', objectFit: 'contain' }} />
                    {intl.formatMessage({ id: 'user.register.linkLinkie' })}
                </Button>
                <div>
                    {intl.formatMessage({ id: 'user.register.alreadyHavaAccount' })},
                    <Link to="/user/signIn">
                    {intl.formatMessage({ id: 'user.register.goToLogin' })}</Link>
                </div>
            </div>
        </Scoped>
    )

    
}

const Scoped = styled.div`

    .user-box{
        position: relative;
        .ant-dropdown{
            width: 100%;
        }
        .ant-dropdown-menu-item:first-child{
            padding: 0 12px 8px 12px;
            &:hover{
            background-color: #FFF;
            }
        }
    }

    .register-form-wrap h3 {
        margin-bottom: 32px;
        color: #262626;
        font-weight: 600;
        font-size: 30px;
        line-height: 42px;
    }

    .register-form-content {
        position: relative;
        width: 100%;
        margin-bottom: 16px;
    }


    .register-form-input {
        height: 52px;
        padding: 0 16px;
    }

    /* .register-form-forgot {
        float: right;
    }
    .ant-col-rtl .register-form-forgot {
        float: left;
    } */
    .register-form-button {
        width: 100%;
        font-weight: 600;
    }

    .link-button-container {
        width: 100%;  
        display: flex;  
        justify-content: space-between; /* 这将使得子元素在主轴上均匀分布，并靠两边 */  
        padding: 0 2px;
    }  
    
    a {  
        display: inline-block;  
        color: #356dff;  
        font-weight: 600;  
        text-decoration: none;
    }

    .external-register-button img {
        object-fit: cover;
        width: 10%;
        height: 100%;
    }

    .external-register-button {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
        gap: 8px;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 12px 0;
        color: #474F5E;
        font-weight: 600;
        font-size: 16px;
        border: 1px solid #B8BECC;
        border-radius: 4px;
        height: 46px;
    }

    :where(.css-dev-only-do-not-override-apn68).ant-input-group .ant-input{
        height: 52px;
    }
    :where(.css-apn68).ant-input-group .ant-input{
        height: 52px;
    }
`
