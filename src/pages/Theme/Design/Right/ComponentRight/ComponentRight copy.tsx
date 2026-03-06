import { Breadcrumb, Flex, Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import editor from '@/store/theme/editor';
import { observer } from "mobx-react-lite";
import ImagePicker from "../ImagePicker";
import FontFamily from "../FontFamily";
import ItemSwitch from "../ItemSwitch";
import ItemSelect from "../ItemSelect";
import ItemURL from "../ItemURL";
import ItemText from "../ItemText";
import CollectionPicker from "../CollectionPicker";
import MenuPicker from "../MenuPicker";
import ItemRange from "../ItemRange";
import ProductPicker from "../ProductPicker";
import ItemTextArea from "../ItemTextArea";
import TextAlign from "../TextAlign";
import BlogCollection from "../BlogCollection";
import { templateUpdate } from "@/services/y2/api";
import { useIntl } from "@umijs/max";
import { debounce, isEqual } from 'lodash';
import ColorPickerItem from "../ColorPickerItem";
import ItemChoosePaymentIcons from "../ItemChoosePaymentIcons";
import ItemRichtext from "../ItemRichtext";
import ItemVideo from "../ItemVideo";
import ItemVideoUrl from "../ItemVideoUrl";
import { toJS } from "mobx";
import { BigScreenIcon } from "@/components/Icons/Icons";


interface componentConfigType {
    id:string;
    components: any[],
    componentsData: any
}

function ComponentRight({templateUpdatePromiseRef}:{templateUpdatePromiseRef: React.MutableRefObject<Promise<any> | null>}){

    const intl = useIntl();

    const [loading,setLoading] = useState<boolean>(false);

    const [title,setTitle] = useState<string>("");

    const [value, setValue] = useState("");

    const [componentConfig, setComponentConfig] = useState<componentConfigType>({
        id: "",
        components: [],
        componentsData: {}
    });

    const [head,setHead] = useState([
        {
            title: 'Home',
        },
        {
            title: 'Application Center',
        },
    ]);

    // 创建防抖setData函数
    const debouncedSetData = useCallback(
        debounce(async (item: any, value: any) => {
            if(!editor.component) return;
            // 更新前的状态
            let oldSections;
            // 匹配section
            if(editor.component?.type == "section"){
                oldSections = editor.templateData.filter((res:any)=>res.type !== "TEMPLATE")
            }
            // 匹配template
            if(editor.component?.type == "template"){
                oldSections = editor.templateData.filter((res:any)=>res.type == "TEMPLATE")
            }
            // 更新数据
            await editor.updateComponentSettings(editor.component.id,{
                [item.id]:{ value:value }
            })
            let newSections;
            // 匹配section
            if(editor.component?.type == "section"){
                newSections = editor.templateData.filter((res:any)=>res.type !== "TEMPLATE")
            }
            // 匹配template
            if(editor.component?.type == "template"){
                newSections = editor.templateData.filter((res:any)=>res.type == "TEMPLATE")
            }
            const operationData = {
                mode: editor.mode,
                oseid: editor.oseId,
                themeId: editor.templateInfo.themeInfo.id,
                pageName: editor.component?.type == "template" ? editor.templateInfo.themeName : "",
                versionId: editor.versionId,
                languagesId:editor.languagesId,
                sections: JSON.stringify(newSections)
            };
            // 执行操作
            const newData = await templateUpdate(operationData);
            if(newData){
                // 保存操作到历史记录
                editor.addToOperationHistory({
                    type: 'templateUpdate',
                    undoData: {
                        ...operationData,
                        sections:JSON.stringify(oldSections)
                    },
                    redoData: {
                        ...operationData,
                        sections:JSON.stringify(newSections)
                    },
                    timestamp: Date.now()
                });
            }
            editor.setIsSaveData(true);
        }, 600), []
    );

    const updateComponentConfig = ()=>{
        let newComponents = [];
        let newComponentsData = {};
        const templateData = toJS(editor.templateData);
        if(editor.component){
            switch(editor.component.type){
                case 'section':
                    const section = templateData.find(res => res.config?.sectionId === editor.component?.id)
                    if(editor.component?.itemId){
                        const component = section.config.schema.blocks.filter(item=>item.type == section.config.settingsData.blocks[editor.component.itemId]?.type)
                        // 匹配元素
                        if(component.length > 0){
                            setHead([
                                {
                                    title: intl.formatMessage({id: section.config.schema.name}),
                                },
                                {
                                    title: intl.formatMessage({id: component[0]?.name ?? "" }) ,
                                }
                            ]);
                            newComponents = component[0].settings??[];
                            newComponentsData = section.config.settingsData.blocks[editor.component.itemId].settings;
                        }
                    }else{
                        setHead([
                            {
                                title: intl.formatMessage({id: section.config.schema.name ?? ""}) ,
                            }
                        ])
                        newComponents = section.config.schema.settings ?? [];
                        newComponentsData = Array.isArray(section.config.settingsData.settings) ? {} : section.config.settingsData.settings;
                    }
                    break;
                case 'template':
                    const template = templateData.find(res => res.type == "TEMPLATE").sections[editor.component?.id]
                    if(editor.component?.itemId){
                        const component = template.schema.blocks.filter(item=>item.type == template.settingsData.blocks[editor.component.itemId].type)
                        if(component){
                            setHead([
                                {
                                    title: intl.formatMessage({id: template.schema.name}),
                                },
                                {
                                    title: intl.formatMessage({id: component[0]?.name ?? "" }) ,
                                }
                            ])
                            newComponents = component[0].settings??[];
                            newComponentsData = template.settingsData.blocks[editor.component.itemId].settings;
                        }
                    }else{
                        setHead([
                            {
                                title: intl.formatMessage({id: template.schema.name ?? ""}) ,
                            }
                        ])
                        newComponents = template.schema.settings ?? [];
                        newComponentsData = template.settingsData.settings;
                        break;
                    }
                  
            }
        }else{
            console.log("no component")
            newComponents = [] 
        }
        setComponentConfig({
            id:editor.component?.itemId || editor.component?.id ||"",
            components:newComponents,
            componentsData:newComponentsData
        });
    }

    // 监听组件
    useEffect(()=>{
        updateComponentConfig();
    },[editor.component,editor.templateData])
  
    return (
        <Scoped>
            {
                componentConfig.components && componentConfig.components.length > 0 ?
                    <div className="right-content">
                        <div className="header">
                            <Breadcrumb
                                style={{fontSize:"12px"}}
                                separator=">"
                                items={head}
                            />
                        </div>
                        <div className="content font-14">
                            <Form layout="vertical" className="form color-474F5E">
                                {componentConfig.components?.map((item:any,index:number)=>{
                                    switch (item.type) {
                                        case "group_header":
                                            return (
                                                <div key={componentConfig.id+'-'+index} style={{marginBottom:"16px",fontWeight:500}}>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                        __html: intl.formatMessage({ id: item.info })
                                                    }} ></div>}
                                                </div>
                                            )
                                        case "switch":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index}>
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
                                        case "choose_payment_icons":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index}>
                                                    <ItemChoosePaymentIcons item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "select":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index} label={intl.formatMessage({id: item.label})}>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                        __html: intl.formatMessage({ id: item.info })
                                                    }} ></div>}
                                                    <ItemSelect item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "range":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemRange item={item} data={data} setData={debouncedSetData} /> 
                                                </Form.Item>
                                            )
                                        }
                                        case "image_picker":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                        __html: intl.formatMessage({ id: item.info })
                                                    }} ></div>}
                                                </div>}>
                                                    <ImagePicker item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "color":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return (
                                                <Form.Item key={componentConfig.id+'-'+index} label={false}>
                                                    <ColorPickerItem key={componentConfig.id+'-'+index} item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "menu_picker":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <MenuPicker item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "text":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemText item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "url":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemURL item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "richtext":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemRichtext itemId={componentConfig.id} item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "textarea":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemTextArea item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "product_picker":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ProductPicker item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "collection_picker":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <CollectionPicker item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "video":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemVideo item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "video_url":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            console.log(item.id,data);
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <ItemVideoUrl item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "font":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <FontFamily item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "text_align":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <TextAlign item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                        case "blog":{
                                            let data = componentConfig.componentsData[item.id]?.value;
                                            return(
                                                <Form.Item key={componentConfig.id+'-'+index} label={<div>
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                                </div>}>
                                                    <BlogCollection item={item} data={data} setData={debouncedSetData} />
                                                </Form.Item>
                                            )
                                        }
                                    }
                                })}
                            </Form>
                        </div>
                        <div className="footer">
                            <div className="color-356DFF cursor-pointer" onClick={()=>editor.setComponent(null)}>完成</div>
                        </div>
                    </div>
                :<div className="right-blank">
                    <Flex vertical justify="center" align="center">
                        <div>
                            {/*  */}
                            <BigScreenIcon />
                        </div>
                        <div className="font-w-600 font-20" style={{marginTop:"32px"}}>选择要编辑的组件</div>
                        <div className="color-7A8499" style={{marginTop:"12px"}}>在画布中点击组件进行编辑</div>
                    </Flex>
                </div>
            }
        </Scoped>
    )
}

const Scoped = styled.div`
    background-color: #fff;
    border-left: 1px solid rgba(5, 5, 5, 0.06);
    border-right: 1px solid rgba(5, 5, 5, 0.06);
    height: calc(100vh - 52px);
    .right-blank{
        display: none;
        padding: 0 40px;
    }
    .right-content{
        position: absolute;
        left:52px;
        width: 300px;
        height: calc(100vh - 52px);
        z-index: 99;
        background-color: #FFF;
        border-right: 1px solid rgba(5, 5, 5, 0.06);
        .header{
            top: -50px;
            padding: 14px 16px;
            width: 100%;
            z-index: 99;
            background-color: #F7F8FB;
            font-size: 12px;
            color: #242833;
        }
        .content{
            color:#474F5E;
            height: calc(100% - 40px);
            padding-bottom: 40px;
            .form{
                padding:16px;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                .color-picker{
                    height: 36px;
                    width: 36px;
                    border: 1px solid #d7dbe7;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
        .footer{
            position: absolute;
            background-color: #FFF;
            border-top: 1px solid #eaedf1;
            bottom: 0;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 16px;
            z-index: 999;
        }
    }

    @media only screen and (min-width: 1600px) {
        .right-blank{
            display: block;
        }
        .right-content{
            position: relative;
            left: 0;
            width: 300px;
            height: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
            .footer{
                display: none;
            }
            .content{
                padding-bottom: 0;
            }
        }
    }
    

`

export default observer(ComponentRight);
