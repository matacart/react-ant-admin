import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, ExportOutlined, GlobalOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Input, List, message, Modal, Table, TableProps, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import SuccessTag from "@/components/Tag/SuccessTag";
import { useEffect, useState } from "react";
import domain from "@/store/settings/domain"
import { addDomainName, getDomainNameList } from "@/services/y2/api";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import e from "express";


interface DataType {
    key: string;
    name: string;
    isPrimary:boolean;
    primaryName:string;
    age: number;

}


function DomainManage() {

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [modal, contextHolder] = Modal.useModal();

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const [data,setData] = useState<DataType[]>([]);

    const [otherDomain,setOtherDomain] = useState("");

    const [primaryName,setPrimaryName] = useState("");

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '域名',
            dataIndex: 'name',
            key: 'name',
            render: (text,record) => <div>
                <Flex>
                    <div className="icon-box">
                        <GlobalOutlined className="font-20"  />
                    </div>
                    <div>
                        <div className="font-14 font-w-600">{text}</div>
                        {record.primaryName == "" ?<div className="font-12 color-7A8499">主域名 ·店铺内的所有流量已重定向至主域名<span style={{marginLeft:12}} className="color-356DFF">禁用重定向</span></div>:<></>}
                        {record.primaryName == "" ?<div onClick={()=>setIsModalOpen(true)} className="font-12 color-356DFF cursor-pointer">更改为新域名</div>:<div className="font-12 color-7A8499">重定向到 {record.primaryName} <span className="color-356DFF cursor-pointer">更改</span></div>}
                    </div>
                </Flex>
            </div>,
        },
        {
            title: '状态',
            dataIndex: 'age',
            key: 'age',
            width: 220,
            render: (text) => <div>
                <SuccessTag text="已连接" />
            </div>,
        },
        {
            title: '操作',
            width: 220,
            dataIndex: 'address',
            key: 'address',
            render: (text,record,index) => <div>
                {record.primaryName !== "" && <div>
                    <DeleteOutlined className="font-20 color-FF0000 cursor-pointer" onClick={()=>{
                        modal.confirm({
                            title: '确认要删除该子域名吗？',
                            centered: true,
                            icon: <ExclamationCircleFilled style={{color:"#F86140"}} />,
                            content: '删除后，该子域名将无法定向至主域名。',
                            okText:"确认",
                            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
                            onOk() {
                                addDomainName(record.primaryName,otherDomain?.split(",").filter(item => item !== record.name).join(",")).then(res=>{
                                    let newData = [...data]
                                    newData.splice(index,1)
                                    setData(newData)
                                    message.success("删除成功")
                                })
                            },
                        });
                    }} />
                </div>}
            </div>,
        },
          
    ];

    
    useEffect(()=>{
        getDomainNameList().then(res=>{
            let newData: DataType[] = [];
            domain.setDomain(res.data)
            setIsSkeleton(false)
            setOtherDomain(res.data.other_domain)
            const DomainList = res.data.other_domain?.split(",")
            newData.unshift({
                key: '1',
                name: res.data.domain_name,
                isPrimary:true,
                primaryName:"",
                age: 32
            })
            DomainList?.forEach(element => {
                newData.push({
                    key: '2',
                    name: element,
                    isPrimary:false,
                    primaryName: res.data.domain_name,
                    age: 32,
                })
            });
            setData(newData)
        })

        // 
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/domain")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">域名管理</div>
                        </div>
                        <div className='create-title-right'>
                            <Button type="primary" onClick={() => {history.push("/settings/add-domain")}} style={{ marginTop: "10px", height: "36px", fontSize: "14px" }}>添加域名</Button>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <Table<DataType> columns={columns} dataSource={data} />
                            </Card>
                            <div style={{textAlign:"center"}}>
                                <span>详细了解 </span>
                                <span><a href='' target='_blank'>多域名设定 <ExportOutlined /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 更改主域名 */}
                <Modal title="更改为新域名" centered open={isModalOpen} onOk={()=>{
                    addDomainName(primaryName,otherDomain).then(res=>{
                        let newData = [...data]
                        newData.forEach(element => {
                            if(element.primaryName == ""){
                                element.name = primaryName
                            }else{
                                element.primaryName = primaryName
                            }
                        });
                        // newData[0].name = primaryName
                        setData(newData)
                        setPrimaryName("")
                        setIsModalOpen(false)
                    })
                }} onCancel={()=>{
                    setIsModalOpen(false)
                    setPrimaryName("")
                }}>
                    <div>执行此更改无需任何费用。</div>
                    <Input style={{margin:"12px 0"}} placeholder="www.example.com" value={primaryName} onChange={(e)=>{setPrimaryName(e.target.value)}} />
                </Modal>
                {/* 删除 */}
                {contextHolder}
            </div>}
        </Scoped>
    )
}

export default DomainManage

const Scoped = styled.div`
.icon-box{
    color: #356dff;
    background-color: #e2f0ff;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-right: 8px;
    border-radius: 4px;
}
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
            .card{
                .ant-table{
                    border: 1px solid #eef1f7;
                    border-radius: 6px;
                    border-bottom: none;
                }
            }
        }
    }
}
`