import { Modal } from 'antd';

/**
 * 对antd中的 "反馈" 的元素进行二次封装
 * @param {{itemType: ReactNode, itemChild: ReactNode, itemStyle: CSSProperties,className: string}} item
 *
 * itemType,  要返回的ReactNode类型
 * itemChild,  子 ReactNode
 * itemStyle,  style 样式
 * className,  类名
 *
 */
const Feedback = item => {
    let {
        // mine
        itemType, // 要返回的ReactNode类型
        itemChild, // 子 ReactNode

        // 全局属性，需要额外挂载到 ReactNode 中
        itemStyle, // style 样式
        className, // 类名

        // Modal
        afterclose,
        classNames,
        styles,
        cancelButtonProps,
        cancelText,
        centered,
        closeIcon,
        confirmLoading,
        destroyOnclose,
        focusTriggerAfterclose,
        footer,
        forceRender,
        getContainer,
        keyboard,
        mask,
        maskClosable,
        modalRender,
        okButtonProps,
        okText,
        okType,
        title,
        open,
        width,
        wrapclassName,
        zIndex,
        onCancel,
        onOk,
        afterOpenChange,
    } = item;

    switch (itemType) {
        case 'Modal':
            <Modal
                style={itemStyle}
                className={className}
                afterclose={afterclose}
                classNames={classNames}
                styles={styles}
                cancelButtonProps={cancelButtonProps}
                cancelText={cancelText}
                centered={centered}
                closeIcon={closeIcon}
                confirmLoading={confirmLoading}
                destroyOnclose={destroyOnclose}
                focusTriggerAfterclose={focusTriggerAfterclose}
                footer={footer}
                forceRender={forceRender}
                getContainer={getContainer}
                keyboard={keyboard}
                mask={mask}
                maskClosable={maskClosable}
                modalRender={modalRender}
                okButtonProps={okButtonProps}
                okText={okText}
                okType={okType}
                title={title}
                open={open}
                width={width}
                wrapclassName={wrapclassName}
                zIndex={zIndex}
                onCancel={onCancel}
                onOk={onOk}
                afterOpenChange={afterOpenChange}
            >
                {itemChild}
            </Modal>;
            break;

        default:
            break;
    }
};

export default Feedback;
