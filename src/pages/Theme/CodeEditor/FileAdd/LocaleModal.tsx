import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { useSleep } from "@/hooks/customHooks";
import { addTemplateFile, RenameFile } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { insertFileInTree } from "@/utils/dataStructure";
import { Flex, Form, message, Modal, Radio, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

interface LocaleModalType{
    treeData:any[],
    setTreeData:any,
    filePath:string,
}

function LocaleModal({filePath,treeData,setTreeData}:LocaleModalType){

    const sleep = useSleep();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [options,setOptions] = useState<any[]>([]);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values:any)=>{
            const fileType = "json";
            // 来源文件在layout下的路径
            const fileSource = values.source.slice((values.source.indexOf('/')+1),values.source.lastIndexOf('.'));
            setLoading(true);
            addTemplateFile({
                templateId: codeEditor.templateInfo?.id??"",
                languagesId: codeEditor.languageId??"",
                mode: codeEditor.mode,
                fileName: filePath+"/"+fileSource+"."+values.name+"."+fileType,
                fileContent: "",
                sourceFileName: filePath+"/"+fileSource+"."+fileType,
            }).then(async res=>{
                if(res.code == 0){
                    // 确定新文件应该插入的位置
                    const sourcePath = fileSource.substring(0,fileSource.lastIndexOf('/'))?fileSource.substring(0,fileSource.lastIndexOf('/'))+"/"+values.name:values.name;
                    // 来源文件树
                    const {newTreeData,level} = insertFileInTree(treeData,(fileSource+"."+values.name),fileType,(fileSource+'.'+sourcePath),"locales");
                    setTreeData(newTreeData)
                    const newTitle = values.name.split("/").length>1 ? values.name.split("/").pop():(fileSource+"."+values.name);
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
                            key: filePath+"/"+fileSource+"."+values.name+"."+fileType+"-"+level,
                            languagesId: codeEditor.languageId??"2",
                            loaded: false,
                            loading: false,
                            mode: codeEditor.mode,
                            pos: "0-0-"+codeEditor.openFileList.length,
                            selected: false,
                            title: newTitle+"."+fileType,
                            url: filePath+"/"+fileSource+"."+values.name+"."+fileType,
                        }
                    ])
                    // 激活文件
                    codeEditor.setActiveFileKey(filePath+"/"+fileSource+"."+values.name+"."+fileType+"-"+level);
                    setOpen(false);
                    form.resetFields();
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



    useEffect(()=>{
        console.log(treeData)
        const newOptions = treeData.filter(treeItem=>treeItem.title == "locales")[0].children.map((childItem:any)=>{
            if(childItem.type){
                return
            }
            return{
                label: childItem.title,
                value: childItem.key,
            }
        }).filter((res:any)=>res);
        setOptions(newOptions)
    },[])

    return (
        <Scoped>
            <Flex className="add color-356DFF" onClick={()=>setOpen(true)}>新建locale</Flex>
            {/*  */}
            <Modal
                open={open}
                width={"480px"}
                title="添加新的locale"
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
                        label="新增locale至"
                        name="source"
                        required={false}
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <MySelect style={{height:"36px"}} placeholder="来源" options={options} onChange={(value:string,option:any)=>{
                            
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="将其命名为"
                        name="name"
                        required={false}
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入名称" suffix={<span className="color-7A8499">.json</span>} />
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

export default LocaleModal;