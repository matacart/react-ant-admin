import { Button, Drawer, Form, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite"
// 
import cookie from 'react-cookies';

function SEOEdit({seo,setSEO,type}:{seo:any,setSEO?:(title:string,description:string,keyword:string,url:string)=>void,type:string}){
    
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [keyword,setKeyword] = useState("");
    const [url,setUrl] = useState("");

    useEffect(()=>{
        setTitle(seo.metaTitle)
        setDescription(seo.metaDescription)
        setKeyword(seo.metaKeyword)
        if(seo.productUrl == ""){
            setUrl(seo.title.trim().replace(new RegExp(" ","gm"),"-"))
        }else{
            // 解析
            // const urlObject = new URL(seo.productUrl)
            // 解析数据为空
            if(seo.productUrl.slice(1,seo.productUrl.lastIndexOf(type)) == ""){
                setUrl(seo.title.trim().replace(new RegExp(" ","gm"),"-"))
            }else{
                setUrl(seo.productUrl.slice(1,seo.productUrl.lastIndexOf(type)))
            }
        }
    },[seo.title,seo.productUrl])

    // 完成
    const seoEidtConfirm = () => {
        let newURL = url.trim()+type+seo.id+".html"
        setSEO?.(title,description,keyword,newURL)
        setOpen(false)
    }
    
    return (
        <div>
            <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{setOpen(true)}}>编辑</span>
            <Drawer width={600} title='搜索引擎优化' open={open} onClose={()=>{
                setOpen(false);
                // 数据还原
                setTitle(seo.metaTitle)
                setDescription(seo.metaDescription)
                setKeyword(seo.metaKeyword)
                if(seo.productUrl == ""){
                    setUrl(seo.title.trim().replace(new RegExp(" ","gm"),"-"))
                }else{
                    // const urlObject = new URL(seo.productUrl)
                    if(seo.productUrl.slice(1,seo.productUrl.lastIndexOf(type)) == ""){
                        console.log(seo.title)
                        setUrl(seo.title.trim().replace(new RegExp(" ","gm"),"-"))
                    }else{
                        setUrl(seo.productUrl.slice(1,seo.productUrl.lastIndexOf(type)))
                    }
                    // setUrl(seo.productUrl.slice(1,seo.productUrl.lastIndexOf("-p")))
                }
            }}>
                <Scoped>
                    <div className="contentCard">
                        <div className="preview">
                            <div>预览</div>
                            <div>{cookie.load("domain").domainName}</div>
                            <div>{title==""?(seo.title==""?"未填写标题":seo.title):title}</div>
                            <div>{description==""?"未填写描述":description}</div>
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            >
                            <Form.Item label="页面标题" tooltip="页面标题可帮助客户快速理解产品或页面内容，建议使用简洁直观的语言。">
                                <Input value={title} defaultValue={seo.metaTitle == ""?seo.title:seo.metaTitle}  onChange={(e)=>{
                                    setTitle(e.target.value)
                                }} onBlur={(e)=>{
                                    if(e.target.value == ""){
                                        setTitle(seo.title)
                                    }
                                }} placeholder={seo.title} />
                            </Form.Item>
                            <Form.Item label="描述" tooltip="建议详细描述商品特性或页面内容以吸引客户访问，不要堆砌关键词。">
                                <Input.TextArea value={description} defaultValue={seo.metaDescription} style={{height:"200px"}} placeholder={"添加描述使页面在搜索引擎中获得更高的排名"} showCount maxLength={320} onChange={(e)=>{
                                    setDescription(e.target.value)
                                }} onBlur={(e)=>{
                                    // if(e.target.value == ""){
                                    //     setDescription(seo.content.replace(/<[^>]*>/g,""))
                                    // }
                                }} />
                            </Form.Item>
                            <Form.Item label="链接" tooltip="描述性URL，例：product-item">
                                <Input value={url} onChange={(e)=>{
                                    setUrl(e.target.value)
                                }} suffix={type+(seo.id?seo.id:"id")+".html"} />
                            </Form.Item>
                            <Form.Item label="搜索引擎关键词" tooltip="关键词可以提高搜索结果排名，建议1-2个关键词即可，堆砌关键词可能会降低排名！">
                                <Input placeholder="输入关键词后，按enter键完成输入" value={keyword} defaultValue={seo.metaKeyword} onChange={(e)=>{
                                    setKeyword(e.target.value)
                                }} />
                            </Form.Item>
                        </Form>
                        <div className="submit">
                            <Button type="primary" onClick={seoEidtConfirm}>完成</Button>
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
        padding: 0px 24px;
        .preview{
            padding: 12px 0 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #EEF1F7;
            div:nth-child(1){
                padding: 12px 0;
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