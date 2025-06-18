import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import NumberInput from "@/components/Input/NumberInput";
import { setCancelOrder, splitOrderProducts } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Input, message, Modal, Table, TableProps } from "antd";
import { cloneDeep } from "lodash";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DataType {
    remaining_quantity: number;
    id: string;
    key: string;
    product_name: string;
    product_image: string;
    product_model: string;
    num:number;
    attributes: any;
}

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const { TextArea } = Input;

function SplitPackage({groupIndex}:{groupIndex:number}){

    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const remainingInfo  = order.remainingProductGroup[groupIndex]

    const [loading,setLoading] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    // 选中的商品
    const [selectRows,setSelectRows] = useState<DataType[]>([]);

    // 将mobx转普通数组
    const [data,setData] = useState<DataType[]>(()=>cloneDeep(toJS(remainingInfo.product)));

    const [count,setCount] = useState(0);

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys,selectRows)=>{
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectRows(selectRows)
        },
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '商品',
            dataIndex: 'id',
            key: 'id',
            render: (value,record) => <>
                <Flex gap={12} align="center">
                    <div>
                        <img style={{width:"36px",height:"36px",borderRadius:"4px"}} src={record.product_image+"?x-oss-process=image/resize,w_200"} />
                    </div>
                    <Flex vertical>
                        <span className="font-w-600">{record.product_name}</span>
                        <span>{record.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")}</span>
                        <span>model : {record.product_model}</span>
                    </Flex>
                </Flex>
            </>,
        },
        {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
            render: (value,record) => {
                return selectedRowKeys.includes(record.id) ? <><NumberInput min={1} max={record.remaining_quantity} value={selectRows.filter(item=>item.id == record.id)[0].num} defaultValue={value} onChange={(value:number)=>{
                    if (value < 1) {
                        value = 1; // 强制设置为最小值
                    }
                    setSelectRows(selectRows.map((item)=>{
                        return item.id === record.id ? { ...item, num: value } : item
                    }))
                }} /></> : <div>{value}</div>
            },
            width:120
        },
      
    ];

    const cancel = ()=>{
        setOpen(false);
        setSelectedRowKeys([])
        setSelectRows([])
    }

    const submit = ()=>{
        if(selectRows?.length == 0){
            message.error("请选择商品")
            return
        }
        let selectNum = 0
        let orderProducts:any = []
        selectRows?.forEach((item:DataType)=>{
            orderProducts.push({
                product_id:item.id,
                product_quantity:item.num
            })
            selectNum +=item.num
        })
        if(selectNum<count){
            setLoading(true)
            splitOrderProducts({
                orderProducts:JSON.stringify(orderProducts)
            }).then(res=>{
                order.triggerRefresh()
                setOpen(false)
            }).catch(err=>{
            }).finally(()=>{
                setLoading(false)
            })
        }else{
            message.error("请至少保留一件商品")
        }
    }

    useEffect(()=>{
        // 商品总数量
        let newCount = 0
        remainingInfo.product?.forEach((item:DataType)=>{
            newCount +=item.remaining_quantity
        })
        setCount(newCount)
    },[])

    return (
        <>
            <a className="cursor-pointer" onClick={() => setOpen(true)}><span>拆分发货</span></a>
            <MyModal title="拆分发货" width={620} open={open} onCancel={cancel} centered
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"拆分发货"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <div>拆分发货后的商品不允许编辑商品</div>
                <div style={{marginTop:12,marginBottom:24}}>
                    <Table<DataType> rowKey={(record)=>record.id} columns={columns} dataSource={data} pagination={false} rowSelection={rowSelection} />
                </div>
            </MyModal>
        </>
    );

}

const MyModal = styled(Modal)`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`

export default SplitPackage;