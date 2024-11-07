import oldStore from "@/store/oldStore";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Tooltip } from "antd";
import styled from "styled-components";

export default function CustomsDeclarationEdit() {
    return (
        <Scoped>
            <Card title="海关信息">
                <Form layout="vertical">
                    <Form.Item 
                    required
                    label={
                        <>
                            发货国家/地区
                            <Tooltip title="这里是关于用户名的额外信息">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </>
                    }>
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            value={oldStore.notion}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                                {
                                    value: '3',
                                    label: 'Communicated',
                                },
                                {
                                    value: '4',
                                    label: 'Identified',
                                },
                                {
                                    value: '5',
                                    label: 'Resolved',
                                },
                                {
                                    value: '6',
                                    label: 'Cancelled',
                                },
                                {
                                    value: '0',
                                    label: '未设置'
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                    required                    
                    label="HS(协调制度) 代码">
                        <Input value={oldStore.HSCode} placeholder="请输入HS编码" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
.ant{
    &-card{
        &-head-title{
            font-weight: 400;
        }
        &-body{
            padding-bottom: 0;
        }
        label{
            font-weight: 600;
        }
    }
    &-checkbox-wrapper{
        span{
            font-weight: 400;
        }
    }
    &-input{
            width: 100%;
            height: 36px;
    }
    &-select{
        width: 100%;
        height: 36px;
    }
}
`