import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, List, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"




function Metafields() {

    const data = [
        {title:"商品",icon:"/icons/metafieldsProduct.svg",count:0},
        {title:"商品分类",icon:"/icons/metafieldsProductsort.svg",count:0},
        {title:"商品款式",icon:"/icons/metafieldsProductStyle.svg",count:0},
        {title:"页面",icon:"/icons/metafieldsPage.svg",count:0},
        {title:"客户",icon:"/icons/metafieldsClient.svg",count:0},
        {title:"博客",icon:"/icons/metafieldsBlog.svg",count:0},
        {title:"博客集合",icon:"/icons/metafieldsBlog.svg",count:0},
        {title:"订单",icon:"/icons/metafieldsOrder.svg",count:0}
    ];

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/index")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">元字段</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px 20px 0 20px"}}>
                                    <div className="color-242833 font-16 font-w-600">请选择指定模块进行拓展字段管理</div>
                                    <Divider style={{marginTop:"20px"}} className="divider" />
                                </div>
                                    <List
                                        size="large"
                                        dataSource={data}
                                        renderItem={(item) => <List.Item className="item">
                                            <Flex align="center">
                                                <div>
                                                    <img src={item.icon} />
                                                </div>
                                                <div style={{marginLeft:28}}>
                                                    <div className="font-16 color-242833">{item.title}</div>
                                                    <div className="font-14 color-7A8499">{item.count}个定义</div>
                                                </div>
                                            </Flex>
                                        </List.Item>}
                                    />
                            </Card>
                            <div style={{textAlign:"center"}}>
                                <span>详细了解 </span>
                                <span><a href='' target='_blank'>元字段 <ExportOutlined /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default Metafields

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
            }
            .divider{
                margin:0px;
            }
            .item:hover{
                background-color: #f0f7ff;
            }

        }
        /* &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        } */
      
    }
}
`