import SimpleCard from "@/components/Card/SimpleCard";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Input, Radio, Tooltip } from "antd";
import styled from "styled-components";

function BaseInfoSettingCard(){

    const FormContent = (
        <Form layout="vertical" className="myform">
            <Form.Item label={<Flex>
                <div>应用名称</div>
                <Tooltip title="该应用名称仅用于你的应用标识，应用市场中的应用名称需要在“应用详情”中设置。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />  
                    </span>
                </Tooltip>    
            </Flex>}>
                <Input  />
            </Form.Item>
            <Form.Item label={<div>应用地址</div>}>
                <Input  />
            </Form.Item>
            <Form.Item label={<Flex>
                <div>应用回调地址</div>
                <Tooltip title="支持配置多个回调地址；在请求授权时标记需跳转的回调地址。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />  
                    </span>
                </Tooltip>    
            </Flex>}>
                <Input  />
            </Form.Item>
            <Form.Item label={<div>应用打开方式<span className="">（可选）</span></div>}>
                <Radio.Group options={[
                    { label: '内嵌', value: '0' },
                    { label: '外跳', value: '1' },
                ]} onChange={()=>{}} defaultValue={"0"} />
            </Form.Item>
        </Form>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">基础信息设置</div>} content={FormContent} />
        </Scoped>
    )
}

export default BaseInfoSettingCard;

const Scoped = styled.div`
    .myform{
        .ant-form-item:last-child{
            margin-bottom: 0;
        }
    }
    
`