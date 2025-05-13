import SimpleCard from "@/components/Card/SimpleCard";
import navListStore from "@/store/channel/navList/navListStore";
import { Card, Form, FormInstance, Input } from "antd"
import { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components"

const TitleCard = forwardRef<FormInstance>((props, ref) => {

    const [form] = Form.useForm()

    useImperativeHandle(ref, () => form);

    const navForm = (
        <Form form={form} layout='vertical' className='product-form'>
            <Form.Item
                name="title"
                label={false}
                rules={[
                    { required: true, message: '标题不能为空' },
                    { max:280, message: '字符数不能超过280个字符' },
                ]}
            >
                <Input
                    showCount
                    maxLength={280}
                    onChange={(e) => {
                        navListStore.setNewCustomPage({
                            ...navListStore.newNavList,
                            title: e.target.value
                        })
                    }}
                    placeholder="请填写页面标题" />
            </Form.Item>
        </Form>
    )

    return (
        <Scoped>
            <SimpleCard title={<div>导航名称</div>} content={navForm} />
        </Scoped>
    )
})

export default TitleCard

const Scoped = styled.div`
`