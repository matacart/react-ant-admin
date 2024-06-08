import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { FormattedMessage, history, useIntl, useModel, SelectLang, Outlet } from '@umijs/max';
import './index.scss';
import langShow from '@/locales/langShow';
import { useState } from 'react';
import ILang from '@/components/Lang/lang';


const Login: React.FC = () => {

  const intl = useIntl();
  const lang = langShow[intl.locale as keyof typeof langShow];
  
  return (
    <div
      className="login-wrap"
      style={{
        display: 'flex',
        width: '100vw',
        minWidth: '300px',
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
              <ILang />
          <div
            className="login-form-wrap"
            style={{
              paddingTop: '30px',
            }}
          >
            <>
              <Outlet/>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
