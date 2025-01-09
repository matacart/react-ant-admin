import { getFileList, getGroupAdd, getGroupList } from "@/services/y2/api"
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Input, Modal, Popover, Select, Spin, Tabs, TabsProps } from "antd"
import { createContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import GroupCard from "./GroupCard"
import FileModal from "./FileModal"
import { set } from 'lodash';
import fileData from '@/store/fileData';
import { observer } from "mobx-react-lite"


interface GroupItem {
    groupId:string,
    groupName:string,
    resourceCount:string
}

function FileManage() {
    // 删除分组
    const removeGroup = (groupId:string) => {
        console.log(items)
        let newItems = fileData.itemsList.filter(item=>item.key !== groupId)
        setActiveKey("0")
        setItems(newItems)
        setIsOpen(false)
        fileData.setItemsList(newItems)
    };
    const item: TabsProps['items'] = [
        {
            key: '0',
            label: '所有文件',
            destroyInactiveTabPane: true,
            children: <GroupCard groupItem={{groupId:"0",groupName:"所有文件"}} removeItem={removeGroup} />,
        }
    ];
    const [items, setItems] = useState(item);

    useEffect(()=>{
        getGroupList().then(res=>{
            console.log(res)
            if(res.code == 0){
                setGroupList(res.data.list??=[])
                let newItems:TabsProps['items'] = [...item]
                res.data.list.forEach((item:any,index:number)=>{
                    console.log(item)
                    newItems.push({
                        label: item.groupName,
                        children: <GroupCard groupItem={item} removeItem={removeGroup}/>,
                        destroyInactiveTabPane: true,
                        key:item.groupId,
                    })
                })
                setItems(newItems)
                fileData.setItemsList([...newItems])
            }
        })
    },[])


    useEffect(()=>{
        setItems(fileData.itemsList)
        getGroupList().then(res=>{
            console.log(res)
            if(res.code == 0){
                // res.data.list 可能不存在
                setGroupList(res.data.list??=[])
                let newItems:TabsProps['items'] = [...item]
                res.data.list.forEach((item:any,index:number)=>{
                    console.log(item)
                    newItems.push({
                        label: item.groupName,
                        children: <GroupCard groupItem={item} removeItem={removeGroup}/>,
                        destroyInactiveTabPane: true,
                        key:item.groupId,
                    })
                })
                setItems(newItems)
            }
        })
    },[fileData.itemsList])

    

    const [isOpen, setIsOpen] = useState(false);
    
    const [groupName, setGroupName] = useState<string>("");

    const [groupList,setGroupList] = useState<any>([]);

    const onChange = (key: string) => {
        console.log(key);
    };

    const [activeKey, setActiveKey] = useState('0');
    const [activeGroupId, setActiveGroupId] = useState("0");

    // 新增分组--保存
    const newGroup = () => {
        getGroupAdd(groupName,"").then((res)=>{
            console.log(res);
            if(res.code == 0){
                const item = {
                    groupId:res.data[0].groupId+"",
                    groupName:res.data[0].groupName
                }
                setItems([...items, {key:res.data[0].groupId+"",label: groupName, children: <GroupCard groupItem={item} removeItem={removeGroup} /> }]);
                fileData.setItemsList([...items, {key:res.data[0].groupId+"",label: groupName, children: <GroupCard groupItem={item} removeItem={removeGroup} /> }]);
                setActiveKey(res.data[0].groupId+"")
                setGroupList([...groupList,{groupId:res.data[0].groupId+"", groupName:res.data[0].groupName, resourceCount:"0"}])
                setIsOpen(false)
                setGroupName("")
            }else{
                console.log("error");
            }
        })
    };

    // 新增分组--弹窗
    const content = (
        <div>
            <div style={{marginBottom:"10px"}}>分组名称</div>
            <Input style={{width:"320px"}} value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} placeholder="请输入分组名称，最多20个字符" maxLength={20} />
            <div style={{textAlign:"right",marginTop:"10px"}}>
                <Button onClick={()=>{
                    setIsOpen(false)
                    setGroupName("")
                }}>取消</Button>
                <Button disabled={groupName==""?true:false} onClick={newGroup} type="primary" style={{marginLeft:"10px"}}>保存</Button>
            </div>
        </div>
    );

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
    };
    const TabBar = (props) => {
        return(
            <div className="tabBarBox">
                {props.panes.map(item => (<div className={item.props.tabKey == activeKey ? "activeTabBarBoxItem":"tabBarBoxItem"} onClick={()=>{
                    setActiveGroupId(item.props.tabKey)
                    setActiveKey(item.props.tabKey)
                }}>{item.props.tab}</div>))}
                <div style={{textAlign:"center",padding:"10px 0"}}>
                    <Popover open={isOpen} onOpenChange={handleOpenChange} placement="bottomLeft" content={content} trigger="click" style={{textAlign:"right"}}>
                        <Button onClick={()=>{setIsOpen(true)}} style={{width:"160px",height:"38px"}}><PlusOutlined style={{fontSize:"12px"}} />新建分组</Button>
                    </Popover>
                </div>
            </div>
        )
    }

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">文件库</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                                <Flex>
                                    <div><Button style={{height:"36px",marginRight:"10px"}}>刷新</Button></div>
                                    {groupList.length>0 && <FileModal groupId={activeGroupId} groupList={groupList}></FileModal>}
                                </Flex>
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card styles={{body:{paddingLeft:"0"}}}>
                                <Tabs renderTabBar={TabBar} activeKey={activeKey} defaultActiveKey="1" tabPosition={"left"} items={items} onChange={onChange} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(FileManage)

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