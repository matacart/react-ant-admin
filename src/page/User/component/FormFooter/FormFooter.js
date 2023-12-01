import { GetIntl } from '../../../../locales/utils';
import { Link } from 'react-router-dom';
import './FormFooter.scss';

/**
 * 底部 登录/注册 页面跳转
 * @returns
 */
const FormFooter = () => {
    return (
        <>
            <div className="mc-login-bottom-button">
                {GetIntl('UserPage_register_footer_text1')}
                <Link to="/user/signIn">
                    {GetIntl('UserPage_register_footer_text2')}
                </Link>
            </div>
            <div className="mc-login-footer"></div>
        </>
    );
};

export default FormFooter;
