import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Form, Input, List, message, Modal, Select, Table, TableProps, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import BlankPage from "./BlankPage"
import { useEffect, useState } from "react"
import { creatAppStore, getAppStores, getEmployeeList } from "@/services/y2/api"

import dayjs from 'dayjs';
import LicensesAndTerms from "./LicensesAndTerms"

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function AppList() {

    const [data,setData] = useState<null | []>(null)

    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const [employeeList,setEmployeeList] = useState();

    const createApp = () => {
        form.validateFields().then((values) => {
            // console.log(values);
            setIsModalOpen(false)
            // 提交表单
            creatAppStore(values).then(res=>{
                console.log(res)
                res.code == 0 && message.success("创建应用成功");
            })

        }).catch((errorInfo)=>{
            // console.log(errorInfo)
        }) 
       
        
    }

    

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '应用名称',
          dataIndex: 'app_name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '应用状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          render: (text) => <div>{dayjs(text*1000).format("YYYY-MM-DD HH:mm:ss")}</div>,
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Flex gap={32}>
                <div className="color-356DFF cursor-pointer" onClick={()=>history.push("/app-store/custom-app-config/"+record.id)}>编辑</div>
                <div className="color-7A8499 cursor-pointer">卸载</div>
                <div className="color-F86140 cursor-pointer">删除</div>
            </Flex>
          ),
        },
    ];


    useEffect(()=>{
        getAppStores().then(res=>{
            console.log(res)
            res.code == 0 && setData(res.data)
        })
        // 
        getEmployeeList().then(res=>{
            const newEmployeeList = res.data.map(item=>{
                return {
                    label:"员工("+item.id+")",
                    value:item.id
                }
            })
            setEmployeeList(newEmployeeList)
        })
    },[])

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/app-store")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">开发应用</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card>
                                <Flex justify="space-between">
                                    <div style={{width:"360px"}}>
                                        <Input placeholder="输入应用名称进行搜索" prefix={<SearchOutlined />}  />
                                    </div>
                                    <div>
                                        <Button type="primary" onClick={()=>setIsModalOpen(true)}>创建应用</Button>
                                    </div>
                                </Flex>
                                <div style={{marginTop:"20px"}}>
                                    <Table<DataType> columns={columns} dataSource={data} />
                                </div>
                            </Card>
                            <LicensesAndTerms />
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <Modal title="创建应用" width={620} centered open={isModalOpen} onOk={createApp} onCancel={()=>setIsModalOpen(false)} okText="创建应用">
                <Form form={form} style={{margin:"30px 0 40px 0"}} layout='vertical'>
                    <Form.Item label="应用名称" name="name" rules={[{required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请填写应用名称</div>}]}>
                        <Input placeholder="请填写应用名称" />
                    </Form.Item>
                    <Form.Item label="应用开发者" name="developer" rules={[
                        {required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请选择应用开发者</div>},
                    ]}>
                        <Select placeholder="请选择应用开发者" options={employeeList}  />
                    </Form.Item>
                    <Form.Item label="应用联系人邮箱" name="email" rules={[
                        {required: true, message: <div className='font-12' style={{marginBottom:"20px"}}>请填写应用联系人邮箱</div>},
                        { type: 'email', message: <div className='font-12' style={{marginBottom:"20px"}}>请填写正确的邮箱地址</div>},
                    ]}>
                        <Input placeholder="请填写应用联系人邮箱" />
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}

export default AppList

const Scoped = styled.div`

.ant-table{
    border: 1px solid #eef1f7;
    border-radius: 6px;
    border-bottom: none;
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
                    display: flex;
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
                padding: 0;
            }
            .divider{
                margin:0px;
            }
            .item:hover{
                background-color: #f0f7ff;
            }
            .tips{
                border: 1px solid rgba(53, 109, 255, .2);
                background-color: #e2f0ff;
                padding: 16px 16px;
                border-radius: 4px;
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