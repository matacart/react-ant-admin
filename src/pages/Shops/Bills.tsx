import { Button, Dropdown, MenuProps, Select, Space, Tabs, TabsProps } from "antd"
import { useEffect } from "react"
import styled from "styled-components"
import { history } from 'umi';
import { ExportOutlined } from "@ant-design/icons";
import BillsCard from "./BillsCard";


const aItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>账单列表</>
      ),
    },
    {
      key: '2',
      label: (
        <>佣金流水</>
      )
    }
];


const items: TabsProps['items'] = [
    {
      key: '1',
      label: '账单列表',
      children: <BillsCard/>,
    },
    {
      key: '2',
      label: '佣金流水',
      children: 'Content of Tab Pane 2',
    }
];

const onChange = (key: string) => {
    console.log(key);
};

function Bills(){
    useEffect(()=>{
        
    },[])
    return (
        <Scoped>
            <div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>账单管理</h3>
                            <div style={{ position: 'relative', top: -44, left: 120,cursor: 'pointer' }}>
                                <Dropdown menu={{ items: aItems }}>
                                    <span onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <ExportOutlined />
                                        导出账单
                                    </Space>
                                    </span>
                                </Dropdown>
                            </div>
                            <div style={{ position: 'relative', top: -36, display: 'inline-block' }}>以下账单包括您为店主或有套餐管理权限的店铺下的所有账单</div>
                        </div>
                    </div>
                    <div className='create-content'>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default Bills

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