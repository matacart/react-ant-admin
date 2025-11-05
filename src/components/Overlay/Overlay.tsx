import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Button, Flex, message, Modal } from "antd"
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components"
import React from "react";
function ProductOverlay({status,okText,onExit,onSubmit}:{status:boolean,okText:string,onExit:()=>void,onSubmit:()=>void}) {

    const [modal, contextHolder] = Modal.useModal();

    const create = () => {
        onSubmit()
    };

    const confirm = () => {
        modal.confirm({
          title: '未保存的内容将丢失，确认退出页面？',
          icon: <ExclamationCircleOutlined />,
          content:<div style={{height:"20px"}}></div>,
          okText: '退出页面',
          cancelText: '取消',
          centered: true,
          onOk:onExit
        })
    };

    

    return (
        <Scoped>
            <div className="product_overlay">
                <div className="tip"><InfoCircleOutlined /> 有未保存的修改</div>
                <Flex className="btn_group" gap={12}>
                    <Button className="btn" onClick={confirm}>退出编辑</Button>
                    <Button loading={status} className="btn-ok" onClick={create}>
                        {okText}
                    </Button>
                </Flex>
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
        .tip{
            flex-grow: 1;
            text-align: center;
            position: relative;
            left: 79px;
        }

        .btn_group{
            margin-right: 20px;
            .btn{
                z-index: 99;
                padding: 7px 15px;
                border-radius: 4px;
                color:#FFF;
                border: 1px solid #7c7e85;
                cursor: pointer;
                background-color: #242833;
            }
            .btn-ok{
                z-index: 99;
                padding: 7px 15px;
                border-radius: 4px;
                color:#FFF;
                border: 1px solid #356DFF;
                cursor: pointer;
                background-color: #356DFF;
            }
        }
    }
    
`