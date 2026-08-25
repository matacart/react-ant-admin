import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import NumberInput from "@/components/Input/NumberInput";
import InputSearch from "@/components/Search/InputSearch";
import DefaultSelect from "@/components/Select/DefaultSelect";
import MySelect from "@/components/Select/MySelect";
import { getCurrenciesList, setCurrenciesList } from "@/services/y2/api";
import { CheckOutlined, CloseOutlined, ExportOutlined } from "@ant-design/icons";
import { App, Card, Flex, Form, InputNumber, Modal, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import styled from "styled-components";

interface DataType {
    id: string;
    key: string;
    name: string;
    checked: string;
    is_default: string;
}


function SettlementCurrencyCard() {
    
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [btnLoading,setBtnLoading] = useState(false);

    const [isOpen,setIsOpen] = useState(false);

    const [data,setData] = useState<any[]>([]);

    const formatList = [
        {
            label:"amount",
            value:"amount"
        },
        {
            label:"amount_no_decimals",
            value:"amount_no_decimals"
        },
        {
            label:"amount_with_comma_separator",
            value:"amount_with_comma_separator"
        },
        {
            label:"amount_no_decimals_with_comma_separator",
            value:"amount_no_decimals_with_comma_separator"
        },
        {
            label:"amount_with_apostrophe_separator",
            value:"amount_with_apostrophe_separator"
        }
    ];

    const [currency,setCurrency] = useState();

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '货币',
            dataIndex: 'title',
            key: 'id',
            render: (text) => <span>{text}</span>,
            width:150
        },
        {
            title: '汇率',
            dataIndex: 'values',
            key: 'id',
            width:200,
            render:(value, record, index)=>{
                return <NumberInput style={{width:"100%"}} stringMode step="0.00000001" value={value} onChange={(e:any)=>{
                    let newData = [...data]
                    newData[index].values = e
                    setData(newData)
                }}/>
            },
        },
        {
            title: '格式',
            dataIndex: 'format',
            key: 'id',
            width:200,
            render:(value, record, index)=>{
                return <DefaultSelect
                    style={{width:"100%",overflow:"hidden"}}
                    options={formatList}
                    value={value}
                    onChange={(e)=>{
                        let newData = [...data]
                        newData[index].format = e
                        setData(newData)
                    }}
                />
            },
        },
        {
            title: '默认',
            dataIndex: 'is_default',
            key: 'id',
            width:80,
            render:(value, record, index)=>{
                // return value == "1" ? <span style={{ color: '#d9d9d9', cursor: 'not-allowed' }}>默认</span> : <a>设为默认</a>
                return <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    disabled={record.is_default == "1"}
                    checked={value == "1"? true:false }
                    onChange={(e)=>{
                        let newData = data.map(item=>{
                            if(item.id == record.id){
                                return { ...item,is_default:"1",checked:"1" }
                            }else{
                                return { ...item,is_default:"0" }
                            }
                            
                        })
                        setData(newData)
                    }}
                />
            },
        },
        {
            title: '启用',
            dataIndex: 'checked',
            key: 'id',
            width:80,
            render:(value, record, index)=>{
                return <Switch
                    checked={value == "1"? true:false }
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    onChange={(e)=>{
                        if(record.is_default == "1"){
                            message.error("默认货币不可关闭")
                            return false
                        }
                        let newData = [...data];
                        newData[index].checked = e ? "1" : "0";
                        setData(newData);
                    }}
                />
            },
        }
    ];
    useEffect(()=>{
        // 店铺默认币种
        setCurrency(cookie.load("domain")?.default_currency)
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
                format:item.format,
                values:item.values,
                is_default:item.is_default,
                sort:item.sort,
                checked:item.checked
            }
        })
        setBtnLoading(true)
        setCurrenciesList(currenciesList).then(res=>{
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
        }).finally(()=>{
            setBtnLoading(false)
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
                        <PrimaryButton text="保存" loading={btnLoading} onClick={onSubmit} />
                    </Flex>
                )}
            >
                <Scoped>
                    <InputSearch placeholder="搜索币种名称" />
                    <div className="table_box" >
                        <Table<DataType> tableLayout="fixed" style={{maxHeight:"calc(100vh - 280px)"}} columns={columns} loading={loading} dataSource={data} pagination={false} />
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