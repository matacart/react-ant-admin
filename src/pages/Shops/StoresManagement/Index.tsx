import { Button, Card, Select, Tabs, TabsProps } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { history } from 'umi';
import StoresCard from "./StoresCard";
import shopsManagement from "@/store/shops/shopsManagementStore";
import { observer } from 'mobx-react-lite';


const onChange = (key: string) => {
    console.log(key);
};



type PositionType = 'right';
const OperationsSlot: Record<PositionType, React.ReactNode> = {
    // right: <Button type="primary" onClick={()=>{
    //     history.push('/stores-subscriptions/list/paid')
    // }}>+ 购买开店套餐</Button>,
    right: <Button type="primary" onClick={()=>{
        history.push('/stores/create')
    }}>+ 创建店铺</Button>,
};

// 上午、下午、晚上、凌晨、深夜
function getCurrentTimeText(){
    const currentHour = new Date().getHours();
    switch (true) {
        case currentHour >= 6 && currentHour < 12:
            return '上午';
        case currentHour >= 12 && currentHour < 18:
            return '下午';
        case currentHour >= 18 && currentHour < 24:
            return '晚上';
        case currentHour >= 0 && currentHour < 6:
            return '凌晨';
        default:
            return'深夜';
    }

}

const timeText = getCurrentTimeText()

function Index(){

    const [enableCount,setEnalbeCount] = useState(0)

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '已启用店铺（'+enableCount+'）',
          children: <StoresCard/>,
        },
        {
          key: '2',
          label: '待启用店铺（0）',
          children: 'Content of Tab Pane 2',
        }
    ];

    // 获取店铺列表
    useEffect(()=>{
        shopsManagement.getShops().then(res=>{
            setEnalbeCount(res.length)
        })
    },[])
    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-content">{timeText}好，请选择一个店铺开始你的生意</div>
                        </div>
                        <div className='mc-header-right'>
                            <Button style={{marginRight:"10px"}}>复制店铺</Button>
                            <Button>转让&接收店铺</Button>
                            {/* <Select  defaultValue="更多" /> */}
                        </div>
                    </div>
                    <div className='card-wrap'>
                        <Card>
                            <Tabs tabBarExtraContent={OperationsSlot} defaultActiveKey="1" items={items} onChange={onChange} />
                        </Card>
                        <div className='mc-layout-content'>
                          
                        </div>
                        <div className='mc-layout-extra'>
                            
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
                    &-content {
                        margin-left: 12px;
                        font-size: 20px;
                    }
                }
                &-right {
                    display: flex;
                    align-items: center;
                    > .selector{
                        height: 36px;
                    }
                }
            }

            .card-wrap{
                :where(.css-dev-only-do-not-override-no4izc).ant-card .ant-card-body{
                    padding: 12px 24px;
                }
            }
            
        }
    }
    a{
    font-weight: 400
    }
`

export default observer(Index)