import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import MyInput from "@/components/Input/MyInput"
import { Card, Flex, Form, Modal } from "antd"
import { useState } from "react"
import styled from "styled-components"

function WebsiteCard() {

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const cancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const submit = ()=>{
        form.validateFields().then(res=>{
            console.log(res);
        }).catch(err=>{
            // console.log(err);
        })
    }


    return (
        <MyCard>
            <Flex justify="space-between" align="center">
                <div>
                    <div className="font-16 font-w-500 title">网域验证</div>
                    <div className="font-14 color-474F5E desc line-h-20">验证您的在线店铺域名可帮助您完成数据上报及商品同步。</div>
                </div>
                <div>
                    <PrimaryButton text="添加验证" onClick={()=>setOpen(true)} />
                </div>
            </Flex>


            {/*  */}
            <Modal
                open={open}
                title="Meta 标记"
                centered
                onCancel={cancel}
                footer={()=>(
                    <Flex gap={12} justify="flex-end">
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton text="添加" onClick={submit} />
                    </Flex>
                )}
            >
                <Form form={form}>
                    <div className="font-12 color-242833" style={{marginBottom:"8px"}}>粘贴您的 Meta 标签的 Verification Code  到下方栏位，即可自动添加声明代码。</div>
                    <Form.Item
                        label={false}
                        name="metaTag"
                        required={false}
                        rules={[{ required: true, message: '请输入Verification Code' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入Verification Code" />
                    </Form.Item>
                </Form>
            </Modal>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
`


export default WebsiteCard