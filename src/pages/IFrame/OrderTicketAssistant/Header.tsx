
import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { history, Icon, useLocation } from '@umijs/max';
import { MenuOutlined } from '@ant-design/icons';
import { set } from 'lodash';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: '订单列表',
        key: 'orderListGroup',
        icon: <MenuOutlined />,
        children: [
            {
                label: <div onClick={()=>history.push("/order_invoice_customization/orderList")}>订单列表</div>,
                key:"orderList"
            },
            {
                label: <div onClick={()=>history.push("/order_invoice_customization/draftOrderList")}>草稿单</div>,
                key:"draftSheet",
            },
        ],
    },
    {
        label: <div onClick={()=>history.push("/order_invoice_customization/templateManage")}>模板管理</div>,
        key: 'templateManage',
    },
    {
        label: <div onClick={()=>history.push("/order_invoice_customization/basicConfig")}>基础设置</div>,
        key: 'basicSetup',
    },
    {
        label: <div onClick={()=>history.push("/order_invoice_customization/orderPdfDownload")}>下载列表</div>,
        key: 'downloadList',
    },
    {
        label: <div onClick={()=>history.push("/order_invoice_customization/email")}>邮件自动化</div>,
        key: 'mailAutomation',
    }
];

function Header(){

    const [current, setCurrent] = useState('orderList');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(()=>{
        // 使用正则匹配路径片段
        const segment = history.location.pathname.match(/\/order_invoice_customization\/([^\/]+)/)?.[1];
        switch (segment) {
            case 'orderList':
                setCurrent('orderList');
                break;
            case 'draftOrderList':
                setCurrent('draftSheet');
                break;
            case 'templateManage':
                setCurrent('templateManage');
                break;
            case 'basicConfig':
                setCurrent('basicSetup');
                break;
            case 'orderPdfDownload':
                setCurrent('downloadList');
                break;
        }

        // useLocation 中返回的 pathname 是相对项目配置的base的路径
    },[useLocation().pathname])


    return (
        <Scoped>
            <Menu style={{backgroundColor:"#F7F8FB"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Scoped>
    )

}

export default Header;

const Scoped = styled.div`
    position: fixed;
    width: 100%;
    background-color: #F7F8FB;
    padding-left:80px;
    z-index: 99;
`