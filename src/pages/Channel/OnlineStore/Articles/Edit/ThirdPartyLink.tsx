import { Card, Input, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { QuestionCircleOutlined } from "@ant-design/icons"
import articles from "@/store/channel/website/articles";
import { useState } from "react"


 function ThirdPartyLink(){


    const [inputStatus, setInputStatus] = useState<{
        error?: boolean;
        message?: string;
    }>({});

    // URL 验证规则
    const validateUrl = (value: string) => {
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
        const maxLength = 1000;
        if (!value) {
            return { valid: true };
        }
        if (value.length > maxLength) {
        return { valid: false, message: `长度不能超过${maxLength}个字符` };
        }

        if (!urlPattern.test(value)) {
        return { valid: false, message: '请输入有效的URL地址' };
        }

        if (!value.startsWith('http://') && !value.startsWith('https://')) {
        return { valid: false, message: '必须以 http:// 或 https:// 开头' };
        }

        return { valid: true };
    };

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">第三方跳转链接
                        <Tooltip title="例：https://example.com">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                </div>
                <div className="item between">
                    <Input status={inputStatus.error ? 'error' : ''} defaultValue={articles.oldArticles.jump_button_link??""} onChange={(e) => {
                         const value = e.target.value.trim();
                         const { valid, message } = validateUrl(value);
                         setInputStatus(valid ? {} : { error: true, message });
                         if (valid) {
                           articles.setOldArticles({
                             ...articles.oldArticles,
                             jump_button_link: value
                           });
                         }
                    }} />
                </div>
                {inputStatus.error && (
                    <div style={{ color: '#ff4d4f', marginTop: 8 }}>
                        {inputStatus.message}
                    </div>
                )}
            </Card>
        </Scoped>
    )
}
export default observer(ThirdPartyLink)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 12px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}
`
