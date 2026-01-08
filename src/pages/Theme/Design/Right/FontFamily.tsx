import MyButton from "@/components/Button/MyButton"
import { RightIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { CheckCircleFilled } from "@ant-design/icons"
import { ConfigProvider, Drawer, Dropdown, Flex, MenuProps, theme } from "antd"
import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

import fonts from "../data/fontFamily.json"
import React from "react"

interface FontsType{
    defaultVariant:any,
    family:string,
    lastModified:string,
    variants:any[],
    version:string
}

function FontFamily({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    const mRef = useRef(null);

    const [open,setOpen] = useState(false);

    // 默认数据
    const defaultData = item.default || {value:"Poppins:300"};
    // 字体数据
    // 字体名
    const [fontFamily,setFontFamily] = useState("");
    // 字体风格
    const [fontStyle,setFontStyle] = useState("");

    const [menu,setMenu] = useState<FontsType[]>([]);

    const { useToken } = theme;
    const { token } = useToken();
    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle: React.CSSProperties = {
        padding: "8px 0",
        boxShadow: 'none',
    };

    const [items,setItems] = useState<MenuProps['items']>([]);

    // 提交
    const submit = ()=>{
        setOpen(false);
        setData(item,fontFamily+":"+fontStyle);
    }

    // 取消
    const cancel = ()=>{
        const fontDataValues = fontData.split(":");
        const fontDataValue = fontDataValues[0];
        const fontDataItem = fontDataValues[1];
        setFontFamily(fontDataValue);
        setFontStyle(fontDataItem);
        setOpen(false);
    }

    // 恢复默认
    const reDefault = ()=>{
        const fontDataValues = item.default.split(":");
        const fontDataValue = fontDataValues[0];
        setFontFamily(fontDataValue);
        const fontDataItem = fontDataValues[1];
        setFontStyle(fontDataItem)
        setData(item,item.default);
    }

    useEffect(()=>{
        setMenu(fonts);
        const fontData = data || defaultData;
        if(fontData){
            const fontDataValues = fontData.split(":");
            const fontDataValue = fontDataValues[0];
            setFontFamily(fontDataValue);
            const fontDataItem = fontDataValues[1];
            setFontStyle(fontDataItem)
            const variants  = fonts.find(fontItem=>fontItem.family == fontDataValue)?.variants || [];
            setItems(variants.map((item,index)=>{
                return {
                    key:item.variant+index,
                    label: <a onClick={()=>{
                        setFontStyle(item.variant);
                    }}>{item.variant}</a>,
                }
            }))
        }
    },[])


    useMemo(()=>{
        const fontData = data || defaultData;
        if(fontData){
            const fontDataValues = fontData.split(":");
            const fontDataValue = fontDataValues[0];
            setFontFamily(fontDataValue);
            const fontDataItem = fontDataValues[1];
            setFontStyle(fontDataItem)
            const variants  = fonts.find(fontItem=>fontItem.family == fontDataValue)?.variants || [];
            setItems(variants.map((item,index)=>{
                return {
                    key:item.variant+index,
                    label: <a onClick={()=>{
                        setFontStyle(item.variant);
                    }}>{item.variant}</a>,
                }
            }))
        }
    },[data])

    return (
        <Scoped ref={mRef}>  
            <div className="select cursor-pointer">
                <div className="title">{fontFamily}</div>
                <div className="desc">{fontStyle}</div>
                <Flex gap={12}>
                    <MyButton text={"恢复默认"} style={{height:"36px",flex:1}} onClick={reDefault} />
                    <MyButton text={"更换"} style={{height:"36px",flex:1}} onClick={()=>setOpen(true)} />
                </Flex>
            </div>
            <Drawer
                getContainer={()=>mRef.current!}
                width={319}
                closeIcon={null}
                title={<div>请选择字体</div>}
                mask={false}
                open={open}
                classNames={{
                    body: 'menu-box'
                }}
                onClose={cancel}
                footer={
                    <Flex justify="space-between" align="center" gap={20}>
                        <div style={{flex:1}}>
                            <div>{fontFamily}</div>
                            {fontStyle && <ConfigProvider
                                theme={{
                                    token: {
                                        paddingXXS:0 
                                    },
                                }}
                            >
                                <Dropdown
                                    trigger={['hover']}
                                    menu={{ items }}
                                    popupRender={(menu)=>{
                                        return (
                                            <div style={contentStyle}>
                                                <div>
                                                    {React.cloneElement(
                                                        menu as React.ReactElement<{
                                                            style: React.CSSProperties;
                                                        }>,
                                                        { style: menuStyle },
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }}
                                >
                                    <Flex gap={2} className="font-12 cursor-pointer" align="center">
                                        <div>{fontStyle}</div>
                                        <RightIcon />
                                    </Flex>
                                </Dropdown>
                            </ConfigProvider>}
                        </div>
                        <Flex gap={8}>
                            <MyButton text="取消" onClick={cancel}/>
                            <MyButton color="primary" variant="solid" text="完成" onClick={submit}/>
                        </Flex>
                    </Flex>
                }
            >
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder="搜索名称" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <div className="menu-box">
                        {menu.map((item,index)=>(
                            <Flex key={index} className="menu-item" justify="space-between" align="center" onClick={()=>{
                                setFontFamily(item.defaultVariant.family);
                                setFontStyle(item.defaultVariant.variant);
                                setItems(item.variants.map((vItem,index)=>{
                                    return {
                                        key:vItem.variant+index,
                                        label: <a onClick={()=>{
                                            setFontStyle(vItem.variant);
                                        }}>{vItem.variant}</a>,
                                    }
                                }))
                            }}>
                                {item.family}
                                {item.family == fontFamily && <CheckCircleFilled className="color-356DFF font-16" />}
                            </Flex>
                        ))}
                        
                    </div>
                </>
            </Drawer>
        </Scoped>
    )
}

const Scoped = styled.div`

    .ant-drawer-content-wrapper{
        top: 52px;
        box-shadow:none;
    }

    .select{
        border-radius: 4px;
        background-color: #f7f8fb;
        border: 1px dashed #d7dbe7;
        padding: 12px;

        .title{
            font-weight: 600;
            font-size: 18px;
            color:#242633;
            margin-bottom: 4px;
        }
        .desc{
            font-size: 12px;
            color:#7A8499;
            margin-bottom: 12px;
        }

    }
    .menu-box{
        padding: 0;
        height: calc(100% - 60px);
        overflow-y: auto;
        .menu-item{
            padding: 18px 16px;
            border-bottom: 1px solid #eef1f7;
            cursor: pointer;
            &:hover{
                background-color: #f7f8fb;
            }
        }
    }
    

`

export default FontFamily