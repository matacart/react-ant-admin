import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect"
import { updataBatchUpdatePrice } from "@/services/y2/api";
import { Flex, Input, message, Modal, Radio } from "antd"
import { useRef, useState } from "react"
import styled from "styled-components";
import cookie from 'react-cookies';
import NumberInput from "@/components/Input/NumberInput";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import productList from "@/store/product/productList";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

function ModifyPriceModal({type,onFetchData}:{type:string,onFetchData:any}){

    const Ref = useRef(null)

    const text = (type=='specls'?'售价':'原价')

    const [loading,setLoading] = useState(false)

    const [open,setOpen] = useState(false)

    const [priceType,setPriceType] = useState(1)

    const [operator,setOperator] = useState(1)

    const [price,setPrice] = useState<number|undefined>(undefined)
    
    const options = [
        {
            value: 1,
            label: '减去固定金额',
        },
        {
            value: 2,
            label: '加上固定金额',
        },
        {
            value: 3,
            label: '减去百分比',
        },
        {
            value: 4,
            label: '加上百分比',
        },
    ];

    const submit = ()=>{
        const data = {
            price_type:type,
            operator:priceType==1?'SET':(operator == 1 || operator == 2)?'ADJUST':"ADJUST_SCALE",
            value:priceType==1?(price??""):(operator == 2 || operator == 4)?(price??""):"-"+(price??""),
            precision:2,
            productList:JSON.stringify(productList.productList),
            condition:'',
            allSelected:productList.allSelected,
        }
        setLoading(true)
        updataBatchUpdatePrice(data).then(res=>{
            // 清除选中状态
            productList.setProductList([])
            // 重新加载数据
            onFetchData();
            message.success('更新成功');
        }).catch(err=>{
            // message.error("")
            console.log(err)
        }).finally(()=>{
            setOpen(false)
            setLoading(false)
        })
    }

    return(
        <>
            <a onClick={()=>{setOpen(true)}}>修改{text}</a>
            <ScopedModal 
                title={"修改"+text} 
                open={open} 
                centered 
                onOk={submit} 
                onCancel={()=>setOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <Flex gap={12} justify="flex-end">
                        <DefaultButton text="取消" onClick={()=>setOpen(false)} />
                        <PrimaryButton loading={loading} text="更新" onClick={submit} />
                    </Flex>
                )}
            >
                <div className="tip font-12 color-7A8499">已选择{productList.productList.length}个商品</div>
                <Radio.Group
                    className="radio-group"
                    style={style}
                    value={priceType}
                    onChange={(e)=>{
                        setPrice(undefined)
                        setPriceType(e.target.value)
                    }}
                    options={[
                        { value: 1, label: '修改为指定价格' },
                        { value: 2, label: `基于${text}调整` },
                    ]}
                />
                {priceType == 2 && <Flex gap={12}>
                    <MySelect value={operator} onChange={(value:number)=>{
                        setOperator(value)
                    }} options={options} style={{width:"160px",height:"36px"}} />
                    <NumberInput prefix={cookie.load("symbolLeft") || ""} value={price} onChange={(value:number|undefined)=>{
                        setPrice(value)
                    }}  />
                </Flex>}
                {priceType == 1 && <div>
                    <div style={{marginBottom:"8px"}} className="font-w-600 color-242833">{text}</div>
                    <NumberInput prefix={cookie.load("symbolLeft") || ""} value={price} onChange={(value:number|undefined)=>{
                        setPrice(value)
                    }}  />
                </div>}
            </ScopedModal>
        </>
        
    )

}

const ScopedModal = styled(Modal)`
    .tip{
        margin-top: 20px;
        margin-bottom: 12px;
    }
    .radio-group{
        margin-bottom: 10px;
    }
    /* 设置最小高度，防止元素重新布局影响 */
    min-height: 320px;
`

export default ModifyPriceModal