import { Select, Space, Input, Button } from 'antd';

const { Search } = Input;

/**
 * 对antd中的元素进行二次封装
 * @param {{itemType: ReactNode, itemChild: ReactNode, itemStyle: CSSProperties,className: string}} item
 *
 * itemType,  要返回的ReactNode类型
 * itemChild,  子 ReactNode
 * itemStyle,  style 样式
 * className,  类名
 *
 */
const Form = item => {
    let {
        // mine
        itemType, // 要返回的ReactNode类型
        itemChild, // 子 ReactNode

        // 全局属性，需要额外挂载到 ReactNode 中
        itemStyle, // style 样式
        className, // 类名
        key, // 唯一标识

        // input
        addonAfter,
        addonBefore,
        allowClear,
        bordered,
        classNames,
        count,
        defaultValue,
        id,
        maxLength,
        prefix,
        showCount,
        status,
        suffix,
        value,
        onChange,
        onPressEnter,
        // button
        block,
        danger,
        ghost,
        href,
        htmlType,
        icon,
        loading,
        shape,
        size,
        styles,
        target,
        onClick,
        // select
        autoClearSearchValue,
        autoFocus,
        defaultActiveFirstOption,
        defaultOpen,
        disabled,
        popupClassName,
        popupMatchSelectWidth,
        dropdownRender,
        dropdownStyle,
        fieldNames,
        filterOption,
        filterSort,
        getPopupContainer,
        labelInValue,
        listHeight,
        maxTagCount,
        maxTagPlaceholder,
        maxTagTextLength,
        menuItemSelectedIcon,
        mode,
        notFoundContent,
        open,
        optionFilterProp,
        optionLabelProp,
        options,
        optionrender,
        placeholder,
        placement,
        removelcon,
        searchValue,
        showSearch,
        suffixIcon,
        tagRender,
        tokenSeparators,
        virtual,
        onBlur,
        onClear,
        onDeselect,
        onDropdownVisibleChange,
        onFocus,
        onInputKeyDown,
        onMouseEnter,
        onMouseLeave,
        onPopupScroll,
        onSearch,
        onSelect,
    } = item;

    switch (itemType) {
        case 'Input':
            return (
                <Input
                    className={className}
                    key={key}
                    style={itemStyle}
                    addonAfter={addonAfter}
                    addonBefore={addonBefore}
                    allowClear={allowClear}
                    bordered={bordered}
                    classNames={classNames}
                    count={count}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={id}
                    maxLength={maxLength}
                    prefix={prefix}
                    showCount={showCount}
                    status={status}
                    suffix={suffix}
                    value={value}
                    onChange={onChange}
                    onPressEnter={onPressEnter}
                ></Input>
            );

        case 'Button':
            return (
                <Button
                    className={className}
                    key={key}
                    style={itemStyle}
                    block={block}
                    classNames={classNames}
                    danger={danger}
                    disabled={disabled}
                    ghost={ghost}
                    href={href}
                    htmlType={htmlType}
                    icon={icon}
                    loading={loading}
                    shape={shape}
                    size={size}
                    styles={styles}
                    target={target}
                    onClick={onClick}
                >
                    {itemChild}
                </Button>
            );

        case 'Select':
            return (
                <Select
                    className={className}
                    key={key}
                    style={itemStyle}
                    allowClear={allowClear}
                    autoClearSearchValue={autoClearSearchValue}
                    autoFocus={autoFocus}
                    bordered={bordered}
                    defaultActiveFirstOption={defaultActiveFirstOption}
                    defaultOpen={defaultOpen}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    popupClassName={popupClassName}
                    popupMatchSelectWidth={popupMatchSelectWidth}
                    dropdownRender={dropdownRender}
                    dropdownStyle={dropdownStyle}
                    fieldNames={fieldNames}
                    filterOption={filterOption}
                    filterSort={filterSort}
                    getPopupContainer={getPopupContainer}
                    labelInValue={labelInValue}
                    listHeight={listHeight}
                    loading={loading}
                    maxTagCount={maxTagCount}
                    maxTagPlaceholder={maxTagPlaceholder}
                    maxTagTextLength={maxTagTextLength}
                    menuItemSelectedIcon={menuItemSelectedIcon}
                    mode={mode}
                    notFoundContent={notFoundContent}
                    open={open}
                    optionFilterProp={optionFilterProp}
                    optionLabelProp={optionLabelProp}
                    options={options}
                    optionrender={optionrender}
                    placeholder={placeholder}
                    placement={placement}
                    removelcon={removelcon}
                    searchValue={searchValue}
                    showSearch={showSearch}
                    size={size}
                    status={status}
                    suffixIcon={suffixIcon}
                    tagRender={tagRender}
                    tokenSeparators={tokenSeparators}
                    value={value}
                    virtual={virtual}
                    onBlur={onBlur}
                    onClear={onClear}
                    onDeselect={onDeselect}
                    onDropdownVisibleChange={onDropdownVisibleChange}
                    onFocus={onFocus}
                    onInputKeyDown={onInputKeyDown}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onPopupScroll={onPopupScroll}
                    onSearch={onSearch}
                    onSelect={onSelect}
                ></Select>
            );

        case 'SpaceCompact':
            if (itemChild)
                return (
                    <Space.Compact
                        className={className}
                        key={key}
                        style={itemStyle}
                    >
                        {itemChild.map((item, index) =>
                            Form({ ...item, key: index }),
                        )}
                    </Space.Compact>
                );
            else return <Space.Compact />;

        case 'Search':
            return (
                <Search
                    className={className}
                    key={key}
                    style={itemStyle}
                    allowClear={allowClear}
                />
            );

        default:
            return;
    }
};

export default Form;
