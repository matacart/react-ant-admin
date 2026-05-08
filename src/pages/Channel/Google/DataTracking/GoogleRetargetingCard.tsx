import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import { ExportOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Modal, Radio } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

function GoogleRetargetingCard() {


    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const confirm = () => {
        // setOpen(false);
    }

    const cancel = () => {
        setOpen(false);
    }

    

    return (
        <MyCard>
            <Flex justify="space-between">
                <div>
                    <div className="font-16 font-w-600">Google 再营销</div>
                    <div className="font-w-400 desc">加入再营销代码后，浏览过您网店的客户会被加到再营销名单内。</div>
                </div>
                <DefaultButton text="添加" onClick={() => setOpen(true)} />
            </Flex>

            {/*  */}
            <MyModal
                title="添加 Google 再营销追踪"
                open={open}
                centered={true}
                onCancel={cancel}
                footer={()=>(
                    <Flex justify="flex-end" gap={12}>
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton text="确定" onClick={confirm} />
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="form">
                    <Form.Item label={null} name="ID">
                        <Flex justify="space-between" style={{marginBottom:"8px"}}>
                            <div className="font-w-500">转化 ID</div>
                            <div><a>如何获取?<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                        </Flex>
                        <DefaultInput placeholder="请输入转化 ID  (例如: 123456789)" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-500">再营销类型</div>} name="type" initialValue={1}>
                        <Radio.Group
                            style={style}
                            options={[
                                { value: 1, label: <div>
                                    <div>标准再营销</div>
                                    <div>仅收集一般性网站访问数据，以向您的网站访问者展示广告。</div>
                                </div> },
                                { value: 2, label: <div>
                                    <div>动态再营销</div>
                                    <div>仅收集一般性网站访问数据，以向您的网站访问者展示广告。</div>
                                </div> },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </MyModal>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .desc{
        margin-top: 4px;
    }
    
`

const MyModal = styled(Modal)`
    .form{
        margin-top: 20px;
        .ant-radio{
            align-self: flex-start;
            position: relative;
            top: 3px;
        }
    }
`

export default GoogleRetargetingCard;
