import DefaultInput from "@/components/Input/DefaultInput";
import articles from "@/store/channel/articles/articles";
import { Card, Form, FormInstance } from "antd"
import { useEffect } from "react";
import styled from "styled-components"

const TitleCard = (props: { form: FormInstance }) => {

    const form = props.form;

    useEffect(() => {
        form.setFieldsValue({
            title: articles.articles.title
        })
    }, [articles.articles.title])

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
                        <DefaultInput
                            onChange={(e:any) => {
                                articles.setArticles({
                                    ...articles.articles,
                                    title: e.target.value
                                })
                            }}
                            placeholder="例如：可发部关于新产品的博客"
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default TitleCard

const Scoped = styled.div`
`