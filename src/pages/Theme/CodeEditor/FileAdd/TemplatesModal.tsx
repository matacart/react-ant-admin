import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { addTemplateFile, RenameFile } from "@/services/y2/api";
import codeEditor from "@/store/theme/codeEditor";
import { Flex, Form, message, Modal, Radio, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { lastIndexOf } from 'lodash';
import { useSleep } from "@/hooks/customHooks";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom:"24px",
    gap: 8,
};

interface LayoutModalType{
    treeData:any[],
    setTreeData:any,
    filePath?:string,
}

/**
 * 扁平化树形结构数据
 * @param treeData 树形结构数据
 * @returns 扁平化后的数组
 */
export const flattenTreeData = (treeData: any[]): any[] => {
    const result: any[] = [];
    
    const traverse = (nodes: any[]) => {
      nodes.forEach(node => {
        result.push(node);
        if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      });
    };
    
    traverse(treeData);
    return result;
};
  

function TemplatesModal({treeData,setTreeData}:LayoutModalType){

    const sleep = useSleep();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [options,setOptions] = useState<any[]>([
        {
            label: "404",
            value: "templates/404",
        },
        {
            label: "article",
            value: "templates/article",
        },
        {
            label: "blog",
            value: "templates/blog",
        },
        {
            label: "cart",
            value: "templates/cart",
        },
        {
            label: "collection",
            value: "templates/collection",
        },
        {
            label: "customers/account",
            value: "templates/customers/account",
        },
        {
            label: "customers/activate_account",
            value: "templates/customers/activate_account",
        },
        {
            label: "customers/addresses",
            value: "templates/customers/addresses",
        },
        {
            label: "customers/login",
            value: "templates/customers/login",
        },
        {
            label: "customers/orders",
            value: "templates/customers/orders",
        },
        {
            label: "customers/order",
            value: "templates/customers/order",
        },
        {
            label: "customers/register",
            value: "templates/customers/register",
        },
        {
            label: "customers/forgot_password",
            value: "templates/customers/forgot_password",
        },
        // 必须是html页面
        {
            label: "gift_card",
            value: "templates/gift_card",
        },
        {
            label: "index",
            value: "templates/index",
        },
        {
            label: "activity",
            value: "templates/activity",
        },
        {
            label: "collections_all",
            value: "templates/collections_all",
        },
        {
            label: "page",
            value: "templates/page",
        },
        {
            label: "password",
            value: "templates/password",
        },
        {
            label: "product",
            value: "templates/product",
        },
        {
            label: "search",
            value: "templates/search",
        },
        {
            label: "proofing",
            value: "templates/proofing",
        },
    ]);

    // 已存在文件
    const [fileList,setFileList] = useState<any[]>([]);

    const [fileType,setFileType] = useState('html');

    const [fileSource,setFileSource] = useState('');

    const [form] = Form.useForm();

    // 在树形结构中查找指定路径的节点并返回其父节点和索引
    const findNodeParentAndIndex = (nodes: any[], targetFilePath: string): {parentNode: any, index: number} | null => {
        if (!targetFilePath) return null;
        
        // 获取目标文件的父路径
        const parentPath = targetFilePath.substring(0, targetFilePath.lastIndexOf('/'));
        const fileName = targetFilePath.substring(targetFilePath.lastIndexOf('/') + 1);
        
        // 查找父节点
        let parentNode = null;
        if (parentPath === 'templates') {
            // 父节点是 templates 根节点
            parentNode = nodes.find(node => node.title === 'templates');
        } else if (parentPath.startsWith('templates/')) {
            // 处理嵌套路径
            const pathParts = parentPath.split('/').slice(1); // 移除 'templates' 部分
            let currentNode = nodes.find(node => node.title === 'templates');
            
            for (const part of pathParts) {
                if (!currentNode || !currentNode.children) {
                    return null;
                }
                currentNode = currentNode.children.find((child: any) => child.title === part);
            }
            parentNode = currentNode;
        }
        
        if (!parentNode || !parentNode.children) {
            return null;
        }
        
        // 在父节点的子节点中查找目标文件
        const index = parentNode.children.findIndex((child: any) => child.title === fileName);
        if (index === -1) {
            return null;
        }
        
        return { parentNode, index };
    };

    // 深度克隆整个 treeData 并在指定位置插入新节点
    const insertNodeInTree = (treeData: any[], fileSource: string, newNode: any,fullFileName:string) => {
        const clonedTreeData = JSON.parse(JSON.stringify(treeData));
        let level = 1;
        // 找到 templates 节点
        const templatesNode = clonedTreeData.find((node: any) => node.title === "templates");
        if (!templatesNode) return clonedTreeData;
        if (fileSource) {
            // 查找 fileSource 对应节点的父节点和索引
            const targetInfo = findNodeParentAndIndex(clonedTreeData, fileSource);
            if (targetInfo) {
                // 如果找到了目标元素，则在该位置插入新节点
                targetInfo.parentNode.children.splice(targetInfo.index, 0, {
                    ...newNode,
                    key: fullFileName+"-"+(targetInfo.parentNode.level+1),
                    level: targetInfo.parentNode.level+1,
                });
                level = targetInfo.parentNode.level+1;
            } else {
                console.log('未找到目标元素');
                // 如果没找到，则添加到末尾
                templatesNode.children.push({
                    ...newNode,
                    key: fullFileName+"-"+(templatesNode.level+1),
                    level: templatesNode.level+1,
                });
                level = templatesNode.level+1;
            }
        } else {
            // 如果没有 fileSource，则添加到末尾
            templatesNode.children.push({
                ...newNode,
                key: fullFileName+"-"+(templatesNode.level+1),
                level: templatesNode.level+1,
            });
            level = templatesNode.level+1;
        }
        return {
            newTreeData:clonedTreeData,
            level:level
        };
    };

    const submit = ()=>{
        form.validateFields().then(async (values:any)=>{
            setLoading(true);
            const fullFileName = fileSource ? values.source+'.'+values.name+"."+fileType : values.source+"."+fileType;
            addTemplateFile({
                templateId: codeEditor.templateInfo?.id??"",
                languagesId: codeEditor.languageId??"",
                mode: codeEditor.mode,
                fileName: fullFileName,
                fileContent:"",
                sourceFileName:fileSource,
                duplicateFlag: true
            }).then(async res=>{
                if(res.code == 0){
                    // 获取文件信息
                    const title = fullFileName.slice((fullFileName.lastIndexOf('/')+1));
                    const newNode = {
                        title: title,
                        children: undefined,
                        fileType: fileType,
                    };
                   // 插入新节点到树中
                    const {newTreeData,level} = insertNodeInTree(treeData, fileSource, newNode,fullFileName);
                    setTreeData(newTreeData)
                    codeEditor.setOpenFileList([
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
                            key: fullFileName+"-"+level,
                            languagesId: codeEditor.languageId??"2",
                            loaded: false,
                            loading: false,
                            mode: codeEditor.mode,
                            pos: "0-0-"+codeEditor.openFileList.length,
                            selected: false,
                            title: title,
                            url: fullFileName,
                        }
                    ])
                    await sleep(1000);
                    // 激活文件
                    codeEditor.setActiveFileKey(fullFileName+"-"+level);
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
        const flattenedData = flattenTreeData(treeData.filter(treeItem=>treeItem.title == "templates")[0].children);
        setFileList(flattenedData)
    },[])

    return (
        <Scoped>
            <Flex className="add color-356DFF" onClick={()=>setOpen(true)}>新建template</Flex>
            {/*  */}
            <Modal
                open={open}
                width={"480px"}
                title="添加新的template"
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
                        label="创建一个新的template"
                        name="source"
                        required={false}
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <MySelect style={{height:"36px"}} options={options} onChange={(value)=>{
                            const file = fileList.filter(item=>(item.key.slice(0,item.key.lastIndexOf('.')) == value && !item.type))[0];
                            if(file){
                                setFileType(file.fileType)
                                setFileSource(file.key.slice(0,file.key.lastIndexOf('-')))
                            }else{
                                setFileSource("");
                                setFileType("html");
                            }
                        }} />
                    </Form.Item>
                    <Radio.Group
                        style={style}
                        value={fileType}
                        disabled={fileSource?true:false}
                        onChange={(e)=>setFileType(e.target.value)}
                        options={[
                            { value: 'html', label: 'html' },
                            { value: 'json', label: 'json' },
                        ]}
                    />
                    {fileSource && <Form.Item
                        label="创建一个新的template，将其命名为"
                        name="name"
                        required={false}
                        rules={[
                            { required: true, message: '请输入名称' },
                            { pattern: /^[^\/]*$/, message: '文件名包含无效字符，请重新输入' }
                        ]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入名称" suffix={fileType == "html" ? <span className="color-7A8499">.html</span>:<span className="color-7A8499">.json</span>} />
                    </Form.Item>}
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

export default TemplatesModal;