import { Button, Form, Input, Divider, message, Space,Checkbox,FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, Link ,history,useModel} from '@umijs/max';
import './Login.scss';
import React,{ useState } from 'react';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { flushSync } from 'react-dom';
import { request } from '@umijs/max';
import { reset } from '@/services/y2/api';
import locale from 'antd/es/date-picker/locale/en_US';



export default function LoginForm() {

    const intl = useIntl();
    const [phone, setPhone] = useState('');
    const [captchaIsLoding, setCaptchaIsLoading] = useState(false);
    const [formIsLoading, setFormIsLoading] = useState(false);

    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');

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
            <h3>
                <FormattedMessage id="forget.title" defaultMessage="忘记密码" />
            </h3>
            <div className="login-form-content">
                <Form
                    name="normal_login"
                    className="login-form"
                    layout="horizontal"
                    // 重设密码
                    onFinish={async (values: API.LoginParams) => {                            
                                try {
                                    const msg = await reset({ ...values });
                                  if (msg.code === 0) {
                                    // localStorage.setItem('token', token);
                                    const defaultLoginSuccessMessage = intl.formatMessage({
                                      id: 'pages.reset.success',
                                      defaultMessage: '重设密码成功！',
                                    });
                                    message.success(defaultLoginSuccessMessage);
                                    // await fetchUserInfo();
                                    // const urlParams = new URL(window.location.href).searchParams;
                                    // history.push(urlParams.get('redirect') || '/');
                                    history.push('/user/signIn');
                                  }else{
                                    message.error(intl.formatMessage({id: 'pages.captcha.wrong', defaultMessage: '验证码错误'}));
                                  }
                                } catch (error) {
                                  const defaultLoginFailureMessage = intl.formatMessage({
                                    id: 'pages.reset.failure',
                                    defaultMessage: '重设密码失败，请重试！',
                                  });
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
                                message: intl.formatMessage({ id: 'pages.login.phone.required', defaultMessage:'手机号是必填项' }),
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
                                    message.error('验证码获取失败！');return;
                                }else{
                                    message.success('获取验证码成功！验证码为：123456');
                                }
                                setCaptchaIsLoading(false);
                              }}


                            ><FormattedMessage id={'pages.getCaptcha'} defaultMessage={'获取验证码'}/></Button>
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
                            name='password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder={intl.formatMessage({ id: 'pages.login.password.label' })}
                        />
                    </Form.Item>
                    <Button
                        style={{
                            height: '46px',
                        }}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={formIsLoading}
                    >
                        <FormattedMessage id="menu.captcha" defaultMessage="验证" />
                    </Button>

                </Form>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <Link to='/user/signIn'><FormattedMessage id='pages.goToLogin'/></Link>

                </div>
            </div>
        </>
    )
}