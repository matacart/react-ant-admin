import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, Flex } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";

import CollapseWarp from "./CollapseWarp";
import editor from "@/store/theme/editor";
import { observer } from "mobx-react-lite";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { settings } from 'nprogress';

function GlobalSettingsRight(){

    const intl = useIntl();

    // const [colorState, setColorState] = useState<Record<string, string>>({}); // 使用对象保存多个颜色状态

    const [items,setItems] = useState<CollapseProps['items']>([]);

    const [settingsData,setSettingsData] = useState<Record<string, any>>({});

    const basicThemeStyleInfoList = [
        {
            styleName: "Default",
            category: "clothing_fashion",
            styleConfig: {
                "themePdpPcPreviewImg": "https://img.myshopline.com/image/shopline/da06d99543f247369297ab634a19d8e9.jpeg",
                "themePdpMobilePreviewImg": "https://img.myshopline.com/image/shopline/335bf1965470411a93f5d91d09774618.jpeg",
                "title": {
                    "en": "Texture",
                    "ja": "テクスチャ",
                    "th": "พื้นผิว",
                    "id": "Tekstur",
                    "ms": "Tekstur",
                    "zh-hans-cn": "简约",
                    "zh-hant-tw": "質感"
                },
                "color": "#B19460",
                "previewUrl": "https://luxurydemo.myshopline.com/",
                "themeHomePcPreviewImg": "https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
                "themeHomeMobilePreviewImg": "https://img.myshopline.com/image/shopline/4eed021fca034b6eb75181a0ad435a47.jpeg"
            }
        },
        {
            styleName: "Food",
            category: "food_drink",
            styleConfig: {
                "themeHomePcPreviewImg": "https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
                "themeHomeMobilePreviewImg": "https://img.myshopline.com/image/shopline/dc20075fce4d49b7b1610cba412da7ff.jpeg",
                "themePdpPcPreviewImg": "https://img.myshopline.com/image/shopline/4e0e63dcf73c471084acd87e90c50e1b.jpeg",
                "themePdpMobilePreviewImg": "https://img.myshopline.com/image/shopline/84cf007a1fe148b387a659a7fde5dc00.jpeg",
                "title": {
                    "zh-hant-tw": "食物",
                    "en": "Food",
                    "ja": "食べ物",
                    "th": "อาหาร",
                    "id": "Mode 2",
                    "ms": "Mod 2",
                    "zh-hans-cn": "食物"
                },
                "color": "#FF0F00",
                "previewUrl": "https://food-demo.myshopline.com"
            }
        },
        {
            styleName: "Hammer",
            category: "household",
            styleConfig: {
                "title": {
                    "en": "Machinery",
                    "ja": "機械",
                    "th": "เครื่องจักร",
                    "id": "Mesin",
                    "ms": "Mesin",
                    "zh-hans-cn": "机械",
                    "zh-hant-tw": "機械"
                },
                "color": "#FFE46A",
                "previewUrl": "https://turbo-demo.myshopline.com",
                "themeHomePcPreviewImg": "https://img.myshopline.com/image/shopline/66a2caf453884c748b946018cfc7d11c.jpeg",
                "themeHomeMobilePreviewImg": "https://img.myshopline.com/image/shopline/67f6b3e06a854d5cb8e3a677d3119a3d.jpeg",
                "themePdpPcPreviewImg": "https://img.myshopline.com/image/shopline/65a1cc6846a642dd9537f38091ceafaa.jpeg",
                "themePdpMobilePreviewImg": "https://img.myshopline.com/image/shopline/f7b475b2220b4a3a9582f9b2dbf8bb38.jpeg"
            }
        },
        {
            styleName: "Grounded",
            category: "serve",
            styleConfig: {
                "themePdpPcPreviewImg": "https://img.myshopline.com/image/shopline/fdd94a481fcb4d4ea4c24083b2be010a.jpeg",
                "themePdpMobilePreviewImg": "https://img.myshopline.com/image/shopline/1f40a720679b4c07b144c2107fe9bff9.jpeg",
                "title": {
                    "ms": "Dinamik",
                    "zh-hans-cn": "动感",
                    "zh-hant-tw": "動感",
                    "en": "Dynamic",
                    "ja": "ダイナミック",
                    "th": "คล่องแคล่ว",
                    "id": "Dinamis"
                },
                "color": "#FD500B",
                "previewUrl": "https://fitnessnwellness.myshopline.com",
                "themeHomePcPreviewImg": "https://img.myshopline.com/image/shopline/f970183136af49bc8fa2d800ae2d8c7b.jpeg",
                "themeHomeMobilePreviewImg": "https://img.myshopline.com/image/shopline/de7d38cfad5f4ecab131559a6915f1fa.jpeg"
            }
        }
    ]
   
    // 当globalSetting或settingsData变化时重新生成items
    useEffect(() => {
        if (!editor.settings?.schema) return;
        const newItems: any[] = [];
        editor.settings.schema.map((item:any,index:number)=>{
            newItems.push(
                {
                    key: index,
                    label: intl.formatMessage({id: item.name }),
                    children: <CollapseWarp items={item} settingsData={editor.settings.settingsData} />,
                }
            )
        })
        // newItems.push({
        //     key:newItems.length+1,
        //     label: '主题风格',
        //     children: <CollapseWarp items={editor.settings.presets} />,
        // })
        if(editor.settings.presets){
            newItems.push({
                key:newItems.length,
                label: '主题风格',
                children: <>
                    <div className="theme_style">
                        {basicThemeStyleInfoList.map(item=>{
                            return (
                                <Flex gap={8} align="center" className="cursor-pointer theme_style_item">
                                    <div className="collapse_item" style={{backgroundColor:item.styleConfig.color}}></div>
                                    <div>{item.styleConfig.title['zh-hans-cn']}</div>
                                </Flex>
                            )
                        })}
                    </div>
                    <Flex className="theme_container" vertical justify="space-between">
                        <div>更改您主题风格的样式将影响网店的样式设置。 更改主题风格后，某些设置内容可能会被重置，但不会丢失任何已填入的文字、图片等内容。</div>
                        <Flex gap={12} justify="end">
                            <DefaultButton text="取消" />
                            <PrimaryButton text="修改风格" />
                        </Flex>
                    </Flex>
                </>,
            })
            console.log(editor.settings.presets)
        }
        setItems(newItems)
    }, [editor.settings]);

    return (
        <Scoped>
            <div className="right-content">
                <div className="header">
                    主题设置
                </div>
                <div className="content">
                    <div className="collapse">
                        <Collapse
                            bordered={false}
                            accordion
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="right"
                            items={items}
                            style={{ background: "#FFF" }}
                        />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}


const Scoped = styled.div`
    background-color: #fff;
    border-left: 1px solid rgba(5, 5, 5, 0.06);
    height: calc(100vh - 52px);
    .right-content{
        position: relative;
        height: 100%;
        .header{
            position: absolute;
            padding: 14px 16px;
            width: 100%;
            z-index: 99;
            font-size: 16px;
            font-weight: 600;
            color: #242833;
        }
        .content{
            color:#474F5E;
            height: calc(100% - 10px);
            padding-top: 48px;
            .collapse{
                padding-right: 8px;
                padding-left: 8px;
                height: 100%;
                overflow-y: auto;

                .ant-collapse-content-box{
                    padding: 0;
                }

                .theme_style{
                    border-top: 1px solid #eef1f7;
                    padding: 16px 24px;
                    .theme_style_item{
                        padding: 12px;
                        .collapse_item{
                            border-radius: 50%;
                            height: 16px;
                            margin-right: 8px;
                            width: 16px;
                        }
                        &:hover{
                            background-color: #f0f7ff;
                        }
                    }
                }
                .theme_container{
                    min-height: 300px;
                    border-top: 1px solid #eef1f7;
                    padding: 12px 24px 24px;
                    color: #7a8499;
                }
                
                
            }
        }
    }
`;

export default observer(GlobalSettingsRight)