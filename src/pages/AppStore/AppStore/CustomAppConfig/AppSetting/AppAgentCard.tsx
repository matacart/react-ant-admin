import SimpleCard from "@/components/Card/SimpleCard";
import { ArrowLeftOutlined, ExportOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Form, Input, Radio, Row, Tooltip } from "antd";
import styled from "styled-components";

function AppAgentCard(){

    const FormContent = (
        <Form layout="vertical" className="myform">
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item label={<div>子路径前缀<span className="color-000000-A45">（可选）</span></div>}>
                        <Input  />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={<div>子路径<span className="color-000000-A45">（可选）</span></div>}>
                        <Input  />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item style={{marginBottom:"0"}} label={<div>代理URL<span className="color-000000-A45">（可选）</span></div>}>
                <Input  />
            </Form.Item>
        </Form>
    )
    return(
        <Scoped>
            <SimpleCard title={
                <div style={{padding:"20px 0"}}>
                    <div style={{marginBottom:"4px"}} className="font-w-500">应用代理</div>
                    <div className="font-w-500 font-14 color-7A8499">修改配置后将立马生效，若您的应用已上架，请谨慎修改，以免影响商家或C端用户使用。</div>
                </div>
            } content={FormContent} />
        </Scoped>
    )
}

export default AppAgentCard;

const Scoped = styled.div`
   
    
`