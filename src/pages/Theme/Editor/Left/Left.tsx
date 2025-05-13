import { DownIcon, EditorAddBtnIcon, EditorAddIcon, EditorAnnouncementIcon, EditorApplyIcon, EditorComponentIcon, EditorConfigurationIcon, EditorMoreIcon, EditorRightIcon } from "@/components/Icons/Icons"
import { Dropdown, Flex, MenuProps, Tooltip } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"

import home from "../data/InstalledSections/home.json"
import { useIntl } from "@umijs/max";

interface CollapsedState {
    [key: string]: boolean;
}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a style={{color:"#F86140"}}>
          删除组件
        </a>
      ),
    },
];

function Left(){

    const intl = useIntl();

    // 0: 组件 1: 全局设置 2: 应用嵌入
    const [active, setActive] = useState(0)

    // 初始化所有区块为折叠状态
    const [collapsedSections, setCollapsedSections] = useState<CollapsedState>(
        home.data.reduce((acc, cur) => {
            
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

    useEffect(() => {
        // console.log(home)
        // console.log(home)
    }, [])

    return(
        <Scoped>
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
                    {home.data.map((res,index)=>{
                        // 公告栏
                        if(res.type == "SECTION" && res.id == "announcement-bar"){
                            const sectionId = res.config.sectionId!;
                            return(
                                <div key={sectionId} className="fixedCompItem-sectionWrapper" id={res.config.sectionId}>
                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" tabIndex={0} 
                                        onClick={() => setCollapsedSections(prev => ({
                                            ...prev,
                                            [sectionId]: !prev[sectionId]
                                        }))}
                                    >
                                        <Flex align="center" className="sortItem" gap={8}>
                                            <DownIcon className={collapsedSections[sectionId]?"font-12 icon":"font-12 actIcon"} />
                                            <EditorAnnouncementIcon className="font-20" /> 
                                            <div>{intl.formatMessage({id: res.config.schema.name})}</div>
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
                                        {res.config?.settingsData.block_order.map((order, index) => {
                                            if(res.config.settingsData.blocks[order].type == "item"){
                                                return(
                                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" >
                                                        <Flex align="center" className="sortItem" gap={8}>
                                                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                            <div>{intl.formatMessage({id:"t:sections.announcement-bar.blocks.item.name"})}</div>
                                                        </Flex>
                                                        <Flex className="addBlockBtn" align="center">
                                                            <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                                <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                    <EditorMoreIcon />
                                                                </div>
                                                            </Dropdown>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            }
                                        }
                                        )}
                                        <Flex className="btn-add color-356DFF cursor-pointer" align="center" gap={8}>
                                            <EditorAddBtnIcon className="font-20" />
                                            <div>添加内容</div>
                                        </Flex>
                                    </div>
                                </div>
                            )
                        }
                        // 页头
                        if(res.type == "SECTION" && res.id == "header"){
                            const sectionId = res.config.sectionId!;
                            return(
                                <div key={sectionId} className="fixedCompItem-sectionWrapper" id={res.config.sectionId}>
                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" tabIndex={0} 
                                        onClick={() => setCollapsedSections(prev => ({
                                            ...prev,
                                            [sectionId]: !prev[sectionId]
                                        }))}
                                    >
                                        <Flex align="center" className="sortItem" gap={8}>
                                            <DownIcon className={collapsedSections[sectionId]?"font-12 icon":"font-12 actIcon"} />
                                            <EditorAnnouncementIcon className="font-20" /> 
                                            <div>{intl.formatMessage({id: res.config.schema.name})}</div>
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
                                        {res.config?.settingsData.block_order.map((order, index) => {
                                            if(res.config.settingsData.blocks[order].type == "menuImage"){
                                                return(
                                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" >
                                                        <Flex align="center" className="sortItem" gap={8}>
                                                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                            <div>{intl.formatMessage({id:"t:sections.header.blocks.menuImage.name"})}</div>
                                                        </Flex>
                                                        <Flex className="addBlockBtn" align="center">
                                                            <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                                <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                    <EditorMoreIcon />
                                                                </div>
                                                            </Dropdown>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            }
                                        }
                                        )}
                                        <Flex className="btn-add color-356DFF cursor-pointer" align="center" gap={8}>
                                            <EditorAddBtnIcon className="font-20" />
                                            <div>添加内容</div>
                                        </Flex>
                                    </div>
                                </div>
                            )
                        }
                        // 模板
                        if(res.type == "TEMPLATE"){
                            const template = res.order.map((order,index)=>{
                                // console.log(res.sections[order])
                                return (
                                    <div key={order} className="fixedCompItem-sectionWrapper-template" id={order}>
                                        <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" tabIndex={0} 
                                            onClick={() => setCollapsedSections(prev => ({
                                                ...prev,
                                                [order]: !prev[order]
                                            }))}
                                        >
                                            <Flex align="center" className="sortItem" gap={8}>
                                                <DownIcon className={collapsedSections[order]?"font-12 icon":"font-12 actIcon"} />
                                                <EditorAnnouncementIcon className="font-20" /> 
                                                <div>{intl.formatMessage({id: res.sections[order].schema.name})}</div>
                                            </Flex>
                                            <Flex className="addBlockBtn" align="center">
                                                <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                    <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                        <EditorMoreIcon />
                                                    </div>
                                                </Dropdown>
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
                                            {/* 这里放折叠内容 */}
                                            {/* {res.sections[order].schema.blocks?.map((block, index) => (
                                                <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" >
                                                    <Flex align="center" className="sortItem" gap={8}>
                                                        <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                        <div>{block.name}</div>
                                                    </Flex>
                                                    <Flex className="addBlockBtn" align="center">
                                                        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                            <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                <EditorMoreIcon />
                                                            </div>
                                                        </Dropdown>
                                                    </Flex>
                                                </Flex>
                                            ))} */}
                                            <Flex className="btn-add color-356DFF cursor-pointer" align="center" gap={8}>
                                                <EditorAddBtnIcon className="font-20" />
                                                <div>添加内容</div>
                                            </Flex>
                                        </div>
                                    </div>
                                )
                            })

                            return (
                                <div style={{borderTop: "1px solid #eaedf1"}}>
                                    {/* <div className="template-title font-w-600">模块</div> */}
                                    {template}
                                    <Flex className="template-add color-356DFF cursor-pointer" align="center" gap={8}>
                                        <EditorAddBtnIcon className="font-20" />
                                        <div>添加组件</div>
                                    </Flex>
                                </div>
                            )
                        }
                        // 页脚
                        if(res.type == "SECTION" && res.id == "footer"){
                            const sectionId = res.config.sectionId!;
                            return(
                                <div key={sectionId} className="fixedCompItem-sectionWrapper" id={res.config.sectionId}>
                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" tabIndex={0} 
                                        onClick={() => setCollapsedSections(prev => ({
                                            ...prev,
                                            [sectionId]: !prev[sectionId]
                                        }))}
                                    >
                                        <Flex align="center" className="sortItem" gap={8}>
                                            <DownIcon className={collapsedSections[sectionId]?"font-12 icon":"font-12 actIcon"} />
                                            <EditorAnnouncementIcon className="font-20" /> 
                                            <div>{intl.formatMessage({id: res.config.schema.name})}</div>
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
                                        {res.config?.settingsData.block_order.map((order, index) => {
                                            if(res.config.settingsData.blocks[order].type == "menu"){
                                                return(
                                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" >
                                                        <Flex align="center" className="sortItem" gap={8}>
                                                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                            <div>{intl.formatMessage({id:"t:sections.footer.blocks.menu.name"})}</div>
                                                        </Flex>
                                                        <Flex className="addBlockBtn" align="center">
                                                            <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                                <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                    <EditorMoreIcon />
                                                                </div>
                                                            </Dropdown>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            }
                                            if(res.config.settingsData.blocks[order].type == "custom"){
                                                return(
                                                    <Flex id="section-announcement-bar" className="fixedCompItem-sortItem" justify="space-between" >
                                                        <Flex align="center" className="sortItem" gap={8}>
                                                            <img style={{width:"20px"}} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOSA0QzE5LjU1MjMgNCAyMCA0LjQ0NzcyIDIwIDVMMjAgOS41TDE5IDkuNUMxOC40NDc3IDkuNSAxOCA5LjA1MjI4IDE4IDguNUwxOCA2TDE1LjUgNkMxNC45NDc3IDYgMTQuNSA1LjU1MjI4IDE0LjUgNUwxNC41IDRMMTkgNFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDIwQzQuNDQ3NzIgMjAgNCAxOS41NTIzIDQgMTlMNCAxNC41TDUgMTQuNUM1LjU1MjI5IDE0LjUgNiAxNC45NDc3IDYgMTUuNUw2IDE4TDguNSAxOEM5LjA1MjI4IDE4IDkuNSAxOC40NDc3IDkuNSAxOUw5LjUgMjBMNSAyMFoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDVDNCA0LjQ0NzcyIDQuNDQ3NzIgNCA1IDRMOS41IDRWNUM5LjUgNS41NTIyOCA5LjA1MjI4IDYgOC41IDZMNiA2TDYgOC41QzYgOS4wNTIyOCA1LjU1MjI4IDkuNSA1IDkuNUg0TDQgNVoiIGZpbGw9IiM0NzRGNUUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMCAxOUMyMCAxOS41NTIzIDE5LjU1MjMgMjAgMTkgMjBMMTQuNSAyMEwxNC41IDE5QzE0LjUgMTguNDQ3NyAxNC45NDc3IDE4IDE1LjUgMThMMTggMThMMTggMTUuNUMxOCAxNC45NDc3IDE4LjQ0NzcgMTQuNSAxOSAxNC41TDIwIDE0LjVMMjAgMTlaIiBmaWxsPSIjNDc0RjVFIi8+Cjwvc3ZnPgo=" />
                                                            <div>{intl.formatMessage({id:"t:sections.footer.blocks.custom.name"})}</div>
                                                        </Flex>
                                                        <Flex className="addBlockBtn" align="center">
                                                            <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
                                                                <div onClick={(e) => e.stopPropagation()} className="blockContainer-addBlockBtn ant-dropdown-trigger">
                                                                    <EditorMoreIcon />
                                                                </div>
                                                            </Dropdown>
                                                        </Flex>
                                                    </Flex>
                                                )
                                            }
                                        }
                                        )}
                                        <Flex className="btn-add color-356DFF cursor-pointer" align="center" gap={8}>
                                            <EditorAddBtnIcon className="font-20" />
                                            <div>添加内容</div>
                                        </Flex>
                                    </div>
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

    .toolBar-toolMenu{
        align-items: center;
        background-color: #fff;
        border-right: 1px solid #eaedf1;
        border-right: 1px solid var(--grey-divider, #eaedf1);
        display: flex;
        flex-direction: column;
        height: calc(100vh - 56px);
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
        .design-sidebarHeader{
            padding: 12px 12px 12px 28px;
        }
        .design-sidebarContent{
            .fixedCompItem-sectionWrapper{
                border-top: 1px solid #eaedf1;
                /* border-bottom: 1px solid #eaedf1; */
                .fixedCompItem-sortItem{
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
                .fixedCompItem-foldContainer {
                    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: max-height;
                }
                .fixedCompItem-foldContainer{
                    position: relative; // 关键修复点
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
            

            /* 模块 */
            .fixedCompItem-sectionWrapper-template{
                .fixedCompItem-sortItem{
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
                padding-left: 24px;
                padding-top: 6px;
                padding-bottom: 6px;
            }
            .template-add{
                padding-left: 24px;
                padding-top: 8px;
                padding-bottom: 8px;
            }
            .btn-add{
                padding-left: 52px;
                padding-top: 8px;
                padding-bottom: 8px;
            }
        }
    }
`

export default Left