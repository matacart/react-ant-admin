import { DeleteIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import codeEditor from "@/store/theme/codeEditor";
import { FileOutlined, FolderOutlined, SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Flex, GetProps, Tooltip, Tree, TreeDataNode } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import RenameModal from "./RenameModal";
import DeleteFileModal from "./DeleteFileModal";
import SectionModal from "./FileAdd/SectionModal";
import LayoutModal from "./FileAdd/LayoutModal";
import LocaleModal from "./FileAdd/LocaleModal";
import SnippetsModal from "./FileAdd/SnippetsModal";
import AssetsModal from "./FileAdd/AssetsModal";
import TemplatesModal from "./FileAdd/TemplatesModal";

const searchStyle = {
    height:"36px"
}


// 定义数据类型
interface FileItem {
    id: string;
    fileName: string;
    isPrivate: boolean;
    checksum:string;
    fileContentChecksum:string;
    fileType:string;
}

interface MyTreeDataNode extends TreeDataNode {
    type?: string;
    fileType?:string;
    level?:number;
}

function Side(){

    const { id,templateId }  = useParams();

    const navigate = useNavigate();

    type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

    const [treeData,setTreeData] = useState<MyTreeDataNode[]>([]);
    
    // 选中节点
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info:any) => {
        if(info.node?.type){
            return;
        }
        if(!info.node?.children){
            codeEditor.setActiveFileKey(info.node.key);
            // 父路径
            const parentUrl = info.node.key.substring(0, info.node.key.lastIndexOf('/'))
            const url = parentUrl+`/${info.node.title}`
            // 判断是否已存在该节点
            if(!codeEditor.openFileList.some((node:any)=>node.key === info.node.key)){
                codeEditor.setOpenFileList([...codeEditor.openFileList,{...info.node,url:url,languagesId:codeEditor.languageId,mode:codeEditor.mode}])
            }
            navigate(`/theme/codeEditor/${id}/${templateId}/${codeEditor.languageId}?key=${url}`)
        }
    };
    
    // 转换函数:转tree结构
    const convertToTreeData = (items: FileItem[]): MyTreeDataNode[] => {
        const root: MyTreeDataNode = {title: '', key: '', children: [], fileType: "",level:0};
        // 构建树结构
        items.forEach(item => {
            const pathParts = item.fileName.split('/');
            let currentNode = root;
            pathParts.forEach((part, index) => {
                const isLeaf = index === pathParts.length - 1;
                const existingNode = currentNode.children?.find(
                    child => child.title === part
                );
                if (existingNode) {
                    // 节点已存在
                    currentNode = existingNode;
                } else {
                    // 创建新节点
                    const newNode: MyTreeDataNode = {
                        title: part,
                        key: isLeaf?`${item.fileName}-${index}`:`${pathParts.slice(0,(index+1)).join("/")}-folder`,
                        children: isLeaf ? undefined : [],
                        fileType:isLeaf?item.fileType:undefined,
                        level:index,
                    };
                    if (!currentNode.children) currentNode.children = [];
                    currentNode.children.push(newNode);
                    currentNode = newNode;
                }
            });
        });

        // 为每个一级节点添加"添加文件"节点
        root.children?.forEach(node => {
            if (node.children && node.title !== "config") {
                node.children.unshift({
                    title: "",
                    key: `${node.key}-add-file`,
                    isLeaf: true,
                    type: node.title,
                    level:0,
                } as MyTreeDataNode);
            }
        });
        console.log(root.children)
        return root.children || [];
    };
   
    useEffect(() => {
        setTreeData(convertToTreeData(codeEditor.fileList))
    }, [codeEditor.fileList]);

    return(
        <Scoped>
            {/* 搜索框 */}
            <div style={{padding:"12px"}}>
                <MyInput style={searchStyle} placeholder="搜索名称" suffix={<SearchOutlined />} />
            </div>
            <div className="tree-box">
                <ConfigProvider
                    theme={{
                        components: {
                            Tree: {
                                // directoryNodeSelectedBg:"#f0f7ff",
                                directoryNodeSelectedBg:"#e6f4ff",
                                directoryNodeSelectedColor:"#000000E0",
                            },
                        },
                    }}
                >
                    <DirectoryTree
                        multiple
                        defaultExpandAll
                        showLine={true}
                        showIcon={false}
                        onSelect={onSelect}
                        treeData={treeData}
                        selectedKeys={[codeEditor.activeFileKey]}
                        titleRender={(node:any) => {
                            const filePath = node.key.slice(0,node.key.lastIndexOf('/'));
                            return(
                                <span className="title-content">
                                    {node.type == "sections" ? <SectionModal filePath={"sections"} treeData={treeData} setTreeData={setTreeData} />:
                                    node.type == "layout" ? <LayoutModal filePath={"layout"} treeData={treeData} setTreeData={setTreeData} />:
                                    node.type == "locales" ? <LocaleModal filePath={"locales"} treeData={treeData} setTreeData={setTreeData} />:
                                    node.type == "snippets" ? <SnippetsModal filePath={"snippets"} treeData={treeData} setTreeData={setTreeData} />:
                                    node.type == "assets" ? <AssetsModal filePath={"assets"} treeData={treeData} setTreeData={setTreeData} />:
                                    node.type == "templates" ? <TemplatesModal treeData={treeData} setTreeData={setTreeData} />:
                                    <Flex justify="space-between" gap={6}>
                                        <Flex gap={6}>
                                            <span>
                                                {node.children ? <FolderOutlined />:<FileOutlined />}
                                            </span>
                                            <div>{node.title}</div>
                                        </Flex>
                                        {(node.key == codeEditor.activeFileKey && 
                                            node.key !== "layout/theme.html-1" &&
                                            node.key !== "config/settings_data.json-1" &&
                                            node.key !== "config/settings_schema.json-1"
                                        ) && <Flex gap={2}>
                                            <DeleteFileModal filePath={filePath} name={node.title} item={node} treeData={treeData} setTreeData={setTreeData} />
                                            <RenameModal filePath={filePath} name={node.title} item={node} treeData={treeData} setTreeData={setTreeData} />
                                        </Flex>}
                                    </Flex>}
                                </span>
                            )    
                        }}
                    />
                </ConfigProvider>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    
    .ant-tree .ant-tree-treenode {
        /* height: 30px;        // 设置节点高度 */
        line-height: 30px;   // 垂直居中
    }
`

export default observer(Side);