import { Collapse as AntdCollapse } from 'antd';

const Collapse = ({
    accordion,
    activeKey,
    bordered,
    collapsible,
    defaultActiveKey,
    destroyInactivePanel,
    expandIcon,
    expandIconPosition,
    ghost,
    size,
    onChange,
    items,
}) => {
    return (
        <AntdCollapse
            accordion={accordion}
            activeKey={activeKey}
            bordered={bordered}
            collapsible={collapsible}
            defaultActiveKey={defaultActiveKey}
            destroyInactivePanel={destroyInactivePanel}
            expandIcon={expandIcon}
            expandIconPosition={expandIconPosition}
            ghost={ghost}
            size={size}
            onChange={onChange}
            items={items}
        ></AntdCollapse>
    );
};

export default Collapse;
