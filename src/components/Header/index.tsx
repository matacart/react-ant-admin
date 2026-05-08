import { QuestionCircleOutlined, WifiOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Popover, Tooltip } from 'antd';
import React,{ useEffect } from 'react';
import  { useState } from 'react';
import MinLang from '../Lang/MinLang';
export type SiderTheme = 'light' | 'dark';

async function measureLatency() {  
  const latency = 100;
  return latency;
}

export const SelectLang = () => {
  return (
    <MinLang />
  );
};

export const Question = () => {

  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage({id: 'components.header.question.tip'})}>
      <div
        style={{
          display: 'flex',
          padding:'8px'
          // height: 26,
        }}
        onClick={() => {
          window.open('http://help.handingyun.cn/');
        }}
      >
        <QuestionCircleOutlined />
      </div>
    </Tooltip>
  );
};

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
      <Popover content={pingTime.toFixed(2)+'ms'}>
        <WifiOutlined style={{
          display: 'flex',
          padding:'8px',
          color: color
        }}/>
      </Popover>
    </>
  )
};