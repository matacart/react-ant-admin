import articles from "@/store/channel/website/articles";
import { Card, Form, Input } from "antd"
import styled from "styled-components"

export default function TitleCard(){
    return (
        <Scoped>
            <Card>
                <Form layout='vertical' className='product-form'>
                    <Form.Item
                        name="title"
                        initialValue={articles.oldArticles.title}
                        label={<div className="font-w-600 font-16">标题</div>}
                        rules={[
                            { required: true, message: '请填写标题' },
                            { max:280, message: '字符数不能超过280个字符' },
                        ]}
                    >
                        <Input
                            // value={articles.oldArticles.title}
                            onChange={(e) => {
                                articles.setOldArticles({
                                    ...articles.oldArticles,
                                    title: e.target.value
                                })
                            }}
                            placeholder="例如：可发部关于新产品的博客" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
`