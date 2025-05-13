import { Button, Card, Checkbox, DatePicker, Divider, Flex, Form, Input, InputNumber, InputRef, Modal, Radio, Select, SelectProps, Space, Switch, Tag, theme, Tooltip, TreeSelect } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

export default function PublishPageCard() {

    const [publishTimeCheck,setPublishTimeCheck] = useState(false)

    return (
        <Scoped>
            <Card className="card">
                <Form layout="vertical">
                    <Form.Item
                        label={<div className="font-w-600 font-16">发布页面</div>} >
                        <Radio.Group
                            style={style}
                            onChange={(e)=>{
                                // articles.setOldArticles({
                                //     ...articles.newArticles,
                                //     status:e.target.value
                                // })
                            }}
                            // defaultValue={articles.newArticles.status}
                            options={[
                                { value: "1", label: '发布' },
                                { value: "0", label: '隐藏' },
                            ]}
                        />
                    </Form.Item>
                    {/* 设置发布时间 */}
                    {publishTimeCheck?<div className="publish-time-warp">
                        <div className="color-242833 font-w-600 title">设置发布时间</div>
                        <Form.Item label={false} >
                            {/* <DatePicker style={{width:"100%"}} onChange={()=>{}} /> */}
                            <DatePicker
                                style={{width:"100%"}}
                                showTime
                                onChange={(value, dateString) => {
                                   // 使用moment对象主动格式化保证类型安全
                                    const timeString = value?.format("YYYY-MM-DD HH:mm:ss") || '';
                                    // articles.setNewArticles({
                                    //     ...articles.newArticles,
                                    //     releaseTime:timeString==""?"":new Date(timeString).getTime()/1000
                                    // })
                                }}
                                onOk={()=>{
                                    
                                }}
                            />
                        </Form.Item>
                        <div className="color-356DFF cursor-pointer" onClick={()=>{
                            setPublishTimeCheck(false)
                            // 删除发布时间
                            // articles.setNewArticles({
                            //     ...articles.newArticles,
                            //     releaseTime:''
                            // })
                        }}>取消设置</div>
                    </div>:<div className="color-356DFF cursor-pointer" onClick={()=>setPublishTimeCheck(true)}>设置发布时间</div>}
                </Form>
            </Card>
        </Scoped>
    )
}


const Scoped = styled.div`
    .publish-time-warp{
        .title{
            margin-bottom: 12px;
        }
    }

`