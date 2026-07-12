import { Menu } from 'antd';
import { history, useLocation } from '@umijs/max';
import routes from '../../../../config/routes';
import React from 'react';
import { AppstoreOutlined, HomeOutlined, PieChartOutlined, SettingOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';


// 图标映射表
const iconMap: Record<string, React.ReactNode> = {
  'AppstoreOutlined': <AppstoreOutlined />,
  'ShoppingOutlined': <ShoppingOutlined />,
  'HomeOutlined': <HomeOutlined />,
  'ShoppingCartOutlined': <ShoppingCartOutlined />,
  'PieChartOutlined': <PieChartOutlined />,
  'SettingOutlined': <SettingOutlined />,
};




function Aside() {

    const location = useLocation(); // 获取 location 对象

    const router:any = routes.find((item:any) => item.path === '/stock-page') || [];

    const menuItems = router?.routes?.map((item:any) => {
        if(!item.path){
            return null;
        }
        return {
            key: item.path,
            icon: iconMap[item.icon],
            label: item.name,
            children: item.routes?.map((item:any) => ({
                key: item.path,
                label: item.name,
                component: item.component,
            })),
        }
    }).filter((item:any) => item !== null);

    // 处理菜单点击
    const handleMenuClick = (e: any) => {
        history.push(e.key);
    };

    return (
        <div style={{ width: 256, height: 'calc(100vh - 60px)', borderRight: '1px solid #f0f0f0', overflowY: 'auto' }}>
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
        />
        </div>
    );
}

export default Aside;