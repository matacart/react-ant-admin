import DefaultButton from "@/components/Button/DefaultButton";
import MyInput from "@/components/Input/MyInput";
import { getCountryListV2 } from "@/services/y2/apiAppstore";
import { Modal, Radio, Tree, TreeDataNode, TreeProps } from "antd";
import { useEffect, useState } from "react";

function MarketsEdit() {

    const [open, setOpen] = useState(false);

    const treeData: TreeDataNode[] = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                }
            ],
        }
    ];

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    const titleRender = (nodeData: TreeDataNode) => {
        const isParent = nodeData.children && nodeData.children.length > 0;

        // 父节点：纯文本
        if (isParent) {
            return <span>{nodeData.title}</span>;
        }

        // 子节点：Radio + 自定义左右布局
        return (
        // 阻止事件冒泡，防止点击 Radio 时触发 Tree 节点的默认行为（比如展开/折叠或高亮）
        <div onClick={(e) => e.stopPropagation()}>
            <Radio value={nodeData.key}>
            {/* 这里对应 DOM 里的 treeTitle__EG1ip */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {/* 左侧文字，对应 DOM 里的 treeTitleLeft__zCo5l */}
                <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nodeData.title}
                </div>
                {/* 右侧附加文本，对应 DOM 里的 treeTitleRight__9Ch8f */}
                <div style={{ color: '#999', fontSize: '12px', marginLeft: '16px' }}>
                {nodeData.extra || ''}
                </div>
            </div>
            </Radio>
        </div>
        );
    };

    useEffect(() => {
        getCountryListV2().then(res=>{
            console.log(res)
        })
    }, []);


  return (
    <>
        <DefaultButton onClick={() => setOpen(true)} text="编辑" />
        <Modal open={open} onCancel={() => setOpen(false)} title="选择国家/地区">
            <MyInput placeholder="请输入国家/地区" />
            <Radio.Group 
                style={{ width: '100%' }}
                >
                <Tree
                    checkable={false}        // 关闭复选框
                    selectable={false}       // 关闭节点点击高亮
                    blockNode                // 🎯 关键：占据整行，让右侧文字能推到边缘
                    expandAction="click" 
                    treeData={treeData}
                    titleRender={titleRender} // 🎯 关键：自定义节点渲染
                    style={{ fontSize: '14px' }}
                />
            </Radio.Group>
        </Modal>
    </>
  );
}

export default MarketsEdit;