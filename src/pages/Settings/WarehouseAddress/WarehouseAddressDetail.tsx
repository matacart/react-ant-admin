import { getAddWarehouseList, getFileList } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Flex } from "antd"
import styled from "styled-components"
import AddWarehouseAddressModal from "./AddWarehouseAddressModal"
import { useEffect, useState } from "react"


function WarehouseAddress() {


    const warehouseAddressId = history.location.pathname.substring(history.location.pathname.lastIndexOf('/')+1)

    const [warehouseAddressCount,setWarehouseAddressCount] = useState(0)

    useEffect(()=>{

        console.log(warehouseAddressId)

        

        // getAddWarehouseList().then(res=>{
        //     if(res.code === 0){
        //         setWarehouseAddressList(res.data)
        //         setWarehouseAddressCount(res.count)
        //     }
        // })
    },[])
 
    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/location")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">地点</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">地点详情</div>
                                <div className="font-14 color-474F5E desc">为仓库地点设置详细的信息</div>
                            </div>
                            <div className="mc-layout-content-right">
                                <Card style={{marginBottom:"20px"}}>
                                    
                                   
                                </Card>
                               
                                <Card>
                                    <div className="font-16 color-242833 font-w-600">发货优先顺序</div>
                                    <div className="font-14 color-474F5E" style={{marginTop:"4px"}}>当有新订单时，将根据此地点优先级分配新订单</div>
                                    <div style={{marginTop:"12px"}}>
                                        <Button>编辑发货顺序</Button>
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
export default WarehouseAddress

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
                }
            }
            &-right{
                flex: 2;
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