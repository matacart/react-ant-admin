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
        padding: 0,
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
            "lang": "ar-SA",  
            "label": "العربية",  
            "icon": "🇸🇦", // 沙特阿拉伯国旗（作为阿拉伯语的代表）  
            "title": "لغة"  
        },  
        {  
            "lang": "pt-BR",  
            "label": "Português",  
            "icon": "🇧🇷", // 巴西国旗（作为葡萄牙语的代表）  
            "title": "Idioma"  
        }  
      ]}
   }
    />
  );
};

export const Question = () => {
  return (

    <div
      style={{
        display: 'flex',
        // height: 26,
      }}
      onClick={() => {
        window.open('http://help.handingyun.cn/');
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