import { ArrowLeftOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Flex, Input, Popover, Select } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import GroupCardTable from "./GroupCardTable"
import { deleteGroup, getFileList, getGroupAdd, getGroupList } from "@/services/y2/api"
import { set } from 'lodash';
import fileData from "@/store/fileData"
import { observer } from "mobx-react-lite"



interface GroupItem{
    groupId:string,
    groupName:string
}


function GroupCard({groupItem,removeItem}:{groupItem:GroupItem,removeItem:any}) {

    const [isOpen, setIsOpen] = useState(false);

    const [groupName, setGroupName] = useState<string>("");

    const [groupData,setGroupData] = useState<GroupItem>();

    useEffect(()=>{
        getFileList(groupItem.groupId).then(res=>{
            console.log(res)
            if(res.code == 0){
                console.log(res)
                setGroupData(res.data.list)
            }else{
                console.log("请求失败")
            }
        })
        setGroupName(groupItem.groupName)
    },[groupItem])


    // 编辑分组--保存
    const editGroup = () => {
        // const newActiveKey = ""+newTabIndex.current++;
        // console.log(newActiveKey);
        let newitemsList = fileData.itemsList.map((item:any)=>{
            if(item.key == groupItem.groupId){
                item.label = groupName
            }
            return item
        })
        getGroupAdd(groupName,groupItem.groupId).then((res)=>{
            if(res.code == 0){
                fileData.setItemsList(newitemsList)
            }else{
                console.log("error");
            }
        })
        
    };

    // 删除分组
    const removeGroup = () => {
        setGroupName(groupItem.groupName)
        setIsOpen(false)
        deleteGroup(groupItem.groupId).then(res=>{
            console.log(res)
            if(res.code == 0){
                removeItem(groupItem.groupId)
                console.log("删除成功")
            }else{
                console.log("删除失败")
            }
        })
    };


    // 编辑分组--弹窗
    const content = (
        <div>
            <div style={{marginBottom:"10px"}}>分组名称</div>
            <Input style={{width:"320px"}} value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} placeholder="请输入分组名称，最多20个字符" maxLength={20} />
            <div style={{marginTop:"10px"}}>
                <Flex justify="space-between">
                    <Button color="danger" variant="outlined" onClick={removeGroup}>删除</Button>
                    <div>
                        <Button onClick={()=>{
                            setIsOpen(false)
                            setGroupName(groupItem.groupName)
                        }}>取消</Button>
                        <Button onClick={editGroup} type="primary" style={{marginLeft:"10px"}}>保存</Button>
                    </div>
                </Flex>
            </div>
        </div>
    );
    
    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
    };

    return (
        // {groupItem && }
        <Scoped>
           <div className="cardTitle">{groupItem.groupName}
                {groupItem.groupId!=="0" && <Popover open={isOpen} onOpenChange={handleOpenChange} placement="bottomLeft" content={content} trigger="click" style={{textAlign:"right"}}>
                    <span onClick={()=>{setIsOpen(true)}} style={{marginLeft:"10px"}}><EditOutlined /></span>
                </Popover>}
            </div>
            <div className="cardControls">
                <Input style={{width:"300px",marginRight:"10px"}} prefix={<SearchOutlined />} placeholder="搜索文件名/文件格式" />
                <Select
                    labelRender={()=><div>文件类型</div>}
                    style={{ width: 160 }}
                    defaultValue="-1"
                    options={[
                        { value: '1', label: '图片' },
                        { value: '2', label: '视频' },
                        { value: '3', label: '其它' }
                    ]}
                />
            </div>
            <div className="cardContent">
                <GroupCardTable dataSource={groupData}/>
            </div>
            
        </Scoped>
    )
}

export default observer(GroupCard)

const Scoped = styled.div`

    .cardTitle {
        font-size: 16px;
        font-weight: 600;
        color: #474F5E;
        margin-bottom: 10px;
    }
    .cardControls {
        display: flex;
        /* justify-content: space-between; */
        /* align-items: center; */
        margin-bottom: 10px;
    }


`