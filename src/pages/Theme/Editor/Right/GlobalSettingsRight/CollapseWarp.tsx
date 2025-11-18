import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
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

// 引入lodash的debounce函数
import { debounce } from 'lodash';
import FaviconPicker from "../FaviconPicker";
import ColorPickerItem from "../ColorPickerItem";

// const setData = async (value:boolean)=>{

//     const newSettings = {
//         ...editor.settings,
//         settingsData:{
//             ...editor.settings.settingsData,
//             [item.id]:value
//         }
//     };

//     const operationData = {
//         mode: 'auto',
//         oseid: editor?.oseId??"",
//         themeId: editor.templateInfo.themeInfo?.id,
//         pageName: "",
//         languagesId: editor.languagesId,
//         settings: JSON.stringify(newSettings.settingsData)
//     };

//     // 执行操作
//     const newData = await templateUpdate(operationData);
//     if(newData){
//         // 保存操作到历史记录 -- 执行前的状态
//         editor.addToOperationHistory({
//             type: 'templateUpdate',
//             undoData: {
//                 ...operationData,
//                 settings:JSON.stringify(editor.settings.settingsData),
//                 oseid:newData.oseid,
//             },
//             redoData:{
//                 ...operationData,
//                 settings:JSON.stringify(newSettings.settingsData),
//                 oseid:newData.oseid,
//             },
//             timestamp: Date.now()
//         });

//         editor.setOseId(newData.oseid);
//         editor.setSettings(newSettings);
//     }
// }

// 提取CollapseItem为独立组件，使其能够响应settingsData变化
const CollapseWarp = memo(({ items,settingsData }: any) => {

    const intl = useIntl();
    // 创建防抖setData函数
    const debouncedSetData = useCallback(
        debounce(async (item: any, value: any) => {
            console.log(item.id, value);
            const newSettings = {
                ...editor.settings,
                settingsData: {
                    ...editor.settings.settingsData,
                    [item.id]: value
                }
            };

            
            console.log("newSettings", newSettings);
            const operationData = {
                mode: 'auto',
                oseid: editor?.oseId ?? "",
                themeId: editor.templateInfo.themeInfo?.id,
                pageName: "",
                languagesId: editor.languagesId,
                settings: JSON.stringify(newSettings.settingsData)
            };
            // 执行操作
            const newData = await templateUpdate(operationData);
            if (newData) {
                // 保存操作到历史记录 -- 执行前的状态
                editor.addToOperationHistory({
                    type: 'templateUpdate',
                    undoData: {
                        ...operationData,
                        settings: JSON.stringify(editor.settings.settingsData),
                        // oseid: newData.oseid,
                    },
                    redoData: {
                        ...operationData,
                        settings: JSON.stringify(newSettings.settingsData),
                        // oseid: newData.oseid,
                    },
                    timestamp: Date.now()
                });
                editor.setOseId(newData.oseid);
                editor.setSettings(newSettings);
            }
            editor.setIsSaveData(true);
        }, 500), []
    );

    

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
                        case 'color':{
                            let data = settingsData[item.id];
                            return (
                                <ColorPickerItem key={item.id} item={item} data={data} setData={debouncedSetData} />
                            )
                        }
                        case 'image_picker':{
                            let data = settingsData[item.id];
                            return (
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </div>}>
                                    <ImagePicker item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case 'favicon_picker':{
                            let data = settingsData[item.id];
                            return (
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <FaviconPicker item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case "menu_picker":{
                            let data = settingsData[item.id];
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <MenuPicker item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case 'range':{
                            let data = settingsData[item.id];
                            return (
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemRange item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case 'font':{
                            let data = settingsData[item.id];
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <FontFamily item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case "switch":{
                            let data = settingsData[item.id];
                            return (
                                <Form.Item key={index}>
                                    <Flex justify="space-between">
                                        <div>{intl.formatMessage({id: item.label})}</div>
                                        <ItemSwitch item={item} data={data} setData={debouncedSetData} />
                                    </Flex>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </Form.Item>
                            )
                        }
                        case "select":{
                            let data = settingsData[item.id];
                            return (
                                <Form.Item key={index} label={intl.formatMessage({id: item.label})}>
                                    <ItemSelect item={item} data={data} setData={debouncedSetData} />
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                        __html: intl.formatMessage({ id: item.info })
                                    }} ></div>}
                                </Form.Item>
                            )
                        }
                        case "url":{
                            let data = settingsData[item.id];
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemURL item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case "text":{
                            let data = settingsData[item.id];
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <ItemText item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
                        case "collection_picker":{
                            let data = settingsData[item.id];
                            return(
                                <Form.Item key={index} label={<div>
                                    <div>{intl.formatMessage({id: item.label})}</div>
                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                </div>}>
                                    <CollectionPicker item={item} data={data} setData={debouncedSetData} />
                                </Form.Item>
                            )
                        }
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