import { Button, Input, Select, Space } from "antd"
import { useEffect } from "react"
import styled from "styled-components"
import { history } from 'umi';
import { ExportOutlined } from "@ant-design/icons";



const { Search } = Input;

function Data(){
    useEffect(()=>{
        
    },[])
    return (
        <Scoped>
            <div className='create-warp-flex' style={{ width: "100%" }}>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>数据管理</h3>
                            <div style={{ position: 'relative', top: -44, left: 120,cursor: 'pointer' }}>
                                <span onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <ExportOutlined />
                                        导出数据
                                    </Space>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{ position: 'relative', top: -24 }}>
                        <Select
                            labelRender={()=><div>店铺状态</div>}
                            defaultValue="-1"
                            optionFilterProp="label"
                            style={{width:"120px"}}
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '营业中',
                            },
                            {
                                value: '2',
                                label: '已打烊',
                            },
                            {
                                value: '3',
                                label: '已冻结',
                            },
                            {
                                value: '4',
                                label: '已停用',
                            },
                            {
                                value: '5',
                                label: '已注销',
                            },
                            ]}
                        />
                        <Search placeholder="搜索店铺名称/handle/主域名" style={{ width: 320 }} />
                    </div>
                    <div className='create-content'>

                    </div>
                </div>

            </div>
        </Scoped>
    )
}

export default Data

const Scoped = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        .create-warp{
            width: 100%;
            min-width: 500px;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                line-height: 20px;
                display: flex;
                justify-content: space-between;
                align-content: center;
            .create-title-left{
                display: inline-block;
                h3 {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                margin: 0 24px 24px 0;
                overflow: hidden;
                color: #242833;
                font-size: 24px;
                font-weight: 600;
                line-height: 32px;
                }
            }
            .create-title-right{
                display: inline-block;
    
            }
    
            }
            .create-content{
                position: relative;
                top: -10px;
                padding: 5px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                
            }
        }
    }
`