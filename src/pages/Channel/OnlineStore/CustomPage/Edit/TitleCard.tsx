import { Card, Form, FormInstance, Input } from "antd"
import { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components"
import customPage from '@/store/channel/customPage/customPage';

const TitleCard = forwardRef<FormInstance>((props, ref) => {

    const [form] = Form.useForm()

    useImperativeHandle(ref, () => form);

    return (
        <Scoped>
            <Card>
                <Form form={form} layout='vertical' className='product-form'>
                    <Form.Item
                        name="title"
                        initialValue={customPage.oldCustomPage.title}
                        label={<div className="font-w-600 font-16">页面标题</div>}
                        rules={[
                            { required: true, message: '标题不能为空' },
                            { max:280, message: '字符数不能超过280个字符' },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                customPage.setNewCustomPage({
                                    ...customPage.newCustomPage,
                                    title: e.target.value
                                })
                            }}
                            placeholder="请填写页面标题" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
})

export default TitleCard

const Scoped = styled.div`
`