import TinyMce from "@/components/MCE/TinyMce";
import articles from "@/store/channel/website/articles";
import { Card, Form, Input } from "antd"
import styled from "styled-components"

export default function ContentCard(){

    const setContent = (content: string) => {
        articles.setOldArticles({...articles.oldArticles, content})
    }

    return (
        <Scoped>
            <Card title="内容">
                <Form layout='vertical' className='product-form'>
                    <Form.Item
                        // name="title"
                        label={<div className="font-w-600 font-16">摘要</div>}
                    >
                        <Input
                            defaultValue={articles.oldArticles.abstract}
                            onChange={(e) => {
                                articles.setOldArticles({
                                    ...articles.oldArticles,
                                    abstract: e.target.value
                                })
                            }}
                            placeholder="简单的文字介绍，展示在博客集页面" />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label={<div className="font-w-600 font-16">正文</div>}
                    >
                        <TinyMce content={articles.oldArticles.content} setContent={setContent} />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
`