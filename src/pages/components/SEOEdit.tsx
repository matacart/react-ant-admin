import { Button, Drawer, Form, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import globalStore from "@/store/globalStore";
import { observer } from "mobx-react-lite"
import { lastIndexOf, set } from "lodash";
// 
import cookie from 'react-cookies';
import DefaultInput from "@/components/Input/DefaultInput";
import MyTextArea from "@/components/Input/MyTextArea";
import PrimaryButton from "@/components/Button/PrimaryButton";

// 提取html字符串内容
const extractTextFromHTML = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent?.trim() || '';
}

function SEOEdit({seo,setSEO,previewPrefix}:{seo:any,setSEO?:(title:string,description:string,keyword:string,handle:string,url:string)=>void,previewPrefix:string}){
    
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [keyword,setKeyword] = useState("");
    const [handle,setHandle] = useState("");

    useEffect(()=>{
        setTitle(seo.meta_title || seo.title ||"");
        setDescription(seo.meta_description || extractTextFromHTML(seo.content));
        setKeyword(seo.meta_keyword || "");
        setHandle(seo.handle || seo.title || "");
    },[seo.title,seo.product_url])

    // 取消
    const seoClose = ()=>{
        setOpen(false);
        // 数据还原
        setTitle(seo.meta_title || seo.title || "");
        setDescription(seo.meta_description || extractTextFromHTML(seo.content));
        setKeyword(seo.meta_keyword || "");
        setHandle(seo.handle || "");
    }

    // 完成
    const seoConfirm = () => {
        const newHandle = handle.replace(new RegExp(" ","gm"),"-");
        const url = `${previewPrefix}${handle}`;
        setSEO && setSEO(title,description,keyword,newHandle,url);
        setOpen(false)
    }
    
    return (
        <div>
            <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{setOpen(true)}}>编辑</span>
            <Drawer width={540} title='搜索引擎优化' open={open} onClose={seoClose}>
                <Scoped>
                    <div className="contentCard">
                        <div className="preview">
                            <div>预览</div>
                            <div>{`${previewPrefix}${handle}`}</div>
                            <div>{title==""?"未填写标题":title}</div>
                            <div>{description==""?"未填写描述":description}</div>
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            >
                            <Form.Item label="页面标题" tooltip="页面标题可帮助客户快速理解产品或页面内容，建议使用简洁直观的语言。">
                                <DefaultInput value={title} onChange={(e:any)=>{
                                    setTitle(e.target.value)
                                }} placeholder={"页面标题"} />
                            </Form.Item>
                            <Form.Item label="描述" tooltip="建议详细描述商品特性或页面内容以吸引客户访问，不要堆砌关键词。">
                                <MyTextArea value={description} style={{height:"200px",resize:'none'}} showCount maxLength={320} onChange={(e:any)=>{
                                    setDescription(e.target.value)
                                }} placeholder={"添加描述使页面在搜索引擎中获得更高的排名"} />
                            </Form.Item>
                            <Form.Item label="链接" tooltip="描述性URL，例：product-item">
                                <DefaultInput value={handle} placeholder="链接" onChange={(e:any)=>{
                                    setHandle(e.target.value.trim())
                                }} prefix={previewPrefix} />
                            </Form.Item>
                            <Form.Item label="搜索引擎关键词" tooltip="关键词可以提高搜索结果排名，建议1-2个关键词即可，堆砌关键词可能会降低排名！">
                                <DefaultInput placeholder="输入关键词后，按enter键完成输入" value={keyword} defaultValue={seo.meta_keyword} onChange={(e)=>{
                                    setKeyword(e.target.value)
                                }} />
                            </Form.Item>
                        </Form>
                        <div className="submit">
                            <PrimaryButton type="primary" text="完成" onClick={seoConfirm} />
                        </div>
                    </div>
                </Scoped>
                
            </Drawer>
        </div>
    )
}

export default observer(SEOEdit)

const Scoped = styled.div`
    .contentCard{
        .preview{
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #EEF1F7;
            div:nth-child(1){
                padding-bottom: 12px;
            }
            div:nth-child(3){
                font-size: 20px;
                margin:10px 0 8px 0;
                color: #101AA4;
            }
        }
        .submit{
            position: absolute;
            bottom: 24px;
            right: 24px;
        }
    }    

`