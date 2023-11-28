import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu as AntdMenu, theme } from 'antd';
import { Setting } from '../../../component/Icon/Icon';
import AntdSider from 'antd/es/layout/Sider';
import { SIDER } from '../../../constant/Sider';
import { Link } from 'react-router-dom';
import { get } from '../../../locales/utils';
import './Sider.scss';

// state 映射
const mapStateToProps = state => {
    const sider = state.sider;
    return { sider };
};

// 菜单导航列表
class SiderList {
    constructor(items) {
        this.items = items;
    }

    /**
     * 将单个数据进行对象格式化
     * @param {string} key  唯一标识
     * @param {import('react').ReactElement} icon  react 对象
     * @param {object} children
     * @param {string} label 标题
     * @param {*} type
     * @returns
     */
    getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    /**
     * 获取完整列表
     */
    getItems() {
        return this.items.map(item =>
            this.getItem(
                item.TITLE,
                item.INDEX,
                item.ICON,
                item.CHILD
                    ? item.CHILD.map(son => this.getItem(son.TITLE, son.INDEX))
                    : item.CHILD,
            ),
        );
    }

    /**
     * 获取 items 中 每个数据 的唯一标识
     */
    getKey() {
        return this.items.map(item => item.INDEX);
    }
}
const items = new SiderList(SIDER);

/**
 * admin 系统，侧边栏导航条
 */
const Sider = ({ sider }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const rootSubmenuKeys = items.getKey();

    const [openKeys, setOpenKeys] = useState(['products']);
    const onOpenChang = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <AntdSider
            className="content"
            width={239}
            style={{
                background: colorBgContainer,
                // backgroundColor: '#EAEDF1',

                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                paddingTop: 60,
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div className="body">
                <div className="groupContainer">
                    <AntdMenu
                        mode="inline"
                        // defaultSelectedKeys={[sider.path]}
                        // defaultOpenKeys={[sider.path]}
                        // openKeys={openKeys}
                        selectedKeys={[sider.path]}
                        onOpenChange={onOpenChang}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items.getItems()}
                        className="menu"
                    />
                </div>
                <div className="menuSlot"></div>
            </div>
            <div className="footer">
                <AntdMenu
                    mode="inline"
                    selectedKeys={[sider.path]}
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={[
                        {
                            key: '/admin/settings',
                            icon: <Setting />,
                            label: (
                                <Link to="/admin/settings">
                                    {get('SiderPage_setting')}
                                </Link>
                            ),
                        },
                    ]}
                    className="menu"
                />
            </div>
        </AntdSider>
    );
};

export default connect(mapStateToProps)(Sider);
