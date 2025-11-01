import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Modal } from "antd";
import styled from "styled-components";
import DefaultButton from "../Button/DefaultButton";
import DangerButton from "../Button/DangerButton";
import { useIntl } from "@umijs/max";


interface ModalProps {
  removeFunc: () => void;
  title: string;
  content: any;
  okText?: string;
  cancelText?:string;
  tElement: any;
  loading?: boolean;
}

// 删除 弹窗提示
export default function DeleteModal({removeFunc,title,content,okText,tElement,loading}:ModalProps){

    const intl = useIntl();

    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        const newModal = modal.confirm({
            title: title,
            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
            content: content,
            centered: true,
            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
            footer:()=>(
                <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                    <DefaultButton text={intl.formatMessage({id:'component.modal.deleteModal.cancelText'})} autoInsertSpace={false} onClick={()=>newModal.destroy()} />
                    <DangerButton text={intl.formatMessage({id:'component.modal.deleteModal.okText'})} loading={loading} autoInsertSpace={false} onClick={async ()=>{
                        removeFunc();
                        newModal.destroy();
                    }} />
                </Flex>
            )
        });
    };
    return (
        // 阻止父组件事件传递
        <Scoped className="delete_modal" onClick={(e)=>e.stopPropagation()}>
            <span onClick={()=>confirm()}>{tElement}</span>
            {contextHolder}
        </Scoped>
    )
}

const Scoped = styled.div`
    
`