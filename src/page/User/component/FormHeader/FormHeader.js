// 国际化
import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';

import './FormHeader.scss';

const items = [
    {
        key: '1',
        label: '简体中文',
    },
    {
        key: '2',
        label: '繁体中文',
    },
    {
        key: '3',
        label: 'English',
    },
    {
        key: '4',
        label: 'Bahasa Melayu',
    },
    {
        key: '5',
        label: 'Bahasa Indonesia',
    },
];

const FormHeader = () => {
    return (
        <div className="mc-login-header-wrap">
            <div className="mc-login-header-container">
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['1'],
                    }}
                    placement="bottomRight"
                >
                    <Typography.Link>
                        <Space className="mc-login-header-button">
                            {items[0].label}
                            <GlobalOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>
            </div>
        </div>
    );
};

export default FormHeader;
