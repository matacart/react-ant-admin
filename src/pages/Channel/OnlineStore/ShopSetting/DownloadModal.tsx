import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { downloadTemplate } from "@/services/y2/api";
import { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Form, message, Modal } from "antd";
import styled from "styled-components";

function DownloadModal({template}:{template:TemplateInstance | null}){

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        const modalInstance = modal.info({
            centered: true,
            title: '下载代码',
            icon: <ExclamationCircleFilled  />,
            content: '您的模板代码文件将通过链接下载至本地，点击确认开始下载。',
            okText: '确认',
            cancelText: '取消',
            footer:()=>{
                return (
                    <Flex justify="flex-end" gap={8}>
                        <DefaultButton onClick={() => modalInstance.destroy()} text={"取消"} />
                        <PrimaryButton type="primary" onClick={()=>{
                            downloadTemplate(template?.id ?? "").then(res=>{
                                console.log(res)
                            }).catch((err)=>{
                                console.log(err)
                                message.error("下载失败")
                            }).finally(()=>{
                                modalInstance.destroy()
                            })
                        }} text={"确认"} />
                    </Flex>
                )
            }
        });
    };

    return (
        <>
            <Scoped onClick={confirm}>下载代码</Scoped>
            {contextHolder}
        </>
    )
}

const Scoped = styled.a`
    

`

export default DownloadModal;