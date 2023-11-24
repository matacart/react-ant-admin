import { Drawer as AntdDrawer } from 'antd';

const Drawer = ({
    title,
    open,
    onClose,
    autoFocus,
    afterOpenChange,
    className,
    classNames,
    styles,
    closeIcon,
    contentWrapperstyle,
    destroyOnclose,
    extra,
    footer,
    forceRender,
    getContainer,
    height,
    keyboard,
    mask,
    maskClosable,
    placement,
    push,
    rootstyle,
    size,
    style,
    width,
    zIndex,
    onclose,
    itemChild,
}) => {
    return (
        <AntdDrawer
            title={title}
            onClose={onClose}
            open={open}
            autoFocus={autoFocus}
            afterOpenChange={afterOpenChange}
            className={className}
            classNames={classNames}
            styles={styles}
            closeIcon={closeIcon}
            contentWrapperstyle={contentWrapperstyle}
            destroyOnclose={destroyOnclose}
            extra={extra}
            footer={footer}
            forceRender={forceRender}
            getContainer={getContainer}
            height={height}
            keyboard={keyboard}
            mask={mask}
            maskClosable={maskClosable}
            placement={placement}
            push={push}
            rootstyle={rootstyle}
            size={size}
            style={style}
            width={width}
            zIndex={zIndex}
            onclose={onclose}
        >
            {itemChild}
        </AntdDrawer>
    );
};

export default Drawer;
