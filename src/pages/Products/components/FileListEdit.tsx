import { getFileList, getGroupAdd, getGroupList } from "@/services/y2/api"
import { Button, Card, Flex, Input, Modal, Popover, Select, Spin, Tabs, TabsProps } from "antd"
import { createContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import FileListCardEdit from "./FileListCardEdit";


interface GroupItem {
    groupId:string,
    groupName:string,
    resourceCount:string
}

function FileList() {

    const item: TabsProps['items'] = [
        {
            key: '0',
            label: '所有文件',
            destroyInactiveTabPane: false,
            children: <FileListCardEdit groupId={"0"} />
        }
    ];
    const [items, setItems] = useState(item);
    const [activeKey, setActiveKey] = useState('0');

    useEffect(()=>{
        getGroupList().then(res=>{
            if(res.code == 0){
                let newItems:TabsProps['items'] = [...item]
                res.data.list.forEach((item:any,index:number)=>{
                    // console.log(item)
                    newItems.push({
                        label: item.groupName,
                        children: <FileListCardEdit groupId={item.groupId} />,
                        destroyInactiveTabPane: false,
                        key:item.groupId,
                    })
                })
                setItems(newItems)
            }
        })
    },[])

    const TabBar = (props) => {
        return(
            <div className="tabBarBox">
                {props.panes.map(item => (<div className={item.props.tabKey == activeKey ? "activeTabBarBoxItem":"tabBarBoxItem"} onClick={()=>{
                    setActiveKey(item.props.tabKey)
                }}>{item.props.tab}</div>))}
            </div>
        )
    }

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Tabs renderTabBar={TabBar} activeKey={activeKey} defaultActiveKey="0" tabPosition={"left"} items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default FileList

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
            .tabBarBox{
                /* margin-right: 20px; */
                .tabBarBoxItem{
                    width: 200px;
                    padding: 10px;
                }
                .activeTabBarBoxItem{
                    background-color: #F0F7FF;
                    width: 200px;
                    padding: 10px;
                    color: #356DFF;
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