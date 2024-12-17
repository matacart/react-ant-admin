import { Button, Drawer, Form, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import globalStore from "@/store/globalStore";
import { observer } from "mobx-react-lite"
import { lastIndexOf, set } from "lodash";
// 
import cookie from 'react-cookies';

function SEOEdit(prop:any){
    
    const [open, setOpen] = useState(false);

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [keyword,setKeyword] = useState("");
    const [url,setUrl] = useState("");

    useEffect(()=>{
        setTitle(prop.seo.metaTitle)
        setDescription(prop.seo.metaDescription)
        setKeyword(prop.seo.metaKeyword)
        if(prop.seo.productUrl == ""){
            setUrl(prop.seo.title.trim().replace(new RegExp(" ","gm"),"-"))
        }else{
            // 解析
            // const urlObject = new URL(prop.seo.productUrl)
            // 解析数据为空
            if(prop.seo.productUrl.slice(1,prop.seo.productUrl.lastIndexOf("-p")) == ""){
                setUrl(prop.seo.title.trim().replace(new RegExp(" ","gm"),"-"))
            }else{
                setUrl(prop.seo.productUrl.slice(1,prop.seo.productUrl.lastIndexOf("-p")))
            }
        }
    },[prop.seo.title,prop.seo.productUrl])

    const seoEidtConfirm = () => {
        prop.seo.setMetaTitle(title)
        prop.seo.setMetaDescription(description)
        prop.seo.setMetaKeyword(keyword)
        let tempUrl = url.trim()+"-p"+prop.seo.productId+".html"
        prop.seo.setProductUrl(tempUrl)
        setOpen(false)
        console.log(prop.seo.content.replace(/<[^>]*>/g,""))
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const [form] = Form.useForm();
    
    return (
        <div>
            <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{setOpen(true)}}>编辑</span>
            <Drawer width={600} title='搜索引擎优化' open={open} onClose={()=>{
                setOpen(false);
                // 数据还原
                setTitle(prop.seo.metaTitle)
                setDescription(prop.seo.metaDescription)
                setKeyword(prop.seo.metaKeyword)
                if(prop.seo.productUrl == ""){
                    setUrl(prop.seo.title.trim().replace(new RegExp(" ","gm"),"-"))
                }else{
                    // const urlObject = new URL(prop.seo.productUrl)
                    if(prop.seo.productUrl.slice(1,prop.seo.productUrl.lastIndexOf("-p")) == ""){
                        setUrl(prop.seo.title.trim().replace(new RegExp(" ","gm"),"-"))
                    }else{
                        setUrl(prop.seo.productUrl.slice(1,prop.seo.productUrl.lastIndexOf("-p")))
                    }
                    // setUrl(prop.seo.productUrl.slice(1,prop.seo.productUrl.lastIndexOf("-p")))
                }
            }}>
                <Scoped>
                    <div className="contentCard">
                        <div className="preview">
                            <div>预览</div>
                            <div>{cookie.load("domain").domainName}</div>
                            <div>{title==""?(prop.seo.title==""?"未填写标题":prop.seo.title):title}</div>
                            <div>{description==""?((prop.seo.content=="")?"未填写描述":prop.seo.content.replace(/<[^>]*>/g,"")):description}</div>
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            >
                            <Form.Item label="页面标题" tooltip="页面标题可帮助客户快速理解产品或页面内容，建议使用简洁直观的语言。">
                                <Input value={title} defaultValue={prop.seo.metaTitle == ""?prop.seo.title:prop.seo.metaTitle}  onChange={(e)=>{
                                    setTitle(e.target.value)
                                }} onBlur={(e)=>{
                                    if(e.target.value == ""){
                                        setTitle(prop.seo.title)
                                    }
                                }} placeholder={prop.seo.title} />
                            </Form.Item>
                            <Form.Item label="描述" tooltip="建议详细描述商品特性或页面内容以吸引客户访问，不要堆砌关键词。">
                                <Input.TextArea value={description} defaultValue={prop.seo.metaDescription == ""?prop.seo.content.replace(/<[^>]*>/g,""):prop.seo.metaDescription} style={{height:"200px"}} placeholder={prop.seo.content==""?"添加描述使页面在搜索引擎中获得更高的排名":prop.seo.content.replace(/<[^>]*>/g,"")} showCount maxLength={320} onChange={(e)=>{
                                    setDescription(e.target.value)
                                }} onBlur={(e)=>{
                                    if(e.target.value == ""){
                                        setDescription(prop.seo.content.replace(/<[^>]*>/g,""))
                                    }
                                }} />
                            </Form.Item>
                            <Form.Item label="链接" tooltip="描述性URL，例：product-item">
                                <Input value={url} onChange={(e)=>{
                                    setUrl(e.target.value)
                                }} suffix={"-p"+prop.seo.productId+".html"} />
                            </Form.Item>
                            <Form.Item label="搜索引擎关键词" tooltip="关键词可以提高搜索结果排名，建议1-2个关键词即可，堆砌关键词可能会降低排名！">
                                <Input placeholder="输入关键词后，按enter键完成输入" value={keyword} defaultValue={prop.seo.metaKeyword} onChange={(e)=>{
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