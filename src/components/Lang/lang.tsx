import { useIntl } from '@umijs/max';
import { ConfigProvider, Dropdown, Flex, Select, theme } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import React from 'react';
import { setLocale } from 'umi';

export const i18n = [
  {  
    "id": "1",
    "code": "zh-cn",
    "language_code": "zh-hans-cn",
    "lang": "zh-CN", // 国际化语言
    "label": "简体中文",  
    "icon": "🇨🇳", // 中国国旗  
    "title": "语言"
  },  
  {  
    "id": "6",
    "code": "zh-tw",
    "language_code": "zh-hant-tw",
    "lang": "zh-TW",  
    "label": "繁體中文",  
    "icon": "tw", 
    "title": "語言"  
  },
  { 
    "id": "2",
    "code": "en-us",
    "language_code": "en",
    "lang": "en-US",  
    "label": "English",  
    "icon": "🇺🇸", // 美国国旗  
    "title": "Language"  
  },  
  {  
    "id": "3",
    "code": "ja-jp",
    "language_code": "ja",
    "lang": "ja-JP",  
    "label": "日本語",  
    "icon": "🇯🇵", // 日本国旗  
    "title": "言語"  
  },  
  {  
    "id": "10",
    "code": "es-es",
    "language_code": "es",
    "lang": "es-ES",  
    "label": "Español",  
    "icon": "🇪🇸", // 西班牙国旗  
    "title": "Idioma"  
  },  
  {  
    "id": "8",
    "code": "fr-fr",
    "language_code": "fr",
    "lang": "fr-FR",  
    "label": "Français",  
    "icon": "🇫🇷", // 法国国旗  
    "title": "Langue"  
  },  
  {  
    "id": "5",
    "code": "de-de",
    "language_code": "de",
    "lang": "de-DE",  
    "label": "Deutsch",  
    "icon": "🇩🇪", // 德国国旗  
    "title": "Sprache"  
  },  
  {  
    "id": "4",
    "code": "ko-kr",
    "language_code": "ko",
    "lang": "ko-KR",
    "label": "한국어",  
    "icon": "🇰🇷", // 韩国国旗  
    "title": "언어"  
  },  
  {  
    "id": "7",
    "code": "ru-ru",
    "language_code": "ru",
    "lang": "ru-RU",  
    "label": "Русский",  
    "icon": "🇷🇺", // 俄罗斯国旗  
    "title": "Язык"  
  }
]

const menuStyle: React.CSSProperties = {
  padding: "8px 0",
  width: "120px",
  boxShadow: 'none',
};


// 国际化组件
export const Lang = () => {

  const { locale } = useIntl();

  const { useToken } = theme;

  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const currentLang = i18n.find(item => item.lang === locale);

  // 国际化选项
  const options: any[] = i18n.map(item => ({
    label: <span key={item.lang} onClick={()=>setLocale(item.lang,false)}>{item.label}</span>,
    value: item.code,
  }));

  return (
    <LangWrapper>
      <ConfigProvider
        theme={{
          token: {
            borderRadius:0,
            paddingXXS:0,
          },
        }}
      >
        <Dropdown 
          menu={{ items: options }} 
          placement="bottomRight"
          popupRender={(menu)=>{
            return (
              <div style={contentStyle}>
                <div>
                    {React.cloneElement(
                      menu as React.ReactElement<{
                          style: React.CSSProperties;
                      }>,
                      { style: menuStyle },
                    )}
                </div>
              </div>
            )
          }}
        >
          <Flex gap={12} className="lang">
            <div>{currentLang?.label}</div>
            <GlobalOutlined className='font-20' />
          </Flex>
        </Dropdown>
      </ConfigProvider>
    </LangWrapper>
  );
};

const LangWrapper = styled.div`
  .lang{
    padding: 10px 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #F7F8FB;
    }
  }
`;