import { ArrowLeftOutlined, ExportOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, List, Select, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import baseInfoStore from "@/store/set-up/baseInfoStore";




function Markets() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    useEffect(()=>{
        baseInfoStore.getStore().then(res=>{
            setIsSkeleton(!res)
        })
    },[])

    const data = [
        {title:"AA",icon:"/icons/metafieldsProduct.svg",count:0,main:true},
        {title:"CA",icon:"/icons/metafieldsProductsort.svg",count:0},
        {title:"FF",icon:"/icons/metafieldsProductStyle.svg",count:0},
    ];

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/index")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">市场</div>
                        </div>
                        <div className='create-title-right'>
                            <Button onClick={() => {}} style={{ marginTop: "10px",marginRight:"12px",height: "36px", fontSize: "14px" }}>偏好设置</Button>
                            <Button type="primary" onClick={() => {}} style={{ marginTop: "10px", height: "36px", fontSize: "14px" }}>创建市场</Button>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}} >
                                <Flex justify="space-between" style={{margin:"20px 20px 0 20px"}}>
                                    <div className="color-242833 font-16 font-w-600">市场列表</div>
                                    <div>
                                        <Select
                                            defaultValue={"0"}
                                            // style={{ width: 140 }}
                                            onChange={()=>{}}
                                            options={[
                                                { value: '0', label: '今天'},
                                                { value: '1', label: '过去7天' },
                                                { value: '2', label: '过去30天' },
                                            ]}
                                            labelRender={(props) => {
                                                const { label } = props
                                                return (
                                                    <>
                                                        <span>日期范围：</span>
                                                        {label}
                                                    </>
                                                )
                                            }}
                                        />
                                    </div>
                                </Flex>
                                    <List
                                        className="list"
                                        size="large"
                                        // bordered
                                        dataSource={data}
                                        renderItem={(item) => {
                                            if(item.main){
                                                return (
                                                    <List.Item className="item">
                                                        <Flex style={{width:"100%"}} justify="space-between">
                                                            <Flex align="center">
                                                                <div>
                                                                    {/* <img src={item.icon} /> */}
                                                                    <div className="item-icon">
                                                                        <span className="item-icon-text">{item.title}</span>
                                                                    </div>
                                                                </div>
                                                                <div style={{marginLeft:28}}>
                                                                    <div className="font-16 color-242833 font-w-600">{item.title}</div>
                                                                    {/* <div className="font-14 color-474F5E">{"韩国、菲律宾"}</div> */}
                                                                </div>
                                                                <div>
                                                                    <span className="item-tag">主要市场</span>
                                                                </div>
                                                            </Flex>
                                                            <Flex className="item-right" align="center">
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">总销售额份额</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">销售额</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">转化率</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                            </Flex>
                                                        </Flex>
                                                        <Flex>
                                                            <RightOutlined />
                                                        </Flex>
                                                    </List.Item>
                                                )
                                            }else{
                                                return (
                                                    <List.Item className="item">
                                                        <Flex style={{width:"100%"}} justify="space-between">
                                                            <Flex align="center">
                                                                <div>
                                                                    {/* <img src={item.icon} /> */}
                                                                    <div className="item-icon">
                                                                        <span className="item-icon-text">{item.title}</span>
                                                                    </div>
                                                                </div>
                                                                <div style={{marginLeft:28}}>
                                                                    <div className="font-16 color-242833 font-w-600">{item.title}</div>
                                                                    <div className="font-14 color-474F5E">{"韩国、菲律宾"}</div>
                                                                </div>
                                                            </Flex>
                                                            <Flex className="item-right" align="center">
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">总销售额份额</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">销售额</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                                <div className="item-right-content">
                                                                    <div className="color-7A8499">转化率</div>
                                                                    <div className="font-16 font-w-600">0%</div>
                                                                    <div className="color-B8BECC">-</div>
                                                                </div>
                                                            </Flex>
                                                            <Flex>
                                                                <RightOutlined />
                                                            </Flex>
                                                        </Flex>
                                                    </List.Item>
                                                )
                                            }
                                        }}
                                    />
                            </Card>
                            <div style={{textAlign:"center"}}>
                                <span>详细了解 </span>
                                <span><a href='' target='_blank'>市场 <ExportOutlined /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default Markets

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            
            .card{
                padding: 0;
                .list{
                    border: 1px solid #eef1f6;
                    border-radius: 4px;
                    margin: 20px;
                }
            }
            .divider{
                margin:0px;
            }
            .item{
                /* width: 100%; */
                .item-icon{
                    width: 54px;
                    height: 36px;
                    line-height: 36px;
                    background: linear-gradient(111.34deg, rgb(56, 88, 201) 0%, rgb(89, 55, 188) 100%);
                    font-size: 18px;
                    min-width: 54px;
                    color: #FFFFFF;
                    text-align: center;
                    align-items: center;
                    border-radius: 4px;
                    /* .item-icon-text{
                        position: absolute;
                        color: #FFFFFF;
                        width: 100%;
                        height: 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 18px;
                        font-weight: 600;
                    } */
                }
                .item-tag{
                    border: 1px solid #d7dbe7;
                    font-size: 12px;
                    border-radius: 10px;
                    padding: 2px 8px;
                    margin-left: 12px;
                }
                .item-right{
                    flex: 1;
                    justify-content: flex-end;
                    gap: 20px;
                    .item-right-content{
                        min-width: 220px;
                    }
                }
            }
            .item:hover{
                background-color: #f0f7ff;
            }

        }
      
    }
}
`