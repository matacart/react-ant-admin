import DefaultButton from "@/components/Button/DefaultButton";
import { WarningIcon } from "@/components/Icons/Icons";
import { Flex, Input, message, Modal, Radio } from "antd"
import { useRef, useState } from "react"
import styled from "styled-components";
import { text } from 'express';
import MyButton from "@/components/Button/MyButton";
import { deleteProductList } from "@/services/y2/api";
import productList from "@/store/product/productList";

function ModifyDeteleModal({count,onFetchData}:{count:number,onFetchData:any}){

    const [open,setOpen] = useState(false)

    const [loading,setLoading] = useState(false)

    const submit = ()=>{
        setLoading(true)
        deleteProductList(productList.productList.toString()).then(res=>{
            if(res.code == 0){
              // 清除选中状态
              productList.setProductList([])
              // 重新加载数据
              onFetchData();
              message.success('商品删除成功');
            }
        }).catch(err=>{
            message.error('商品删除失败');
            console.log(err);
        }).finally(()=>{
            setLoading(false)
            setOpen(false)
        })
    }

    return(
        <>
            <a style={{color:"#F86140"}} onClick={()=>{setOpen(true)}}>删除商品</a>
            <ScopedModal 
                title={<Flex align="center">
                    <div style={{marginRight:"12px"}}>
                        <WarningIcon className="color-F86140" style={{fontSize:"24px"}} />
                    </div>
                    确定删除{count}件商品？
                </Flex>}
                open={open} 
                width={420} 
                centered 
                onOk={submit} 
                onCancel={()=>setOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <Flex gap={12} justify="flex-end">
                        <DefaultButton text="取消" onClick={()=>setOpen(false)} />
                        <MyButton loading={loading} text="删除" color="danger" variant="outlined" style={{height:"36px"}} onClick={submit} />
                    </Flex>
                )}
            >
                <div style={{marginLeft:"36px"}}>商品删除后不可恢复，所关联的活动也会自动剔除这些商品</div>
            </ScopedModal>
        </>
        
    )

}

const ScopedModal = styled(Modal)`

`

export default ModifyDeteleModal