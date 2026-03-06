import { Card, Form, FormInstance } from "antd"
import { useEffect } from "react";
import DefaultInput from "@/components/Input/DefaultInput";
import { observer } from "mobx-react-lite";
import blogs from "@/store/channel/blogs/blogs";

const TitleCard = (props: { form: FormInstance }) => {

    const { form } = props;

    useEffect(() => {
        form.setFieldsValue({
            title: blogs.blogs.category_name,
        })
    }, [blogs.blogs.category_name])

    return (
        <Card>
            <Form form={form} layout='vertical' className='product-form'>
                <Form.Item
                    name="title"
                    label={<div className="font-w-600 font-16">页面标题</div>}
                    rules={[
                        { required: true, message: '标题不能为空' },
                        { max:280, message: '字符数不能超过280个字符' },
                    ]}
                >
                    <DefaultInput
                        onChange={(e:any) => {
                            blogs.setBlogs({
                                ...blogs.blogs,
                                category_name: e.target.value
                            })
                        }}
                        placeholder="请填写页面标题"
                    />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default observer(TitleCard)
