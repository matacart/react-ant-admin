import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect } from "react";
import { AddIcon, EmailIcon, TelIcon } from "@/components/Icons/Icons";

function CustomerInfo() {

    useEffect(()=>{
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">客户信息</div>
                </Flex>
                <Form>
                    <>
                        <div style={{marginBottom:"8px"}}>哈哈 呃呃</div>
                        <Flex align="center" gap={8} style={{marginBottom:"8px"}}>
                            <TelIcon className='font-20 color-AAB7CD' />
                            <div>{11111111}</div>
                        </Flex>
                        <Flex gap={8}>
                            <EmailIcon className='font-20 color-AAB7CD' />
                            <div style={{overflowWrap:"anywhere"}} className='color-356DFF'>{222222222}</div>
                        </Flex>
                        <Divider />
                        <div className="font-w-500" style={{marginBottom:"8px"}}>税费设置</div>
                        <Checkbox>收税</Checkbox>
                    </>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(CustomerInfo);