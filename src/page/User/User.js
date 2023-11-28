import { Outlet } from 'react-router';
import { get } from '../../locales/utils';
import { LogoFont } from '../../component/Icon/Icon';
import '../../styles/page/Login.scss';

export default function User() {
    return (
        <div className="mc-login-wrap">
            <div className="mc-login-container">
                <div className="mc-login-logo">
                    <div className="mc-logo-container">
                        <p>{get('UserPage_title')}</p>
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
