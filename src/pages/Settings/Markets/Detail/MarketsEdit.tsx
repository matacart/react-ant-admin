import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import { getMarketCountry, modifyMarketCountry } from "@/services/y2/apiSaleMarket";
import marketsInfo from "@/store/settings/markets/marketsInfo";
import { groupToTree } from "@/utils/dataStructure";
import { useParams } from "@umijs/max";
import { Flex, Modal, Radio, Tree, TreeDataNode, TreeProps } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function MarketsEdit() {

    const [open, setOpen] = useState(false);
    
    const scopedRef = useRef<HTMLDivElement>(null);

    const {marketId="", langId=""} = useParams();

    const [loading, setLoading] = useState(false);

    const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const onSelect = (selectedKeys: string[]) => {
        setSelectedKeys(selectedKeys);
    };

    const titleRender = (nodeData: any) => {
        const isParent = nodeData.children && nodeData.children.length > 0;
        // 父节点：纯文本
        if (isParent) {
            return <span>{nodeData.regionName || ""}</span>;
        }
        // 子节点：Radio + 自定义左右布局
        return (
            // 阻止事件冒泡，防止点击 Radio 时触发 Tree 节点的默认行为（比如展开/折叠或高亮）
            <div onClick={(e) => e.stopPropagation()}>
                <Radio value={nodeData.countryCode}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {nodeData.countryCnName || ""}
                        </div>
                        {/* 右侧附加文本，对应 DOM 里的 treeTitleRight__9Ch8f */}
                        <div style={{ color: '#999', fontSize: '12px', marginLeft: '16px' }}>
                        {/* {nodeData.extra || ''} */}
                        </div>
                    </div>
                </Radio>
            </div>
        );
    };
    
    const init = ()=>{
        setOpen(true);
        setLoading(true);
        getMarketCountry({
            marketId:marketId,
            languages_id:langId,
        }).then(res=>{
            setTreeData(groupToTree(res.data.countryList, 'regionCode', 'regionName'))
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    const submit = ()=>{
        modifyMarketCountry({
            languages_id:langId,
            marketId:marketId,
            marketName:marketsInfo.marketsInfo.marketName || "",
            countryCodeList:JSON.stringify([selectedKeys]),
        }).then(()=>{
        }).catch(()=>{
        }).finally(()=>{
        })
    }


    return (
        <Scoped ref={scopedRef}>
            <DefaultButton onClick={init} text="编辑" />
            <Modal open={open} onCancel={() => setOpen(false)} getContainer={()=>scopedRef.current!} title="选择国家/地区" loading={loading} width={620} centered footer={()=><>
                <Flex justify="flex-end" gap={12}>
                    <DefaultButton onClick={() => setOpen(false)} text="取消" />
                    <PrimaryButton onClick={submit} text="确定" />
                </Flex>
            </>}>
                <MyInput placeholder="请输入国家/地区" style={{ height:"36px",marginTop:"12px" }} />
                <Radio.Group
                    className="tree-box"
                    value={selectedKeys}
                    onChange={(e)=>onSelect(e.target.value)}
                >
                    <Tree
                        checkable={false}
                        selectable
                        blockNode
                        expandAction="click"
                        treeData={treeData}
                        titleRender={titleRender}
                        style={{ fontSize: '14px',fontWeight:"400" }}
                    />
                </Radio.Group>
            </Modal>
        </Scoped>
    );
}

const Scoped = styled.div`
    .tree-box{
        width: 100%;
        height: 300px;
        margin-top: 20px;
        overflow: auto;
    }
    .ant-tree-treenode-leaf .ant-tree-switcher-noop {
        display: none;
    }
`;

export default MarketsEdit;