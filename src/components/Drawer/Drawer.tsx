import { Drawer } from 'antd';
import React, { ReactPropTypes, useState } from 'react';
import './Drawer.scss'
import { CloseOutlined } from '@ant-design/icons';

/**
 * 对Drawer组件的二次封装
 */
export default function DrawerComponent(props:{
    title:string,
    open:boolean,
    onClose:()=>void,
    children:React.ReactNode
    styles?:React.CSSProperties

}) {

    let { title,open,onClose,children,styles } = props;
    
    return (
        <Drawer
            open={open}
            closeIcon={false}
            maskClosable={true}
            keyboard={true}
            onClose={()=>{
                onClose();
            }}
            styles={{
                body:{
                    padding: 0
                }
            }}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <div className='drawer-header'>
                <div className='title'>{title}</div>
                <div className='closeIcon' onClick={()=>{
                    onClose()
                }}>
                    <CloseOutlined/>
                </div>
            </div>
            <div className='drawer-content'>
                {children}
            </div>
            
        </Drawer>
    );
}