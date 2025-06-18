import MyAlert from "@/components/Alert/MyAlert";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { ReductionIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderIdNumber } from "@/services/y2/api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Flex, Form, Input, Modal, Row, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function SubscribeEdit(){

    const [open, setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const submit = ()=>{
        // 更新订单数据
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            <span className="cursor-pointer color-356DFF" onClick={() => setOpen(true)}>编辑</span>
            <MyModal title={<div>编辑订阅状态</div>} width={620} centered open={open} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <>
                    <MyAlert message="为客户订阅您的营销电子邮件或者营销短信前，您应先征得客户的同意。" showIcon type="info" style={{
                        marginTop:"20px",
                        height:"38px",
                        // backgroundColor:"#FFEDC9"
                    }} />
                    <div style={{marginTop:"20px"}}>
                        <h4 className="font-w-600">电子邮件订阅状态</h4>
                        <Checkbox>为客户订阅营销电子邮件</Checkbox>
                    </div>
                    <div style={{marginTop:"36px",marginBottom:"20px"}}>
                        <h4 className="font-w-600">短信订阅状态</h4>
                        <Checkbox>为客户订阅营销短信</Checkbox>
                    </div>
                </>
            </MyModal>
        </>
    )
}


const MyModal = styled(Modal)`
    .ant-form-item{
        margin-bottom: 0;
    }
`



export default SubscribeEdit