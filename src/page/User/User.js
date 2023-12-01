import { Outlet } from 'react-router';
import { GetIntl } from '../../locales/utils';
import { LogoFont } from '../../component/Icon/Icon';
import '../../styles/page/Login.scss';

export default function User() {
    return (
        <div className="mc-login-wrap">
            <div className="mc-login-container">
                <div className="mc-login-logo">
                    <div className="mc-logo-container">
                        <p>{GetIntl('UserPage_title')}</p>
                        <LogoFont />
                    </div>
                </div>

                <div
                    id="loginFormContainer"
                    className="mc-login-form-container"
                >
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
