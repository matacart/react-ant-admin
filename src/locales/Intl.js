import langs from './lang';

/**
 * 格式化所需数据
 */
const Intl = locale => {
    const messages = langs[locale];

    return {
        locale,
        messages,
    };
};

export default Intl;
