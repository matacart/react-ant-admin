import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { FormattedMessage, history, useIntl, useModel, SelectLang } from '@umijs/max';
import langShow from '@/locales/langShow';


const useStyles = createStyles(({ token }) => {
    return {
      lang: {
        width: 42,
        height: 42,
        lineHeight: '42px',
        right: 16,
        borderRadius: token.borderRadius,
        ':hover': {
          backgroundColor: token.colorBgTextHover,
        },
      },
    };
  });


  // 国际化组件
const Lang = () => {
    const { styles } = useStyles();
  
    return (
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang reload={false} postLocalesData={()=>{return[  
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
        />}
      </div>
    );
  };
  
const ILang = () => {
    const intl = useIntl();
    const lang = langShow[intl.locale as keyof typeof langShow];
    return (
          <div
            className="login-header-wrap"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              padding: '10px 40px 20px',
            }}
          >
            <div className="login-header-container">
              <div
                style={{
                  marginTop: '4px',
                }}
              >
                {lang.label}
              </div>
              {/* 国际化组件 */}
              <Lang />
            </div>
          </div>
    )
}

export default ILang;