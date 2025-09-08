import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import { SuccessIcon } from "@/components/Icons/Icons"
import { Modal, Flex, Checkbox, App, message } from "antd"
import { useEffect, useRef, useState } from "react"
import UploadCompressedFile from "./UploadCompressedFile"
import axios from "axios"
import { useSleep } from "@/hooks/customHooks"
import { uploadTemplate } from "@/services/y2/api"
function UploadTemplateModal() {

    const [file, setFile] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [status,setStatus] = useState("")

    const sleep = useSleep();

    // 上传并导入--轮询查询进度
    const UploadImport = (file:File)=>{
      setLoading(true)
      setStatus("inProgress")
      // uploadTemplate({
      //   zip_file:file
      // }).then(res=>{
      //   console.log(res)
      // })
      // let formData = new FormData()
      // formData.append("zip_file", file)
      uploadTemplate(file).then((res: any) => {
        message.success("上传成功", 1)
      }).catch((err: any) => {

      }).finally(() => {
        setStatus("");
        setFile(null);
        setLoading(false);
        setIsOpen(false)
      })
      // axios.post('/api/ApiTemplate/template_upload',formData).then(async (res: any) => {
      //   if(res.data.code == 0){
      //     message.success("上传成功", 1)
      //     // setFileList([...fileList,{
      //     //   uid:(fileList.length).toString(),
      //     //   name: res.data.data.src.toString(),
      //     //   status: 'done',
      //     //   url:res.data.data.src.toString(),
      //     // }]);
      //     // product.setProductInfo(
      //     //   {
      //     //     ...product.productInfo,
      //     //     additional_image:[...product.productInfo.additional_image,res.data.data.src.toString()]
      //     //   }
      //     // )
      //   }else{
      //     message.error("上传失败", 1)
      //   }
      // }).catch((err: any) => {
      // }).finally(() => {
       
      // })
    }

    const closeModal = ()=>{
        setIsOpen(false);
        setFile(null);
    }
    return (<>
        <a onClick={()=>setIsOpen(true)}>上传模板</a>
        <Modal open={isOpen} width={620} title="上传模板" destroyOnClose={true} centered onCancel={closeModal}
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
        
    )

}

export default UploadTemplateModal
{/* 本地导入 */}
