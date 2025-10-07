import { EditorAddBtnIcon, EditorTextImgIcon } from "@/components/Icons/Icons";
import { Flex, Popover, Tabs, TabsProps } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ComponentMenu from "./ComponentMenu";

import sections from "../data/sections.json";

function ComponentAdd(){

    const groupTitle = [
        "图文展示",
        "商品展示",
        "客户运营",
        "信任组件",
        "博客",
        "其它",
        "自定义"
    ]

    const menuGroup = Object.groupBy(sections.data.list, (component:any)=>{
        if(component.schema.presets.length >0){
            return component.schema.presets[0].category_index
        }
    })
    const menuList:any[] = [];
    Object.keys(menuGroup).forEach((key:string,index:number) => {
        if (key !== "undefined" && menuGroup[key]) {
            menuList.push({
                groupTitle:groupTitle[index],
                children:menuGroup[key]
            });
        }
    });

    // console.log(menuList)

    // const menuData = [
    //     {   
    //         groupTitle: '图文展示',
    //         children: [
    //             {
    //                 key: '1-1',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '图片横幅',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-2',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '拼贴',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-3',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '轮播图',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-4',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '拼接图文模块',
    //                     type: 'textImg'
    //                 }
    //             },
                
    //             {
    //                 key: '1-5',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '图文列表',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-6',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '视频',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-7',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '折扣推广',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-8',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '特色轮播图',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-9',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '图片悬浮切换',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-10',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '图文模块',
    //                     type: 'textImg'
    //                 }
    //             },
    //             {
    //                 key: '1-11',
    //                 data: {
    //                     icon: <EditorTextImgIcon className="font-24" />,
    //                     text: '富文本',
    //                     type: 'textImg'
    //                 }
    //             }
    //         ]
    //     },
    //     // {   
    //     //     groupTitle: '商品展示',
    //     //     children: [
    //     //         {
    //     //             key: '2-1',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '图片横幅'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '2',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '拼贴'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '3',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '轮播图'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '4',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '拼接图文模块'
    //     //             }
    //     //         },
                
    //     //         {
    //     //             key: '5',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '图文列表'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '6',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '视频'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '7',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '折扣推广'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '8',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '特色轮播图'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '9',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '图片悬浮切换'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '10',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '图文模块'
    //     //             }
    //     //         },
    //     //         {
    //     //             key: '11',
    //     //             data: {
    //     //                 icon: <EditorTextImgIcon className="font-24" />,
    //     //                 text: '富文本'
    //     //             }
    //     //         }
    //     //     ]
    //     // },
    // ]

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '主题',
          children: <div style={{height:"600px"}}>
            <ComponentMenu items={menuList} />
          </div>,
        },
        {
          key: '2',
          label: '应用',
          children: <div style={{height:"600px"}}>
            <Flex align="center" justify="center" style={{height:"100%"}}>
                <div className="font-12 color-7A8499">你尚未安装提供组件的应用，或你的应用组件不支持在此主题使用。</div>
            </Flex>
          </div>,
        },
    ];

    const content = (
        <Content>
            <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
        </Content>
    )

    useEffect(()=>{
       
    },[])

    return (
        <Scoped>
            <Popover
                overlayStyle={{
                    left:"376px"
                }}
                overlayInnerStyle={{
                    marginTop:"6px",
                    marginBottom:"6px",
                    minWidth: "320px",
                    padding:0,
                    border: "1px solid #d7dbe7",
                    borderRadius: "4px",
                    boxShadow: "0 4px 12px #0000000d",
                }} content={content} trigger="click" arrow={false} placement="bottom"
            >
                <Flex className="add-component color-356DFF cursor-pointer" align="center" gap={8}>
                    <EditorAddBtnIcon className="font-20" />
                    <div className="font-w-500">添加组件</div>
                </Flex>
            </Popover>
        </Scoped>
    )
}

const Scoped = styled.div`
    .add-component{
        padding-left: 30px;
        padding-top: 8px;
        padding-bottom: 8px;
    }
`

const Content = styled.div`
    width: 660px;
`;




export default ComponentAdd;