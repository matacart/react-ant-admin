
import { useIntl } from "@umijs/max";
import { Checkbox, Flex, Switch } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components";


interface DataType{
    pay_channel_list:any[],
    show:boolean,
}

function ItemChoosePaymentIcons({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default ?? undefined;

    const [value,setValue] = useState(typeof data === 'object' ? data : defaultData);

    useEffect(()=>{

        if(typeof data === 'object'){
            setValue({
                ...data,
                pay_channel_list:data.pay_channel_list?.length == 0 ? [{ type: "paypal", show: true}] : data.pay_channel_list
            })
        }else{
            setValue(defaultData)
        }
    },[data])

    return (
        <Scoped>
            <Flex justify="space-between">
                <div>{intl.formatMessage({id: item.label})}</div>
                <Switch value={value?.show} onChange={(check:boolean)=>{
                    setValue({
                        ...value,
                        show:check
                    })
                    setData(item,{
                        ...value,
                        show:check 
                    })
                }} />
            </Flex>
            {value.show && <div style={{marginTop:"12px"}}>
                {value.pay_channel_list?.map((payChanne:any,index:number)=>{
                    return (
                        <Flex key={index} className="item cursor-pointer" onClick={(e)=>{
                            const newPayChanneList = [...value.pay_channel_list];
                            newPayChanneList[index].show = !payChanne.show;
                            setValue({
                                ...value,
                                pay_channel_list:newPayChanneList
                            })
                            setData(item,{
                                ...value,
                                pay_channel_list:newPayChanneList
                            })
                        }}>
                            <Checkbox checked={payChanne.show} />
                            <div className="img_box">
                                <img src="/icons/logos/paypal.svg" />
                            </div>
                            {payChanne.type}
                        </Flex>
                    )
                })}
            </div>}
        </Scoped>
    )
}

const Scoped = styled.div`
    .item{
        padding: 6px 0;
        .img_box{
            margin-left: 12px;
            margin-right: 8px;
            img{
                width: 40px;
            }
        }
    }
`

export default ItemChoosePaymentIcons

{/* <Switch checked={componentsData[item.id]?.value ?? true} onChange={async (check:boolean)=>{
await setComponentsData({
...componentsData,
[item.id]: {value:check}
})
editor.updateComponentSettings(editor.component.id,{
...componentsData,
[item.id]: {value:check}
})
}} /> */}