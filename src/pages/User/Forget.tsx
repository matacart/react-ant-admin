import { Button, Form, Input, App, ConfigProvider, Dropdown, Flex } from 'antd';
import { LockOutlined, SearchOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, Link ,history,useModel} from '@umijs/max';
import React,{ useEffect, useRef, useState } from 'react';
import { getFakeCaptcha, resetPassword } from '@/services/y2/api';
import styled from 'styled-components';
import { UnfoldIcon } from '@/components/Icons/Icons';

const style = {
    color: '#7A8499',
    position: 'absolute',
    width:"100%",
    top:"10px",
    left:"10px",
    padding:"10px 0",
    maxHeight:"300px",
    overflow:"auto",
}

export default function LoginForm() {
    
    const { message } = App.useApp();

    const intl = useIntl();
    const [phone, setPhone] = useState('');
    const [captchaIsLoding, setCaptchaIsLoading] = useState(false);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const { initialState, setInitialState } = useModel('@@initialState');

    // 国际号码区号
    const [phoneCode,setPhoneCode] = useState("86");
    // 搜索
    const [searchKey, setSearchKey] = useState('');

    const Ref = useRef(null);

    const filteredItems  = JSON.parse(localStorage.getItem("MC_DATA_COUNTRY") || "[]").filter((item: any) => item.country_name.includes(searchKey));

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

    useEffect(() => {
    }, []);

    return (
        <Scoped>
            <h3>{intl.formatMessage({id: 'user.forget.title'})}</h3>
            <p className='login-tip'>{intl.formatMessage({id: 'user.forget.tip'})}</p>
            <div className="login-form-content">
                <div className='user-box' ref={Ref}></div>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout="horizontal"
                    // 重设密码
                    onFinish={async (values: API.LoginParams) => {                            
                        try {
                            const msg = await resetPassword({ ...values,phoneCode });
                            if (msg.status) {
                                message.success(intl.formatMessage({id: 'user.forget.success'}));
                                // await fetchUserInfo();
                                // const urlParams = new URL(window.location.href).searchParams;
                                // history.push(urlParams.get('redirect') || '/');
                                history.push('/user/signIn');
                            }else{
                                message.error(intl.formatMessage({id: 'user.forget.captchaWrong'}));
                            }
                        } catch (error) {
                            message.error(intl.formatMessage({id: 'user.forget.resetFailure'}));
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
                                message: intl.formatMessage({ id: 'user.forget.phoneRequired' })
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: (
                                    intl.formatMessage({ id: 'user.forget.phoneNumberInvalid' })
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
                            placeholder={intl.formatMessage({ id: 'user.forget.usernameLabel' })}
                            suffix={
                                <ConfigProvider
                                  theme={{
                                    components: {
                                      Dropdown: {
                                        /* 这里是你的组件 token */
                                        paddingXXS:0,
                                      },
                                    },
                                  }}
                                >
                                  <Dropdown data-form-ignore="true" getPopupContainer={()=>Ref.current!} onOpenChange={(open)=>{
                                    !open && setSearchKey("")
                                  }} menu={{style:style,items:[
                                    {
                                      key: 'search',
                                      label: (
                                        <div style={{ padding:0,width:"100%"}} onClick={(e) => e.stopPropagation()}>
                                          <Form.Item style={{margin:0}}>
                                            <Input
                                              name="undefined"
                                              value={searchKey}
                                              style={{height:"36px",fontSize:"14px",borderRadius:"4px"}}
                                              placeholder="搜索国家"
                                              onChange={(e) => setSearchKey(e.target.value)}
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
                                message: intl.formatMessage({ id: 'user.forget.captchaRequired' }),
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
                                placeholder={intl.formatMessage({ id: 'user.forget.captcha' })}
                            />
                            <Button 
                            loading={captchaIsLoding}
                            style={{
                                height: '51px',
                                flex: 1
                            }}
                            onClick={async () => {
                                setCaptchaIsLoading(true);
                                const result = await getFakeCaptcha(phone,phoneCode,"forget");
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
                            >
                                {intl.formatMessage({ id: 'user.forget.getCaptcha' })}
                            </Button>
                        </div>

                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'user.forget.passwordRequired' }),
                            },
                        ]}
                    >
                        <Input.Password
                            style={{
                                height: '52px',
                            }}
                            name='password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder={intl.formatMessage({ id: 'user.forget.passwordLabel' })}
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
                        {intl.formatMessage({ id: 'user.forget.reset' })}
                    </Button>

                </Form>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <Link to='/user/signIn'>
                    {intl.formatMessage({ id: 'user.forget.goToLogin' })}</Link>
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .login-tip{
        font-weight: 600;
        font-size: 16px;
        margin-top: -20px;
        margin-bottom: 32px;
    }

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
    .login-form-content {
        position: relative;
        width: 100%;
        margin-bottom: 16px;
    }

    .login-form-input {
        height: 52px;
        padding: 0 16px;
    }
    
    .login-form-button {
        width: 100%;
        font-weight: 600;
    }

    .link-button-container {
        width: 100%;  
        display: flex;  
        justify-content: space-between; 
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