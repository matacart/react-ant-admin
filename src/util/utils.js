import { getLocale } from './auth';
import { LanguageMap } from '../constant/Page';

/**
 * 判断页面的语言属性
 */
export const JudgingLanguage = storeLocale => {
    if (storeLocale) return storeLocale;
    if (getLocale()) return getLocale();
    if (LanguageMap[navigator.language]) return navigator.language;
    return 'en-US';
};
