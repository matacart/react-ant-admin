import { Card, Form, Input } from "antd"
import styled from "styled-components"


function InformationCard() {
  return (
    <Scoped>
        <Card classNames={{body:"card"}}>
            <Form layout="vertical">
                <Form.Item label={<div className="font-w-600">员工名称</div>}>
                    <Input placeholder="请输入员工名称" />
                </Form.Item>
                <Form.Item label={<div className="font-w-600">员工账号</div>}>
                    <Input placeholder="请输入员工的邮箱或手机号" />
                </Form.Item>
            </Form>
        </Card>
    </Scoped>
  )
}


export default InformationCard

const Scoped = styled.div`
    .card{
        padding:0 24px;
    }


`