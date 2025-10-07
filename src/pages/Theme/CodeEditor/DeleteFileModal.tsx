import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { DeleteIcon } from "@/components/Icons/Icons";
import { deleteTemplateFile } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Flex, message, Modal, Tooltip } from "antd";
import modal from "antd/es/modal";
import { useEffect, useState } from "react";

interface DelModalType{
    treeData:any[],
    setTreeData:any,
    filePath:string,
    name:string,
    item:any,
}

function DeleteFileModal({filePath,name,item,treeData,setTreeData}:DelModalType){

    const [loading, setLoading] = useState(false);

    // 递归函数：从树中删除指定节点
    const removeNodeFromTree = (nodes: any[], targetKey: string): any[] => {
        return nodes.map(node => {
            // 如果当前节点就是要删除的节点，且没有子节点，则不包含在结果中
            if (node.key === targetKey && !node.children) {
                return null;
            }
            
            // 如果有子节点，则递归处理子节点
            if (node.children) {
                const newChildren = removeNodeFromTree(node.children, targetKey);
                // 过滤掉null值
                const filteredChildren = newChildren.filter(child => child !== null);
                // 如果过滤后子节点为空，且当前节点不是根节点，则也将当前节点标记为删除
                if (filteredChildren.length === 0) {
                    return null;
                }
                return { ...node, children: filteredChildren };
            }
            
            return node;
        }).filter(node => node !== null); // 过滤掉标记为null的节点
    };

    return (
        <>
            <Tooltip title="重命名">
                <DeleteIcon className="font-16" onClick={()=>{
                    const myModal = modal.confirm({
                        title: '删除文件',
                        centered: true,
                        icon: <ExclamationCircleOutlined />,
                        content: <div style={{marginBottom:"20px"}}>您是否确定要删除 layout/password.html ？此操作无法撤销！</div>,
                        footer: [
                            <Flex gap={12} justify="flex-end">
                                <DefaultButton key="cancel" onClick={() => { myModal.destroy(); } } text={"取消"} />
                                <PrimaryButton key="submit" loading={loading} text={"确定"} onClick={()=>{
                                    setLoading(true);
                                    deleteTemplateFile({
                                        templateId: codeEditor.templateInfo?.id??"",
                                        languagesId: codeEditor.languageId??"",
                                        mode: codeEditor.mode,
                                        fileName: filePath+"/"+name,
                                        forceDelete:false,
                                    }).then(res=>{
                                        if(res.code == 0){
                                            // 将该节点移除
                                            const newTreeData = removeNodeFromTree(treeData, item.key);
                                            setTreeData(newTreeData);
                                            // 移除激活文件
                                            const newOpenFileList = codeEditor.openFileList.filter((file: any) => file.key !== item.key);
                                            // 如果删除的是当前激活的文件，则需要将activeFileKey前移或设置为其他文件
                                            if (codeEditor.activeFileKey === item.key) {
                                                // 查找当前删除文件在打开文件列表中的索引
                                                const currentIndex = codeEditor.openFileList.findIndex((f: any) => f.key === item.key);
                                                // 如果有前一个文件，则激活前一个文件
                                                if (newOpenFileList[currentIndex - 1]?.key) {
                                                    codeEditor.setActiveFileKey(newOpenFileList[currentIndex - 1].key);
                                                } 
                                                // 否则激活第一个文件（如果存在）
                                                else if (newOpenFileList[0]?.key) {
                                                    codeEditor.setActiveFileKey(newOpenFileList[0].key);
                                                } 
                                                // 如果没有打开的文件，则清空activeFileKey
                                                else {
                                                    codeEditor.setActiveFileKey("");
                                                }
                                            }
                                            codeEditor.setOpenFileList(newOpenFileList);
                                        }else{
                                            message.error(res.msg);
                                        }
                                    }).catch(()=>{
                                    }).finally(()=>{
                                        myModal.destroy();
                                        setLoading(false)
                                    })
                                }} />
                            </Flex>
                        ]
                    });
                }} />
            </Tooltip>
        </>
    )
}

export default DeleteFileModal;