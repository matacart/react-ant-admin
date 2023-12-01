import { message } from 'antd';
import { useGetIntl, GetIntl } from '../../../../locales/utils';
import DataProcessing from '../../../../component/DataProcessing/DataProcessing';
import {
    Google,
    Facebook,
    IOS,
    Linkiee,
} from '../../../../component/Icon/Icon';
import './External.scss';

/**
 * 其他 登录/注册 方式
 * @returns
 */
const External = ({ dividerLine }) => {
    const getIntl = useGetIntl();
    const data = [
        {
            itemType: 'Button',
            type: 'text',
            block: true,
            itemChild: GetIntl('UserPage_external_google'),
            icon: <Google className="icon" />,
            className: 'mc-external-login-button',
        },
        {
            itemType: 'Button',
            block: true,
            itemChild: GetIntl('UserPage_external_facebook'),
            icon: <Facebook className="icon" />,
            className: 'mc-external-login-button',
        },
        {
            itemType: 'Button',
            block: true,
            itemChild: GetIntl('UserPage_external_apple'),
            icon: <IOS className="icon" />,
            className: 'mc-external-login-button',
        },
        {
            itemType: 'Button',
            block: true,
            itemChild: GetIntl('UserPage_external_linkiee'),
            icon: <Linkiee className="icon" />,
            className: 'mc-external-login-button',
        },
    ];

    const warning = () => {
        message.warning(getIntl.get('Message_warning_unopened'));
    };

    return (
        <>
            <div className="mc-external-login-divider sl-external-login-divider__siginUp">
                <span className="mc-external-login-divider__text">
                    {dividerLine}
                </span>
            </div>

            <div className="mc-external-login-button-container">
                {data.map((item, index) => {
                    return DataProcessing.Form({
                        ...item,
                        itemChild: item.itemChild,
                        key: index,
                        onClick: warning,
                    });
                })}
            </div>
        </>
    );
};

export default External;
