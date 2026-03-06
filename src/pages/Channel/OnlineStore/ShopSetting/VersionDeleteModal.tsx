import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Modal } from "antd";
import { useState } from "react";

function VersionDeleteModal({template}:{template: TemplateInstance | null}) {

    const [loading, setLoading] = useState(false);

    const languageName = JSON.parse(sessionStorage.getItem('languages') || "[]").find((lang:any)=>lang.id===template?.languages_id)?.name || "";

    const handleDelete = (newModal:any) => {
        setLoading(true);
        newModal.destroy();
        setLoading(false);

    };


    return <>
            <a style={{color:"#FF0000"}} onClick={()=>{
                const newModal = Modal.confirm({
                    title: "删除版本",
                    content: `确定要删除版本id为${template?.template_version_id}的${languageName}数据吗？`,
                    icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
                    centered: true,
                    okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
                    footer:()=>(
                        <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                            <DefaultButton loading={loading} text={"取消"} onClick={()=>newModal.destroy()} />
                            <DangerButton loading={loading} text={"确定"} onClick={()=>handleDelete(newModal)} />
                        </Flex>
                    )
                })
            }}>删除</a>
        
    </>
}


export default VersionDeleteModal;
