import { QuestionCircleOutlined, WifiOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Popover } from 'antd';
import React,{ useEffect } from 'react';
import  { useState } from 'react';
export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};




async function measureLatency() {  
  // const startTime = performance.now();  
  // try {  
      
  // } catch (error) {  
  //   console.log(error);
  // }
  // const endTime = performance.now();  
  // const latency = endTime - startTime;
  const latency = 100;
  return latency;
}  


export const Ping = () => {
  const [pingTime,setPingTime] = useState(0);
  const color = pingTime > 1000 ? 'red' : 'green';  

  useEffect(()=>{ // 副作用，不依赖任何状态，只在组件加载和卸载时执行。
    measureLatency().then((time)=>{
      setPingTime(time)
    })
    const interval = setInterval(()=>{
      measureLatency().then((time)=>{
        setPingTime(time)
      })
    },10000)
    return () => clearInterval(interval)//卸载
  },[])//空依赖状态，不会导致副作用递归链

  return(
    <>
      <Popover content={pingTime.toFixed(2)+'ms'}
      >
      <WifiOutlined style={{
        color: color
      }}/>
      </Popover>
    </>
  )
};