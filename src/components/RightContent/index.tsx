import { QuestionCircleOutlined, WifiOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang, useIntl } from '@umijs/max';
import { Popover, Tooltip } from 'antd';
import React,{ useEffect } from 'react';
import  { useState } from 'react';
export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      reload={false}
      style={{
        display: 'flex',
        padding:'8px',
      }}
      postLocalesData={()=>{return[
        {  
          "lang": "zh-CN",  
          "label": "简体中文",  
          "icon": "🇨🇳", // 中国国旗  
          "title": "语言"  
        },  
        {  
          "lang": "zh-TW",  
          "label": "繁體中文",  
          "icon": "tw", 
          "title": "語言"  
        },
        {  
            "lang": "en-US",  
            "label": "English",  
            "icon": "🇺🇸", // 美国国旗  
            "title": "Language"  
        },  
        {  
          "lang": "ja-JP",  
          "label": "日本語",  
          "icon": "🇯🇵", // 日本国旗  
          "title": "言語"  
        },  
        {  
            "lang": "es-ES",  
            "label": "Español",  
            "icon": "🇪🇸", // 西班牙国旗  
            "title": "Idioma"  
        },  
        {  
            "lang": "fr-FR",  
            "label": "Français",  
            "icon": "🇫🇷", // 法国国旗  
            "title": "Langue"  
        },  
        {  
            "lang": "de-DE",  
            "label": "Deutsch",  
            "icon": "🇩🇪", // 德国国旗  
            "title": "Sprache"  
        },  

        {  
            "lang": "ko-KR",  
            "label": "한국어",  
            "icon": "🇰🇷", // 韩国国旗  
            "title": "언어"  
        },  
        {  
            "lang": "ru-RU",  
            "label": "Русский",  
            "icon": "🇷🇺", // 俄罗斯国旗  
            "title": "Язык"  
        },  
        {  
            "lang": "ar",  
            "label": "العربية",  
            "icon": "🇸🇦", // 沙特阿拉伯国旗（作为阿拉伯语的代表）  
            "title": "لغة"  
        },  
        {  
            "lang": "pt-BR",  
            "label": "Português",  
            "icon": "🇧🇷", // 巴西国旗（作为葡萄牙语的代表）  
            "title": "Idioma"  
        },
        {
            "lang": "pt-PT",  
            "label": "Portuguese",
            "icon": "🇵🇹"
        },
        {
            "lang": "th-TH",
            "label": "ไทย",
            "icon": "🇹🇭"
        },
        {
            "lang": "ms-MY",
            "label": "Malaysia",
            "icon": "🇲🇾"
        },
        {
            "lang": "bn-BD",
            "label": "টাকা",
            "icon": "🇧🇩"
        },
        {
            "lang": "vi-VN",
            "label": "Vietnamese",
            "icon": "🇻🇳"
        },
        {
            "lang": "en-AU",
            "label": "Australian",
            "icon": "🇦🇺"
        },
        {
            "lang": "id-ID",
            "label": "Indonesia",
            "icon": "🇮🇩"
        },
        {
            "lang": "es-MX",
            "label": "Mexican Spanish",
            "icon": "🇲🇽"
        },
        {
            "lang": "it-IT",
            "label": "Italiano",
            "icon": "🇮🇹"
        }
      ]}
      }
    />
  );
};

export const Question = () => {

  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage({id: 'header.help'})}>
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