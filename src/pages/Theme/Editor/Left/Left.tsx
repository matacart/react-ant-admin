import { DeleteIcon, DownIcon, EditorAddBtnIcon, EditorAddIcon, EditorAnnouncementIcon, EditorApplyIcon, EditorComponentIcon, EditorConfigurationIcon, EditorMoreIcon, EditorRightIcon } from "@/components/Icons/Icons"
import { Dropdown, Flex, MenuProps, Popover, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import editor from "@/store/theme/editor"
import { observer } from "mobx-react-lite"
import MyDropdown from "@/components/Dropdown/MyDropdown"
import { generateId } from "@/utils/dataStructure"
import { useIntl } from '@umijs/max';
import ComponentAdd from "./ComponentAdd"

interface CollapsedState {
    [key: string]: boolean;
}

function Left(){

    const intl = useIntl();

    const mRef = useRef(null);

    // 0: 组件 1: 全局设置 2: 应用嵌入
    const [active, setActive] = useState(0);

    // 为Popover添加状态管理
    const [popoverStates, setPopoverStates] = useState<{[key: string]: boolean}>({});

    // 在组件中添加状态管理下拉菜单的显示
    const [dropdownVisible, setDropdownVisible] = useState<{[key: string]: boolean}>({});

    // 组件选中项
    const [activeCollapsed, setActiveCollapsed] = useState<string | undefined>(undefined);

    // 初始化所有区块为折叠状态
    const [collapsedSections, setCollapsedSections] = useState<CollapsedState>(
        editor.templateData.reduce((acc, cur) => {
            // acc[cur.config?.sectionId] = true;
            if(cur.config){
                acc[cur.config.sectionId] = true;
            }else{
                cur.order.map(item=>{
                    acc[item] = true
                })
            }
            // 将order加入
            return acc;
        }, {} as CollapsedState)
    );

    // 使用函数式更新确保状态正确
    const handleCollapse = (sectionId: string) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // 控制特定Popover的显示/隐藏
    const handlePopoverOpenChange = (id: string, open: boolean) => {
        setPopoverStates(prev => ({
            ...prev,
            [id]: open
        }));
    };

    // 添加内容
    const AddBlockContent = (id:string,type:string,blocks:any[],popoverId:string,sectionId:string)=>{
        return (
            <div className="add-block-content">
                <div className="title color-242833">添加内容</div>
                <div className="item-box">
                    {blocks?.map((item,index)=>(
                        <Flex className="item" key={index} gap={8} onClick={(e)=>{
                            e.stopPropagation();
                            console.log(item);
                            let newSettings:any = {};
                            item.settings.forEach((element:any) => {
                                if(element.default !== undefined){
                                    newSettings[element.id] = {
                                        value:element.default
                                    }
                                }
                            });
                            const block = {
                                type:item.type,
                                settings:newSettings
                            }
                            // 生成随机id
                            const blockOrder = generateId();
                            editor.addComponentBlock(id,type,block,blockOrder)
                            // 添加完成后隐藏对应的Popover
                            handlePopoverOpenChange(popoverId, false)
                            // 设置组件选中项 需要blockorder
                            setActiveCollapsed(blockOrder)
                            editor.setComponent({id:sectionId,type:'section',itemId:blockOrder})
                        }}>
                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                            <div>{intl.formatMessage({id: item.name})}</div>
                        </Flex>
                    ))}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (editor.templateData && editor.templateData.length > 0) {
          const initialCollapsedState = editor.templateData.reduce((acc, cur) => {
            if (cur.config) {
              acc[cur.config.sectionId] = true;
            } else if (cur.order) {
              cur.order.forEach(item => {
                acc[item] = true;
              });
            }
            return acc;
          }, {} as CollapsedState);
          setCollapsedSections(initialCollapsedState);
        }

        console.log("11111");

      }, []);

    return(
        <Scoped ref={mRef}>
            <div className="toolBar-toolMenu">
                <div className="toolBar-buttonGroup">
                    <Tooltip title="组件" placement="right">
                        <div onClick={() => setActive(0)} className={active == 0?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                            <EditorComponentIcon />
                        </div>
                    </Tooltip>
                    <Tooltip title="全局设置" placement="right">
                        <div onClick={() => setActive(1)} className={active == 1?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                            <EditorConfigurationIcon />
                        </div>
                    </Tooltip>
                    <Tooltip title="应用嵌入" placement="right">
                        <div onClick={() => setActive(2)} className={active == 2?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                            <EditorApplyIcon />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className="design-designContainer">
                {/*  */}
                <Flex className="design-sidebarHeader" justify="space-between">
                    <div className="design-sidebarTitle font-16 font-w-600">首页</div>
                    <div className="Design-sidebarBtn color-356DFF cursor-pointer">展开</div>
                </Flex>
                {/* content */}
                <div className="design-sidebarContent">
                    {editor.templateData.map((res:any,index:number)=>{
                        if(res.type == "SECTION"){
                            const sectionId = res.config.sectionId!;
                            const popoverId = `popover-${sectionId}`; // 为每个Popover创建唯一ID

                            const maxBlock = res.config.schema.max_blocks;
                            const current = res.config.settingsData.block_order.length;

                            return(
                                <div key={sectionId} className="fixedCompItem-sectionWrapper" id={res.config.sectionId}>
                                    <Flex id="section-announcement-bar" className={sectionId == activeCollapsed ? "fixedCompItem-sortItem activeItem":"fixedCompItem-sortItem"} justify="space-between" tabIndex={0} 
                                        onClick={() => {
                                            setCollapsedSections(prev => ({
                                                ...prev,
                                                [sectionId]: !prev[sectionId]
                                            }))
                                            setActiveCollapsed(sectionId)
                                            editor.setComponent({id:sectionId,type:'section'})
                                        }}
                                    >
                                        <Flex align="center" className="sortItem" gap={8}>
                                            <DownIcon className={collapsedSections[sectionId]?"font-12 icon":"font-12 actIcon"} />
                                            <EditorAnnouncementIcon className="font-20" /> 
                                            <div>{intl.formatMessage({id: res.config.schema.name})}</div>
                                        </Flex>
                                        <Flex className="addBlockBtn" align="center" gap={2}>
                                            <Popover
                                                open={popoverStates[popoverId] || false}
                                                onOpenChange={(open) => current == maxBlock ? ()=>{} : handlePopoverOpenChange(popoverId,open)}
                                                getPopupContainer={()=>mRef.current!} 
                                                overlayInnerStyle={{ padding: 0,marginLeft:"12px" }} 
                                                placement="rightTop" 
                                                arrow={false} 
                                                trigger={"click"} 
                                                content={()=>AddBlockContent(res.id,res.type,res.config.schema.blocks,popoverId,sectionId)}
                                            >
                                                <Tooltip placement="top" title={`添加内容 (${current}/${maxBlock})`}>
                                                    <div style={{cursor: current == maxBlock ? "not-allowed" : "pointer"}} onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                        <EditorAddIcon />
                                                    </div>
                                                </Tooltip>
                                            </Popover>
                                        </Flex>
                                    </Flex>
                                    {/* 折叠面板内容 */}
                                    <div 
                                        className="fixedCompItem-foldContainer"
                                        style={{
                                            maxHeight: collapsedSections[sectionId] ? 0 : '500px',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease-out'
                                        }}
                                        >
                                        {/* 这里放折叠内容 */}
                                        {res.config?.settingsData.block_order.map((order:string, index:number) => {
                                            const biockType = res.config?.settingsData.blocks[order].type
                                            const blocks = res.config.schema.blocks.filter(block => block.type == biockType)
                                            const block = blocks[0] ?? {}

                                            const dropdownId = `dropdown-${sectionId}-${order}`;

                                            return (
                                                <Flex id="section-announcement-bar" className={order == activeCollapsed ? "fixedCompItem-sortItem activeItem":"fixedCompItem-sortItem"} justify="space-between" onClick={()=>{
                                                    setActiveCollapsed(order)
                                                    editor.setComponent({id:sectionId,type:'section',itemId:order})
                                                }}>
                                                    <Flex align="center" className="sortItem" gap={8}>
                                                        <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                        <div>{intl.formatMessage({id:block?.name})}</div>
                                                    </Flex>
                                                    <Flex className="addBlockBtn" align="center">
                                                        <MyDropdown
                                                            open={dropdownVisible[dropdownId] || false}
                                                            onOpenChange={(open:boolean) => {
                                                                setDropdownVisible(prev => ({
                                                                    ...prev,
                                                                    [dropdownId]: open
                                                                }));
                                                            }}
                                                            tiggerEle={
                                                                <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                    <EditorMoreIcon />
                                                                </div>
                                                            }
                                                            menu={{
                                                                items:[
                                                                    {
                                                                        key: "1", label: (
                                                                            <a onClick={(e) => {
                                                                                e.stopPropagation(); // 阻止事件冒泡
                                                                                editor.deleteComponentBlock(res.id, res.type, order);
                                                                                // 移除组件选中项
                                                                                setActiveCollapsed(undefined)
                                                                                // 手动关闭下拉菜单
                                                                                setDropdownVisible(prev => {
                                                                                    const newVisible = { ...prev };
                                                                                    delete newVisible[dropdownId];
                                                                                    return newVisible;
                                                                                });
                                                                            }}>
                                                                                <Flex gap={6} align="center">
                                                                                    <DeleteIcon className="color-F86140 font-16" />
                                                                                    <div className="color-474F5E">删除组件</div>
                                                                                </Flex>
                                                                            </a>
                                                                        )
                                                                    }
                                                                ]
                                                            }}
                                                            placement="bottomLeft" 
                                                            trigger={["click"]}>
                                                        </MyDropdown>
                                                    </Flex>
                                                </Flex>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                        // 模板
                        if(res.type == "TEMPLATE"){
                            const template = res.order.map((order:string,index:number)=>{
                                // console.log(order)

                                const dropdownId = `dropdown-TEMPLATE-${order}`;

                                return (
                                    <div key={order} className="fixedCompItem-sectionWrapper-template" id={order}>
                                        <Flex id="section-announcement-bar" className={order == activeCollapsed ? "fixedCompItem-sortItem activeItem":"fixedCompItem-sortItem"} justify="space-between" tabIndex={0} 
                                            onClick={() => {
                                                setCollapsedSections(prev => ({
                                                    ...prev,
                                                    [order]: !prev[order]
                                                }))
                                                setActiveCollapsed(order)
                                                editor.setComponent({id:order,type:'template'})
                                            }}
                                        >
                                            <Flex align="center" className="sortItem" gap={8}>
                                                {res.sections[order].settingsData.block_order?.length > 0 ? <DownIcon className={collapsedSections[order]?"font-12 icon":"font-12 actIcon"} /> : <div style={{width:"12px"}}></div>}
                                                <EditorAnnouncementIcon className="font-20" /> 
                                                <div>{intl.formatMessage({id: res.sections[order].schema.name})}</div>
                                            </Flex>
                                            <Flex className="addBlockBtn" align="center">
                                                <MyDropdown
                                                    open={dropdownVisible[dropdownId] || false}
                                                    onOpenChange={(open:boolean) => {
                                                        setDropdownVisible(prev => ({
                                                            ...prev,
                                                            [dropdownId]: open
                                                        }));
                                                    }}
                                                    tiggerEle={
                                                        <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                            <EditorMoreIcon />
                                                        </div>
                                                    }
                                                    menu={{
                                                        items:[
                                                            {
                                                                key: "1", label: (
                                                                    <a onClick={(e) => {
                                                                        e.stopPropagation(); // 阻止事件冒泡
                                                                        editor.deleteComponentBlock(order,res.sections[order].type,"");
                                                                        // 移除组件选中项
                                                                        setActiveCollapsed(undefined)
                                                                        // 手动关闭下拉菜单
                                                                        setDropdownVisible(prev => {
                                                                            const newVisible = { ...prev };
                                                                            delete newVisible[dropdownId];
                                                                            return newVisible;
                                                                        });
                                                                    }}>
                                                                        <Flex gap={6} align="center">
                                                                            <DeleteIcon className="color-F86140 font-16" />
                                                                            <div className="color-474F5E">删除组件</div>
                                                                        </Flex>
                                                                    </a>
                                                                )
                                                            }
                                                        ]
                                                    }}
                                                    placement="bottomLeft" 
                                                    trigger={["click"]}>
                                                </MyDropdown>
                                            </Flex>
                                        </Flex>
                                        {/* 折叠面板内容 */}
                                        <div 
                                            className="fixedCompItem-foldContainer"
                                            style={{
                                                maxHeight: collapsedSections[order] ? 0 : '500px',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.3s ease-out'
                                            }}
                                            >
                                            {res.sections[order].settingsData.block_order?.map((blockOrder:string, index:number) => {
                                                const biockType = res.sections[order].settingsData.blocks[blockOrder].type
                                                const blocks = res.sections[order].schema.blocks.filter(block => block.type == biockType)
                                                const block = blocks[0] ?? {}

                                                const dropdownId = `dropdown-${order}-${blockOrder}`;

                                                return (
                                                    <Flex id="section-announcement-bar" className={blockOrder == activeCollapsed ? "fixedCompItem-sortItem activeItem":"fixedCompItem-sortItem"} justify="space-between" onClick={()=>{
                                                        setActiveCollapsed(blockOrder)
                                                        editor.setComponent({id:order,type:'template',itemId:blockOrder})
                                                    }}>
                                                        <Flex align="center" className="sortItem" gap={8}>
                                                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                            <div>{intl.formatMessage({id:block?.name})}</div>
                                                        </Flex>
                                                        <Flex className="addBlockBtn" align="center">
                                                            <MyDropdown
                                                                open={dropdownVisible[dropdownId] || false}
                                                                onOpenChange={(open:boolean) => {
                                                                    setDropdownVisible(prev => ({
                                                                        ...prev,
                                                                        [dropdownId]: open
                                                                    }));
                                                                }}
                                                                tiggerEle={
                                                                    <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                        <EditorMoreIcon />
                                                                    </div>
                                                                }
                                                                menu={{
                                                                    items:[
                                                                        {
                                                                            key: "1", label: (
                                                                                <a onClick={(e) => {
                                                                                    e.stopPropagation(); // 阻止事件冒泡
                                                                                    editor.deleteComponentBlock(order, res.sections[order].type, blockOrder);
                                                                                    // 移除组件选中项
                                                                                    setActiveCollapsed(undefined)
                                                                                    // 手动关闭下拉菜单
                                                                                    setDropdownVisible(prev => {
                                                                                        const newVisible = { ...prev };
                                                                                        delete newVisible[dropdownId];
                                                                                        return newVisible;
                                                                                    });
                                                                                }}>
                                                                                    <Flex gap={6} align="center">
                                                                                        <DeleteIcon className="color-F86140 font-16" />
                                                                                        <div className="color-474F5E">删除组件</div>
                                                                                    </Flex>
                                                                                </a>
                                                                            )
                                                                        }
                                                                    ]
                                                                }}
                                                                placement="bottomLeft" 
                                                                trigger={["click"]}>
                                                            </MyDropdown>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })

                            return (
                                <div style={{borderTop: "1px solid #eaedf1"}}>
                                    <div className="template-title font-w-500">模板</div>
                                    {template}
                                    <ComponentAdd />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    background-color: #fff;
    display: flex;
    font-size: 14px;
    height: calc(100vh - 56px);
    border-right: 1px solid rgba(5, 5, 5, 0.06);
    .toolBar-toolMenu{
        align-items: center;
        background-color: #fff;
        border-right: 1px solid var(--grey-divider, #eaedf1);
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        min-width: 52px;
        padding-top: 6px;
        position: relative;
        width: 52px;
        z-index: 1001;
        .toolBar-buttonGroup{
            display: flex;
            flex-direction: column;
            .toolBar-themeIcon{
                border-radius: 4px;
                cursor: pointer;
                /* height: 36px; */
                margin-bottom: 4px;
                padding: 6px;
                position: relative;
                font-size: 16px;
            }
            .toolBar-activeIcon{
                background: var(--brand-selected-bg, #f0f7ff);
                color: #356dff;
                ::after{
                    background: var(--brand-primary, #356dff);
                    border-radius: 0 4px 4px 0;
                    content: "";
                    height: 20px;
                    left: -8px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 2px;
                }
            }
        }
    }

    .design-designContainer{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .design-sidebarHeader{
            padding: 12px 12px 12px 28px;
        }
        .design-sidebarContent{
            .fixedCompItem-sectionWrapper{
                border-top: 1px solid #eaedf1;
                /* border-bottom: 1px solid #eaedf1; */
                .fixedCompItem-sortItem{
                    position: relative;
                    background-color: #fff;
                    color: #363d4d;
                    cursor: pointer;
                    font-weight: 500;
                    min-height: 32px;
                    height: 32px;
                    width: 100%;
                    padding: 0 12px 0 4px;
                    &:hover{
                        background-color: #f7f8fb;
                        .blockContainer-addBlockBtn{
                            opacity: 1;
                        }
                    }
                    .sortItem{
                        padding: 0 6px;
                        height: 100%;
                        .actIcon{
                            transform: rotate(0);
                            transition: transform .3s;
                        }
                        .icon{
                            transform: rotate(-90deg);
                            transition: transform .3s;
                        }
                    }

                    .blockContainer-addBlockBtn{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        border-radius: var(--Radius-radius-s, 4px);
                        opacity: 0;
                        transition: .3s;
                        &:hover{
                            background-color: #eaedf1;
                            background: var(--Grey-bg-1, #eaedf1);
                        }
                    }

                    &.activeItem {
                        background-color: #f0f7ff;
                    }
                    &.activeItem::before{
                        background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAyNGE0IDQgMCAwIDAgNC00VjRhNCA0IDAgMCAwLTQtNHYyNFoiIGZpbGw9IiMzNTZERkYiLz48L3N2Zz4=);
                        content: "";
                        height: 24px;
                        left: 0;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                    }
                }
                .fixedCompItem-foldContainer {
                    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: max-height;
                }
                .fixedCompItem-foldContainer{
                    position: relative; // 关键修复点
                    /* 子项 */
                    .fixedCompItem-sortItem{
                        background-color: #fff;
                        color: #363d4d;
                        cursor: pointer;
                        font-weight: 500;
                        min-height: 32px;
                        height: 32px;
                        width: 100%;
                        padding: 0 12px 0 52px;
                        &:hover{
                            background-color: #f7f8fb;
                            .blockContainer-addBlockBtn{
                                opacity: 1;
                            }
                        }
                        .sortItem{
                            height: 100%;
                            .actIcon{
                                transform: rotate(0);
                                transition: transform .3s;
                            }
                            .icon{
                                transform: rotate(-90deg);
                                transition: transform .3s;
                            }
                        }

                        .blockContainer-addBlockBtn{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 24px;
                            height: 24px;
                            border-radius: 4px;
                            border-radius: var(--Radius-radius-s, 4px);
                            opacity: 0;
                            transition: .3s;
                            &:hover{
                                background-color: #eaedf1;
                                background: var(--Grey-bg-1, #eaedf1);
                            }
                        }

                        &.activeItem {
                            background-color: #f0f7ff;
                        }
                    }
                }
            }
            

            /* 模块 */
            .fixedCompItem-sectionWrapper-template{
                .fixedCompItem-sortItem{
                    position: relative;
                    background-color: #fff;
                    color: #363d4d;
                    cursor: pointer;
                    font-weight: 500;
                    min-height: 32px;
                    height: 32px;
                    width: 100%;
                    padding: 0 12px 0 4px;
                    &:hover{
                        background-color: #f7f8fb;
                        .blockContainer-addBlockBtn{
                            opacity: 1;
                        }
                    }
                    .sortItem{
                        padding: 0 6px;
                        height: 100%;
                        .actIcon{
                            transform: rotate(0);
                            transition: transform .3s;
                        }
                        .icon{
                            transform: rotate(-90deg);
                            transition: transform .3s;
                        }
                    }

                    .blockContainer-addBlockBtn{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        border-radius: var(--Radius-radius-s, 4px);
                        opacity: 0;
                        transition: .3s;
                        &:hover{
                            background-color: #eaedf1;
                            background: var(--Grey-bg-1, #eaedf1);
                        }
                    }

                    &.activeItem {
                        background-color: #f0f7ff;
                    }
                    &.activeItem::before{
                        background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAyNGE0IDQgMCAwIDAgNC00VjRhNCA0IDAgMCAwLTQtNHYyNFoiIGZpbGw9IiMzNTZERkYiLz48L3N2Zz4=);
                        content: "";
                        height: 24px;
                        left: 0;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                    }
                }

                .fixedCompItem-foldContainer {
                    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: max-height;
                }
                .fixedCompItem-foldContainer{
                    position: relative; // 关键修复点
                    /* padding-left: 24px; // 为竖线留出空间 */
                    .fixedCompItem-sortItem{
                        background-color: #fff;
                        color: #363d4d;
                        cursor: pointer;
                        font-weight: 500;
                        min-height: 32px;
                        height: 32px;
                        width: 100%;
                        padding: 0 12px 0 52px;
                        &:hover{
                            background-color: #f7f8fb;
                            .blockContainer-addBlockBtn{
                                opacity: 1;
                            }
                        }
                        .sortItem{
                            height: 100%;
                            .actIcon{
                                transform: rotate(0);
                                transition: transform .3s;
                            }
                            .icon{
                                transform: rotate(-90deg);
                                transition: transform .3s;
                            }
                        }

                        .blockContainer-addBlockBtn{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 24px;
                            height: 24px;
                            border-radius: 4px;
                            border-radius: var(--Radius-radius-s, 4px);
                            opacity: 0;
                            transition: .3s;
                            &:hover{
                                background-color: #eaedf1;
                                background: var(--Grey-bg-1, #eaedf1);
                            }
                        }
                    }
                }
            }
            .template-title{
                color: #474F5E;
                padding-left: 30px;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            
            .btn-add{
                padding-left: 52px;
                padding-top: 8px;
                padding-bottom: 8px;
            }

            
        }
    }
    
    .add-block-content{
        min-width: 240px;
        max-width: 240px;
        .title{
            padding: 6px 12px;
            font-weight: 500;
        }
        .item-box{
            padding-bottom: 4px;
            .item{
                padding: 5px 12px;
                cursor: pointer;
                color:#474F5E;
                &:hover{
                    background-color: #f5f5f5;
                }
            }
        }
        
    }
   
`

export default observer(Left)