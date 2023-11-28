import React from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../../../../store/reducers/slice/pageSlice';
import { Language, LanguageMap } from '../../../../constant/Page';
import { JudgingLanguage } from '../../../../util/utils';
import { Dropdown, Space, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import './FormHeader.scss';

// state 数据映射
const mapStateToProps = state => {
    const locale = state.page.locale;
    return { locale };
};
// action 函数映射
const mapDispatchToProps = { setLanguage };

/**
 * 国际化
 */
const FormHeader = ({ locale, setLanguage }) => {
    /**
     * 处理选中事件
     */
    const select = e => {
        setLanguage(e.key);
    };

    return (
        <div className="mc-login-header-wrap">
            <div className="mc-login-header-container">
                <Dropdown
                    menu={{
                        items: Language,
                        selectable: true,
                        defaultSelectedKeys: JudgingLanguage(locale),
                        onSelect: select,
                    }}
                    placement="bottomRight"
                >
                    <Typography.Link>
                        <Space className="mc-login-header-button">
                            {LanguageMap[JudgingLanguage(locale)]}
                            <GlobalOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FormHeader);
