import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { addTemplateFile, RenameFile, templateFileUpload } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { insertFileInTree } from "@/utils/dataStructure";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, message, Modal, Radio, Select, Space, Tabs, TabsProps, Tooltip, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
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

function AssetsModal({filePath,treeData,setTreeData}:LayoutModalType){

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [activeKey,setActiveKey] = useState("1");

    const [form] = Form.useForm();

    // 文件
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const props: UploadProps = {
        maxCount:1,
        onRemove: (file) => {
          setFileList([]);
        },
        beforeUpload: (file) => {
          setFileList([file]);
          return false;
        },
        fileList,
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '上传文件',
            children: <>
                <Upload {...props}>
                    <DefaultButton text="上传文件" icon={<UploadOutlined />} />
                </Upload>
                <div style={{margin:"4px 0 20px 0"}} className="color-7A8499">支持css、js、json、html、图片、视频和字体，大小不超过5MB</div>
            </>,
        },
        {
            key: '2',
            label: '创建空白文件',
            children: <>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="将其命名为"
                        required={false}
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <Space.Compact style={{width:"100%"}}>
                            <Form.Item
                                name="name"
                                style={{width:"80%"}}
                                required={false}
                                rules={[{ required: true, message: '请输入名称' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="请输入名称" />
                            </Form.Item>
                            <Form.Item
                                name="type"
                                style={{width:"20%"}}
                                initialValue={"html"}
                            >
                                <MySelect style={{height:"36px"}} options={[
                                    {
                                        label: '.html',
                                        value: 'html',
                                    },
                                    {
                                        label: '.css',
                                        value: 'css',
                                    },
                                    {
                                        label: '.js',
                                        value: 'js',
                                    },
                                ]}/>
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </>,
        },
    ];

    const submit = ()=>{
        // 上传文件
        if(activeKey == "1"){
            if(fileList.length == 0){
                message.info("请添加文件");
            }else{
                const file = fileList[0];
                const fileType = file.type?.split("/").pop();
                const level = 1;
                setLoading(true);
                templateFileUpload({
                    fileId:"",
                    fileName: "assets"+"/"+file.name,
                    file: file,
                    mode:codeEditor.mode,
                    templateId:codeEditor.templateInfo?.id??"", 
                    languagesId:codeEditor.languageId??"2",
                }).then(async res=>{
                    if(res.code == 0){
                        // 在树中插入文件
                        const newTreeData = treeData.map(item=>{
                            if(item.title == filePath){
                                return {
                                    ...item,
                                    children:[
                                        ...item.children,
                                        {
                                            title: file.name,
                                            key: filePath + "/" + file.name + "-1",
                                            children: undefined,
                                            level: 1,
                                            fileType: fileType,
                                        }
                                    ]
                                }
                            }
                            return item;
                        })
                        setTreeData(newTreeData);
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
                                key: filePath+"/"+file.name+"-"+level,
                                languagesId: codeEditor.languageId??"2",
                                loaded: false,
                                loading: false,
                                mode: codeEditor.mode,
                                pos: "0-0-"+codeEditor.openFileList.length,
                                selected: false,
                                title: file.name,
                                url: filePath+"/"+file.name,
                            }
                        ])
                        // 激活文件
                        codeEditor.setActiveFileKey(filePath+"/"+file.name+"-"+level);
                        setOpen(false);
                        setFileList([]);
                    }else{
                        message.error(res.msg)
                    }
                }).catch(err=>{
                }).finally(()=>{
                    setLoading(false);
                });
            }
        }
        if(activeKey == "2"){
            // 添加文件
            form.validateFields().then((values:any)=>{
                setLoading(true);
                const fileType = values.type;
                addTemplateFile({
                    templateId: codeEditor.templateInfo?.id??"",
                    languagesId: codeEditor.languageId??"",
                    mode: codeEditor.mode,
                    fileName: filePath+"/"+values.name+"."+fileType,
                    fileContent:"",
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
    }

    return (
        <Scoped>
            <Flex className="add color-356DFF" onClick={()=>setOpen(true)}>新建asset</Flex>
            {/*  */}
            <Modal
                open={open}
                width={"480px"}
                title="添加新的asset"
                centered
                onCancel={()=>setOpen(false)}
                footer = {
                    <Flex gap={12} justify="flex-end" style={{marginTop:"12px"}}>
                        <DefaultButton text="取消" onClick={()=>setOpen(false)} />
                        <PrimaryButton text="完成" loading={loading} onClick={submit} />
                    </Flex>
                }
            >
                <Tabs activeKey={activeKey} items={items} onChange={(key)=>setActiveKey(key)} />
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

export default AssetsModal;