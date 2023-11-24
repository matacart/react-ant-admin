// 登录/注册 页面跳转
import { Link } from 'react-router-dom';
import './FormFooter.scss';

/**
 * 底部
 * @returns
 */
const FormFooter = () => {
    return (
        <>
            <div className="mc-login-bottom-button">
                已有账号，
                <Link to="/user/signIn">直接登录</Link>
            </div>
            <div className="mc-login-footer"></div>
        </>
    );
};

export default FormFooter;
