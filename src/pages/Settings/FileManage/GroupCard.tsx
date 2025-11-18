import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Flex, Input, Popover, Select, SelectProps, TableProps } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import GroupCardTable from "./GroupCardTable"
import { deleteGroup, getFileList, getGroupAdd } from "@/services/y2/api"
import fileData from "@/store/fileData"
import { observer } from "mobx-react-lite"
import DefaultSelect from "@/components/Select/DefaultSelect"
import MyInput from "@/components/Input/MyInput"
import { useAbortController } from "@/hooks/customHooks"

type LabelRender = SelectProps['labelRender'];
interface GroupItem{
    groupId:string,
    groupName:string
}

interface DataType {
    id:string;
    name: string;
    createTime:string;
    size:string;
    url:string;
    nameSuffix?:string;
}

function GroupCard({groupItem,removeItem}:{groupItem:GroupItem,removeItem:any}) {

    const [isOpen, setIsOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const { createAbortController } = useAbortController();

    const [groupName, setGroupName] = useState<string>("");

    const [fileType,setFileType] = useState<number>(0);

    // 分组分件列表
    const [groupData,setGroupData] = useState<any[]>([]);

    // 添加分页状态
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    // 分页配置
    const paginationConfig: TableProps<DataType>['pagination'] = {
        ...pagination,
        onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize });
        },
        showTotal:(total)=><div className="color-7A8499">共{total}个文件</div>
    };

    const [flag,setFlag] = useState(true);
    useEffect(()=>{
        setPagination({
            current: 1,
            pageSize: 10,
            total: 0
        })
        setGroupName(groupItem.groupName)
        setFlag(!flag);
    },[groupItem,fileType])

    const isFirstLoad = useRef(true);
    useEffect(()=>{
        // 首次加载不执行语言切换逻辑
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        // 文件
        setLoading(true)
        const signal = createAbortController();
        getFileList({
            groupId: groupItem.groupId,
            extType: fileType,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        },signal).then(res=>{
            if(res.code == 0){
                setGroupData(res.data.list)
                setPagination({
                    ...pagination,
                    total: res.data.total 
                })
            }else{
                console.log("请求失败")
            }
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            setLoading(false)
        })
    },[pagination.current,pagination.pageSize,flag,fileData.refresh])


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
                <MyInput style={{height:"36px",width:"320px",marginRight:"10px"}} prefix={<SearchOutlined />} placeholder="搜索文件名/文件格式" />
                <DefaultSelect
                    style={{ width: 160 }}
                    value={fileType}
                    options={[
                        { value: 0, label: '全部' },
                        { value: 1, label: '图片' },
                        { value: 2, label: '视频' },
                        { value: 3, label: '其它' }
                    ]}
                    onChange={(value:number)=>{
                        setFileType(value)
                    }}
                />
            </div>
            <div className="cardContent">
                <GroupCardTable dataSource={groupData} paginationConfig={paginationConfig} loading={loading} />
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