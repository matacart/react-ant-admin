import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs, Button, Form, Input, Divider } from 'antd';
import { createStyles } from 'antd-style';
import { FormattedMessage, history,useIntl, useModel, SelectLang } from '@umijs/max';
import './index.scss';
import langShow from '@/locales/langShow';
import API from '@/services/user';
import { useState } from 'react';
import LoginForm from '@/components/Login/LoginForm';
import LoginFormProps from '@/components/Login/LoginForm';
import RegisterForm from '@/components/Login/Register';
import ForgetForm from '@/components/Login/Forget';

const useStyles = createStyles(({ token }) => {
  return {
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

// 国际化组件
const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang reload={false} postLocalesData={()=>{return[  
            {  
                "lang": "zh-CN",  
                "label": "简体中文",  
                "icon": "🇨🇳", // 中国国旗  
                "title": "语言"  
            },  
            {  
              "lang": "zh-TW",  
              "label": "繁體中文",  
              "icon": "tw", 
              "title": "語言"  
            },
            {  
                "lang": "en-US",  
                "label": "English",  
                "icon": "🇺🇸", // 美国国旗  
                "title": "Language"  
            },  
            {  
              "lang": "ja-JP",  
              "label": "日本語",  
              "icon": "🇯🇵", // 日本国旗  
              "title": "言語"  
            },  
            {  
                "lang": "es-ES",  
                "label": "Español",  
                "icon": "🇪🇸", // 西班牙国旗  
                "title": "Idioma"  
            },  
            {  
                "lang": "fr-FR",  
                "label": "Français",  
                "icon": "🇫🇷", // 法国国旗  
                "title": "Langue"  
            },  
            {  
                "lang": "de-DE",  
                "label": "Deutsch",  
                "icon": "🇩🇪", // 德国国旗  
                "title": "Sprache"  
            },  

            {  
                "lang": "ko-KR",  
                "label": "한국어",  
                "icon": "🇰🇷", // 韩国国旗  
                "title": "언어"  
            },  
            {  
                "lang": "ru-RU",  
                "label": "Русский",  
                "icon": "🇷🇺", // 俄罗斯国旗  
                "title": "Язык"  
            },  
            {  
                "lang": "ar-SA",  
                "label": "العربية",  
                "icon": "🇸🇦", // 沙特阿拉伯国旗（作为阿拉伯语的代表）  
                "title": "لغة"  
            },  
            {  
                "lang": "pt-BR",  
                "label": "Português",  
                "icon": "🇧🇷", // 巴西国旗（作为葡萄牙语的代表）  
                "title": "Idioma"  
            }  
          ]}
       }
      />}
    </div>
  );
};



const Login: React.FC = () => {

  const intl = useIntl();
  const lang = langShow[intl.locale as keyof typeof langShow];
  // 动态组件
  // 0: 登录、1: 注册、2: 忘记密码
  const [formIndex,setFormIndex] = useState(0) ;
  const changeForm = (value:number) => setFormIndex(value)



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


  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.code === 0) {

        //token写入
        console.log(msg);
        const token = msg.token;
        localStorage.setItem("token", token);

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };


  return (
    <div
      className="login-wrap"
      style={{
        display: 'flex',
        width: '100vw',
        minWidth: '1200px',
        height: '100vh',
      }}
    >
      {/* logo */}
      <div
        className="login-logo"
        style={{
          position: 'relative',
          width: '67.5%',
        }}
      >
        <div className="logo-container">
          <p>{intl.formatMessage({ id: 'pages.login.welcome' })}</p>
          <img
            src="/icons/login-text.svg"
            style={{
              objectFit: 'contain',
              height: '30%',
            }}
          />
        </div>
      </div>
      <div
        className="login-form-scroll"
        style={{
          flex: '1',
          minWidth: '400px',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div
          className="login-form-container"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff',
          }}
        >
          {/* 国际化 */}
          <div
            className="login-header-wrap"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              padding: '10px 40px 20px',
            }}
          >
            <div className="login-header-container">
              <div
                style={{
                  marginTop: '4px',
                }}
              >
                {lang.label}
              </div>
              {/* 国际化组件 */}
              <Lang />
            </div>
          </div>
          <div
            className="login-form-wrap"
            style={{
              paddingTop: '30px',
            }}
          >
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
                initialValues={{ remember: true }}
                layout="horizontal"
                onFinish={handleSubmit}
                size="large"
              >
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
                    visibilityToggle={true}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
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
                >
                  <FormattedMessage id="menu.login" defaultMessage="登录" />
                </Button>

                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
              </Form>
            </div>
            {/* 忘记密码 */}
            <div className="link-button-container">
              <a href="">
                <FormattedMessage id="menu.register" defaultMessage="注册" />
              </a>
              <a className="login-form-forgot" href="">
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
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
              或
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
