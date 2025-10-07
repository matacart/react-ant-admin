import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { EditIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { RenameFile } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { Flex, Form, message, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";


interface RenameModalType{
    treeData:any[],
    setTreeData:any,
    filePath:string,
    name:string,
    item:any,
}

function RenameModal({filePath,name,item,treeData,setTreeData}:RenameModalType){

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    // 根据父路径和子节点key更新树数据
    const updateTreeNodeByPath = (nodes: any[], parentPath: string, targetKey: string, newName: string): any[] => {
        return nodes.map((node: any) => {
            // 检查当前节点是否为父路径节点
            // 例如：parentPath = "templates/customers"，node.key = "templates/page.contact.json-0"
            // 需要判断 parentPath 是否以 node.key 的前缀开头
            const nodePath = node.key.slice(0,node.key.lastIndexOf('-')); // 提取路径部分
            const isParentNode = parentPath.startsWith(nodePath) || nodePath.startsWith(parentPath);
            if (node.children) {
                // 如果是父节点或者父路径匹配当前节点，则更新其子节点
                if (isParentNode) {
                    // 更新子节点
                    const updatedChildren = node.children.map((child: any) => {
                        if (child.key === targetKey) {
                            return { ...child, title: newName };
                        }
                        // 递归处理子节点的子节点
                        if (child.children) {
                            const deepUpdated = updateTreeNodeByPath([child], parentPath, targetKey, newName);
                            return deepUpdated[0];
                        }
                        return child;
                    });
                    
                    return {
                        ...node,
                        children: updatedChildren
                    };
                } else {
                    // 如果不是父节点，则递归处理子节点
                    return {
                        ...node,
                        children: updateTreeNodeByPath(node.children, parentPath, targetKey, newName)
                    };
                }
            }
            return node;
        });
    };


    const submit = ()=>{
        form.validateFields().then((values:any)=>{
            setLoading(true);
            RenameFile({
                templateId: codeEditor.templateInfo?.id??"",
                languagesId: codeEditor.languageId??"",
                mode: codeEditor.mode,
                oldFileName: filePath+"/"+ (name??""),
                newFileName: filePath+"/"+ (values.templateName || (name??""))
            }).then(res=>{
                if(res.code == 0){
                    // 修改setFileList对应的文件名
                    const newTreeData = updateTreeNodeByPath(treeData, filePath, item.key, values.templateName);
                    setTreeData(newTreeData)
                    const newOpenFileList = codeEditor.openFileList.map((openFileItem:any)=>{
                        if(openFileItem.key == item.key){
                            return{
                                ...openFileItem,
                                title: values.templateName
                            }
                        }
                        return openFileItem;
                    })
                    codeEditor.setOpenFileList(newOpenFileList)
                }
                setOpen(false);
            }).catch(()=>{
                message.error("error");
            }).finally(()=>{
                setLoading(false); 
            })
        }).catch(()=>{
            // 表单未通过
        })
    }

    return (
        <>
            <Tooltip title="重命名">
                <EditIcon className="font-16" onClick={()=>{
                    setOpen(true);
                    form.setFieldValue("templateName",name);
                }} />
            </Tooltip>
            {/*  */}
            <Modal
                open={open}
                width={"480px"}
                title="重命名模版"
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
                        label="模版名称"
                        name="templateName"
                        required={false}
                        rules={[{ required: true, message: '请输入模版名称' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入模版名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default RenameModal;