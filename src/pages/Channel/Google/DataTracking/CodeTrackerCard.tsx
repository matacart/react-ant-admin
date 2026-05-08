import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { ExportOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Modal, Radio, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";

function CodeTrackerCard() {


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
                    <div className="font-16 font-w-600">Google 跟踪代码管理器</div>
                    <div className="font-w-400 desc">无需修改网店代码也能轻易地将各种追踪代码以及第三方应用工具安装到网店中。</div>
                </div>
                <DefaultButton text="添加" onClick={() => setOpen(true)} />
            </Flex>

            {/*  */}
            <MyModal
                title="新增 Google 跟踪代码管理器 追踪事件"
                width={620}
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
                    <Form.Item label={<div className="font-w-500">选择追踪事件</div>} name="type" initialValue={1}>
                        <DefaultSelect
                            options={[
                                { 
                                    value: 1, 
                                    label: <div>顾客造访网店内的任何网页</div>
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label={null} name="ID">
                        <Flex justify="space-between" style={{marginBottom:"8px"}}>
                            <div className="font-w-500">容器 ID</div>
                            <div><a>如何获取?<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                        </Flex>
                        <DefaultInput placeholder="请输入容器 ID  (例如: GTM-N94GD7)" />
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

export default CodeTrackerCard;
