import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, message, Modal } from "antd"
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components"
import { history } from '@umijs/max';
import React from "react";
import oldStore from "@/store/product/oldStore";
function ProductOverlay(props:any) {

    const [modal, contextHolder] = Modal.useModal();
    const [open, setOpen] = useState(false);

    // 取消
    const exit = () => {
        oldStore.productInit(oldStore.productDetail)
        oldStore.setEditStatus(false)
    }

    const create = async () => {
        oldStore.setProductImg(Array.from(oldStore.temp.values())[0])
        await oldStore.setSelectedImgList(Array.from(oldStore.temp.values()).slice(1))
        if(oldStore.validateForm()){
            props.setIsLoading(true)
            if(oldStore.partsWarehouse == "0"){
                oldStore.updateProduct().then(async res => {
                    if (res.code === 0) message.success('修改内容已更新');
                    // await globalStore.sleep(2000)
                    oldStore.setEditStatus(false);
                    props.setIsLoading(false);
                });
            }else{
                message.error('抱歉！非品库管理员，平台产品不可编辑！');
                props.setIsLoading(false);
            }
        }
    };

    const confirm = () => {
        modal.confirm({
          title: '确认放弃当前已更改的内容？',
          icon: <ExclamationCircleOutlined />,
          content:<div style={{height:"20px"}}></div>,
          okText: '放弃更改',
          cancelText: '取消',
          centered: true,
          onOk:exit
        })
    };

    useEffect(()=>{
        // newStore.unBlock = history.block((location, action) => {
        //     confirm();
        // })
    },[])

    return (
        <Scoped>
            <div className="product_overlay">
            {/*  */}
                <div><InfoCircleOutlined /> 有未保存的修改</div>
                <div>
                {/* style={{backgroundColor:"#242832"}} */}
                    <span style={{backgroundColor:"#242832"}} onClick={confirm}>放弃更改</span>
                    <span style={{backgroundColor:"#356DFF"}} onClick={create}>
                        更新
                    </span>
                </div>
            </div>
            {contextHolder}
        </Scoped>
    )
}

export default ProductOverlay

const Scoped = styled.div`
    .product_overlay{
        width: 100%;
        height: 60px;
        background-color: #242833;
        position: fixed;
        top:0;
        right:0;
        z-index: 101;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        color: #FFF;
        opacity:1;
        div:nth-child(1){
            flex-grow: 1;
            text-align: center;
            position: relative;
            left: 79px;
        }
        div:nth-child(2){
            z-index: 99;
            padding-right: 20px;
            span:nth-child(1){
                padding: 7px 15px;
                border-radius: 4px;
                border: 1px solid #7c7e85;;
                cursor: pointer;
            }
            span:nth-child(2){
                margin-left: 12px;
                padding: 7px 15px;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
    
`