import { message } from 'antd';
import DataProcessing from '../../../../component/DataProcessing/DataProcessing';
import {
    Google,
    Facebook,
    IOS,
    Linkiee,
} from '../../../../component/Icon/Icon';
import './External.scss';

const data = [
    {
        itemType: 'Button',
        type: 'text',
        block: true,
        itemChild: '使用Google',
        icon: <Google className="icon" />,
        className: 'mc-external-login-button',
    },
    {
        itemType: 'Button',
        block: true,
        itemChild: '使用Facebook',
        icon: <Facebook className="icon" />,
        className: 'mc-external-login-button',
    },
    {
        itemType: 'Button',
        block: true,
        itemChild: '使用Apple',
        icon: <IOS className="icon" />,
        className: 'mc-external-login-button',
    },
    {
        itemType: 'Button',
        block: true,
        itemChild: '使用Linkiee',
        icon: <Linkiee className="icon" />,
        className: 'mc-external-login-button',
    },
];

/**
 * 其他 登录/注册 方式
 * @returns
 */
const External = ({ dividerLine, text }) => {
    const warning = () => {
        message.warning('暂未开通，敬请期待。');
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
                        itemChild: item.itemChild + text,
                        key: index,
                        onClick: warning,
                    });
                })}
            </div>
        </>
    );
};

export default External;
