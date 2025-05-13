import SimpleCard from "@/components/Card/SimpleCard";
import { ArrowLeftOutlined, ExportOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Input, Radio, Tooltip } from "antd";
import styled from "styled-components";

function GDPRWebhookCard(){

    const FormContent = (
        <Form layout="vertical" className="myform">
            <Form.Item label={<div>客户数据删除端点</div>}>
                <Input  />
            </Form.Item>
            <Form.Item label={<div>商店数据删除端点</div>}>
                <Input  />
            </Form.Item>
        </Form>
    )
    return(
        <Scoped>
            <SimpleCard title={
                <div style={{padding:"20px 0"}}>
                    <div style={{marginBottom:"4px"}} className="font-w-500">GDPR 必需的 Webhook</div>
                    <Flex className="font-w-500 font-14 color-7A8499">管理客户个人信息请求的 Webhook，<a>详细了解必需的 Webhook <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></Flex>
                </div>
            } content={FormContent} />
        </Scoped>
    )
}

export default GDPRWebhookCard;

const Scoped = styled.div`
    .myform{
        .ant-form-item:last-child{
            margin-bottom: 0;
        }
    }
    
`