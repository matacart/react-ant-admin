import zh_CN from 'antd/es/locale/zh_CN';
import zh_HK from 'antd/es/locale/zh_HK';
import zh_TW from 'antd/es/locale/zh_TW';
import en_US from 'antd/es/locale/en_US';

export const Language = [
    {
        key: 'zh-CN',
        label: '简体中文',
    },
    {
        key: 'zh-HK',
        label: '繁體中文',
    },
    {
        key: 'en-US',
        label: 'English',
    },
];

export const LanguageMap = {
    'zh-CN': '简体中文',
    'zh-HK': '繁體中文',
    'en-US': 'English',
};

export const AntdLanguageMap = {
    'zh-CN': zh_CN,
    'zh-HK': zh_HK,
    'zh-TW': zh_TW,
    'en-US': en_US,
};

export const RichTextEditorLanguageMap = {
    'zh-CN': 'zh-Hans',
    'zh-HK': 'zh_HK',
    'en-US': null,
};
