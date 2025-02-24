import { Card, Form, Input } from "antd"
import styled from "styled-components"


function GroupNameCard() {
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout="vertical">
                    <Form.Item label={<div className="color-242833 font-16 font-w-600">分组方案名称<span className="color-7A8499 font-14 font-w-500">（该名称不会展示给客户查看）</span></div>}>
                        <Input />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default GroupNameCard

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
`