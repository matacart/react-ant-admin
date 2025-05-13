import { FormattedMessage, history, useIntl, useModel, SelectLang, Outlet } from '@umijs/max';
import langShow from '@/locales/langShow';
import ILang from '@/components/Lang/lang';
import styled from 'styled-components';


const Login: React.FC = () => {

  const intl = useIntl();
  const lang = langShow[intl.locale as keyof typeof langShow];
  
  return (
    <Scoped>
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
    </Scoped>
    
  );
};

export default Login;

const Scoped = styled.div`
  .login-logo {
    position: 'relative';
    width: '67.5%';
    background: url(/img/logo-bak-01.jpg);
    background-repeat: no-repeat;
    background-size: cover;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(36, 40, 51, .5);
    }

    .logo-container {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        margin-top: -3%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        p {
            margin-left: 20px;
            margin-bottom: 24px;
            color: #fff;
            font-weight: 300;
            font-size: 40px;
            font-family: Helvetica;
            line-height: 1;
        }

        img {
            position: relative;
            z-index: 1;
            width: 90%;
        }
    }
  }

  @media screen and (max-width:900px) {
      .login-logo {
          display: none;
      }
      .login-wrap{
          width: 100%;
          min-width: none;

      }
  }

  h3 {
      margin-bottom: 32px;
      color: #262626;
      font-weight: 600;
      font-size: 30px;
      line-height: 42px;
  }

  .login-header-container {
      display: flex;
      align-items: center;
      padding: 10px 6px;
      color: #242833;
      border-radius: 4px;
      /* transition: background-color ease 0.3s; */

  }

/* .login-header-container:hover {
    transition-behavior: nomal;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: background-color;

} */

  a {
      display: inline-block;
      color: #356dff;
      font-weight: 600;
      text-decoration: none;

      // a标签访问后的样式
      &:visited {
          color: #356dff;
          font-weight: 600;
          text-decoration: none;
      }
  }

  .login-form-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80%;
      max-width: 400px;
  }



`

