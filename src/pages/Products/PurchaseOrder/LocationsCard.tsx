import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Form, Modal, Row, Select } from "antd";
import styled from "styled-components";
import AddSupplierModal from "./AddSupplierModal";
import { useRef } from "react";

function LocationsCard() {

    // 
    const selectRef = useRef(null);

    return(
        <Scoped>
            <Card bordered={false} title="添加地点">
                <Form layout={"vertical"}>
                    <div className="firstItem">
                    <Row gutter={[24,0]}>
                        <Col span={12}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">供应商</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                ref={selectRef}
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    }
                                ]}
                                dropdownRender={(menu)=>(
                                    <>
                                        {menu}
                                        <AddSupplierModal selectRef={selectRef} />
                                    </>
                                )}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">目的地</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    }
                                ]}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    </div>
                    <div className="border_solid"></div>
                    <div>
                        <Row gutter={[24,0]}>
                            <Col span={12}>
                            <Form.Item
                                // name="username"
                                label={<div className="color-242833 font-w-600 font-16">支付条款</div>}
                                rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        }
                                    ]}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item
                                // name="username"
                                label={<div className="color-242833 font-w-600 font-16">采购货币</div>}
                                rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="label"
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        }
                                    ]}
                                />
                            </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Card>

            
        </Scoped>
    )
}

export default LocationsCard;

const Scoped = styled.div`
    .border_solid{
        margin:20px 0;
        border-top:1px solid #eef1f6;
    }

`

