import { useIntl, Outlet } from '@umijs/max';
import styled from 'styled-components';
import bgImage from '@/../public/img/logo-bak-02.jpg';
import { App } from 'antd';
import { Lang } from '@/components/Lang/Lang';
// 用户布局入口
const Login: React.FC = () => {

  const intl = useIntl();
  
  return (
    <App>
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
              <p>{intl.formatMessage({ id: 'user.index.welcome' })}</p>
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
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="lang-form-header">
              <Lang />
            </div>
            <div className="login-form-container">
              <div className="login-form-wrap">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </Scoped>
    </App>
  );
};

export default Login;

const Scoped = styled.div`
  .login-logo {
    position: 'relative';
    width: '67.5%';
    background: url(${bgImage});
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

  .lang-form-header {
    display: flex;
    justify-content: flex-end;
    padding: 20px 40px;
  }
  .login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .login-form-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 80%;
      max-width: 400px;
      /* align-items: center; */
      background-color: #fff;
    }
  }
`

