import DefaultButton from "@/components/Button/DefaultButton";
import MyInput from "@/components/Input/MyInput";
import { App, Card, Flex, Form, Modal, Radio, Table, Tooltip} from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { addIPAddressAccess, delIPAddressAccess, getIPAddressAccessList } from "@/services/y2/api";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined } from "@ant-design/icons";
import preferences, { IPAddressAccess } from "@/store/channel/preferences/preferences";
import { observer } from "mobx-react-lite";

function IPAddressAccessCard() {
    
    const { message } = App.useApp();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);
    
    const [data, setData] = useState<IPAddressAccess[]>([]);

    const columns = [
        {
            title: 'IP地址',
            dataIndex: 'ip_original',
            key: 'ip_original',
        },
        {
            title: '访问设置',
            dataIndex: 'list_type',
            key: 'list_type',
            render: (text:any, record:any) => (
                <div>{text == "BLACKLIST" ? "限制访问" : "允许访问"}</div>
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text:any, record:any) => (
                <DeleteModal
                    tElement={
                        <Tooltip title="删除">
                            <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </Tooltip>
                    }
                    removeFunc={()=>{
                        setLoading(true);
                        delIPAddressAccess(record.id).then(res=>{
                            if(res.code == 0){
                                message.success("删除成功");
                                setData(data.filter(item => item.id !== record.id))
                            }
                        }).catch(()=>{
                            console.log("删除失败")
                        }).finally(()=>{
                            setLoading(false);
                        })
                    }}
                    loading={loading}
                    title="确认要删除该IP地址吗？" 
                    content={""}
                    okText="删除"
                />
            )
        }
    ]

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    const [form] = Form.useForm();

    const cancel = ()=>{
        setOpen(false);
    }

    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true);
            addIPAddressAccess({
                ip_input:values.ipAddress,
                list_type:values.accessType,
            }).then((res)=>{
                // 刷新数据
                getIPAccessList({
                    page:1,
                    limit:10,
                })
            }).catch((res)=>{
                message.error(res?.msg);
            }).finally(()=>{
                setLoading(false);
                setOpen(false);
            })
        }).catch(()=>{
        })
        // 添加IP地址访问名单
    }

    const getIPAccessList = ({page,limit}:{page:number,limit:number})=>{
        getIPAddressAccessList({
            page:page,
            limit: limit,
        }).then((res)=>{
            if(res.code == 0){
                setData(res.data.list);
                setPagination({
                    ...pagination,
                    current: page,
                    pageSize: limit,
                    total: res.data.total,
                })
            }
        })
    }

    useEffect(()=>{
        setData(preferences.IPAccessList.data);
    },[])

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>IP地址访问名单</div>
                    </Flex>
                    <DefaultButton text="添加IP" onClick={()=>{
                        setOpen(true);
                        form.resetFields();
                    }} />
                </Flex>
                {/* 已上传文件列表 */}
                {/*  loading={tableLoading} */}
                <Table
                    rowKey={(record: IPAddressAccess) => record.id}
                    pagination={{
                        ...pagination,
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            getIPAccessList({
                                page:page,
                                limit: pageSize,
                            })
                        },
                    }}
                    className="table" scroll={{ y: 320 }} columns={columns} dataSource={data} />
            </Card>
            {/* 添加IP地址访问名单弹窗 */}
            <MyModal
                open={open}
                centered
                title="添加IP地址访问名单"
                width={620}
                onCancel={cancel}
                footer={<Flex justify="end" gap={12}>
                    <DefaultButton text="取消" loading={loading} onClick={cancel} />
                    <DefaultButton text="添加" loading={loading} type="primary" onClick={submit} />
                </Flex>}
            >
                <Form form={form} className="form" layout="vertical">
                    <Form.Item name="accessType" initialValue={"WHITELIST"} label="访问设置">
                        <Radio.Group 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                            options={[
                                {
                                    value: "WHITELIST",
                                    label: (
                                        <div>允许访问</div>
                                    ),
                                },
                                {
                                    value: "BLACKLIST",
                                    label: (
                                        <div>拒绝访问</div>
                                    ),
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="ipAddress" label="IP地址" required={false} rules={[
                        {required: true,message:"请输入IP地址"},
                        {pattern:/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/,message:"请输入正确的IP地址"},
                    ]}>
                        <MyInput placeholder="如：127.0.0.1" style={{height:"36px"}} />
                    </Form.Item>
                </Form>
            </MyModal>
        </Scoped>
    )
}

export default observer(IPAddressAccessCard)

const Scoped = styled.div`
    margin-bottom: 20px;
    .table{
        margin-top: 20px;
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
        
`

const MyModal = styled(Modal)`
    .form{
        margin-top: 20px;
    }
`
