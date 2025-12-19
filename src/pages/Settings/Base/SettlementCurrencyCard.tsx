import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import InputSearch from "@/components/Search/InputSearch";
import { getCurrenciesList, setCurrenciesList } from "@/services/y2/api";
import { CheckOutlined, CloseOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, InputNumber, message, Modal, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import styled from "styled-components";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}


function SettlementCurrencyCard() {

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [isOpen,setIsOpen] = useState(false);

    const [data,setData] = useState<any[]>([]);

    const [currency,setCurrency] = useState();

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
                return <InputNumber<string> style={{width:"100%"}} stringMode step="0.00000001" value={value} onChange={(e)=>{
                    let newData = [...data]
                    newData[index].values = e
                    // let newData = data.map(item=>{
                    //     if(item.id == record.id){
                    //         return { ...item,values:e}
                    //     }else{
                    //         return item
                    //     }
                    // })
                    setData(newData)
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
                    checked={value == 1?true:false}
                    onChange={(e)=>{
                        let newData = data.map(item=>{
                            if(item.id == record.id){
                                return { ...item,is_default:1,checked:1 }
                            }else{
                                return { ...item,is_default:0 }
                            }
                            
                        })
                        // console.log(newData)
                        // newData[index].is_default = e ? 1 : 0
                        setData(newData)
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
                    checked={value == 1?true:false}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    onChange={(e)=>{
                        let newData = [...data]
                        newData[index].is_default == 1 ? message.error("默认货币不可关闭"):newData[index].checked = e ? 1 : 0
                        setData(newData)
                    }}
                />
            },
        }
    ];
    useEffect(()=>{
        setCurrency(cookie.load("domain").default_currency)
    },[])
    // 获取币种
    const getCurrencies = ()=>{
        setLoading(true)
        getCurrenciesList(1,100).then(res=>{
            if(res.code == 0){
                setData(res.data)
            }
            setLoading(false)
        })
    }

    // 提交
    const onSubmit = ()=>{
        setIsOpen(false)
        const currenciesList = data.map(item=>{
            return{
                domain_id:cookie.load("domain")?.id,
                currencies_id:item.id, 
                values:item.values,
                is_default:item.is_default,
                sort:item.sort,
                checked:item.checked
            }
        })
        setCurrenciesList(currenciesList).then(res=>{
            cookie.save('symbolLeft', data.filter(item=>item.is_default == "1")[0].symbol_left, { path: '/' });
            let newDomain = cookie.load("domain")
            if(cookie.load("domain")){
                const current = data.filter(item=>item.is_default == "1")[0]
                newDomain = {
                    ...newDomain,
                    default_currency:current.code,
                }
                cookie.save('domain', newDomain, { path: '/' });
                setCurrency(newDomain.default_currency)
            }
        })
    }

    // 取消
    const onCancel = ()=>{
        setIsOpen(false)
    }

    return (
        <>
            <Card style={{marginBottom:"20px"}}>
                <Form form={form} layout={"vertical"}>
                    <Form.Item
                        label="默认币种"
                        name="logo"
                        >
                        <div style={{marginBottom:"12px"}}>货币 ({currency ?? "US"})</div>
                        <DefaultButton text="修改货币" onClick={()=>{
                            setIsOpen(true)
                            getCurrencies()
                        }} />
                        <div style={{marginTop:"15px"}}>设置系统默认货币格式，<a>详细了解<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                    </Form.Item>
                </Form>
            </Card>
            <Modal open={isOpen} title="自定义货币格式" destroyOnClose width={860} centered
                onCancel={onCancel}
                footer={()=>(
                    <Flex justify="flex-end" gap={12}>
                        <DefaultButton text="取消" onClick={onCancel} />
                        <PrimaryButton text="保存" onClick={onSubmit} />
                    </Flex>
                )}
            >
                <Scoped>
                    <InputSearch placeholder="搜索币种名称" />
                    <div className="table_box" >
                        <Table<DataType> style={{maxHeight:"calc(100vh - 280px)"}} columns={columns} loading={loading} dataSource={data} pagination={false} />
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
        overflow-y: auto;
    }
`