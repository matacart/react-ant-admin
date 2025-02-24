import { Card, Form, Input, Select, Tooltip } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TinyMce from "@/components/MCE/TinyMce";


const {TextArea} = Input

function GiftCardInformationCard() {
  
    useEffect(()=>{
       
    })
    return (
        <Card title={<div className="">礼品卡信息</div>} className='product-data-card' extra={
            <>
                语言翻译：
                <Select
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
                    label="礼品卡代码"
                >
                    <Input />

                </Form.Item>

                <Form.Item 
                    name="title"
                    required
                    label="礼品卡面额"
                >
                    <Input />

                </Form.Item>
            </Form>

        </Card>
    )
}

export default GiftCardInformationCard