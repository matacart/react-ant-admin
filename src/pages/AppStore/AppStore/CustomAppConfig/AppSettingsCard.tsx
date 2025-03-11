import { Button, Card, Flex, Form, Input, message, Select } from "antd"
import styled from "styled-components"
import { values } from 'lodash';
import copy from "copy-to-clipboard";

function AppSettingsCard() {


    return (
        <Scoped>
            <Card title="应用信息" extra={<Button type="primary">保存</Button>} className="credentials">
                <Form layout="vertical">
                    <Form.Item label="应用名称">
                        <Input  />
                    </Form.Item>
                    <Form.Item label="语言">
                        <Select />
                    </Form.Item>
                    <Form.Item label="描述">
                        <Input  />
                    </Form.Item>
                    <Form.Item label="应用开发者">
                        <Select />
                    </Form.Item>
                    <Form.Item label="应用联系人邮箱">
                        <Input  />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default AppSettingsCard

const Scoped = styled.div`
    
`