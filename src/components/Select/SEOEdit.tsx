import { Button, Form, Input, Tag } from "antd";
import Drawer from "../Drawer/Drawer";
import { useState } from "react";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import newStore from "@/store/newStore";
// 


export default function SEOEdit(){
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const [form] = Form.useForm();

    
    
    // const onClose = () => {
    //     setOpen(false);
    // };
    
    return (
        <div>
            <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{setOpen(true)}}>编辑</span>
            <Drawer width={600} title='搜索引擎优化' open={open} onClose={()=>{
                setOpen(false);
            }}>
                <Scoped>
                    <div className="contentCard">
                        <div className="preview">
                            <div>预览</div>
                            <div>www.aaacc.com</div>
                            <div>{newStore.title}</div>
                            <div>{newStore.content1}</div>
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            >
                            <Form.Item label="页面标题" tooltip="页面标题可帮助客户快速理解产品或页面内容，建议使用简洁直观的语言。">
                                <Input onChange={()=>{
                                    newStore.setTitle(form.getFieldValue("title"))
                                }} />
                            </Form.Item>
                            <Form.Item label="描述" tooltip="建议详细描述商品特性或页面内容以吸引客户访问，不要堆砌关键词。">
                                <Input.TextArea style={{height:"200px"}} placeholder="添加描述使页面在搜索引擎中获得更高的排名" showCount maxLength={320} />
                            </Form.Item>
                            <Form.Item label="链接" tooltip="描述性URL，例：product-item">
                                <Input />
                            </Form.Item>
                            <Form.Item label="搜索引擎关键词" tooltip="关键词可以提高搜索结果排名，建议1-2个关键词即可，堆砌关键词可能会降低排名！">
                                <Input placeholder="输入关键词后，按enter键完成输入" />
                            </Form.Item>
                        </Form>
                        <div className="submit">
                            <Button type="primary">完成</Button>
                        </div>
                    </div>
                </Scoped>
                
            </Drawer>
        </div>
    )
}

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