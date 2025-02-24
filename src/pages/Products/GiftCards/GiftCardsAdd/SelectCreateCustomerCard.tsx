import { Card, Col, Divider, Flex, Form, Input, Modal, Row, Select, Space, Tooltip } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TinyMce from "@/components/MCE/TinyMce";
import styled from "styled-components";
import { AddIcon } from "@/components/Icons/Icons";


const {TextArea} = Input

function SelectCreateCustomerCard() {

    const [isCreateCustomer,setIsCreateCustomer] = useState(false)
  
    useEffect(()=>{
       
    })
    return (
            
        <Scoped>
            <Card title={<div className="">选择或创建客户</div>}>
                <Select
                    className="select"
                    showSearch
                    placeholder="搜索或创建客户"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        { value: '1', label: 'Jack' },
                        { value: '2', label: 'Lucy' },
                        { value: '3', label: 'Tom' },
                    ]}
                    dropdownRender={(menu) => (
                        <>
                            <Flex className="add-customer color-356DFF cursor-pointer" style={{padding:"8px 10px 4px 10px"}} onClick={()=>setIsCreateCustomer(true)}>
                                <AddIcon />
                                <div style={{marginLeft:"10px"}}>创建新客户</div>
                            </Flex>
                            <Divider style={{ margin: '8px 0' }} />
                            {menu}
                        </>
                    )}
                />
            </Card>
            {/*  */}
            <Modal title="创建客户" width={620} centered open={isCreateCustomer} onCancel={()=>setIsCreateCustomer(false)}>
                <Form layout="vertical">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="名字">
                                <Input placeholder="请输入名字" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="姓氏">
                                <Input placeholder="请输入姓氏" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="邮箱">
                                <Input placeholder="请输入邮箱" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label="手机">
                                <Space.Compact style={{width:"100%"}}>
                                    <Select style={{width:"80px"}} defaultValue="+86" options={[{
                                        value: '+86', label: '+86'
                                    }]} />
                                    <Input placeholder="请输入手机号" />
                                </Space.Compact>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                
            </Modal>
        </Scoped>
        
    )
}

export default SelectCreateCustomerCard


const Scoped = styled.div`
    .select{
        height: 36px;
        width: 100%;

        .add-customer{
            padding: 10px 20px;
        }
    }
    
`