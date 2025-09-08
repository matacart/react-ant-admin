import MyInput from "@/components/Input/MyInput";
import codeEditor from "@/store/theme/codeEditor";
import { FileOutlined, FolderOpenOutlined, FolderOutlined, SearchOutlined } from "@ant-design/icons";
import { Flex, GetProps, Tree, TreeDataNode } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

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
}

function Side(){

    const { id,templateId }  = useParams();

    const navigate = useNavigate();

    type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

    const [treeData,setTreeData] = useState<TreeDataNode[]>([]);
    
    // 选中节点
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info:any) => {
        if(!info.node?.children){
            codeEditor.setActiveFileKey(info.node.key);
            // 父路径
            const parentUrl = info.node.key.substring(0, info.node.key.lastIndexOf('/'))
            const url = parentUrl+`/${info.node.title}`
            // 判断是否已存在该节点
            if(!codeEditor.openFileList.some((node:any)=>node.key === info.node.key)){
                codeEditor.setOpenFileList([...codeEditor.openFileList,{...info.node,url:url}])
            }
            navigate(`/theme/codeEditor/${id}/${templateId}?key=${url}`)
        }
    };
    
    // 转换函数:转tree结构
    const convertToTreeData = (items: FileItem[]): TreeDataNode[] => {
        const root: TreeDataNode = { title: '', key: '', children: [] };
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
                    const newNode: TreeDataNode = {
                        title: part,
                        key: `${item.fileName}-${index}`,
                        children: isLeaf ? undefined : [],
                        // isLeaf: isLeaf ? true : false,
                    };
                    
                    if (!currentNode.children) currentNode.children = [];
                    currentNode.children.push(newNode);
                    currentNode = newNode;
                }
            });
        });
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
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    showLine={true}
                    showIcon={false}
                    onSelect={onSelect}
                    treeData={treeData}
                    selectedKeys={[codeEditor.activeFileKey]}
                    titleRender={(node:any) => {
                        return(
                            <span className="title-content" onClick={()=>{
                                // console.log(node)
                            }}>
                                <Flex gap={6}>
                                    <span>
                                        {node.children ? <FolderOutlined />:<FileOutlined />}
                                    </span>
                                    <div>{node.title}</div>
                                </Flex>
                            </span>
                        )    
                    }}
                />
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