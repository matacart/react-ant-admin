import { Avatar, Badge, Card, Image, Tooltip } from 'antd';

/**
 * 对antd中的 “数据展示” 的元素进行二次封装
 * @param {{itemType: ReactNode, itemChild: ReactNode, itemStyle: CSSProperties,className: string}} item
 *
 * itemType,  要返回的ReactNode类型
 * itemChild,  子 ReactNode
 * itemStyle,  style 样式
 * className,  类名
 *
 */
const DataDisplay = item => {
    let {
        // mine
        itemType, // 要返回的ReactNode类型
        itemChild, // 子 ReactNode

        // 全局属性，需要额外挂载到 ReactNode 中
        itemStyle, // style 样式
        className, // 类名

        // Avatar
        alt,
        gap,
        icon,
        shape,
        size,
        src,
        srcSet,
        draggable,
        crossOrigin,
        onError,
        // Badge
        color,
        count,
        classNames,
        dot,
        offset,
        overflowCount,
        showZero,
        status,
        styles,
        text,
        title,
        // Card
        actions,
        activeTabKey,
        bodyStyle,
        bordered,
        cover,
        defaultActiveTabKey,
        extra,
        headStyle,
        hoverable,
        loading,
        tabBarExtraContent,
        tabList,
        tabProps,
        type,
        onTabChange,
        // Image
        fallback,
        height,
        placeholder,
        preview,
        width,
        // Tooltip
        align,
        arrow,
        autoAdjustOverflow,
        defaultopen,
        destroyTooltipOnHide,
        fresh,
        getPopupContainer,
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayClassName,
        overlayStyle,
    } = item;

    switch (itemType) {
        case 'Avatar':
            return (
                <Avatar
                    itemStyle={itemStyle}
                    className={className}
                    alt={alt}
                    gap={gap}
                    icon={icon}
                    shape={shape}
                    size={size}
                    src={src}
                    srcSet={srcSet}
                    draggable={draggable}
                    crossOrigin={crossOrigin}
                    onError={onError}
                />
            );

        case 'Badge':
            <Badge
                itemStyle={itemStyle}
                className={className}
                color={color}
                count={count}
                classNames={classNames}
                dot={dot}
                offset={offset}
                overflowCount={overflowCount}
                showZero={showZero}
                size={size}
                status={status}
                styles={styles}
                text={text}
                title={title}
            >
                {itemChild}
            </Badge>;
            return;

        case 'Card':
            return (
                <Card
                    actions={actions}
                    activeTabKey={activeTabKey}
                    bodyStyle={bodyStyle}
                    bordered={bordered}
                    cover={cover}
                    defaultActiveTabKey={defaultActiveTabKey}
                    extra={extra}
                    headStyle={headStyle}
                    hoverable={hoverable}
                    loading={loading}
                    size={size}
                    tabBarExtraContent={tabBarExtraContent}
                    tabList={tabList}
                    tabProps={tabProps}
                    title={title}
                    type={type}
                    onTabChange={onTabChange}
                ></Card>
            );

        case 'Image':
            return (
                <Image
                    alt={alt}
                    fallback={fallback}
                    height={height}
                    placeholder={placeholder}
                    preview={preview}
                    src={src}
                    width={width}
                    onError={onError}
                />
            );

        case 'Tooltip':
            return (
                <Tooltip
                    title={title}
                    align={align}
                    arrow={arrow}
                    autoAdjustOverflow={autoAdjustOverflow}
                    color={color}
                    defaultopen={defaultopen}
                    destroyTooltipOnHide={destroyTooltipOnHide}
                    fresh={fresh}
                    getPopupContainer={getPopupContainer}
                    mouseEnterDelay={mouseEnterDelay}
                    mouseLeaveDelay={mouseLeaveDelay}
                    overlayClassName={overlayClassName}
                    overlayStyle={overlayStyle}
                >
                    {itemChild}
                </Tooltip>
            );

        default:
            return;
    }
};

export default DataDisplay;
