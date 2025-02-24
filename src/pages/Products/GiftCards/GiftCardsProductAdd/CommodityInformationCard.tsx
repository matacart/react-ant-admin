import { Card, Form, Input, Select, Tooltip } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TinyMce from "@/components/MCE/TinyMce";


const {TextArea} = Input

function CommodityInformationCard() {
  
    useEffect(()=>{
       
    })
    return (
        <Card title={<div className="">商品信息</div>} className='product-data-card' extra={
            <>
                语言翻译：
                <Select
                    // size='large'
                    defaultValue="English"
                    style={{ width: 100,borderStyle:"none" }}
                    listHeight={200}
                    // onChange={languageChange}
                    // options={languageData}
                />
                <Tooltip title="商品支持多种语言，请选择某种语言后再操作。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip>
            </>
        }>
            <Form layout='vertical' className='product-form'>
                <Form.Item
                name="title"
                required
                label="商品标题"
                >
                    <Input
                        placeholder="例如：Store礼品卡" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item 
                    name="resume"
                    label='商品摘要'>
                    <TextArea showCount  maxLength={400} onBlur={(e)=>{
                        }}
                        style={{
                            resize: 'none'
                        }}
                        onChange={()=>{
                        }}
                        placeholder='请用简短的文字描述本商品'
                    />
                </Form.Item>
                <Form.Item label='商品描述'>
                    {/* 富文本编辑器 */}
                    <TinyMce />
                </Form.Item>
            </Form>
            


        </Card>
    )
}

export default CommodityInformationCard