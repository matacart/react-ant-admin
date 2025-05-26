import { getAccessToken, login } from '@/services/y2/api';
import { Alert, message, Tabs, Button, Form, Input, Divider,Checkbox, Flex, MenuProps, Dropdown, ConfigProvider } from 'antd';
import { LockOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, Link, history, useIntl, useModel } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import cookie, { load } from 'react-cookies'
import { DownIcon, FoldIcon, UnfoldIcon } from '@/components/Icons/Icons';
import styled from 'styled-components';

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

export default  function Login() {
    //国际化
    const intl = useIntl();
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');

    const [phoneCode,setPhoneCode] = useState("86");
    // 搜索
    const [searchKey, setSearchKey] = useState('');

    const Ref = useRef(null);
    // const items = JSON.parse(sessionStorage.getItem("country") || "[]").filter(item=>item.country_name.includes(searchKey))
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

    // 已记住登录
    const goHome = async () => {
      if(cookie.load("token")){
        // console.log(cookie.load("access_token"));
        let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
        await getAccessToken().then(res => {
          if(window.location.hostname.startsWith("localhost")){
            cookie.save("access_token",res.access_token,{path:"/"})
          }else{
            cookie.save('access_token', res.access_token, { domain:test,path: '/' });
          }
        }).catch((err) => { console.log(err) });

        // console.log(cookie.load("access_token"));
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        // 是否是商户
        // history.push("/stores/merchantApplication")
        // 是否有店铺
        history.push(urlParams.get('redirect') || '/');
        // setUserLoginState(msg);
        return;
      }
    }

    const onFinish = async (values: API.LoginParams) => {
      console.log(new Date().getTime());
      try {
        // 登录
        // 过滤所有输入字段的前后空格
        const trimmedValues = {
          ...values,
          username: values.username?.trim(),
          clientid:new Date().getTime(),
          area_code:phoneCode,
          // password: values.password?.trim()
        };
        const msg = await login({ ...trimmedValues, type });
        if (msg.code === 0) {
          let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
          const token = msg.token;
          if(window.location.hostname.startsWith("localhost")){
            cookie.save("token",token,{path:"/"})
          }else{
            cookie.save("token",token,{domain:test,path:"/"})
          }
          // localStorage.setItem('token', token);
          
          const defaultLoginSuccessMessage = intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: '登录成功！',
          });
          message.success(defaultLoginSuccessMessage);
          // 获取用户信息

          console.log(cookie.load("token"));
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          // 是否是商户
          // history.push("/stores/merchantApplication")
          // 是否有店铺
          history.push(urlParams.get('redirect') || '/');
          setUserLoginState(msg);
          return;
        }
        throw new Error(msg.msg);
      } catch (error:any) {
        // const defaultLoginFailureMessage = intl.formatMessage({
        //   id: 'pages.login.failure',
        //   defaultMessage: error.message,
        // });
        console.log(error.message);
        message.error(error.message);
      }
    };
    
    
    useEffect(() => {
      // goHome()
      // console.log(sessionStorage.getItem("country"));
      // sessionStorage.getItem("country") || "[]"
      // console.log(JSON.parse(sessionStorage.getItem("country") || "[]"))
    }, []);
    
    return (
        <Scoped>
            {/* 表头 */}
            <h3>
              <FormattedMessage id="login.title" defaultMessage="登录商店" />
            </h3>
            
            {/* 输入项 */}
            <div className="login-form-content">
              {/* 登录组件 */}
              <Form
                name="normal_login"
                className="login-form"
                // initialValues={{ remember: true }}
                layout="horizontal"
                onFinish={onFinish}
                size="large"
              >
                  <div className='user-box' ref={Ref}></div>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'pages.login.username.required' }),
                      },
                    ]}
                  >
                      <Input
                        style={{
                          height: '52px',
                        }}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={intl.formatMessage({ id: 'pages.login.username.label' })}
                        suffix={
                          <ConfigProvider
                            theme={{
                              token: {
                                /* 这里是你的全局 token */
                                // colorError:"#d9d9d9",
                              },
                              components: {
                                Dropdown: {
                                  /* 这里是你的组件 token */
                                  paddingXXS:0,
                                },
                                Input:{
                                  // hoverBorderColor:"#d9d9d9"
                                }
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
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder={intl.formatMessage({ id: 'pages.login.password.label' })}
                  />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  required={false}
                  // initialValue={true}
                  style={{
                    margin:0
                  }}
                >
                  <Checkbox>
                    <FormattedMessage id="pages.login.rememberMe" defaultMessage="记住我" />
                  </Checkbox>
                </Form.Item>
                <Button
                  style={{
                    height: '46px',
                  }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  <FormattedMessage id="menu.login" defaultMessage="登录" />
                </Button>
                
              </Form>
            </div>
            {/* 忘记密码 */}
            <div className="link-button-container">
              <Link to='/user/signUp'>
                <FormattedMessage id="menu.register" defaultMessage="开始免费试用"  />
              </Link>
              <Link to='/user/forget' >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </Link>
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
              <FormattedMessage id='pages.or'/>
            </Divider>
            {/* 其他登录方式 */}
            <div
              className="external-login-button-container"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '60px',
              }}
            >
              <Button className="external-login-button" block>
                <img
                  src="/icons/google.svg"
                  style={{
                    objectFit: 'contain',
                    height: '62%',
                  }}
                />
                {intl.formatMessage({ id: 'pages.login.link.google' })}
              </Button>
              <Button className="external-login-button" block>
                <img src="/icons/facebook.svg" />
                {intl.formatMessage({ id: 'pages.login.link.facebook' })}
              </Button>
              <Button className="external-login-button" block>
                <img src="/icons/apple.svg" />
                {intl.formatMessage({ id: 'pages.login.link.apple' })}
              </Button>
              <Button className="external-login-button" block>
                <img src="/icons/linkie.svg" style={{ height: '100%',objectFit: 'contain' }} />
                {intl.formatMessage({ id: 'pages.login.link.linkie' })}
              </Button>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .user-box{
      position: relative;
      color:"#FFF";
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
    
    .login-form-wrap h3 {
        margin-bottom: 32px;
        color: #262626;
        font-weight: 600;
        font-size: 30px;
        line-height: 42px;
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

`