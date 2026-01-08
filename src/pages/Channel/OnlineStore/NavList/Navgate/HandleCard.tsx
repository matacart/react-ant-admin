import DefaultInput from "@/components/Input/DefaultInput";
import { ExportOutlined } from "@ant-design/icons";
import { Card, Form, FormInstance } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";


const HandleCard = forwardRef<FormInstance>((props, ref) => {

    const [form] = Form.useForm()

    useImperativeHandle(ref, () => form);

    return (
        <Scoped>
            <Card>
                <div className="title">
                    Handle
                </div>
                <p className="font-12 color-7A8499">
                    handle 用于引用菜单导航中的菜单。例如，菜单标题为“Main menu”，其默认 handle 为 main-menu。
                </p>
                <div style={{marginBottom:"12px"}}>
                    <a>了解更多 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a>
                </div>
                <Form form={form} layout='vertical' className='product-form'>
                    <Form.Item
                        name="handle"
                        label={false}
                    >
                        <DefaultInput
                            showCount
                            maxLength={280}
                            placeholder="请填写页面标题"
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
})

export default HandleCard;

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px
}
`