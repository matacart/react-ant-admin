import { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { Flex, message, Modal } from "antd";
import { useState } from "react";
import UploadCompressedFile from "./UploadCompressedFile";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { updateVersion } from "@/services/y2/api";

function VersionRepairModal({template}:{template: TemplateInstance | null}) {

    const languageName = JSON.parse(sessionStorage.getItem('languages') || "[]").find((lang:any)=>lang.id===template?.languages_id)?.name || "";

    const [file, setFile] = useState(null);
    
    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [status,setStatus] = useState("");

    // 上传并导入--轮询查询进度
    const UploadImport = (file:File)=>{
      setLoading(true)
      setStatus("inProgress")
      updateVersion({
        theme_id: template?.template_id || "",
        languages_id: template?.languages_id || "",
        mode:"auto",
        theme_package:file,
        version_id: template?.template_version_id || "",
      }).then((res: any) => {
        message.success("上传成功", 1)
      }).catch((err: any) => {

      }).finally(() => {
        setStatus("");
        setFile(null);
        setLoading(false);
        setIsOpen(false)
      })
    }

    const closeModal = ()=>{
        setIsOpen(false);
        setFile(null);
    }

    return <>
        <a onClick={() => setIsOpen(true)}>修复</a>
        <Modal open={isOpen} width={620} title="更新模板" destroyOnClose={true} centered onCancel={closeModal}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <Flex justify='flex-end' align='center'>
                  {status == "inProgress"?(
                    <Flex gap={12}>
                        <DefaultButton text={"后台运行"} onClick={()=>{
                            setFile(null)
                            setIsOpen(false)
                        }} />
                        <PrimaryButton text={"导入中"} loading={true} />
                    </Flex>
                  ):(
                    <Flex gap={12}>
                        <DefaultButton text={"取消"} onClick={closeModal} />
                        <PrimaryButton loading={loading} text={"上传"} onClick={() => { file && UploadImport(file) }} />
                    </Flex>
                  )}
              </Flex>
              </>
            )}
          >
            <div style={{padding:"10px 0px"}}>
                <div>版本语言：{languageName}</div>
                <div style={{margin:"8px 0px"}}>版本id：{template?.template_version_id}</div>
                <div style={{margin:"8px 0px"}}>
                    {status == "inProgress" ? <>
                    正上传文件，完成此过程可能需要一段时间。
                    </>:<>
                        上传MATACART的模板.zip文件，完成后将自动在模板库中展示。上传的模板不会自动发布。
                    </>}
                </div>
                    <div>
                        <UploadCompressedFile size={50} file={file} setFile={setFile} status={status} />
                    </div>
                    <div style={{margin:"8px 0px"}}>支持.zip格式文件，大小不能超过50M</div>
                </div>
        </Modal>
    </>
}


export default VersionRepairModal;
