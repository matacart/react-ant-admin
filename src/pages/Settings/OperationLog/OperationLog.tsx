import { ArrowLeftOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { Card, Tag } from "antd"
import SelectHeader from "./SelectHeader"
import OperationTable from "./OperationTable"
import { useNavigate } from "react-router-dom"

function OperationLog() {

    const navigate = useNavigate()

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    useEffect(()=>{
        baseInfoStore.getStore().then(res=>{
            setIsSkeleton(!res)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>navigate("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">
                              <div>操作日志</div>
                              <div className="font-14 font-w-500 color-474F5E" style={{marginTop:"4px"}}>仅保存最近3个自然月的操作日志（操作时间以 店铺时区 为准）</div>
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                      <div className='mc-layout-content'>
                        <Card style={{width:"100%"}}>
                          <SelectHeader />
                          {/*  */}
                          <div style={{margin:"12px 0"}}>
                            <Tag style={{padding:"4px 10px"}} color="processing" bordered={false}>
                              <span className="color-474F5E font-14">
                                操作时间: 2025-02-01 至 2025-02-10
                              </span>
                            </Tag>
                          </div>
                          
                          <OperationTable />
                        </Card>
                      </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default OperationLog

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
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
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            width: 100%;
            min-width: 510px;
            display: flex;
            gap:20px;
        }
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`