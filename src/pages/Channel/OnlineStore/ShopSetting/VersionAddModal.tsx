import { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { App, Flex, Form, Modal, Tooltip } from "antd";
import { useState } from "react";
import UploadCompressedFile from "./UploadCompressedFile";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { addVersion, updateVersion, uploadTemplate } from "@/services/y2/api";
import MyInput from "@/components/Input/MyInput";
import { QuestionCircleOutlined } from "@ant-design/icons";

function VersionAddModal({template}:{template: TemplateInstance | null}) {
  
    const { message } = App.useApp();

    const [file, setFile] = useState(null);

    const [form] = Form.useForm();
    
    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [status,setStatus] = useState("");

    const languageName = JSON.parse(sessionStorage.getItem('languages') || "[]").find((lang:any)=>lang.id===template?.languages_id)?.name || "";

    // 上传并导入--轮询查询进度
    const submit = ()=>{
        form.validateFields().then((values) => {
            if(file){
              setLoading(true)
              setStatus("inProgress")
              addVersion({
                theme_id: template?.template_id || "",
                languages_id: template?.languages_id || "",
                mode:"original",
                theme_package:file,
                version_name: values.version,
              }).then((res: any) => {
                message.success("上传成功", 1)
              }).catch((err: any) => {

              }).finally(() => {
                setStatus("");
                setFile(null);
                setLoading(false);
                setIsOpen(false)
              })
            }else{
              message.info("请选择文件");
            }
        })
    }

    const closeModal = ()=>{
        setIsOpen(false);
        setFile(null);
    }

    return <>
        <a onClick={() => {
          setIsOpen(true);
          form.resetFields();
        }}>新增</a>
        <Modal open={isOpen} width={620} title="上传模板" destroyOnHidden={true} centered onCancel={closeModal} closeIcon={true}
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
                        <DefaultButton loading={loading} text={"取消"} onClick={closeModal} />
                        <PrimaryButton loading={loading} text={"上传"} onClick={() => { submit() }} />
                    </Flex>
                  )}
              </Flex>
              </>
            )}
          >
            <div style={{padding:"10px 0px"}}>
                版本语言：{languageName}
                <Form form={form} layout="vertical" style={{marginTop:"10px"}}>
                  <Form.Item name="version" label={
                    <Flex>
                      版本号
                      <Tooltip title="例:v1.0.0">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                      </Tooltip>
                    </Flex>
                  } required={false} rules={[
                    { required: true, message: '请输入版本号' },
                    { 
                      pattern: /^v\d+\.\d+\.\d+$/, 
                      message: '请输入正确的版本号格式，例如 v1.0.0' 
                    }
                  ]}>
                    <MyInput style={{height:"36px"}} placeholder="请输入版本号" />
                  </Form.Item>
                </Form>
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


export default VersionAddModal;
