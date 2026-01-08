import { Card, Form, FormInstance } from "antd"
import { useEffect } from "react";
import customPage from '@/store/channel/customPage/customPage';
import DefaultInput from "@/components/Input/DefaultInput";
import { observer } from "mobx-react-lite";

const TitleCard = (props: { form: FormInstance }) => {

    const { form } = props;

    useEffect(() => {
        form.setFieldsValue({
            title: customPage.customPage.title,
        })
    }, [customPage.customPage.title])

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
                            customPage.setCustomPage({
                                ...customPage.customPage,
                                title: e.target.value
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
