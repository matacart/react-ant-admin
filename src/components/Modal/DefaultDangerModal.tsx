import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Flex, Modal } from "antd";
import styled from "styled-components";
import DefaultButton from "../Button/DefaultButton";
import DangerButton from "../Button/DangerButton";
import { useIntl } from "@umijs/max";
import { ReactNode, useState } from "react";


interface ModalProps {
  removeFunc: () => void;
  title: string;
  tElement: ReactNode;
  cancelText:string;
  okText: string;
  content?: ReactNode;
  loading?: boolean;
}

// 删除 弹窗提示
export default function DefaultDangerModal({removeFunc,title,content,tElement,okText,cancelText,loading}:ModalProps){

    const intl = useIntl();

    const [open, setOpen] = useState(false);

    const cancel = () => {
        setOpen(false);
    }

    const confirm = () => {
        setOpen(false);
        removeFunc();
    };

    return (
        <>
            <div onClick={()=>setOpen(true)}>{tElement}</div>
            <Modal
                centered={true}
                open={open}
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} onClick={cancel} text={cancelText}></DefaultButton>
                    <DangerButton loading={loading} onClick={confirm} text={okText}></DangerButton>
                </Flex>}
            >
                <Flex align="center" gap={8}>
                    <ExclamationCircleFilled className="color-F86140 font-24" />
                    <div className="font-16 font-w-500">{title}</div>
                </Flex>
                <div style={{margin:"12px 0px 24px 32px"}}>{content}</div>
            </Modal>
        </>
    )
}