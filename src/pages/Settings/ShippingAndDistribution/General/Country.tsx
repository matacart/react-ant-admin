import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import { getMarketCountry } from "@/services/y2/apiSaleMarket";
import markets from "@/store/settings/markets/markets";
import { flattenTreeLeaves, groupToTree } from "@/utils/dataStructure";
import { Checkbox, Flex, Modal, Tree, TreeDataNode } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";

function MarketsEdit() {

    const [open, setOpen] = useState(false);
    
    const scopedRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(false);

    const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const titleRender = (nodeData: any) => {
        const isParent = nodeData.children && nodeData.children.length > 0;
        // 父节点：纯文本
        if (isParent) {
            return <span>{nodeData.regionName || ""}</span>;
        }
        const isChecked = selectedKeys.includes(nodeData.countryCode || "");
        // 子节点：Radio + 自定义左右布局
        return (
            // 阻止事件冒泡，防止点击 Radio 时触发 Tree 节点的默认行为（比如展开/折叠或高亮）
            <div onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={isChecked} onChange={(e)=>{
                    setSelectedKeys(prev =>
                        e.target.checked ? Array.from(new Set([...prev, nodeData.countryCode || ""])) : prev.filter(key => key !== (nodeData.countryCode || ""))
                    );
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {nodeData.countryCnName || ""}
                        </div>
                        <div style={{ color: '#999', fontSize: '12px', marginLeft: '16px' }}>
                        </div>
                    </div>
                </Checkbox>
            </div>
        );
    };
    
    const init = ()=>{
        setOpen(true);
        setLoading(true);
        getMarketCountry({
            marketId:markets.marketId || "",
            languages_id:markets.languagesId || "",
        }).then(res=>{
            setTreeData(groupToTree(res.data.countryList, 'regionCode', 'regionName'));
            setSelectedKeys(markets.countryList.map(item => item.countryCode || ""));
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    const submit = ()=>{
        const countryList = flattenTreeLeaves(treeData);
        const selectedCountryList = countryList.filter(item => selectedKeys.includes(item.countryCode || ""));
        markets.setCountryList(selectedCountryList);
        setOpen(false);
    }


    return (
        <Scoped ref={scopedRef}>
            <DefaultButton onClick={init} text="添加国家/地区" />
            <Modal open={open} onCancel={() => setOpen(false)} getContainer={()=>scopedRef.current!} title="选择国家/地区" loading={loading} width={620} centered footer={()=><>
                <Flex justify="flex-end" gap={12}>
                    <DefaultButton onClick={() => setOpen(false)} text="取消" />
                    <PrimaryButton onClick={submit} text="确定" />
                </Flex>
            </>}>
                <MyInput placeholder="请输入国家/地区" style={{ height:"36px",marginTop:"12px" }} />
                <div className="tree-box">
                    <Tree
                        checkable={false}
                        selectable
                        blockNode
                        expandAction="click"
                        treeData={treeData}
                        titleRender={titleRender}
                        style={{ fontSize: '14px',fontWeight:"400",width:"100%" }}
                    />
                </div>
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