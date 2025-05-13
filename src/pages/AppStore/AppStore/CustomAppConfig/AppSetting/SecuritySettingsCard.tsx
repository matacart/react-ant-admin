import SimpleCard from "@/components/Card/SimpleCard";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Input, Radio, Tooltip } from "antd";
import styled from "styled-components";


const { TextArea } = Input;
function SecuritySettingsCard(){

    const content = (
        <>
            <div>
                IP白名单
                <Tooltip title="设置了IP白名单后，平台只允许该IP请求OpenAPl、创建或刷新令牌。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />  
                    </span>
                </Tooltip>
                <span className="color-000000-A45">（可选）</span>
            </div>
            <div style={{marginTop: '8px'}}>
                <TextArea showCount maxLength={100} rows={4} />
            </div>
        </>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">安全设置</div>} content={content} />
        </Scoped>
    )
}

export default SecuritySettingsCard;

const Scoped = styled.div`
    
    
`