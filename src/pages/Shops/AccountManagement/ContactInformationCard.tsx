import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Form, Input, Select, Space } from "antd";
import styled from "styled-components";
import { layout } from '@/app.bak';


function ContactInformationCard() {


    return (
        <Scoped>
            <Card>
                <Form layout="vertical">
                    <Form.Item label={<div className="font-w-600 color-242833">账户联系邮箱</div>}>
                        <Input style={{width:"60%"}} placeholder="请输入账户联系邮箱" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600 color-242833">账户联系手机号</div>}>
                        <Space.Compact style={{width:"60%"}}>
                            <Select style={{width:"80px"}} defaultValue="+86" options={[{
                                value: '+86', label: '+86'
                            }]} />
                            <Input placeholder="请输入账户联系手机号" />
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )

}

export default ContactInformationCard;

const Scoped = styled.div`
    margin-bottom: 20px;

`
