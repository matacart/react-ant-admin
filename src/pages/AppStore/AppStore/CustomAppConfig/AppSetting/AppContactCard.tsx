import SimpleCard from "@/components/Card/SimpleCard";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Input, Radio, Tooltip } from "antd";
import styled from "styled-components";

function AppContactCard(){

    const FormContent = (
        <Form layout="vertical" className="myform">
            <Form.Item label={<div>联系人名称</div>}>
                <Input  />
            </Form.Item>
            <Form.Item label={<Flex>
                <div>联系人邮箱</div>
                <Tooltip title="我们将使用此邮箱与你沟通 API 相关问题。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />  
                    </span>
                </Tooltip>    
            </Flex>}>
                <Input  />
            </Form.Item>
        </Form>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">应用联系人</div>} content={FormContent} />
        </Scoped>
    )
}

export default AppContactCard;

const Scoped = styled.div`
    .myform{
        .ant-form-item:last-child{
            margin-bottom: 0;
        }
    }
    
`