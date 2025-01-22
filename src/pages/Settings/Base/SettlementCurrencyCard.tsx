import InputSearch from "@/components/Search/InputSearch";
import { getCurrenciesList } from "@/services/y2/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '币种名称',
        dataIndex: 'title',
        key: 'id',
        render: (text) => <a>{text}</a>,
        width:200
    },
    {
        title: '币种汇率',
        dataIndex: 'values',
        key: 'id',
        render:(value, record, index)=>{
            return <Input value={value} onChange={(e)=>{

            }}/>
        },
    },
    {
        title: '默认币种',
        dataIndex: 'is_default',
        key: 'id',
        width:100,
        render:(value, record, index)=>{
            return <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                // defaultChecked
                checked={value == "1"?true:false}
                onChange={(e)=>{
                    console.log(e)
                }}
            />
        },
    },
    {
        title: '绑定状态',
        dataIndex: 'checked',
        key: 'id',
        width:100,
        render:(value, record, index)=>{
            return <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
            />
        },
    }
];
  

function SettlementCurrencyCard() {

    const [isOpen,setIsOpen] = useState(false);

    const [data,setData] = useState();

    useEffect(()=>{
        getCurrenciesList().then(res=>{
            if(res.code == 0){
                // let newData = res.data.map((item:any)=>{
                //     return {
                //         key:item.id,
                //         name:item.name,
                //         age:item.rate,
                //         address:item.defaultCurrency == 1 ? "是" : "否",
                //     }
                // })
                setData(res.data)
            }
        })
    },[])

    return (
        <>
            <Card style={{marginBottom:"20px"}}>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="结算货币"
                        name="logo"
                        >
                        <div style={{marginBottom:"12px"}}>日圆 (JPY)</div>
                        <Button>修改货币</Button>
                        <div style={{marginTop:"15px"}}>一旦有订单成立或成功发放首张礼品卡后，此选项不可修改，请慎重操作</div>
                    </Form.Item>
                    <Form.Item
                        label="自定义货币格式"
                        name="name"
                        >
                        <div style={{marginBottom:"8px"}}>未启用则使用系统默认货币格式，详细了解自定义货币格式</div>
                        <Button onClick={()=>setIsOpen(true)}>编辑格式</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Modal open={isOpen} title="自定义货币格式" width={860} centered onCancel={()=>setIsOpen(false)}>
                <Scoped>
                    <InputSearch placeholder="搜索币种名称" />
                    <div className="table_box">
                        <Table<DataType> columns={columns} dataSource={data} pagination={false} />
                    </div>
                </Scoped>
                
                
            </Modal>
        </>
    )
}


export default observer(SettlementCurrencyCard)

const Scoped = styled.div`
    .table_box{
        margin-top: 12px;
        border: 1px solid #eef1f7;
        border-radius: 4px;
        max-height: 680px;
        overflow-y: auto;
    }
`