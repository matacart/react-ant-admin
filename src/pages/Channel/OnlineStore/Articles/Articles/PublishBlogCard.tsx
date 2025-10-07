import { Button, Card, DatePicker, Flex, Form, Radio } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import articles from "@/store/channel/articles/articles";
import dayjs from 'dayjs';


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

export default function PublishBlogCard() {

    const [publishTimeCheck,setPublishTimeCheck] = useState(false)

    return (
        <Scoped>
            <Card className="card">
                <Form layout="vertical">
                    <Form.Item
                        className="radio-group-warp"
                        label={<div className="font-w-600 font-16">发布博客</div>} >
                        <Radio.Group
                            style={style}
                            onChange={(e)=>{

                                if(e.target.value == "1"){
                                    setPublishTimeCheck(false)
                                    articles.setArticles({
                                        ...articles.articles,
                                        publish_time:"",
                                        status:e.target.value
                                    })
                                }else{
                                    articles.setArticles({
                                        ...articles.articles,
                                        status:e.target.value
                                    })
                                }
                                
                            }}
                            value={articles.articles.status}
                            options={[
                                { value: "1", label: '发布' },
                                { value: "0", label: <div>
                                    <span>隐藏</span>
                                    {articles.articles.publish_time && <span style={{marginLeft:"6px"}}>(将于{dayjs(Number(articles.articles.publish_time)*1000).format("YYYY-MM-DD HH:mm:ss")}开始发布)</span>}
                                </div>
                                }
                            ]}
                        />
                    </Form.Item>
                    {/* 设置发布时间 */}
                    {publishTimeCheck?<div className="publish-time-warp">
                        <div className="color-242833 font-w-600 title">设置发布时间</div>
                        <Form.Item label={false} >
                            <DatePicker
                                style={{width:"100%"}}
                                showTime
                                onChange={(value, dateString) => {
                                   // 使用moment对象主动格式化保证类型安全
                                    const timeString = value?.format("YYYY-MM-DD HH:mm:ss") || '';
                                    articles.setArticles({
                                        ...articles.articles,
                                        publish_time:timeString==""?"":(new Date(timeString).getTime()/1000).toString()
                                    })
                                }}
                                onOk={()=>{
                                    
                                }}
                            />
                        </Form.Item>
                        <div className="color-356DFF cursor-pointer" onClick={()=>{
                            setPublishTimeCheck(false)
                            // 删除发布时间
                            articles.setArticles({
                                ...articles.articles,
                                publish_time:''
                            })
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

    .radio-group-warp{
        .ant-radio{
            position: relative;
            top:2px;
            align-self:auto;
        }

    }

`