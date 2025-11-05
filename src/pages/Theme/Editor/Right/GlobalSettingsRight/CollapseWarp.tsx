import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import ColorPickerItem from "./ColorPickerItem";
import ImagePicker from "../ImagePicker";
import { Flex, Form } from "antd";
import FontFamily from "../FontFamily";
import ItemSwitch from "../ItemSwitch";
import ItemSelect from "../ItemSelect";
import ItemURL from "../ItemURL";
import ItemText from "../ItemText";
import CollectionPicker from "../CollectionPicker";
import MenuPicker from "../MenuPicker";
import ItemRange from "../ItemRange";
import { useIntl } from "@umijs/max";
import editor from "@/store/theme/editor";
import { templateUpdate } from "@/services/y2/api";

// 提取CollapseItem为独立组件，使其能够响应settingsData变化
const CollapseWarp = memo(({ items,settingsData }: any) => {

    const intl = useIntl();

    return (
        <CollapseItem>
            <Form layout="vertical" className="form color-474F5E">
                {items.settings?.map((item:any,index:number)=>{
                    switch (item.type) {
                        case 'group_header':
                            return (
                                <div className="item" key={item.label}>
                                    <div className="head">{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div style={{marginTop:"4px"}} className="color-7A8499 font-12">{intl.formatMessage({id: item.info})}</div>}
                                </div>
                            )
                        // case 'color_picker':
                        //     return <ColorPickerItem res={item} />
                        // case 'color':
                        //     return <ColorPickerItem res={item} />
                        case 'image_picker':
                            return (
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </div>}>
                                    <ImagePicker image={""} setImage={()=>{}} />
                                </Form.Item>
                            )
                        case "menu_picker":
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <MenuPicker />
                                </Form.Item>
                            )
                        case 'range':
                            return (
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemRange item={item} />
                                </Form.Item>
                            )
                        case 'font':
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <FontFamily />
                                </Form.Item>
                            )
                        case "switch":
                            let data = settingsData[item.id];
                            const setData = async (value:boolean)=>{

                                const newSettings = {
                                    ...editor.settings,
                                    settingsData:{
                                        ...editor.settings.settingsData,
                                        [item.id]:value
                                    }
                                };

                                const operationData = {
                                    mode: 'auto',
                                    oseid: editor?.oseId??"",
                                    themeId: editor.templateInfo.themeInfo?.id,
                                    pageName: "",
                                    languagesId: editor.languagesId,
                                    settings: JSON.stringify(newSettings.settingsData)
                                };

                                // 执行操作
                                const newData = await templateUpdate(operationData);
                                if(newData){
                                    // 保存操作到历史记录 -- 执行前的状态
                                    editor.addToOperationHistory({
                                        type: 'templateUpdate',
                                        undoData: {
                                            ...operationData,
                                            settings:JSON.stringify(editor.settings.settingsData),
                                            oseid:newData.oseid,
                                        },
                                        redoData:{
                                            ...operationData,
                                            settings:JSON.stringify(newSettings.settingsData),
                                            oseid:newData.oseid,
                                        },
                                        timestamp: Date.now()
                                    });

                                    editor.setOseId(newData.oseid);
                                    editor.setSettings(newSettings);
                                }
                            }

                            return (
                                <Form.Item key={index}>
                                    <Flex justify="space-between">
                                        <div>{intl.formatMessage({id: item.label})}</div>
                                        <ItemSwitch item={item} data={data} setData={setData} />
                                    </Flex>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </Form.Item>
                            )
                        case "select":
                            return (
                                <Form.Item key={index} label={intl.formatMessage({id: item.label})}>
                                    <ItemSelect />
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </Form.Item>
                            )
                        case "url":
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemURL />
                                </Form.Item>
                            )
                        case "text":
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemText />
                                </Form.Item>
                            )
                        case "collection_picker":
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <CollectionPicker />
                                </Form.Item>
                            )
                    }
                    return null;
                    // font_lib_picker
                })}
            </Form>
        </CollapseItem>
    );
},(prevProps, nextProps) => {
    // 自定义比较函数，只有当相关数据变化时才重新渲染
    return (
        prevProps.item === nextProps.item &&
        prevProps.settingsData === nextProps.settingsData
    );
})


export default CollapseWarp;

const CollapseItem = styled.div`
    border-top: 1px solid #eef1f7;
    padding: 16px;
    padding-bottom: 0;
    padding-top: 0;
    .form{
        margin-top: 16px;
    }

    .item{
        margin-bottom: 20px;
        .color-picker{
            height: 36px;
            width: 36px;
            border: 1px solid #d7dbe7;
            border-radius: 4px;
            cursor: pointer;
        }
        .head{
            padding-top: 20px;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: -4px;
                left: -16px;
                right: -16px;
                border-top: 4px solid #f0f3f9;
            }
        }
    }
    /* 移除第一个 head 的 before 伪元素 */
    .item:first-child .head:before {
        display: none;
    }
    /* 移除第一个 head 的 padding */
    .item:first-child .head {
        padding-top: 0;
    }
`