import { Button, Form, Input, Divider, message, Space,Checkbox,FormProps, Select } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, Link ,history,useModel} from '@umijs/max';
import React,{ useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { request } from '@umijs/max';
import { getCountryList, getFakeCaptcha, resetPassword } from '@/services/y2/api';
import styled from 'styled-components';



export default function LoginForm() {

    const intl = useIntl();
    const [phone, setPhone] = useState('');
    const [captchaIsLoding, setCaptchaIsLoading] = useState(false);
    const [formIsLoading, setFormIsLoading] = useState(false);

    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');


    // 区号表
    const [countryList,setCountryList] = useState([]);
    // 国际号码区号
    const [InternationalAreaCode,setInternationalAreaCode] = useState("86");

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

    const selectBefore = (
        <Select 
            options = {countryList}
            defaultValue={InternationalAreaCode} onChange={(e)=>{
                // console.log(e);
                setInternationalAreaCode(e)
            }}>
        </Select>
    );

    useEffect(() => {
        getCountryList().then((res)=>{
            let newList = res.data.map(item=>{
                if(item.codes !== null){
                    return {
                        value: item.codes,
                        label: "+"+item.codes
                    }
                }
            }).filter(item=>item !== undefined)
            // 过滤相同的数据
            newList = Array.from(
                new Set(newList.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));
            setCountryList(newList);
        })
    }, []);

    return (
        <Scoped>
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
                            const msg = await resetPassword({ ...values,InternationalAreaCode });
                            console.log(msg);
                            if (msg.status) {
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
                            addonBefore={selectBefore}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
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
                                const result = await getFakeCaptcha(phone,"86","forget");
                                if (!result) {
                                    message.error('验证码获取失败！');return;
                                }else{
                                    if(result.status){
                                        message.success('获取验证码成功！');
                                    }else{
                                        message.error('手机号未注册过！');
                                    }
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
        </Scoped>
    )
}

const Scoped = styled.div`

    .login-form-content {
        position: relative;
        width: 100%;
        margin-bottom: 16px;
    }


    .login-form-input {
        height: 52px;
        padding: 0 16px;
    }

    /* .login-form-forgot {
        float: right;
    }
    .ant-col-rtl .login-form-forgot {
        float: left;
    } */
    .login-form-button {
        width: 100%;
        font-weight: 600;
    }

    .link-button-container {
        width: 100%;  
        display: flex;  
        justify-content: space-between; /* 这将使得子元素在主轴上均匀分布，并靠两边 */  
        padding: 0 2px;
    }

    .external-login-button {
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

    .external-login-button img {
        object-fit: cover;
        width: 10%;
        height: 100%;
    }

    :where(.css-dev-only-do-not-override-apn68).ant-input-group .ant-input{
        height: 52px;
    }
    :where(.css-apn68).ant-input-group .ant-input{
        height: 52px;
    }
`