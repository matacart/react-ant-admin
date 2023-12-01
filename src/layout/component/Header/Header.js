import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updataMenu } from '../../../store/reducers/slice/siderSlice';
import { getUserInfo, removeToken } from '../../../util/auth';
import Internationalization from '../../../component/Internationalization/Internationalization';
import {
    Input as AntdInput,
    Divider as AntdDivider,
    Space as AntdSpace,
    Popover,
    Tooltip,
    Dropdown,
    Avatar,
    Button,
} from 'antd';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import {
    SearchOutlined,
    BellOutlined,
    QuestionCircleOutlined,
    WifiOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Clock, AccountManagement, LogOut } from '../../../component/Icon/Icon';
import Logo from '../../../assets/imgs/matacart_logo_topLeft.png';
import { GetIntl, useGetIntl } from '../../../locales/utils';
import { useIntl } from 'react-intl';

import './Header.scss';

// state 映射
const mapStateToProps = state => {
    const sider = state.sider;
    return { sider };
};

const mapDispatchToProps = {
    updataMenu,
};

/**
 * 布局头部
 */
const HeaderRight = () => {
    const items = [
        {
            key: '1',
            label: 'UID : ' + getUserInfo().userId,
            icon: <Avatar icon={<UserOutlined />} size="small" />,
        },
        {
            key: '2',
            label: (
                <Link to={'/'}>
                    <span>
                        {GetIntl('Layout_Header_BatchProcessingProgress')}
                    </span>
                </Link>
            ),
            icon: <Clock />,
        },
        {
            key: '3',
            label: (
                <Link to={'/'}>
                    <span>{GetIntl('Layout_Header_AccountManagement')}</span>
                </Link>
            ),
            icon: <AccountManagement />,
        },
        {
            key: '4',
            label: (
                <Link to={'/user/signIn'}>
                    <span>{GetIntl('Layout_Header_LogOff')}</span>
                </Link>
            ),
            icon: <LogOut />,
            onClick: () => {
                removeToken();
            },
        },
    ];

    const AntdDividerStyle = {
        borderColor: 'rgb(215,219,231)',
    };

    const [delayState, setDelayState] = useState();

    let delayStateStopwatch;
    if (navigator.onLine) {
        delayStateStopwatch = setInterval(() => {
            setDelayState(navigator.connection.rtt);
        }, 3000);
    } else {
        clearInterval(delayStateStopwatch);
        setDelayState('999');
    }

    return (
        <AntdSpace className="right-content layout-header__right-content">
            {/* 店铺管理 */}
            <Popover
                placement="bottom"
                title="211"
                content="777"
                className="setShop"
            >
                <Button
                    type="text"
                    block
                    style={{ width: '45px', height: '38px' }}
                >
                    <h4>{0}</h4>
                    <svg
                        className="mc-symbol-icon arrow"
                        aria-hidden="true"
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 10L12 15L17 10"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </Popover>

            {/* 分割线 */}
            <AntdDivider type="vertical" style={AntdDividerStyle} />

            {/* 通知 */}
            <Button type="text" block style={{ width: '25px' }}>
                <BellOutlined />
            </Button>

            {/* 国际化 */}
            <Internationalization />

            {/* 使用文档 */}
            <Tooltip
                placement="bottom"
                title={GetIntl('UseTheDocument')}
                arrow={true}
            >
                <QuestionCircleOutlined />
            </Tooltip>

            {/* 网络状态 */}
            <Tooltip
                placement="bottom"
                title={GetIntl('Delay', { delayState: delayState })}
                arrow={true}
            >
                <WifiOutlined />
            </Tooltip>

            {/* 头像，用户信息 */}
            <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow={false}
                trigger={['click']}
            >
                <Avatar icon={<UserOutlined />} size="small" />
            </Dropdown>
        </AntdSpace>
    );
};

/**
 * admin 系统，头部菜单
 */
const Header = ({ sider, updataMenu }) => {
    const getIntl = useGetIntl();
    /**
     * 小页面布局下，单击菜单事件。
     */
    const clickMenu = e => {
        if (!sider.menu.display || sider.menu.display === 'none')
            updataMenu({ display: 'flex', opacity: 1 });
        else updataMenu({ display: 'none', opacity: 0 });
    };

    return (
        <AntdHeader
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '60px',
                lineHeight: '60px',
                position: 'sticky',
                top: 0,
            }}
            className="mcLayoutHeader"
        >
            <div className="Header-logo">
                <Link to="/admin/home">
                    <img src={Logo} alt="logo" />
                </Link>
            </div>

            <div className="Header-menu">
                <label className="burger" htmlFor="burger">
                    <input type="checkbox" id="burger" onClick={clickMenu} />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="header-content" style={{ flex: '1 1 0%' }}>
                <AntdInput
                    placeholder={getIntl.get('Search')}
                    prefix={<SearchOutlined />}
                />
            </div>

            <HeaderRight />
        </AntdHeader>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
