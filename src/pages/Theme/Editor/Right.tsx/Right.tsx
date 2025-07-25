import { Breadcrumb, ColorPicker, Flex, Form, Input, Radio, Slider, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import editor from '@/store/theme/editor';
import MySelect from "@/components/Select/MySelect";
import { observer } from "mobx-react-lite";
import { useIntl } from "@/.umi/plugin-locale/localeExports";
import MyInput from "@/components/Input/MyInput";
import ImagePicker from "./ImagePicker";
import MenuPicker from "./MenuPicker";
import MinTinyMce from "@/components/MCE/MinTinyMce";
import TextAlign from "./TextAlign";
import BlogCollection from "./BlogCollection";
import FontFamily from "./FontFamily";
import Video from "./Video";
import ProductPicker from "./ProductPicker";



const { TextArea } = Input;

function Right(){

    const intl = useIntl();

    const [components,setComponents] = useState<[] | null>(null);

    const [componentsData,setComponentsData] = useState<any | null>(null);

    const [colorState, setColorState] = useState<Record<string, string>>({}); // 使用对象保存多个颜色状态

    const [title,setTitle] = useState<string>("");

    const [value, setValue] = useState("");

    const [head,setHead] = useState([
        {
            title: 'Home',
        },
        {
            title: 'Application Center',
        },
    ]);

    useEffect(()=>{

        if(editor.component){
            switch(editor.component.type){
                case 'section':
                    const section = editor.templateData.find(res => res.config?.sectionId === editor.component?.id)
                    if(editor.component?.itemId){
                        const component = section.config.schema.blocks.filter(item=>item.type == section.config.settingsData.blocks[editor.component.itemId].type)
                        if(component){
                            setHead([
                                {
                                    title: intl.formatMessage({id: section.config.schema.name}),
                                },
                                {
                                    title: intl.formatMessage({id: component[0]?.name ?? "" }) ,
                                }
                            ])
                            setComponents(component[0].settings??[])
                            setComponentsData(section.config.settingsData.blocks[editor.component.itemId].settings)
                        }
                    }else{
                        setHead([
                            {
                                title: intl.formatMessage({id: section.config.schema.name ?? ""}) ,
                            }
                        ])
                        setComponents(section.config.schema.settings ?? [])
                        setComponentsData(section.config.settingsData.settings)
                    }
                    break;
                case 'template':
                    const template = editor.templateData[2].sections[editor.component?.id]
                    setHead([
                        {
                            title: intl.formatMessage({id: template.schema.name ?? ""}) ,
                        }
                    ])
                    setComponents(template.schema.settings ?? [])
                    setComponentsData(template.settingsData.settings)
                    break;
            }
        }

        // 监听组件
    },[editor.component])

    return (
        <Scoped>
            {
                // {intl.formatMessage({id: title})}
                components ? <div className="right-content">
                    <div className="header">
                        <Breadcrumb
                            style={{fontSize:"12px"}}
                            separator=">"
                            items={head}
                        />
                    </div>
                    <div className="content font-14">
                        <Form layout="vertical" className="form color-474F5E">
                            {components?.map((item:any,index:number)=>{
                                switch (item.type) {
                                    case "switch":
                                        return (
                                            <Form.Item key={index}>
                                                <Flex justify="space-between">
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    <Switch checked={componentsData[item.id]?.value ?? true} onChange={async (check:boolean)=>{
                                                        await setComponentsData({
                                                            ...componentsData,
                                                            [item.id]: {value:check}
                                                        })
                                                        editor.updateComponentSettings(editor.component.id,{
                                                            ...componentsData,
                                                            [item.id]: {value:check}
                                                        })
                                                    }} />
                                                </Flex>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                    __html: intl.formatMessage({ id: item.info })
                                                }} ></div>}
                                            </Form.Item>
                                        )
                                    case "choose_payment_icons":
                                        return (
                                            <Form.Item key={index}>
                                                <Flex justify="space-between">
                                                    <div>{intl.formatMessage({id: item.label})}</div>
                                                    <Switch checked={componentsData[item.id]?.value ?? true} onChange={async (check:boolean)=>{
                                                        await setComponentsData({
                                                            ...componentsData,
                                                            [item.id]: {value:check}
                                                        })
                                                        editor.updateComponentSettings(editor.component.id,{
                                                            ...componentsData,
                                                            [item.id]: {value:check}
                                                        })
                                                    }} />
                                                </Flex>
                                            </Form.Item>
                                        )
                                    case "select":
                                        return (
                                            <Form.Item key={index} label={intl.formatMessage({id: item.label})}>
                                                <MySelect style={{height:"36px"}} defaultValue={item.default} value={componentsData[item.id]?.value ?? ""} options={item.options.map((item:any)=>{
                                                    return {value:item.value,label:intl.formatMessage({id: item.label})}
                                                })} onChange={async (value:any)=>{
                                                    await setComponentsData({
                                                        ...componentsData,
                                                        [item.id]: {value:value}
                                                    })
                                                    editor.updateComponentSettings(editor.component.id,{
                                                        ...componentsData,
                                                        [item.id]: {value:value}
                                                    })
                                                }} />
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                    __html: intl.formatMessage({ id: item.info })
                                                }} ></div>}
                                            </Form.Item>
                                        )
                                        // 拆分组件
                                    case "range":
                                        return (
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <Flex gap={20}>
                                                    <Slider
                                                        defaultValue={item.default}
                                                        value={componentsData[item.id]?.value ?? undefined}
                                                        style={{flex:1}}
                                                        min={item.min}
                                                        max={item.max}
                                                        onChange={async (value:number)=>{
                                                            await setComponentsData({
                                                                ...componentsData,
                                                                [item.id]: {value:value}
                                                            })
                                                            editor.updateComponentSettings(editor.component.id,{
                                                                ...componentsData,
                                                                [item.id]: {value:value}
                                                            })
                                                        }}
                                                    />
                                                    <MyInput style={{ width: "80px",height:"36px" }} value={componentsData[item.id]?.value ?? ""} suffix={ item.unit && intl.formatMessage({id: item.unit})} defaultValue={item.default} />
                                                </Flex>
                                                    
                                            </Form.Item>
                                        )
                                    case "group_header":
                                        return (
                                            <div style={{marginBottom:"16px",fontWeight:500}}>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                    __html: intl.formatMessage({ id: item.info })
                                                }} ></div>}
                                            </div>
                                        )
                                    case "image_picker":
                                        return (
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}} dangerouslySetInnerHTML={{ 
                                                    __html: intl.formatMessage({ id: item.info })
                                                }} ></div>}
                                            </div>}>
                                                <ImagePicker item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "color":
                                        const currentColor = colorState[item.id] || componentsData[item.id]?.value || "#FFFFFF";
                                        const handleColorChange = (newColor: any) => {
                                            const hexColor = newColor.toHexString(); // 转为十六进制字符串
                                            setColorState(prev => ({
                                                ...prev,
                                                [item.id]: hexColor
                                            }));

                                            console.log("currentColor",currentColor);
                                        };

                                        return (
                                            <Form.Item key={index} label={false}>
                                                <Flex gap={8} align="center">
                                                    <div>
                                                        <ColorPicker defaultValue="#FFFFFF" onChange={handleColorChange}>
                                                            <div className="color-picker" style={{backgroundColor:currentColor}}></div>
                                                        </ColorPicker>
                                                    </div>
                                                    <div>
                                                        <div>{intl.formatMessage({id: item.label})}</div>
                                                        <div className="font-12 color-7A8499">{currentColor}</div>
                                                    </div>
                                                </Flex>
                                            </Form.Item>
                                        )
                                    case "menu_picker":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <MenuPicker item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "text":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <MyInput style={{ width:"100%",height:"36px" }} placeholder="输入文案" defaultValue={item.default} />
                                            </Form.Item>
                                        )
                                    case "url":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <MyInput style={{ width:"100%",height:"36px" }} placeholder="输入链接" defaultValue={item.default} />
                                            </Form.Item>
                                        )
                                    case "richtext":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <MinTinyMce content={componentsData[item.id]?.value ?? ""} setContent={(value:string)=>{
                                                    setComponentsData({
                                                        ...componentsData,
                                                        [item.id]: {value:value}
                                                    })
                                                    editor.updateComponentSettings(editor.component.id,{
                                                        ...componentsData,
                                                        [item.id]: {value:value}
                                                    })
                                                }} />
                                            </Form.Item>
                                        )
                                    case "textarea":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <TextArea
                                                    placeholder="输入文案"
                                                    autoSize={{ minRows: 5, maxRows: 5 }}
                                                />
                                            </Form.Item>
                                        )
                                    case "product_picker":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <ProductPicker item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "video":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <Video item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "video_url":
                                        // 组件拆分 优化输入
                                        return(
                                            <Form.Item key={index} name={item.id} rules={[
                                                {
                                                    validator: (_, value) => {
                                                        if (!value || value.startsWith('https://')) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(intl.formatMessage({ id: "请输入有效的视频链接地址" }))
                                                        );
                                                    },
                                                },
                                            ]} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <MyInput value={componentsData[item.id]?.value ?? ""} onChange={(e)=>{
                                                    setComponentsData({
                                                        ...componentsData,
                                                        [item.id]: {value:e.target.value}
                                                    })
                                                }} placeholder="https://www.youtube.com/watch?v=V7BEzkRBp_g" style={{height:"36px"}} />
                                            </Form.Item>
                                        )
                                    case "font":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <FontFamily item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "text_align":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <TextAlign item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                    case "blog":
                                        return(
                                            <Form.Item key={index} label={<div>
                                                <div>{intl.formatMessage({id: item.label})}</div>
                                                {item.info && <div className="font-12 color-7A8499" style={{marginTop:"4px"}}>{intl.formatMessage({id: item.info})}</div>}
                                            </div>}>
                                                <BlogCollection item={item} componentsData={componentsData} />
                                            </Form.Item>
                                        )
                                }
                            })}
                        </Form>
                    </div>
                </div>:<div className="right-blank">
                    <Flex vertical justify="center" align="center">
                        <div>
                            <svg width="160" height="96" viewBox="0 0 160 96" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_10973_7678)"><path d="M41.3809 25.8333C41.3809 25.3731 41.754 25 42.2142 25H109.119C109.579 25 109.952 25.3731 109.952 25.8333V69.1667C109.952 69.6269 109.579 70 109.119 70H42.2142C41.754 70 41.3809 69.6269 41.3809 69.1667V25.8333Z" fill="white" stroke="#356DFF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.67 4.17"></path></g><g filter="url(#filter1_d_10973_7678)"><path fill-rule="evenodd" clip-rule="evenodd" d="M91.6601 53.8963C91.2454 53.62 90.7587 53.4714 90.2604 53.469C89.7621 53.4667 89.274 53.6106 88.8567 53.883C88.4394 54.1554 88.1113 54.5443 87.9129 55.0014C87.7145 55.4585 87.6547 55.9638 87.7408 56.4547L92.473 83.4619C92.5578 83.9453 92.7807 84.3938 93.1146 84.7535C93.4485 85.1132 93.8793 85.3688 94.3551 85.4893C94.8309 85.6099 95.3314 85.5904 95.7963 85.4331C96.2612 85.2758 96.6708 84.9875 96.9756 84.6029L101.858 78.4515L107.796 87.555C108.166 88.1203 108.745 88.5158 109.406 88.6544C110.067 88.793 110.756 88.6634 111.321 88.2941C111.886 87.9247 112.282 87.3459 112.42 86.685C112.559 86.0241 112.429 85.3352 112.06 84.7698L106.119 75.6658L113.717 73.6747C114.191 73.5497 114.619 73.2905 114.949 72.9282C115.28 72.5658 115.498 72.1158 115.579 71.6322C115.66 71.1486 115.599 70.652 115.404 70.202C115.21 69.7521 114.889 69.3679 114.481 69.0957L91.6601 53.8963Z" fill="#356DFF"></path><path d="M97.6832 85.1637L101.786 79.9942L107.04 88.0483L107.041 88.0488C107.541 88.8147 108.325 89.3504 109.22 89.5381C110.116 89.7259 111.049 89.5503 111.815 89.05C112.581 88.5497 113.116 87.7656 113.304 86.8703C113.492 85.9752 113.316 85.0421 112.816 84.2763C112.816 84.2762 112.816 84.2762 112.816 84.2761C112.816 84.276 112.816 84.276 112.816 84.276L107.56 76.2216L113.946 74.5482L113.947 74.5478C114.589 74.3785 115.169 74.0273 115.617 73.5365C116.064 73.0456 116.36 72.436 116.47 71.7809C116.579 71.1257 116.497 70.453 116.233 69.8434C115.969 69.2338 115.535 68.7134 114.983 68.3447L114.982 68.3442L92.1608 53.1449C92.1607 53.1449 92.1607 53.1449 92.1606 53.1448C91.5989 52.7705 90.9397 52.5693 90.2647 52.5661C89.5896 52.5629 88.9285 52.7579 88.3632 53.1269C87.7979 53.4959 87.3533 54.0227 87.0846 54.642C86.8159 55.2612 86.7349 55.9456 86.8515 56.6105C86.8515 56.6106 86.8515 56.6106 86.8515 56.6107L91.5836 83.6177L91.5837 83.618C91.6986 84.2729 92.0005 84.8805 92.4529 85.3678C92.9052 85.8551 93.4888 86.2013 94.1333 86.3646C94.7778 86.5279 95.4558 86.5015 96.0856 86.2884C96.7154 86.0753 97.2702 85.6848 97.6832 85.1638C97.6832 85.1638 97.6832 85.1637 97.6832 85.1637Z" stroke="white" stroke-width="1.80582"></path></g><defs><filter id="filter0_d_10973_7678" x="24.787" y="9.98172" width="101.759" height="78.1887" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1.57609"></feOffset><feGaussianBlur stdDeviation="7.88043"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10973_7678"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10973_7678" result="shape"></feBlend></filter><filter id="filter1_d_10973_7678" x="85.8965" y="51.6631" width="35.1351" height="42.4632" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dx="3.61163" dy="3.61163"></feOffset><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10973_7678"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10973_7678" result="shape"></feBlend></filter></defs></svg>
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
    height: calc(100vh - 52px);
    .right-blank{
        padding: 0 40px;
    }
    .right-content{
        position: relative;
        height: 100%;
        .header{
            position: absolute;
            padding: 14px 16px;
            width: 100%;
            z-index: 99;
            background-color: #F7F8FB;
            font-size: 12px;
            color: #242833;
        }
        .content{
            padding: 14px;
            padding-right: 0px;
            color:#474F5E;
            height: calc(100% - 40px); 
            .form{
                margin-top: 40px;
                padding-right: 14px;
                height: 100%;
                overflow-y: auto;

                .menu-picker{
                    height: 48px;
                    width: 100%;
                    padding:6px 12px;
                    background-color: #f7f8fb;
                    border: 1px dashed #d7dbe7;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 4px;

                    &:hover{
                        background-color: #f0f7ff;
                        border-color: #5e91ff;
                        .icon,.text{
                            color:#5e91ff;
                        }
                    }
                }
                .color-picker{
                    height: 36px;
                    width: 36px;
                    border: 1px solid #d7dbe7;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
    }
    

`


export default observer(Right);