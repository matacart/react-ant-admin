import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, message, Modal } from "antd"
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components"
import { history } from '@umijs/max';
import newStore from "@/store/newStore";
import React from "react";
function ProductOverlay() {

    const [modal, contextHolder] = Modal.useModal();
    const [open, setOpen] = useState(false);

    // 锁
    // let unBlock: () => void;
    const exit = () => {
        // 取消锁
        newStore.unBlock();
        history.push('/products/index')
    }

    const create = async () => {
        await newStore.setSelectedImgList(Array.from(newStore.temp.values()))
        if(newStore.validateForm()){
            newStore.unBlock();
            newStore.submitAddProduct().then(res=>{
                if(res.code==0){
                    message.success('创建成功')
                    // 返回产品id 根据产品id在本地自动请求款式直到成功
                }else{
                    message.error('创建失败');
                }
            });
            history.push('/products/index')
        }
    };

    const confirm = () => {
        modal.confirm({
          title: '未保存的内容将丢失，确认退出页面？',
          icon: <ExclamationCircleOutlined />,
          content:<div style={{height:"20px"}}></div>,
          okText: '退出页面',
          cancelText: '取消',
          centered: true,
          onOk:exit
        })
    };

    useEffect(()=>{
        newStore.unBlock = history.block((location, action) => {
            confirm();
        })
    },[])

    return (
        <Scoped>
            <div className="product_overlay">
            {/*  */}
                <div><InfoCircleOutlined /> 有未保存的修改</div>
                <div>
                    <span style={{backgroundColor:"#242832"}} onClick={confirm}>退出编辑</span>
                    <span style={{backgroundColor:"#356DFF"}} onClick={create}>
                        创建
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