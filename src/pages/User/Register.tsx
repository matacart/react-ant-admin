import { Button, Form, Input, Divider, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, Link, history, useModel } from '@umijs/max';
import type { FormProps } from 'antd';
import './Register.scss'
import React, { useState } from 'react';
import { request } from '@umijs/max';
import { flushSync } from 'react-dom';
import { register } from '@/services/y2/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {state} from '../../../config/myConfig'
type FieldType = {
    username?: string;
    password?: string;
    agreement?: string;
};
interface Props {
    changeForm: (value: number) => void
}




export default function Register(props: Props) {

    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');
    const [captchaIsLoding, setCaptchaIsLoading] = useState(false);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const intl = useIntl();

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };

    return (
        <>
            {/* 表头 */}
            <h3>
                <FormattedMessage id="register.title" defaultMessage="开始您的免费试用" />
            </h3>
            {/* 输入项 */}
            <div className="register-form-content">
                {/* 注册组件 */}
                <Form
                    name="normal_register"
                    className="register-form"
                    layout="horizontal"
                    onFinish={
                        async (values: API.LoginParams) => {
                            try {
                                const msg = await register({ ...values });
                                if (msg.code === 0) {
                                    const defaultLoginSuccessMessage = intl.formatMessage({
                                        id: 'pages.register.success',
                                        defaultMessage: '注册成功！',
                                    });
                                    message.success(defaultLoginSuccessMessage);
                                    history.push('/user/signIn');
                                    return;
                                }
                                message.error(intl.formatMessage({id: 'pages.captcha.wrong', defaultMessage: '验证码错误'}));
                            } catch (error) {
                                const defaultLoginFailureMessage = intl.formatMessage({
                                    id: 'pages.register.failure',
                                    defaultMessage: '注册失败，请重试！',
                                });
                                console.log(error);
                                message.error(defaultLoginFailureMessage);
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
                                message: intl.formatMessage({ id: 'pages.login.phone.required', defaultMessage: '手机号是必填项' }),
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: (
                                    <FormattedMessage
                                        id="pages.login.phoneNumber.invalid"
                                        defaultMessage="手机号格式错误！"
                                    />
                                ),
                            },
                        ]}
                    >
                        <Input
                            style={{
                                height: '52px',
                            }}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={intl.formatMessage({ id: 'pages.login.username.label' })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'pages.captcha.required', defaultMessage: '请输入验证码' }),
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
                                placeholder={intl.formatMessage({ id: 'pages.captcha', defaultMessage: '验证码' })}
                            />
                            <Button
                                loading={captchaIsLoding}
                                style={{
                                    height: '51px',
                                    flex: 1
                                }}
                                onClick={async () => {
                                    setCaptchaIsLoading(true);
                                    const result = await getFakeCaptcha({
                                        phone,
                                    });
                                    if (!result) {
                                        message.error(intl.formatMessage({
                                            id: 'pages.getcaptcha.failure'
                                        })); return;
                                    } else {
                                        let msg= intl.formatMessage({
                                            id: 'pages.getcaptcha.success'
                                        })+result
                                        message.success(msg);
                                    }
                                    setCaptchaIsLoading(false);
                                }}
                            >
                                <FormattedMessage id={'pages.getCaptcha'} />
                            </Button>
                        </div>

                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'pages.login.password.required' }),
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
                            placeholder={intl.formatMessage({ id: 'pages.login.password.label' })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password2"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'pages.login.password.required' }),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(<FormattedMessage id="pages.register.password.not.match" defaultMessage='输入的密码不匹配' />);
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
                            placeholder={intl.formatMessage({ id: 'pages.register.password.again' })}
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
                                        : Promise.reject(new Error(intl.formatMessage({ id: 'pages.shouldGreetment' }))),
                            },
                        ]}
                    >
                        <Checkbox style={{
                            color: '#7a8499',
                            fontSize: '12px'
                        }}><FormattedMessage id={'pages.registerAgreed'} defaultMessage='注册表示您已同意' />{state.title}&nbsp;
                            <a style={{
                                fontSize: '12px',
                                fontWeight: '400'
                            }} href='https://www.matacart.com/xieyi.html'><FormattedMessage id="pages.userAgreement" defaultMessage="用户协议" />,</a>
                            <a style={{
                                fontSize: '12px',
                                fontWeight: '400'
                            }} href='https://www.matacart.com/privacy.html'><FormattedMessage id='pages.privacyPolicy' defaultMessage='隐私政策' /></a>
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
                        <FormattedMessage id="menu.register" defaultMessage="注册" />
                    </Button>
                </Form>
            </div>
            {/* 分割线 */}
            <Divider
                style={{
                    marginTop: '80px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#666',
                    fontWeight: '500',
                }}
                orientationMargin="3em"
            >
                <FormattedMessage id="pages.register.otherWays" defaultMessage='通过其他方式注册' />
            </Divider>
            {/* 其他登录方式 */}
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
                        src="/icons/google.svg"
                        style={{
                            objectFit: 'contain',
                            height: '62%',
                        }}
                    />
                    {intl.formatMessage({ id: 'pages.register.link.google' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src="/icons/facebook.svg" />
                    {intl.formatMessage({ id: 'pages.register.link.facebook' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src="/icons/apple.svg" />
                    {intl.formatMessage({ id: 'pages.register.link.apple' })}
                </Button>
                <Button className="external-register-button" block>
                    <img src="/icons/linkie.svg" style={{ height: '100%', objectFit: 'contain' }} />
                    {intl.formatMessage({ id: 'pages.register.link.linkie' })}
                </Button>

                <div>
                    <FormattedMessage id={'pages.alreadyHavaAccount'} />，
                    <Link to="/user/signIn"><FormattedMessage id={'pages.goToLogin'} /></Link>
                </div>
            </div>
        </>
    )
}
