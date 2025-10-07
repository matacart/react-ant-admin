import PrimaryButton from "@/components/Button/PrimaryButton";
import { DeleteIcon, EditIcon, EditorMoreIcon, FoldIcon, PositionIcon, ReceiveGoodsIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Button, Card, Divider, Dropdown, Flex, Form, Input, List, MenuProps, message, Space, Table, TableProps, Tabs, TabsProps, Tag } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import AddFreightModal from "./AddFreightModal";
import generalFreight from "@/store/settings/ShippingAndDistribution/generalFreight";
import DefaultButton from "@/components/Button/DefaultButton";
import DeleteModal from "@/components/Modal/DeleteModal";
import { transformConfig } from "@/utils/dataStructure";
import { delAddonsConfig, setAddonsConfigs } from "@/services/y2/api";
import DefaultTag from "@/components/Tag/DefaultTag";
import SuccessTag from "@/components/Tag/SuccessTag";
import EditFreightModal from "./EditFreightModal";
import { observer } from "mobx-react-lite";
import CustomButton from "@/components/Button/CustomButton";


interface DataType {
    languages_id: string;
    addons_config_id: string;
    status: string;
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function ManagementGroup() {

    const [isExpansionDetails,setIsExpansionDetails] = useState(false)
    // 
    const columns: TableProps<DataType>['columns'] = [
        {
          title: '运费名称',
          dataIndex: 'addons_config_title',
          key: 'addons_config_title',
          render: (text) => <div>{text}</div>,
        },
        {
          title: '运费',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (value) => <div>
            {value == "1" ? <SuccessTag text="启用" />:<DefaultTag text={"未启用"} />}
        </div>,
        },
        {
          title: '操作',
          width:120,
          key: 'action',
          render: (_, record) => (
            <Flex gap={16} align="center">
                <EditFreightModal record={record} />
                <DeleteModal
                    tElement={
                        <DeleteIcon className="font-20 cursor-pointer color-F86140" />
                    }
                    removeFunc={()=>{
                        setStatus(record,"-1")
                    }} 
                    title="确认删除此运费方案？" 
                    content={""}
                    okText="删除"
                />
                <Dropdown menu={{ items:[
                    {
                        key: '1',
                        label: (
                            record.status == "1"?<a onClick={() => setStatus(record,"0")}><span>隐藏运费方案</span></a>:<a onClick={() => setStatus(record,"1")}><span>展示运费方案</span></a>
                        ),
                    }
                ]}} placement="bottomRight" trigger={["click"]}>
                    <EditorMoreIcon className="cursor-pointer" />
                </Dropdown>
              {/*  */}
            </Flex>
          ),
        },
    ];

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div>添加分组</div>
          ),
        },
        {
          key: '2',
          label: (
            <div>重命名分组</div>
          ),
        },
        {
          key: '3',
          label: (
            <div>删除分组</div>
          ),
        },
    ];

    // 修改状态
    const setStatus = (res:any,status:string)=>{
        const newRes = {
            ...res,
            status:status,
            title:res.addons_config_title,
            id:res.addons_config_id,
            ...transformConfig(JSON.parse(res.config))
        }
        setAddonsConfigs(newRes).then(result=>{
            if(status == "-1"){
                // 删除
                let newData = generalFreight.deliverys.filter((item:DataType) => item.addons_config_id !== res.addons_config_id)
                generalFreight.setDeliverys(newData)
            }else{
                // 
                let newData = generalFreight.deliverys.map((item:DataType) => {
                    if (item.addons_config_id === res.addons_config_id) {
                        return {...item,status:status};
                    }
                    return item;
                })
                generalFreight.setDeliverys(newData)
            }
            message.success("成功")
        }).catch(err=>{
            message.error("失败")
        })
    }

    // 删除??
    const delFreightAddonsConfig = (res:any,status:string)=>{

        // delAddonsConfig(id,lang).then(res=>{
        //     message.success("成功")
        
        // }).catch(err=>{
        //     message.error("失败")
        // })
    }

    useEffect(()=>{
       console.log(generalFreight.deliverys)
    },[generalFreight.deliverys])
    

    const operations = <Dropdown menu={{ items }} trigger={["click"]}>
        <CustomButton element={<>管理分组<UnfoldIcon className="font-20" /></>} style={{height:"36px"}} />
    </Dropdown>

    const GroupTemplate = (
        <div className="group-template-box">
            <Flex justify="space-between">
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>发货地址</div>
                </Flex>
                <div>
                    <DefaultButton text="添加" />
                </div>
            </Flex>
            {/*  */}
            <Flex className="color-474F5E" style={{margin:"12px 0"}}>
                <div style={{marginRight:"8px"}}>全部地点(排除其他分组的发货地址)</div>
                {!isExpansionDetails && <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(true)} ><span className="color-356DFF">查看详情</span><UnfoldIcon className="font-20" /></Flex>} 
            </Flex>
            {/*  */}
            {isExpansionDetails && <>
                <List style={{margin:"12px 0"}}>
                </List>
                <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(false)}><span className="color-356DFF">隐藏详情</span><FoldIcon className="font-20" /></Flex>
            </>}
            <Divider />
            {/* 收货 */}
            <>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div className="position-box">
                            <ReceiveGoodsIcon className="font-20 color-356DFF" />
                        </div>
                        <div>收货地址</div>
                    </Flex>
                    <AddFreightModal type="default" />
                </Flex>
                
                {generalFreight.deliverys.length == 0 ? <Flex vertical align="center" style={{padding:"20px 0"}}>
                    <div className="color-474F5E">暂无数据</div>
                    <div style={{marginTop:"12px"}}>
                        {/*  */}
                        <AddFreightModal type="primary" />
                    </div>
                </Flex>:<div style={{marginTop:"20px"}}>
                    <Table<DataType> columns={columns} dataSource={generalFreight.deliverys} />
                </div>
                }
            </>
            {/* <Divider /> */}
            {/* 收货地址(根据邮编) */}
            {/* <Flex justify="space-between">
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>收货地址(根据邮编)</div>
                </Flex>
                <div>
                    <Button>添加区域</Button>
                </div>
            </Flex>
            <div className="no-freight-area">
                <div>未添加运费的区域</div>
                <div>243个国家/地区</div>
            </div> */}
        </div>
    )

    const TabsItems: TabsProps['items'] = [
        {
          key: '1',
          label: <div style={{padding:"6px 0"}}>默认分组</div>,
          children: GroupTemplate,
        }
    ];
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations} items={TabsItems} onChange={()=>{}} />
            </Card>
        </Scoped>
    )
}

export default observer(ManagementGroup)

const Scoped = styled.div`
    .card{
        padding-top: 0;
        .group-template-box{
            .position-box{
                margin-right: 8px;
                padding: 6px;
                width: fit-content;
                display: flex;
                border-radius: 2px;
                justify-content: center;
                align-items: center;
                background-color: #f0f7ff;
            }
            .no-freight-area{
                padding: 20px 0;
            }
            
        }

        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
`