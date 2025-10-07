import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import { useSleep } from "@/hooks/customHooks";
import { addTemplateFile } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { insertFileInTree } from "@/utils/dataStructure";
import { Flex, Form, message, Modal, Radio } from "antd";
import { useState } from "react";
import styled from "styled-components";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

interface LayoutModalType{
    treeData:any[],
    setTreeData:any,
    filePath:string,
}

function SectionModal({treeData,setTreeData,filePath}:LayoutModalType){

    const sleep = useSleep();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [fileType,setFileType] = useState(1);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values:any)=>{
            setLoading(true);
            let fileType,fileContent;
            if(values.fileType == 1){
                fileType = "html"
                fileContent = "{{#schema}}\n{\n  \"name\": \"Section name\",\n  \"settings\": []\n}\n{{/schema}}"
            }else{
                fileType = "json"
                fileContent = "{\n    \"type\": \"header\",\n    \"name\": \"Group name\",\n    \"sections\": {},\n    \"order\": []\n}"
            }
            addTemplateFile({
                templateId: codeEditor.templateInfo?.id??"",
                languagesId: codeEditor.languageId??"",
                mode: codeEditor.mode,
                fileName: filePath+"/"+values.name+"."+fileType,
                fileContent: fileContent,
            }).then(async res=>{
                if(res.code == 0){
                    // 在树中插入文件
                    const {newTreeData,level} = insertFileInTree(treeData, values.name, fileType, values.name,filePath);
                    await setTreeData(newTreeData);
                    await codeEditor.setOpenFileList([
                        ...codeEditor.openFileList,
                        {
                            active: false,
                            checked: false,
                            children: undefined,
                            dragOver: false,
                            dragOverGapBottom: false,
                            dragOverGapTop: false,
                            expanded: false,
                            fileType: fileType,
                            halfChecked: false,
                            key: filePath+"/"+values.name+"."+fileType+"-"+level,
                            languagesId: codeEditor.languageId??"2",
                            loaded: false,
                            loading: false,
                            mode: codeEditor.mode,
                            pos: "0-0-"+codeEditor.openFileList.length,
                            selected: false,
                            title: values.name.split("/").pop()+"."+fileType,
                            url: filePath+"/"+values.name+"."+fileType,
                        }
                    ])
                    // 激活文件
                    codeEditor.setActiveFileKey(filePath+"/"+values.name+"."+fileType+"-"+level);
                    setOpen(false);
                    form.resetFields();
                    setFileType(1);
                }else{
                    message.error(res.msg);
                }
            }).catch(()=>{
            }).finally(()=>{
                setLoading(false); 
            })
        }).catch(()=>{
            // 表单未通过
        })
    }

    return (
        <Scoped>
            <Flex className="add color-356DFF" onClick={()=>setOpen(true)}>新建section</Flex>
            {/*  */}
            <Modal
                open={open}
                width={"480px"}
                title="添加新的section"
                centered
                onCancel={()=>setOpen(false)}
                footer = {
                    <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                        <DefaultButton text="取消" onClick={()=>setOpen(false)} />
                        <PrimaryButton text="完成" loading={loading} onClick={submit} />
                    </Flex>
                }
            >
                <Form form={form} layout="vertical" style={{margin:"24px 0"}}>
                    <Form.Item
                        label="创建一个新的section，将其命名为"
                        name="name"
                        required={false}
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入名称" suffix={fileType == 1 ? <span className="color-7A8499">.html</span>:<span className="color-7A8499">.json</span>} />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="fileType"
                        initialValue={1}
                    >
                        <Radio.Group
                            style={style}
                            onChange={(e)=>{
                                setFileType(e.target.value)
                            }}
                            options={[
                                { value: 1, label: 'html' },
                                { value: 2, label: 'json' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .add{
        &:hover{
            text-decoration: underline;
        }
    }
`

export default SectionModal;