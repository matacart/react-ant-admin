import articles from "@/store/channel/website/articles";
import { Card, Form, FormInstance, Input } from "antd"
import { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components"

const TitleCard = forwardRef<FormInstance>((props, ref) => {

    const [form] = Form.useForm()

    useImperativeHandle(ref, () => form);

    return (
        <Scoped>
            <Card>
                <Form form={form} layout='vertical' className='product-form'>
                    <Form.Item
                        name="title"
                        label={<div className="font-w-600 font-16">标题</div>}
                        rules={[
                            { required: true, message: '请填写标题' },
                            { max:280, message: '字符数不能超过280个字符' },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                articles.setNewArticles({
                                    ...articles.newArticles,
                                    title: e.target.value
                                })
                            }}
                            placeholder="例如：可发部关于新产品的博客" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
})

export default TitleCard

const Scoped = styled.div`
`