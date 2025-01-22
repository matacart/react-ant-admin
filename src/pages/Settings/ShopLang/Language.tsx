import { ArrowLeftOutlined } from "@ant-design/icons"
import { Card, Flex, Skeleton } from "antd"
import styled from "styled-components"
import { history } from "@umijs/max"
import LanguageList from "./LanguageList"

export default function Language() {
    return (
        <Scoped>
            {/* <Card style={{height:"600px"}}>
                <Skeleton active />
            </Card> */}

            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">语言</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">语言管理</div>
                                <p className="font-14 color-474F5E desc">管理网店的多语言展示。此处仅翻译系统文案，若要翻译您编写的文案（如商品标题、描述等），请使用应用或导入语料。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <Card style={{marginBottom:"20px"}}>
                                    <Flex vertical={true} style={{marginBottom:"12px"}}>
                                        <div>
                                            <div className="font-16 color-242833 font-w-600">语言列表</div>
                                            <div className="font-14 color-474F5E" style={{marginTop:"4px",marginBottom:"8px"}}>店铺前台将展示对应的语言列表。</div>
                                        </div>
                                        <LanguageList />
                                    </Flex>
                                   
                                </Card>
                                <Card style={{marginBottom:"20px"}}>
                                    <div className="font-16 color-242833 font-w-600">默认地点</div>
                                    <div className="font-14 color-474F5E" style={{marginTop:"4px"}}>设置一个的地点，作为您在发货时和添加新商品时的默认地点</div>
                                    <div style={{marginTop:"12px"}}>
                                        {/* <Button>设置默认地点</Button> */}
                                    </div>
                                </Card>
                                <Card>
                                    <div className="font-16 color-242833 font-w-600">发货优先顺序</div>
                                    <div className="font-14 color-474F5E" style={{marginTop:"4px"}}>当有新订单时，将根据此地点优先级分配新订单</div>
                                    <div style={{marginTop:"12px"}}>
                                        {/* <Button>编辑发货顺序</Button> */}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

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
            gap:20px;
            &-left{
                flex: 1;
                .desc{
                    margin-top: 8px;
                    line-height: 20px;
                }
            }
            &-right{
                flex: 2;
                .availableLocation_box{
                    padding: 12px 0;
                    border-bottom: 1px solid #EEF1F7;
                    cursor: pointer;
                    .availableLocation{
                        margin-right: 12px;
                        background-color: #F7F8Fb;
                        border-radius: 4px;
                        border: 1px solid #EEF1F7;
                    }
                }
                .availableLocation_box:hover{
                    background-color: #F7F8Fb;
                }
            }
        }
        &-extra {
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
        }
    }
}
`